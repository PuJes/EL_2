/**
 * 问卷数据转换器
 * 将前端问卷数据转换为推荐算法所需的SurveyResponses格式
 */

import type { SurveyResponses } from '../types/survey'

// 前端问卷数据格式
interface SurveyAnswer {
  questionId: string
  answer: string
  weight?: number
}

interface FrontendSurveyData {
  answers: SurveyAnswer[]
  userSource?: string
  contentInterest?: string
  nativeLanguage?: string
  languageExperience?: string
  learningPurpose?: string
  timeExpectation?: string
  culturalInterest?: string | string[] // 支持多选
  learningStyle?: string
  persistence?: string
  difficultyPreference?: string // 新增难度偏好
  dailyTime?: string
}

/**
 * 将前端问卷数据转换为推荐算法格式
 */
export function convertSurveyData(frontendData: FrontendSurveyData): SurveyResponses {
  // 通过answers数组获取具体答案
  const getAnswer = (questionId: string): string | undefined => {
    const answer = frontendData.answers.find(a => a.questionId === questionId)
    return answer?.answer
  }

  // 将学习目的映射到标准格式（直接匹配算法参数）
  const mapLearningGoals = (purpose?: string) => {
    switch (purpose) {
      case 'career': return ['career']
      case 'travel': return ['travel']
      case 'culture': return ['culture']
      case 'academic': return ['academic']
      default: return ['general']
    }
  }

  // 将文化兴趣映射到标准格式（支持多选和精确匹配算法）
  const mapCulturalInterests = (interest?: string | string[]): string[] => {
    if (Array.isArray(interest)) {
      // 处理多选情况
      return interest.filter(i => i !== 'no_preference')
    }

    if (typeof interest === 'string') {
      try {
        // 尝试解析JSON字符串（多选数据）
        const parsed = JSON.parse(interest)
        if (Array.isArray(parsed)) {
          return parsed.filter(i => i !== 'no_preference')
        }
      } catch {
        // 不是JSON，按单选处理
      }

      // 单选情况 - 直接映射，无需转换（已经是正确格式）
      switch (interest) {
        case 'no_preference': return []
        default: return [interest]
      }
    }

    return []
  }

  // 将语言经验映射到已掌握语言（基于新的问卷格式）
  const mapKnownLanguages = (experienceCount?: string, nativeLanguage?: string) => {
    const knownLanguages = []

    // 添加母语
    if (nativeLanguage && nativeLanguage !== 'other') {
      knownLanguages.push({
        languageId: nativeLanguage,
        proficiency: 'advanced' as const,
        yearsStudied: 20,
        lastUsed: 'recently' as const
      })
    }

    // 根据掌握语言数量添加其他语言（简化处理）
    const count = parseInt(experienceCount || '0')

    // 如果掌握多门语言，默认添加英语（如果母语不是英语）
    if (count > 0 && nativeLanguage !== 'english') {
      knownLanguages.push({
        languageId: 'english',
        proficiency: count >= 2 ? 'advanced' as const : 'intermediate' as const,
        yearsStudied: Math.min(count * 3, 10),
        lastUsed: 'recently' as const
      })
    }

    return knownLanguages
  }

  // 将每日时间直接映射到时间承诺（精确匹配算法参数）
  const mapTimeCommitment = (dailyTime?: string) => {
    switch (dailyTime) {
      case 'intensive': return 'intensive'  // 2小时或以上
      case 'regular': return 'regular'      // 1小时左右
      case 'light': return 'casual'         // 30分钟左右
      case 'irregular': return 'casual'     // 不固定时间
      default: return 'regular'
    }
  }

  // 映射学习风格
  const mapLearningStyle = (style?: string) => {
    switch (style) {
      case 'systematic': return ['structured']
      case 'practical': return ['practical']
      case 'cultural_immersion': return ['immersive']
      case 'mixed': return ['mixed']
      case 'need_advice': return ['mixed']
      default: return ['mixed']
    }
  }

  // 直接使用用户选择的难度偏好，并进行合理性调整
  const calculateDifficultyPreference = (
    difficultyPref?: string,
    experienceCount?: string,
    timeExpectation?: string,
    persistence?: string
  ): number => {
    // 首先使用用户直接选择的难度偏好
    let difficulty = parseInt(difficultyPref || '3') // 默认中等难度

    // 根据经验进行合理性调整
    const experience = parseInt(experienceCount || '0')
    if (experience === 0 && difficulty > 3) {
      difficulty = Math.min(difficulty, 3) // 零基础用户不建议选择过高难度
    }
    if (experience >= 3 && difficulty < 2) {
      difficulty = Math.max(difficulty, 2) // 有经验用户可以尝试更有挑战性的语言
    }

    // 根据时间期望微调
    switch (timeExpectation) {
      case '3months': difficulty = Math.min(difficulty, 3); break // 时间紧张建议降低难度
      case 'no_rush': difficulty = Math.min(difficulty + 0.5, 5); break // 时间充裕可以提高难度
    }

    // 根据坚持性微调
    switch (persistence) {
      case 'weak': difficulty = Math.max(difficulty - 0.5, 1); break
      case 'very_strong': difficulty = Math.min(difficulty + 0.5, 5); break
    }

    return Math.max(1, Math.min(5, Math.round(difficulty * 10) / 10)) // 保留一位小数
  }

  // 计算时间安排
  const mapTimeSchedule = (timeCommitment: string, timeExpectation?: string) => {
    let dailyMinutes = 60
    let weeklyDays = 4
    let consistency = 3

    switch (timeCommitment) {
      case 'casual':
        dailyMinutes = 30
        weeklyDays = 3
        consistency = 2
        break
      case 'intensive':
        dailyMinutes = 120
        weeklyDays = 6
        consistency = 4
        break
      case 'regular':
      default:
        dailyMinutes = 60
        weeklyDays = 4
        consistency = 3
        break
    }

    // 根据时间期望调整一致性
    if (timeExpectation === '1_3_months') consistency += 1
    if (timeExpectation === 'no_specific_time') consistency -= 1

    return {
      dailyMinutes,
      weeklyDays,
      preferredTimes: ['evening'], // 默认晚上
      consistency: Math.max(1, Math.min(5, consistency))
    }
  }

  // 获取问卷数据
  const nativeLanguage = frontendData.nativeLanguage || getAnswer('q3_native_language') || 'chinese'
  const learningPurpose = frontendData.learningPurpose || getAnswer('q5_learning_purpose')
  const culturalInterest = frontendData.culturalInterest || getAnswer('q7_cultural_interest')
  const languageExperience = frontendData.languageExperience || getAnswer('q4_language_experience')
  const timeExpectation = frontendData.timeExpectation || getAnswer('q6_time_expectation')
  const difficultyPref = frontendData.difficultyPreference || getAnswer('q10_difficulty_preference')
  const dailyTime = frontendData.dailyTime || getAnswer('q11_daily_time')
  const persistence = frontendData.persistence || getAnswer('q9_persistence')
  const learningStyle = frontendData.learningStyle || getAnswer('q8_learning_style')

  const timeCommitment = mapTimeCommitment(dailyTime) as 'casual' | 'regular' | 'intensive'

  // 构建SurveyResponses对象
  const surveyResponses: SurveyResponses = {
    // 语言背景
    nativeLanguage,
    knownLanguages: mapKnownLanguages(languageExperience, nativeLanguage),

    // 学习目标和动机
    learningGoals: mapLearningGoals(learningPurpose),
    motivation: {
      primary: learningPurpose || 'general',
      secondary: [],
      urgency: timeExpectation === '3months' ? 5 :
               timeExpectation === '6months' ? 3 :
               timeExpectation === '1year' ? 2 :
               timeExpectation === '2years' ? 1 : 2,
      commitment: persistence === 'very_strong' ? 5 :
                  persistence === 'good' ? 4 :
                  persistence === 'average' ? 3 :
                  persistence === 'weak' ? 2 : 3
    },

    // 时间和学习方式
    timeCommitment,
    preferredSchedule: mapTimeSchedule(timeCommitment, timeExpectation),

    // 学习偏好
    learningStyle: mapLearningStyle(learningStyle),
    contentPreferences: {
      interactive: learningStyle === 'mixed' ? 4 : 3,
      structured: learningStyle === 'systematic' ? 5 : 3,
      immersive: learningStyle === 'cultural_immersion' ? 5 : 3,
      practical: learningStyle === 'practical' ? 5 : 3,
      cultural: Array.isArray(culturalInterest) ?
                culturalInterest.length > 0 ? 5 : 2 :
                culturalInterest ? 5 : 3
    },

    // 文化兴趣和背景
    culturalInterests: mapCulturalInterests(culturalInterest),
    travelExperience: [], // 暂时为空，可以后续扩展
    culturalExposure: {
      movies: true,  // 默认值
      music: true,
      books: false,
      friends: false
    },

    // 学习偏好和限制（使用更新的函数）
    difficultyPreference: calculateDifficultyPreference(
      difficultyPref,
      languageExperience,
      timeExpectation,
      persistence
    ),
    timeline: timeExpectation || '6months',
    budgetRange: 'medium', // 默认中等预算
    devicePreference: ['desktop', 'mobile'], // 默认支持多设备

    // 特殊需求
    specificNeeds: learningPurpose === 'career' ? ['business'] :
                  learningPurpose === 'academic' ? ['academic'] :
                  learningPurpose === 'travel' ? ['travel'] : [],
    accessibilityNeeds: [],
    previousFailures: {
      hasFailures: false, // 新问卷格式没有失败经历字段
      reasons: [],
      languages: []
    }
  }

  return surveyResponses
}

/**
 * 验证前端问卷数据的完整性
 */
export function validateSurveyData(data: FrontendSurveyData): boolean {
  // 检查必需的基本信息
  if (!data.nativeLanguage && !data.answers.find(a => a.questionId === 'q3_native_language')) {
    return false
  }

  if (!data.learningPurpose && !data.answers.find(a => a.questionId === 'q5_learning_purpose')) {
    return false
  }

  return true
}

/**
 * 为测试提供默认的问卷数据
 */
export function getDefaultSurveyData(): SurveyResponses {
  const defaultFrontendData: FrontendSurveyData = {
    answers: [
      { questionId: 'q3_native_language', answer: 'chinese' },
      { questionId: 'q4_language_experience', answer: 'basic_english' },
      { questionId: 'q5_learning_purpose', answer: 'cultural_interest' },
      { questionId: 'q6_time_expectation', answer: '6_months' },
      { questionId: 'q7_cultural_interest', answer: 'east_asia' }
    ],
    nativeLanguage: 'chinese',
    languageExperience: 'basic_english',
    learningPurpose: 'cultural_interest',
    timeExpectation: '6_months',
    culturalInterest: 'east_asia'
  }

  return convertSurveyData(defaultFrontendData)
}
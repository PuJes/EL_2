/**
 * 语言学习个性化推荐算法
 * 基于多维度权重计算，提供精准的语言推荐
 * 从原项目移植并优化
 */

import type { Language, PersonalizedDifficulty } from '../types/language'
import type { SurveyResponses, LanguageRecommendation, RecommendationReason, LearningPath } from '../types/survey'

// 算法配置常量 - 从原项目移植
const ALGORITHM_CONFIG = {
  // 权重分配 (总和必须为1)
  weights: {
    culturalMatch: 0.30,      // 文化兴趣匹配
    difficultyFit: 0.25,      // 难度适配度
    goalAlignment: 0.20,      // 学习目标匹配
    timeFeasibility: 0.15,    // 时间可行性
    practicalValue: 0.10      // 实用价值
  },

  // 难度调整因子
  difficultyAdjustment: {
    motherTongueBonus: 0.3,   // 母语相似度奖励
    experienceBonus: 0.2,     // 学习经验奖励
    timeConstraintPenalty: 0.15, // 时间约束惩罚
  },

  // 文化匹配映射
  culturalMapping: {
    'east-asia': ['japanese', 'korean', 'chinese'],
    'southeast-asia': ['thai', 'vietnamese', 'indonesian'],
    'europe': ['french', 'german', 'italian', 'spanish'],
    'latin-america': ['spanish', 'portuguese'],
    'middle-east': ['arabic', 'persian', 'turkish'],
    'africa': ['swahili', 'arabic'],
    'north-america': ['english', 'french'],
    'oceania': ['english']
  } as Record<string, string[]>,

  // 语言各维度预设评分 (0-100分)
  languageMotivationScores: {
    'japanese': { business: 85, travel: 90, culture: 95, academic: 75 },
    'korean': { business: 80, travel: 85, culture: 90, academic: 70 },
    'spanish': { business: 75, travel: 95, culture: 85, academic: 70 },
    'french': { business: 80, travel: 85, culture: 90, academic: 85 },
    'german': { business: 90, travel: 75, culture: 80, academic: 90 },
    'english': { business: 95, travel: 80, culture: 75, academic: 95 },
    'chinese': { business: 90, travel: 80, culture: 95, academic: 85 },
    'italian': { business: 70, travel: 95, culture: 90, academic: 75 },
    'portuguese': { business: 65, travel: 85, culture: 80, academic: 65 },
    'dutch': { business: 80, travel: 70, culture: 75, academic: 80 },
    'russian': { business: 70, travel: 75, culture: 85, academic: 85 },
    'arabic': { business: 75, travel: 80, culture: 90, academic: 75 }
  } as Record<string, Record<string, number>>,

  // 语系相似度矩阵
  languageFamilySimilarity: {
    // 汉语族
    'chinese': { 'japanese': 0.5, 'korean': 0.3, 'vietnamese': 0.2 },
    'japanese': { 'chinese': 0.5, 'korean': 0.4 },
    'korean': { 'chinese': 0.3, 'japanese': 0.4 },

    // 印欧语系 - 日耳曼语族
    'english': { 'german': 0.6, 'dutch': 0.5, 'swedish': 0.4, 'french': 0.3 },
    'german': { 'english': 0.6, 'dutch': 0.7, 'swedish': 0.6 },

    // 印欧语系 - 罗曼语族
    'spanish': { 'portuguese': 0.8, 'italian': 0.7, 'french': 0.6 },
    'portuguese': { 'spanish': 0.8, 'italian': 0.6, 'french': 0.5 },
    'italian': { 'spanish': 0.7, 'french': 0.7, 'portuguese': 0.6 },
    'french': { 'spanish': 0.6, 'italian': 0.7, 'portuguese': 0.5 },

    // 其他语族
    'arabic': { 'persian': 0.4, 'turkish': 0.2, 'hebrew': 0.5 },
    'russian': { 'ukrainian': 0.7, 'polish': 0.5, 'czech': 0.5 }
  } as Record<string, Record<string, number>>,

  // 主要母语的难度基准数据 (1-5分制)
  nativeLanguageBaselines: {
    'chinese': { grammar: 4, pronunciation: 5, writing: 5 },
    'english': { grammar: 2, pronunciation: 3, writing: 2 },
    'spanish': { grammar: 3, pronunciation: 2, writing: 2 },
    'french': { grammar: 4, pronunciation: 3, writing: 3 },
    'german': { grammar: 5, pronunciation: 3, writing: 3 },
    'japanese': { grammar: 4, pronunciation: 3, writing: 5 },
    'korean': { grammar: 4, pronunciation: 3, writing: 3 },
    'arabic': { grammar: 5, pronunciation: 4, writing: 4 },
    'russian': { grammar: 5, pronunciation: 4, writing: 4 },
    'portuguese': { grammar: 3, pronunciation: 3, writing: 2 },
    'italian': { grammar: 3, pronunciation: 2, writing: 2 }
  } as Record<string, { grammar: number, pronunciation: number, writing: number }>
}

export class LanguageRecommendationEngine {
  private languages: Language[]

  constructor(languages: Language[]) {
    this.languages = languages
  }

  /**
   * 主推荐方法
   */
  async recommend(responses: SurveyResponses): Promise<LanguageRecommendation[]> {
    const recommendations: LanguageRecommendation[] = []

    // 为每种语言计算推荐分数
    for (const language of this.languages) {
      const recommendation = await this.calculateRecommendation(language, responses)
      recommendations.push(recommendation)
    }

    // 按匹配分数排序
    recommendations.sort((a, b) => b.matchScore - a.matchScore)

    // 添加排名
    recommendations.forEach((rec, index) => {
      rec.rank = index + 1
    })

    return recommendations
  }

  /**
   * 计算单个语言的推荐度
   */
  private async calculateRecommendation(
    language: Language,
    responses: SurveyResponses
  ): Promise<LanguageRecommendation> {

    // 1. 计算各维度分数
    const culturalScore = this.calculateCulturalMatch(language, responses)
    const difficultyScore = this.calculateDifficultyFit(language, responses)
    const goalScore = this.calculateGoalAlignment(language, responses)
    const timeScore = this.calculateTimeFeasibility(language, responses)
    const practicalScore = this.calculatePracticalValue(language, responses)

    // 2. 加权计算总分
    const matchScore = Math.round(
      culturalScore * ALGORITHM_CONFIG.weights.culturalMatch +
      difficultyScore * ALGORITHM_CONFIG.weights.difficultyFit +
      goalScore * ALGORITHM_CONFIG.weights.goalAlignment +
      timeScore * ALGORITHM_CONFIG.weights.timeFeasibility +
      practicalScore * ALGORITHM_CONFIG.weights.practicalValue
    )

    // 3. 生成推荐理由
    const reasons = this.generateReasons(
      language, responses,
      { culturalScore, difficultyScore, goalScore, timeScore, practicalScore }
    )

    // 4. 计算个性化难度
    const personalizedDifficulty = this.calculatePersonalizedDifficulty(language, responses)

    // 5. 生成学习路径
    const learningPath = this.generateLearningPath(language, responses, personalizedDifficulty)

    // 6. 分析优缺点
    const analysis = this.generateAnalysis(language, responses)

    // 7. 生成成功预测
    const successPrediction = this.generateSuccessPrediction(language, responses, personalizedDifficulty)

    return {
      language,
      personalizedDifficulty,
      matchScore,
      rank: 0, // 将在排序后设置
      dimensionScores: {
        culturalMatch: culturalScore,
        difficultyFit: difficultyScore,
        goalAlignment: goalScore,
        timeFeasibility: timeScore,
        practicalValue: practicalScore
      },
      reasons,
      learningPath,
      analysis,
      tracks: {
        intensive: {
          ...personalizedDifficulty,
          overallDifficulty: personalizedDifficulty.overallDifficulty * 0.8,
          timeEstimateWeeks: Math.ceil(personalizedDifficulty.timeEstimateWeeks * 0.7)
        },
        regular: personalizedDifficulty,
        casual: {
          ...personalizedDifficulty,
          overallDifficulty: personalizedDifficulty.overallDifficulty * 1.2,
          timeEstimateWeeks: Math.ceil(personalizedDifficulty.timeEstimateWeeks * 1.5)
        }
      },
      successPrediction
    }
  }

  /**
   * 计算文化兴趣匹配度 (0-100)
   */
  private calculateCulturalMatch(language: Language, responses: SurveyResponses): number {
    let score = 0
    let maxScore = 100

    // 基于文化兴趣区域匹配
    const culturalInterests = responses.culturalInterests || []

    for (const interest of culturalInterests) {
      const matchingLanguages = ALGORITHM_CONFIG.culturalMapping[interest] || []
      if (matchingLanguages.includes(language.id)) {
        score += 100 / culturalInterests.length
        break
      }
    }

    return Math.min(Math.round((score / maxScore) * 100), 100)
  }

  /**
   * 计算难度适配度 (0-100)
   */
  private calculateDifficultyFit(language: Language, responses: SurveyResponses): number {
    const baseDifficulty = language.difficulty || 3
    const userPreference = responses.difficultyPreference || 3

    // 基础适配度
    const baseMatch = 100 - Math.abs(baseDifficulty - userPreference) * 20

    // 母语相似度调整
    let familyBonus = 0
    const nativeLanguage = responses.nativeLanguage
    if (nativeLanguage && ALGORITHM_CONFIG.languageFamilySimilarity[nativeLanguage]) {
      const similarity = ALGORITHM_CONFIG.languageFamilySimilarity[nativeLanguage][language.id] || 0
      if (similarity >= 0.6) {
        familyBonus = similarity * 60
      } else if (similarity >= 0.3) {
        familyBonus = similarity * 50
      } else {
        familyBonus = similarity * 40
      }
    }

    // 学习经验调整
    let experienceBonus = 0
    const knownLanguagesCount = responses.knownLanguages?.length || 0
    if (knownLanguagesCount > 0) {
      experienceBonus = Math.min(knownLanguagesCount * 10, 30)
    }

    const finalScore = baseMatch + familyBonus + experienceBonus
    return Math.min(Math.max(Math.round(finalScore), 0), 100)
  }

  /**
   * 计算学习目标匹配度 (0-100)
   */
  private calculateGoalAlignment(language: Language, responses: SurveyResponses): number {
    let score = 50 // 默认基础分

    const motivation = responses.motivation?.primary
    const languageScores = ALGORITHM_CONFIG.languageMotivationScores[language.id]

    if (languageScores && motivation) {
      switch (motivation) {
        case 'career':
          score = languageScores.business || 50
          break
        case 'travel':
          score = languageScores.travel || 50
          break
        case 'culture':
          score = languageScores.culture || 50
          break
        case 'academic':
          score = languageScores.academic || 50
          break
      }
    }

    return Math.round(score)
  }

  /**
   * 计算时间可行性 (0-100)
   */
  private calculateTimeFeasibility(language: Language, responses: SurveyResponses): number {
    const dailyMinutes = responses.timeCommitment === 'intensive' ? 120 :
                        responses.timeCommitment === 'regular' ? 60 : 30

    const totalHours = language.learningTimeEstimate?.totalHours || 1000
    const timeline = responses.timeline

    // 计算需要的总天数
    const requiredDays = Math.ceil(totalHours * 60 / dailyMinutes)

    // 根据用户时间线计算可行性
    let timelineLimit: number
    switch (timeline) {
      case '3months': timelineLimit = 90; break
      case '6months': timelineLimit = 180; break
      case '1year': timelineLimit = 365; break
      case '2years': timelineLimit = 730; break
      case 'no_rush': timelineLimit = 1095; break
      default: timelineLimit = 365
    }

    // 可行性分数
    const feasibilityRatio = timelineLimit / requiredDays
    if (feasibilityRatio >= 1.5) return 100
    if (feasibilityRatio >= 1.2) return 80
    if (feasibilityRatio >= 1.0) return 60
    if (feasibilityRatio >= 0.8) return 40
    if (feasibilityRatio >= 0.6) return 20
    return 10
  }

  /**
   * 计算实用价值 (0-100)
   */
  private calculatePracticalValue(language: Language, responses: SurveyResponses): number {
    let score = 0

    // 使用人数 (60%)
    const speakers = language.speakers?.total || 0
    if (speakers > 1000000000) score += 60
    else if (speakers > 500000000) score += 50
    else if (speakers > 100000000) score += 40
    else if (speakers > 50000000) score += 30
    else score += 20

    // 地理覆盖 (40%)
    const regions = language.regions?.length || 0
    score += Math.min(regions * 4, 40)

    return Math.min(score, 100)
  }

  /**
   * 计算个性化难度 - 这是核心的难度分析模块
   */
  private calculatePersonalizedDifficulty(language: Language, responses: SurveyResponses): PersonalizedDifficulty {
    const baseDifficulty = language.difficulty || 3
    let overallDifficulty = baseDifficulty

    // 获取目标语言的难度分析数据
    const targetGrammar = language.difficultyAnalysis?.grammar || baseDifficulty
    const targetPronunciation = language.difficultyAnalysis?.pronunciation || baseDifficulty
    const targetWriting = language.difficultyAnalysis?.writing || baseDifficulty

    // 获取用户母语基准
    const nativeBaseline = this.getNativeLanguageBaseline(responses.nativeLanguage)

    // 计算各个影响因子
    const nativeLanguage = responses.nativeLanguage
    const familyRelation = nativeLanguage && ALGORITHM_CONFIG.languageFamilySimilarity[nativeLanguage]
      ? -(ALGORITHM_CONFIG.languageFamilySimilarity[nativeLanguage][language.id] || 0) * 0.5
      : 0

    // 根据语言学习经验调整文字系统难度
    const knownLanguagesCount = responses.knownLanguages?.length || 0
    const writingSystemBase = (targetWriting - nativeBaseline.writing) * 0.12
    const writingSystem = writingSystemBase - (knownLanguagesCount > 0 ? 0.2 : 0)

    // 基于真实数据的语法和发音对比
    const grammar = (targetGrammar - nativeBaseline.grammar) * 0.15
    const phonetics = (targetPronunciation - nativeBaseline.pronunciation) * 0.1

    // 应用调整
    overallDifficulty += familyRelation + writingSystem + grammar + phonetics
    overallDifficulty = Math.max(1, Math.min(5, overallDifficulty))

    // 计算时间估算 (周)
    const baseHours = language.learningTimeEstimate?.totalHours || 1000
    const dailyMinutes = responses.timeCommitment === 'intensive' ? 120 :
                        responses.timeCommitment === 'regular' ? 60 : 30
    const timeEstimateWeeks = Math.ceil(baseHours * 60 / (dailyMinutes * 7))

    // 置信度计算
    const confidence = Math.max(0.6, Math.min(0.95, 1 - Math.abs(overallDifficulty - baseDifficulty) * 0.2))

    // 生成理由
    const reasons = []
    if (familyRelation < -0.1) reasons.push('母语相似性降低了学习难度')
    if (writingSystemBase < -0.1) reasons.push(`文字系统比母语简单(${targetWriting} vs ${nativeBaseline.writing})`)
    if (writingSystemBase > 0.1) reasons.push(`文字系统比母语复杂(${targetWriting} vs ${nativeBaseline.writing})`)
    if (knownLanguagesCount > 0) reasons.push('已有语言学习经验提供优势')
    if (grammar < -0.1) reasons.push(`语法结构比母语简单(${targetGrammar} vs ${nativeBaseline.grammar})`)
    if (grammar > 0.1) reasons.push(`语法结构比母语复杂(${targetGrammar} vs ${nativeBaseline.grammar})`)
    if (phonetics < -0.1) reasons.push(`发音系统比母语简单(${targetPronunciation} vs ${nativeBaseline.pronunciation})`)
    if (phonetics > 0.1) reasons.push(`发音系统比母语复杂(${targetPronunciation} vs ${nativeBaseline.pronunciation})`)
    if (overallDifficulty < baseDifficulty) reasons.push('个人背景优势使学习更容易')
    if (overallDifficulty > baseDifficulty) reasons.push('需要克服一些额外挑战')

    return {
      overallDifficulty,
      timeEstimateWeeks,
      breakdown: {
        familyRelation,
        writingSystem,
        grammar,
        phonetics
      },
      confidence,
      reasons
    }
  }

  /**
   * 获取母语基准数据
   */
  private getNativeLanguageBaseline(nativeLanguage: string | undefined): { grammar: number, pronunciation: number, writing: number } {
    if (!nativeLanguage || !ALGORITHM_CONFIG.nativeLanguageBaselines[nativeLanguage]) {
      return { grammar: 3, pronunciation: 3, writing: 3 }
    }
    return ALGORITHM_CONFIG.nativeLanguageBaselines[nativeLanguage]
  }

  /**
   * 生成推荐理由
   */
  private generateReasons(
    language: Language,
    responses: SurveyResponses,
    scores: { culturalScore: number, difficultyScore: number, goalScore: number, timeScore: number, practicalScore: number }
  ) {
    const primary: RecommendationReason[] = []
    const secondary: RecommendationReason[] = []
    const warnings: string[] = []

    // 主要理由 (分数>70的维度)
    if (scores.culturalScore > 70) {
      primary.push({
        type: 'cultural_interest',
        description: `与您的文化兴趣高度匹配 (${scores.culturalScore}%)`,
        score: scores.culturalScore,
        weight: ALGORITHM_CONFIG.weights.culturalMatch
      })
    }

    if (scores.difficultyScore > 70) {
      primary.push({
        type: 'difficulty_match',
        description: `难度水平符合您的学习偏好 (${scores.difficultyScore}%)`,
        score: scores.difficultyScore,
        weight: ALGORITHM_CONFIG.weights.difficultyFit
      })
    }

    if (scores.goalScore > 70) {
      primary.push({
        type: 'practical_value',
        description: `与您的学习目标高度契合 (${scores.goalScore}%)`,
        score: scores.goalScore,
        weight: ALGORITHM_CONFIG.weights.goalAlignment
      })
    }

    // 次要理由和警告
    if (scores.timeScore >= 50 && scores.timeScore <= 70) {
      secondary.push({
        type: 'time_feasible',
        description: `在您的时间范围内可以掌握 (${scores.timeScore}%)`,
        score: scores.timeScore,
        weight: ALGORITHM_CONFIG.weights.timeFeasibility
      })
    }

    if (scores.timeScore < 50) {
      warnings.push('根据您的时间安排，可能需要更长时间才能达到预期水平')
    }

    if (scores.difficultyScore < 50) {
      warnings.push('该语言的难度可能不太符合您的偏好')
    }

    return { primary, secondary, warnings }
  }

  /**
   * 生成学习路径
   */
  private generateLearningPath(language: Language, responses: SurveyResponses, difficulty: PersonalizedDifficulty): LearningPath {
    const phases = [
      {
        name: '入门阶段',
        duration: '1-3个月',
        goals: ['掌握基础语法', '学习常用词汇', '进行简单对话'],
        milestones: ['掌握500个常用词', '完成自我介绍', '理解简单对话'],
        resources: ['基础教材', '语音练习', '词汇卡片'],
        assessments: ['词汇测试', '发音评估', '对话练习']
      },
      {
        name: '进阶阶段',
        duration: '3-8个月',
        goals: ['扩展词汇量', '掌握复杂语法', '提升听说能力'],
        milestones: ['掌握2000个词汇', '进行日常对话', '理解慢速语音'],
        resources: ['进阶教材', '听力材料', '对话练习'],
        assessments: ['语法测试', '听力测试', '口语评估']
      },
      {
        name: '精通阶段',
        duration: '8个月以上',
        goals: ['达到流利水平', '文化深度理解', '专业领域应用'],
        milestones: ['掌握5000+词汇', '流利对话', '阅读原版内容'],
        resources: ['原版材料', '文化内容', '专业资源'],
        assessments: ['综合能力测试', '文化理解测试', '实践应用评估']
      }
    ]

    const schedule = this.generateSchedule(responses)

    return {
      phases,
      totalDuration: '6个月 - 2年',
      difficultyProgression: phases.map(() => difficulty.overallDifficulty),
      recommendedSchedule: schedule
    }
  }

  private generateSchedule(responses: SurveyResponses) {
    const timeCommitment = responses.timeCommitment || 'regular'

    switch (timeCommitment) {
      case 'intensive':
        return { hoursPerWeek: 10, studyDays: 6, sessionLength: 90, restDays: ['周日'] }
      case 'regular':
        return { hoursPerWeek: 5, studyDays: 4, sessionLength: 60, restDays: ['周六', '周日'] }
      case 'light':
        return { hoursPerWeek: 3, studyDays: 3, sessionLength: 45, restDays: ['周末'] }
      default:
        return { hoursPerWeek: 5, studyDays: 4, sessionLength: 60, restDays: ['周六', '周日'] }
    }
  }

  /**
   * 生成优缺点分析
   */
  private generateAnalysis(language: Language, responses: SurveyResponses) {
    const pros: string[] = []
    const cons: string[] = []

    if (language.difficulty <= 2) {
      pros.push('相对容易学习，入门门槛较低')
    } else if (language.difficulty >= 4) {
      cons.push('学习难度较高，需要更多时间和耐心')
    }

    if (language.speakers?.total && language.speakers.total > 500000000) {
      pros.push('使用人数众多，资源丰富')
    }

    if (language.tags?.includes('商务')) {
      pros.push('商务价值高，职业发展机会多')
    }

    return {
      pros,
      cons,
      alternatives: {
        easier: this.findAlternatives(language, 'easier'),
        similar: this.findAlternatives(language, 'similar'),
        harder: this.findAlternatives(language, 'harder')
      }
    }
  }

  private findAlternatives(language: Language, type: 'easier' | 'similar' | 'harder'): string[] {
    const currentDifficulty = language.difficulty || 3
    let targetDifficulties: number[]

    switch (type) {
      case 'easier':
        targetDifficulties = [currentDifficulty - 2, currentDifficulty - 1]
        break
      case 'similar':
        targetDifficulties = [currentDifficulty]
        break
      case 'harder':
        targetDifficulties = [currentDifficulty + 1, currentDifficulty + 2]
        break
    }

    return this.languages
      .filter(l => l.id !== language.id && targetDifficulties.includes(l.difficulty || 3))
      .slice(0, 3)
      .map(l => l.name)
  }

  /**
   * 生成成功预测
   */
  private generateSuccessPrediction(language: Language, responses: SurveyResponses, difficulty: PersonalizedDifficulty) {
    // 基于多个因子计算成功概率
    let probability = 0.7 // 基础概率

    // 难度适配调整
    const difficultyGap = Math.abs(difficulty.overallDifficulty - (responses.difficultyPreference || 3))
    probability -= difficultyGap * 0.1

    // 时间承诺调整
    if (responses.timeCommitment === 'intensive') probability += 0.15
    else if (responses.timeCommitment === 'light') probability -= 0.1

    // 动机强度调整
    if (responses.motivation?.commitment && responses.motivation.commitment >= 4) probability += 0.1

    probability = Math.max(0.3, Math.min(0.95, probability))

    const timeline = this.predictTimeline(language, responses)
    const challengePoints = this.identifyChallengePoints(language, responses)
    const supportNeeded = this.identifySupportNeeded(language, responses)

    return {
      probability,
      timeline,
      challengePoints,
      supportNeeded
    }
  }

  private predictTimeline(language: Language, responses: SurveyResponses): string {
    const baseHours = language.learningTimeEstimate?.totalHours || 1000
    const dailyMinutes = responses.timeCommitment === 'intensive' ? 120 :
                        responses.timeCommitment === 'regular' ? 60 : 30

    const months = Math.ceil(baseHours * 60 / (dailyMinutes * 30))

    if (months <= 6) return '6个月内'
    if (months <= 12) return '1年内'
    if (months <= 24) return '2年内'
    return '2年以上'
  }

  private identifyChallengePoints(language: Language, responses: SurveyResponses): string[] {
    const challenges: string[] = []

    if (language.difficulty >= 4) challenges.push('语法复杂度较高')
    if (language.writingSystem?.includes('chinese')) challenges.push('文字系统学习')
    if (!responses.culturalInterests?.some(i => language.tags?.includes(i))) {
      challenges.push('文化背景理解')
    }

    return challenges
  }

  private identifySupportNeeded(language: Language, responses: SurveyResponses): string[] {
    const support: string[] = []

    if (responses.timeCommitment === 'light') support.push('学习计划制定')
    if (language.difficulty >= 4) support.push('专业指导')
    support.push('学习社区交流')

    return support
  }
}

/**
 * 工厂函数：创建推荐引擎实例
 */
export function createRecommendationEngine(languages: Language[]): LanguageRecommendationEngine {
  return new LanguageRecommendationEngine(languages)
}

/**
 * 快速推荐函数
 */
export async function getLanguageRecommendations(
  languages: Language[],
  responses: SurveyResponses
): Promise<LanguageRecommendation[]> {
  const engine = createRecommendationEngine(languages)
  return await engine.recommend(responses)
}
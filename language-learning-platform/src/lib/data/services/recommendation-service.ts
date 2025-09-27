/**
 * 语言推荐服务
 * 基于用户问卷结果生成个性化语言推荐
 */

import type {
  Language,
  SurveyResponse,
  LanguageRecommendation,
  RecommendationReason,
  LearningPath,
  ConfidenceLevel,
  UserProfile
} from '@/lib/types'
import { LanguageModel } from '../models/language'
import type { LanguageRepository } from '../repositories/language-repository'

export interface MatchingFactors {
  difficulty: number      // 难度匹配度
  cultural: number        // 文化兴趣匹配度
  practical: number       // 实用性匹配度
  time: number           // 时间投入匹配度
  experience: number     // 经验匹配度
}

export class RecommendationService {
  constructor(
    private languageRepository: LanguageRepository
  ) {}

  /**
   * 生成语言推荐
   */
  async generateRecommendations(
    surveyResponse: SurveyResponse,
    userProfile?: UserProfile
  ): Promise<LanguageRecommendation[]> {
    // 获取所有语言
    const languages = await this.languageRepository.getAllLanguages()
    const languageModels = LanguageModel.fromArray(languages)

    // 计算每种语言的匹配度
    const recommendations = await Promise.all(
      languageModels.map(async (languageModel) => {
        const language = languageModel.toJSON()
        const matchScore = await this.calculateMatchScore(
          language,
          surveyResponse,
          userProfile
        )

        const reasons = this.generateReasons(
          language,
          surveyResponse,
          matchScore.factors
        )

        const learningPath = this.generateLearningPath(
          language,
          surveyResponse.score.preferences
        )

        const confidenceLevel = this.calculateConfidence(matchScore.total, reasons)

        return {
          language,
          matchScore: matchScore.total,
          reasons,
          confidenceLevel,
          learningPath,
          pros: this.generatePros(language, surveyResponse),
          cons: this.generateCons(language, surveyResponse),
          rank: 0 // 将在排序后设置
        }
      })
    )

    // 按匹配度排序并设置排名
    const sortedRecommendations = recommendations
      .sort((a, b) => b.matchScore - a.matchScore)
      .map((rec, index) => ({
        ...rec,
        rank: index + 1
      }))

    // 返回前10个推荐
    return sortedRecommendations.slice(0, 10)
  }

  /**
   * 计算语言匹配度
   */
  private async calculateMatchScore(
    language: Language,
    surveyResponse: SurveyResponse,
    userProfile?: UserProfile
  ): Promise<{ total: number; factors: MatchingFactors }> {
    const preferences = surveyResponse.score.preferences

    const factors: MatchingFactors = {
      difficulty: this.calculateDifficultyMatch(language, preferences.difficultyPreference),
      cultural: this.calculateCulturalMatch(language, preferences.culturalInterests),
      practical: this.calculatePracticalMatch(language, preferences.practicalFocus),
      time: this.calculateTimeMatch(language, preferences.timeCommitment),
      experience: this.calculateExperienceMatch(language, userProfile)
    }

    // 权重配置
    const weights = surveyResponse.score.categories
    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0)

    // 加权计算总分
    const total = (
      factors.difficulty * (weights.difficulty / totalWeight) +
      factors.cultural * (weights.culture / totalWeight) +
      factors.practical * (weights.motivation / totalWeight) +
      factors.time * (weights.time / totalWeight) +
      factors.experience * (weights.experience / totalWeight)
    ) * 100

    return {
      total: Math.round(total * 100) / 100,
      factors
    }
  }

  /**
   * 计算难度匹配度
   */
  private calculateDifficultyMatch(language: Language, preferredDifficulty: number): number {
    const diff = Math.abs(language.difficulty - preferredDifficulty)

    // 完全匹配得满分，差距越大分数越低
    return Math.max(0, (5 - diff) / 5)
  }

  /**
   * 计算文化兴趣匹配度
   */
  private calculateCulturalMatch(language: Language, culturalInterests: string[]): number {
    if (culturalInterests.length === 0) return 0.5

    const languageCultureTags = [
      ...language.culturalInfo.traditions,
      ...language.culturalInfo.arts,
      ...language.tags,
      ...language.regions.map(r => r.name)
    ].map(tag => tag.toLowerCase())

    let matchScore = 0
    for (const interest of culturalInterests) {
      const interestLower = interest.toLowerCase()
      const hasMatch = languageCultureTags.some(tag =>
        tag.includes(interestLower) || interestLower.includes(tag)
      )
      if (hasMatch) matchScore += 1
    }

    return Math.min(matchScore / culturalInterests.length, 1)
  }

  /**
   * 计算实用性匹配度
   */
  private calculatePracticalMatch(language: Language, practicalFocus: number): number {
    // 基于使用者数量评估实用性
    const speakerScore = Math.min(language.speakers.total / 100000000, 1) // 1亿使用者为满分

    // 基于分类评估商务价值
    const categoryScore = {
      'business': 1.0,
      'popular': 0.9,
      'cultural': 0.6,
      'niche': 0.3
    }[language.category] || 0.5

    const practicalScore = (speakerScore * 0.6 + categoryScore * 0.4)

    // 用户越注重实用性，语言的实用性得分影响越大
    return practicalScore * (practicalFocus / 5) + 0.5 * (1 - practicalFocus / 5)
  }

  /**
   * 计算时间投入匹配度
   */
  private calculateTimeMatch(language: Language, timeCommitment: string): number {
    const timeMap = { 'casual': 1, 'regular': 3, 'intensive': 5 }
    const userTime = timeMap[timeCommitment as keyof typeof timeMap] || 3

    // 假设难度越高需要的时间投入越多
    const requiredTime = language.difficulty

    if (userTime >= requiredTime) {
      return 1 // 时间充足
    } else {
      return Math.max(0.3, userTime / requiredTime) // 最低0.3分
    }
  }

  /**
   * 计算经验匹配度
   */
  private calculateExperienceMatch(language: Language, userProfile?: UserProfile): number {
    if (!userProfile) return 0.5

    // 检查用户是否已知相关语言
    const relatedLanguages = userProfile.knownLanguages.filter(lang => {
      // 简单的语系关联判断
      return language.metadata.family === 'related' // 这里需要更复杂的语系判断逻辑
    })

    if (relatedLanguages.length > 0) {
      return 0.8 // 有相关语言经验
    }

    // 基于总体语言学习经验
    const experienceBonus = Math.min(userProfile.knownLanguages.length * 0.1, 0.3)
    return 0.5 + experienceBonus
  }

  /**
   * 生成推荐理由
   */
  private generateReasons(
    language: Language,
    surveyResponse: SurveyResponse,
    factors: MatchingFactors
  ): RecommendationReason[] {
    const reasons: RecommendationReason[] = []
    const preferences = surveyResponse.score.preferences

    // 难度匹配
    if (factors.difficulty > 0.7) {
      reasons.push({
        type: 'difficulty_match',
        description: `难度等级(${language.difficulty}/5)与您的期望高度匹配`,
        score: factors.difficulty,
        weight: 0.25
      })
    }

    // 文化兴趣匹配
    if (factors.cultural > 0.6) {
      const matchedInterests = preferences.culturalInterests.slice(0, 2).join('、')
      reasons.push({
        type: 'cultural_interest',
        description: `与您的文化兴趣(${matchedInterests})高度契合`,
        score: factors.cultural,
        weight: 0.25
      })
    }

    // 实用性匹配
    if (factors.practical > 0.7) {
      reasons.push({
        type: 'practical_value',
        description: `全球${Math.round(language.speakers.total / 1000000)}百万使用者，实用价值高`,
        score: factors.practical,
        weight: 0.25
      })
    }

    // 时间可行性
    if (factors.time > 0.8) {
      reasons.push({
        type: 'time_feasible',
        description: `您的时间投入(${preferences.timeCommitment})完全可以应对`,
        score: factors.time,
        weight: 0.15
      })
    }

    // 经验匹配
    if (factors.experience > 0.7) {
      reasons.push({
        type: 'experience_level',
        description: '与您的语言学习经验很好匹配',
        score: factors.experience,
        weight: 0.1
      })
    }

    return reasons.sort((a, b) => b.score - a.score)
  }

  /**
   * 生成学习路径
   */
  private generateLearningPath(
    language: Language,
    preferences: any
  ): LearningPath {
    const timeCommitmentMap = {
      'casual': { hoursPerWeek: 2, studyDays: 2, sessionLength: 60 },
      'regular': { hoursPerWeek: 4, studyDays: 3, sessionLength: 80 },
      'intensive': { hoursPerWeek: 8, studyDays: 5, sessionLength: 90 }
    }

    const schedule = timeCommitmentMap[preferences.timeCommitment] ||
                    timeCommitmentMap['regular']

    const phases = [
      {
        name: '基础入门',
        duration: '1-3个月',
        goals: ['掌握基本发音', '学会常用问候', '理解基础语法'],
        resources: ['入门教材', '发音练习', '基础对话'],
        milestones: ['能进行简单自我介绍', '掌握100个常用词汇']
      },
      {
        name: '初级发展',
        duration: '3-6个月',
        goals: ['扩展词汇量', '掌握基础语法', '进行简单对话'],
        resources: ['中级教材', '语法练习', '日常对话'],
        milestones: ['词汇量达到500-1000', '能描述日常活动']
      },
      {
        name: '中级提升',
        duration: '6-12个月',
        goals: ['流利日常交流', '理解复杂文本', '文化深入了解'],
        resources: ['中高级教材', '新闻阅读', '文化材料'],
        milestones: ['能进行复杂话题讨论', '理解当地文化']
      }
    ]

    return {
      phases,
      totalDuration: `${language.learningTimeEstimate.totalHours}小时`,
      difficulty: language.difficulty,
      recommendedSchedule: schedule
    }
  }

  /**
   * 计算置信度
   */
  private calculateConfidence(matchScore: number, reasons: RecommendationReason[]): ConfidenceLevel {
    const reasonScore = reasons.length > 0 ?
      reasons.reduce((sum, reason) => sum + reason.score * reason.weight, 0) : 0

    const overallConfidence = (matchScore / 100) * 0.7 + reasonScore * 0.3

    if (overallConfidence >= 0.9) return 'very_high'
    if (overallConfidence >= 0.75) return 'high'
    if (overallConfidence >= 0.6) return 'medium'
    if (overallConfidence >= 0.4) return 'low'
    return 'very_low'
  }

  /**
   * 生成优点
   */
  private generatePros(language: Language, surveyResponse: SurveyResponse): string[] {
    const pros: string[] = []

    // 基于难度
    if (language.difficulty <= 2) {
      pros.push('学习难度相对较低')
    }

    // 基于使用者数量
    if (language.speakers.total > 50000000) {
      pros.push('全球使用者众多，实用性强')
    }

    // 基于文化
    if (language.culturalInfo.arts.length > 0) {
      pros.push('文化底蕴深厚，艺术形式丰富')
    }

    // 基于商务价值
    if (language.category === 'business') {
      pros.push('商务交流价值高')
    }

    // 基于学习资源
    if (language.resources.length > 10) {
      pros.push('学习资源丰富')
    }

    return pros.slice(0, 4) // 最多4个优点
  }

  /**
   * 生成缺点
   */
  private generateCons(language: Language, surveyResponse: SurveyResponse): string[] {
    const cons: string[] = []

    // 基于难度
    if (language.difficulty >= 4) {
      cons.push('学习难度较高，需要更多时间投入')
    }

    // 基于文字系统
    if (language.writingSystem.includes('chinese') || language.writingSystem.includes('arabic')) {
      cons.push('文字系统与拉丁字母差异较大')
    }

    // 基于使用范围
    if (language.speakers.total < 10000000) {
      cons.push('使用范围相对有限')
    }

    // 基于学习资源
    if (language.resources.length < 5) {
      cons.push('学习资源相对较少')
    }

    return cons.slice(0, 3) // 最多3个缺点
  }
}
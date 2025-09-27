/**
 * 推荐服务
 * 提供语言推荐的高级API
 */

import { getLanguageRecommendations } from '../recommendation/recommendation-algorithm'
import type { Language } from '../types/language'
import type { SurveyResponses, LanguageRecommendation, SurveyResponse } from '../types/survey'

export class RecommendationService {
  private languages: Language[] = []

  constructor() {
    this.loadLanguages()
  }

  /**
   * 加载语言数据
   */
  private async loadLanguages(): Promise<void> {
    try {
      // 动态导入语言数据
      const { languages } = await import('../../data/languages/languages.json')
      this.languages = languages
    } catch (error) {
      console.error('Failed to load languages:', error)
      this.languages = []
    }
  }

  /**
   * 根据问卷结果生成推荐
   */
  async generateRecommendations(responses: SurveyResponses): Promise<LanguageRecommendation[]> {
    if (this.languages.length === 0) {
      await this.loadLanguages()
    }

    if (this.languages.length === 0) {
      throw new Error('No languages available for recommendation')
    }

    // 获取推荐结果
    const recommendations = await getLanguageRecommendations(this.languages, responses)

    // 只返回前6个推荐结果
    return recommendations.slice(0, 6)
  }

  /**
   * 获取特定语言的详细推荐信息
   */
  async getLanguageDetails(languageId: string, responses: SurveyResponses): Promise<LanguageRecommendation | null> {
    if (this.languages.length === 0) {
      await this.loadLanguages()
    }

    const language = this.languages.find(lang => lang.id === languageId)
    if (!language) return null

    const recommendations = await getLanguageRecommendations([language], responses)
    return recommendations[0] || null
  }

  /**
   * 保存推荐结果
   */
  async saveRecommendationResults(
    sessionId: string,
    responses: SurveyResponses,
    recommendations: LanguageRecommendation[]
  ): Promise<string> {
    const surveyResponse: Partial<SurveyResponse> = {
      sessionId,
      surveyVersion: '1.0',
      responses,
      recommendations,
      completedAt: new Date(),
      createdAt: new Date(),
      score: this.calculateOverallScore(recommendations),
      metadata: {
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Server',
        completionTime: 0, // 应该从前端传递
        deviceType: 'desktop',
        browserLanguage: typeof navigator !== 'undefined' ? navigator.language : 'zh-CN',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        retakeCount: 0
      }
    }

    // 这里应该保存到数据库，目前返回一个模拟的ID
    return `rec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * 计算总体评分
   */
  private calculateOverallScore(recommendations: LanguageRecommendation[]): any {
    if (recommendations.length === 0) {
      return {
        overall: 0,
        categories: {
          motivation: 0,
          experience: 0,
          culture: 0,
          difficulty: 0,
          time: 0,
          practical: 0
        },
        preferences: {
          learningGoals: [],
          timeCommitment: 'regular',
          learningStyle: 'interactive',
          culturalInterests: [],
          difficultyPreference: 3,
          practicalFocus: 3
        }
      }
    }

    const topRecommendation = recommendations[0]
    const avgScore = recommendations.reduce((sum, rec) => sum + rec.matchScore, 0) / recommendations.length

    return {
      overall: Math.round(avgScore),
      categories: {
        motivation: topRecommendation.matchScore,
        experience: topRecommendation.matchScore,
        culture: topRecommendation.matchScore,
        difficulty: topRecommendation.matchScore,
        time: topRecommendation.matchScore,
        practical: topRecommendation.matchScore
      },
      preferences: {
        learningGoals: [],
        timeCommitment: 'regular',
        learningStyle: 'interactive',
        culturalInterests: [],
        difficultyPreference: 3,
        practicalFocus: 3
      }
    }
  }

  /**
   * 根据文化兴趣获取语言推荐
   */
  async getLanguagesByCulture(culturalInterests: string[]): Promise<Language[]> {
    if (this.languages.length === 0) {
      await this.loadLanguages()
    }

    return this.languages.filter(language =>
      language.tags?.some(tag =>
        culturalInterests.some(interest =>
          interest.toLowerCase().includes(tag.toLowerCase()) ||
          tag.toLowerCase().includes(interest.toLowerCase())
        )
      )
    ).slice(0, 10)
  }

  /**
   * 获取所有可用语言
   */
  async getAllLanguages(): Promise<Language[]> {
    if (this.languages.length === 0) {
      await this.loadLanguages()
    }

    return this.languages
  }

  /**
   * 获取热门语言
   */
  async getPopularLanguages(): Promise<Language[]> {
    if (this.languages.length === 0) {
      await this.loadLanguages()
    }

    return this.languages
      .filter(lang => lang.category === 'popular' || lang.metadata?.featured)
      .sort((a, b) => (a.metadata?.order || 0) - (b.metadata?.order || 0))
      .slice(0, 6)
  }

  /**
   * 搜索语言
   */
  async searchLanguages(query: string): Promise<Language[]> {
    if (this.languages.length === 0) {
      await this.loadLanguages()
    }

    const lowercaseQuery = query.toLowerCase()

    return this.languages.filter(language =>
      language.name.toLowerCase().includes(lowercaseQuery) ||
      language.nameEn.toLowerCase().includes(lowercaseQuery) ||
      language.nativeName.toLowerCase().includes(lowercaseQuery) ||
      language.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  }
}

// 单例实例
let recommendationService: RecommendationService | null = null

/**
 * 获取推荐服务实例
 */
export function getRecommendationService(): RecommendationService {
  if (!recommendationService) {
    recommendationService = new RecommendationService()
  }
  return recommendationService
}

/**
 * 便利函数：直接生成推荐
 */
export async function generateLanguageRecommendations(responses: SurveyResponses): Promise<LanguageRecommendation[]> {
  const service = getRecommendationService()
  return await service.generateRecommendations(responses)
}

/**
 * 便利函数：获取语言详情
 */
export async function getLanguageRecommendationDetails(
  languageId: string,
  responses: SurveyResponses
): Promise<LanguageRecommendation | null> {
  const service = getRecommendationService()
  return await service.getLanguageDetails(languageId, responses)
}
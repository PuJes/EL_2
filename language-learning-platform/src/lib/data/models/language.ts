/**
 * 语言数据模型
 */

import type { Language, LanguageSearchQuery, LanguageListFilters } from '@/lib/types'

export class LanguageModel {
  constructor(private data: Language) {}

  /**
   * 获取语言基本信息
   */
  getBasicInfo() {
    return {
      id: this.data.id,
      name: this.data.name,
      nameEn: this.data.nameEn,
      nativeName: this.data.nativeName,
      flag: this.data.flag,
      difficulty: this.data.difficulty,
      category: this.data.category
    }
  }

  /**
   * 获取学习时间估算
   */
  getLearningTimeEstimate() {
    return this.data.learningTimeEstimate
  }

  /**
   * 获取使用者信息
   */
  getSpeakerInfo() {
    return this.data.speakers
  }

  /**
   * 获取文化信息
   */
  getCultureInfo() {
    return this.data.culturalInfo
  }

  /**
   * 获取学习资源
   */
  getResources(type?: string, difficulty?: number) {
    let resources = this.data.resources

    if (type) {
      resources = resources.filter(r => r.type === type)
    }

    if (difficulty) {
      resources = resources.filter(r => r.difficulty === difficulty)
    }

    return resources.sort((a, b) => {
      // 推荐的资源排在前面
      if (a.isRecommended && !b.isRecommended) return -1
      if (!a.isRecommended && b.isRecommended) return 1

      // 按评分排序
      return (b.rating || 0) - (a.rating || 0)
    })
  }

  /**
   * 检查是否匹配搜索条件
   */
  matchesQuery(query: LanguageSearchQuery): boolean {
    // 关键词匹配
    if (query.keyword) {
      const keyword = query.keyword.toLowerCase()
      const searchableText = [
        this.data.name,
        this.data.nameEn,
        this.data.nativeName,
        this.data.description,
        ...this.data.tags
      ].join(' ').toLowerCase()

      if (!searchableText.includes(keyword)) {
        return false
      }
    }

    // 分类匹配
    if (query.category && this.data.category !== query.category) {
      return false
    }

    // 难度匹配
    if (query.difficulty && !query.difficulty.includes(this.data.difficulty)) {
      return false
    }

    // 文字系统匹配
    if (query.writingSystem &&
        !query.writingSystem.some(ws => this.data.writingSystem.includes(ws))) {
      return false
    }

    // 最小使用者数量匹配
    if (query.minSpeakers && this.data.speakers.total < query.minSpeakers) {
      return false
    }

    // 地区匹配
    if (query.regions &&
        !query.regions.some(region =>
          this.data.regions.some(r => r.code === region))) {
      return false
    }

    // 标签匹配
    if (query.tags &&
        !query.tags.some(tag => this.data.tags.includes(tag))) {
      return false
    }

    // 精选匹配
    if (query.featured !== undefined &&
        this.data.metadata.featured !== query.featured) {
      return false
    }

    return true
  }

  /**
   * 计算与用户偏好的匹配度
   */
  calculateMatchScore(userPreferences: {
    culturalInterests: string[]
    difficultyPreference: number
    practicalFocus: number
    timeCommitment: 'casual' | 'regular' | 'intensive'
  }): number {
    let score = 0

    // 文化兴趣匹配 (30%)
    const culturalMatch = this.calculateCulturalMatch(userPreferences.culturalInterests)
    score += culturalMatch * 0.3

    // 难度匹配 (25%)
    const difficultyMatch = this.calculateDifficultyMatch(userPreferences.difficultyPreference)
    score += difficultyMatch * 0.25

    // 实用性匹配 (25%)
    const practicalMatch = this.calculatePracticalMatch(userPreferences.practicalFocus)
    score += practicalMatch * 0.25

    // 时间匹配 (20%)
    const timeMatch = this.calculateTimeMatch(userPreferences.timeCommitment)
    score += timeMatch * 0.2

    return Math.round(score * 100) / 100
  }

  private calculateCulturalMatch(interests: string[]): number {
    if (interests.length === 0) return 0.5

    const languageCultureTags = [
      ...this.data.culturalInfo.traditions,
      ...this.data.culturalInfo.arts,
      ...this.data.tags
    ].map(tag => tag.toLowerCase())

    const matchCount = interests.filter(interest =>
      languageCultureTags.some(tag =>
        tag.includes(interest.toLowerCase()) ||
        interest.toLowerCase().includes(tag)
      )
    ).length

    return Math.min(matchCount / interests.length, 1)
  }

  private calculateDifficultyMatch(preference: number): number {
    const diff = Math.abs(this.data.difficulty - preference)
    return Math.max(0, (5 - diff) / 5)
  }

  private calculatePracticalMatch(focus: number): number {
    // 根据使用者数量和商务价值评估实用性
    const speakerScore = Math.min(this.data.speakers.total / 100000000, 1) // 1亿使用者为满分
    const businessScore = this.data.category === 'business' ? 1 :
                         this.data.category === 'popular' ? 0.8 : 0.5

    const practicalScore = (speakerScore + businessScore) / 2

    // 用户越注重实用性，语言的实用性得分影响越大
    return practicalScore * (focus / 5) + 0.5 * (1 - focus / 5)
  }

  private calculateTimeMatch(commitment: 'casual' | 'regular' | 'intensive'): number {
    const timeMap = { casual: 1, regular: 3, intensive: 5 }
    const userTime = timeMap[commitment]

    // 假设难度越高需要的时间投入越多
    const requiredTime = this.data.difficulty

    if (userTime >= requiredTime) {
      return 1 // 时间充足
    } else {
      return userTime / requiredTime // 按比例计算
    }
  }

  /**
   * 转换为普通对象
   */
  toJSON(): Language {
    return { ...this.data }
  }

  /**
   * 静态方法：从数据创建模型
   */
  static fromData(data: Language): LanguageModel {
    return new LanguageModel(data)
  }

  /**
   * 静态方法：批量创建模型
   */
  static fromArray(dataArray: Language[]): LanguageModel[] {
    return dataArray.map(data => new LanguageModel(data))
  }
}
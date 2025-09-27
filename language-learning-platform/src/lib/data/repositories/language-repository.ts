/**
 * 语言数据仓库
 * 提供语言数据的统一访问接口
 */

import type {
  Language,
  LanguageSearchQuery,
  LanguageListFilters,
  PaginatedResponse
} from '@/lib/types'
import { LanguageModel } from '../models/language'

export interface ILanguageDataProvider {
  getLanguages(): Promise<Language[]>
  getLanguage(id: string): Promise<Language | null>
  searchLanguages(query: LanguageSearchQuery): Promise<Language[]>
}

export interface ICacheProvider {
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T, ttl?: number): Promise<void>
  delete(key: string): Promise<void>
  clear(): Promise<void>
}

export class LanguageRepository {
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map()
  private readonly defaultTTL = 5 * 60 * 1000 // 5分钟缓存

  constructor(
    private providers: {
      local: ILanguageDataProvider
      api?: ILanguageDataProvider
      cache?: ICacheProvider
    }
  ) {}

  /**
   * 获取所有语言
   */
  async getAllLanguages(): Promise<Language[]> {
    const cacheKey = 'all_languages'

    // 先检查内存缓存
    const cached = this.getFromMemoryCache<Language[]>(cacheKey)
    if (cached) return cached

    // 检查外部缓存
    if (this.providers.cache) {
      const cachedData = await this.providers.cache.get<Language[]>(cacheKey)
      if (cachedData) {
        this.setMemoryCache(cacheKey, cachedData)
        return cachedData
      }
    }

    // 从数据源获取
    let languages: Language[]

    try {
      // 优先从API获取
      if (this.providers.api) {
        languages = await this.providers.api.getLanguages()
      } else {
        languages = await this.providers.local.getLanguages()
      }
    } catch (error) {
      console.warn('API failed, falling back to local data:', error)
      languages = await this.providers.local.getLanguages()
    }

    // 缓存结果
    this.setMemoryCache(cacheKey, languages)
    if (this.providers.cache) {
      await this.providers.cache.set(cacheKey, languages)
    }

    return languages
  }

  /**
   * 根据ID获取语言
   */
  async getLanguageById(id: string): Promise<Language | null> {
    const cacheKey = `language:${id}`

    // 检查缓存
    const cached = this.getFromMemoryCache<Language>(cacheKey)
    if (cached) return cached

    if (this.providers.cache) {
      const cachedData = await this.providers.cache.get<Language>(cacheKey)
      if (cachedData) {
        this.setMemoryCache(cacheKey, cachedData)
        return cachedData
      }
    }

    // 从数据源获取
    let language: Language | null

    try {
      if (this.providers.api) {
        language = await this.providers.api.getLanguage(id)
      } else {
        language = await this.providers.local.getLanguage(id)
      }
    } catch (error) {
      console.warn('API failed, falling back to local data:', error)
      language = await this.providers.local.getLanguage(id)
    }

    // 缓存结果
    if (language) {
      this.setMemoryCache(cacheKey, language)
      if (this.providers.cache) {
        await this.providers.cache.set(cacheKey, language)
      }
    }

    return language
  }

  /**
   * 搜索语言
   */
  async searchLanguages(query: LanguageSearchQuery): Promise<Language[]> {
    const cacheKey = `search:${JSON.stringify(query)}`

    // 检查缓存
    const cached = this.getFromMemoryCache<Language[]>(cacheKey)
    if (cached) return cached

    // 获取所有语言并过滤
    const allLanguages = await this.getAllLanguages()
    const languageModels = LanguageModel.fromArray(allLanguages)

    const results = languageModels
      .filter(model => model.matchesQuery(query))
      .map(model => model.toJSON())

    // 缓存结果 (搜索结果缓存时间较短)
    this.setMemoryCache(cacheKey, results, 2 * 60 * 1000) // 2分钟

    return results
  }

  /**
   * 根据分类获取语言
   */
  async getLanguagesByCategory(category: string): Promise<Language[]> {
    return this.searchLanguages({ category: category as any })
  }

  /**
   * 获取精选语言
   */
  async getFeaturedLanguages(): Promise<Language[]> {
    return this.searchLanguages({ featured: true })
  }

  /**
   * 获取热门语言
   */
  async getPopularLanguages(limit = 10): Promise<Language[]> {
    const languages = await this.getAllLanguages()
    return languages
      .filter(lang => lang.category === 'popular' || lang.metadata.featured)
      .sort((a, b) => b.speakers.total - a.speakers.total)
      .slice(0, limit)
  }

  /**
   * 分页获取语言列表
   */
  async getLanguagesPaginated(
    filters: LanguageListFilters,
    page = 1,
    pageSize = 20
  ): Promise<PaginatedResponse<Language>> {
    // 构建搜索查询
    const query: LanguageSearchQuery = {
      keyword: filters.search || undefined,
      category: filters.categories[0] || undefined, // 暂时只支持单个分类
      difficulty: filters.difficulties.length > 0 ? filters.difficulties : undefined,
      writingSystem: filters.writingSystems.length > 0 ? filters.writingSystems : undefined
    }

    // 搜索语言
    let results = await this.searchLanguages(query)

    // 排序
    results = this.sortLanguages(results, filters.sortBy, filters.sortOrder)

    // 分页
    const total = results.length
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const items = results.slice(startIndex, endIndex)

    return {
      items,
      total,
      page,
      pageSize,
      hasMore: endIndex < total
    }
  }

  /**
   * 语言排序
   */
  private sortLanguages(
    languages: Language[],
    sortBy: string,
    order: 'asc' | 'desc'
  ): Language[] {
    const sorted = [...languages].sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name, 'zh-CN')
          break
        case 'difficulty':
          comparison = a.difficulty - b.difficulty
          break
        case 'speakers':
          comparison = a.speakers.total - b.speakers.total
          break
        case 'popularity':
          // 按分类和精选状态排序
          const aScore = (a.metadata.featured ? 100 : 0) +
                        (a.category === 'popular' ? 50 : 0)
          const bScore = (b.metadata.featured ? 100 : 0) +
                        (b.category === 'popular' ? 50 : 0)
          comparison = aScore - bScore
          break
        default:
          comparison = 0
      }

      return order === 'desc' ? -comparison : comparison
    })

    return sorted
  }

  /**
   * 清除缓存
   */
  async clearCache(): Promise<void> {
    this.cache.clear()
    if (this.providers.cache) {
      await this.providers.cache.clear()
    }
  }

  /**
   * 内存缓存操作
   */
  private getFromMemoryCache<T>(key: string): T | null {
    const cached = this.cache.get(key)
    if (!cached) return null

    if (Date.now() > cached.timestamp + cached.ttl) {
      this.cache.delete(key)
      return null
    }

    return cached.data as T
  }

  private setMemoryCache<T>(key: string, value: T, ttl = this.defaultTTL): void {
    this.cache.set(key, {
      data: value,
      timestamp: Date.now(),
      ttl
    })
  }
}
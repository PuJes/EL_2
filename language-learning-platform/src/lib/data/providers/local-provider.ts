/**
 * 本地数据提供者
 * 从本地JSON文件获取数据
 */

import type { Language, LanguageSearchQuery } from '@/lib/types'
import type { ILanguageDataProvider } from '../repositories/language-repository'

export class LocalDataProvider implements ILanguageDataProvider {
  private languagesCache: Language[] | null = null

  /**
   * 获取所有语言
   */
  async getLanguages(): Promise<Language[]> {
    if (this.languagesCache) {
      return this.languagesCache
    }

    try {
      const response = await fetch('/data/languages/languages.json')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      this.languagesCache = this.transformLanguageData(data)
      return this.languagesCache
    } catch (error) {
      console.error('Failed to load languages from local data:', error)
      // 返回默认数据
      return this.getDefaultLanguages()
    }
  }

  /**
   * 根据ID获取语言
   */
  async getLanguage(id: string): Promise<Language | null> {
    const languages = await this.getLanguages()
    return languages.find(lang => lang.id === id) || null
  }

  /**
   * 搜索语言
   */
  async searchLanguages(query: LanguageSearchQuery): Promise<Language[]> {
    const languages = await this.getLanguages()

    return languages.filter(language => {
      // 关键词搜索
      if (query.keyword) {
        const keyword = query.keyword.toLowerCase()
        const searchableText = [
          language.name,
          language.nameEn,
          language.nativeName,
          language.description,
          ...language.tags
        ].join(' ').toLowerCase()

        if (!searchableText.includes(keyword)) {
          return false
        }
      }

      // 分类过滤
      if (query.category && language.category !== query.category) {
        return false
      }

      // 难度过滤
      if (query.difficulty && !query.difficulty.includes(language.difficulty)) {
        return false
      }

      // 文字系统过滤
      if (query.writingSystem &&
          !query.writingSystem.some(ws => language.writingSystem.includes(ws))) {
        return false
      }

      return true
    })
  }

  /**
   * 获取文化数据
   */
  async getCultureData(): Promise<any[]> {
    try {
      const response = await fetch('/data/languages/culture.json')
      return await response.json()
    } catch (error) {
      console.error('Failed to load culture data:', error)
      return []
    }
  }

  /**
   * 获取学习资源数据
   */
  async getResourcesData(): Promise<any[]> {
    try {
      const response = await fetch('/data/languages/resources.json')
      return await response.json()
    } catch (error) {
      console.error('Failed to load resources data:', error)
      return []
    }
  }

  /**
   * 转换语言数据格式
   */
  private transformLanguageData(rawData: any): Language[] {
    if (!Array.isArray(rawData)) {
      rawData = rawData.languages || []
    }

    return rawData.map((item: any) => ({
      id: item.id || this.generateId(item.name),
      flag: item.flag || '🏳️',
      name: item.name || '',
      nameEn: item.nameEn || item.english_name || '',
      nativeName: item.nativeName || item.native_name || item.name,
      difficulty: item.difficulty || 3,
      learningTimeEstimate: item.learningTimeEstimate || {
        beginner: '3-6个月',
        intermediate: '1-2年',
        advanced: '3-5年',
        totalHours: 1000
      },
      description: item.description || '',
      category: item.category || 'cultural',
      writingSystem: item.writingSystem || ['latin'],
      speakers: item.speakers || {
        native: 0,
        total: 0,
        countries: []
      },
      regions: item.regions || [],
      culturalInfo: item.culturalInfo || {
        history: '',
        traditions: [],
        festivals: [],
        cuisine: [],
        arts: [],
        literature: [],
        modernCulture: []
      },
      resources: item.resources || [],
      tags: item.tags || [],
      metadata: {
        iso639_1: item.iso639_1 || '',
        iso639_2: item.iso639_2 || '',
        family: item.family || '',
        branch: item.branch,
        order: item.order || 999,
        featured: item.featured || false,
        lastUpdated: new Date(item.lastUpdated || Date.now())
      }
    }))
  }

  /**
   * 生成ID
   */
  private generateId(name: string): string {
    return name.toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fff]/g, '')
      .slice(0, 20)
  }

  /**
   * 获取默认语言数据
   */
  private getDefaultLanguages(): Language[] {
    return [
      {
        id: 'japanese',
        flag: '🇯🇵',
        name: '日语',
        nameEn: 'Japanese',
        nativeName: '日本語',
        difficulty: 4,
        learningTimeEstimate: {
          beginner: '6个月',
          intermediate: '1-2年',
          advanced: '3-5年',
          totalHours: 2200
        },
        description: '日语是日本的官方语言，以其独特的文字系统和敬语文化而闻名。',
        category: 'popular',
        writingSystem: ['japanese'],
        speakers: {
          native: 125000000,
          total: 130000000,
          countries: ['日本']
        },
        regions: [
          { code: 'JP', name: '日本', primaryLanguage: true }
        ],
        culturalInfo: {
          history: '日语发展历史悠久，受到中国文化深刻影响',
          traditions: ['茶道', '花道', '武道'],
          festivals: ['樱花节', '七夕节', '盂兰盆节'],
          cuisine: ['寿司', '拉面', '天妇罗'],
          arts: ['浮世绘', '能剧', '歌舞伎'],
          literature: ['物语文学', '俳句', '短歌'],
          modernCulture: ['动漫', '漫画', 'J-POP']
        },
        resources: [],
        tags: ['东亚', '汉字', '动漫', '文化'],
        metadata: {
          iso639_1: 'ja',
          iso639_2: 'jpn',
          family: 'Japanese',
          order: 1,
          featured: true,
          lastUpdated: new Date()
        }
      },
      {
        id: 'korean',
        flag: '🇰🇷',
        name: '韩语',
        nameEn: 'Korean',
        nativeName: '한국어',
        difficulty: 3,
        learningTimeEstimate: {
          beginner: '4个月',
          intermediate: '8个月',
          advanced: '2-3年',
          totalHours: 1800
        },
        description: '韩语是朝鲜半岛的官方语言，使用韩文字母，语法相对规整。',
        category: 'popular',
        writingSystem: ['korean'],
        speakers: {
          native: 77000000,
          total: 80000000,
          countries: ['韩国', '朝鲜']
        },
        regions: [
          { code: 'KR', name: '韩国', primaryLanguage: true },
          { code: 'KP', name: '朝鲜', primaryLanguage: true }
        ],
        culturalInfo: {
          history: '韩语历史悠久，韩文字母创制于15世纪',
          traditions: ['韩服', '传统舞蹈', '跆拳道'],
          festivals: ['春节', '中秋节', '韩国感恩节'],
          cuisine: ['韩式烤肉', '泡菜', '石锅拌饭'],
          arts: ['韩国传统音乐', '书法', '陶瓷'],
          literature: ['古典诗歌', '现代小说'],
          modernCulture: ['K-POP', '韩剧', '韩流']
        },
        resources: [],
        tags: ['东亚', '韩流', 'K-POP', '文化'],
        metadata: {
          iso639_1: 'ko',
          iso639_2: 'kor',
          family: 'Koreanic',
          order: 2,
          featured: true,
          lastUpdated: new Date()
        }
      }
    ]
  }

  /**
   * 清除缓存
   */
  clearCache(): void {
    this.languagesCache = null
  }
}
/**
 * 语言相关的类型定义
 * 基于动态难度计算的MVP方案
 */

// === 保留的基础类型 ===
export type LanguageDifficulty = 1 | 2 | 3 | 4 | 5

export type LanguageCategory =
  | 'popular'     // 热门语言
  | 'business'    // 商务语言
  | 'cultural'    // 文化语言
  | 'niche'       // 小众语言

export type WritingSystem =
  | 'latin'       // 拉丁字母
  | 'cyrillic'    // 西里尔字母
  | 'arabic'      // 阿拉伯字母
  | 'chinese'     // 汉字
  | 'japanese'    // 日文(假名+汉字)
  | 'korean'      // 韩文
  | 'devanagari'  // 梵文字母
  | 'other'       // 其他

export type ResourceType =
  | 'video'       // 视频课程
  | 'article'     // 文章
  | 'course'      // 在线课程
  | 'book'        // 书籍
  | 'app'         // 应用程序
  | 'website'     // 网站
  | 'podcast'     // 播客

// === 新增：语言基础档案类型 ===
export type WritingSystemType = 'alphabetic' | 'syllabic' | 'logographic' | 'mixed'
export type WritingDirection = 'ltr' | 'rtl' | 'ttb'
export type WordOrder = 'SOV' | 'SVO' | 'VSO' | 'OVS' | 'OSV' | 'VOS'
export type CulturalRegion = 'east_asia' | 'europe' | 'middle_east' | 'latin_america' | 'africa' | 'north_america' | 'oceania' | 'south_asia' | 'southeast_asia'

export interface LanguageProfile {
  // 语系信息
  linguisticFamily: {
    family: string           // "印欧语系", "汉藏语系", "日语语系"
    branch?: string          // "日耳曼语族", "汉语族"
    subbranch?: string       // "西日耳曼语支"
    isIsolate: boolean       // 是否孤立语系
    familyCode: string       // 标准化代码 "IE", "ST", "JP"
  }

  // 文字系统档案
  writingSystem: {
    primaryType: WritingSystemType
    scripts: string[]        // ['latin'], ['hiragana', 'katakana', 'kanji']
    characterCount: number   // 基础字符数量
    direction: WritingDirection
    complexity: number       // 1-5 复杂度评分
  }

  // 语法特征档案
  grammar: {
    wordOrder: WordOrder
    features: {
      tenseCount: number     // 时态数量
      caseCount: number      // 格变数量
      genderCount: number    // 性别系统数量
      hasAspect: boolean     // 是否有体系统
      hasEvidentiality: boolean // 是否有据素系统
      agglutination: number  // 黏着程度 1-5
    }
    complexity: number       // 综合语法复杂度 1-5
  }

  // 语音特征档案 (MVP简化版本)
  phonetics: {
    isTonal: boolean         // 是否声调语言
    toneCount?: number       // 声调数量
    phoneCount: number       // 音素数量
    hasDifficultSounds: string[] // 困难音素列表
    complexity: number       // 发音复杂度 1-5
  }

  // 文化特征档案 (MVP简化版本)
  culture: {
    formalityLevels: number  // 敬语系统复杂度 1-5
    culturalRegion: CulturalRegion
    hofstedeScores?: {       // 霍夫斯泰德文化维度 (可选)
      powerDistance: number
      individualism: number
      uncertainty: number
    }
  }
}

export interface DynamicDifficulty {
  baseDifficulty: number     // 基准难度 1-5

  // 动态计算权重配置
  difficultyFactors: {
    familyWeight: number     // 语系关系权重 (30%)
    writingWeight: number    // 文字系统权重 (25%)
    grammarWeight: number    // 语法结构权重 (20%)
    phoneticWeight: number   // 语音系统权重 (15%)
    culturalWeight: number   // 文化距离权重 (10%)
  }
}

export interface LearningTimeMatrix {
  // 基础学习时间 (小时)
  baseHours: {
    beginner: number         // 达到A1/A2的基础小时数
    intermediate: number     // 达到B1/B2的小时数
    advanced: number         // 达到C1/C2的小时数
  }

  // 时间调整因子
  timeModifiers: {
    intensiveBonus: number   // 密集学习折扣 0.7
    casualPenalty: number    // 休闲学习增加 1.3
    experienceBonus: number  // 多语言经验折扣 0.8
    immersionBonus: number   // 沉浸式学习折扣 0.6
  }
}

export interface PersonalizedDifficulty {
  overallDifficulty: number         // 1-5 个性化难度
  timeEstimateWeeks: number         // 精确到周的时间估算
  breakdown: {
    familyRelation: number          // 语系相关性影响 -0.5 to +0.5
    writingSystem: number           // 文字系统影响 -0.5 to +0.5
    grammar: number                 // 语法结构影响 -0.3 to +0.3
    phonetics: number               // 语音系统影响 -0.2 to +0.2
    culture: number                 // 文化距离影响 -0.1 to +0.1
  }
  confidence: number                // 计算置信度 0-1
  reasons: string[]                 // 难度判断理由
}

// 用户语言背景 (从Survey获取)
export interface UserLanguageBackground {
  nativeLanguage: string         // 母语
  knownLanguages: string[]       // 已知语言
  experience: 'beginner' | 'intermediate' | 'advanced'
  timeCommitment: 'casual' | 'regular' | 'intensive'
  culturalFamiliarity: string[]  // 熟悉的文化区域
}

// === 保留但简化的旧接口 (向后兼容) ===
export interface LearningTimeEstimate {
  beginner: string      // 初学者时间
  intermediate: string  // 中级时间
  advanced: string      // 高级时间
  totalHours: number    // 总学时
}

export interface SpeakerInfo {
  native: number        // 母语使用者数量
  total: number         // 总使用者数量
  countries: string[]   // 主要使用国家
}

export interface Region {
  code: string          // 地区代码
  name: string          // 地区名称
  primaryLanguage: boolean  // 是否为主要语言
}

export interface CultureInfo {
  history: string       // 历史背景
  traditions: string[]  // 传统文化
  festivals: string[]   // 节日庆典
  cuisine: string[]     // 饮食文化
  arts: string[]        // 艺术形式
  literature: string[]  // 文学作品
  modernCulture: string[] // 现代文化
}

export interface LearningResource {
  id: string
  type: ResourceType
  title: string
  description?: string
  url?: string
  provider: string
  difficulty: LanguageDifficulty
  duration?: string     // 学习时长
  price?: number        // 价格 (0表示免费)
  rating?: number       // 评分 (1-5)
  tags: string[]
  language: string      // 目标语言代码
  isRecommended: boolean // 是否推荐
}

export interface LanguageMetadata {
  iso639_1: string      // ISO 639-1 代码 (en, zh, ja等)
  iso639_2: string      // ISO 639-2 代码
  family: string        // 语系
  branch?: string       // 语族分支
  order: number         // 显示顺序
  featured: boolean     // 是否为精选语言
  lastUpdated: Date     // 最后更新时间
}

export interface Language {
  // === 基础信息 ===
  id: string
  flag: string                      // 国旗emoji或图片URL
  name: string                      // 中文名称
  nameEn: string                    // 英文名称
  nativeName: string                // 本地语言名称
  description: string
  category: LanguageCategory
  writingSystem: WritingSystem[]    // 保留，用于向后兼容
  speakers: SpeakerInfo
  regions: Region[]
  culturalInfo: CultureInfo
  resources: LearningResource[]
  tags: string[]
  metadata: LanguageMetadata

  // === 新增核心字段 ===
  profile: LanguageProfile          // 语言基础档案
  dynamicDifficulty: DynamicDifficulty  // 动态难度配置
  learningTimeMatrix: LearningTimeMatrix // 学习时间矩阵

  // === 保留字段 (逐步迁移) ===
  difficulty?: LanguageDifficulty   // 可选，用于向后兼容
  learningTimeEstimate?: LearningTimeEstimate // 可选，用于向后兼容
}

export interface LanguageSearchQuery {
  keyword?: string
  category?: LanguageCategory
  difficulty?: LanguageDifficulty[]
  writingSystem?: WritingSystem[]
  minSpeakers?: number
  regions?: string[]
  tags?: string[]
  featured?: boolean
}

export interface LanguageListFilters {
  search: string
  categories: LanguageCategory[]
  difficulties: LanguageDifficulty[]
  writingSystems: WritingSystem[]
  sortBy: 'name' | 'difficulty' | 'speakers' | 'popularity'
  sortOrder: 'asc' | 'desc'
}
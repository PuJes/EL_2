/**
 * 统一类型导出
 * 更新版本，支持动态难度计算和增强功能
 */

// 语言相关类型
export type {
  Language,
  LanguageDifficulty,
  LanguageCategory,
  WritingSystem,
  ResourceType,
  LearningTimeEstimate,
  SpeakerInfo,
  Region,
  CultureInfo,
  LearningResource,
  LanguageMetadata,
  LanguageSearchQuery,
  LanguageListFilters,
  // 新增：语言档案和动态难度
  LanguageProfile,
  DynamicDifficulty,
  LearningTimeMatrix,
  PersonalizedDifficulty,
  UserLanguageBackground,
  WritingSystemType,
  WritingDirection,
  WordOrder,
  CulturalRegion
} from './language'

// 用户相关类型
export type {
  UserProfile,
  LearningGoal,
  TimeCommitment,
  LearningStyle,
  ProficiencyLevel,
  LanguageProficiency,
  UserPreferences,
  LearningProgress,
  UserActivity,
  UserStats,
  // 新增：增强用户功能
  LanguageLearningHistory,
  LanguageCertification,
  SkillProgress,
  UserAnalytics
} from './user'

// 调查问卷相关类型
export type {
  SurveyQuestion,
  SurveySection,
  SurveyConfig,
  SurveyResponse,
  SurveyScore,
  LanguageRecommendation,
  RecommendationReason,
  LearningPath,
  SurveyMetadata,
  SurveyAnalytics,
  QuestionType,
  QuestionOption,
  ConfidenceLevel,
  // 新增：增强调查功能
  SurveyResponses,
  QuestionValidation,
  QuestionDependency
} from './survey'

// API相关类型
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: {
    code: string
    message: string
    details?: any
  }
  meta?: {
    total: number
    page: number
    pageSize: number
    hasMore: boolean
  }
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// 通用类型
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface SearchOptions {
  query?: string
  filters?: Record<string, any>
  sort?: {
    field: string
    order: 'asc' | 'desc'
  }
  pagination?: {
    page: number
    pageSize: number
  }
}

// 系统支持相关类型
export type {
  DifficultyMatrix,
  LearningPathTemplate,
  LearningResourceEvaluation,
  DataValidationRules,
  AlgorithmConfig,
  CacheConfig,
  PerformanceConfig,
  ErrorHandlingConfig,
  SystemConfig
} from './system'

// 配置类型 (保留向后兼容)
export interface AppConfig {
  api: {
    baseUrl: string
    timeout: number
    retries: number
  }
  features: {
    survey: boolean
    recommendations: boolean
    userProgress: boolean
    analytics: boolean
    // 新增功能开关
    dynamicDifficulty?: boolean
    advancedAnalytics?: boolean
    culturalInsights?: boolean
  }
  cache: {
    ttl: number
    maxSize: number
  }
  i18n: {
    defaultLocale: string
    supportedLocales: string[]
  }
}

// 错误类型 (增强版本)
export interface AppError {
  code: string
  message: string
  context?: Record<string, any>
  timestamp: Date
  severity: 'low' | 'medium' | 'high' | 'critical'
  // 新增字段
  category?: 'validation' | 'computation' | 'external' | 'system'
  retryable?: boolean
  userMessage?: string              // 用户友好的错误信息
  correlationId?: string            // 关联ID用于错误追踪
}
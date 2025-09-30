// 核心数据类型定义

export interface Language {
  // 基础信息
  id: string
  code: string              // ISO 639-1 语言代码
  flag: string
  name: string
  nameEn: string
  nativeName: string
  description: string
  category: "popular" | "cultural" | "business" | "emerging"
  difficulty: number        // 1-5

  // 使用和分布数据
  speakers: {
    native: number
    total: number
    countries: string[]
  }
  regions: string[]

  // 语言分类信息
  family: string            // 语系
  script: string            // 文字系统
  tags?: string[]           // 标签

  // 学习相关信息
  studyTime?: string        // 预估学习时长（简化版）
  usage?: string[]          // 使用场景
  resources?: string[]      // 学习资源类型

  // 详细文化信息
  culturalInfo?: {
    history: string
    traditions: string[]
    festivals: string[]
    cuisine: string[]
    arts: string[]
    modernCulture: string[]
  }

  // 语言元数据
  metadata?: {
    iso639_1: string        // ISO 639-1 代码
    family: string          // 语系
    branch?: string         // 语族分支
    writingSystem: string[] // 文字系统
  }

  // 学习指导
  learningGuide?: {
    learningPath: Array<{
      title: string
      description: string
      level: string
      estimatedHours: number
      skills: string[]
    }>
    learningMethods?: Array<{
      title: string
      description: string
      techniques: string[]
    }>
    learningTools?: Array<{
      category: string
      tools: string[]
    }>
  }

  // 学习时间估算
  learningTimeEstimate?: {
    beginner: string        // 初学者时间
    intermediate: string    // 中级时间
    advanced: string        // 高级时间
    totalHours: number      // 总学时
    basic?: number          // 基础阶段
    intermediate?: number   // 中级阶段
    advanced?: number       // 高级阶段
  }

  // 难度分析
  difficultyAnalysis?: {
    grammar: number         // 语法复杂度 1-5
    pronunciation: number   // 发音难度 1-5
    writing: number         // 文字系统难度 1-5
    vocabulary?: number     // 词汇难度 1-5
  }

  // 学习资源
  learningResources?: {
    apps: Array<{
      name: string
      description: string
      price: string
    }>
    books: Array<{
      title: string
      author: string
      level: string
    }>
    websites: Array<{
      name: string
      url: string
      description: string
    }>
  }

  // 职业机会
  careerOpportunities?: {
    industries: string[]
    averageSalary: string
    jobGrowth: string
    remoteWork: boolean
  }

  // 旅游优势
  travelAdvantages?: {
    countries: string[]
    businessHubs: string[]
    culturalSites: string[]
  }

  // 兼容字段（仅用于文字系统）
  writingSystem?: string[]
}

export interface SurveyAnswer {
  questionId: string
  selectedOptions: string[]
  weight: number
}

export interface SurveyData {
  answers: SurveyAnswer[]
  userSource?: string
  contentInterest?: string
  nativeLanguage?: string
  languageExperience?: string
  learningPurpose?: string
  timeExpectation?: string
  culturalInterest?: string | string[]
  learningStyle?: string
  persistence?: string
  difficultyPreference?: string
  dailyTime?: string
}

export interface LanguageRecommendation {
  language: Language
  matchScore: number
  personalizedDifficulty: {
    overallDifficulty: number
    factors: {
      grammar: number
      pronunciation: number
      vocabulary: number
      writing: number
    }
  }
  dimensionScores: {
    culturalMatch: number      // 文化匹配度 30%
    difficultyMatch: number    // 难度适配度 25%
    purposeMatch: number       // 目标匹配度 20%
    timeMatch: number          // 时间匹配度 15%
    experienceMatch: number    // 经验匹配度 10%
  }
  successPrediction: {
    probability: number
    timeline: string
    factors: string[]
  }
  learningPath: {
    beginner: {
      phase: string
      duration: string
      goals: string[]
      resources: string[]
    }
    intermediate: {
      phase: string
      duration: string
      goals: string[]
      resources: string[]
    }
    advanced: {
      phase: string
      duration: string
      goals: string[]
      resources: string[]
    }
  }
  recommendationReasons: string[]
  potentialChallenges: string[]
  tips: string[]
}

// 用户状态类型
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  preferences: {
    language: string
    theme: 'light' | 'dark' | 'system'
    notifications: boolean
  }
  learningProfile?: {
    nativeLanguage: string
    currentLanguages: string[]
    learningGoals: string[]
    dailyTime: number
    level: 'beginner' | 'intermediate' | 'advanced'
  }
}

// 学习进度类型
export interface LearningProgress {
  languageId: string
  userId: string
  startDate: string
  currentLevel: number
  completedLessons: number
  totalLessons: number
  streakDays: number
  lastStudyDate: string
  weeklyGoal: number
  weeklyProgress: number
  achievements: Achievement[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string
  category: 'milestone' | 'streak' | 'challenge' | 'social'
}

// 导航类型
export interface NavItem {
  title: string
  href: string
  icon?: string
  description?: string
  external?: boolean
  disabled?: boolean
}

// V0组件集成类型
export interface V0ComponentMeta {
  name: string
  path: string
  description: string
  version: string
  dependencies: string[]
  props?: Record<string, unknown>
}
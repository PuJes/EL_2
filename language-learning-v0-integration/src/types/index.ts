// 核心数据类型定义

export interface Language {
  id: string
  flag: string
  name: string
  nameEn: string
  nativeName: string
  description: string
  category: "popular" | "cultural" | "business" | "emerging"
  difficulty: number // 1-5
  speakers: {
    native: number
    total: number
    countries: string[]
  }
  regions: string[]
  culturalInfo?: {
    history: string
    traditions: string[]
    modernCulture: string[]
  }
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
  careerOpportunities?: {
    industries: string[]
    averageSalary: string
    jobGrowth: string
    remoteWork: boolean
  }
  travelAdvantages?: {
    countries: string[]
    businessHubs: string[]
    culturalSites: string[]
  }
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
  props?: Record<string, any>
}
/**
 * 调查问卷相关的类型定义
 * 增强版本，支持个性化难度计算
 */

import type { Language, PersonalizedDifficulty } from './language'
import type { LearningGoal, TimeCommitment, LearningStyle, ProficiencyLevel } from './user'

export type QuestionType =
  | 'single_choice'    // 单选
  | 'multiple_choice'  // 多选
  | 'scale'           // 量表(1-5)
  | 'text'            // 文本输入
  | 'boolean'         // 是否选择

export type ConfidenceLevel =
  | 'very_high'       // 95%+
  | 'high'           // 80-94%
  | 'medium'         // 60-79%
  | 'low'            // 40-59%
  | 'very_low'       // <40%

export interface QuestionOption {
  id: string
  label: string
  value: string | number
  weight?: number      // 权重，用于评分计算
  tags?: string[]      // 关联标签
}

export interface QuestionValidation {
  min?: number
  max?: number
  pattern?: string
  message?: string
  customValidator?: string          // 自定义验证函数名
}

export interface QuestionDependency {
  questionId: string
  conditions: {
    operator: 'equals' | 'contains' | 'greater' | 'less' | 'in' | 'not_in'
    value: any
  }[]
  logic: 'AND' | 'OR'              // 多条件的逻辑关系
}

export interface SurveyQuestion {
  id: string
  type: QuestionType
  title: string
  description?: string
  required: boolean
  options?: QuestionOption[]
  validation?: QuestionValidation
  dependencies?: QuestionDependency[] // 支持多个依赖条件
  category: 'background' | 'motivation' | 'preference' | 'culture' | 'time' | 'goals'
  weight: number                      // 问题权重
  order: number                       // 显示顺序

  // 新增字段
  helpText?: string                   // 帮助说明
  placeholder?: string                // 输入提示
  multiSelect?: {                     // 多选限制
    min?: number
    max?: number
  }
  adaptiveLogic?: {                   // 自适应逻辑
    showIf: string                    // 显示条件
    hideIf: string                    // 隐藏条件
  }
}

export interface SurveySection {
  id: string
  title: string
  description?: string
  questions: SurveyQuestion[]
  order: number
}

export interface SurveyConfig {
  id: string
  version: string
  title: string
  description: string
  sections: SurveySection[]
  estimatedTime: number // 预计完成时间(分钟)
  scoring: {
    weights: {
      motivation: number
      experience: number
      culture: number
      difficulty: number
      time: number
      practical: number
    }
    algorithms: {
      matching: 'weighted_sum' | 'cosine_similarity' | 'neural_network'
      normalization: boolean
      penaltyFactors: {
        difficultyMismatch: number
        timeMismatch: number
        culturalMismatch: number
      }
    }
  }
}

// === 结构化的用户回答 (新增) ===
export interface SurveyResponses {
  // 语言背景
  nativeLanguage: string            // 母语ID
  knownLanguages: {
    languageId: string
    proficiency: 'basic' | 'intermediate' | 'advanced'
    yearsStudied?: number
    lastUsed?: string               // "recently", "1year", "longtime"
  }[]

  // 学习目标和动机
  learningGoals: LearningGoal[]     // 主要学习目标
  motivation: {
    primary: string                 // 主要动机
    secondary?: string[]            // 次要动机
    urgency: number                 // 紧迫程度 1-5
    commitment: number              // 承诺程度 1-5
  }

  // 时间和学习方式
  timeCommitment: TimeCommitment
  preferredSchedule: {
    dailyMinutes: number            // 每日学习时间
    weeklyDays: number              // 每周学习天数
    preferredTimes: string[]        // "morning", "afternoon", "evening"
    consistency: number             // 坚持性预期 1-5
  }

  // 学习偏好
  learningStyle: LearningStyle[]    // 支持多选
  contentPreferences: {
    interactive: number             // 互动内容偏好 1-5
    structured: number              // 结构化课程偏好 1-5
    immersive: number               // 沉浸式内容偏好 1-5
    practical: number               // 实用导向偏好 1-5
    cultural: number                // 文化内容偏好 1-5
  }

  // 文化兴趣和背景
  culturalInterests: string[]       // 感兴趣的文化区域
  travelExperience: string[]        // 旅行经历
  culturalExposure: {
    movies: boolean                 // 看外语电影
    music: boolean                  // 听外语音乐
    books: boolean                  // 读外语书籍
    friends: boolean                // 有外国朋友
  }

  // 学习偏好和限制
  difficultyPreference: number      // 难度偏好 1-5
  timeline: string                  // "3months", "6months", "1year", "2years", "no_rush"
  budgetRange: string               // "free", "low", "medium", "high"
  devicePreference: string[]        // "mobile", "desktop", "tablet"

  // 特殊需求
  specificNeeds: string[]           // "exam_prep", "business", "travel"等
  accessibilityNeeds: string[]      // 无障碍需求
  previousFailures: {              // 之前的学习失败经历
    hasFailures: boolean
    reasons?: string[]              // 失败原因
    languages?: string[]            // 失败的语言
  }
}

export interface SurveyResponse {
  id: string
  userId?: string
  sessionId: string
  surveyVersion: string
  responses: SurveyResponses        // 结构化的回答
  score: SurveyScore
  recommendations: LanguageRecommendation[]
  metadata: SurveyMetadata
  completedAt: Date
  createdAt: Date
}

export interface SurveyScore {
  overall: number
  categories: {
    motivation: number
    experience: number
    culture: number
    difficulty: number
    time: number
    practical: number
  }
  preferences: {
    learningGoals: LearningGoal[]
    timeCommitment: TimeCommitment
    learningStyle: LearningStyle
    culturalInterests: string[]
    difficultyPreference: number // 1-5
    practicalFocus: number       // 1-5
  }
}

export interface RecommendationReason {
  type: 'difficulty_match' | 'cultural_interest' | 'practical_value' | 'time_feasible' | 'experience_level'
  description: string
  score: number
  weight: number
}

export interface LearningPath {
  phases: {
    name: string                    // 阶段名称
    duration: string                // 持续时间
    goals: string[]                 // 阶段目标
    milestones: string[]            // 里程碑
    resources: string[]             // 推荐资源
    assessments: string[]           // 评估方式
  }[]
  totalDuration: string
  difficultyProgression: number[]   // 各阶段难度
  recommendedSchedule: {
    hoursPerWeek: number
    studyDays: number
    sessionLength: number
    restDays: string[]
  }
}

export interface LanguageRecommendation {
  language: Language
  personalizedDifficulty: PersonalizedDifficulty  // 个性化难度
  matchScore: number                   // 0-100 匹配分数
  rank: number                        // 推荐排名

  // 5个维度的详细评分
  dimensionScores: {
    culturalMatch: number             // 文化匹配度 0-100
    difficultyFit: number             // 难度适配度 0-100
    goalAlignment: number             // 目标匹配度 0-100
    timeFeasibility: number           // 时间可行性 0-100
    practicalValue: number            // 实用价值 0-100
  }

  // 详细推荐理由
  reasons: {
    primary: RecommendationReason[]   // 主要理由
    secondary: RecommendationReason[] // 次要理由
    warnings: string[]                // 注意事项
  }

  // 学习路径规划
  learningPath: LearningPath

  // 优缺点分析
  analysis: {
    pros: string[]
    cons: string[]
    alternatives: {                   // 替代方案
      easier: string[]                // 更容易的选择
      similar: string[]               // 相似难度的选择
      harder: string[]                // 更有挑战的选择
    }
  }

  // 学习轨道选项
  tracks: {
    intensive: PersonalizedDifficulty  // 密集学习轨道
    regular: PersonalizedDifficulty    // 常规学习轨道
    casual: PersonalizedDifficulty     // 休闲学习轨道
  }

  // 成功预测
  successPrediction: {
    probability: number               // 成功概率 0-1
    timeline: string                  // 预期时间线
    challengePoints: string[]         // 可能的挑战点
    supportNeeded: string[]           // 需要的支持
  }

  // === 保留字段 (向后兼容) ===
  confidenceLevel?: ConfidenceLevel
  pros?: string[]
  cons?: string[]
}

export interface SurveyMetadata {
  userAgent: string
  ipAddress?: string
  referrer?: string
  completionTime: number  // 完成耗时(秒)
  deviceType: 'desktop' | 'tablet' | 'mobile'
  browserLanguage: string
  timezone: string
  abandonedAt?: Date     // 如果未完成，记录放弃时间
  retakeCount: number    // 重做次数
}

export interface SurveyAnalytics {
  totalResponses: number
  completionRate: number
  averageTime: number
  dropoffPoints: {
    questionId: string
    dropoffRate: number
  }[]
  popularChoices: {
    questionId: string
    choices: {
      option: string
      percentage: number
    }[]
  }[]
  recommendationDistribution: {
    languageId: string
    count: number
    percentage: number
  }[]
}
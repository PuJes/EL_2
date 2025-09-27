/**
 * 用户相关的类型定义
 * 增强版本，支持详细的学习分析和进度跟踪
 */

export type LearningGoal =
  | 'career'      // 职业发展
  | 'travel'      // 旅行
  | 'culture'     // 文化兴趣
  | 'academic'    // 学术研究
  | 'family'      // 家庭原因
  | 'hobby'       // 个人爱好
  | 'business'    // 商务需求
  | 'migration'   // 移民

export type TimeCommitment =
  | 'casual'      // 休闲学习 (1-2小时/周)
  | 'regular'     // 定期学习 (3-5小时/周)
  | 'intensive'   // 密集学习 (6+小时/周)

export type LearningStyle =
  | 'visual'      // 视觉学习者
  | 'auditory'    // 听觉学习者
  | 'kinesthetic' // 动手学习者
  | 'reading'     // 阅读学习者
  | 'mixed'       // 混合型

export type ProficiencyLevel =
  | 'beginner'    // 初学者
  | 'elementary'  // 基础
  | 'intermediate' // 中级
  | 'upper_intermediate' // 中高级
  | 'advanced'    // 高级
  | 'native'      // 母语水平

export interface LanguageProficiency {
  languageId: string
  level: ProficiencyLevel
  certifications?: string[]  // 证书
  yearsStudied?: number      // 学习年数
  lastUsed?: Date           // 最后使用时间
}

// === 新增：语言学习历史 ===
export interface LanguageLearningHistory {
  languageId: string
  startDate: Date
  endDate?: Date                      // null表示仍在学习
  initialLevel: ProficiencyLevel
  finalLevel?: ProficiencyLevel
  totalHours: number
  outcome: 'completed' | 'ongoing' | 'paused' | 'abandoned'

  // 学习方法记录
  methods: {
    apps: string[]                    // 使用过的应用
    courses: string[]                 // 参加过的课程
    tutoring: boolean                 // 是否有私教
    immersion: boolean                // 是否有沉浸式体验
  }

  // 成果记录
  achievements: {
    milestones: string[]              // 达到的里程碑
    certifications: string[]          // 获得的证书
    realWorldUse: string[]            // 实际使用场景
  }

  // 反思记录
  reflection: {
    satisfaction: number              // 满意度 1-5
    difficulty: number                // 实际难度 1-5
    whatWorked: string[]              // 有效的方法
    whatDidntWork: string[]           // 无效的方法
    advice: string                    // 给其他学习者的建议
  }
}

export interface LanguageCertification {
  languageId: string
  certificateName: string             // 证书名称
  level: string                       // 证书级别
  issuingOrganization: string         // 颁发机构
  issueDate: Date
  expiryDate?: Date
  score?: string                      // 分数或等级
  verificationUrl?: string            // 验证链接
}

export interface UserPreferences {
  language: string          // 界面语言
  timezone: string          // 时区
  notifications: {
    email: boolean
    push: boolean
    reminders: boolean
    weeklyReport: boolean
  }
  privacy: {
    profileVisible: boolean
    progressVisible: boolean
    shareData: boolean
  }
  accessibility: {
    fontSize: 'small' | 'medium' | 'large'
    highContrast: boolean
    screenReader: boolean
  }
}

// === 增强的技能进度 ===
export interface SkillProgress {
  level: ProficiencyLevel
  percentage: number                  // 当前级别完成度 0-100
  strengths: string[]                 // 强项
  weaknesses: string[]                // 待改进点
  recentImprovement: number           // 近期提升幅度
  practiceTime: number                // 练习时间分配
}

// === 增强的学习进度 ===
export interface LearningProgress {
  languageId: string
  currentLevel: ProficiencyLevel
  targetLevel: ProficiencyLevel

  // 详细进度跟踪
  skills: {
    listening: SkillProgress
    speaking: SkillProgress
    reading: SkillProgress
    writing: SkillProgress
  }

  // 时间统计
  timeStatistics: {
    totalHours: number
    thisWeekHours: number
    thisMonthHours: number
    averageSessionLength: number      // 平均学习时长
    longestSession: number            // 最长学习时长
    shortestSession: number           // 最短学习时长
  }

  // 连续性统计
  streaks: {
    currentStreak: number
    longestStreak: number
    thisWeekSessions: number
    lastStudyDate: Date
  }

  // 学习活动记录
  activities: UserActivity[]

  // 里程碑记录
  milestones: {
    date: Date
    type: 'level_up' | 'streak' | 'hours' | 'skill' | 'custom'
    achievement: string
    description: string
    celebration: boolean              // 是否已庆祝
  }[]

  // 目标设定
  goals: {
    weekly: {
      hoursTarget: number
      hoursActual: number
      progress: number                // 0-1
    }
    monthly: {
      milestonesTarget: string[]
      milestonesAchieved: string[]
      progress: number
    }
    custom: {
      description: string
      targetDate: Date
      progress: number
      status: 'active' | 'completed' | 'paused'
    }[]
  }
}

// === 用户学习分析 (新增) ===
export interface UserAnalytics {
  // 学习模式分析
  learningPatterns: {
    mostActiveHours: number[]         // 最活跃的小时
    mostActiveDays: string[]          // 最活跃的天
    preferredSessionLength: number    // 偏好的学习时长
    consistencyScore: number          // 一致性评分 0-1
    motivationTrends: {               // 动机趋势
      date: Date
      score: number
    }[]
  }

  // 效果分析
  effectiveness: {
    overallProgress: number           // 整体进步速度
    skillBreakdown: {
      listening: number
      speaking: number
      reading: number
      writing: number
    }
    learningVelocity: number          // 学习速度
    retentionRate: number             // 知识保持率
    difficultyAdaptation: number      // 难度适应能力
  }

  // 比较分析
  benchmarking: {
    peerComparison: {                 // 同侪比较
      percentile: number              // 百分位排名
      averageProgress: number         // 平均进度
      topPerformers: number           // 顶尖学习者水平
    }
    personalBests: {
      longestStreak: number
      mostProductiveWeek: number
      fastestLevelUp: number
    }
  }

  // 预测分析
  predictions: {
    nextLevelDate: Date               // 预计下个等级达成时间
    goalAchievementProbability: number // 目标达成概率
    recommendedAdjustments: string[]   // 建议调整
    riskFactors: string[]             // 风险因素
  }

  // 个性化建议
  recommendations: {
    studySchedule: {
      optimalTimes: string[]
      suggestedDuration: number
      restDays: string[]
    }
    contentFocus: string[]            // 应重点关注的内容
    methodSuggestions: string[]       // 方法建议
    motivationStrategies: string[]    // 激励策略
  }
}

// === 增强的用户资料 ===
export interface UserProfile {
  // === 基础信息 ===
  id: string
  name?: string
  email?: string
  avatar?: string

  // === 语言背景 (增强) ===
  languageBackground: {
    nativeLanguages: string[]         // 支持多母语
    knownLanguages: LanguageProficiency[]
    learningHistory: LanguageLearningHistory[]
    certifications: LanguageCertification[]
  }

  // === 学习档案 (新增) ===
  learningProfile: {
    goals: LearningGoal[]
    timeCommitment: TimeCommitment
    learningStyle: LearningStyle[]
    culturalInterests: string[]
    difficultyPreference: number
    motivationLevel: number           // 当前动机水平
    consistencyScore: number          // 学习一致性评分
  }

  // === 个人偏好 ===
  preferences: UserPreferences

  // === 学习进度 (增强) ===
  progress: LearningProgress[]

  // === 个人分析 (新增) ===
  analytics: UserAnalytics

  // === 时间戳 ===
  joinDate: Date
  lastActive: Date
  createdAt: Date
  updatedAt: Date
}

export interface UserActivity {
  id: string
  userId: string
  type: 'study' | 'quiz' | 'review' | 'achievement' | 'milestone'
  languageId?: string
  details: {
    duration?: number       // 学习时长(分钟)
    score?: number         // 测试分数
    topic?: string         // 学习主题
    achievement?: string   // 成就名称
  }
  timestamp: Date
}

export interface UserStats {
  totalHoursStudied: number
  languagesLearning: number
  currentStreak: number
  longestStreak: number
  achievements: number
  weeklyAverage: number
  monthlyAverage: number
  favoriteLanguage?: string
}
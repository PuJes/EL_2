/**
 * 系统支持相关的类型定义
 * 包括难度计算、学习路径模板、资源评估等
 */

import type { ProficiencyLevel, LearningStyle } from './user'
import type { Language } from './language'

// === 难度计算系数表 ===
export interface DifficultyMatrix {
  // 语系关系系数矩阵
  familyRelationMatrix: {
    [fromFamily: string]: {
      [toFamily: string]: number      // 0.3-1.0 系数
    }
  }

  // 文字系统难度系数
  writingSystemMatrix: {
    [fromType: string]: {
      [toType: string]: number        // 0.2-1.2 系数
    }
  }

  // 语法特征系数
  grammarFeatureMatrix: {
    wordOrder: {
      [from: string]: {
        [to: string]: number          // 语序转换难度
      }
    }
    morphology: {
      [fromType: string]: {
        [toType: string]: number      // 形态学复杂度
      }
    }
  }

  // 语音系数
  phoneticMatrix: {
    tonalTransition: {
      noneToTone: number              // 无声调到有声调
      toneToNone: number              // 有声调到无声调
      toneToTone: number              // 声调到声调
    }
    phoneticSimilarity: {
      [lang1: string]: {
        [lang2: string]: number       // 语音相似度 0-1
      }
    }
  }

  // 文化距离系数
  culturalDistanceMatrix: {
    [region1: string]: {
      [region2: string]: number       // 文化距离 0-1
    }
  }
}

// === 学习路径模板 ===
export interface LearningPathTemplate {
  id: string
  name: string
  description: string
  targetLanguages: string[]           // 适用语言
  difficultyRange: [number, number]   // 适用难度范围

  phases: {
    id: string
    name: string
    description: string
    order: number

    // 阶段条件
    prerequisites: string[]           // 前置条件
    duration: {
      intensive: number               // 密集学习周数
      regular: number                 // 常规学习周数
      casual: number                  // 休闲学习周数
    }

    // 学习目标
    objectives: {
      skills: {
        listening: ProficiencyLevel
        speaking: ProficiencyLevel
        reading: ProficiencyLevel
        writing: ProficiencyLevel
      }
      vocabulary: number              // 词汇量目标
      grammar: string[]               // 语法点
      culturalKnowledge: string[]     // 文化知识点
    }

    // 学习内容
    content: {
      coreTopics: string[]            // 核心主题
      practiceTypes: string[]         // 练习类型
      assessmentMethods: string[]     // 评估方法
      culturalActivities: string[]    // 文化活动
    }

    // 资源推荐
    resources: {
      required: string[]              // 必需资源
      recommended: string[]           // 推荐资源
      optional: string[]              // 可选资源
    }
  }[]
}

// === 学习资源评估 ===
export interface LearningResourceEvaluation {
  resourceId: string

  // 质量评估
  quality: {
    contentAccuracy: number           // 内容准确性 1-5
    pedagogicalValue: number          // 教学价值 1-5
    userExperience: number            // 用户体验 1-5
    technicalQuality: number          // 技术质量 1-5
    culturalAuthenticity: number      // 文化真实性 1-5
  }

  // 适用性评估
  suitability: {
    beginnerFriendly: number          // 初学者友好度 1-5
    intermediateValue: number         // 中级价值 1-5
    advancedDepth: number             // 高级深度 1-5
    practicalApplication: number      // 实用性 1-5
    engagementLevel: number           // 参与度 1-5
  }

  // 用户反馈
  userFeedback: {
    averageRating: number
    totalReviews: number
    helpfulnessScore: number          // 有用性评分
    difficultyRating: number          // 难度评分
    completionRate: number            // 完成率
  }

  // 学习效果
  effectiveness: {
    skillImprovement: {
      listening: number
      speaking: number
      reading: number
      writing: number
    }
    retentionRate: number             // 知识保持率
    transferability: number           // 迁移能力
    motivationImpact: number          // 动机影响
  }
}

// === 数据验证规则 ===
export interface DataValidationRules {
  language: {
    required: string[]                // 必填字段
    ranges: {                        // 数值范围
      difficulty: [number, number]
      complexity: [number, number]
      timeEstimate: [number, number]
    }
    formats: {                       // 格式要求
      languageId: string             // 正则表达式
      iso639: string                 // ISO标准格式
    }
  }

  user: {
    privacy: string[]                 // 隐私保护字段
    encryption: string[]              // 需加密字段
    retention: {                     // 数据保留期
      active: number                 // 活跃用户数据保留(天)
      inactive: number               // 非活跃用户数据保留(天)
    }
  }

  survey: {
    completeness: number              // 完整性要求 0-1
    consistency: string[]             // 一致性检查字段
    anonymization: string[]           // 匿名化处理字段
  }
}

// === 算法配置 ===
export interface AlgorithmConfig {
  // 推荐算法配置
  recommendation: {
    weights: {
      languageSimilarity: number      // 语言相似性权重
      culturalMatch: number           // 文化匹配权重
      difficultyFit: number           // 难度适合度权重
      practicalValue: number          // 实用价值权重
      timeAlignment: number           // 时间匹配权重
    }

    // 算法参数
    parameters: {
      minConfidence: number           // 最小置信度阈值
      maxRecommendations: number      // 最大推荐数量
      diversityFactor: number         // 多样性因子
      noveltyBonus: number            // 新颖性奖励
    }
  }

  // 难度计算配置
  difficulty: {
    baseWeights: {
      family: number                  // 语系权重
      writing: number                 // 文字权重
      grammar: number                 // 语法权重
      phonetics: number               // 语音权重
      culture: number                 // 文化权重
    }

    adjustmentFactors: {
      experienceMultiplier: number    // 经验调整倍数
      motivationBonus: number         // 动机奖励
      timeConstraintPenalty: number   // 时间限制惩罚
    }
  }

  // 学习分析配置
  analytics: {
    // 进度计算参数
    progressCalculation: {
      skillWeights: {
        listening: number
        speaking: number
        reading: number
        writing: number
      }
      decayRate: number               // 知识衰减率
      retentionThreshold: number      // 保持阈值
    }

    // 预测模型参数
    prediction: {
      lookAheadDays: number           // 预测天数
      confidenceInterval: number      // 置信区间
      seasonalityFactor: number       // 季节性因子
    }
  }
}

// === 缓存策略配置 ===
export interface CacheConfig {
  strategies: {
    // 语言数据缓存
    languageData: {
      ttl: number                     // 生存时间(秒)
      maxSize: number                 // 最大缓存大小
      refreshThreshold: number        // 刷新阈值
    }

    // 用户数据缓存
    userData: {
      ttl: number
      maxSize: number
      sensitiveDataTtl: number        // 敏感数据TTL
    }

    // 计算结果缓存
    calculations: {
      difficultyCache: {
        ttl: number
        maxEntries: number
      }
      recommendationCache: {
        ttl: number
        maxEntries: number
      }
    }
  }

  // 缓存键策略
  keyStrategies: {
    userSpecific: string[]            // 用户特定键
    global: string[]                  // 全局键
    computed: string[]                // 计算结果键
  }
}

// === 性能监控配置 ===
export interface PerformanceConfig {
  // API响应时间阈值
  responseTimeThresholds: {
    fast: number                      // 快速响应阈值(ms)
    acceptable: number                // 可接受阈值(ms)
    slow: number                      // 慢响应阈值(ms)
  }

  // 数据库查询优化
  queryOptimization: {
    batchSize: number                 // 批处理大小
    connectionPoolSize: number        // 连接池大小
    queryTimeout: number              // 查询超时(ms)
  }

  // 内存使用监控
  memoryMonitoring: {
    warningThreshold: number          // 警告阈值(MB)
    criticalThreshold: number         // 严重阈值(MB)
    gcFrequency: number               // GC频率(秒)
  }
}

// === 错误处理配置 ===
export interface ErrorHandlingConfig {
  // 错误分类
  errorTypes: {
    validation: {
      retryable: boolean
      logLevel: 'info' | 'warn' | 'error'
    }
    computation: {
      retryable: boolean
      logLevel: 'info' | 'warn' | 'error'
      fallbackStrategy: 'default' | 'cache' | 'simplified'
    }
    external: {
      retryable: boolean
      logLevel: 'info' | 'warn' | 'error'
      maxRetries: number
      retryDelay: number
    }
  }

  // 降级策略
  fallbackStrategies: {
    recommendationFallback: 'popular' | 'random' | 'cached'
    difficultyFallback: 'average' | 'conservative' | 'cached'
    analyticsFallback: 'basic' | 'historical' | 'disabled'
  }
}

// === 系统配置聚合 ===
export interface SystemConfig {
  algorithms: AlgorithmConfig
  cache: CacheConfig
  performance: PerformanceConfig
  errorHandling: ErrorHandlingConfig
  validation: DataValidationRules

  // 功能开关
  featureFlags: {
    dynamicDifficulty: boolean        // 动态难度计算
    advancedAnalytics: boolean        // 高级分析
    realTimeRecommendations: boolean  // 实时推荐
    predictiveModeling: boolean       // 预测建模
    culturalInsights: boolean         // 文化洞察
  }

  // 环境配置
  environment: {
    name: 'development' | 'staging' | 'production'
    debug: boolean
    logging: {
      level: 'debug' | 'info' | 'warn' | 'error'
      destinations: string[]
    }
  }
}
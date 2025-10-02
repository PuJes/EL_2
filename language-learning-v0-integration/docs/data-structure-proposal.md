# 语言学习平台数据结构完善方案

## 📋 项目概述

本文档详细描述了语言学习平台所有数据结构的现状分析和完善建议。基于动态难度计算的MVP方案，我们将建立更科学、个性化的语言推荐系统。

## 🎯 核心改进目标

1. **动态难度计算**: 基于用户母语和目标语言的关系动态计算学习难度
2. **个性化推荐**: 根据用户背景、目标、时间投入等因素个性化推荐
3. **数据结构现代化**: 清理旧结构，建立更清晰的数据模型
4. **可扩展性**: 支持未来功能扩展和数据增长

---

## 1. 🔤 Language 数据结构

### 现状分析
- ✅ 基础信息结构完整
- ❌ 固定难度等级不够精确
- ❌ 缺少语言学特征数据
- ❌ 学习时间估算过于简单

### 建议方案

#### 1.1 核心Language接口
```typescript
interface Language {
  // === 基础信息 ===
  id: string                        // 语言唯一标识
  flag: string                      // 国旗emoji或图片URL
  name: string                      // 中文名称
  nameEn: string                    // 英文名称
  nativeName: string                // 本地语言名称
  description: string               // 语言描述
  category: LanguageCategory        // 语言分类
  speakers: SpeakerInfo             // 使用者信息
  regions: Region[]                 // 使用地区
  culturalInfo: CultureInfo         // 文化信息
  resources: LearningResource[]     // 学习资源
  tags: string[]                    // 标签
  metadata: LanguageMetadata        // 元数据

  // === 新增核心字段 ===
  profile: LanguageProfile          // 语言基础档案
  dynamicDifficulty: DynamicDifficulty  // 动态难度配置
  learningTimeMatrix: LearningTimeMatrix // 学习时间矩阵
}
```

#### 1.2 语言基础档案 (新增)
```typescript
interface LanguageProfile {
  // 语系信息
  linguisticFamily: {
    family: string                  // "印欧语系", "汉藏语系", "日语语系"
    branch?: string                 // "日耳曼语族", "汉语族"
    subbranch?: string              // "西日耳曼语支"
    isIsolate: boolean              // 是否孤立语系
    familyCode: string              // 标准化代码 "IE", "ST", "JP"
  }

  // 文字系统档案
  writingSystem: {
    primaryType: 'alphabetic' | 'syllabic' | 'logographic' | 'mixed'
    scripts: string[]               // ['latin'], ['hiragana', 'katakana', 'kanji']
    characterCount: number          // 基础字符数量
    direction: 'ltr' | 'rtl' | 'ttb' // 书写方向
    complexity: number              // 1-5 复杂度评分
  }

  // 语法特征档案
  grammar: {
    wordOrder: 'SOV' | 'SVO' | 'VSO' | 'OVS' | 'OSV' | 'VOS'
    features: {
      tenseCount: number            // 时态数量
      caseCount: number             // 格变数量
      genderCount: number           // 性别系统数量
      hasAspect: boolean            // 是否有体系统
      hasEvidentiality: boolean     // 是否有据素系统
      agglutination: number         // 黏着程度 1-5
    }
    complexity: number              // 综合语法复杂度 1-5
  }

  // 语音特征档案 (MVP简化版本)
  phonetics: {
    isTonal: boolean                // 是否声调语言
    toneCount?: number              // 声调数量
    phoneCount: number              // 音素数量
    hasDifficultSounds: string[]    // 困难音素列表
    complexity: number              // 发音复杂度 1-5
  }

  // 文化特征档案 (MVP简化版本)
  culture: {
    formalityLevels: number         // 敬语系统复杂度 1-5
    culturalRegion: string          // "east_asia", "europe", "middle_east"
    hofstedeScores?: {              // 霍夫斯泰德文化维度 (可选)
      powerDistance: number
      individualism: number
      uncertainty: number
    }
  }
}
```

#### 1.3 动态难度配置 (新增)
```typescript
interface DynamicDifficulty {
  baseDifficulty: number            // 基准难度 1-5

  // 动态计算权重配置
  difficultyFactors: {
    familyWeight: number            // 语系关系权重 (30%)
    writingWeight: number           // 文字系统权重 (25%)
    grammarWeight: number           // 语法结构权重 (20%)
    phoneticWeight: number          // 语音系统权重 (15%)
    culturalWeight: number          // 文化距离权重 (10%)
  }
}
```

#### 1.4 学习时间矩阵 (新增)
```typescript
interface LearningTimeMatrix {
  // 基础学习时间 (小时)
  baseHours: {
    beginner: number                // 达到A1/A2的基础小时数
    intermediate: number            // 达到B1/B2的小时数
    advanced: number                // 达到C1/C2的小时数
  }

  // 时间调整因子
  timeModifiers: {
    intensiveBonus: number          // 密集学习折扣 0.7
    casualPenalty: number           // 休闲学习增加 1.3
    experienceBonus: number         // 多语言经验折扣 0.8
    immersionBonus: number          // 沉浸式学习折扣 0.6
  }
}
```

#### 1.5 个性化难度计算结果 (新增)
```typescript
interface PersonalizedDifficulty {
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
```

### MVP实施计划

**优先支持的15种语言**:
1. 中文 (Chinese) - 汉藏语系
2. 英语 (English) - 印欧语系/日耳曼语族
3. 日语 (Japanese) - 日语语系
4. 韩语 (Korean) - 朝鲜语系
5. 法语 (French) - 印欧语系/罗曼语族
6. 德语 (German) - 印欧语系/日耳曼语族
7. 西班牙语 (Spanish) - 印欧语系/罗曼语族
8. 意大利语 (Italian) - 印欧语系/罗曼语族
9. 葡萄牙语 (Portuguese) - 印欧语系/罗曼语族
10. 俄语 (Russian) - 印欧语系/斯拉夫语族
11. 阿拉伯语 (Arabic) - 闪含语系
12. 印地语 (Hindi) - 印欧语系/印度-伊朗语族
13. 泰语 (Thai) - 汉藏语系/侗台语族
14. 荷兰语 (Dutch) - 印欧语系/日耳曼语族
15. 瑞典语 (Swedish) - 印欧语系/日耳曼语族

---

## 2. 📝 Survey 数据结构

### 现状分析
- ✅ 基础框架完整
- ❌ responses字段结构不明确
- ❌ 与新Language结构关联不足
- ❌ 推荐算法数据不够详细

### 建议方案

#### 2.1 结构化的用户回答 (完善)
```typescript
interface SurveyResponses {
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
```

#### 2.2 更新的调查问卷结构
```typescript
interface SurveyQuestion {
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

interface QuestionValidation {
  min?: number
  max?: number
  pattern?: string
  message?: string
  customValidator?: string            // 自定义验证函数名
}

interface QuestionDependency {
  questionId: string
  conditions: {
    operator: 'equals' | 'contains' | 'greater' | 'less' | 'in' | 'not_in'
    value: any
  }[]
  logic: 'AND' | 'OR'                // 多条件的逻辑关系
}
```

#### 2.3 增强的推荐结果
```typescript
interface LanguageRecommendation {
  language: Language
  personalizedDifficulty: PersonalizedDifficulty  // 个性化难度
  matchScore: number                   // 0-100 匹配分数
  rank: number                        // 推荐排名

  // 详细推荐理由
  reasons: {
    primary: RecommendationReason[]   // 主要理由
    secondary: RecommendationReason[] // 次要理由
    warnings: string[]                // 注意事项
  }

  // 学习路径规划
  learningPath: {
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
}
```

---

## 3. 👤 User 数据结构

### 现状分析
- ✅ 基础用户信息完整
- ❌ 学习进度跟踪不够详细
- ❌ 与新Survey和Language结构关联不足
- ❌ 缺少个人学习分析数据

### 建议方案

#### 3.1 增强的用户资料
```typescript
interface UserProfile {
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
```

#### 3.2 语言学习历史 (新增)
```typescript
interface LanguageLearningHistory {
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
```

#### 3.3 增强的学习进度
```typescript
interface LearningProgress {
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

interface SkillProgress {
  level: ProficiencyLevel
  percentage: number                  // 当前级别完成度 0-100
  strengths: string[]                 // 强项
  weaknesses: string[]                // 待改进点
  recentImprovement: number           // 近期提升幅度
  practiceTime: number                // 练习时间分配
}
```

#### 3.4 用户学习分析 (新增)
```typescript
interface UserAnalytics {
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
```

---

## 4. 🔧 系统支持数据结构

### 4.1 难度计算系数表
```typescript
interface DifficultyMatrix {
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
```

### 4.2 学习路径模板
```typescript
interface LearningPathTemplate {
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
```

### 4.3 学习资源评估
```typescript
interface LearningResourceEvaluation {
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
```

---

## 5. 📊 实施建议

### 5.1 迁移策略

#### 阶段1: 核心结构升级 (1-2周)
1. 创建新的Language数据结构
2. 建立15种主要语言的基础档案
3. 实现基础的动态难度计算
4. 保持与现有系统的兼容性

#### 阶段2: Survey系统增强 (2-3周)
1. 升级Survey数据结构
2. 实现新的推荐算法
3. 增加个性化难度计算
4. 优化用户体验流程

#### 阶段3: User系统完善 (2-3周)
1. 扩展User数据结构
2. 实现学习进度详细跟踪
3. 添加用户学习分析功能
4. 建立个性化推荐系统

#### 阶段4: 系统优化 (1-2周)
1. 性能优化和测试
2. 数据验证和清理
3. 用户反馈收集和调整
4. 文档完善和培训

### 5.2 数据质量保证

#### 数据验证规则
```typescript
interface DataValidationRules {
  language: {
    required: string[]                // 必填字段
    ranges: {                        // 数值范围
      difficulty: [1, 5]
      complexity: [1, 5]
      timeEstimate: [1, 10000]
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
      active: number                 // 活跃用户数据保留
      inactive: number               // 非活跃用户数据保留
    }
  }

  survey: {
    completeness: number              // 完整性要求
    consistency: string[]             // 一致性检查
    anonymization: string[]           // 匿名化处理
  }
}
```

### 5.3 性能考量

#### 缓存策略
- **语言基础数据**: 长期缓存 (24小时)
- **用户偏好**: 中期缓存 (1小时)
- **动态计算结果**: 短期缓存 (15分钟)
- **实时进度**: 无缓存

#### 数据库索引
```sql
-- 语言表索引
CREATE INDEX idx_language_family ON languages(profile.linguisticFamily.family);
CREATE INDEX idx_language_category ON languages(category);
CREATE INDEX idx_language_difficulty ON languages(dynamicDifficulty.baseDifficulty);

-- 用户表索引
CREATE INDEX idx_user_native_lang ON users(languageBackground.nativeLanguages);
CREATE INDEX idx_user_learning ON users(progress.languageId);
CREATE INDEX idx_user_active ON users(lastActive);

-- 调查表索引
CREATE INDEX idx_survey_user ON survey_responses(userId);
CREATE INDEX idx_survey_version ON survey_responses(surveyVersion);
CREATE INDEX idx_survey_completed ON survey_responses(completedAt);
```

---

## 6. 🎯 下一步行动

### 6.1 立即行动项
1. **确认数据结构方案**: 审阅并确认上述所有数据结构设计
2. **准备基础数据**: 收集15种主要语言的语言学特征数据
3. **设计迁移计划**: 制定详细的数据迁移和系统升级计划
4. **技术架构评估**: 评估现有技术栈对新数据结构的支持程度

### 6.2 资源需求
- **数据收集**: 1周 (语言学特征数据)
- **开发工作**: 6-8周 (分4个阶段)
- **测试验证**: 2周 (并行进行)
- **部署上线**: 1周

### 6.3 风险评估
- **数据质量风险**: 语言学数据的准确性需要专家验证
- **性能风险**: 动态计算可能影响响应速度
- **用户体验风险**: 新的问卷流程可能影响完成率
- **兼容性风险**: 现有数据的迁移复杂度

---

## 📚 参考资料

1. **语言学分类**: Ethnologue, ISO 639标准
2. **文化维度理论**: Hofstede's Cultural Dimensions
3. **语言学习理论**: CEFR标准, ACTFL指导原则
4. **数据库设计**: MongoDB最佳实践, TypeScript类型设计
5. **用户体验**: 问卷设计最佳实践, 学习分析理论

---

**最后更新**: 2024年9月22日
**文档版本**: 1.0
**状态**: 待审阅
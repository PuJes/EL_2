# 语言学习平台 - 数据结构文档

## 目录
- [概述](#概述)
- [核心数据结构](#核心数据结构)
- [语言数据模型](#语言数据模型)
- [用户数据模型](#用户数据模型)
- [调查问卷数据模型](#调查问卷数据模型)
- [JSON 数据示例](#json-数据示例)
- [API 接口规范](#api-接口规范)
- [数据迁移指南](#数据迁移指南)

## 概述

语言学习平台采用TypeScript构建，数据结构设计支持个性化语言推荐、动态难度计算和详细的学习进度跟踪。

### 技术栈
- **TypeScript**: 类型安全的数据模型
- **JSON**: 语言数据存储格式
- **Next.js**: 前端框架
- **Repository Pattern**: 数据访问层

### 数据组织原则
1. **类型安全**: 所有数据都有严格的TypeScript类型定义
2. **向后兼容**: 支持渐进式数据迁移
3. **可扩展性**: 支持新增语言和功能
4. **个性化**: 基于用户背景的动态计算

---

## 核心数据结构

### 基础类型定义

```typescript
// 语言难度等级 (1-5)
export type LanguageDifficulty = 1 | 2 | 3 | 4 | 5

// 语言分类
export type LanguageCategory =
  | 'popular'     // 热门语言
  | 'business'    // 商务语言
  | 'cultural'    // 文化语言
  | 'niche'       // 小众语言

// 文字系统
export type WritingSystem =
  | 'latin'       // 拉丁字母
  | 'cyrillic'    // 西里尔字母
  | 'arabic'      // 阿拉伯字母
  | 'chinese'     // 汉字
  | 'japanese'    // 日文(假名+汉字)
  | 'korean'      // 韩文
  | 'devanagari'  // 梵文字母
  | 'other'       // 其他

// 文化区域
export type CulturalRegion =
  | 'east_asia' | 'europe' | 'middle_east'
  | 'latin_america' | 'africa' | 'north_america'
  | 'oceania' | 'south_asia' | 'southeast_asia'
```

---

## 语言数据模型

### 1. 核心语言接口 (Language)

```typescript
export interface Language {
  // === 基础信息 ===
  id: string                        // 唯一标识符
  flag: string                      // 国旗emoji或图片URL
  name: string                      // 中文名称
  nameEn: string                    // 英文名称
  nativeName: string                // 本地语言名称
  description: string               // 语言描述
  category: LanguageCategory        // 语言分类

  // === 语言特征 ===
  writingSystem: WritingSystem[]    // 文字系统
  speakers: SpeakerInfo            // 使用者信息
  regions: Region[]                // 地区分布

  // === 文化信息 ===
  culturalInfo: CultureInfo        // 文化背景

  // === 学习相关 ===
  resources: LearningResource[]    // 学习资源
  tags: string[]                   // 标签
  metadata: LanguageMetadata       // 元数据

  // === 新增字段 (个性化学习) ===
  profile?: LanguageProfile        // 语言基础档案
  dynamicDifficulty?: DynamicDifficulty  // 动态难度配置
  learningTimeMatrix?: LearningTimeMatrix // 学习时间矩阵

  // === 扩展字段 (西班牙语等已实现) ===
  difficultyAnalysis?: {           // 语言本身的难度分析
    grammar: number                // 语法复杂度 1-5
    pronunciation: number          // 发音难度 1-5
    writing: number               // 文字系统难度 1-5
  }

  learningGuide?: {               // 学习指南
    learningPath: LearningPathStep[]     // 学习路径
    learningMethods: LearningMethod[]    // 学习方法
    learningTools: LearningToolCategory[] // 学习工具
  }

  // === 向后兼容字段 ===
  difficulty?: LanguageDifficulty  // 传统难度等级
  learningTimeEstimate?: LearningTimeEstimate // 传统时间估算
}
```

### 2. 学习指南数据结构

```typescript
// 学习路径步骤
export interface LearningPathStep {
  level: 'beginner' | 'intermediate' | 'advanced'
  title: string                    // 步骤标题
  description: string              // 详细描述
  estimatedHours: number          // 预估学习时间
  skills: string[]                // 涉及技能
}

// 学习方法
export interface LearningMethod {
  title: string                   // 方法名称
  description: string             // 方法描述
  techniques: string[]            // 具体技巧
}

// 学习工具分类
export interface LearningToolCategory {
  category: string                // 工具分类名称
  tools: string[]                 // 具体工具列表
}
```

### 3. 语言档案 (高级功能)

```typescript
export interface LanguageProfile {
  // 语系信息
  linguisticFamily: {
    family: string                 // "印欧语系", "汉藏语系"
    branch?: string               // "日耳曼语族", "汉语族"
    subbranch?: string            // "西日耳曼语支"
    isIsolate: boolean            // 是否孤立语系
    familyCode: string            // 标准化代码
  }

  // 文字系统档案
  writingSystem: {
    primaryType: WritingSystemType // 'alphabetic' | 'syllabic' | 'logographic' | 'mixed'
    scripts: string[]             // 具体文字
    characterCount: number        // 字符数量
    direction: WritingDirection   // 'ltr' | 'rtl' | 'ttb'
    complexity: number            // 复杂度 1-5
  }

  // 语法特征
  grammar: {
    wordOrder: WordOrder          // 语序 'SOV' | 'SVO' | ...
    features: {
      tenseCount: number          // 时态数量
      caseCount: number           // 格变数量
      genderCount: number         // 性别系统数量
      hasAspect: boolean          // 是否有体系统
      hasEvidentiality: boolean   // 是否有据素系统
      agglutination: number       // 黏着程度 1-5
    }
    complexity: number            // 语法复杂度 1-5
  }

  // 语音特征
  phonetics: {
    isTonal: boolean              // 是否声调语言
    toneCount?: number            // 声调数量
    phoneCount: number            // 音素数量
    hasDifficultSounds: string[]  // 困难音素列表
    complexity: number            // 发音复杂度 1-5
  }

  // 文化特征
  culture: {
    formalityLevels: number       // 敬语复杂度 1-5
    culturalRegion: CulturalRegion
    hofstedeScores?: {            // 文化维度评分
      powerDistance: number
      individualism: number
      uncertainty: number
    }
  }
}
```

### 4. 动态难度计算

```typescript
export interface DynamicDifficulty {
  baseDifficulty: number          // 基准难度 1-5

  // 计算权重配置
  difficultyFactors: {
    familyWeight: number          // 语系关系权重 (30%)
    writingWeight: number         // 文字系统权重 (25%)
    grammarWeight: number         // 语法结构权重 (20%)
    phoneticWeight: number        // 语音系统权重 (15%)
    culturalWeight: number        // 文化距离权重 (10%)
  }
}

export interface PersonalizedDifficulty {
  overallDifficulty: number       // 个性化难度 1-5
  timeEstimateWeeks: number       // 时间估算（周）
  breakdown: {                    // 难度分解
    familyRelation: number        // 语系相关性影响
    writingSystem: number         // 文字系统影响
    grammar: number               // 语法影响
    phonetics: number             // 语音影响
    culture: number               // 文化影响
  }
  confidence: number              // 计算置信度 0-1
  reasons: string[]               // 难度判断理由
}
```

---

## 用户数据模型

### 1. 用户档案

```typescript
export interface UserProfile {
  // === 基础信息 ===
  id: string
  name?: string
  email?: string
  avatar?: string

  // === 语言背景 ===
  languageBackground: {
    nativeLanguages: string[]               // 母语（支持多语）
    knownLanguages: LanguageProficiency[]   // 已知语言
    learningHistory: LanguageLearningHistory[] // 学习历史
    certifications: LanguageCertification[] // 证书
  }

  // === 学习档案 ===
  learningProfile: {
    goals: LearningGoal[]           // 学习目标
    timeCommitment: TimeCommitment  // 时间投入
    learningStyle: LearningStyle[]  // 学习风格
    culturalInterests: string[]     // 文化兴趣
    difficultyPreference: number    // 难度偏好
    motivationLevel: number         // 动机水平
    consistencyScore: number        // 学习一致性
  }

  // === 进度跟踪 ===
  progress: LearningProgress[]      // 学习进度
  analytics: UserAnalytics         // 学习分析

  // === 系统信息 ===
  preferences: UserPreferences     // 个人偏好
  joinDate: Date
  lastActive: Date
  createdAt: Date
  updatedAt: Date
}
```

### 2. 学习进度

```typescript
export interface LearningProgress {
  languageId: string
  currentLevel: ProficiencyLevel
  targetLevel: ProficiencyLevel

  // 技能进度
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
    averageSessionLength: number
    longestSession: number
    shortestSession: number
  }

  // 连续性
  streaks: {
    currentStreak: number
    longestStreak: number
    thisWeekSessions: number
    lastStudyDate: Date
  }

  // 目标设定
  goals: {
    weekly: {
      hoursTarget: number
      hoursActual: number
      progress: number
    }
    monthly: {
      milestonesTarget: string[]
      milestonesAchieved: string[]
      progress: number
    }
    custom: Array<{
      description: string
      targetDate: Date
      progress: number
      status: 'active' | 'completed' | 'paused'
    }>
  }
}
```

---

## 调查问卷数据模型

### 1. 问卷配置

```typescript
export interface SurveyConfig {
  id: string
  version: string
  title: string
  description: string
  sections: SurveySection[]
  estimatedTime: number

  // 评分配置
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
```

### 2. 用户回答

```typescript
export interface SurveyResponses {
  // 语言背景
  nativeLanguage: string
  knownLanguages: Array<{
    languageId: string
    proficiency: 'basic' | 'intermediate' | 'advanced'
    yearsStudied?: number
    lastUsed?: string
  }>

  // 学习目标
  learningGoals: LearningGoal[]
  motivation: {
    primary: string
    secondary?: string[]
    urgency: number      // 1-5
    commitment: number   // 1-5
  }

  // 时间投入
  timeCommitment: TimeCommitment
  preferredSchedule: {
    dailyMinutes: number
    weeklyDays: number
    preferredTimes: string[]
    consistency: number
  }

  // 学习偏好
  learningStyle: LearningStyle[]
  contentPreferences: {
    interactive: number     // 1-5
    structured: number      // 1-5
    immersive: number       // 1-5
    practical: number       // 1-5
    cultural: number        // 1-5
  }

  // 文化兴趣
  culturalInterests: string[]
  travelExperience: string[]
  culturalExposure: {
    movies: boolean
    music: boolean
    books: boolean
    friends: boolean
  }

  // 其他偏好
  difficultyPreference: number  // 1-5
  timeline: string              // "3months", "6months", etc.
  budgetRange: string           // "free", "low", "medium", "high"
  devicePreference: string[]    // "mobile", "desktop", "tablet"

  // 特殊需求
  specificNeeds: string[]       // "exam_prep", "business", "travel"
  accessibilityNeeds: string[]
  previousFailures: {
    hasFailures: boolean
    reasons?: string[]
    languages?: string[]
  }
}
```

### 3. 推荐结果

```typescript
export interface LanguageRecommendation {
  language: Language
  personalizedDifficulty: PersonalizedDifficulty
  matchScore: number              // 0-100 匹配分数
  rank: number                   // 推荐排名

  // 五个维度评分
  dimensionScores: {
    culturalMatch: number         // 文化匹配度
    difficultyFit: number         // 难度适配度
    goalAlignment: number         // 目标匹配度
    timeFeasibility: number       // 时间可行性
    practicalValue: number        // 实用价值
  }

  // 推荐理由
  reasons: {
    primary: RecommendationReason[]
    secondary: RecommendationReason[]
    warnings: string[]
  }

  // 学习路径
  learningPath: LearningPath

  // 分析
  analysis: {
    pros: string[]
    cons: string[]
    alternatives: {
      easier: string[]
      similar: string[]
      harder: string[]
    }
  }

  // 成功预测
  successPrediction: {
    probability: number           // 成功概率 0-1
    timeline: string              // 预期时间线
    challengePoints: string[]     // 挑战点
    supportNeeded: string[]       // 所需支持
  }
}
```

---

## JSON 数据示例

### 语言数据示例 (西班牙语)

```json
{
  "id": "spanish",
  "flag": "🇪🇸",
  "name": "西班牙语",
  "nameEn": "Spanish",
  "nativeName": "Español",
  "difficulty": 2,
  "learningTimeEstimate": {
    "beginner": "3个月",
    "intermediate": "6个月",
    "advanced": "1-2年",
    "totalHours": 900
  },
  "difficultyAnalysis": {
    "grammar": 3,
    "pronunciation": 2,
    "writing": 2,
    "culturalDifference": 2
  },
  "learningGuide": {
    "learningPath": [
      {
        "level": "beginner",
        "title": "基础发音和语调",
        "description": "掌握西班牙语的发音规则，包括重音和语调",
        "estimatedHours": 50,
        "skills": ["发音", "听力基础", "基本语调"]
      },
      {
        "level": "beginner",
        "title": "基础词汇和短语",
        "description": "学习日常生活中最常用的500个单词",
        "estimatedHours": 80,
        "skills": ["日常词汇", "问候语", "基本表达"]
      }
    ],
    "learningMethods": [
      {
        "title": "沉浸式学习法",
        "description": "通过西班牙语媒体内容进行语言浸泡",
        "techniques": ["观看西语电影", "听西语播客", "阅读新闻"]
      }
    ],
    "learningTools": [
      {
        "category": "应用软件",
        "tools": ["Duolingo", "Babbel", "Busuu", "HelloTalk"]
      },
      {
        "category": "在线资源",
        "tools": ["SpanishDict", "Conjuguemos", "News in Slow Spanish"]
      }
    ]
  },
  "description": "西班牙语是世界第二大语言，使用拉丁字母，语法相对简单，适合初学者。",
  "category": "popular",
  "writingSystem": ["latin"],
  "speakers": {
    "native": 460000000,
    "total": 500000000,
    "countries": ["西班牙", "墨西哥", "阿根廷", "哥伦比亚"]
  },
  "regions": [
    { "code": "ES", "name": "西班牙", "primaryLanguage": true },
    { "code": "MX", "name": "墨西哥", "primaryLanguage": true }
  ],
  "culturalInfo": {
    "history": "西班牙语源于拉丁语，是罗曼语族的重要分支",
    "traditions": ["弗拉明戈", "斗牛", "西班牙节庆", "天主教文化"],
    "festivals": ["圣周", "西红柿节", "奔牛节", "三王节"],
    "cuisine": ["西班牙火腿", "海鲜饭", "小食文化", "桑格利亚"],
    "arts": ["毕加索", "达利", "弗拉明戈舞", "建筑艺术"],
    "literature": ["堂吉诃德", "洛尔迦", "拉美文学"],
    "modernCulture": ["足球", "拉丁音乐", "电影", "时尚"]
  },
  "resources": [],
  "tags": ["欧洲", "拉丁美洲", "商务", "旅行", "易学"],
  "metadata": {
    "iso639_1": "es",
    "iso639_2": "spa",
    "family": "Indo-European",
    "branch": "Romance",
    "order": 3,
    "featured": true,
    "lastUpdated": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## API 接口规范

### 语言相关接口

```typescript
// 获取所有语言
GET /api/languages
Response: Language[]

// 获取单个语言详情
GET /api/languages/{id}
Response: Language

// 搜索语言
POST /api/languages/search
Body: LanguageSearchQuery
Response: Language[]

// 获取语言推荐
POST /api/languages/recommend
Body: SurveyResponses
Response: LanguageRecommendation[]
```

### 用户相关接口

```typescript
// 获取用户档案
GET /api/users/{id}
Response: UserProfile

// 更新学习进度
PUT /api/users/{id}/progress/{languageId}
Body: Partial<LearningProgress>
Response: LearningProgress

// 获取学习统计
GET /api/users/{id}/analytics
Response: UserAnalytics
```

### 调查问卷接口

```typescript
// 获取问卷配置
GET /api/survey/config
Response: SurveyConfig

// 提交问卷回答
POST /api/survey/submit
Body: SurveyResponses
Response: SurveyResponse

// 获取推荐结果
GET /api/survey/{sessionId}/recommendations
Response: LanguageRecommendation[]
```

---

## 数据迁移指南

### 1. 现有数据扩展

对于已有的基础语言数据，可以渐进式添加新字段：

```typescript
// 步骤1: 添加可选的扩展字段
interface Language {
  // ... 现有字段
  difficultyAnalysis?: DifficultyAnalysis
  learningGuide?: LearningGuide
}

// 步骤2: 为每个语言添加扩展数据
const enhancedLanguageData = {
  ...existingLanguageData,
  difficultyAnalysis: {
    grammar: calculateGrammarDifficulty(language),
    pronunciation: calculatePronunciationDifficulty(language),
    writing: calculateWritingDifficulty(language),
    culturalDifference: calculateCulturalDifference(language)
  }
}
```

### 2. 数据验证

```typescript
// 数据验证函数
function validateLanguageData(language: Language): boolean {
  const required = ['id', 'name', 'nameEn', 'nativeName'];
  for (const field of required) {
    if (!language[field]) {
      console.error(`Missing required field: ${field}`);
      return false;
    }
  }

  if (language.difficulty && (language.difficulty < 1 || language.difficulty > 5)) {
    console.error('Difficulty must be between 1 and 5');
    return false;
  }

  return true;
}
```

### 3. 向后兼容处理

```typescript
// 兼容性工具函数
function getLanguageDifficulty(language: Language, userBackground?: UserLanguageBackground): number {
  // 优先使用个性化难度
  if (language.dynamicDifficulty && userBackground) {
    return calculatePersonalizedDifficulty(language, userBackground).overallDifficulty;
  }

  // 其次使用分析难度
  if (language.difficultyAnalysis) {
    return Math.round((
      language.difficultyAnalysis.grammar +
      language.difficultyAnalysis.pronunciation +
      language.difficultyAnalysis.writing
    ) / 3);
  }

  // 最后使用传统难度
  return language.difficulty || 3;
}
```

---

## 总结

本数据结构文档涵盖了语言学习平台的完整数据模型，包括：

1. **类型安全**: 完整的TypeScript类型定义
2. **可扩展性**: 支持新功能的渐进式添加
3. **个性化**: 基于用户背景的动态计算
4. **兼容性**: 向后兼容的数据迁移策略

### 关键特性

- 🎯 **个性化推荐**: 基于用户背景的动态难度计算
- 📊 **详细进度**: 多维度的学习进度跟踪
- 🔄 **数据迁移**: 平滑的版本升级路径
- 🛡️ **类型安全**: 完整的TypeScript支持
- 🌍 **国际化**: 多语言和文化支持

### 下一步计划

1. 为更多语言添加详细的学习指南数据
2. 实现动态难度计算算法
3. 完善用户学习分析功能
4. 优化数据存储和查询性能

---

*文档版本: v1.0*
*最后更新: 2024-09-27*
*维护者: 语言学习平台开发团队*
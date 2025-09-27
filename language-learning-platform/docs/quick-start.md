# 快速开始指南

## 当前数据结构概览

语言学习平台目前包含以下主要数据结构：

### 1. 核心数据类型

```typescript
// 基础类型
LanguageDifficulty = 1 | 2 | 3 | 4 | 5
LanguageCategory = 'popular' | 'business' | 'cultural' | 'niche'
WritingSystem = 'latin' | 'cyrillic' | 'arabic' | 'chinese' | 'japanese' | 'korean' | 'devanagari' | 'other'
```

### 2. 语言数据结构（当前实现）

**基础字段（所有语言都有）:**
- `id`: 唯一标识符
- `flag`: 国旗emoji
- `name`: 中文名称
- `nameEn`: 英文名称
- `nativeName`: 本地语言名称
- `difficulty`: 传统难度等级 1-5
- `learningTimeEstimate`: 学习时间估算
- `description`: 语言描述
- `category`: 语言分类
- `writingSystem`: 文字系统数组
- `speakers`: 使用者信息
- `regions`: 地区分布
- `culturalInfo`: 文化信息
- `resources`: 学习资源（当前为空数组）
- `tags`: 标签数组
- `metadata`: 元数据

**扩展字段（西班牙语已实现）:**
- `difficultyAnalysis`: 详细难度分析
  - `grammar`: 语法复杂度 1-5
  - `pronunciation`: 发音难度 1-5
  - `writing`: 文字难度 1-5
  - `culturalDifference`: 文化差异度 1-5
- `learningGuide`: 学习指南
  - `learningPath`: 学习路径步骤数组
  - `learningMethods`: 学习方法数组
  - `learningTools`: 学习工具分类数组

### 3. 当前语言列表

项目中目前包含以下语言：

1. **japanese** (日语) - 难度 4, 2200小时
2. **korean** (韩语) - 难度 3, 1800小时
3. **spanish** (西班牙语) - 难度 2, 900小时 ⭐ *已增强*
4. **french** (法语) - 难度 3, 1200小时
5. **german** (德语) - 难度 4, 1500小时
6. **english** (英语) - 难度 2, 750小时
7. **chinese** (中文) - 难度 5, 2500小时
8. **italian** (意大利语) - 难度 2, 1000小时
9. **portuguese** (葡萄牙语) - 难度 3, 1100小时

### 4. 页面功能实现

**语言详情页 (`/languages/[id]`) 当前功能:**

- ✅ 学习时间线（已改为小时数显示）
- ✅ 难度分析（支持数据驱动的文化差异）
- ✅ 学习指南四个板块：
  - 学习路径（定制化）
  - 学习方法
  - 学习工具
  - 学习进度（新增）

## 如何使用当前数据结构

### 1. 获取语言数据

```typescript
import { languageRepository } from '@/lib/data/repositories/language-repository-instance'

// 获取西班牙语详情（包含扩展功能）
const spanish = await languageRepository.getLanguageById('spanish')

// 检查是否有学习指南
if (spanish?.learningGuide) {
  console.log('学习路径:', spanish.learningGuide.learningPath)
  console.log('学习方法:', spanish.learningGuide.learningMethods)
  console.log('学习工具:', spanish.learningGuide.learningTools)
}

// 检查是否有难度分析
if (spanish?.difficultyAnalysis) {
  console.log('语法难度:', spanish.difficultyAnalysis.grammar)
  console.log('发音难度:', spanish.difficultyAnalysis.pronunciation)
  console.log('文字难度:', spanish.difficultyAnalysis.writing)
}
```

### 2. 为新语言添加扩展数据

要为其他语言添加类似西班牙语的扩展功能，编辑 `src/data/languages/languages.json`:

```json
{
  "id": "french",
  "difficultyAnalysis": {
    "grammar": 4,
    "pronunciation": 3,
    "writing": 3
  },
  "learningGuide": {
    "learningPath": [
      {
        "level": "beginner",
        "title": "法语发音基础",
        "description": "掌握法语的基本发音规则",
        "estimatedHours": 60,
        "skills": ["发音", "语调", "连读"]
      }
    ],
    "learningMethods": [
      {
        "title": "法语浸泡法",
        "description": "通过法语媒体内容学习",
        "techniques": ["看法语电影", "听法语歌曲", "读法语新闻"]
      }
    ],
    "learningTools": [
      {
        "category": "在线应用",
        "tools": ["Babbel", "Rosetta Stone", "TV5Monde"]
      }
    ]
  }
}
```

### 3. 时间线计算逻辑

页面会自动根据 `totalHours` 计算各阶段小时数：

- 入门水平：总时长的 25%
- 中级水平：总时长的 35%
- 高级水平：总时长的 40%

### 4. 难度分析显示逻辑

```typescript
// 现在只包含语言本身的三个维度
const difficultyAnalysis = language.difficultyAnalysis || {
  grammar: language.difficulty || 3,
  pronunciation: language.difficulty || 3,
  writing: language.difficulty || 3
};

// 语法难度
const grammarLabel = difficultyAnalysis.grammar <= 2 ? '简单' :
                    difficultyAnalysis.grammar <= 3 ? '中等' : '复杂';

// 发音难度
const pronunciationLabel = difficultyAnalysis.pronunciation <= 2 ? '容易' :
                          difficultyAnalysis.pronunciation <= 3 ? '中等' : '困难';

// 文字难度
const writingLabel = difficultyAnalysis.writing <= 2 ? '简单' :
                    difficultyAnalysis.writing <= 3 ? '中等' : '复杂';
```

## 下一步开发建议

1. **为更多语言添加扩展数据** - 复制西班牙语的模式
2. **实现用户进度跟踪** - 使用 `UserProfile` 和 `LearningProgress` 类型
3. **添加个性化推荐** - 使用 `SurveyResponses` 和 `LanguageRecommendation` 类型
4. **完善学习资源** - 为每个语言添加 `resources` 数组数据

## 类型定义位置

- 语言类型: `src/lib/types/language.ts`
- 用户类型: `src/lib/types/user.ts`
- 调查类型: `src/lib/types/survey.ts`
- 数据访问: `src/lib/data/repositories/language-repository.ts`

## 数据文件位置

- 主数据: `src/data/languages/languages.json`
- 公共数据: `public/data/languages/languages.json`

这个结构提供了强大的扩展性，支持从简单的语言列表到复杂的个性化学习推荐系统的渐进式发展。
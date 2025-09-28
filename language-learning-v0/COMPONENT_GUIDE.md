# 组件使用指南

本指南详细说明如何在 v0.dev 中使用和自定义每个组件。

## 📋 组件概览

| 组件名称 | 文件名 | 主要功能 | 复杂度 |
|---------|--------|----------|---------|
| 主页 | HomePage.tsx | 平台介绍、特色展示 | ⭐⭐⭐ |
| 问卷调研 | SurveyPage.tsx | 用户需求收集 | ⭐⭐⭐⭐ |
| AI推荐 | RecommendationPage.tsx | 个性化推荐展示 | ⭐⭐⭐⭐⭐ |
| 语言列表 | LanguagesPage.tsx | 语言浏览和筛选 | ⭐⭐⭐⭐ |
| 语言详情 | LanguageDetailPage.tsx | 详细语言信息 | ⭐⭐⭐⭐ |

## 🏠 HomePage.tsx

### 功能特色
- 响应式英雄区域
- 特色功能展示
- 热门语言预览
- 文化区域介绍
- 统计数据展示

### 自定义要点

#### 修改英雄区域文案
```typescript
// 在第25-37行修改
<h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
  <span className="bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent">
    发现语言  // 修改这里
  </span>
  <br />
  <span className="text-white">探索世界</span> // 修改这里
</h1>
```

#### 添加新的语言卡片
```typescript
// 在 popularLanguages 数组中添加
{
  id: "new-lang",
  name: "新语言",
  englishName: "New Language",
  flag: "🌍",
  speakers: "XXM+",
  difficulty: 3,
  popularity: 85,
  culture: "文化区域",
  description: "语言描述"
}
```

#### 修改统计数字
```typescript
// 在第194-211行修改
<div className="text-4xl md:text-5xl font-bold">50+</div> // 修改数字
<div className="text-white/80">支持语言</div> // 修改描述
```

## 📝 SurveyPage.tsx

### 功能特色
- 11题精简问卷
- 单选/多选支持
- 自动跳转逻辑
- 进度追踪
- 动画过渡

### 自定义要点

#### 添加新问题
```typescript
// 在 surveyQuestions 数组中添加
{
  id: "q12_new_question",
  title: "您的新问题？",
  description: "问题描述",
  options: [
    {
      id: "option1",
      label: "选项1",
      icon: Globe, // 选择合适的图标
      weight: 1
    }
  ]
}
```

#### 修改多选问题
```typescript
// 添加 multiple: true 属性
{
  id: "q7_cultural_interest",
  title: "你对哪些地区或文化感兴趣？（可多选）",
  multiple: true, // 启用多选
  options: [...]
}
```

#### 自定义完成页面
```typescript
// 在第662-724行修改完成页面内容
<h1 className="text-4xl font-bold gradient-text">
  问卷调研完成！ // 修改标题
</h1>
<p className="text-xl text-muted-foreground">
  感谢您完成问卷！ // 修改描述
</p>
```

## 🎯 RecommendationPage.tsx

### 功能特色
- AI智能推荐列表
- 5维度评分系统
- 详细推荐理由
- 多标签页展示
- 成功率预测

### 自定义要点

#### 修改推荐算法权重
```typescript
// 在维度评分部分修改权重
<Badge variant="secondary" className="text-xs">权重30%</Badge> // 修改权重
```

#### 添加新的推荐语言
```typescript
// 在 mockRecommendations 数组中添加
{
  language: {
    id: "new-language",
    name: "新语言",
    nativeName: "Native Name",
    flag: "🌍",
    description: "语言描述",
    // ... 其他属性
  },
  matchScore: 85,
  personalizedDifficulty: {
    overallDifficulty: 3.2,
    factors: {
      grammar: 3.5,
      pronunciation: 3.8,
      vocabulary: 2.8,
      writing: 3.0
    }
  },
  // ... 其他推荐数据
}
```

#### 自定义维度评分
```typescript
// 修改 dimensionScores 对象
dimensionScores: {
  culturalMatch: 85,     // 文化匹配度
  difficultyMatch: 90,   // 难度适配度
  purposeMatch: 95,      // 目标匹配度
  timeMatch: 88,         // 时间匹配度
  experienceMatch: 92    // 经验匹配度
}
```

## 📚 LanguagesPage.tsx

### 功能特色
- 语言搜索功能
- 多维度筛选
- 网格/列表视图
- 排序功能
- 响应式卡片

### 自定义要点

#### 添加新的筛选选项
```typescript
// 在筛选器部分添加新选项
<SelectItem value="new-category">新分类</SelectItem>
```

#### 修改语言卡片样式
```typescript
// 在 LanguageCard 组件中修改
<Card className="group hover:shadow-lg transition-all duration-300 h-full">
  // 修改卡片样式类名
</Card>
```

#### 自定义排序逻辑
```typescript
// 在 filteredLanguages useMemo 中修改排序
filtered.sort((a, b) => {
  switch (filters.sortBy) {
    case "custom": // 添加新的排序方式
      return a.customValue - b.customValue
    // ... 其他排序逻辑
  }
})
```

#### 添加新的语言数据
```typescript
// 在 mockLanguages 数组中添加
{
  id: "new-language",
  flag: "🌍",
  name: "新语言",
  nameEn: "New Language",
  nativeName: "Native Name",
  description: "语言描述",
  category: "popular", // popular, cultural, business
  difficulty: 3, // 1-5
  speakers: {
    native: 100000000,
    total: 120000000,
    countries: ["国家1", "国家2"]
  },
  regions: ["地区1", "地区2"],
  // ... 其他属性
}
```

## 🔍 LanguageDetailPage.tsx

### 功能特色
- 详细语言信息
- 多标签页展示
- 文化背景介绍
- 学习资源推荐
- 职业机会分析

### 自定义要点

#### 修改语言详情数据
```typescript
// 在 mockLanguage 对象中修改所有详细信息
const mockLanguage: Language = {
  id: "spanish",
  name: "西班牙语", // 修改语言名称
  description: "语言描述", // 修改描述
  // ... 修改其他属性
}
```

#### 添加新的学习资源
```typescript
// 在 learningResources 中添加
learningResources: {
  apps: [
    {
      name: "新应用",
      description: "应用描述",
      price: "价格"
    }
  ],
  books: [
    {
      title: "新书籍",
      author: "作者",
      level: "级别"
    }
  ],
  // ... 其他资源
}
```

#### 自定义标签页内容
```typescript
// 添加新的标签页
<TabsTrigger value="new-tab">新标签</TabsTrigger>

// 添加对应的内容
<TabsContent value="new-tab" className="space-y-8">
  <Card>
    <CardHeader>
      <CardTitle>新标签内容</CardTitle>
    </CardHeader>
    <CardContent>
      {/* 新标签的内容 */}
    </CardContent>
  </Card>
</TabsContent>
```

## 🎨 通用样式自定义

### 修改品牌色彩
每个组件文件底部都有 `styles` 常量，修改CSS变量：

```css
:root {
  --primary: oklch(0.649 0.237 267);     /* 主紫色 */
  --secondary: oklch(0.671 0.171 200);   /* 辅助青色 */
  --accent: oklch(0.732 0.249 143);      /* 强调绿色 */

  /* 修改为您的品牌色 */
  --primary: oklch(0.7 0.2 180);         /* 新的主色 */
  --secondary: oklch(0.6 0.15 240);      /* 新的辅助色 */
}
```

### 修改字体
```css
/* 在组件中查找并修改字体类名 */
className="font-bold"          /* 粗体 */
className="font-semibold"      /* 半粗体 */
className="font-medium"        /* 中等粗细 */
```

### 调整间距
```css
/* 修改边距和内边距 */
className="p-6"                /* 内边距 */
className="m-4"                /* 外边距 */
className="space-y-4"          /* 垂直间距 */
className="gap-8"              /* 网格间距 */
```

## 🔧 高级自定义

### 添加新的图标
```typescript
// 从 lucide-react 导入新图标
import { NewIcon } from "lucide-react"

// 在组件中使用
<NewIcon className="w-5 h-5 text-blue-600" />
```

### 创建自定义Hook
```typescript
// 创建自定义状态管理
const useCustomState = () => {
  const [state, setState] = useState(initialValue)

  const updateState = (newValue: any) => {
    setState(newValue)
  }

  return { state, updateState }
}
```

### 添加动画效果
```typescript
// 使用CSS类名添加过渡效果
className="transition-all duration-300 hover:scale-105"
```

## 📱 响应式自定义

### 移动端优化
```typescript
// 使用响应式类名
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
className="text-sm md:text-base lg:text-lg"
className="p-4 md:p-6 lg:p-8"
```

### 隐藏/显示元素
```typescript
// 在不同屏幕尺寸下隐藏或显示
className="hidden md:block"        /* 只在中等及以上屏幕显示 */
className="block md:hidden"        /* 只在小屏幕显示 */
```

## 🚀 部署到v0.dev

### 准备步骤
1. 选择要上传的组件文件
2. 复制完整的文件内容
3. 在v0.dev中创建新项目
4. 粘贴代码并预览

### 常见问题
- **图片加载问题**: 确保使用公开的图片URL
- **字体显示**: v0.dev会自动处理Web字体
- **动画效果**: 简化的CSS动画在v0.dev中工作良好

### 最佳实践
- 一次上传一个组件进行测试
- 逐步调整样式和布局
- 测试响应式效果
- 验证交互功能

---

这个指南涵盖了所有组件的主要自定义点。根据您的具体需求，可以灵活调整和扩展功能。
# V0.dev 组件集成指南

这个文件夹专门用于存放您从 v0.dev 设计的组件。框架会自动处理路由、导航和数据集成。

## 🚀 快速开始

### 1. 添加V0组件

将您从 v0.dev 复制的组件代码保存为 `.tsx` 文件：

```
v0-components/
├── MyAwesomeComponent.tsx     # 您的V0组件
├── ProgressTracker.tsx        # 学习进度组件
├── CommunityFeed.tsx          # 社区动态组件
└── README.md                  # 本文件
```

### 2. 组件格式要求

V0组件需要按以下格式导出：

```typescript
// v0-components/MyComponent.tsx
'use client'

import React from 'react'

interface MyComponentProps {
  // 定义组件props
  title?: string
  data?: any
}

export default function MyComponent({ title = "默认标题", data }: MyComponentProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      {/* 您的V0组件内容 */}
    </div>
  )
}

// 可选：导出组件元数据
export const componentMeta = {
  name: 'MyComponent',
  version: '1.0.0',
  description: '这是一个示例组件',
  author: '您的名字',
  tags: ['示例', 'v0'],
  dependencies: []
}
```

### 3. 自动路由生成

框架会自动为您的组件创建路由：

- `MyAwesomeComponent.tsx` → `/my-awesome-component`
- `ProgressTracker.tsx` → `/progress-tracker`
- `CommunityFeed.tsx` → `/community-feed`

### 4. 在导航中显示

编辑 `src/components/navigation.tsx`，添加新的导航项：

```typescript
const navigation: NavItem[] = [
  // ... 现有导航项
  {
    title: '我的组件',
    href: '/my-awesome-component',
    icon: 'Star',
    description: '从V0设计的组件'
  }
]
```

## 🔧 高级功能

### 数据集成

您的V0组件可以访问全局状态：

```typescript
import { useStore } from '@/store'
import { useV0ComponentData } from '@/lib/v0-integration'

export default function MyComponent() {
  // 访问全局状态
  const { user, languages } = useStore()

  // 组件专用状态
  const { data, updateData } = useV0ComponentData('MyComponent')

  return (
    <div>
      <h2>欢迎, {user?.name}</h2>
      <p>支持语言数量: {languages.length}</p>
    </div>
  )
}
```

### 页面跳转

在组件中实现页面导航：

```typescript
import { useRouter } from 'next/navigation'

export default function MyComponent() {
  const router = useRouter()

  const handleNavigation = () => {
    router.push('/languages')
  }

  return (
    <button onClick={handleNavigation}>
      查看语言列表
    </button>
  )
}
```

### 样式集成

使用框架提供的样式类：

```typescript
export default function MyComponent() {
  return (
    <div className="space-y-6">
      {/* 使用品牌渐变 */}
      <h1 className="gradient-text text-4xl font-bold">
        标题
      </h1>

      {/* 使用品牌色彩 */}
      <div className="gradient-bg p-6 rounded-xl text-white">
        内容区域
      </div>

      {/* 使用动画类 */}
      <div className="fade-in">
        淡入动画
      </div>
    </div>
  )
}
```

## 📱 响应式设计

确保您的组件在不同设备上正常显示：

```typescript
export default function MyComponent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* 响应式网格布局 */}
      <div className="bg-white p-4 rounded-lg shadow">
        卡片内容
      </div>
    </div>
  )
}
```

## 🎨 设计系统

框架提供了统一的设计token：

```css
/* 可用的CSS变量 */
:root {
  --primary: oklch(0.649 0.237 267);     /* 主紫色 */
  --secondary: oklch(0.671 0.171 200);   /* 辅助青色 */
  --accent: oklch(0.732 0.249 143);      /* 强调绿色 */
  --radius: 0.625rem;                    /* 圆角 */
}
```

## 📊 数据模型

可以使用的数据类型：

```typescript
// 从 @/types 导入
import { Language, User, SurveyData, LanguageRecommendation } from '@/types'

export default function MyComponent() {
  const { languages } = useStore()

  return (
    <div>
      {languages.map((language: Language) => (
        <div key={language.id}>
          {language.flag} {language.name}
        </div>
      ))}
    </div>
  )
}
```

## 🔄 组件通信

组件间数据共享：

```typescript
// 组件A - 发送数据
import { useV0Store } from '@/store'

export default function ComponentA() {
  const { setComponentData } = useV0Store()

  const sendData = () => {
    setComponentData('shared-data', { message: 'Hello from A' })
  }

  return <button onClick={sendData}>发送数据</button>
}

// 组件B - 接收数据
export default function ComponentB() {
  const { getComponentData } = useV0Store()
  const sharedData = getComponentData('shared-data')

  return <div>{sharedData?.message}</div>
}
```

## 🐛 调试

启用开发者工具：

```typescript
import { V0DevTools } from '@/lib/v0-integration'

export default function MyComponent() {
  return (
    <div>
      {/* 组件内容 */}

      {/* 开发模式下显示调试工具 */}
      {process.env.NODE_ENV === 'development' && <V0DevTools />}
    </div>
  )
}
```

## 💡 最佳实践

### 1. 组件命名
- 使用PascalCase命名
- 名称要描述性强
- 避免与现有组件冲突

### 2. 性能优化
```typescript
import { memo, useMemo } from 'react'

const MyComponent = memo(function MyComponent({ data }) {
  const processedData = useMemo(() => {
    return expensiveCalculation(data)
  }, [data])

  return <div>{processedData}</div>
})
```

### 3. 错误处理
```typescript
import { useEffect, useState } from 'react'

export default function MyComponent() {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // 可能出错的操作
    } catch (err) {
      setError('组件加载失败')
    }
  }, [])

  if (error) {
    return <div className="text-red-600">{error}</div>
  }

  return <div>正常内容</div>
}
```

## 📚 示例组件

查看 `src/app/page.tsx` 中的示例，了解如何集成V0组件到现有页面中。

---

## 🤝 需要帮助？

当您添加了V0组件后，告诉我：

1. **组件名称**：您的组件叫什么
2. **功能描述**：组件的主要功能
3. **页面位置**：希望在哪个导航菜单中出现
4. **数据需求**：需要什么数据支持

我会帮您：
- ✅ 自动创建路由
- ✅ 添加导航菜单
- ✅ 集成数据接口
- ✅ 优化样式和响应式
- ✅ 处理错误和加载状态
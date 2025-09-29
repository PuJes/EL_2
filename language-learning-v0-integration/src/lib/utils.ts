import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Tailwind 类名合并工具
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// V0组件适配工具
export function adaptV0ComponentConfig(props?: any) {
  return {
    className: cn("v0-component", props?.className),
    ...props
  }
}

// 数据格式化工具
export function formatNumber(num: number, locale: string = 'zh-CN'): string {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1)}B`
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}

export function formatDifficulty(difficulty: number): string {
  const levels = ['非常简单', '简单', '中等', '困难', '非常困难']
  return levels[difficulty - 1] || '未知'
}

export function formatDifficultyColor(difficulty: number): string {
  const colors = [
    'text-green-600',    // 1 - 非常简单
    'text-blue-600',     // 2 - 简单
    'text-yellow-600',   // 3 - 中等
    'text-orange-600',   // 4 - 困难
    'text-red-600'       // 5 - 非常困难
  ]
  return colors[difficulty - 1] || 'text-gray-600'
}

// 路由工具
export function createPageSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export function getPageTitle(pathname: string): string {
  const titles: Record<string, string> = {
    '/': '首页 - 语言世界',
    '/survey': '语言学习需求调研',
    '/recommendation': 'AI 智能推荐',
    '/languages': '语言列表',
    '/progress': '学习进度',
    '/community': '学习社区',
    '/profile': '个人中心'
  }

  return titles[pathname] || '语言世界'
}

// 日期格式化
export function formatDate(date: string | Date, locale: string = 'zh-CN'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function timeAgo(date: string | Date, locale: string = 'zh-CN'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diff = now.getTime() - d.getTime()

  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes} 分钟前`
  if (hours < 24) return `${hours} 小时前`
  if (days < 7) return `${days} 天前`

  return formatDate(d, locale)
}

// 本地存储工具
export function getLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue

  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error)
    return defaultValue
  }
}

export function setLocalStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn(`Error setting localStorage key "${key}":`, error)
  }
}

// 防抖工具
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

// 错误处理工具
export function handleError(error: Error, context?: string): void {
  console.error(`Error ${context ? `in ${context}` : ''}:`, error)

  // 这里可以添加错误报告服务
  // reportError(error, context)
}

// URL 工具
export function isValidUrl(string: string): boolean {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

export function createSearchParams(params: Record<string, string | number | boolean>): string {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value))
    }
  })

  return searchParams.toString()
}

// 语言学习相关工具
export function calculateMatchScore(
  answers: any[],
  language: any
): number {
  // 简化的匹配分数计算
  // 实际应用中这里会有复杂的算法
  return Math.floor(Math.random() * 40) + 60 // 60-100 的随机分数
}

export function getDifficultyStars(difficulty: number): string {
  return '★'.repeat(difficulty) + '☆'.repeat(5 - difficulty)
}

export function getLanguageFlag(languageCode: string): string {
  const flags: Record<string, string> = {
    'en': '🇺🇸',
    'es': '🇪🇸',
    'fr': '🇫🇷',
    'de': '🇩🇪',
    'it': '🇮🇹',
    'pt': '🇵🇹',
    'ru': '🇷🇺',
    'ja': '🇯🇵',
    'ko': '🇰🇷',
    'zh': '🇨🇳',
    'ar': '🇸🇦',
    'hi': '🇮🇳'
  }

  return flags[languageCode] || '🌍'
}
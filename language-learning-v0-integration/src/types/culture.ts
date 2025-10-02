import { LanguageRegion, BilingualText, BilingualArray } from './index'

export type CultureTheme =
  | 'food'
  | 'festival'
  | 'history'
  | 'art'
  | 'daily-life'
  | 'language'
  | 'travel'

export interface TocItem {
  id: string          // 用于锚点跳转
  level: 2 | 3        // H2 或 H3
  title: BilingualText // 标题文本
  children?: TocItem[] // H3 子标题
}

export interface CultureArticle {
  id: string
  title: BilingualText
  slug: string
  summary: BilingualText
  content: BilingualText // Markdown格式
  coverImage: string

  // 分类标签 - 对应语言地区分类
  region: LanguageRegion
  theme: CultureTheme
  relatedLanguages: string[] // 关联语言ID数组

  // 文章结构
  tableOfContents: TocItem[]

  // 元数据
  publishDate: string
  author?: BilingualText
  views?: number

  // SEO
  metaDescription: BilingualText
  keywords: BilingualArray
}

// 地区标签映射
export const REGION_LABELS: Record<LanguageRegion, { zh: string; en: string }> = {
  'east-asia': { zh: '东亚', en: 'East Asia' },
  'southeast-asia': { zh: '东南亚', en: 'Southeast Asia' },
  'south-asia': { zh: '南亚', en: 'South Asia' },
  'europe': { zh: '欧洲', en: 'Europe' },
  'middle-east': { zh: '中东', en: 'Middle East' },
  'africa': { zh: '非洲', en: 'Africa' },
  'americas': { zh: '美洲', en: 'Americas' },
  'oceania': { zh: '大洋洲', en: 'Oceania' }
}

// 主题标签映射
export const THEME_LABELS: Record<CultureTheme, { zh: string; en: string; icon: string }> = {
  food: { zh: '美食', en: 'Food', icon: '🍜' },
  festival: { zh: '节日', en: 'Festival', icon: '🎉' },
  history: { zh: '历史', en: 'History', icon: '📜' },
  art: { zh: '艺术', en: 'Art', icon: '🎭' },
  'daily-life': { zh: '日常生活', en: 'Daily Life', icon: '🏠' },
  language: { zh: '语言', en: 'Language', icon: '💬' },
  travel: { zh: '旅行', en: 'Travel', icon: '✈️' }
}

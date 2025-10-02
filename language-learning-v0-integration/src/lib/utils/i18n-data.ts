/**
 * 双语数据访问辅助函数
 * 用于根据当前locale返回对应语言的数据
 */

import type { Locale } from '@/types/i18n'
import type { Language, BilingualText, BilingualArray } from '@/types'
import type { CultureArticle, TocItem } from '@/types/culture'

// Localized types (all BilingualText → string, BilingualArray → string[])
export type LocalizedLanguage = Omit<Language,
  'description' | 'speakers' | 'regions' | 'family' | 'script' | 'tags' | 'studyTime' | 'usage' | 'resources' |
  'culturalInfo' | 'metadata' | 'learningGuide' | 'learningTimeEstimate' | 'learningResources' |
  'careerOpportunities' | 'travelAdvantages' | 'writingSystem'
> & {
  description: string
  speakers: {
    native: number
    total: number
    countries: string[]
  }
  regions: string[]
  family: string
  script: string
  tags?: string[]
  studyTime?: string
  usage?: string[]
  resources?: string[]
  culturalInfo?: {
    history: string
    traditions: string[]
    festivals: string[]
    cuisine: string[]
    arts: string[]
    modernCulture: string[]
  }
  metadata?: {
    iso639_1: string
    family: string
    branch?: string
    writingSystem: string[]
  }
  learningGuide?: {
    learningPath: Array<{
      title: string
      description: string
      level: string
      estimatedHours: number
      skills: string[]
    }>
    learningMethods?: Array<{
      title: string
      description: string
      techniques: string[]
    }>
    learningTools?: Array<{
      category: string
      tools: string[]
    }>
  }
  learningTimeEstimate?: {
    beginner: string
    intermediate: string
    advanced: string
    totalHours: number
    basic?: number
    intermediateHours?: number
    advancedHours?: number
  }
  learningResources?: {
    apps: Array<{
      name: string
      description: string
      price: string
    }>
    books: Array<{
      title: string
      author: string
      level: string
    }>
    websites: Array<{
      name: string
      url: string
      description: string
    }>
  }
  careerOpportunities?: {
    industries: string[]
    averageSalary: string
    jobGrowth: string
    remoteWork: boolean
  }
  travelAdvantages?: {
    countries: string[]
    businessHubs: string[]
    culturalSites: string[]
  }
  writingSystem?: string[]
}

export type LocalizedTocItem = {
  id: string
  level: 2 | 3
  title: string
  children?: LocalizedTocItem[]
}

export type LocalizedCultureArticle = Omit<CultureArticle,
  'title' | 'summary' | 'content' | 'tableOfContents' | 'author' | 'metaDescription' | 'keywords'
> & {
  title: string
  summary: string
  content: string
  tableOfContents: LocalizedTocItem[]
  author?: string
  metaDescription: string
  keywords: string[]
}

/**
 * 获取本地化的文本
 */
export function getLocalizedText(text: BilingualText, locale: Locale): string {
  return text[locale]
}

/**
 * 获取本地化的数组
 */
export function getLocalizedArray(array: BilingualArray, locale: Locale): string[] {
  return array[locale]
}

/**
 * 将双语Language对象转换为单语Language对象
 */
export function localizeLanguage(language: Language, locale: Locale): LocalizedLanguage {
  return {
    ...language,
    description: getLocalizedText(language.description, locale),
    speakers: {
      ...language.speakers,
      countries: getLocalizedArray(language.speakers.countries, locale)
    },
    regions: getLocalizedArray(language.regions, locale),
    family: getLocalizedText(language.family, locale),
    script: getLocalizedText(language.script, locale),
    tags: language.tags ? getLocalizedArray(language.tags, locale) : undefined,
    studyTime: language.studyTime ? getLocalizedText(language.studyTime, locale) : undefined,
    usage: language.usage ? getLocalizedArray(language.usage, locale) : undefined,
    resources: language.resources ? getLocalizedArray(language.resources, locale) : undefined,

    // 详细文化信息
    culturalInfo: language.culturalInfo ? {
      history: getLocalizedText(language.culturalInfo.history, locale),
      traditions: getLocalizedArray(language.culturalInfo.traditions, locale),
      festivals: getLocalizedArray(language.culturalInfo.festivals, locale),
      cuisine: getLocalizedArray(language.culturalInfo.cuisine, locale),
      arts: getLocalizedArray(language.culturalInfo.arts, locale),
      modernCulture: getLocalizedArray(language.culturalInfo.modernCulture, locale)
    } : undefined,

    // 语言元数据
    metadata: language.metadata ? {
      ...language.metadata,
      family: getLocalizedText(language.metadata.family, locale),
      branch: language.metadata.branch ? getLocalizedText(language.metadata.branch, locale) : undefined,
      writingSystem: getLocalizedArray(language.metadata.writingSystem, locale)
    } : undefined,

    // 学习指导
    learningGuide: language.learningGuide ? {
      learningPath: language.learningGuide.learningPath.map(item => ({
        ...item,
        title: getLocalizedText(item.title, locale),
        description: getLocalizedText(item.description, locale),
        level: getLocalizedText(item.level, locale),
        skills: getLocalizedArray(item.skills, locale)
      })),
      learningMethods: language.learningGuide.learningMethods?.map(method => ({
        ...method,
        title: getLocalizedText(method.title, locale),
        description: getLocalizedText(method.description, locale),
        techniques: getLocalizedArray(method.techniques, locale)
      })),
      learningTools: language.learningGuide.learningTools?.map(tool => ({
        ...tool,
        category: getLocalizedText(tool.category, locale),
        tools: getLocalizedArray(tool.tools, locale)
      }))
    } : undefined,

    // 学习时间估算
    learningTimeEstimate: language.learningTimeEstimate ? {
      ...language.learningTimeEstimate,
      beginner: getLocalizedText(language.learningTimeEstimate.beginner, locale),
      intermediate: getLocalizedText(language.learningTimeEstimate.intermediate, locale),
      advanced: getLocalizedText(language.learningTimeEstimate.advanced, locale)
    } : undefined,

    // 学习资源
    learningResources: language.learningResources ? {
      apps: language.learningResources.apps.map(app => ({
        ...app,
        description: getLocalizedText(app.description, locale),
        price: getLocalizedText(app.price, locale)
      })),
      books: language.learningResources.books.map(book => ({
        ...book,
        level: getLocalizedText(book.level, locale)
      })),
      websites: language.learningResources.websites.map(website => ({
        ...website,
        description: getLocalizedText(website.description, locale)
      }))
    } : undefined,

    // 职业机会
    careerOpportunities: language.careerOpportunities ? {
      ...language.careerOpportunities,
      industries: getLocalizedArray(language.careerOpportunities.industries, locale),
      averageSalary: getLocalizedText(language.careerOpportunities.averageSalary, locale),
      jobGrowth: getLocalizedText(language.careerOpportunities.jobGrowth, locale)
    } : undefined,

    // 旅游优势
    travelAdvantages: language.travelAdvantages ? {
      countries: getLocalizedArray(language.travelAdvantages.countries, locale),
      businessHubs: getLocalizedArray(language.travelAdvantages.businessHubs, locale),
      culturalSites: getLocalizedArray(language.travelAdvantages.culturalSites, locale)
    } : undefined,

    // 兼容字段
    writingSystem: language.writingSystem ? getLocalizedArray(language.writingSystem, locale) : undefined
  }
}

/**
 * 将双语TocItem数组转换为单语TocItem数组
 */
function localizeTocItems(items: TocItem[], locale: Locale): LocalizedTocItem[] {
  return items.map(item => ({
    ...item,
    title: getLocalizedText(item.title, locale),
    children: item.children ? localizeTocItems(item.children, locale) : undefined
  }))
}

/**
 * 将双语CultureArticle对象转换为单语CultureArticle对象
 */
export function localizeCultureArticle(article: CultureArticle, locale: Locale): LocalizedCultureArticle {
  return {
    ...article,
    title: getLocalizedText(article.title, locale),
    summary: getLocalizedText(article.summary, locale),
    content: getLocalizedText(article.content, locale),
    tableOfContents: localizeTocItems(article.tableOfContents, locale),
    author: article.author ? getLocalizedText(article.author, locale) : undefined,
    metaDescription: getLocalizedText(article.metaDescription, locale),
    keywords: getLocalizedArray(article.keywords, locale)
  }
}

/**
 * 获取本地化的语言数组
 */
export function getLocalizedLanguages(languages: Language[], locale: Locale): LocalizedLanguage[] {
  return languages.map(lang => localizeLanguage(lang, locale))
}

/**
 * 获取本地化的文化文章数组
 */
export function getLocalizedArticles(articles: CultureArticle[], locale: Locale): LocalizedCultureArticle[] {
  return articles.map(article => localizeCultureArticle(article, locale))
}

/**
 * 获取单个本地化的语言
 */
export function getLocalizedLanguageById(
  languages: Language[],
  id: string,
  locale: Locale
): LocalizedLanguage | undefined {
  const language = languages.find(lang => lang.id === id)
  return language ? localizeLanguage(language, locale) : undefined
}

/**
 * 获取单个本地化的文章
 */
export function getLocalizedArticleById(
  articles: CultureArticle[],
  id: string,
  locale: Locale
): LocalizedCultureArticle | undefined {
  const article = articles.find(art => art.id === id)
  return article ? localizeCultureArticle(article, locale) : undefined
}

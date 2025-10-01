export type Locale = 'zh' | 'en'

export interface TranslationKeys {
  // Common
  common: {
    home: string
    languageRecommendation: string
    cultureExploration: string
    languageList: string
    aboutUs: string
    startExploring: string
    startLearning: string
    backToHome: string
    learnMore: string
    viewDetails: string
    exploreMore: string
    viewAll: string
    readTime: string
    difficulty: string
    popularity: string
    rating: string
    users: string
    features: string
  }
  // Header
  header: {
    title: string
    switchLanguage: string
  }
  // Homepage
  homepage: {
    hero: {
      title1: string
      title2: string
      subtitle1: string
      subtitle2: string
      cta: string
      supportedLanguages: string
      activeL learners: string
    }
    whyUs: {
      title: string
      subtitle: string
      feature1Title: string
      feature1Desc: string
      feature2Title: string
      feature2Desc: string
      feature3Title: string
      feature3Desc: string
      feature4Title: string
      feature4Desc: string
    }
    popularLanguages: {
      title: string
      subtitle: string
      speakers: string
      difficultyLabel: string
      culture: string
      viewAll: string
    }
    culture: {
      badge: string
      title: string
      subtitle: string
      tourismTag: string
      musicTag: string
      historyTag: string
      mainLanguages: string
      culturalFeatures: string
      exploreCulture: string
    }
    learningMethods: {
      badge: string
      title: string
      subtitle: string
      beginner: string
      intermediate: string
      advanced: string
      allLanguages: string
      ctaTitle: string
      ctaSubtitle: string
      ctaButton: string
    }
    resources: {
      badge: string
      title: string
      subtitle: string
      comprehensive: string
      memoryTool: string
      languageExchange: string
      onlineCourse: string
      ranking: string
      trend: string
      ctaTitle: string
      ctaSubtitle: string
      ctaButton: string
    }
    stats: {
      title: string
      subtitle: string
      languages: string
      resources: string
      globalUsers: string
      satisfaction: string
    }
    cta: {
      title: string
      subtitle: string
      button1: string
      button2: string
    }
  }
  // Footer
  footer: {
    description: string
    learningResources: string
    languageRecommendation: string
    learningPlan: string
    difficultyAssessment: string
    learningTools: string
    cultureExploration: string
    worldCulture: string
    languageHistory: string
    culturalComparison: string
    festivalCustoms: string
    contactUs: string
    about: string
    contact: string
    partners: string
    privacyPolicy: string
    copyright: string
  }
  // Language names
  languages: {
    spanish: string
    french: string
    japanese: string
    german: string
    korean: string
    portuguese: string
    italian: string
    russian: string
    arabic: string
    chinese: string
  }
}
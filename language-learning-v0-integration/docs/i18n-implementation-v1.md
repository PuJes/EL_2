# i18n Implementation Documentation

**Date:** 2025-10-02
**Version:** v1
**Author:** Claude Code

## Overview

This document describes the internationalization (i18n) implementation for the Language Learning Platform. The system supports bilingual content (Chinese/English) with seamless language switching.

## Architecture

### Core Components

1. **Translation Store** (`src/store/language.ts`)
   - Zustand store managing locale state
   - Persisted to localStorage under `language-storage`
   - Default locale: `'zh'` (Chinese)

2. **Translation Hook** (`src/hooks/useTranslation.ts`)
   - Custom hook providing `t` (translations), `locale`, and `setLocale`
   - Type-safe access to translation keys

3. **Translation Files**
   - `src/locales/zh.ts` - Chinese translations
   - `src/locales/en.ts` - English translations
   - `src/types/i18n.ts` - TypeScript type definitions

### Language Switching Flow

```
User clicks language button
    ↓
setLocale(newLocale) called
    ↓
Zustand store updates locale state
    ↓
Auto-persists to localStorage
    ↓
All components using useTranslation() re-render
    ↓
getTranslations(locale) returns new translations
    ↓
UI displays new language text
```

## Implementation Status

### ✅ Fully Implemented

1. **Header** (`src/components/header.tsx`)
   - Navigation links
   - Language switcher dropdown
   - Buttons (Start Exploring, Start Learning)
   - All text properly internationalized

2. **Footer** (`src/components/footer.tsx`)
   - All sections: Learning Resources, Culture Exploration, Contact Us
   - Social links and copyright text
   - Fully bilingual

3. **Languages List Page** (`src/app/languages/page.tsx`)
   - Page titles and descriptions
   - Search and filter labels
   - All UI text internationalized
   - Already uses `useTranslation` hook

4. **Culture Page** (Partially - structure exists)
   - Translation keys defined in `culture` namespace
   - Ready for implementation

5. **Homepage** (`src/app/page.tsx`)
   - ✅ Hero section (title, subtitle, CTAs, stats)
   - ⏰ Features section (hardcoded, needs update)
   - ⏰ Popular languages section (needs update)
   - ⏰ Culture preview section (needs update)
   - ⏰ Learning methods section (needs update)
   - ⏰ Resources section (needs update)

### ⏰ Partially Implemented

6. **Survey Page** (`src/app/survey/page.tsx`)
   - ✅ Page metadata (dynamic title)
   - ⏰ Survey component (v0-components/LanguageSurveyPage.tsx) - not yet internationalized
   - Translation keys prepared in `survey` namespace

7. **Recommendation Page** (`src/app/recommendation/page.tsx`)
   - ✅ Page metadata (dynamic title)
   - ⏰ Recommendation component (v0-components/LanguageRecommendationPage.tsx) - not yet internationalized
   - Translation keys prepared in `recommendation` namespace

## Translation Keys Structure

### Common Keys
```typescript
common: {
  home, languageRecommendation, cultureExploration,
  languageList, aboutUs, startExploring, startLearning,
  backToHome, learnMore, viewDetails, exploreMore,
  viewAll, readTime, difficulty, popularity,
  rating, users, features
}
```

### Homepage Keys
```typescript
homepage: {
  hero: { title1, title2, subtitle1, subtitle2, cta, supportedLanguages, activeLearners },
  whyUs: { title, subtitle, feature1-4 },
  popularLanguages: { title, subtitle, speakers, difficultyLabel, culture, viewAll },
  culture: { badge, title, subtitle, tags, mainLanguages, culturalFeatures },
  learningMethods: { badge, title, subtitle, difficulty levels, CTA },
  resources: { badge, title, subtitle, categories, CTA },
  stats: { title, subtitle, metrics },
  cta: { title, subtitle, buttons }
}
```

### Survey Keys
```typescript
survey: {
  pageTitle, pageSubtitle, pageDescription,
  step, of, next, previous, submit,
  selectNativeLanguage, nativeLanguagePlaceholder,
  learningGoals, selectGoals,
  careerDevelopment, travelExploration, culturalInterest,
  academicResearch, dailyCommunication, businessCooperation,
  availableTime, dailyStudyTime,
  lessThan30Min, thirtyTo60Min, oneToTwoHours, moreThan2Hours,
  difficultyPreference, learningDifficultyPreference,
  easyStart, moderateChallenge, highChallenge, noPreference,
  culturalInterests, interestedCultures,
  eastAsian, european, latinAmerican, middleEastern, african, southAsian
}
```

### Recommendation Keys
```typescript
recommendation: {
  pageTitle, pageSubtitle, pageDescription,
  noRecommendations, noRecommendationsDesc,
  takeAssessment, retakeAssessment,
  matchScore, recommendationReason,
  difficultyFit, culturalMatch, goalAlignment,
  timeFeasibility, practicalValue,
  whyRecommended, learningAdvantages, potentialChallenges,
  nextSteps, topRecommendation, alternativeOptions,
  compareLanguages, startLearning, exploreLanguage
}
```

### Language List Keys
```typescript
languageList: {
  pageTitle, pageSubtitle, pageDescription,
  searchPlaceholder, filters, sorting,
  difficulty stars (1-5), showingLanguages,
  clearFilters, globalSpeakers, learningDifficulty,
  estimatedTime, unknown
}
```

### Culture Keys
```typescript
culture: {
  pageTitle, pageSubtitle, filterArticles, reset,
  region, theme, language,
  allRegions, allThemes, allLanguages,
  articlesFound, noArticlesFound,
  readArticle, relatedArticles, tableOfContents,
  wantToExplore, learningWillAllow, viewLanguageDetails
}
```

## Usage Guidelines

### In React Components

```tsx
'use client'  // Required!

import { useTranslation } from '@/hooks/useTranslation'

export function MyComponent() {
  const { t, locale, setLocale } = useTranslation()

  return (
    <div>
      <h1>{t.common.home}</h1>
      <p>{t.homepage.hero.subtitle1}</p>
      <button onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}>
        {t.header.switchLanguage}
      </button>
    </div>
  )
}
```

### Adding New Translation Keys

1. **Update type definition** (`src/types/i18n.ts`)
```typescript
export interface TranslationKeys {
  // ... existing keys
  myNewSection: {
    title: string
    description: string
  }
}
```

2. **Add Chinese translations** (`src/locales/zh.ts`)
```typescript
export const zh: TranslationKeys = {
  // ... existing translations
  myNewSection: {
    title: '我的新标题',
    description: '我的新描述',
  },
}
```

3. **Add English translations** (`src/locales/en.ts`)
```typescript
export const en: TranslationKeys = {
  // ... existing translations
  myNewSection: {
    title: 'My New Title',
    description: 'My New Description',
  },
}
```

4. **Use in component**
```tsx
const { t } = useTranslation()
return <h1>{t.myNewSection.title}</h1>
```

## Testing i18n

1. Start dev server: `npm run dev`
2. Navigate to any page
3. Click language switcher in header (Languages icon with dropdown)
4. Select 中文 or English
5. Verify all translated text updates
6. Refresh page - language preference should persist
7. Check localStorage key `language-storage` contains selected locale

## Next Steps

### Priority 1 - Complete Existing Pages

1. **Homepage** - Update remaining sections:
   - Features section
   - Popular languages cards
   - Culture preview
   - Learning methods
   - Resources tools

2. **Survey Page** (v0-components/LanguageSurveyPage.tsx)
   - Add `useTranslation` hook
   - Replace all hardcoded text with translation keys
   - Test multi-step form in both languages

3. **Recommendation Page** (v0-components/LanguageRecommendationPage.tsx)
   - Add `useTranslation` hook
   - Replace all hardcoded text
   - Ensure recommendation cards display correctly in both languages

### Priority 2 - New Features

1. **Language Auto-Detection**
   - Detect browser language on first visit
   - Set default locale based on navigator.language

2. **URL-based Locale**
   - Support `/en/` and `/zh/` URL prefixes
   - Sync URL with locale state

3. **SEO Optimization**
   - Add hreflang tags for both languages
   - Localized metadata for each page

## Technical Notes

- **Client Components**: All components using `useTranslation` must have `'use client'` directive
- **Type Safety**: TypeScript ensures all translation keys exist in both languages
- **Performance**: Translations are imported statically, no network requests
- **Persistence**: Language preference survives page refreshes via localStorage
- **Reactivity**: Language changes trigger immediate re-render of all subscribed components

## Known Limitations

1. **Homepage** - Large amount of hardcoded text remains (low priority sections)
2. **Survey & Recommendation** - V0 components not yet internationalized
3. **Dynamic Content** - Language-specific content like articles would need database-level i18n
4. **Number Formatting** - Currently no locale-specific number/date formatting
5. **RTL Support** - Not implemented (only needed for Arabic if added later)

## References

- Zustand Documentation: https://github.com/pmndrs/zustand
- Next.js i18n: https://nextjs.org/docs/app/building-your-application/routing/internationalization
- React i18n Best Practices: https://react.i18next.com/

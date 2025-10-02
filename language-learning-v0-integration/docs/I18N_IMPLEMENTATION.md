# Internationalization (i18n) Implementation Guide

## Overview

This project now supports bilingual functionality (Chinese and English) with a language switcher in the header. The implementation uses Zustand for state management and provides a clean hook-based API for translations.

## Architecture

### File Structure

```
src/
├── types/
│   └── i18n.ts                 # TypeScript types for i18n
├── store/
│   └── language.ts             # Zustand store for language state
├── locales/
│   ├── index.ts                # Main export file
│   ├── zh.ts                   # Chinese translations
│   └── en.ts                   # English translations
├── hooks/
│   └── useTranslation.ts       # React hook for translations
└── components/
    ├── header.tsx              # Updated with language switcher
    └── footer.tsx              # Updated with translations
```

### Key Components

1. **Language Store** (`src/store/language.ts`)
   - Uses Zustand with persistence
   - Stores user's language preference in localStorage
   - Default language: Chinese (`zh`)

2. **Translation Hook** (`src/hooks/useTranslation.ts`)
   - Provides `t` object with all translations
   - Provides `locale` (current language)
   - Provides `setLocale` (function to change language)

3. **Language Switcher**
   - Located in the header
   - Dropdown menu with Chinese/English options
   - Highlights current language selection
   - Closes when clicking outside

## Usage

### Basic Usage in Components

```tsx
'use client'

import { useTranslation } from '@/hooks/useTranslation'

export function MyComponent() {
  const { t, locale, setLocale } = useTranslation()

  return (
    <div>
      <h1>{t.homepage.hero.title1}</h1>
      <p>{t.homepage.hero.subtitle1}</p>
      <button onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}>
        {t.header.switchLanguage}
      </button>
    </div>
  )
}
```

### Adding New Translations

1. **Update Type Definitions** (`src/types/i18n.ts`):
```tsx
export interface TranslationKeys {
  // Add new section
  myNewSection: {
    title: string
    description: string
  }
}
```

2. **Add Chinese Translations** (`src/locales/zh.ts`):
```tsx
export const zh: TranslationKeys = {
  // ... existing translations
  myNewSection: {
    title: '我的标题',
    description: '我的描述',
  },
}
```

3. **Add English Translations** (`src/locales/en.ts`):
```tsx
export const en: TranslationKeys = {
  // ... existing translations
  myNewSection: {
    title: 'My Title',
    description: 'My Description',
  },
}
```

4. **Use in Components**:
```tsx
const { t } = useTranslation()
return <h1>{t.myNewSection.title}</h1>
```

## Current Translation Coverage

### ✅ Completed
- [x] Header navigation
- [x] Footer links and content
- [x] Common UI elements
- [x] Language switcher component

### ⏳ Pending
- [ ] Homepage content (hero, features, cards)
- [ ] Survey page
- [ ] Culture exploration page
- [ ] Language detail pages
- [ ] Language recommendation page

## Updating Homepage (page.tsx)

The homepage file is large and contains many text strings. Here's the recommended approach:

### 1. Import the hook at the top:
```tsx
'use client'

import { useTranslation } from '@/hooks/useTranslation'
// ... other imports
```

### 2. Use the hook in HomePage component:
```tsx
export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Update text strings */}
    </div>
  )
}
```

### 3. Replace hardcoded strings systematically:

#### Hero Section:
```tsx
// Before:
<span>发现语言</span>
<span>探索世界</span>

// After:
<span>{t.homepage.hero.title1}</span>
<span>{t.homepage.hero.title2}</span>
```

#### Features Section:
```tsx
// Before:
<h2>为什么选择我们</h2>

// After:
<h2>{t.homepage.whyUs.title}</h2>
```

#### Popular Languages Section:
```tsx
// Before:
<h2>热门语言推荐</h2>
<span>使用者</span>

// After:
<h2>{t.homepage.popularLanguages.title}</h2>
<span>{t.common.users}</span>
```

### 4. Update language data objects:

For the `popularLanguages` array, create bilingual data:

```tsx
const popularLanguages = [
  {
    id: "spanish",
    name: t.languages.spanish,
    englishName: "Spanish",
    // ... rest of the data
  },
  // ... other languages
]
```

Or create a helper function:

```tsx
function getLanguageName(id: string, locale: string) {
  const names = {
    spanish: { zh: '西班牙语', en: 'Spanish' },
    french: { zh: '法语', en: 'French' },
    // ...
  }
  return names[id][locale] || names[id].zh
}
```

## Best Practices

1. **Always use the hook**: Don't access the store directly unless necessary.

2. **Type safety**: TypeScript will help catch missing translations.

3. **Consistent naming**: Follow the existing structure:
   - `common.*` for shared UI elements
   - `[page].*` for page-specific content
   - `[section].*` for section-specific content

4. **Default language**: Always provide Chinese as the default.

5. **Testing**: Test both languages to ensure:
   - All strings are translated
   - UI layout doesn't break with longer/shorter text
   - Language persists across page navigation

## Common Patterns

### Conditional Text:
```tsx
{customTitle ? t.common.startLearning : t.common.startExploring}
```

### Dynamic Content:
```tsx
const features = [
  {
    title: t.homepage.whyUs.feature1Title,
    description: t.homepage.whyUs.feature1Desc,
  },
  {
    title: t.homepage.whyUs.feature2Title,
    description: t.homepage.whyUs.feature2Desc,
  },
]
```

### Lists and Maps:
```tsx
{methods.map((method, index) => (
  <Card key={index}>
    <h3>{method.title}</h3>
    <Button>{t.common.learnMore}</Button>
  </Card>
))}
```

## Troubleshooting

### Issue: Language doesn't persist
- Check if localStorage is enabled
- Verify Zustand persist middleware is configured

### Issue: Translations not updating
- Make sure component is using `'use client'` directive
- Verify the hook is called inside the component

### Issue: TypeScript errors
- Run `npm run build` to check for type errors
- Ensure all translation keys are defined in both `zh.ts` and `en.ts`

## Next Steps

1. **Complete Homepage Translation**
   - Update all text in hero section
   - Update feature cards
   - Update language cards
   - Update CTA sections

2. **Other Pages**
   - Update survey page
   - Update culture page
   - Update languages list page
   - Update language detail pages

3. **Dynamic Content**
   - Language descriptions
   - Culture articles
   - Learning methods

4. **Enhancements**
   - Add more languages (Spanish, French, etc.)
   - Add language detection based on browser settings
   - Add URL-based language routing (`/en/*`, `/zh/*`)

## Example: Full Component Migration

```tsx
// Before:
export function FeatureCard() {
  return (
    <Card>
      <h3>因材施教</h3>
      <p>根据您的母语和学习目标，定制学习难度和时间规划</p>
    </Card>
  )
}

// After:
'use client'

import { useTranslation } from '@/hooks/useTranslation'

export function FeatureCard() {
  const { t } = useTranslation()

  return (
    <Card>
      <h3>{t.homepage.whyUs.feature1Title}</h3>
      <p>{t.homepage.whyUs.feature1Desc}</p>
    </Card>
  )
}
```

## Contact

For questions or issues, please refer to the project documentation or contact the development team.

---

**Last Updated**: September 2024
**Version**: 1.0.0
**Status**: In Progress - Header & Footer Complete, Homepage Pending
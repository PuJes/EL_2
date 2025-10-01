# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Language Learning Platform** built with Next.js 15 that helps users discover and learn new languages through personalized recommendations. The platform features a sophisticated recommendation engine, bilingual support (Chinese/English), and integration capabilities for v0.dev components.

## Development Commands

### Essential Commands
```bash
npm run dev          # Start development server on localhost:3000
npm run build        # Build production bundle
npm start            # Start production server
npm run lint         # Run ESLint
```

### Docker Deployment
```bash
docker build -t language-learning .
docker run -p 3000:3000 language-learning
```

The app is configured for Railway deployment with automatic Dockerfile detection.

## Architecture & Key Patterns

### State Management (Zustand)

The app uses **three separate Zustand stores**:

1. **`useAppStore`** (`src/store/index.ts`) - Main application state
   - User data, survey responses, recommendations, learning progress
   - Persisted to localStorage (user, surveyData, recommendations, learningProgress)
   - Filters and search state

2. **`useLanguageStore`** (`src/store/language.ts`) - i18n state
   - Current locale (zh/en)
   - Persisted to localStorage

3. **`useV0Store`** (`src/store/index.ts`) - V0 component integration
   - Component registration and data passing
   - Not persisted

### Internationalization (i18n)

**Complete bilingual infrastructure is in place:**
- Custom hook: `useTranslation()` from `@/hooks/useTranslation`
- Translation files: `src/locales/zh.ts` and `src/locales/en.ts`
- Language switcher in header (dropdown with flags)
- Type-safe with `TranslationSchema` interface

**To add translations to a component:**
```tsx
'use client'  // Required!

import { useTranslation } from '@/hooks/useTranslation'

export function MyComponent() {
  const { t, locale, setLocale } = useTranslation()
  return <h1>{t.common.home}</h1>
}
```

**Current translation status:**
- ✅ Header, Footer - 100% complete
- ⏰ Homepage, Survey, Languages pages - pending

### Recommendation Engine

**Core algorithm** (`src/lib/recommendation/recommendation-algorithm.ts`):

The `LanguageRecommendationEngine` class calculates personalized language recommendations based on:

1. **Five weighted dimensions** (total = 100%):
   - Cultural interest match (30%)
   - Difficulty fit (25%)
   - Goal alignment (20%)
   - Time feasibility (15%)
   - Practical value (10%)

2. **Personalized difficulty calculation**:
   - Compares target language with user's native language baseline
   - Factors: grammar, pronunciation, writing system complexity
   - Language family similarity adjustments
   - Learning experience bonuses

3. **Data-driven scores**:
   - Uses `ALGORITHM_CONFIG` constants for cultural mappings, language family similarity matrices, motivation scores
   - Native language baselines for difficulty comparison

**Usage:**
```tsx
import { getLanguageRecommendations } from '@/lib/recommendation/recommendation-algorithm'

const recommendations = await getLanguageRecommendations(languages, surveyData)
```

### V0.dev Component Integration

**Workflow for integrating v0.dev components:**

1. **Copy component** to `v0-components/` directory
2. Component must export default and use `'use client'`
3. **Create page route** in `src/app/[route]/page.tsx`:
   ```tsx
   import MyComponent from '@/../../v0-components/MyComponent'
   export default function Page() { return <MyComponent /> }
   ```
4. **Update navigation** in appropriate nav component

**V0 Store API:**
```tsx
import { useV0Store } from '@/store'

// Register component
const registerComponent = useV0Store(state => state.registerComponent)
registerComponent('MyComponent', MyComponent)

// Share data between V0 components
const setComponentData = useV0Store(state => state.setComponentData)
setComponentData('MyComponent', { foo: 'bar' })
```

### Type System

**Key type definitions:**

- `src/types/index.ts` - Core domain types (User, Language, SurveyData, LanguageRecommendation)
- `src/types/i18n.ts` - i18n types (Locale, TranslationSchema)
- `src/lib/types/language.ts` - Language recommendation types
- `src/lib/types/survey.ts` - Survey and recommendation types

All types are **strongly typed** and exported for reuse.

## Project Structure

```
src/
├── app/                           # Next.js 15 App Router
│   ├── layout.tsx                # Root layout (includes Header)
│   ├── page.tsx                  # Homepage (main landing)
│   ├── survey/page.tsx           # Learning survey
│   ├── recommendation/page.tsx   # Recommendation results
│   ├── languages/
│   │   ├── page.tsx             # Language list
│   │   └── [id]/page.tsx        # Language detail pages
│   └── culture/page.tsx         # Culture exploration
├── components/
│   ├── header.tsx               # ✅ i18n complete
│   ├── footer.tsx               # ✅ i18n complete
│   └── ui/                      # Shadcn/ui components
├── lib/
│   ├── recommendation/
│   │   └── recommendation-algorithm.ts  # Core recommendation logic
│   ├── data/languages.ts        # Language database
│   └── utils.ts                 # Utility functions (cn, etc.)
├── store/
│   ├── index.ts                 # App & V0 stores
│   └── language.ts              # i18n store
├── locales/
│   ├── index.ts                 # Translation exports
│   ├── zh.ts                    # 🇨🇳 Chinese translations
│   └── en.ts                    # 🇺🇸 English translations
├── hooks/
│   └── useTranslation.ts        # i18n hook
└── types/
    ├── index.ts                 # Core types
    └── i18n.ts                  # i18n types
```

## Important Technical Details

### Next.js 15 Specifics
- Uses **App Router** (not Pages Router)
- React 19.1.0
- Tailwind CSS 4.0 (new v4 config in `@tailwind` directives)
- All page components are in `src/app/` with `page.tsx` naming

### Client vs Server Components
- **Survey, Recommendation, Homepage**: Client components (`'use client'`)
- **Header, Footer**: Client components (for i18n)
- **Default**: Server components unless `'use client'` directive is present

### Styling
- Tailwind CSS 4.0 with custom color system (oklch)
- Shadcn/ui component library (Radix UI primitives)
- Utility function: `cn()` from `@/lib/utils` for className merging

### Data Flow
1. User completes survey → `setSurveyData()`
2. Survey converts responses → `SurveyResponses` format
3. Recommendation engine calculates → `LanguageRecommendation[]`
4. Results stored in `useAppStore` → persisted to localStorage
5. User navigates to `/recommendation` to view results

## Common Development Tasks

### Adding a new page
1. Create `src/app/[route]/page.tsx`
2. Add to navigation (Header or appropriate nav component)
3. Add translations to `src/locales/zh.ts` and `src/locales/en.ts`

### Modifying recommendation algorithm
- Edit `src/lib/recommendation/recommendation-algorithm.ts`
- Adjust `ALGORITHM_CONFIG` constants for weight changes
- Update scoring methods for dimension calculation changes

### Adding a new language
1. Add to language database in `src/lib/data/languages.ts`
2. Include all required fields (difficulty, speakers, regions, etc.)
3. Add cultural mapping to `ALGORITHM_CONFIG.culturalMapping`
4. Add motivation scores to `ALGORITHM_CONFIG.languageMotivationScores`

### Testing i18n
1. Start dev server: `npm run dev`
2. Click language switcher in header
3. Verify all translated text updates
4. Check localStorage persistence (refresh page)

## Configuration Files

- `next.config.ts` - Next.js configuration (minimal, uses defaults)
- `tailwind.config.js` - Tailwind CSS 4.0 configuration
- `tsconfig.json` - TypeScript configuration with path aliases (`@/*`)
- `Dockerfile` - Multi-stage Docker build for production
- `eslint.config.mjs` - ESLint configuration

## Dependencies

**Core:**
- Next.js 15.5.4
- React 19.1.0
- TypeScript 5
- Tailwind CSS 4
- Zustand 4.5.0 (state management)

**UI:**
- Radix UI (headless components)
- Lucide React (icons)
- class-variance-authority, clsx, tailwind-merge (styling utilities)

## Important Notes

- **All text content should be internationalized** - never hardcode Chinese or English strings
- **Use type-safe access** - leverage TypeScript for translations (`t.common.home` not `t['common']['home']`)
- **Recommendation algorithm is data-driven** - weights and scores are in `ALGORITHM_CONFIG`
- **V0 components are isolated** - they live in `v0-components/` directory (outside `src/`)
- **Store persistence is selective** - only critical user data is persisted, not UI state

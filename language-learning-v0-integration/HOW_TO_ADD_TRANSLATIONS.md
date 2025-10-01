# Quick Guide: How to Add Translations

## For Any New Page or Component

### Step 1: Make it a Client Component
```tsx
'use client'  // Add at the very top
```

### Step 2: Import the Hook
```tsx
import { useTranslation } from '@/hooks/useTranslation'
```

### Step 3: Use in Component
```tsx
export function MyComponent() {
  const { t } = useTranslation()

  return <h1>{t.common.home}</h1>
}
```

## Adding New Translation Keys

### 1. Add to Type Definition
File: `src/types/i18n.ts`

```tsx
export interface TranslationKeys {
  // ... existing keys

  mySection: {
    title: string
    subtitle: string
    buttonText: string
  }
}
```

### 2. Add Chinese Translation
File: `src/locales/zh.ts`

```tsx
export const zh: TranslationKeys = {
  // ... existing translations

  mySection: {
    title: '我的标题',
    subtitle: '我的副标题',
    buttonText: '点击这里',
  },
}
```

### 3. Add English Translation
File: `src/locales/en.ts`

```tsx
export const en: TranslationKeys = {
  // ... existing translations

  mySection: {
    title: 'My Title',
    subtitle: 'My Subtitle',
    buttonText: 'Click Here',
  },
}
```

### 4. Use in Component
```tsx
'use client'
import { useTranslation } from '@/hooks/useTranslation'

export function MyComponent() {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t.mySection.title}</h1>
      <p>{t.mySection.subtitle}</p>
      <button>{t.mySection.buttonText}</button>
    </div>
  )
}
```

## Common Patterns

### Pattern 1: Simple Text Replacement
```tsx
// Before
<h1>关于我们</h1>

// After
<h1>{t.common.aboutUs}</h1>
```

### Pattern 2: Conditional Text
```tsx
// Use ternary
<button>
  {isLoading ? t.common.loading : t.common.submit}
</button>
```

### Pattern 3: Array of Objects
```tsx
const features = [
  {
    title: t.homepage.feature1Title,
    description: t.homepage.feature1Desc,
  },
  {
    title: t.homepage.feature2Title,
    description: t.homepage.feature2Desc,
  },
]

return features.map((feature, i) => (
  <Card key={i}>
    <h3>{feature.title}</h3>
    <p>{feature.description}</p>
  </Card>
))
```

### Pattern 4: Dynamic Content with Locale
```tsx
const { t, locale } = useTranslation()

const languageName = locale === 'zh' ? '西班牙语' : 'Spanish'
// Or better: store both in data
const language = {
  zh: '西班牙语',
  en: 'Spanish'
}
return <h1>{language[locale]}</h1>
```

## Where to Find Existing Translations

All translations are in `src/locales/`:
- `zh.ts` - Chinese translations
- `en.ts` - English translations

### Available Categories:
```
t.common.*              // Buttons, navigation, common UI
t.header.*              // Header specific
t.homepage.*            // Homepage sections
t.footer.*              // Footer content
t.languages.*           // Language names
```

## Testing Your Translations

1. **Run dev server**:
```bash
npm run dev
```

2. **Open browser**: http://localhost:3000

3. **Click language switcher** in header (globe icon + EN/中文)

4. **Verify**:
   - Text changes in both languages
   - No missing translations (check console for errors)
   - Layout doesn't break with longer/shorter text

## Common Issues & Solutions

### Issue: "Cannot read property 'title' of undefined"
**Solution**: Make sure you added the translation key to BOTH `zh.ts` and `en.ts`

### Issue: Text doesn't update when switching languages
**Solution**:
1. Check if component has `'use client'` directive
2. Make sure you're using `t` from the hook, not hardcoded strings

### Issue: Build fails with type errors
**Solution**: Run `npm run build` and fix TypeScript errors. Usually means:
- Missing keys in translation files
- Typo in translation key name
- Type definition doesn't match translation structure

### Issue: Language doesn't persist after refresh
**Solution**:
- Check if localStorage is working
- The store uses Zustand persist middleware which should handle this automatically

## Example: Complete Component

```tsx
'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { Button } from '@/components/ui/button'

export function WelcomeSection() {
  const { t, locale, setLocale } = useTranslation()

  const toggleLanguage = () => {
    setLocale(locale === 'zh' ? 'en' : 'zh')
  }

  return (
    <section>
      <h1>{t.homepage.hero.title1}</h1>
      <p>{t.homepage.hero.subtitle1}</p>
      <Button onClick={toggleLanguage}>
        {t.header.switchLanguage}
      </Button>
      <div>
        Current language: {locale === 'zh' ? '中文' : 'English'}
      </div>
    </section>
  )
}
```

## Pro Tips

1. **Organize by section**: Group related translations together
2. **Use consistent naming**: Follow existing patterns
3. **Keep strings short**: Avoid very long translation values
4. **Test both languages**: Always check both before committing
5. **Reuse when possible**: Use `common.*` for repeated text

## Need Help?

- **Full Guide**: See [I18N_IMPLEMENTATION.md](./I18N_IMPLEMENTATION.md)
- **Summary**: See [I18N_SUMMARY.md](./I18N_SUMMARY.md)
- **Examples**: Check [src/components/header.tsx](src/components/header.tsx) and [src/components/footer.tsx](src/components/footer.tsx)

---

**Remember**: Every page that uses translations must:
1. Have `'use client'` at the top
2. Import and use the `useTranslation` hook
3. Have translations defined in both `zh.ts` and `en.ts`
# 🌍 Language Learning Platform - Internationalization (i18n)

## Quick Links

📋 **Start Here**: [HOW_TO_ADD_TRANSLATIONS.md](./HOW_TO_ADD_TRANSLATIONS.md)
📊 **Status**: [TRANSLATION_STATUS.md](./TRANSLATION_STATUS.md)
📖 **Full Guide**: [I18N_IMPLEMENTATION.md](./I18N_IMPLEMENTATION.md)
📝 **Summary**: [I18N_SUMMARY.md](./I18N_SUMMARY.md)

## 🎯 What's Been Done

✅ **Complete Bilingual Infrastructure**
- Language switcher in header (Chinese ⇄ English)
- Persistent language selection (survives page refresh)
- Type-safe translation system
- Easy-to-use React hook API
- Header and Footer fully translated

## 🚀 Try It Now

1. **Start dev server**:
   ```bash
   npm run dev
   ```

2. **Open browser**: http://localhost:3000

3. **Click the language switcher** in the header (🌐 icon with "中文" or "EN")

4. **Watch the magic**: Header and footer text switches between Chinese and English!

## 📸 What You'll See

### Header Language Switcher
```
┌──────────────────────────────────────────┐
│  🌐 语言世界    首页  语言推荐  ...  [中文 ▼] │
└──────────────────────────────────────────┘
         ↓ Click dropdown
┌──────────────────────────────────────────┐
│  🌐 语言世界    首页  语言推荐  ...  [中文 ▼] │
│                             ┌─────────┐ │
│                             │ 中文 ✓  │ │
│                             │ English │ │
│                             └─────────┘ │
└──────────────────────────────────────────┘
```

After switching to English:
```
┌──────────────────────────────────────────┐
│  🌐 Language World  Home  Recommendation... [EN ▼] │
└──────────────────────────────────────────┘
```

## 🎓 How to Add Translations

### Super Quick (3 steps)

1. **Make component client-side**:
   ```tsx
   'use client'
   ```

2. **Import and use the hook**:
   ```tsx
   import { useTranslation } from '@/hooks/useTranslation'

   export function MyComponent() {
     const { t } = useTranslation()
     return <h1>{t.common.home}</h1>
   }
   ```

3. **Add translations** (if needed) to:
   - `src/locales/zh.ts` (Chinese)
   - `src/locales/en.ts` (English)

### Full Example

```tsx
'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { Button } from '@/components/ui/button'

export function WelcomeSection() {
  const { t, locale, setLocale } = useTranslation()

  return (
    <section>
      {/* Translated heading */}
      <h1>{t.homepage.hero.title1}</h1>

      {/* Translated paragraph */}
      <p>{t.homepage.hero.subtitle1}</p>

      {/* Translated button */}
      <Button onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}>
        {t.header.switchLanguage}
      </Button>

      {/* Current language display */}
      <div>
        Language: {locale === 'zh' ? '中文' : 'English'}
      </div>
    </section>
  )
}
```

## 📂 Project Structure

```
src/
├── types/i18n.ts              # TypeScript definitions
├── store/language.ts          # Language state management
├── hooks/useTranslation.ts    # Translation hook
├── locales/
│   ├── index.ts              # Main export
│   ├── zh.ts                 # 🇨🇳 Chinese translations
│   └── en.ts                 # 🇺🇸 English translations
└── components/
    ├── header.tsx            # ✅ Translated
    └── footer.tsx            # ✅ Translated
```

## 📊 Translation Progress

```
Overall: ████░░░░░░ 40%

✅ Infrastructure    100%
✅ Header           100%
✅ Footer           100%
⏰ Homepage          0%
⏰ Survey            0%
⏰ Culture           0%
⏰ Languages         0%
⏰ Recommendation    0%
```

## 🎯 Next Steps

### For New Developers

1. Read: [HOW_TO_ADD_TRANSLATIONS.md](./HOW_TO_ADD_TRANSLATIONS.md)
2. Look at: `src/components/header.tsx` (as example)
3. Start with: Homepage hero section

### For Quick Wins

**Homepage Hero Section** (15 minutes)
- File: `src/app/page.tsx`
- Lines: ~865-905
- Impact: High visibility, easy to translate

**Features Section** (20 minutes)
- File: `src/app/page.tsx`
- Lines: ~918-967
- Impact: Important messaging

## 💡 Available Translations

### Common UI (`t.common.*`)
```tsx
t.common.home                    // 首页 / Home
t.common.languageRecommendation  // 语言推荐 / Language Recommendation
t.common.cultureExploration      // 文化探索 / Culture Exploration
t.common.languageList            // 语言列表 / Language List
t.common.aboutUs                 // 关于我们 / About Us
t.common.startExploring          // 开始探索 / Start Exploring
t.common.startLearning           // 开始学习 / Start Learning
t.common.learnMore               // 了解详情 / Learn More
// ... and more
```

### Header (`t.header.*`)
```tsx
t.header.title                   // 语言世界 / Language World
t.header.switchLanguage          // 切换语言 / Switch Language
```

### Homepage (`t.homepage.*`)
```tsx
t.homepage.hero.title1           // 发现语言 / Discover Languages
t.homepage.hero.title2           // 探索世界 / Explore the World
t.homepage.whyUs.title           // 为什么选择我们 / Why Choose Us
t.homepage.popularLanguages.title // 热门语言推荐 / Popular Languages
// ... and more
```

### Footer (`t.footer.*`)
```tsx
t.footer.description             // Company description
t.footer.learningResources       // 学习资源 / Learning Resources
t.footer.cultureExploration      // 文化探索 / Culture Exploration
t.footer.contactUs               // 联系我们 / Contact Us
// ... and more
```

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production (tests translations)
npm run build

# Start production server
npm start
```

## ✅ Testing Checklist

- [ ] Language switcher visible in header
- [ ] Clicking switcher shows dropdown
- [ ] Selecting language updates text
- [ ] Language persists after refresh
- [ ] Language persists across pages
- [ ] No console errors
- [ ] Build completes successfully
- [ ] Mobile responsive

## 🐛 Troubleshooting

### "Cannot find module '@/hooks/useTranslation'"
- Check if file exists at `src/hooks/useTranslation.ts`
- Restart dev server

### "Cannot read property 'title' of undefined"
- Translation key missing in `zh.ts` or `en.ts`
- Check spelling of translation key

### Language doesn't switch
- Component missing `'use client'` directive
- Not using `t` from hook
- Using hardcoded string instead of translation key

### Build fails with type errors
- Translation key mismatch between `zh.ts` and `en.ts`
- Type definition doesn't match translations
- Run `npm run build` to see errors

## 📚 Documentation

| Document | Description | When to Read |
|----------|-------------|--------------|
| [HOW_TO_ADD_TRANSLATIONS.md](./HOW_TO_ADD_TRANSLATIONS.md) | Quick reference guide | When adding new translations |
| [TRANSLATION_STATUS.md](./TRANSLATION_STATUS.md) | Progress tracker | To see what's done/pending |
| [I18N_IMPLEMENTATION.md](./I18N_IMPLEMENTATION.md) | Complete technical guide | For deep understanding |
| [I18N_SUMMARY.md](./I18N_SUMMARY.md) | Executive summary | For overview |

## 🎨 Design Decisions

### Why Zustand?
- Lightweight (~1KB)
- Simple API
- Built-in persistence
- No React Context boilerplate

### Why Hook Pattern?
- Familiar React API
- Easy to use: `const { t } = useTranslation()`
- Type-safe with TypeScript
- Testable

### Why Separate Files?
- Better organization
- Easier collaboration (translators can work independently)
- Type-safe (TypeScript validates completeness)
- Scalable (easy to add more languages)

## 🚀 Future Enhancements

### Planned
- [ ] URL-based routing (`/en/*`, `/zh/*`)
- [ ] Auto-detect browser language
- [ ] More languages (Spanish, French, Japanese)
- [ ] Language-specific metadata/SEO

### Ideas
- [ ] Translation management UI
- [ ] Crowdsourced translations
- [ ] Translation memory
- [ ] A/B testing different translations

## 👥 Contributing

### Adding Translations
1. Fork repository
2. Create branch: `git checkout -b feature/translate-survey-page`
3. Add translations following the guide
4. Test both languages
5. Submit PR

### Adding New Language
1. Add locale type: `src/types/i18n.ts`
2. Create translation file: `src/locales/es.ts` (for Spanish)
3. Update store: `src/store/language.ts`
4. Update switcher: `src/components/header.tsx`
5. Test thoroughly

## 📞 Support

- **Quick Question**: Check [HOW_TO_ADD_TRANSLATIONS.md](./HOW_TO_ADD_TRANSLATIONS.md)
- **Implementation Details**: Check [I18N_IMPLEMENTATION.md](./I18N_IMPLEMENTATION.md)
- **Status/Progress**: Check [TRANSLATION_STATUS.md](./TRANSLATION_STATUS.md)
- **Issues**: Create GitHub issue

## 🎉 Success Story

```
Before i18n:
┌────────────────────┐
│  🌐 语言世界        │  Only Chinese
│  首页  语言推荐     │  → Limited audience
└────────────────────┘

After i18n:
┌────────────────────┐
│  🌐 Language World │  Chinese + English
│  Home  Languages   │  → Global reach
│  [EN ▼]           │  → User choice
└────────────────────┘
```

---

**Version**: 1.0.0
**Last Updated**: September 2024
**Status**: Infrastructure Complete ✅ | Content Translation In Progress 🚧
**Build Status**: ✅ Passing

**Made with ❤️ by the Language World Team**
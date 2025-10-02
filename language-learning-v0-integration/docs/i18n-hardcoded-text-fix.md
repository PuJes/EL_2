# I18n Hardcoded Text Fix

**Date:** 2025-10-02
**Version:** v1
**Author:** Claude Code

## Overview
Fixed all hardcoded Chinese and English text in the culture exploration feature and related components. All user-facing text is now properly internationalized using the translation system.

## Changes Summary

### Files Modified

#### 1. Translation Files
Added missing translation keys to support the culture feature:

**src/locales/en.ts & src/locales/zh.ts:**
- `culture.articleNotFound` - Article not found message
- `culture.home` - Home breadcrumb
- `culture.cultureNavigation` - Culture navigation breadcrumb
- `culture.understandCulture` - Default benefit text template
- `culture.readOriginalWorks` - Default benefit text template
- `culture.communicateWithNatives` - Default benefit text template

#### 2. Page Components

**src/app/culture/page.tsx:**
- Replaced all hardcoded text with `t.culture.*` translations
- Fixed: page title, subtitle, filter labels, button text, article count, no results message
- Changed: Added `t` from `useTranslation()` hook

**src/app/culture/[slug]/page.tsx:**
- Replaced hardcoded "Article not found", "Home", "Culture" breadcrumb texts
- Added `t` from `useTranslation()` hook

#### 3. Component Files

**src/components/language-learning-cta.tsx:**
- Replaced hardcoded benefit descriptions with translation keys
- Fixed title and button text to use translations
- All dynamic text now uses template replacement (`{language}`, `{culture}`)

**src/components/related-articles.tsx:**
- Replaced "相关文章推荐" / "Related Articles" with `t.culture.relatedArticles`

**src/components/header.tsx:**
- Changed language display from "EN" to "English" for consistency
- (Language names in switcher remain as native names: "中文", "English")

**src/components/culture-article-card.tsx:**
- No changes needed - only uses locale for date formatting and dynamic language name selection

## Remaining `locale === 'zh'` Usage

The following uses of `locale === 'zh'` are **intentional and correct**:

1. **Date formatting** - Selecting locale for `toLocaleDateString('zh-CN' | 'en-US')`
2. **Language name selection** - Choosing between `language.name` (Chinese) vs `language.nativeName` (native)
3. **CSS class selection** - Dynamic styling based on current locale
4. **Language switcher display** - Showing current language name

These are not hardcoded text but dynamic behavior based on locale.

## Testing

All changes have been compiled successfully:
- ✅ No TypeScript errors
- ✅ No build errors
- ✅ Development server running on http://localhost:3007

## Next Steps

To verify the fixes:
1. Navigate to http://localhost:3007/culture
2. Switch between Chinese and English using the language switcher
3. Check that all text changes appropriately:
   - Page titles and descriptions
   - Filter labels and buttons
   - Article cards and details
   - Related articles section
   - CTA components

## Translation Coverage

All user-facing text in the culture feature is now internationalized:
- ✅ Culture exploration main page
- ✅ Culture article detail pages
- ✅ Article cards
- ✅ Related articles sections
- ✅ Language learning CTA components
- ✅ Navigation breadcrumbs
- ✅ Filter controls
- ✅ Error messages

## Files Changed
1. src/locales/en.ts
2. src/locales/zh.ts
3. src/app/culture/page.tsx
4. src/app/culture/[slug]/page.tsx
5. src/components/language-learning-cta.tsx
6. src/components/related-articles.tsx
7. src/components/header.tsx

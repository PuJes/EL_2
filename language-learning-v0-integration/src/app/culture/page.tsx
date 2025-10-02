'use client'

import { useState, useMemo } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { CultureArticleCard } from '@/components/culture-article-card'
import { cultureArticles } from '@/lib/data/culture-articles'
import { REGION_LABELS, THEME_LABELS } from '@/types/culture'
import { getLocalizedArticles, type LocalizedCultureArticle } from '@/lib/utils/i18n-data'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

export default function CulturePage() {
  const { t, locale } = useTranslation()
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  const [selectedTheme, setSelectedTheme] = useState<string>('all')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all')

  // 获取本地化的文章
  const localizedArticles = useMemo(() => getLocalizedArticles(cultureArticles, locale), [locale])

  // 获取所有唯一的语言
  const allLanguages = useMemo(() => {
    const languageSet = new Set<string>()
    localizedArticles.forEach(article => {
      article.relatedLanguages.forEach(lang => languageSet.add(lang))
    })
    return Array.from(languageSet)
  }, [localizedArticles])

  // 筛选文章
  const filteredArticles = useMemo(() => {
    return localizedArticles.filter(article => {
      if (selectedRegion !== 'all' && article.region !== selectedRegion) {
        return false
      }
      if (selectedTheme !== 'all' && article.theme !== selectedTheme) {
        return false
      }
      if (
        selectedLanguage !== 'all' &&
        !article.relatedLanguages.includes(selectedLanguage)
      ) {
        return false
      }
      return true
    })
  }, [localizedArticles, selectedRegion, selectedTheme, selectedLanguage])

  // 重置筛选
  const resetFilters = () => {
    setSelectedRegion('all')
    setSelectedTheme('all')
    setSelectedLanguage('all')
  }

  return (
    <div className="min-h-screen bg-background" key={locale}>
      {/* Hero区 */}
      <div className="bg-gradient-to-b from-primary/10 to-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              {t.culture.pageTitle}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t.culture.pageSubtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* 筛选栏 */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {t.culture.filterArticles}
            </h2>
            <Button variant="ghost" onClick={resetFilters}>
              {t.culture.reset}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 地区筛选 */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                {t.culture.region}
              </label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {t.culture.allRegions}
                  </SelectItem>
                  {Object.entries(REGION_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label[locale]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 主题筛选 */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                {t.culture.theme}
              </label>
              <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {t.culture.allThemes}
                  </SelectItem>
                  {Object.entries(THEME_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label.icon} {label[locale]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 语言筛选 */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                {t.culture.language}
              </label>
              <Select
                value={selectedLanguage}
                onValueChange={setSelectedLanguage}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {t.culture.allLanguages}
                  </SelectItem>
                  {allLanguages.map(lang => (
                    <SelectItem key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* 文章数量显示 */}
        <div className="mb-6 text-sm text-muted-foreground">
          {t.culture.articlesFound.replace('{count}', filteredArticles.length.toString())}
        </div>

        {/* 文章网格 */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <CultureArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              {t.culture.noArticlesFound}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

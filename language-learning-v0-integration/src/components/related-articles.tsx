'use client'

import { useMemo } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { CultureArticleCard } from '@/components/culture-article-card'
import { getRelatedArticles } from '@/lib/data/culture-articles'
import { getLocalizedArticles } from '@/lib/utils/i18n-data'

interface RelatedArticlesProps {
  currentArticleId: string
  limit?: number
}

export function RelatedArticles({
  currentArticleId,
  limit = 3,
}: RelatedArticlesProps) {
  const { t, locale } = useTranslation()
  const relatedArticles = useMemo(() => {
    const articles = getRelatedArticles(currentArticleId, limit)
    return getLocalizedArticles(articles, locale)
  }, [currentArticleId, limit, locale])

  if (relatedArticles.length === 0) {
    return null
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">
        {t.culture.relatedArticles}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedArticles.map(article => (
          <CultureArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}

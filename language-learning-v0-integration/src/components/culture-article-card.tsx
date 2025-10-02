'use client'

import { REGION_LABELS, THEME_LABELS } from '@/types/culture'
import { type LocalizedCultureArticle } from '@/lib/utils/i18n-data'
import { useTranslation } from '@/hooks/useTranslation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import { languages } from '@/lib/data/languages'

interface CultureArticleCardProps {
  article: LocalizedCultureArticle
}

export function CultureArticleCard({ article }: CultureArticleCardProps) {
  const { locale } = useTranslation()

  // 获取关联语言信息
  const relatedLanguageNames = article.relatedLanguages
    .map(langId => {
      const lang = languages.find(l => l.id === langId)
      return lang ? (locale === 'zh' ? lang.name : lang.nativeName) : null
    })
    .filter(Boolean)

  return (
    <Link href={`/culture/${article.slug}`} className="h-full">
      <Card className="group h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        {/* 封面图 */}
        <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <CardHeader className="flex-shrink-0">
          <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors min-h-[3.5rem]">
            {article.title}
          </h3>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col space-y-4">
          {/* 摘要 */}
          <p className="text-sm text-muted-foreground line-clamp-3 min-h-[4.5rem]">
            {article.summary}
          </p>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2 min-h-[2rem]">
            {/* 地区标签 */}
            <Badge variant="secondary" className="gap-1">
              <span>🌍</span>
              <span>{REGION_LABELS[article.region][locale]}</span>
            </Badge>

            {/* 主题标签 */}
            <Badge variant="secondary" className="gap-1">
              <span>{THEME_LABELS[article.theme].icon}</span>
              <span>{THEME_LABELS[article.theme][locale]}</span>
            </Badge>

            {/* 语言标签 */}
            {relatedLanguageNames.map((langName, index) => (
              <Badge key={index} variant="outline" className="gap-1">
                <span>🗣️</span>
                <span>{langName}</span>
              </Badge>
            ))}
          </div>

          {/* 发布日期 */}
          <div className="text-xs text-muted-foreground mt-auto pt-2">
            {new Date(article.publishDate).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

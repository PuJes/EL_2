'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { languages } from '@/lib/data/languages'

interface LanguageLearningCTAProps {
  languageId: string
  benefits?: string[]
  culturalContext?: string
}

export function LanguageLearningCTA({
  languageId,
  benefits,
  culturalContext,
}: LanguageLearningCTAProps) {
  const { t, locale } = useTranslation()

  // 获取语言信息
  const language = languages.find(lang => lang.id === languageId)
  if (!language) return null

  const languageName = locale === 'zh' ? language.name : language.nativeName

  // 默认学习价值
  const defaultBenefits = [
    t.culture.understandCulture.replace('{language}', languageName),
    t.culture.readOriginalWorks.replace('{language}', languageName),
    t.culture.communicateWithNatives,
  ]

  const displayBenefits = benefits || defaultBenefits

  return (
    <Card className="my-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* 标题 */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">💡</span>
            <h3 className="text-xl font-semibold">
              {t.culture.wantToExplore.replace('{culture}', culturalContext || (locale === 'zh' ? '这种文化' : 'this culture'))}
            </h3>
          </div>

          {/* 学习价值 */}
          <div className="space-y-2">
            <p className="text-muted-foreground">
              {t.culture.learningWillAllow.replace('{language}', languageName)}
            </p>
            <ul className="space-y-2">
              {displayBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA按钮 */}
          <Link href={`/languages/${languageId}`}>
            <Button className="w-full sm:w-auto" size="lg">
              {t.culture.viewLanguageDetails.replace('{language}', languageName)}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

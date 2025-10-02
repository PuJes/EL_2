'use client'

import LanguageRecommendationPage from '../../../v0-components/LanguageRecommendationPage'
import { useTranslation } from '@/hooks/useTranslation'
import { useEffect } from 'react'

export default function RecommendationRoute() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = `${t.recommendation.pageTitle} | ${t.header.title}`
  }, [t])

  return <LanguageRecommendationPage />
}
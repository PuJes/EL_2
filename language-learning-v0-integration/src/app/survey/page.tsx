'use client'

import LanguageSurveyPage from '../../../v0-components/LanguageSurveyPage'
import { useTranslation } from '@/hooks/useTranslation'
import { useEffect } from 'react'

export default function SurveyRoute() {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = `${t.survey.pageTitle} | ${t.header.title}`
  }, [t])

  return <LanguageSurveyPage />
}
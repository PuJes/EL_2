import { Metadata } from 'next'
import LanguageSurveyPage from '../../../v0-components/LanguageSurveyPage'

export const metadata: Metadata = {
  title: '语言学习测评 | 语言世界',
  description: '通过科学的问卷测评，为您推荐最适合的语言学习方案',
}

export default function SurveyRoute() {
  return <LanguageSurveyPage />
}
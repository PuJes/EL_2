import { Metadata } from 'next'
import LanguageRecommendationPage from '../../../v0-components/LanguageRecommendationPage'

export const metadata: Metadata = {
  title: '语言推荐结果 | 语言世界',
  description: '基于您的测评结果，为您推荐最适合的语言学习方案',
}

export default function RecommendationRoute() {
  return <LanguageRecommendationPage />
}
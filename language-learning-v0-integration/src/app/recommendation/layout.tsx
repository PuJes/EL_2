import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '语言推荐结果 | 语言世界',
  description: '基于您的测评结果，为您推荐最适合的语言学习方案',
}

export default function RecommendationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // V0组件使用全屏布局，不需要侧边栏
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
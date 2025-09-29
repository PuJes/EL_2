import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '语言学习测评 | 语言世界',
  description: '通过科学的问卷测评，为您推荐最适合的语言学习方案',
}

export default function SurveyLayout({
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
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '语言世界 - 个性化语言学习平台',
  description: '通过AI智能推荐系统，根据您的个人背景、文化兴趣和学习目标，为您推荐最适合的语言和学习路径。',
  keywords: ['语言学习', '人工智能', '个性化推荐', '多语言', '文化交流'],
  authors: [{ name: '语言世界团队' }],
  viewport: {
    width: 'device-width',
    initialValue: 1.0,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={cn(inter.className, "antialiased bg-gray-50")}>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="flex-1 pt-16">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </div>

        {/* 这里可以添加全局组件，如Toast通知等 */}
      </body>
    </html>
  )
}
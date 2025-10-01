import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Language World - Personalized Language Learning Platform | 语言世界',
  description: 'Through AI-powered recommendation system, we provide personalized language recommendations based on your background, cultural interests, and learning goals. | 通过AI智能推荐系统，根据您的个人背景、文化兴趣和学习目标，为您推荐最适合的语言和学习路径。',
  keywords: ['language learning', '语言学习', 'AI', '人工智能', 'personalized recommendation', '个性化推荐', 'multilingual', '多语言', 'cultural exchange', '文化交流'],
  authors: [{ name: 'Language World Team | 语言世界团队' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
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
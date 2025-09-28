'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Globe, Users, TrendingUp, Brain } from 'lucide-react'
import { useNavigationStore } from '@/store'
import { cn } from '@/lib/utils'

export default function HomePage() {
  const { setPageTitle } = useNavigationStore()

  useEffect(() => {
    setPageTitle('首页')
  }, [setPageTitle])

  return (
    <div className="space-y-12">
      {/* 英雄区域 */}
      <section className="text-center py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="gradient-text">发现语言</span>
            <br />
            <span className="text-gray-900">探索世界</span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            通过AI智能推荐系统，根据您的个人背景、文化兴趣和学习目标，
            为您推荐最适合的语言和学习路径。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/survey"
              className={cn(
                "inline-flex items-center px-8 py-4 text-lg font-semibold",
                "bg-purple-600 text-white rounded-lg hover:bg-purple-700",
                "transition-colors duration-200 shadow-lg hover:shadow-xl"
              )}
            >
              开始问卷调研
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>

            <Link
              href="/languages"
              className={cn(
                "inline-flex items-center px-8 py-4 text-lg font-semibold",
                "border-2 border-purple-600 text-purple-600 rounded-lg",
                "hover:bg-purple-50 transition-colors duration-200"
              )}
            >
              浏览语言列表
              <Globe className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 特色功能 */}
      <section className="py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            为什么选择语言世界？
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            我们结合先进的AI技术和丰富的语言学习资源，为您提供个性化的学习体验
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 数据统计 */}
      <section className="py-16 gradient-bg rounded-2xl text-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            加入全球语言学习者社区
          </h2>
          <p className="text-lg opacity-90">
            数百万用户已经通过我们的平台找到了适合自己的语言
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold">
                {stat.value}
              </div>
              <div className="text-lg opacity-90">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* V0组件展示区域 */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            V0.dev 组件集成区域
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            在这里放置您从 v0.dev 设计的组件，我会帮您进行集成和数据对接
          </p>
        </div>

        <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Brain className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">
              等待您的 V0 组件
            </h3>
            <p className="text-gray-500">
              将您在 v0.dev 中设计的组件代码放入 <code className="bg-gray-100 px-2 py-1 rounded text-sm">/v0-components</code> 文件夹，
              我会自动处理路由和数据集成。
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

// 特色功能数据
const features = [
  {
    icon: Brain,
    title: 'AI智能推荐',
    description: '基于深度学习算法，分析您的个人特征和学习偏好，推荐最适合的语言。'
  },
  {
    icon: Globe,
    title: '多语言支持',
    description: '支持50+种世界主流语言，涵盖不同文化背景和使用场景。'
  },
  {
    icon: Users,
    title: '社区互动',
    description: '与全球语言学习者交流经验，找到志同道合的学习伙伴。'
  },
  {
    icon: TrendingUp,
    title: '进度跟踪',
    description: '实时跟踪学习进度，智能调整学习计划，确保高效学习。'
  }
]

// 统计数据
const stats = [
  { value: '50+', label: '支持语言' },
  { value: '100万+', label: '注册用户' },
  { value: '98%', label: '推荐准确率' }
]
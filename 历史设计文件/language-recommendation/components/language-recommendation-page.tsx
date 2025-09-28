"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Globe, Clock, Star, Lightbulb, Users, BookOpen, Settings, ChevronDown } from "lucide-react"

interface ProgressBarProps {
  percentage: number
  delay?: number
}

function ProgressBar({ percentage, delay = 0 }: ProgressBarProps) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percentage)
    }, delay)
    return () => clearTimeout(timer)
  }, [percentage, delay])

  return (
    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-purple-500 to-teal-500 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  )
}

interface LanguageCardProps {
  flag: string
  name: string
  match: number
  duration: string
  difficulty: number
  description: string
  isPrimary?: boolean
}

function LanguageCard({ flag, name, match, duration, difficulty, description, isPrimary = false }: LanguageCardProps) {
  const stars = "★".repeat(difficulty) + "☆".repeat(5 - difficulty)

  return (
    <Card
      className={`bg-white/95 backdrop-blur-sm border-0 p-6 transition-all duration-300 hover:transform hover:-translate-y-2 hover:scale-105 shadow-xl ${
        isPrimary ? "ring-2 ring-purple-400" : ""
      }`}
    >
      <div className="text-center mb-4">
        <span className="text-2xl mb-2 block">{flag}</span>
        <h4 className="text-xl font-bold">{name}</h4>
        <span className="text-purple-600 font-semibold">{match}%匹配</span>
      </div>
      <div className="space-y-2 text-sm mb-4">
        <p>
          {duration} • <span className="text-yellow-500">{stars}</span>
        </p>
        <p className="text-gray-600">{description}</p>
      </div>
      <Button variant="outline" className="w-full border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent">
        了解详情
      </Button>
    </Card>
  )
}

export function LanguageRecommendationPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const analysisData = [
    { label: "语言难度适中", percentage: 80, delay: 0 },
    { label: "工作需求匹配", percentage: 100, delay: 200 },
    { label: "文化兴趣契合", percentage: 95, delay: 400 },
    { label: "时间投入合理", percentage: 85, delay: 600 },
  ]

  const otherLanguages = [
    { flag: "🇰🇷", name: "韩语", match: 85, duration: "8个月", difficulty: 3, description: "文化兴趣匹配" },
    { flag: "🇪🇸", name: "西班牙语", match: 78, duration: "10个月", difficulty: 2, description: "广泛实用性" },
    { flag: "🇫🇷", name: "法语", match: 72, duration: "12个月", difficulty: 4, description: "商务优势" },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">语言世界</h1>
              <p className="text-xs text-gray-500">Language World</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-900 hover:text-purple-600 transition-colors">
              首页
            </a>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-900 hover:text-purple-600 transition-colors">
                <span>语言探索</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-900 hover:text-purple-600 transition-colors">
                <span>文化世界</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-900 hover:text-purple-600 transition-colors">
                <span>学习指导</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-900 hover:text-purple-600 transition-colors">
                <span>资源工具</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="bg-gradient-to-br from-purple-500 via-purple-600 to-teal-500 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Section */}
          <section
            className={`text-center mb-12 transition-all duration-800 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl font-bold mb-4 text-balance text-white">🎯为您推荐的语言</h2>
            <p className="text-xl text-purple-100">基于您的学习动机、时间投入和文化兴趣</p>
          </section>

          {/* Primary Recommendation */}
          <section
            className={`mb-12 transition-all duration-800 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Card className="bg-white/95 backdrop-blur-sm border-0 p-8 max-w-4xl mx-auto relative shadow-2xl ring-2 ring-purple-400">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <span className="text-4xl">🇯🇵</span>
                  <h3 className="text-3xl font-bold">日语 (Japanese)</h3>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="bg-gradient-to-r from-purple-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ⭐ 最适合您
                  </span>
                  <span className="text-purple-600 text-2xl font-bold">95%匹配</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-purple-500" />
                  <span>预计6个月达到日常交流</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>
                    难度：<span className="text-yellow-500">★★★☆☆</span>
                  </span>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 mb-6">
                <p className="text-center">
                  <Lightbulb className="w-4 h-4 inline mr-2" />
                  基于您的工作需求和对东亚文化的兴趣
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm">
                <div className="text-center">
                  <Users className="w-5 h-5 mx-auto mb-2 text-purple-500" />
                  <p>1.25亿人使用</p>
                </div>
                <div className="text-center">
                  <Globe className="w-5 h-5 mx-auto mb-2 text-purple-500" />
                  <p>日本主要语言</p>
                </div>
                <div className="text-center">
                  <BookOpen className="w-5 h-5 mx-auto mb-2 text-purple-500" />
                  <p>深厚文化底蕴</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 text-white px-8 py-3">
                  了解详情
                </Button>
              </div>
            </Card>
          </section>

          {/* Analysis Section */}
          <section
            className={`mb-12 transition-all duration-800 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Card className="bg-white/95 backdrop-blur-sm border-0 p-8 max-w-4xl mx-auto shadow-2xl">
              <h3 className="text-2xl font-bold text-center mb-8">推荐理由</h3>

              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4">📈 匹配度分析：</h4>
                <div className="space-y-4">
                  {analysisData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span>{item.label}</span>
                      <div className="flex items-center space-x-3">
                        <ProgressBar percentage={item.percentage} delay={item.delay} />
                        <span className="text-sm font-medium">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h5 className="font-semibold mb-3">💼 职业优势：</h5>
                  <ul className="text-sm space-y-2">
                    <li>• 中日贸易频繁，日语人才需求大</li>
                    <li>• 科技、制造业领域合作机会多</li>
                    <li>• 相比欧美语言，竞争对手相对较少</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-3">🎌 文化契合：</h5>
                  <ul className="text-sm space-y-2">
                    <li>• 您对东亚文化的兴趣与日本文化高度吻合</li>
                    <li>• 汉字基础让您在学习中有天然优势</li>
                    <li>• 丰富的动漫、文学、传统文化资源</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-3">⏱️ 学习可行性：</h5>
                  <ul className="text-sm space-y-2">
                    <li>• 每周3-5小时的投入完全足够</li>
                    <li>• 您的学习经验有助于更快掌握</li>
                    <li>• 语言结构相对规律，适合系统学习</li>
                  </ul>
                </div>
              </div>
            </Card>
          </section>

          {/* Other Recommendations */}
          <section
            className={`mb-12 transition-all duration-800 delay-450 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-white">其他推荐语言</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {otherLanguages.map((lang, index) => (
                <LanguageCard key={index} {...lang} />
              ))}
            </div>
          </section>

          {/* User Profile */}
          <section
            className={`mb-12 transition-all duration-800 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Card className="bg-white/95 backdrop-blur-sm border-0 p-6 max-w-4xl mx-auto shadow-2xl">
              <h3 className="text-lg font-semibold mb-4 text-center">📋 您的学习档案</h3>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">母语：中文</span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">动机：工作需要</span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">时间：每周3-5小时</span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">经验：有一定经验</span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">兴趣：东亚、欧洲文化</span>
              </div>
              <div className="text-center mt-4">
                <Button
                  variant="outline"
                  className="px-6 py-2 border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent"
                >
                  重新填写问卷
                </Button>
              </div>
            </Card>
          </section>

          {/* More Options */}
          <section
            className={`text-center mb-12 transition-all duration-800 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                className="px-6 py-3 border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                查看所有语言
              </Button>
              <Button
                variant="outline"
                className="px-6 py-3 border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                了解推荐方法
              </Button>
              <Button
                variant="outline"
                className="px-6 py-3 border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                探索文化世界
              </Button>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">语言世界</h3>
                  <p className="text-xs text-gray-400">Language World</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                个性化的语言学习指导，深入的文化探索体验，让每一次学习都成为通向更广阔世界的桥梁
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">语言探索</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    语言推荐
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    学习路径
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    难度评估
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    进度跟踪
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">文化世界</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    文化介绍
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    传统节日
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    生活方式
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    历史背景
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">学习资源</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    在线课程
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    学习工具
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    练习材料
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    社区交流
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 语言世界. 保留所有权利.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                隐私政策
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                服务条款
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                联系我们
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

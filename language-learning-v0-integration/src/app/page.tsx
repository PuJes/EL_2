'use client'

import * as React from "react"
import { ArrowRight, Globe, Brain, GraduationCap, Wrench, Star, Users, BookOpen, Clock, Target, MapPin, Lightbulb, ChevronLeft, ChevronRight, Rocket, Download, TrendingUp, Trophy, Gamepad2, MessageCircle, Camera } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"

// UI Components
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'outline' | 'ghost'
    size?: 'sm' | 'default' | 'lg'
    asChild?: boolean
  }
>(({ className = '', variant = 'default', size = 'default', asChild = false, children, ...props }, ref) => {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  }

  const sizes = {
    sm: "h-9 rounded-md px-3",
    default: "h-10 px-4 py-2",
    lg: "h-11 rounded-md px-8"
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

  if (asChild) {
    return <div className={classes} ref={ref} {...props}>{children}</div>
  }

  return (
    <button className={classes} ref={ref} {...props}>
      {children}
    </button>
  )
})
Button.displayName = "Button"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  />
))
Card.displayName = "Card"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
))
CardContent.displayName = "CardContent"

// Mock Language Data
const popularLanguages = [
  {
    id: "spanish",
    name: "西班牙语",
    englishName: "Spanish",
    flag: "🇪🇸",
    speakers: "500M+",
    difficulty: 2,
    popularity: 95,
    culture: "拉丁美洲文化",
    description: "世界第二大母语，职场和旅游热门选择"
  },
  {
    id: "french",
    name: "法语",
    englishName: "French",
    flag: "🇫🇷",
    speakers: "280M+",
    difficulty: 3,
    popularity: 88,
    culture: "浪漫主义文化",
    description: "优雅的语言，艺术和时尚的象征"
  },
  {
    id: "japanese",
    name: "日语",
    englishName: "Japanese",
    flag: "🇯🇵",
    speakers: "125M+",
    difficulty: 5,
    popularity: 92,
    culture: "东亚文化",
    description: "动漫文化和先进科技的语言"
  },
  {
    id: "german",
    name: "德语",
    englishName: "German",
    flag: "🇩🇪",
    speakers: "100M+",
    difficulty: 4,
    popularity: 85,
    culture: "欧洲工业文化",
    description: "工程技术和哲学思想的语言"
  },
  {
    id: "korean",
    name: "韩语",
    englishName: "Korean",
    flag: "🇰🇷",
    speakers: "77M+",
    difficulty: 4,
    popularity: 90,
    culture: "韩流文化",
    description: "K-pop和韩剧推动的热门语言"
  },
  {
    id: "portuguese",
    name: "葡萄牙语",
    englishName: "Portuguese",
    flag: "🇵🇹",
    speakers: "260M+",
    difficulty: 3,
    popularity: 82,
    culture: "卢西塔尼亚文化",
    description: "巴西和葡语国家的官方语言"
  }
]

// Culture regions data
const cultureRegions = [
  {
    id: "east-asia",
    name: "东亚文化圈",
    description: "深厚的历史底蕴与现代科技的完美融合",
    languages: ["中文", "日语", "韩语"],
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: ["儒家文化", "茶道艺术", "书法传统", "现代科技"]
  },
  {
    id: "europe",
    name: "欧洲文化圈",
    description: "艺术、哲学与浪漫主义的发源地",
    languages: ["法语", "德语", "意大利语", "西班牙语"],
    image: "https://images.unsplash.com/photo-1543735717-24da73e8d324?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: ["文艺复兴", "古典音乐", "建筑艺术", "葡萄酒文化"]
  },
  {
    id: "latin-america",
    name: "拉丁美洲文化圈",
    description: "热情奔放的音乐舞蹈与丰富多彩的节庆文化",
    languages: ["西班牙语", "葡萄牙语"],
    image: "https://images.unsplash.com/photo-1518123159102-4f0b5ad1a78b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: ["探戈舞", "足球文化", "玛雅文明", "嘉年华节"]
  }
]

// Difficulty indicator component
const DifficultyIndicator = ({ level }: { level: number }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i <= level
              ? i <= 2 ? 'bg-green-500' : i <= 3 ? 'bg-yellow-500' : 'bg-red-500'
              : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

// Language Card Component
const LanguageCard = ({ language }: { language: typeof popularLanguages[0] }) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 h-full bg-white/50 backdrop-blur hover:bg-white/80">
      <CardContent className="p-6 pt-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-4xl">{language.flag}</span>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{language.name}</h3>
              <p className="text-sm text-gray-600">{language.englishName}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-purple-600">{language.speakers}</div>
            <div className="text-xs text-gray-500">使用者</div>
          </div>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{language.description}</p>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">学习难度</span>
            <DifficultyIndicator level={language.difficulty} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">热门度</span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{language.popularity}%</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Globe className="w-4 h-4" />
            <span>{language.culture}</span>
          </div>
        </div>

        <Link href={`/languages/${language.id}`} className="block w-full mt-4">
          <Button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white">
            了解详情
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

// Culture Region Card Component
const CultureCard = ({ region }: { region: typeof cultureRegions[0] }) => {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={region.image}
          alt={region.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold mb-1">{region.name}</h3>
          <p className="text-sm opacity-90">{region.description}</p>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">主要语言</h4>
          <div className="flex flex-wrap gap-2">
            {region.languages.map((lang) => (
              <span key={lang} className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">文化特色</h4>
          <div className="flex flex-wrap gap-2">
            {region.highlights.map((highlight) => (
              <span key={highlight} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                {highlight}
              </span>
            ))}
          </div>
        </div>

        <Link href={`/culture/${region.id}`} className="block w-full">
          <Button variant="outline" className="w-full">
            探索文化
            <MapPin className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

// Header is now imported from @/components/header

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-6 h-6 text-purple-400" />
              <span className="text-lg font-bold">语言世界</span>
            </div>
            <p className="text-gray-400 text-sm">
              个性化的语言学习指导，深入的文化探索体验。让每一次学习都成为通向更广阔世界的桥梁。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.017 0C18.624 0 20 1.376 20 8.017v3.966C20 18.624 18.624 20 12.017 20H7.983C1.376 20 0 18.624 0 11.983V8.017C0 1.376 1.376 0 7.983 0h4.034zm0 1.8H7.983C2.27 1.8 1.8 2.27 1.8 7.983v4.034c0 5.713.47 6.183 6.183 6.183h4.034c5.713 0 6.183-.47 6.183-6.183V7.983c0-5.713-.47-6.183-6.183-6.183z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">学习资源</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/survey" className="text-gray-400 hover:text-white transition-colors">语言推荐</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">学习计划</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">难度评估</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">学习工具</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">文化探索</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/culture" className="text-gray-400 hover:text-white transition-colors">世界文化</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">语言历史</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">文化对比</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">节日习俗</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">关于我们</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">联系方式</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">合作伙伴</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">隐私政策</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 语言世界. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  )
}

// Culture Preview Section with horizontal scrolling
const CulturePreviewSection = () => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(true)

  const cultureArticles = [
    {
      title: "日本樱花季：语言与自然的诗意融合",
      type: "旅游",
      region: "日本",
      image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800",
      description: "探索日语中描述春天的独特词汇，感受樱花文化的深层意义",
      readTime: "5分钟"
    },
    {
      title: "西班牙弗拉明戈：激情舞蹈背后的语言艺术",
      type: "音乐",
      region: "西班牙",
      image: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=800",
      description: "了解弗拉明戈音乐中的西班牙语表达，体验音乐与语言的完美结合",
      readTime: "7分钟"
    },
    {
      title: "法国咖啡文化：从 'Café' 到生活哲学",
      type: "历史",
      region: "法国",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800",
      description: "深入巴黎咖啡馆文化，学习法语社交用语的精妙之处",
      readTime: "6分钟"
    }
  ]

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  React.useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScroll)
      checkScroll()
      return () => container.removeEventListener('scroll', checkScroll)
    }
  }, [])

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium mb-6">
            <Camera className="w-4 h-4" />
            文化探索之旅
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            文化探索精选
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            通过文化故事，深度理解语言的魅力与内涵
          </p>
        </div>

        <div className="relative mb-12">
          {canScrollLeft && (
            <button
              onClick={() => scrollContainerRef.current?.scrollBy({ left: -400, behavior: 'smooth' })}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border flex items-center justify-center hover:shadow-xl transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scrollContainerRef.current?.scrollBy({ left: 400, behavior: 'smooth' })}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border flex items-center justify-center hover:shadow-xl transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          <div ref={scrollContainerRef} className="overflow-x-auto pb-4 hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
            <div className="flex gap-6 px-12">
              {cultureArticles.map((article, index) => (
                <Card key={index} className="flex-shrink-0 w-80 hover:shadow-xl transition-all overflow-hidden">
                  <div className="relative h-48">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-sm font-medium">
                        {article.type}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {article.region}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/culture">
            <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 px-8 py-3">
              探索更多文化
              <Globe className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

// Learning Methods Section
const LearningMethodsSection = () => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(true)

  const methods = [
    {
      title: "沉浸式学习法：像婴儿一样学语言",
      languages: ["英语", "西班牙语", "法语"],
      summary: "通过创造纯语言环境，让大脑自然习得语言规律",
      readTime: "8分钟",
      rating: 4.8,
      difficulty: "初级",
      icon: Brain,
      color: "text-blue-600"
    },
    {
      title: "语言交换伙伴系统：真实对话的力量",
      languages: ["所有语言"],
      summary: "与母语者建立语言交换关系，在真实对话中提升口语能力",
      readTime: "6分钟",
      rating: 4.9,
      difficulty: "中级",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "记忆宫殿法：高效记忆单词和语法",
      languages: ["日语", "阿拉伯语", "中文"],
      summary: "运用空间记忆原理，将抽象的语言知识转化为具象场景",
      readTime: "10分钟",
      rating: 4.7,
      difficulty: "高级",
      icon: Target,
      color: "text-purple-600"
    },
    {
      title: "间隔重复法：科学记忆新突破",
      languages: ["德语", "俄语", "韩语"],
      summary: "基于艾宾浩斯遗忘曲线，科学安排复习时间",
      readTime: "7分钟",
      rating: 4.6,
      difficulty: "中级",
      icon: Lightbulb,
      color: "text-amber-600"
    }
  ]

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  React.useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScroll)
      checkScroll()
      return () => container.removeEventListener('scroll', checkScroll)
    }
  }, [])

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium mb-6">
            <Lightbulb className="w-4 h-4" />
            专家推荐方法
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            学习方法推荐
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            专家验证的高效语言学习方法，让你的学习之路更加轻松高效
          </p>
        </div>

        <div className="relative mb-12">
          {canScrollLeft && (
            <button
              onClick={() => scrollContainerRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border flex items-center justify-center hover:shadow-xl transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scrollContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border flex items-center justify-center hover:shadow-xl transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          <div ref={scrollContainerRef} className="overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
            <div className="flex gap-6 px-12">
              {methods.map((method, index) => {
                const IconComponent = method.icon
                return (
                  <Card key={index} className="flex-shrink-0 w-72 hover:shadow-xl transition-all">
                    <CardContent className="p-6 pt-8">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <IconComponent className={`h-5 w-5 ${method.color}`} />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-gray-100 rounded text-xs">{method.difficulty}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{method.rating}</span>
                          </div>
                        </div>
                      </div>
                      <h3 className="font-semibold mb-3 line-clamp-2">{method.title}</h3>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {method.languages.slice(0, 2).map((lang, i) => (
                          <span key={i} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">
                            {lang}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{method.summary}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {method.readTime}
                        </div>
                        <Button variant="outline" size="sm">
                          详细了解
                          <BookOpen className="h-3 w-3 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>

        <div className="text-center">
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-12 py-16">
              <h3 className="text-3xl font-bold mb-4">掌握更多学习秘籍！</h3>
              <p className="text-lg text-gray-600 mb-8">
                20+ 种专业学习方法等你来探索，总有一种适合你的学习风格！
              </p>
              <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 px-8 py-3">
                查看完整学习指导
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Resource Tools Section
const ResourceToolsSection = () => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(true)

  const tools = [
    {
      name: "Duolingo",
      category: "综合学习",
      ranking: "#1",
      rating: 4.6,
      users: "5亿+",
      trend: "上升",
      features: ["游戏化学习", "多语言支持", "免费使用"],
      description: "全球最受欢迎的语言学习应用，通过游戏化方式让学习变得有趣",
      icon: Gamepad2,
      color: "text-green-600"
    },
    {
      name: "Anki",
      category: "记忆工具",
      ranking: "#2",
      rating: 4.8,
      users: "1000万+",
      trend: "稳定",
      features: ["间隔重复", "自定义卡片", "社区共享"],
      description: "基于科学记忆原理的闪卡应用，是背单词和语法的强大工具",
      icon: Trophy,
      color: "text-orange-600"
    },
    {
      name: "HelloTalk",
      category: "语言交换",
      ranking: "#3",
      rating: 4.5,
      users: "5000万+",
      trend: "上升",
      features: ["真人对话", "文化交流", "即时翻译"],
      description: "连接全球语言学习者的社交平台，与母语者进行真实对话练习",
      icon: MessageCircle,
      color: "text-purple-600"
    },
    {
      name: "Busuu",
      category: "在线课程",
      ranking: "#4",
      rating: 4.4,
      users: "1200万+",
      trend: "上升",
      features: ["AI课程", "认证证书", "个性化"],
      description: "提供专业语言课程和认证，由语言专家设计的学习路径",
      icon: Rocket,
      color: "text-blue-600"
    }
  ]

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  React.useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScroll)
      checkScroll()
      return () => container.removeEventListener('scroll', checkScroll)
    }
  }, [])

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium mb-6">
            <Rocket className="w-4 h-4" />
            全球精选工具
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            学习资源工具
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            全球语言学习者都在使用的精选工具，让你的学习事半功倍
          </p>
        </div>

        <div className="relative mb-12">
          {canScrollLeft && (
            <button
              onClick={() => scrollContainerRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border flex items-center justify-center hover:shadow-xl transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scrollContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border flex items-center justify-center hover:shadow-xl transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          <div ref={scrollContainerRef} className="overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
            <div className="flex gap-6 px-12">
              {tools.map((tool, index) => {
                const IconComponent = tool.icon
                return (
                  <Card key={index} className="flex-shrink-0 w-72 hover:shadow-xl transition-all">
                    <CardContent className="p-6 pt-8">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white flex items-center justify-center font-bold text-sm">
                            {tool.ranking}
                          </div>
                          <div>
                            <h3 className="font-semibold">{tool.name}</h3>
                            <span className="text-xs text-gray-500">{tool.category}</span>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          <IconComponent className={`h-4 w-4 ${tool.color}`} />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{tool.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{tool.users}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className={`h-3 w-3 ${tool.trend === '上升' ? 'text-green-500' : 'text-gray-500'}`} />
                          <span className="text-xs">{tool.trend}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tool.description}</p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {tool.features.slice(0, 2).map((feature, i) => (
                          <span key={i} className="px-2 py-1 border rounded text-xs">
                            {feature}
                          </span>
                        ))}
                        {tool.features.length > 2 && (
                          <span className="px-2 py-1 border rounded text-xs">
                            +{tool.features.length - 2}
                          </span>
                        )}
                      </div>

                      <Button variant="outline" size="sm" className="w-full">
                        了解详情
                        <Download className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>

        <div className="text-center">
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-12 py-16">
              <h3 className="text-3xl font-bold mb-4">发现更多神器工具！</h3>
              <p className="text-lg text-gray-600 mb-8">
                100+ 款精选学习工具等你来探索，总有一款让你爱不释手！
              </p>
              <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 px-8 py-3">
                查看所有资源与工具
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Main HomePage Component
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(124, 58, 237, 0.9) 0%, rgba(16, 185, 129, 0.8) 100%), url('https://images.unsplash.com/photo-1742415105376-43d3a5fd03fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTgxMDYyODR8MA&ixlib=rb-4.1.0&q=80&w=1080')`
            }}
          />

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-5xl mx-auto">
              {/* Main heading */}
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent">
                  发现语言
                </span>
                <br />
                <span className="text-white">探索世界</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
                个性化的语言学习指导，深入的文化探索体验
                <br />
                让每一次学习都成为通向更广阔世界的桥梁
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
                <Link href="/survey">
                  <Button
                    size="lg"
                    className="px-8 py-3 rounded-full font-medium group bg-white text-slate-900 hover:bg-slate-100 border-0"
                  >
                    开始探索
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-16 max-w-lg mx-auto">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">50+</div>
                  <div className="text-white/80">支持语言</div>
                </div>
                <div className="hidden sm:block w-px h-16 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">100K+</div>
                  <div className="text-white/80">活跃学习者</div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-white/10 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                为什么选择我们
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                我们致力于为每位学习者提供最个性化、最有效的语言学习体验
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                {
                  icon: Brain,
                  title: "因材施教",
                  description: "根据您的母语和学习目标，定制学习难度和时间规划",
                  color: "text-blue-600"
                },
                {
                  icon: Globe,
                  title: "文化浸润",
                  description: "不只是语言，更是文化的深度体验和理解",
                  color: "text-green-600"
                },
                {
                  icon: GraduationCap,
                  title: "专家方法",
                  description: "汇聚语言学习专家的方法论和实践经验",
                  color: "text-purple-600"
                },
                {
                  icon: Wrench,
                  title: "学习工具排名",
                  description: "全世界的人都在用什么工具学习语言",
                  color: "text-orange-600"
                }
              ].map((feature, index) => (
                <div key={index} className="group">
                  <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 h-full bg-white/50 hover:bg-white/80">
                    <CardContent className="p-8 pt-10 text-center">
                      <div className="mb-6">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <feature.icon className={`h-8 w-8 ${feature.color}`} />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Languages */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                热门语言推荐
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                探索世界上最受欢迎的语言，找到最适合您的学习选择
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {popularLanguages.map((language) => (
                <LanguageCard key={language.id} language={language} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/languages">
                <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-8 py-3">
                  查看全部语言
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Culture Preview - Enhanced */}
        <CulturePreviewSection />

        {/* Learning Methods */}
        <LearningMethodsSection />

        {/* Resource Tools */}
        <ResourceToolsSection />

      </main>
    </div>
  )
}
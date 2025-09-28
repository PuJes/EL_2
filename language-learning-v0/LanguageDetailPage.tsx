'use client'

import * as React from "react"
import {
  ArrowLeft, Users, Clock, Star, Globe, BookOpen, PlayCircle, HeadphonesIcon,
  FileText, MessageCircle, TrendingUp, Calendar, MapPin, Award, Target,
  CheckCircle, ExternalLink, Brain, Zap, Heart, ChevronRight, BarChart3
} from "lucide-react"

// UI Components
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'outline' | 'ghost'
    size?: 'sm' | 'default' | 'lg'
  }
>(({ className = '', variant = 'default', size = 'default', children, ...props }, ref) => {
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

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', ...props }, ref) => (
  <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className = '', ...props }, ref) => (
  <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
))
CardContent.displayName = "CardContent"

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'secondary' | 'outline' }
>(({ className = '', variant = 'default', ...props }, ref) => {
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border-gray-200 bg-transparent text-gray-700 hover:bg-gray-50"
  }

  return (
    <div
      ref={ref}
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value?: number }
>(({ className = '', value = 0, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative h-4 w-full overflow-hidden rounded-full bg-secondary ${className}`}
    {...props}
  >
    <div
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
))
Progress.displayName = "Progress"

// Tabs components
const Tabs: React.FC<{ children: React.ReactNode; defaultValue?: string; className?: string }> = ({ children, defaultValue, className }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue || '')

  return (
    <div className={className} data-active-tab={activeTab}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement, { activeTab, setActiveTab })
          : child
      )}
    </div>
  )
}

const TabsList: React.FC<{ children: React.ReactNode; className?: string; activeTab?: string; setActiveTab?: (value: string) => void }> = ({ children, className, activeTab, setActiveTab }) => (
  <div className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}>
    {React.Children.map(children, (child) =>
      React.isValidElement(child)
        ? React.cloneElement(child as React.ReactElement, { activeTab, setActiveTab })
        : child
    )}
  </div>
)

const TabsTrigger: React.FC<{ children: React.ReactNode; value: string; className?: string; activeTab?: string; setActiveTab?: (value: string) => void }> = ({ children, value, className, activeTab, setActiveTab }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
      activeTab === value ? 'bg-background text-foreground shadow-sm' : ''
    } ${className}`}
    onClick={() => setActiveTab?.(value)}
  >
    {children}
  </button>
)

const TabsContent: React.FC<{ children: React.ReactNode; value: string; className?: string; activeTab?: string }> = ({ children, value, className, activeTab }) => {
  if (activeTab !== value) return null
  return <div className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}>{children}</div>
}

// Mock Language Data
interface Language {
  id: string
  flag: string
  name: string
  nameEn: string
  nativeName: string
  description: string
  category: string
  difficulty: number
  speakers: {
    native: number
    total: number
    countries: string[]
  }
  regions: string[]
  culturalInfo: {
    history: string
    traditions: string[]
    festivals: string[]
    cuisine: string[]
    arts: string[]
    literature: string[]
    modernCulture: string[]
  }
  grammar: {
    wordOrder: string
    features: string[]
    complexity: number
  }
  writingSystem: {
    type: string
    scripts: string[]
    direction: string
  }
  phonetics: {
    phoneCount: number
    tones: boolean
    difficultSounds: string[]
  }
  learningResources: {
    apps: Array<{ name: string; description: string; price: string }>
    books: Array<{ title: string; author: string; level: string }>
    websites: Array<{ name: string; url: string; description: string }>
    podcasts: Array<{ name: string; description: string }>
  }
  careerOpportunities: string[]
  travelBenefits: string[]
  tags: string[]
  learningTimeEstimate: {
    beginner: string
    intermediate: string
    advanced: string
  }
  popularityScore: number
  jobMarketValue: number
}

// Mock data for Spanish
const mockLanguage: Language = {
  id: "spanish",
  flag: "🇪🇸",
  name: "西班牙语",
  nameEn: "Spanish",
  nativeName: "Español",
  description: "全球第二大母语语言，拉丁美洲和西班牙的官方语言，是职场和旅游的热门选择",
  category: "popular",
  difficulty: 2,
  speakers: {
    native: 500000000,
    total: 580000000,
    countries: ["西班牙", "墨西哥", "阿根廷", "哥伦比亚", "委内瑞拉", "秘鲁", "智利", "厄瓜多尔"]
  },
  regions: ["欧洲", "拉丁美洲", "北美"],
  culturalInfo: {
    history: "西班牙语起源于西班牙的卡斯蒂利亚地区，随着西班牙殖民扩张传播到拉丁美洲，成为世界上使用最广泛的语言之一。",
    traditions: ["弗拉门戈舞蹈", "斗牛", "西班牙节庆", "嘉年华", "亡灵节"],
    festivals: ["圣费明节", "塞维利亚春节", "亡灵节", "圣诞节", "复活节"],
    cuisine: ["海鲜饭", "塔帕斯", "伊比利亚火腿", "玉米卷", "墨西哥辣椒"],
    arts: ["毕加索绘画", "高迪建筑", "佛拉明戈", "拉丁音乐", "魔幻现实主义"],
    literature: ["堂吉诃德", "百年孤独", "拉丁美洲文学", "加西亚·马尔克斯"],
    modernCulture: ["拉丁流行音乐", "足球文化", "电影产业", "现代艺术", "数字媒体"]
  },
  grammar: {
    wordOrder: "SVO (主谓宾)",
    features: ["动词变位", "名词性别", "形容词一致性", "虚拟语态", "过去时态变化"],
    complexity: 2
  },
  writingSystem: {
    type: "拉丁字母",
    scripts: ["拉丁字母", "特殊字符(ñ, á, é, í, ó, ú, ü)"],
    direction: "从左到右"
  },
  phonetics: {
    phoneCount: 24,
    tones: false,
    difficultSounds: ["rr (颤音)", "ñ", "j", "x"]
  },
  learningResources: {
    apps: [
      { name: "Duolingo", description: "免费的游戏化语言学习", price: "免费" },
      { name: "Babbel", description: "专业的对话练习", price: "$6.95/月" },
      { name: "Busuu", description: "AI个性化学习", price: "$9.99/月" },
      { name: "SpanishDict", description: "最全面的西班牙语词典", price: "免费" }
    ],
    books: [
      { title: "新概念西班牙语", author: "刘建", level: "初级" },
      { title: "实用西班牙语语法", author: "陈燕", level: "中级" },
      { title: "西班牙语阅读教程", author: "李德伦", level: "高级" },
      { title: "商务西班牙语", author: "王丽娟", level: "专业" }
    ],
    websites: [
      { name: "SpanishPod101", url: "spanishpod101.com", description: "音频播客课程" },
      { name: "Conjuguemos", url: "conjuguemos.com", description: "动词变位练习" },
      { name: "News in Slow Spanish", url: "newsinslowspanish.com", description: "慢速新闻练习" },
      { name: "Lingolia Spanish", url: "spanish.lingolia.com", description: "语法练习和解释" }
    ],
    podcasts: [
      { name: "SpanishPod", description: "日常对话和文化介绍" },
      { name: "Coffee Break Spanish", description: "15-20分钟的短课程" },
      { name: "Duolingo Spanish Podcast", description: "真实故事，双语讲述" },
      { name: "Intermediate Spanish Podcast", description: "中级水平内容" }
    ]
  },
  careerOpportunities: [
    "国际贸易和商务",
    "翻译和口译",
    "旅游和酒店管理",
    "国际关系和外交",
    "教育行业",
    "媒体和新闻",
    "医疗保健",
    "法律服务"
  ],
  travelBenefits: [
    "在21个国家作为官方语言使用",
    "拉丁美洲旅游无障碍",
    "西班牙深度文化体验",
    "更好的旅游体验和当地交流",
    "获得当地人的友善对待",
    "享受原汁原味的文化活动"
  ],
  tags: ["商务", "旅游", "全球通用", "浪漫语族", "职场热门"],
  learningTimeEstimate: {
    beginner: "3-6个月 (基础交流)",
    intermediate: "6-12个月 (流利对话)",
    advanced: "12-24个月 (精通掌握)"
  },
  popularityScore: 95,
  jobMarketValue: 88
}

// Difficulty indicator component
const DifficultyIndicator = ({ level }: { level: number }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= level
              ? i <= 2 ? 'text-green-500 fill-current' : i <= 3 ? 'text-yellow-500 fill-current' : 'text-red-500 fill-current'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  )
}

// Header Component
const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Globe className="w-8 h-8 text-purple-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              语言世界
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">首页</a>
            <a href="#" className="text-purple-600 font-medium">语言详情</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">文化探索</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">学习资源</a>
          </nav>
          <Button size="sm" className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
            开始学习
          </Button>
        </div>
      </div>
    </header>
  )
}

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Globe className="w-6 h-6 text-purple-400" />
            <span className="text-lg font-bold">语言世界</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 语言世界. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main Language Detail Component
export default function LanguageDetailPage() {
  const language = mockLanguage // In real app, this would come from props or URL params

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        {/* Back Navigation */}
        <section className="py-6 border-b bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回语言列表
            </Button>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 via-white to-cyan-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-4">
                  <span className="text-6xl">{language.flag}</span>
                  <div className="text-left">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                      {language.name}
                    </h1>
                    <p className="text-xl text-gray-600">
                      {language.nameEn} • {language.nativeName}
                    </p>
                  </div>
                </div>

                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  {language.description}
                </p>

                <div className="flex flex-wrap gap-2 justify-center">
                  {language.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur">
                  <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-gray-900">{(language.speakers.total / 1000000).toFixed(0)}M</div>
                  <div className="text-sm text-gray-600">使用者</div>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur">
                  <Target className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold text-gray-900">{language.difficulty}/5</div>
                  <div className="text-sm text-gray-600">学习难度</div>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold text-gray-900">{language.popularityScore}%</div>
                  <div className="text-sm text-gray-600">热门度</div>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-lg backdrop-blur">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                  <div className="text-2xl font-bold text-gray-900">{language.speakers.countries.length}</div>
                  <div className="text-sm text-gray-600">使用国家</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8 py-3">
                  开始学习 {language.name}
                  <PlayCircle className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-3">
                  获取学习计划
                  <Calendar className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Information Tabs */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="overview" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-6 mb-8">
                <TabsTrigger value="overview">概述</TabsTrigger>
                <TabsTrigger value="culture">文化</TabsTrigger>
                <TabsTrigger value="learning">学习</TabsTrigger>
                <TabsTrigger value="resources">资源</TabsTrigger>
                <TabsTrigger value="career">职业</TabsTrigger>
                <TabsTrigger value="travel">旅游</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Language Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        <span>语言统计</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">母语使用者</span>
                          <span className="font-semibold">{(language.speakers.native / 1000000).toFixed(0)}M</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">总使用者</span>
                          <span className="font-semibold">{(language.speakers.total / 1000000).toFixed(0)}M</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">官方语言国家</span>
                          <span className="font-semibold">{language.speakers.countries.length}个</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">学习难度</span>
                          <DifficultyIndicator level={language.difficulty} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Grammar Overview */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5 text-green-600" />
                        <span>语法特点</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">语序</span>
                        <span className="font-semibold">{language.grammar.wordOrder}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">语法复杂度</span>
                        <span className="font-semibold">{language.grammar.complexity}/5</span>
                      </div>
                      <div>
                        <span className="text-gray-600 block mb-2">主要特征</span>
                        <div className="flex flex-wrap gap-1">
                          {language.grammar.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Writing System */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-purple-600" />
                        <span>文字系统</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">文字类型</span>
                        <span className="font-semibold">{language.writingSystem.type}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">书写方向</span>
                        <span className="font-semibold">{language.writingSystem.direction}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 block mb-2">使用字符</span>
                        <div className="flex flex-wrap gap-1">
                          {language.writingSystem.scripts.map((script) => (
                            <Badge key={script} variant="outline" className="text-xs">
                              {script}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Phonetics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <HeadphonesIcon className="w-5 h-5 text-orange-600" />
                        <span>语音特点</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">音素数量</span>
                        <span className="font-semibold">{language.phonetics.phoneCount}个</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">声调语言</span>
                        <span className="font-semibold">{language.phonetics.tones ? '是' : '否'}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 block mb-2">困难发音</span>
                        <div className="flex flex-wrap gap-1">
                          {language.phonetics.difficultSounds.map((sound) => (
                            <Badge key={sound} variant="outline" className="text-xs">
                              {sound}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="culture" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>历史背景</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">{language.culturalInfo.history}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>传统文化</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2">
                        {language.culturalInfo.traditions.map((tradition) => (
                          <div key={tradition} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{tradition}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>节庆活动</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {language.culturalInfo.festivals.map((festival) => (
                          <div key={festival} className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-purple-500" />
                            <span className="text-sm">{festival}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>现代文化</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {language.culturalInfo.modernCulture.map((culture) => (
                          <div key={culture} className="flex items-center space-x-2">
                            <Zap className="w-4 h-4 text-blue-500" />
                            <span className="text-sm">{culture}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="learning" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>学习时间估计</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <Clock className="w-8 h-8 mx-auto mb-2 text-green-600" />
                        <h4 className="font-semibold text-green-900">初级</h4>
                        <p className="text-sm text-green-700">{language.learningTimeEstimate.beginner}</p>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <Target className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                        <h4 className="font-semibold text-yellow-900">中级</h4>
                        <p className="text-sm text-yellow-700">{language.learningTimeEstimate.intermediate}</p>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <Award className="w-8 h-8 mx-auto mb-2 text-red-600" />
                        <h4 className="font-semibold text-red-900">高级</h4>
                        <p className="text-sm text-red-700">{language.learningTimeEstimate.advanced}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Apps */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <PlayCircle className="w-5 h-5 text-blue-600" />
                        <span>推荐应用</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {language.learningResources.apps.map((app) => (
                        <div key={app.name} className="flex justify-between items-start p-3 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold">{app.name}</h4>
                            <p className="text-sm text-gray-600">{app.description}</p>
                          </div>
                          <Badge variant="outline">{app.price}</Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Books */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5 text-green-600" />
                        <span>推荐书籍</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {language.learningResources.books.map((book) => (
                        <div key={book.title} className="flex justify-between items-start p-3 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold">{book.title}</h4>
                            <p className="text-sm text-gray-600">作者：{book.author}</p>
                          </div>
                          <Badge variant="outline">{book.level}</Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="career" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <span>职业机会</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {language.careerOpportunities.map((opportunity) => (
                        <div key={opportunity} className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-purple-600" />
                          <span className="text-purple-900">{opportunity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="travel" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-orange-600" />
                      <span>旅游优势</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      {language.travelBenefits.map((benefit) => (
                        <div key={benefit} className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                          <Globe className="w-5 h-5 text-orange-600" />
                          <span className="text-orange-900">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-cyan-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              准备开始学习{language.name}了吗？
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              加入数百万正在学习{language.name}的学习者，开启您的语言学习之旅
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg">
                免费开始学习
                <PlayCircle className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                获取学习计划
                <Calendar className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// CSS Variables (to be included in global styles)
const styles = `
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.649 0.237 267);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.671 0.171 200);
  --secondary-foreground: oklch(0.145 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.732 0.249 143);
  --accent-foreground: oklch(1 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.649 0.237 267);
}
`
'use client'

import * as React from "react"
import { useState, useMemo } from "react"
import { Search, Filter, Grid, List, ChevronDown, Brain, Globe, Users, Clock, Sparkles, BarChart3, Star, Target, ArrowRight, MapPin } from "lucide-react"

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

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className = '', type = 'text', ...props }, ref) => {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

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

// Select Component
const Select: React.FC<{
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
}> = ({ children, value, onValueChange }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [currentValue, setCurrentValue] = React.useState(value || '')

  const handleValueChange = (newValue: string) => {
    setCurrentValue(newValue)
    onValueChange?.(newValue)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement, {
              isOpen,
              setIsOpen,
              currentValue,
              handleValueChange
            })
          : child
      )}
    </div>
  )
}

const SelectTrigger: React.FC<{
  children: React.ReactNode
  className?: string
  isOpen?: boolean
  setIsOpen?: (open: boolean) => void
}> = ({ children, className, isOpen, setIsOpen }) => (
  <button
    className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    onClick={() => setIsOpen?.(!isOpen)}
  >
    {children}
    <ChevronDown className="h-4 w-4 opacity-50" />
  </button>
)

const SelectValue: React.FC<{ placeholder?: string; currentValue?: string }> = ({ placeholder, currentValue }) => (
  <span>{currentValue || placeholder}</span>
)

const SelectContent: React.FC<{
  children: React.ReactNode
  isOpen?: boolean
}> = ({ children, isOpen }) => {
  if (!isOpen) return null
  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-96 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md">
      <div className="p-1">
        {children}
      </div>
    </div>
  )
}

const SelectItem: React.FC<{
  children: React.ReactNode
  value: string
  handleValueChange?: (value: string) => void
}> = ({ children, value, handleValueChange }) => (
  <div
    className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground cursor-pointer"
    onClick={() => handleValueChange?.(value)}
  >
    {children}
  </div>
)

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
    modernCulture: string[]
  }
  tags: string[]
  learningTimeEstimate: string
  popularityScore: number
}

const mockLanguages: Language[] = [
  {
    id: "spanish",
    flag: "🇪🇸",
    name: "西班牙语",
    nameEn: "Spanish",
    nativeName: "Español",
    description: "全球第二大母语语言，拉丁美洲和西班牙的官方语言",
    category: "popular",
    difficulty: 2,
    speakers: {
      native: 500000000,
      total: 580000000,
      countries: ["西班牙", "墨西哥", "阿根廷", "哥伦比亚"]
    },
    regions: ["欧洲", "拉丁美洲"],
    culturalInfo: {
      history: "源于伊比利亚半岛，随着殖民扩张传播至全球",
      traditions: ["弗拉门戈", "斗牛", "西班牙节庆"],
      modernCulture: ["拉丁音乐", "足球文化", "现代艺术"]
    },
    tags: ["商务", "旅游", "全球通用", "浪漫语族"],
    learningTimeEstimate: "8-12个月",
    popularityScore: 95
  },
  {
    id: "french",
    flag: "🇫🇷",
    name: "法语",
    nameEn: "French",
    nativeName: "Français",
    description: "优雅的语言，艺术和时尚的象征，联合国官方语言",
    category: "cultural",
    difficulty: 3,
    speakers: {
      native: 280000000,
      total: 300000000,
      countries: ["法国", "加拿大", "比利时", "瑞士"]
    },
    regions: ["欧洲", "非洲", "北美"],
    culturalInfo: {
      history: "起源于拉丁语，是欧洲文化和外交的重要语言",
      traditions: ["法式料理", "时装", "香水"],
      modernCulture: ["电影艺术", "文学", "哲学"]
    },
    tags: ["艺术", "时尚", "外交", "浪漫语族"],
    learningTimeEstimate: "12-18个月",
    popularityScore: 88
  },
  {
    id: "german",
    flag: "🇩🇪",
    name: "德语",
    nameEn: "German",
    nativeName: "Deutsch",
    description: "欧洲经济强国语言，科技和工程领域的重要语言",
    category: "business",
    difficulty: 4,
    speakers: {
      native: 100000000,
      total: 130000000,
      countries: ["德国", "奥地利", "瑞士", "卢森堡"]
    },
    regions: ["欧洲"],
    culturalInfo: {
      history: "日耳曼语族，拥有丰富的哲学和科学传统",
      traditions: ["啤酒节", "圣诞市场", "古典音乐"],
      modernCulture: ["工程技术", "汽车工业", "环保意识"]
    },
    tags: ["工程", "科技", "商务", "日耳曼语族"],
    learningTimeEstimate: "18-24个月",
    popularityScore: 82
  },
  {
    id: "japanese",
    flag: "🇯🇵",
    name: "日语",
    nameEn: "Japanese",
    nativeName: "日本語",
    description: "东亚文化圈核心语言，拥有丰富的文化内涵和现代应用价值",
    category: "cultural",
    difficulty: 5,
    speakers: {
      native: 125000000,
      total: 130000000,
      countries: ["日本"]
    },
    regions: ["东亚"],
    culturalInfo: {
      history: "拥有千年历史的语言文化传统",
      traditions: ["茶道", "花道", "武道", "书法"],
      modernCulture: ["动漫", "游戏", "科技创新"]
    },
    tags: ["动漫", "文化", "科技", "商务"],
    learningTimeEstimate: "24-36个月",
    popularityScore: 90
  },
  {
    id: "korean",
    flag: "🇰🇷",
    name: "韩语",
    nameEn: "Korean",
    nativeName: "한국어",
    description: "朝鲜半岛语言，拥有独特的表音文字系统和丰富的现代文化",
    category: "popular",
    difficulty: 4,
    speakers: {
      native: 77000000,
      total: 82000000,
      countries: ["韩国", "朝鲜"]
    },
    regions: ["东亚"],
    culturalInfo: {
      history: "具有悠久历史的朝鲜半岛语言",
      traditions: ["韩服", "传统舞蹈", "儒家文化"],
      modernCulture: ["K-pop", "韩剧", "韩流文化"]
    },
    tags: ["K-pop", "韩流", "商务", "文化"],
    learningTimeEstimate: "18-30个月",
    popularityScore: 87
  },
  {
    id: "italian",
    flag: "🇮🇹",
    name: "意大利语",
    nameEn: "Italian",
    nativeName: "Italiano",
    description: "艺术和美食的语言，文艺复兴的发源地",
    category: "cultural",
    difficulty: 2,
    speakers: {
      native: 65000000,
      total: 85000000,
      countries: ["意大利", "瑞士", "梵蒂冈"]
    },
    regions: ["欧洲"],
    culturalInfo: {
      history: "拉丁语的直接继承者，文艺复兴的语言",
      traditions: ["歌剧", "美食", "艺术"],
      modernCulture: ["时尚设计", "汽车工业", "建筑"]
    },
    tags: ["艺术", "美食", "时尚", "浪漫语族"],
    learningTimeEstimate: "10-15个月",
    popularityScore: 78
  },
  {
    id: "portuguese",
    flag: "🇵🇹",
    name: "葡萄牙语",
    nameEn: "Portuguese",
    nativeName: "Português",
    description: "巴西和葡语国家的官方语言，南美洲最大国家的语言",
    category: "business",
    difficulty: 2,
    speakers: {
      native: 260000000,
      total: 280000000,
      countries: ["巴西", "葡萄牙", "安哥拉", "莫桑比克"]
    },
    regions: ["欧洲", "南美洲", "非洲"],
    culturalInfo: {
      history: "起源于葡萄牙，随着海上探险传播到世界各地",
      traditions: ["法朵音乐", "足球", "嘉年华"],
      modernCulture: ["巴西文化", "音乐", "足球运动"]
    },
    tags: ["商务", "足球", "音乐", "浪漫语族"],
    learningTimeEstimate: "10-14个月",
    popularityScore: 75
  },
  {
    id: "mandarin",
    flag: "🇨🇳",
    name: "中文",
    nameEn: "Mandarin Chinese",
    nativeName: "普通话",
    description: "世界使用人数最多的语言，中华文化的载体",
    category: "popular",
    difficulty: 5,
    speakers: {
      native: 918000000,
      total: 1100000000,
      countries: ["中国", "台湾", "新加坡"]
    },
    regions: ["东亚", "东南亚"],
    culturalInfo: {
      history: "拥有数千年历史的汉语言文字系统",
      traditions: ["书法", "中医", "武术", "茶文化"],
      modernCulture: ["科技创新", "经济发展", "文化输出"]
    },
    tags: ["商务", "文化", "科技", "汉语族"],
    learningTimeEstimate: "24-36个月",
    popularityScore: 92
  }
]

// Filter interface
interface LanguageFilters {
  search: string
  category: string
  difficulty: string
  region: string
  sortBy: string
}

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
const LanguageCard = ({ language, viewMode }: { language: Language; viewMode: 'grid' | 'list' }) => {
  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-4xl">{language.flag}</span>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{language.name}</h3>
                  <span className="text-gray-500">({language.nativeName})</span>
                  <Badge variant="outline" className="text-xs">
                    {language.category === 'popular' ? '热门' :
                     language.category === 'cultural' ? '文化' : '商务'}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-2">{language.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{(language.speakers.total / 1000000).toFixed(0)}M 使用者</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{language.learningTimeEstimate}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">难度</p>
                <DifficultyIndicator level={language.difficulty} />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">热门度</p>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{language.popularityScore}%</span>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
                了解详情
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 h-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-4xl">{language.flag}</span>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{language.name}</h3>
              <p className="text-sm text-gray-600">{language.nativeName}</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {language.category === 'popular' ? '热门' :
             language.category === 'cultural' ? '文化' : '商务'}
          </Badge>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{language.description}</p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">学习难度</span>
            <DifficultyIndicator level={language.difficulty} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">热门度</span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{language.popularityScore}%</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{(language.speakers.total / 1000000).toFixed(0)}M 使用者</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>预计学习：{language.learningTimeEstimate}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {language.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white">
          了解详情
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
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
            <a href="#" className="text-purple-600 font-medium">语言列表</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">文化探索</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">学习资源</a>
          </nav>
          <Button size="sm" className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
            开始测评
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

// Main Languages Page Component
export default function LanguagesPage() {
  const [filters, setFilters] = useState<LanguageFilters>({
    search: "",
    category: "all",
    difficulty: "all",
    region: "all",
    sortBy: "popularity"
  })
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Filter and sort languages
  const filteredLanguages = useMemo(() => {
    let filtered = mockLanguages.filter(language => {
      // Search filter
      const searchMatch = !filters.search ||
        language.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        language.nameEn.toLowerCase().includes(filters.search.toLowerCase()) ||
        language.nativeName.toLowerCase().includes(filters.search.toLowerCase())

      // Category filter
      const categoryMatch = filters.category === "all" || language.category === filters.category

      // Difficulty filter
      const difficultyMatch = filters.difficulty === "all" ||
        (filters.difficulty === "1-2" && language.difficulty <= 2) ||
        (filters.difficulty === "3" && language.difficulty === 3) ||
        (filters.difficulty === "4-5" && language.difficulty >= 4)

      // Region filter (simplified for demo)
      const regionMatch = filters.region === "all" || language.regions.some(r => r.includes(filters.region))

      return searchMatch && categoryMatch && difficultyMatch && regionMatch
    })

    // Sort languages
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "difficulty":
          return a.difficulty - b.difficulty
        case "speakers":
          return b.speakers.total - a.speakers.total
        case "popularity":
          return b.popularityScore - a.popularityScore
        default:
          return 0
      }
    })

    return filtered
  }, [filters])

  const handleFilterChange = (key: keyof LanguageFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-50 to-cyan-50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                探索世界语言
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                发现适合您的语言，开启全新的文化体验之旅
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{mockLanguages.length}</div>
                  <div className="text-sm text-gray-600">可选语言</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-600">50+</div>
                  <div className="text-sm text-gray-600">国家地区</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">10M+</div>
                  <div className="text-sm text-gray-600">学习者</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">24/7</div>
                  <div className="text-sm text-gray-600">在线支持</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="搜索语言..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="分类" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部分类</SelectItem>
                    <SelectItem value="popular">热门语言</SelectItem>
                    <SelectItem value="cultural">文化语言</SelectItem>
                    <SelectItem value="business">商务语言</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.difficulty} onValueChange={(value) => handleFilterChange('difficulty', value)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="难度" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部难度</SelectItem>
                    <SelectItem value="1-2">简单 (1-2)</SelectItem>
                    <SelectItem value="3">中等 (3)</SelectItem>
                    <SelectItem value="4-5">困难 (4-5)</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="排序" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">热门度</SelectItem>
                    <SelectItem value="name">名称</SelectItem>
                    <SelectItem value="difficulty">难度</SelectItem>
                    <SelectItem value="speakers">使用人数</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex border rounded-md overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Languages Grid */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  找到 {filteredLanguages.length} 种语言
                </h2>
                <p className="text-gray-600">
                  {filters.search && `搜索"${filters.search}"的结果`}
                </p>
              </div>
            </div>

            {filteredLanguages.length === 0 ? (
              <div className="text-center py-16">
                <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">没有找到匹配的语言</h3>
                <p className="text-gray-600 mb-6">尝试调整搜索条件或筛选器</p>
                <Button onClick={() => setFilters({ search: "", category: "all", difficulty: "all", region: "all", sortBy: "popularity" })}>
                  清除筛选
                </Button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-4"
              }>
                {filteredLanguages.map((language) => (
                  <LanguageCard key={language.id} language={language} viewMode={viewMode} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-cyan-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              还在犹豫选择哪种语言？
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              通过我们的AI智能推荐系统，根据您的个人背景和学习目标，为您推荐最适合的语言
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg">
                开始AI推荐测评
                <Brain className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                探索文化世界
                <Globe className="w-5 h-5 ml-2" />
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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
`
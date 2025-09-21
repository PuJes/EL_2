"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Filter,
  Globe,
  Menu,
  X,
  Heart,
  Eye,
  Share2,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  MapPin,
  Layers,
  BookOpen,
  Folder,
  Star,
  TrendingUp,
  Calendar,
  FileText,
  Video,
  Headphones,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

// Types for culture content
interface CultureCard {
  id: string
  title: string
  description: string
  category: string
  region: string
  tags: string[]
  image: string
  readTime: string
  views: number
  likes: number
  publishedAt: string
  isLiked?: boolean
}

// Sample data
const cultureCards: CultureCard[] = [
  {
    id: "1",
    title: "探索日本茶道：传统文化的精髓与现代传承",
    description: "深入了解日本茶道的历史渊源、仪式流程和文化内涵，感受这一传统艺术形式在现代社会中的传承与发展...",
    category: "旅游文化",
    region: "日本",
    tags: ["日本", "传统文化"],
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=240&fit=crop",
    readTime: "5分钟阅读",
    views: 1200,
    likes: 89,
    publishedAt: "2天前",
  },
  {
    id: "2",
    title: "韩国K-POP文化现象：从本土到全球的音乐革命",
    description: "探索韩流音乐如何从韩国本土文化发展成为影响全球的文化现象，分析其背后的社会文化因素和商业模式...",
    category: "音乐文化",
    region: "韩国",
    tags: ["韩国", "流行音乐"],
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400&h=240&fit=crop",
    readTime: "8分钟阅读",
    views: 2800,
    likes: 234,
    publishedAt: "1周前",
    isLiked: true,
  },
  {
    id: "3",
    title: "法国香水文化：嗅觉艺术的历史与传承",
    description: "从路易十四时代到现代，法国香水工艺如何成为世界顶级奢侈品的代表，探索这一嗅觉艺术的文化内涵...",
    category: "历史文化",
    region: "法国",
    tags: ["法国", "奢侈品文化"],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=240&fit=crop",
    readTime: "12分钟阅读",
    views: 1800,
    likes: 156,
    publishedAt: "3天前",
  },
  {
    id: "4",
    title: "意大利美食文化：从地方特色到世界餐桌",
    description: "意大利各地区独特的美食传统如何形成，以及意式料理在全球化过程中的文化传播与本土化适应...",
    category: "美食文化",
    region: "意大利",
    tags: ["意大利", "美食"],
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=240&fit=crop",
    readTime: "6分钟阅读",
    views: 987,
    likes: 67,
    publishedAt: "1天前",
  },
  {
    id: "5",
    title: "德国啤酒文化：纯净法则下的传统工艺",
    description: "探索德国啤酒纯净法的历史由来，了解德式啤酒酿造工艺的文化传承，以及啤酒在德国社会生活中的重要地位...",
    category: "传统文化",
    region: "德国",
    tags: ["德国", "饮食文化"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=240&fit=crop",
    readTime: "10分钟阅读",
    views: 1500,
    likes: 123,
    publishedAt: "5天前",
  },
  {
    id: "6",
    title: "印度瑜伽文化：身心灵的古老智慧",
    description: "深入了解瑜伽作为印度古老文化瑰宝的历史演变，探索其哲学思想、修行体系以及在现代世界的传播与发展...",
    category: "精神文化",
    region: "印度",
    tags: ["印度", "哲学思想"],
    image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=400&h=240&fit=crop",
    readTime: "15分钟阅读",
    views: 3200,
    likes: 278,
    publishedAt: "1周前",
  },
]

const categories = [
  { name: "旅游文化", icon: "🗺️", count: 125 },
  { name: "电影文化", icon: "🎬", count: 89 },
  { name: "音乐文化", icon: "🎵", count: 76 },
  { name: "历史文化", icon: "📚", count: 102 },
]

const regions = [
  { name: "东亚", count: 163 },
  { name: "东南亚", count: 87 },
  { name: "欧洲", count: 145 },
  { name: "北美", count: 78 },
  { name: "南美", count: 34 },
  { name: "中东", count: 45 },
]

const hotRankings = [
  { rank: 1, title: "韩国泡菜制作工艺", views: "2.3k" },
  { rank: 2, title: "法国香水文化历史", views: "1.8k" },
  { rank: 3, title: "意大利歌剧艺术", views: "1.5k" },
]

export default function CultureWorldPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("推荐排序")
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [likedCards, setLikedCards] = useState<Set<string>>(new Set(["2"]))
  const [counters, setCounters] = useState({ regions: 0, content: 0, articles: 0 })

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedArticleTypes, setSelectedArticleTypes] = useState<string[]>([])
  const [selectedMediaTypes, setSelectedMediaTypes] = useState<string[]>([])
  const [selectedDuration, setSelectedDuration] = useState("")
  const [selectedTimeRange, setSelectedTimeRange] = useState("")

  // Counter animation effect
  useEffect(() => {
    const animateCounter = (target: number, key: keyof typeof counters, duration: number) => {
      let start = 0
      const increment = target / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= target) {
          setCounters((prev) => ({ ...prev, [key]: target }))
          clearInterval(timer)
        } else {
          setCounters((prev) => ({ ...prev, [key]: Math.floor(start) }))
        }
      }, 16)
    }

    const timer = setTimeout(() => {
      animateCounter(156, "regions", 1200)
      animateCounter(1234, "content", 1500)
      animateCounter(5678, "articles", 1800)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const toggleLike = (cardId: string) => {
    setLikedCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(cardId)) {
        newSet.delete(cardId)
      } else {
        newSet.add(cardId)
      }
      return newSet
    })
  }

  const filteredCards = cultureCards.filter((card) => {
    const matchesSearch =
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || card.category === selectedCategory
    const matchesRegion = !selectedRegion || card.region === selectedRegion
    return matchesSearch && matchesCategory && matchesRegion
  })

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-muted" onClick={() => setIsMobileSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold hidden md:block">语言探索</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="hover:text-primary transition-colors">
                首页
              </a>
              <a href="#" className="text-primary font-medium">
                文化世界
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                语言学习
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                我的
              </a>
            </div>

            {/* Search Icon (Mobile) */}
            <button className="md:hidden p-2 rounded-lg hover:bg-muted">
              <Search className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Page Title Section */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold font-serif text-primary mb-4">🌍 探索世界文化</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto text-balance">
            深入了解语言背后的文化魅力
          </p>

          {/* Statistics */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm md:text-base">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-accent" />
              <span className="text-muted-foreground">已收录</span>
              <span className="font-semibold text-primary">{counters.regions}</span>
              <span className="text-muted-foreground">个地区</span>
            </div>
            <div className="w-1 h-1 bg-muted rounded-full hidden md:block"></div>
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-accent" />
              <span className="font-semibold text-primary">{counters.content.toLocaleString()}</span>
              <span className="text-muted-foreground">类文化内容</span>
            </div>
            <div className="w-1 h-1 bg-muted rounded-full hidden md:block"></div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-accent" />
              <span className="font-semibold text-primary">{counters.articles.toLocaleString()}</span>
              <span className="text-muted-foreground">篇精选文章</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-6 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="搜索文化内容、地区或关键词..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 py-3 bg-card border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300"
              />
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {showAdvancedFilters && (
            <div className="max-w-4xl mx-auto mb-6 p-6 bg-card border border-border rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                高级筛选
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Region Filter */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center">
                    <Globe className="w-4 h-4 mr-2 text-primary" />
                    按地区分类
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {["东亚", "东南亚", "欧洲", "美洲", "中东", "非洲", "大洋洲"].map((region) => (
                      <div key={region} className="flex items-center space-x-2">
                        <Checkbox
                          id={`region-${region}`}
                          checked={selectedRegions.includes(region)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedRegions([...selectedRegions, region])
                            } else {
                              setSelectedRegions(selectedRegions.filter((r) => r !== region))
                            }
                          }}
                        />
                        <label htmlFor={`region-${region}`} className="text-sm cursor-pointer">
                          {region}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center">
                    <Folder className="w-4 h-4 mr-2 text-primary" />
                    按类型分类
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {["旅游", "电影", "音乐", "历史", "美食", "艺术", "节庆", "建筑"].map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCategories([...selectedCategories, category])
                            } else {
                              setSelectedCategories(selectedCategories.filter((c) => c !== category))
                            }
                          }}
                        />
                        <label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Format Filter */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-primary" />
                    按内容格式
                  </h4>
                  <div className="space-y-3">
                    {/* Article Types */}
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">文章类型</p>
                      <div className="space-y-1">
                        {["深度解析", "快速介绍", "实用指南"].map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                              id={`article-${type}`}
                              checked={selectedArticleTypes.includes(type)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedArticleTypes([...selectedArticleTypes, type])
                                } else {
                                  setSelectedArticleTypes(selectedArticleTypes.filter((t) => t !== type))
                                }
                              }}
                            />
                            <label htmlFor={`article-${type}`} className="text-sm cursor-pointer">
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Media Types */}
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">媒体类型</p>
                      <div className="space-y-1">
                        {[
                          { name: "图文", icon: FileText },
                          { name: "视频", icon: Video },
                          { name: "音频", icon: Headphones },
                        ].map((type) => (
                          <div key={type.name} className="flex items-center space-x-2">
                            <Checkbox
                              id={`media-${type.name}`}
                              checked={selectedMediaTypes.includes(type.name)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedMediaTypes([...selectedMediaTypes, type.name])
                                } else {
                                  setSelectedMediaTypes(selectedMediaTypes.filter((t) => t !== type.name))
                                }
                              }}
                            />
                            <label htmlFor={`media-${type.name}`} className="text-sm cursor-pointer flex items-center">
                              <type.icon className="w-3 h-3 mr-1" />
                              {type.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Duration Filter */}
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">长度筛选</p>
                      <select
                        value={selectedDuration}
                        onChange={(e) => setSelectedDuration(e.target.value)}
                        className="w-full px-2 py-1 text-sm bg-background border border-border rounded"
                      >
                        <option value="">全部长度</option>
                        <option value="short">5分钟内</option>
                        <option value="medium">5-15分钟</option>
                        <option value="long">15分钟以上</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Time Filter */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    按发布时间
                  </h4>
                  <div className="space-y-2">
                    {[
                      { value: "week", label: "最近一周" },
                      { value: "month", label: "最近一月" },
                      { value: "quarter", label: "最近三月" },
                      { value: "all", label: "全部时间" },
                    ].map((time) => (
                      <div key={time.value} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`time-${time.value}`}
                          name="timeRange"
                          value={time.value}
                          checked={selectedTimeRange === time.value}
                          onChange={(e) => setSelectedTimeRange(e.target.value)}
                          className="w-3 h-3"
                        />
                        <label htmlFor={`time-${time.value}`} className="text-sm cursor-pointer">
                          {time.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedRegions([])
                    setSelectedCategories([])
                    setSelectedArticleTypes([])
                    setSelectedMediaTypes([])
                    setSelectedDuration("")
                    setSelectedTimeRange("")
                  }}
                >
                  清除筛选
                </Button>
                <div className="text-sm text-muted-foreground">
                  已选择{" "}
                  {selectedRegions.length +
                    selectedCategories.length +
                    selectedArticleTypes.length +
                    selectedMediaTypes.length +
                    (selectedDuration ? 1 : 0) +
                    (selectedTimeRange ? 1 : 0)}{" "}
                  个筛选条件
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80 space-y-6">
            {/* Category Navigation - Always visible */}
            <Card className="cultural-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Folder className="w-5 h-5 mr-2 text-primary" />
                  按类型浏览
                </h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted cursor-pointer group transition-colors"
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{category.icon}</span>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground group-hover:text-primary">
                        ({category.count}篇)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Region Navigation - Always visible */}
            <Card className="cultural-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-primary" />
                  按地区浏览
                </h3>

                {/* World Map Placeholder */}
                <div className="bg-secondary/20 rounded-lg p-4 mb-4 text-center">
                  <div className="w-12 h-12 mx-auto text-primary mb-2 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <p className="text-sm text-muted-foreground">世界地图可视化</p>
                </div>

                {/* Region List */}
                <div className="space-y-2">
                  {regions.map((region) => (
                    <div
                      key={region.name}
                      className="flex items-center justify-between text-sm hover:text-primary cursor-pointer transition-colors"
                      onClick={() => setSelectedRegion(region.name)}
                    >
                      <span>• {region.name}</span>
                      <span className="text-muted-foreground">({region.count}篇)</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Featured Content */}
            <Card className="cultural-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-accent" />
                  编辑推荐
                </h3>
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=300&h=200&fit=crop"
                      alt="推荐文章"
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h4 className="font-medium text-sm">日本茶道文化探秘</h4>
                      <p className="text-xs opacity-90">传统与现代的完美融合</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hot Rankings */}
            <Card className="cultural-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-destructive" />
                  热门排行
                </h3>
                <div className="space-y-3">
                  {hotRankings.map((item) => (
                    <div key={item.rank} className="flex items-center space-x-3 text-sm">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          item.rank === 1
                            ? "bg-destructive text-destructive-foreground"
                            : item.rank === 2
                              ? "bg-accent text-accent-foreground"
                              : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {item.rank}
                      </span>
                      <span className="flex-1 hover:text-primary cursor-pointer">{item.title}</span>
                      <span className="text-muted-foreground">{item.views}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Content Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option>推荐排序</option>
                  <option>最新发布</option>
                  <option>最多阅读</option>
                  <option>最多收藏</option>
                </select>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                共找到 <span className="font-semibold text-foreground">{filteredCards.length}</span> 篇相关内容
              </div>
            </div>

            {/* Content Grid */}
            <div
              className={`grid gap-6 mb-8 ${
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {filteredCards.map((card, index) => (
                <article
                  key={card.id}
                  className="cultural-card bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 hover:scale-105 hover:shadow-xl"
                  style={{
                    opacity: 0,
                    transform: "translateY(30px)",
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`,
                  }}
                >
                  <div className="relative">
                    <img src={card.image || "/placeholder.svg"} alt={card.title} className="w-full h-48 object-cover" />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          card.category === "旅游文化"
                            ? "bg-primary text-primary-foreground"
                            : card.category === "音乐文化"
                              ? "bg-accent text-accent-foreground"
                              : card.category === "历史文化"
                                ? "bg-destructive text-destructive-foreground"
                                : card.category === "美食文化"
                                  ? "bg-secondary text-secondary-foreground"
                                  : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {card.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-full">{card.readTime}</span>
                    </div>
                    <button
                      className="absolute top-3 right-12 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all duration-150"
                      onClick={() => toggleLike(card.id)}
                    >
                      <Heart className={`w-4 h-4 ${likedCards.has(card.id) ? "fill-red-500 text-red-500" : ""}`} />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{card.title}</h3>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{card.description}</p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{card.views.toLocaleString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Heart className="w-3 h-3" />
                          <span>{card.likes}</span>
                        </span>
                        <span>{card.publishedAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button className="cultural-button">阅读全文</Button>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-2">
              <Button variant="ghost" size="sm" disabled>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button size="sm">1</Button>
              <Button variant="ghost" size="sm">
                2
              </Button>
              <Button variant="ghost" size="sm">
                3
              </Button>
              <Button variant="ghost" size="sm">
                4
              </Button>
              <Button variant="ghost" size="sm">
                5
              </Button>
              <Button variant="ghost" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden">
        <div className="flex items-center justify-around py-2">
          <a href="#" className="flex flex-col items-center space-y-1 p-2 text-muted-foreground">
            <div className="w-5 h-5 flex items-center justify-center">🏠</div>
            <span className="text-xs">首页</span>
          </a>
          <a href="#" className="flex flex-col items-center space-y-1 p-2 text-primary">
            <Globe className="w-5 h-5" />
            <span className="text-xs">文化</span>
          </a>
          <a href="#" className="flex flex-col items-center space-y-1 p-2 text-muted-foreground">
            <BookOpen className="w-5 h-5" />
            <span className="text-xs">学习</span>
          </a>
          <a href="#" className="flex flex-col items-center space-y-1 p-2 text-muted-foreground">
            <div className="w-5 h-5 flex items-center justify-center">👤</div>
            <span className="text-xs">我的</span>
          </a>
        </div>
      </nav>

      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileSidebarOpen(false)}></div>
          <div className="fixed left-0 top-0 bottom-0 w-80 max-w-sm bg-background border-r border-border transform transition-transform duration-300">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">导航浏览</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsMobileSidebarOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="p-4 space-y-6 overflow-y-auto">
              {/* Category Navigation */}
              <div>
                <h3 className="font-medium mb-3 flex items-center">
                  <Folder className="w-4 h-4 mr-2 text-primary" />
                  按类型浏览
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted cursor-pointer"
                      onClick={() => {
                        setSelectedCategory(category.name)
                        setIsMobileSidebarOpen(false)
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{category.icon}</span>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({category.count}篇)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Region Navigation */}
              <div>
                <h3 className="font-medium mb-3 flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-primary" />
                  按地区浏览
                </h3>
                <div className="space-y-2">
                  {regions.map((region) => (
                    <div
                      key={region.name}
                      className="flex items-center justify-between text-sm hover:text-primary cursor-pointer transition-colors p-2 rounded hover:bg-muted"
                      onClick={() => {
                        setSelectedRegion(region.name)
                        setIsMobileSidebarOpen(false)
                      }}
                    >
                      <span>• {region.name}</span>
                      <span className="text-muted-foreground">({region.count}篇)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

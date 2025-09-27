"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { Search, Filter, Grid, List, ChevronDown, Brain, Globe, Users, Clock, Sparkles, BarChart3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import type { Language, LanguageCategory, WritingSystem, CulturalRegion } from "@/lib/types"

// 模拟语言数据 - 基于新的数据结构
const mockLanguages: Language[] = [
  {
    id: "japanese",
    flag: "🇯🇵",
    name: "日语",
    nameEn: "Japanese",
    nativeName: "日本語",
    description: "东亚文化圈核心语言，拥有丰富的文化内涵和现代应用价值",
    category: "cultural",
    writingSystem: ["japanese"],
    speakers: { native: 125000000, total: 130000000, countries: ["日本", "巴西"] },
    regions: [{ code: "JP", name: "日本", primaryLanguage: true }],
    culturalInfo: {
      history: "拥有千年历史的语言文化传统",
      traditions: ["茶道", "花道", "武道"],
      festivals: ["樱花节", "新年"],
      cuisine: ["寿司", "拉面"],
      arts: ["浮世绘", "俳句"],
      literature: ["源氏物语"],
      modernCulture: ["动漫", "J-pop"]
    },
    resources: [],
    tags: ["文化", "动漫", "商务"],
    metadata: { iso639_1: "ja", iso639_2: "jpn", family: "日语语系", order: 1, featured: true, lastUpdated: new Date() },
    profile: {
      linguisticFamily: { family: "日语语系", isIsolate: true, familyCode: "JP" },
      writingSystem: { primaryType: "mixed", scripts: ["hiragana", "katakana", "kanji"], characterCount: 3000, direction: "ltr", complexity: 4 },
      grammar: { wordOrder: "SOV", features: { tenseCount: 2, caseCount: 0, genderCount: 0, hasAspect: true, hasEvidentiality: false, agglutination: 3 }, complexity: 3 },
      phonetics: { isTonal: false, phoneCount: 15, hasDifficultSounds: ["r"], complexity: 2 },
      culture: { formalityLevels: 5, culturalRegion: "east_asia" }
    },
    dynamicDifficulty: { baseDifficulty: 3.5, difficultyFactors: { familyWeight: 0.3, writingWeight: 0.25, grammarWeight: 0.2, phoneticWeight: 0.15, culturalWeight: 0.1 } },
    learningTimeMatrix: { baseHours: { beginner: 480, intermediate: 960, advanced: 1440 }, timeModifiers: { intensiveBonus: 0.7, casualPenalty: 1.3, experienceBonus: 0.8, immersionBonus: 0.6 } }
  },
  {
    id: "korean",
    flag: "🇰🇷",
    name: "韩语",
    nameEn: "Korean",
    nativeName: "한국어",
    description: "朝鲜半岛语言，拥有独特的表音文字系统和丰富的现代文化",
    category: "popular",
    writingSystem: ["korean"],
    speakers: { native: 77000000, total: 82000000, countries: ["韩国", "朝鲜"] },
    regions: [{ code: "KR", name: "韩国", primaryLanguage: true }],
    culturalInfo: {
      history: "具有悠久历史的朝鲜半岛语言",
      traditions: ["韩服", "传统舞蹈"],
      festivals: ["春节", "中秋节"],
      cuisine: ["韩式烧烤", "泡菜"],
      arts: ["K-pop", "韩剧"],
      literature: ["古典诗歌"],
      modernCulture: ["韩流", "电竞"]
    },
    resources: [],
    tags: ["K-pop", "韩流", "商务"],
    metadata: { iso639_1: "ko", iso639_2: "kor", family: "朝鲜语系", order: 2, featured: true, lastUpdated: new Date() },
    profile: {
      linguisticFamily: { family: "朝鲜语系", isIsolate: true, familyCode: "KO" },
      writingSystem: { primaryType: "alphabetic", scripts: ["hangul"], characterCount: 40, direction: "ltr", complexity: 2 },
      grammar: { wordOrder: "SOV", features: { tenseCount: 3, caseCount: 7, genderCount: 0, hasAspect: false, hasEvidentiality: false, agglutination: 4 }, complexity: 3 },
      phonetics: { isTonal: false, phoneCount: 19, hasDifficultSounds: ["ㅓ", "ㅡ"], complexity: 2 },
      culture: { formalityLevels: 6, culturalRegion: "east_asia" }
    },
    dynamicDifficulty: { baseDifficulty: 3.0, difficultyFactors: { familyWeight: 0.3, writingWeight: 0.25, grammarWeight: 0.2, phoneticWeight: 0.15, culturalWeight: 0.1 } },
    learningTimeMatrix: { baseHours: { beginner: 400, intermediate: 800, advanced: 1200 }, timeModifiers: { intensiveBonus: 0.7, casualPenalty: 1.3, experienceBonus: 0.8, immersionBonus: 0.6 } }
  },
  {
    id: "spanish",
    flag: "🇪🇸",
    name: "西班牙语",
    nameEn: "Spanish",
    nativeName: "Español",
    description: "全球第二大母语语言，拉丁美洲和西班牙的官方语言",
    category: "popular",
    writingSystem: ["latin"],
    speakers: { native: 500000000, total: 580000000, countries: ["西班牙", "墨西哥", "阿根廷"] },
    regions: [{ code: "ES", name: "西班牙", primaryLanguage: true }],
    culturalInfo: {
      history: "源于伊比利亚半岛，随着殖民扩张传播至全球",
      traditions: ["弗拉门戈", "斗牛"],
      festivals: ["圣费明节", "复活节"],
      cuisine: ["海鲜饭", "塔帕斯"],
      arts: ["毕加索", "高迪建筑"],
      literature: ["堂吉诃德"],
      modernCulture: ["拉丁音乐", "足球"]
    },
    resources: [],
    tags: ["商务", "旅游", "全球通用"],
    metadata: { iso639_1: "es", iso639_2: "spa", family: "印欧语系", order: 3, featured: true, lastUpdated: new Date() },
    profile: {
      linguisticFamily: { family: "印欧语系", branch: "罗曼语族", familyCode: "IE" },
      writingSystem: { primaryType: "alphabetic", scripts: ["latin"], characterCount: 27, direction: "ltr", complexity: 1 },
      grammar: { wordOrder: "SVO", features: { tenseCount: 14, caseCount: 0, genderCount: 2, hasAspect: true, hasEvidentiality: false, agglutination: 1 }, complexity: 2 },
      phonetics: { isTonal: false, phoneCount: 24, hasDifficultSounds: ["rr"], complexity: 1 },
      culture: { formalityLevels: 2, culturalRegion: "europe" }
    },
    dynamicDifficulty: { baseDifficulty: 2.0, difficultyFactors: { familyWeight: 0.3, writingWeight: 0.25, grammarWeight: 0.2, phoneticWeight: 0.15, culturalWeight: 0.1 } },
    learningTimeMatrix: { baseHours: { beginner: 240, intermediate: 480, advanced: 720 }, timeModifiers: { intensiveBonus: 0.7, casualPenalty: 1.3, experienceBonus: 0.8, immersionBonus: 0.6 } }
  }
]

interface LanguageFilters {
  search: string
  category: LanguageCategory | "all"
  difficulty: "all" | "1-2" | "3" | "4-5"
  region: CulturalRegion | "all"
  sortBy: "name" | "difficulty" | "speakers" | "complexity"
}

export default function LanguagesPage() {
  const [filters, setFilters] = useState<LanguageFilters>({
    search: "",
    category: "all",
    difficulty: "all",
    region: "all",
    sortBy: "name"
  })
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredLanguages = useMemo(() => {
    let filtered = mockLanguages.filter(language => {
      // 搜索过滤
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchName = language.name.toLowerCase().includes(searchLower) ||
                         language.nameEn.toLowerCase().includes(searchLower) ||
                         language.nativeName.toLowerCase().includes(searchLower)
        const matchTags = language.tags.some(tag => tag.toLowerCase().includes(searchLower))
        if (!matchName && !matchTags) return false
      }

      // 类别过滤
      if (filters.category !== "all" && language.category !== filters.category) {
        return false
      }

      // 难度过滤
      if (filters.difficulty !== "all") {
        const difficulty = language.dynamicDifficulty.baseDifficulty
        switch (filters.difficulty) {
          case "1-2":
            if (difficulty > 2.5) return false
            break
          case "3":
            if (difficulty < 2.5 || difficulty > 3.5) return false
            break
          case "4-5":
            if (difficulty < 3.5) return false
            break
        }
      }

      // 地区过滤
      if (filters.region !== "all" && language.profile.culture.culturalRegion !== filters.region) {
        return false
      }

      return true
    })

    // 排序
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "name":
          return a.name.localeCompare(b.name, "zh-CN")
        case "difficulty":
          return a.dynamicDifficulty.baseDifficulty - b.dynamicDifficulty.baseDifficulty
        case "speakers":
          return b.speakers.total - a.speakers.total
        case "complexity":
          return a.profile.grammar.complexity - b.profile.grammar.complexity
        default:
          return 0
      }
    })

    return filtered
  }, [filters])

  // 语言卡片组件
  const LanguageCard = ({ language }: { language: Language }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{language.flag}</div>
            <div>
              <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                {language.name}
              </h3>
              <p className="text-sm text-muted-foreground">{language.nativeName}</p>
            </div>
          </div>
          <Badge variant={language.metadata.featured ? "default" : "secondary"}>
            {language.metadata.featured ? "精选" : language.category}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {language.description}
        </p>

        {/* 语言特征 */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">基础难度:</span>
              <span className="font-medium">{language.dynamicDifficulty.baseDifficulty.toFixed(1)}/5</span>
            </div>
            <Progress value={language.dynamicDifficulty.baseDifficulty * 20} className="h-1" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">语法复杂度:</span>
              <span className="font-medium">{language.profile.grammar.complexity}/5</span>
            </div>
            <Progress value={language.profile.grammar.complexity * 20} className="h-1" />
          </div>
        </div>

        {/* 语言档案信息 */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-muted-foreground">语系:</span>
            <span className="ml-1 font-medium">{language.profile.linguisticFamily.family}</span>
          </div>
          <div>
            <span className="text-muted-foreground">文字:</span>
            <span className="ml-1 font-medium">{language.profile.writingSystem.primaryType}</span>
          </div>
          <div>
            <span className="text-muted-foreground">语序:</span>
            <span className="ml-1 font-medium">{language.profile.grammar.wordOrder}</span>
          </div>
          <div>
            <span className="text-muted-foreground">使用者:</span>
            <span className="ml-1 font-medium">{(language.speakers.total / 1000000).toFixed(0)}M</span>
          </div>
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-1">
          {language.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* 学习时间估算 */}
        <div className="pt-2 border-t">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">预计学习时间:</span>
            <div className="text-right">
              <div className="font-medium">{language.learningTimeMatrix.baseHours.beginner}小时至初级</div>
              <div className="text-xs text-muted-foreground">{language.learningTimeMatrix.baseHours.intermediate}小时至中级</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 via-white to-teal-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <Badge className="mx-auto bg-purple-100 text-purple-700 border-purple-200">
                  <Brain className="h-3 w-3 mr-1" />
                  AI智能语言推荐
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text leading-tight">
                  基于语言学的智能推荐
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  探索 {mockLanguages.length} 种语言的详细语言学档案，AI算法为您计算个性化学习难度
                </p>
              </div>

              {/* 特色功能 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">难度分析</h3>
                  <p className="text-sm text-muted-foreground">基于语系关系的动态难度计算</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold">文化匹配</h3>
                  <p className="text-sm text-muted-foreground">精确的文化距离和兴趣匹配</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-purple-100 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold">时间预估</h3>
                  <p className="text-sm text-muted-foreground">基于学习方式的精确时间估算</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-orange-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold">个性化</h3>
                  <p className="text-sm text-muted-foreground">基于个人背景的定制推荐</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-background border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="搜索语言名称、标签..."
                    className="pl-10"
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-center">
                <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value as any }))}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="语言类别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有类别</SelectItem>
                    <SelectItem value="popular">热门语言</SelectItem>
                    <SelectItem value="business">商务语言</SelectItem>
                    <SelectItem value="cultural">文化语言</SelectItem>
                    <SelectItem value="niche">小众语言</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.difficulty} onValueChange={(value) => setFilters(prev => ({ ...prev, difficulty: value as any }))}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="基础难度" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有难度</SelectItem>
                    <SelectItem value="1-2">简单 (1-2.5)</SelectItem>
                    <SelectItem value="3">中等 (2.5-3.5)</SelectItem>
                    <SelectItem value="4-5">困难 (3.5-5)</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.region} onValueChange={(value) => setFilters(prev => ({ ...prev, region: value as any }))}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="文化区域" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有区域</SelectItem>
                    <SelectItem value="east_asia">东亚</SelectItem>
                    <SelectItem value="europe">欧洲</SelectItem>
                    <SelectItem value="latin_america">拉丁美洲</SelectItem>
                    <SelectItem value="middle_east">中东</SelectItem>
                    <SelectItem value="south_asia">南亚</SelectItem>
                    <SelectItem value="southeast_asia">东南亚</SelectItem>
                    <SelectItem value="africa">非洲</SelectItem>
                    <SelectItem value="north_america">北美</SelectItem>
                  </SelectContent>
                </Select>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>排序方式</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setFilters(prev => ({ ...prev, sortBy: "name" }))}>
                      按名称排序
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilters(prev => ({ ...prev, sortBy: "difficulty" }))}>
                      按难度排序
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilters(prev => ({ ...prev, sortBy: "speakers" }))}>
                      按使用人数排序
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilters(prev => ({ ...prev, sortBy: "complexity" }))}>
                      按语法复杂度排序
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setFilters({
                      search: "",
                      category: "all",
                      difficulty: "all",
                      region: "all",
                      sortBy: "name"
                    })}>
                      重置所有筛选
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </section>

        {/* Results Summary */}
        <section className="py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                显示 <span className="font-medium text-foreground">{filteredLanguages.length}</span> 种语言
                {filters.search || filters.category !== "all" || filters.difficulty !== "all" || filters.region !== "all" ? (
                  <span className="ml-2">
                    (共 {mockLanguages.length} 种语言)
                  </span>
                ) : null}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">视图:</span>
                <Button
                  variant={viewMode === "grid" ? "outline" : "ghost"}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "outline" : "ghost"}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Language Grid/List */}
        <section className="pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {filteredLanguages.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">未找到匹配的语言</h3>
                <p className="text-muted-foreground mb-4">请尝试调整搜索条件或筛选器</p>
                <Button
                  variant="outline"
                  onClick={() => setFilters({
                    search: "",
                    category: "all",
                    difficulty: "all",
                    region: "all",
                    sortBy: "name"
                  })}
                >
                  重置筛选器
                </Button>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
                {filteredLanguages.map((language) => (
                  <LanguageCard key={language.id} language={language} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="max-w-4xl mx-auto border-0 shadow-lg">
              <CardContent className="p-12 text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                  让AI为您找到最适合的语言
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  通过我们基于语言学的个性化AI评估，获得专属的语言学习推荐，包括个性化难度计算和精准学习路径
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto my-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">5维度</div>
                    <div className="text-sm text-muted-foreground">语言特征分析</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">个性化</div>
                    <div className="text-sm text-muted-foreground">难度计算</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">精准</div>
                    <div className="text-sm text-muted-foreground">时间预估</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-gradient px-8" asChild>
                    <a href="/survey">开始AI个性化评估</a>
                  </Button>
                  <Button variant="outline" size="lg" className="px-8" asChild>
                    <a href="/recommendation">查看推荐算法</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
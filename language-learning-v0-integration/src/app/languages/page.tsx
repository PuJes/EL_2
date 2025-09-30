"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, Users, Heart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { languages } from "@/lib/data/languages"
import type { Language } from "@/types"

const regions = ["全部地区", "东亚", "东南亚", "欧洲", "北美洲", "南美洲", "中美洲", "中东", "北非", "大洋洲"]
const families = ["全部语族", "汉藏语系", "印欧语系", "日语族", "朝鲜语族", "闪米特语族", "其他语系"]
const difficulties = ["全部难度", "简单 ⭐", "中等 ⭐⭐", "困难 ⭐⭐⭐", "很难 ⭐⭐⭐⭐", "极难 ⭐⭐⭐⭐⭐"]
const categories = ["全部类型", "热门语言", "文化语言", "商务语言", "新兴语言"]
const sortOptions = ["使用人数排序", "学习难度排序", "字母顺序排序", "学习时长排序"]

export default function LanguageListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("全部地区")
  const [selectedFamily, setSelectedFamily] = useState("全部语族")
  const [selectedDifficulty, setSelectedDifficulty] = useState("全部难度")
  const [selectedCategory, setSelectedCategory] = useState("全部类型")
  const [sortBy, setSortBy] = useState("使用人数排序")
  const [favorites, setFavorites] = useState<string[]>([])

  const filteredLanguages = useMemo(() => {
    return languages
      .filter((lang: Language) => {
        const matchesSearch =
          searchTerm === "" ||
          lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lang.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lang.regions.some((region) => region.toLowerCase().includes(searchTerm.toLowerCase())) ||
          lang.family.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lang.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (lang.usage && lang.usage.some((usage) => usage.toLowerCase().includes(searchTerm.toLowerCase()))) ||
          (lang.resources && lang.resources.some((resource) => resource.toLowerCase().includes(searchTerm.toLowerCase())))

        const matchesRegion = selectedRegion === "全部地区" || lang.regions.includes(selectedRegion)

        const matchesFamily =
          selectedFamily === "全部语族" || lang.family.includes(selectedFamily.replace("语系", "").replace("语族", ""))

        const matchesDifficulty =
          selectedDifficulty === "全部难度" ||
          (selectedDifficulty.includes("⭐") && lang.difficulty === selectedDifficulty.split(" ")[1].length)

        const matchesCategory =
          selectedCategory === "全部类型" ||
          (selectedCategory === "热门语言" && lang.category === "popular") ||
          (selectedCategory === "文化语言" && lang.category === "cultural") ||
          (selectedCategory === "商务语言" && lang.category === "business") ||
          (selectedCategory === "新兴语言" && lang.category === "emerging")

        return matchesSearch && matchesRegion && matchesFamily && matchesDifficulty && matchesCategory
      })
      .sort((a: Language, b: Language) => {
        switch (sortBy) {
          case "使用人数排序":
            return (b.speakers?.total || 0) - (a.speakers?.total || 0)
          case "学习难度排序":
            return a.difficulty - b.difficulty
          case "字母顺序排序":
            return a.name.localeCompare(b.name)
          case "学习时长排序":
            const getStudyTimeHours = (timeStr: string): number => {
              if (!timeStr) return 0
              const match = timeStr.match(/(\d+)/)
              return match ? parseInt(match[1]) : 0
            }
            return getStudyTimeHours(a.studyTime || "") - getStudyTimeHours(b.studyTime || "")
          default:
            return 0
        }
      })
  }, [searchTerm, selectedRegion, selectedFamily, selectedDifficulty, selectedCategory, sortBy])

  const toggleFavorite = (languageId: string) => {
    setFavorites((prev) => (prev.includes(languageId) ? prev.filter((id) => id !== languageId) : [...prev, languageId]))
  }

  const getDifficultyStars = (difficulty: number) => {
    return "⭐".repeat(difficulty)
  }

  const formatSpeakers = (count: number) => {
    if (count >= 1000000000) {
      return `${(count / 1000000000).toFixed(1)}亿`
    } else if (count >= 100000000) {
      return `${(count / 100000000).toFixed(1)}亿`
    } else if (count >= 10000000) {
      return `${(count / 10000000).toFixed(0)}千万`
    } else if (count >= 1000000) {
      return `${(count / 1000000).toFixed(0)}百万`
    }
    return count.toString()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header with gradient background */}
      <div className="gradient-purple-teal text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <h1 className="font-bold text-balance text-4xl">探索世界语言</h1>
            <h2 className="font-bold text-balance text-2xl">发现语言</h2>
            <p className="text-white/90 max-w-2xl mx-auto text-pretty text-xl">发现适合您的语言，开启文化探索之旅</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="搜索语言名称、国家、语族、用途、资源..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filter Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="按地区筛选" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedFamily} onValueChange={setSelectedFamily}>
                <SelectTrigger>
                  <SelectValue placeholder="按语言家族筛选" />
                </SelectTrigger>
                <SelectContent>
                  {families.map((family) => (
                    <SelectItem key={family} value={family}>
                      {family}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="按学习难度筛选" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="按类型筛选" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filter Results */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>显示 {filteredLanguages.length} 种语言</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedRegion("全部地区")
                  setSelectedFamily("全部语族")
                  setSelectedDifficulty("全部难度")
                  setSelectedCategory("全部类型")
                }}
              >
                清除筛选
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Language Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredLanguages.map((language: Language) => (
            <Card key={language.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{language.flag}</span>
                    <div>
                      <h3 className="text-xl font-semibold">{language.name}</h3>
                      <p className="text-muted-foreground">{language.nativeName}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(language.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart
                      className={`w-4 h-4 ${favorites.includes(language.id) ? "fill-red-500 text-red-500" : ""}`}
                    />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Key Data */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>全球 {formatSpeakers(language.speakers?.total || 0)} 人使用</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {language.regions.map((region) => (
                      <Badge key={region} variant="secondary" className="text-xs">
                        {region}
                      </Badge>
                    ))}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {language.family}
                  </Badge>
                </div>

                <Separator />

                {/* Learning Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>学习难度</span>
                    <span>{getDifficultyStars(language.difficulty)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>预估学习时长</span>
                    <span className="text-primary font-medium">{language.studyTime || "未知"}</span>
                  </div>
                </div>

                <Separator />

                {/* Culture and Usage */}
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">使用场景</p>
                    <div className="flex flex-wrap gap-1">
                      {language.usage?.map((item) => (
                        <Badge key={item} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">学习资源</p>
                    <div className="flex flex-wrap gap-1">
                      {language.resources?.slice(0, 2).map((item) => (
                        <Badge key={item} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Link href={`/languages/${language.id}`} className="flex-1">
                    <Button className="flex-1 w-full" size="sm">
                      了解详情
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
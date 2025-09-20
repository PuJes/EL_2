"use client"

import { useState, useMemo } from "react"
import { Search, Users, Star, Heart, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Mock data for languages
const languages = [
  {
    id: 1,
    name: "英语",
    nativeName: "English",
    code: "en",
    flag: "🇺🇸",
    speakers: "15亿",
    regions: ["北美", "欧洲", "大洋洲"],
    family: "印欧语系",
    difficulty: 2,
    studyTime: "6个月",
    match: 85,
    culture: ["商务通用", "科技前沿", "文化多元"],
    usage: ["商务", "旅游", "学术"],
    resources: ["教材丰富", "在线课程", "语言交换"],
  },
  {
    id: 2,
    name: "日语",
    nativeName: "日本語",
    code: "ja",
    flag: "🇯🇵",
    speakers: "1.25亿",
    regions: ["东亚"],
    family: "日语族",
    difficulty: 4,
    studyTime: "18个月",
    match: 78,
    culture: ["传统文化", "动漫文化", "精工制造"],
    usage: ["文化", "商务", "娱乐"],
    resources: ["动漫资源", "文化体验", "在线课程"],
  },
  {
    id: 3,
    name: "法语",
    nativeName: "Français",
    code: "fr",
    flag: "🇫🇷",
    speakers: "2.8亿",
    regions: ["欧洲", "非洲", "北美"],
    family: "印欧语系",
    difficulty: 3,
    studyTime: "12个月",
    match: 72,
    culture: ["浪漫文化", "美食艺术", "时尚前沿"],
    usage: ["文化", "旅游", "外交"],
    resources: ["文学作品", "电影资源", "语言学校"],
  },
  {
    id: 4,
    name: "德语",
    nativeName: "Deutsch",
    code: "de",
    flag: "🇩🇪",
    speakers: "1.3亿",
    regions: ["欧洲"],
    family: "印欧语系",
    difficulty: 3,
    studyTime: "14个月",
    match: 68,
    culture: ["工程技术", "哲学思辨", "音乐艺术"],
    usage: ["学术", "商务", "技术"],
    resources: ["技术文档", "学术资源", "在线平台"],
  },
  {
    id: 5,
    name: "西班牙语",
    nativeName: "Español",
    code: "es",
    flag: "🇪🇸",
    speakers: "5亿",
    regions: ["欧洲", "南美", "北美"],
    family: "印欧语系",
    difficulty: 2,
    studyTime: "8个月",
    match: 82,
    culture: ["热情奔放", "足球文化", "艺术传统"],
    usage: ["旅游", "商务", "文化"],
    resources: ["影视资源", "音乐文化", "语言交换"],
  },
  {
    id: 6,
    name: "韩语",
    nativeName: "한국어",
    code: "ko",
    flag: "🇰🇷",
    speakers: "7700万",
    regions: ["东亚"],
    family: "朝鲜语族",
    difficulty: 4,
    studyTime: "16个月",
    match: 75,
    culture: ["流行文化", "科技创新", "传统礼仪"],
    usage: ["娱乐", "商务", "文化"],
    resources: ["K-pop资源", "韩剧学习", "在线课程"],
  },
]

const regions = ["全部地区", "东亚", "东南亚", "欧洲", "北美", "南美", "中东", "非洲", "大洋洲"]
const families = ["全部语族", "汉藏语系", "印欧语系", "阿尔泰语系", "南岛语系", "亚非语系", "其他语系"]
const difficulties = ["全部难度", "简单 ⭐", "中等 ⭐⭐", "困难 ⭐⭐⭐", "极难 ⭐⭐⭐⭐"]
const speakerRanges = ["全部范围", "1亿人以上", "1000万-1亿人", "100万-1000万人", "100万人以下"]
const sortOptions = ["推荐度排序", "使用人数排序", "学习难度排序", "字母顺序排序"]

export default function LanguageListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("全部地区")
  const [selectedFamily, setSelectedFamily] = useState("全部语族")
  const [selectedDifficulty, setSelectedDifficulty] = useState("全部难度")
  const [selectedSpeakerRange, setSelectedSpeakerRange] = useState("全部范围")
  const [sortBy, setSortBy] = useState("推荐度排序")
  const [comparedLanguages, setComparedLanguages] = useState<number[]>([])
  const [favorites, setFavorites] = useState<number[]>([])

  const filteredLanguages = useMemo(() => {
    return languages
      .filter((lang) => {
        const matchesSearch =
          searchTerm === "" ||
          lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lang.regions.some((region) => region.toLowerCase().includes(searchTerm.toLowerCase()))

        const matchesRegion = selectedRegion === "全部地区" || lang.regions.includes(selectedRegion)

        const matchesFamily =
          selectedFamily === "全部语族" || lang.family.includes(selectedFamily.replace("语系", "").replace("语族", ""))

        const matchesDifficulty =
          selectedDifficulty === "全部难度" ||
          (selectedDifficulty.includes("⭐") && lang.difficulty === selectedDifficulty.split(" ")[1].length)

        return matchesSearch && matchesRegion && matchesFamily && matchesDifficulty
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "推荐度排序":
            return b.match - a.match
          case "使用人数排序":
            return Number.parseFloat(b.speakers) - Number.parseFloat(a.speakers)
          case "学习难度排序":
            return a.difficulty - b.difficulty
          case "字母顺序排序":
            return a.name.localeCompare(b.name)
          default:
            return 0
        }
      })
  }, [searchTerm, selectedRegion, selectedFamily, selectedDifficulty, selectedSpeakerRange, sortBy])

  const toggleComparison = (languageId: number) => {
    setComparedLanguages((prev) =>
      prev.includes(languageId)
        ? prev.filter((id) => id !== languageId)
        : prev.length < 3
          ? [...prev, languageId]
          : prev,
    )
  }

  const toggleFavorite = (languageId: number) => {
    setFavorites((prev) => (prev.includes(languageId) ? prev.filter((id) => id !== languageId) : [...prev, languageId]))
  }

  const getDifficultyStars = (difficulty: number) => {
    return "⭐".repeat(difficulty)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Header with gradient background */}
      <div className="gradient-purple-teal text-white">
        <div className="container mx-auto px-4 py-16 leading-4">
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
                  placeholder="搜索语言名称或国家..."
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
                  setSelectedSpeakerRange("全部范围")
                }}
              >
                清除筛选
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Language Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredLanguages.map((language) => (
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
                    <span>全球 {language.speakers} 人使用</span>
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
                    <span className="text-primary font-medium">{language.studyTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>推荐度</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-primary font-medium">{language.match}%</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Culture and Usage */}
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">文化亮点</p>
                    <div className="flex flex-wrap gap-1">
                      {language.culture.slice(0, 2).map((item) => (
                        <Badge key={item} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">使用场景</p>
                    <div className="flex flex-wrap gap-1">
                      {language.usage.map((item) => (
                        <Badge key={item} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1" size="sm">
                    了解详情
                  </Button>
                  <Button
                    variant={comparedLanguages.includes(language.id) ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => toggleComparison(language.id)}
                    disabled={!comparedLanguages.includes(language.id) && comparedLanguages.length >= 3}
                  >
                    {comparedLanguages.includes(language.id) ? (
                      <>
                        <X className="w-4 h-4 mr-1" />
                        取消对比
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-1" />
                        添加对比
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Bar */}
        {comparedLanguages.length > 0 && (
          <Card className="fixed bottom-0 left-0 right-0 z-50 rounded-none border-t">
            <CardContent className="py-4">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h3 className="font-semibold">语言对比 ({comparedLanguages.length}/3)</h3>
                    <div className="flex gap-2">
                      {comparedLanguages.map((id) => {
                        const lang = languages.find((l) => l.id === id)
                        return lang ? (
                          <Badge key={id} variant="secondary" className="flex items-center gap-1">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 ml-1"
                              onClick={() => toggleComparison(id)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </Badge>
                        ) : null
                      })}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button disabled={comparedLanguages.length < 2} className="gradient-purple-teal text-white">
                      开始对比
                    </Button>
                    <Button variant="outline" onClick={() => setComparedLanguages([])}>
                      清空对比
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  )
}

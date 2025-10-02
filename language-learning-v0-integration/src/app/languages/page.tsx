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
import { useTranslation } from "@/hooks/useTranslation"
import { getLocalizedLanguages, type LocalizedLanguage } from "@/lib/utils/i18n-data"

export default function LanguageListPage() {
  const { t, locale } = useTranslation()
  const localizedLanguages = useMemo(() => getLocalizedLanguages(languages, locale), [locale])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedFamily, setSelectedFamily] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [sortBy, setSortBy] = useState("speakers")
  const [favorites, setFavorites] = useState<string[]>([])

  // Extract unique regions and families from localized data
  const uniqueRegions = useMemo(() => {
    const regionsSet = new Set<string>()
    localizedLanguages.forEach((lang: LocalizedLanguage) => {
      lang.regions.forEach((region: string) => regionsSet.add(region))
    })
    return Array.from(regionsSet).sort()
  }, [localizedLanguages])

  const uniqueFamilies = useMemo(() => {
    const familiesSet = new Set<string>()
    localizedLanguages.forEach((lang: LocalizedLanguage) => {
      familiesSet.add(lang.family)
    })
    return Array.from(familiesSet).sort()
  }, [localizedLanguages])

  const filteredLanguages = useMemo(() => {
    return localizedLanguages
      .filter((lang: LocalizedLanguage) => {
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

        const matchesRegion = selectedRegion === "all" || lang.regions.includes(selectedRegion)

        const matchesFamily =
          selectedFamily === "all" || lang.family.includes(selectedFamily.replace("语系", "").replace("语族", ""))

        const matchesDifficulty =
          selectedDifficulty === "all" || lang.difficulty === parseInt(selectedDifficulty)

        return matchesSearch && matchesRegion && matchesFamily && matchesDifficulty
      })
      .sort((a: LocalizedLanguage, b: LocalizedLanguage) => {
        if (sortBy === "speakers") {
          return (b.speakers?.total || 0) - (a.speakers?.total || 0)
        } else if (sortBy === "difficulty") {
          return a.difficulty - b.difficulty
        }
        return (b.speakers?.total || 0) - (a.speakers?.total || 0)
      })
  }, [localizedLanguages, searchTerm, selectedRegion, selectedFamily, selectedDifficulty, sortBy])

  const toggleFavorite = (languageId: string) => {
    setFavorites((prev) => (prev.includes(languageId) ? prev.filter((id) => id !== languageId) : [...prev, languageId]))
  }

  const getDifficultyStars = (difficulty: number) => {
    return "⭐".repeat(difficulty)
  }

  const formatSpeakers = (count: number) => {
    // 1亿以上，显示为X.X亿（中文的"亿"是10^8，即100,000,000）
    if (count >= 100000000) {
      const yi = count / 100000000
      // 如果是整数亿，不显示小数点
      return yi % 1 === 0 ? `${yi.toFixed(0)}亿` : `${yi.toFixed(1)}亿`
    }
    // 1千万以上，显示为XX千万
    else if (count >= 10000000) {
      const tenMillions = count / 10000000
      return `${tenMillions.toFixed(0)}千万`
    }
    // 100万以上，显示为XXX百万
    else if (count >= 1000000) {
      const millions = count / 1000000
      return `${millions.toFixed(0)}百万`
    }
    return count.toString()
  }

  return (
    <div className="min-h-screen bg-background" key={locale}>
      <Header />

      {/* Header with gradient background */}
      <div className="gradient-purple-teal text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <h1 className="font-bold text-balance text-4xl">{t.languageList.pageTitle}</h1>
            <h2 className="font-bold text-balance text-2xl">{t.languageList.pageSubtitle}</h2>
            <p className="text-white/90 max-w-2xl mx-auto text-pretty text-xl">{t.languageList.pageDescription}</p>
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
                  placeholder={t.languageList.searchPlaceholder}
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
                  <SelectValue placeholder={t.languageList.filterByRegion} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.languageList.allRegions}</SelectItem>
                  {uniqueRegions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedFamily} onValueChange={setSelectedFamily}>
                <SelectTrigger>
                  <SelectValue placeholder={t.languageList.filterByFamily} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.languageList.allFamilies}</SelectItem>
                  {uniqueFamilies.map((family) => (
                    <SelectItem key={family} value={family}>
                      {family}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder={t.languageList.filterByDifficulty} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.languageList.allDifficulties}</SelectItem>
                  <SelectItem value="1">{t.languageList.difficulty1Star}</SelectItem>
                  <SelectItem value="2">{t.languageList.difficulty2Star}</SelectItem>
                  <SelectItem value="3">{t.languageList.difficulty3Star}</SelectItem>
                  <SelectItem value="4">{t.languageList.difficulty4Star}</SelectItem>
                  <SelectItem value="5">{t.languageList.difficulty5Star}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder={t.languageList.sortBy} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="speakers">{t.languageList.sortBySpeakers}</SelectItem>
                  <SelectItem value="difficulty">{t.languageList.sortByDifficulty}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filter Results */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{t.languageList.showingLanguages.replace('{count}', filteredLanguages.length.toString())}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedRegion("all")
                  setSelectedFamily("all")
                  setSelectedDifficulty("all")
                }}
              >
                {t.languageList.clearFilters}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Language Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredLanguages.map((language: LocalizedLanguage) => (
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
                    <span>{t.languageList.globalSpeakers.replace('{count}', formatSpeakers(language.speakers?.total || 0))}</span>
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
                    <span>{t.languageList.learningDifficulty}</span>
                    <span>{getDifficultyStars(language.difficulty)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>{t.languageList.estimatedTime}</span>
                    <span className="text-primary font-medium">{language.studyTime || t.languageList.unknown}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Link href={`/languages/${language.id}`} className="flex-1">
                    <Button className="flex-1 w-full" size="sm">
                      {t.common.viewDetails}
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
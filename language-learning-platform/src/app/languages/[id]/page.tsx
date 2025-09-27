import * as React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Users,
  Clock,
  Star,
  Globe,
  BookOpen,
  PlayCircle,
  HeadphonesIcon,
  FileText,
  MessageCircle,
  TrendingUp,
  Calendar,
  MapPin,
  Award
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { languageRepository } from "@/lib/data/repositories/language-repository-instance"

async function getLanguage(id: string) {
  try {
    const language = await languageRepository.getLanguageById(id)
    return language
  } catch (error) {
    console.error('Failed to load language:', error)
    return null
  }
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function LanguageDetailPage({ params }: PageProps) {
  const { id } = await params
  const language = await getLanguage(id)

  if (!language) {
    notFound()
  }

  const difficultyStars = "★".repeat(language.difficulty) + "☆".repeat(5 - language.difficulty)
  const difficultyColors = {
    1: "text-green-500",
    2: "text-green-500",
    3: "text-yellow-500",
    4: "text-orange-500",
    5: "text-red-500"
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Back Navigation */}
        <section className="py-6 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Button asChild variant="ghost" className="mb-4">
              <Link href="/languages">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回语言列表
              </Link>
            </Button>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 via-white to-teal-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-4">
                  <span className="text-6xl">{language.flag}</span>
                  <div className="text-left">
                    <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                      {language.name}
                    </h1>
                    <p className="text-xl text-muted-foreground">
                      {language.nameEn} • {language.nativeName}
                    </p>
                  </div>
                </div>

                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  {language.description}
                </p>

                <div className="flex flex-wrap gap-2 justify-center">
                  {language.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-gradient px-8">
                  开始学习 {language.name}
                </Button>
                <Button variant="outline" size="lg" className="px-8">
                  收藏到学习列表
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <div className="text-2xl font-bold">
                    {Math.round(language.speakers.total / 1000000)}M
                  </div>
                  <div className="text-sm text-muted-foreground">全球使用者</div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-teal-500" />
                  <div className="text-2xl font-bold">
                    {language.learningTimeEstimate.beginner}
                  </div>
                  <div className="text-sm text-muted-foreground">入门时间</div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Star className={`h-8 w-8 mx-auto mb-2 ${difficultyColors[language.difficulty as keyof typeof difficultyColors]}`} />
                  <div className="text-2xl font-bold">
                    {language.difficulty}/5
                  </div>
                  <div className="text-sm text-muted-foreground">学习难度</div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Globe className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">
                    {language.regions.length}
                  </div>
                  <div className="text-sm text-muted-foreground">主要地区</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Detailed Information */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <Tabs defaultValue="overview" className="space-y-8">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                  <TabsTrigger value="overview">概览</TabsTrigger>
                  <TabsTrigger value="culture">文化</TabsTrigger>
                  <TabsTrigger value="learning">学习指南</TabsTrigger>
                  <TabsTrigger value="regions">地区分布</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Language Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <BookOpen className="h-5 w-5 mr-2" />
                          语言信息
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">语系</span>
                          <span className="font-medium">{language.metadata.family}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">语支</span>
                          <span className="font-medium">{language.metadata.branch || '/'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">文字系统</span>
                          <span className="font-medium">{language.writingSystem.join(', ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ISO 639-1</span>
                          <span className="font-medium">{language.metadata.iso639_1}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">母语使用者</span>
                          <span className="font-medium">
                            {(language.speakers.native / 1000000).toFixed(1)}M
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">总使用者</span>
                          <span className="font-medium">
                            {(language.speakers.total / 1000000).toFixed(1)}M
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Learning Timeline */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Calendar className="h-5 w-5 mr-2" />
                          学习时间线
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">入门水平</span>
                            <span className="font-medium">{language.learningTimeEstimate.beginner}</span>
                          </div>
                          <Progress value={25} className="h-2" />
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">中级水平</span>
                            <span className="font-medium">{language.learningTimeEstimate.intermediate}</span>
                          </div>
                          <Progress value={60} className="h-2" />
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">高级水平</span>
                            <span className="font-medium">{language.learningTimeEstimate.advanced}</span>
                          </div>
                          <Progress value={90} className="h-2" />
                        </div>

                        <Separator />

                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">
                            {language.learningTimeEstimate.totalHours}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            预估总学习时长（小时）
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Difficulty Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        难度分析
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-medium">整体难度评级</span>
                        <div className="flex items-center space-x-2">
                          <span className={`text-2xl ${difficultyColors[language.difficulty as keyof typeof difficultyColors]}`}>
                            {difficultyStars}
                          </span>
                          <span className="text-xl font-bold">{language.difficulty}/5</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                        <div className="text-center p-4 border rounded-lg">
                          <MessageCircle className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                          <div className="font-medium">语法结构</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {language.difficulty <= 2 ? '简单' : language.difficulty <= 3 ? '中等' : '复杂'}
                          </div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <HeadphonesIcon className="h-6 w-6 mx-auto mb-2 text-teal-500" />
                          <div className="font-medium">发音系统</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {language.difficulty <= 2 ? '容易' : language.difficulty <= 3 ? '中等' : '困难'}
                          </div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <FileText className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                          <div className="font-medium">文字系统</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {language.writingSystem.includes('chinese') ? '复杂' :
                             language.writingSystem.includes('latin') ? '简单' : '中等'}
                          </div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <Globe className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                          <div className="font-medium">文化差异</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {language.difficulty <= 2 ? '相似' : language.difficulty <= 3 ? '中等' : '较大'}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="culture" className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Historical Background */}
                    <Card>
                      <CardHeader>
                        <CardTitle>历史背景</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                          {language.culturalInfo.history}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Modern Culture */}
                    <Card>
                      <CardHeader>
                        <CardTitle>现代文化</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {language.culturalInfo.modernCulture.map((item, index) => (
                            <Badge key={index} variant="outline" className="text-sm">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Traditions */}
                    <Card>
                      <CardHeader>
                        <CardTitle>传统文化</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {language.culturalInfo.traditions.map((tradition, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              <span>{tradition}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Festivals */}
                    <Card>
                      <CardHeader>
                        <CardTitle>节日庆典</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {language.culturalInfo.festivals.map((festival, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                              <span>{festival}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Cuisine and Arts */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>美食文化</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {language.culturalInfo.cuisine.map((dish, index) => (
                            <Badge key={index} variant="secondary" className="text-sm">
                              {dish}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>艺术形式</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {language.culturalInfo.arts.map((art, index) => (
                            <Badge key={index} variant="secondary" className="text-sm">
                              {art}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="learning" className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Learning Path */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Award className="h-5 w-5 mr-2" />
                          推荐学习路径
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 p-3 border rounded-lg">
                            <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                              1
                            </div>
                            <div>
                              <div className="font-medium">基础语音</div>
                              <div className="text-sm text-muted-foreground">掌握基本发音和语调</div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 p-3 border rounded-lg">
                            <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                              2
                            </div>
                            <div>
                              <div className="font-medium">常用词汇</div>
                              <div className="text-sm text-muted-foreground">学习500-1000个高频词汇</div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 p-3 border rounded-lg">
                            <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                              3
                            </div>
                            <div>
                              <div className="font-medium">基础语法</div>
                              <div className="text-sm text-muted-foreground">理解基本句型结构</div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 p-3 border rounded-lg">
                            <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                              4
                            </div>
                            <div>
                              <div className="font-medium">实践应用</div>
                              <div className="text-sm text-muted-foreground">日常对话和文化体验</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Learning Resources */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <BookOpen className="h-5 w-5 mr-2" />
                          学习资源
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <Button variant="outline" className="w-full justify-start">
                            <PlayCircle className="h-4 w-4 mr-2" />
                            在线课程
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <HeadphonesIcon className="h-4 w-4 mr-2" />
                            听力练习
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <FileText className="h-4 w-4 mr-2" />
                            阅读材料
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            对话练习
                          </Button>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="font-medium mb-2">推荐学习工具</h4>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div>• 语言交换平台</div>
                            <div>• 移动学习应用</div>
                            <div>• 在线词典</div>
                            <div>• 文化体验活动</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="regions" className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        地区分布
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {language.regions.map((region, index) => (
                          <Card key={index} className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{region.name}</span>
                              {region.primaryLanguage && (
                                <Badge variant="default" className="text-xs">
                                  主要语言
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              地区代码: {region.code}
                            </div>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>使用国家和地区</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {language.speakers.countries.map((country, index) => (
                          <Badge key={index} variant="outline" className="text-sm">
                            {country}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 gradient-hero">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8 text-white">
              <h2 className="text-3xl md:text-4xl font-bold">
                准备开始学习{language.name}了吗？
              </h2>
              <p className="text-xl max-w-2xl mx-auto opacity-90">
                加入我们的学习社区，获得个性化的学习计划和专业指导
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 px-8">
                  立即开始学习
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8">
                  预约试听课程
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
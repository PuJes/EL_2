'use client'

import * as React from "react"
import { ArrowRight, Globe, Star, Clock, BookOpen, Users, TrendingUp, Calendar, MapPin, Award, HeadphonesIcon, FileText, MessageCircle, PlayCircle } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Slot } from "@radix-ui/react-slot"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { enhancedLanguageData } from '@/data/enhanced-languages'
import { Language } from '@/types'
import { Header } from '@/components/header'

// UI Components (same as homepage)
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
  const Comp = asChild ? Slot : "button"

  return (
    <Comp className={classes} ref={ref} {...props}>
      {children}
    </Comp>
  )
})
Button.displayName = "Button"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-lg border bg-card text-card-foreground shadow-sm min-w-0 overflow-hidden ${className}`}
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




export default function LanguageDetailPage() {
  const params = useParams()
  const languageId = params.id as string

  const language = enhancedLanguageData[languageId]

  if (!language) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">语言未找到</h1>
          <Link href="/">
            <Button variant="outline">返回首页</Button>
          </Link>
        </div>
      </div>
    )
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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Hero Section */}
        <section className="bg-card rounded-xl shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="min-w-0">
              <div className="flex items-center space-x-4 mb-6 min-w-0">
                <span className="text-6xl flex-shrink-0">{language.flag}</span>
                <div className="min-w-0">
                  <h1 className="text-4xl font-bold text-foreground mb-2 break-words">{language.name}</h1>
                  <p className="text-xl text-muted-foreground break-words">{language.nameEn} • {language.nativeName}</p>
                </div>
              </div>

              <p className="text-lg text-foreground/80 mb-6 leading-relaxed break-words">
                {language.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary">{language.category}</Badge>
                {language.metadata?.family && (
                  <Badge variant="outline">{language.metadata.family}</Badge>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/survey">
                  <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-lg px-8 py-3">
                    开始学习 {language.name}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" className="text-lg px-8 py-3">
                  收藏到学习列表
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
              <Card className="p-6 text-center min-w-0 overflow-hidden">
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1 break-words">
                  {Math.round(language.speakers.total / 1000000)}M
                </div>
                <div className="text-sm text-muted-foreground">全球使用者</div>
              </Card>

              <Card className="p-6 text-center min-w-0 overflow-hidden">
                <Clock className="w-8 h-8 text-teal-500 dark:text-teal-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1 break-words">
                  {language.learningTimeEstimate?.beginner || "6个月"}
                </div>
                <div className="text-sm text-muted-foreground">入门时间</div>
              </Card>

              <Card className="p-6 text-center min-w-0 overflow-hidden">
                <Star className={`w-8 h-8 mx-auto mb-3 ${difficultyColors[language.difficulty as keyof typeof difficultyColors]}`} />
                <div className="text-2xl font-bold text-foreground mb-1 break-words">
                  {language.difficulty}/5
                </div>
                <div className="text-sm text-muted-foreground">学习难度</div>
              </Card>

              <Card className="p-6 text-center min-w-0 overflow-hidden">
                <Globe className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1 break-words">
                  {language.regions.length}
                </div>
                <div className="text-sm text-muted-foreground">主要地区</div>
              </Card>
            </div>
          </div>
        </section>

        {/* Detailed Information with Tabs */}
        <section className="bg-card rounded-xl shadow-sm p-8 overflow-hidden">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-1">
              <TabsTrigger value="overview" className="truncate">概览</TabsTrigger>
              <TabsTrigger value="culture" className="truncate">文化</TabsTrigger>
              <TabsTrigger value="learning" className="truncate">学习指南</TabsTrigger>
              <TabsTrigger value="resources" className="truncate">学习资源</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-w-0">
                {/* Language Information */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                      <h3 className="text-lg font-semibold text-foreground">语言信息</h3>
                    </div>
                    <div className="space-y-3">
                      {language.metadata && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">语系</span>
                            <span className="font-medium">{language.metadata.family}</span>
                          </div>
                          {language.metadata.branch && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">语支</span>
                              <span className="font-medium">{language.metadata.branch}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">文字系统</span>
                            <span className="font-medium">{language.metadata.writingSystem.join(', ')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ISO 639-1</span>
                            <span className="font-medium">{language.metadata.iso639_1}</span>
                          </div>
                        </>
                      )}
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
                    </div>
                  </CardContent>
                </Card>

                {/* Learning Timeline */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Calendar className="w-5 h-5 text-teal-600" />
                      <h3 className="text-lg font-semibold text-foreground">学习时间线</h3>
                    </div>
                    {language.learningTimeEstimate && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">入门水平 (A1-A2)</span>
                            <span className="font-medium">{Math.round(language.learningTimeEstimate.totalHours * 0.25)} 小时</span>
                          </div>
                          <Progress value={25} />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">中级水平 (B1-B2)</span>
                            <span className="font-medium">{Math.round(language.learningTimeEstimate.totalHours * 0.35)} 小时</span>
                          </div>
                          <Progress value={60} />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">高级水平 (C1-C2)</span>
                            <span className="font-medium">{Math.round(language.learningTimeEstimate.totalHours * 0.4)} 小时</span>
                          </div>
                          <Progress value={90} />
                        </div>

                        <Separator />

                        <div className="text-center p-4 bg-muted/20 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">
                            {language.learningTimeEstimate.totalHours}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            预估总学习时长（小时）
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Difficulty Breakdown */}
              {language.difficultyAnalysis && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                      <h3 className="text-lg font-semibold text-foreground">难度分析</h3>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-medium">整体难度评级</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-2xl ${difficultyColors[language.difficulty as keyof typeof difficultyColors]}`}>
                          {difficultyStars}
                        </span>
                        <span className="text-xl font-bold">{language.difficulty}/5</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                      <div className="text-center p-4 border rounded-lg min-w-0 overflow-hidden">
                        <MessageCircle className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                        <div className="font-medium">语法结构</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {language.difficultyAnalysis.grammar <= 2 ? '简单' :
                           language.difficultyAnalysis.grammar <= 3 ? '中等' : '复杂'}
                        </div>
                      </div>
                      <div className="text-center p-4 border rounded-lg min-w-0 overflow-hidden">
                        <HeadphonesIcon className="w-6 h-6 mx-auto mb-2 text-teal-500" />
                        <div className="font-medium">发音系统</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {language.difficultyAnalysis.pronunciation <= 2 ? '容易' :
                           language.difficultyAnalysis.pronunciation <= 3 ? '中等' : '困难'}
                        </div>
                      </div>
                      <div className="text-center p-4 border rounded-lg min-w-0 overflow-hidden">
                        <FileText className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                        <div className="font-medium">文字系统</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {language.difficultyAnalysis.writing <= 2 ? '简单' :
                           language.difficultyAnalysis.writing <= 3 ? '中等' : '复杂'}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="culture" className="space-y-8">
              {language.culturalInfo && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-w-0">
                  {/* Historical Background */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">历史背景</h3>
                      <p className="text-foreground/80 leading-relaxed">
                        {language.culturalInfo.history}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Modern Culture */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">现代文化</h3>
                      <div className="flex flex-wrap gap-2">
                        {language.culturalInfo.modernCulture.map((item, index) => (
                          <Badge key={index} variant="outline">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Traditions */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">传统文化</h3>
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
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">节日庆典</h3>
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

                  {/* Cuisine and Arts */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">美食文化</h3>
                      <div className="flex flex-wrap gap-2">
                        {language.culturalInfo.cuisine.map((dish, index) => (
                          <Badge key={index} variant="secondary">
                            {dish}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">艺术形式</h3>
                      <div className="flex flex-wrap gap-2">
                        {language.culturalInfo.arts.map((art, index) => (
                          <Badge key={index} variant="secondary">
                            {art}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="learning" className="space-y-8">
              {language.learningGuide && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-w-0">
                  {/* Learning Path */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Award className="w-5 h-5 text-purple-600" />
                        <h3 className="text-lg font-semibold text-foreground">学习路径</h3>
                      </div>
                      <div className="space-y-3">
                        {language.learningGuide.learningPath.map((step, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                            <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{step.title}</div>
                              <div className="text-sm text-muted-foreground mb-2">{step.description}</div>
                              <div className="text-xs text-purple-600">
                                预计 {step.estimatedHours} 小时 • {step.level}
                              </div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {step.skills.map((skill, skillIndex) => (
                                  <Badge key={skillIndex} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Learning Methods */}
                  {language.learningGuide.learningMethods && (
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <BookOpen className="w-5 h-5 text-teal-600" />
                          <h3 className="text-lg font-semibold text-foreground">学习方法</h3>
                        </div>
                        <div className="space-y-4">
                          {language.learningGuide.learningMethods.map((method, index) => (
                            <div key={index} className="p-3 border rounded-lg">
                              <div className="font-medium mb-2">{method.title}</div>
                              <div className="text-sm text-muted-foreground mb-3">{method.description}</div>
                              <div className="flex flex-wrap gap-1">
                                {method.techniques.map((technique, techIndex) => (
                                  <Badge key={techIndex} variant="secondary" className="text-xs">
                                    {technique}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Learning Tools */}
                  {language.learningGuide.learningTools && (
                    <Card className="lg:col-span-2">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <PlayCircle className="w-5 h-5 text-orange-600" />
                          <h3 className="text-lg font-semibold text-foreground">学习工具</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {language.learningGuide.learningTools.map((category, index) => (
                            <div key={index} className="min-w-0">
                              <h4 className="font-medium mb-2">{category.category}</h4>
                              <div className="space-y-2">
                                {category.tools.map((tool, toolIndex) => (
                                  <Button key={toolIndex} variant="outline" size="sm" className="w-full justify-start text-xs min-w-0 truncate">
                                    {tool}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="resources" className="space-y-8">
              {language.learningResources && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-w-0">
                  {/* Apps */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">学习应用</h3>
                      <div className="space-y-3">
                        {language.learningResources.apps?.map((app, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="font-medium">{app.name}</div>
                            <div className="text-sm text-muted-foreground mb-1">{app.description}</div>
                            <div className="text-xs text-purple-600">{app.price}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Books */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">推荐书籍</h3>
                      <div className="space-y-3">
                        {language.learningResources.books?.map((book, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="font-medium">{book.title}</div>
                            <div className="text-sm text-muted-foreground">{book.author}</div>
                            <Badge variant="outline" className="text-xs mt-1">{book.level}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Websites */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">在线资源</h3>
                      <div className="space-y-3">
                        {language.learningResources.websites?.map((website, index) => (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="font-medium">{website.name}</div>
                            <div className="text-sm text-muted-foreground mb-1">{website.description}</div>
                            <a href={website.url} target="_blank" rel="noopener noreferrer"
                               className="text-xs text-blue-600 hover:underline">
                              访问网站 →
                            </a>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Career and Travel */}
              {(language.careerOpportunities || language.travelAdvantages) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-w-0">
                  {language.careerOpportunities && (
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          <h3 className="text-lg font-semibold text-foreground">职业机会</h3>
                        </div>
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {language.careerOpportunities.industries.map((industry, index) => (
                              <div key={index} className="flex items-center space-x-2 p-2 bg-muted/20 rounded min-w-0">
                                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                                <span className="text-sm truncate">{industry}</span>
                              </div>
                            ))}
                          </div>
                          <Separator />
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">平均薪资</span>
                              <span className="font-medium">{language.careerOpportunities.averageSalary}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">就业增长</span>
                              <span className="font-medium">{language.careerOpportunities.jobGrowth}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">远程工作</span>
                              <span className="font-medium">{language.careerOpportunities.remoteWork ? '支持' : '较少'}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {language.travelAdvantages && (
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          <h3 className="text-lg font-semibold text-foreground">旅游优势</h3>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">热门国家</h4>
                            <div className="flex flex-wrap gap-1">
                              {language.travelAdvantages.countries.map((country, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {country}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">商业中心</h4>
                            <div className="flex flex-wrap gap-1">
                              {language.travelAdvantages.businessHubs.map((hub, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {hub}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">文化景点</h4>
                            <div className="space-y-1">
                              {language.travelAdvantages.culturalSites.map((site, index) => (
                                <div key={index} className="text-sm text-muted-foreground">• {site}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  )
}
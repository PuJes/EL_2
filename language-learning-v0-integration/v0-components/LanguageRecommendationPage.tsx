"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import {
  Clock,
  Target,
  TrendingUp,
  Users,
  Globe,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Star,
  Brain,
  Trophy,
  ChevronRight,
} from "lucide-react"
import { Header } from '../src/components/header'

// Import algorithm and data
import { getLanguageRecommendations } from '../src/lib/recommendation/recommendation-algorithm'
import { getAllLanguages } from '../src/lib/data/languages'
import { convertSurveyDataToResponses } from '../src/lib/utils/survey-converter'
import type { LanguageRecommendation as AlgorithmRecommendation } from '../src/lib/types/survey'

// UI Components
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline" | "ghost"
    size?: "sm" | "default" | "lg"
  }
>(({ className = "", variant = "default", size = "default", children, ...props }, ref) => {
  const baseClasses =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  }

  const sizes = {
    sm: "h-9 rounded-md px-3",
    default: "h-10 px-4 py-2",
    lg: "h-11 rounded-md px-8",
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

  return (
    <button className={classes} ref={ref} {...props}>
      {children}
    </button>
  )
})
Button.displayName = "Button"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props} />
  ),
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
  ),
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className = "", ...props }, ref) => (
    <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
  ),
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className = "", ...props }, ref) => (
    <p ref={ref} className={`text-sm text-muted-foreground ${className}`} {...props} />
  ),
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />,
)
CardContent.displayName = "CardContent"

const Progress = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value?: number }>(
  ({ className = "", value = 0, ...props }, ref) => (
    <div ref={ref} className={`relative h-4 w-full overflow-hidden rounded-full bg-secondary ${className}`} {...props}>
      <div
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  ),
)
Progress.displayName = "Progress"

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "secondary" | "outline" }
>(({ className = "", variant = "default", ...props }, ref) => {
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border-gray-200 bg-transparent text-gray-700 hover:bg-gray-50",
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

// Tabs components
const Tabs: React.FC<{ children: React.ReactNode; defaultValue?: string; className?: string }> = ({
  children,
  defaultValue,
  className,
}) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue || "")

  return (
    <div className={className} data-active-tab={activeTab}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement, { activeTab, setActiveTab })
          : child,
      )}
    </div>
  )
}

const TabsList: React.FC<{
  children: React.ReactNode
  className?: string
  activeTab?: string
  setActiveTab?: (value: string) => void
}> = ({ children, className, activeTab, setActiveTab }) => (
  <div
    className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}
  >
    {React.Children.map(children, (child) =>
      React.isValidElement(child)
        ? React.cloneElement(child as React.ReactElement, { activeTab, setActiveTab })
        : child,
    )}
  </div>
)

const TabsTrigger: React.FC<{
  children: React.ReactNode
  value: string
  className?: string
  activeTab?: string
  setActiveTab?: (value: string) => void
}> = ({ children, value, className, activeTab, setActiveTab }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
      activeTab === value ? "bg-background text-foreground shadow-sm" : ""
    } ${className}`}
    onClick={() => setActiveTab?.(value)}
  >
    {children}
  </button>
)

const TabsContent: React.FC<{ children: React.ReactNode; value: string; className?: string; activeTab?: string }> = ({
  children,
  value,
  className,
  activeTab,
}) => {
  if (activeTab !== value) return null
  return (
    <div
      className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
    >
      {children}
    </div>
  )
}

// Mock Language Data
interface Language {
  id: string
  name: string
  nativeName: string
  flag: string
  description: string
  difficulty: number
  speakers: { total: number }
  tags: string[]
  family: string
  script: string
  regions: string[]
}

interface LanguageRecommendation {
  language: Language
  matchScore: number
  personalizedDifficulty: {
    overallDifficulty: number
    factors: {
      grammar: number
      pronunciation: number
      vocabulary: number
      writing: number
    }
  }
  dimensionScores: {
    culturalMatch: number
    difficultyMatch: number
    purposeMatch: number
    timeMatch: number
    experienceMatch: number
  }
  successPrediction: {
    probability: number
    timeline: string
    factors: string[]
  }
  reasonsToLearn: string[]
  learningPath: {
    beginner: string[]
    intermediate: string[]
    advanced: string[]
  }
  resources: {
    apps: string[]
    books: string[]
    websites: string[]
  }
  culturalHighlights: string[]
}

// Mock recommendations data
const mockRecommendations: LanguageRecommendation[] = [
  {
    language: {
      id: "spanish",
      name: "西班牙语",
      nativeName: "Español",
      flag: "🇪🇸",
      description: "世界第二大母语，职场和旅游热门选择",
      difficulty: 2,
      speakers: { total: 500000000 },
      tags: ["拉丁语族", "职场热门", "旅游实用"],
      family: "印欧语系",
      script: "拉丁字母",
      regions: ["西班牙", "拉丁美洲", "美国"],
    },
    matchScore: 92,
    personalizedDifficulty: {
      overallDifficulty: 2.3,
      factors: {
        grammar: 2.5,
        pronunciation: 2.0,
        vocabulary: 2.2,
        writing: 2.0,
      },
    },
    dimensionScores: {
      culturalMatch: 85,
      difficultyMatch: 90,
      purposeMatch: 95,
      timeMatch: 88,
      experienceMatch: 92,
    },
    successPrediction: {
      probability: 0.89,
      timeline: "8-12个月",
      factors: ["语法相对简单", "发音规律", "资源丰富", "实用性强"],
    },
    reasonsToLearn: [
      "全球5亿使用者，实用性极强",
      "拉丁美洲文化探索的钥匙",
      "相对简单的语法结构",
      "丰富的学习资源",
      "职场竞争力提升",
    ],
    learningPath: {
      beginner: ["基础发音", "常用词汇", "现在时态", "日常对话"],
      intermediate: ["过去时态", "虚拟语态", "复杂语法", "文化理解"],
      advanced: ["文学阅读", "商务西语", "地方方言", "高级写作"],
    },
    resources: {
      apps: ["Duolingo", "Babbel", "Busuu", "SpanishDict"],
      books: ["《新概念西班牙语》", "《实用西班牙语语法》"],
      websites: ["SpanishPod101", "Conjuguemos", "News in Slow Spanish"],
    },
    culturalHighlights: ["弗拉明戈舞蹈", "西班牙斗牛", "拉美魔幻现实主义", "塞万提斯文学"],
  },
  {
    language: {
      id: "french",
      name: "法语",
      nativeName: "Français",
      flag: "🇫🇷",
      description: "优雅的语言，艺术和时尚的象征",
      difficulty: 3,
      speakers: { total: 280000000 },
      tags: ["浪漫语族", "艺术文化", "外交语言"],
      family: "印欧语系",
      script: "拉丁字母",
      regions: ["法国", "加拿大", "非洲法语区"],
    },
    matchScore: 87,
    personalizedDifficulty: {
      overallDifficulty: 3.2,
      factors: {
        grammar: 3.5,
        pronunciation: 3.8,
        vocabulary: 2.8,
        writing: 3.0,
      },
    },
    dimensionScores: {
      culturalMatch: 90,
      difficultyMatch: 82,
      purposeMatch: 88,
      timeMatch: 85,
      experienceMatch: 87,
    },
    successPrediction: {
      probability: 0.82,
      timeline: "12-18个月",
      factors: ["复杂语法", "发音挑战", "丰富文化", "优质资源"],
    },
    reasonsToLearn: [
      "浪漫主义文化的代表",
      "艺术、时尚、美食的语言",
      "联合国官方语言之一",
      "加拿大移民优势",
      "欧洲文化深度体验",
    ],
    learningPath: {
      beginner: ["法语发音", "基础语法", "日常词汇", "简单对话"],
      intermediate: ["复杂时态", "主观语态", "文化背景", "中级阅读"],
      advanced: ["文学欣赏", "商务法语", "学术写作", "流利表达"],
    },
    resources: {
      apps: ["Duolingo", "Babbel", "FluentU", "FrenchPod101"],
      books: ["《简明法语教程》", "《法语语法渐进》"],
      websites: ["TV5MONDE", "RFI Savoirs", "Conjuguemos"],
    },
    culturalHighlights: ["法式料理", "印象派绘画", "香榭丽舍大街", "凡尔赛宫"],
  },
  {
    language: {
      id: "japanese",
      name: "日语",
      nativeName: "日本語",
      flag: "🇯🇵",
      description: "动漫文化和先进科技的语言",
      difficulty: 5,
      speakers: { total: 125000000 },
      tags: ["东亚文化", "动漫游戏", "科技创新"],
      family: "日语族",
      script: "假名+汉字",
      regions: ["日本"],
    },
    matchScore: 78,
    personalizedDifficulty: {
      overallDifficulty: 4.8,
      factors: {
        grammar: 4.5,
        pronunciation: 3.8,
        vocabulary: 5.0,
        writing: 5.0,
      },
    },
    dimensionScores: {
      culturalMatch: 95,
      difficultyMatch: 60,
      purposeMatch: 85,
      timeMatch: 70,
      experienceMatch: 75,
    },
    successPrediction: {
      probability: 0.68,
      timeline: "24-36个月",
      factors: ["复杂文字系统", "敬语体系", "文化深度", "毅力要求高"],
    },
    reasonsToLearn: [
      "动漫、游戏文化的原汁原味",
      "日本科技文化探索",
      "独特的语言逻辑思维",
      "职场发展机会",
      "传统文化的深度理解",
    ],
    learningPath: {
      beginner: ["假名学习", "基础语法", "常用汉字", "礼貌用语"],
      intermediate: ["敬语系统", "复杂语法", "阅读练习", "听力提升"],
      advanced: ["文学阅读", "商务日语", "文化深度", "流利交流"],
    },
    resources: {
      apps: ["Duolingo", "Busuu", "JapanesePod101", "Anki"],
      books: ["《标准日本语》", "《大家的日本语》"],
      websites: ["NHK World", "Tae Kim's Guide", "WaniKani"],
    },
    culturalHighlights: ["茶道", "武士道", "樱花文化", "禅宗思想"],
  },
]

// Header is now imported from @/components/header with rose theme

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Globe className="w-6 h-6 text-rose-400" />
            <span className="text-lg font-bold">语言世界</span>
          </div>
          <p className="text-gray-400 text-sm">© 2025 语言世界. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  )
}

// Loading Component
const LoadingComponent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-violet-50 to-sky-50 flex items-center justify-center">
      <div className="text-center">
        <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-rose-500" />
        <p className="text-lg text-gray-600">正在为您生成个性化推荐...</p>
        <div className="mt-4 space-y-2 text-sm text-gray-500">
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>分析您的语言背景</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>计算个性化难度</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>匹配文化兴趣</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <RefreshCw className="w-4 h-4 animate-spin text-violet-500" />
            <span>生成学习路径</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Error Component
const ErrorComponent = ({ error, onRetry, onHome }: { error: string; onRetry: () => void; onHome: () => void }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-rose-100 flex items-center justify-center">
      <div className="text-center">
        <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-orange-500" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">出错了</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <div className="space-x-4">
          <Button onClick={onRetry} variant="outline">
            重新测评
          </Button>
          <Button onClick={onHome}>回到首页</Button>
        </div>
      </div>
    </div>
  )
}

// Main Recommendation Component
export default function LanguageRecommendationPage() {
  const [recommendations, setRecommendations] = useState<LanguageRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)

  useEffect(() => {
    const initializeRecommendations = async () => {
      try {
        setLoading(true)
        setError(null)

        // Get survey data from localStorage
        const surveyDataStr = localStorage.getItem('surveyData')
        if (!surveyDataStr) {
          setError("未找到问卷数据，请先完成问卷评估")
          setLoading(false)
          return
        }

        const surveyData = JSON.parse(surveyDataStr)

        // Convert survey data to algorithm format
        const responses = convertSurveyDataToResponses(surveyData)

        // Get all languages
        const languages = getAllLanguages()

        // Get recommendations using real algorithm
        const algorithmRecommendations = await getLanguageRecommendations(languages, responses)

        // Convert to component format
        const convertedRecommendations: LanguageRecommendation[] = algorithmRecommendations.map((rec: AlgorithmRecommendation) => ({
          language: {
            id: rec.language.id,
            name: rec.language.name,
            nativeName: rec.language.nativeName,
            flag: rec.language.flag,
            description: rec.language.description,
            difficulty: rec.language.difficulty,
            speakers: { total: rec.language.speakers.total },
            tags: rec.language.tags,
            family: rec.language.family,
            script: rec.language.script,
            regions: rec.language.regions,
          },
          matchScore: rec.matchScore,
          personalizedDifficulty: {
            overallDifficulty: rec.personalizedDifficulty.overallDifficulty,
            factors: {
              grammar: rec.language.difficultyAnalysis?.grammar || rec.language.difficulty,
              pronunciation: rec.language.difficultyAnalysis?.pronunciation || rec.language.difficulty,
              vocabulary: rec.language.difficultyAnalysis?.vocabulary || rec.language.difficulty,
              writing: rec.language.difficultyAnalysis?.writing || rec.language.difficulty,
            },
          },
          dimensionScores: {
            culturalMatch: rec.dimensionScores.culturalMatch,
            difficultyMatch: rec.dimensionScores.difficultyFit,
            purposeMatch: rec.dimensionScores.goalAlignment,
            timeMatch: rec.dimensionScores.timeFeasibility,
            experienceMatch: rec.dimensionScores.practicalValue,
          },
          successPrediction: {
            probability: rec.successPrediction.probability,
            timeline: rec.successPrediction.timeline,
            factors: rec.personalizedDifficulty.reasons,
          },
          reasonsToLearn: rec.reasons.primary.map(r => r.description),
          learningPath: {
            beginner: rec.learningPath.phases[0]?.goals || [],
            intermediate: rec.learningPath.phases[1]?.goals || [],
            advanced: rec.learningPath.phases[2]?.goals || [],
          },
          resources: {
            apps: ["Duolingo", "Babbel", "Busuu"],
            books: ["基础教材", "语法指南"],
            websites: ["官方学习网站", "在线课程平台"],
          },
          culturalHighlights: rec.language.tags.slice(0, 4),
        }))

        setRecommendations(convertedRecommendations)
        if (convertedRecommendations.length > 0) {
          setSelectedLanguage(convertedRecommendations[0].language.id)
        }
      } catch (err) {
        console.error("Error initializing recommendations:", err)
        setError("生成推荐时出错，请重新尝试")
      } finally {
        setLoading(false)
      }
    }

    initializeRecommendations()
  }, [])

  const handleLanguageSelect = (languageId: string) => {
    setSelectedLanguage(languageId)
  }

  const handleStartLearning = (languageId: string) => {
    console.log(`Starting to learn ${languageId}`)
    window.location.href = `/languages/${languageId}`
  }

  const handleRetakeSurvey = () => {
    // Clear stored survey data and navigate to survey
    localStorage.removeItem('surveyData')
    window.location.href = '/survey'
  }

  const handleGoHome = () => {
    window.location.href = '/'
  }

  if (loading) {
    return <LoadingComponent />
  }

  if (error) {
    return <ErrorComponent error={error} onRetry={handleRetakeSurvey} onHome={handleGoHome} />
  }

  if (recommendations.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">暂无推荐结果</h1>
          <p className="text-gray-600 mb-6">请先完成问卷评估</p>
          <Button onClick={handleRetakeSurvey}>开始测评</Button>
        </div>
      </div>
    )
  }

  const selectedRecommendation = recommendations.find((rec) => rec.language.id === selectedLanguage)

  return (
    <div className="min-h-screen flex flex-col">
      <Header theme="rose" />

      <div className="pt-16 bg-gradient-to-br from-rose-50 via-violet-50 to-sky-50">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recommendations List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-rose-500" />
                    AI智能推荐
                  </CardTitle>
                  <CardDescription>基于您的背景和目标的个性化排序</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recommendations.map((recommendation, index) => (
                    <div
                      key={recommendation.language.id}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        selectedLanguage === recommendation.language.id
                          ? "bg-violet-50 border-2 border-violet-200"
                          : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                      }`}
                      onClick={() => handleLanguageSelect(recommendation.language.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{recommendation.language.flag}</span>
                          <div>
                            <h3 className="font-semibold text-gray-900">{recommendation.language.name}</h3>
                            <p className="text-sm text-gray-500">{recommendation.language.nativeName}</p>
                          </div>
                        </div>
                        <Badge
                          variant={index === 0 ? "default" : "secondary"}
                          className={index === 0 ? "bg-gradient-to-r from-rose-400 to-violet-400 text-white" : ""}
                        >
                          #{index + 1}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">匹配度</span>
                          <span className="font-medium">{recommendation.matchScore}%</span>
                        </div>
                        <Progress value={recommendation.matchScore} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">个性化难度</span>
                          <span className="font-medium">
                            {recommendation.personalizedDifficulty.overallDifficulty.toFixed(1)}/5
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {recommendation.language.tags?.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.location.href = `/languages/${recommendation.language.id}`
                          }}
                        >
                          查看详情
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="mt-4 flex gap-3">
                <Button variant="outline" onClick={handleRetakeSurvey} className="flex-1 bg-transparent">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  重新测评
                </Button>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="lg:col-span-2">
              {selectedRecommendation && (
                <div className="space-y-6">
                  {/* Language Overview */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-4xl">{selectedRecommendation.language.flag}</span>
                          <div>
                            <CardTitle className="text-2xl">{selectedRecommendation.language.name}</CardTitle>
                            <CardDescription className="text-base">
                              {selectedRecommendation.language.description}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge
                          variant="default"
                          className="bg-gradient-to-r from-rose-400 to-violet-400 px-4 py-2 text-white"
                        >
                          匹配度 {selectedRecommendation.matchScore}%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center">
                          <div className="flex items-center justify-center w-12 h-12 bg-sky-100 rounded-lg mx-auto mb-2">
                            <Target className="h-6 w-6 text-sky-600" />
                          </div>
                          <p className="text-sm text-gray-600">个性化难度</p>
                          <p className="font-semibold">
                            {selectedRecommendation.personalizedDifficulty.overallDifficulty.toFixed(1)}/5
                          </p>
                          <p className="text-xs text-gray-500">
                            (标准: {selectedRecommendation.language.difficulty}/5)
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg mx-auto mb-2">
                            <Users className="h-6 w-6 text-emerald-600" />
                          </div>
                          <p className="text-sm text-gray-600">使用人数</p>
                          <p className="font-semibold">
                            {Math.round((selectedRecommendation.language.speakers?.total || 0) / 1000000)}M
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-lg mx-auto mb-2">
                            <Clock className="h-6 w-6 text-amber-600" />
                          </div>
                          <p className="text-sm text-gray-600">预计时长</p>
                          <p className="font-semibold">{selectedRecommendation.successPrediction.timeline}</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center w-12 h-12 bg-violet-100 rounded-lg mx-auto mb-2">
                            <Trophy className="h-6 w-6 text-violet-600" />
                          </div>
                          <p className="text-sm text-gray-600">成功率</p>
                          <p className="font-semibold">
                            {Math.round(selectedRecommendation.successPrediction.probability * 100)}%
                          </p>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleStartLearning(selectedRecommendation.language.id)}
                        className="w-full bg-gradient-to-r from-rose-400 to-violet-400 hover:from-rose-500 hover:to-violet-500"
                        size="lg"
                      >
                        开始学习 {selectedRecommendation.language.name}
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Detailed Information Tabs */}
                  <Tabs defaultValue="reasons" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="reasons">推荐理由</TabsTrigger>
                      <TabsTrigger value="difficulty">难度分析</TabsTrigger>
                      <TabsTrigger value="path">学习路径</TabsTrigger>
                      <TabsTrigger value="culture">文化背景</TabsTrigger>
                    </TabsList>

                    <TabsContent value="reasons" className="mt-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>推荐详解</CardTitle>
                          <CardDescription>基于5个维度的综合评分，为您量身定制的语言推荐</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {/* Overall Match Score */}
                          <div className="p-4 bg-gradient-to-r from-sky-50 to-violet-50 rounded-xl border border-sky-200">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-lg font-semibold text-gray-900">总体匹配度</h4>
                              <div className="text-2xl font-bold text-sky-600">
                                {selectedRecommendation.matchScore}%
                              </div>
                            </div>
                            <Progress value={selectedRecommendation.matchScore} className="h-3 mb-2" />
                            <p className="text-sm text-gray-600">基于您的问卷回答，这门语言与您的需求高度匹配</p>
                          </div>

                          {/* Dimension Scores */}
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">评分维度详解</h4>

                            {/* Cultural Match */}
                            <div className="p-4 bg-rose-50 rounded-lg border border-rose-200">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Globe className="h-5 w-5 text-rose-500" />
                                  <span className="font-medium text-rose-900">文化兴趣匹配</span>
                                  <Badge variant="secondary" className="text-xs">
                                    权重30%
                                  </Badge>
                                </div>
                                <span className="text-rose-700 font-semibold">
                                  {selectedRecommendation.dimensionScores.culturalMatch}分
                                </span>
                              </div>
                              <Progress
                                value={selectedRecommendation.dimensionScores.culturalMatch}
                                className="h-2 mb-2"
                              />
                              <p className="text-sm text-rose-800">
                                {selectedRecommendation.dimensionScores.culturalMatch >= 80
                                  ? "与您选择的文化区域高度匹配，该语言在您感兴趣的文化圈中广泛使用"
                                  : selectedRecommendation.dimensionScores.culturalMatch >= 60
                                    ? "与您的文化兴趣有一定匹配度，具有学习价值"
                                    : "与您的文化兴趣匹配度较低，但仍有其他优势"}
                              </p>
                            </div>

                            {/* Difficulty Match */}
                            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Target className="h-5 w-5 text-emerald-500" />
                                  <span className="font-medium text-emerald-900">难度适配度</span>
                                  <Badge variant="secondary" className="text-xs">
                                    权重25%
                                  </Badge>
                                </div>
                                <span className="text-emerald-700 font-semibold">
                                  {selectedRecommendation.dimensionScores.difficultyMatch}分
                                </span>
                              </div>
                              <Progress
                                value={selectedRecommendation.dimensionScores.difficultyMatch}
                                className="h-2 mb-2"
                              />
                              <p className="text-sm text-emerald-800">
                                根据您的语言经验和学习偏好，这门语言的难度很适合您
                              </p>
                            </div>

                            {/* Purpose Match */}
                            <div className="p-4 bg-sky-50 rounded-lg border border-sky-200">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Brain className="h-5 w-5 text-sky-500" />
                                  <span className="font-medium text-sky-900">目标匹配度</span>
                                  <Badge variant="secondary" className="text-xs">
                                    权重20%
                                  </Badge>
                                </div>
                                <span className="text-sky-700 font-semibold">
                                  {selectedRecommendation.dimensionScores.purposeMatch}分
                                </span>
                              </div>
                              <Progress
                                value={selectedRecommendation.dimensionScores.purposeMatch}
                                className="h-2 mb-2"
                              />
                              <p className="text-sm text-sky-800">这门语言非常符合您的学习目标和用途需求</p>
                            </div>

                            {/* Time Feasibility */}
                            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-5 w-5 text-amber-500" />
                                  <span className="font-medium text-amber-900">时间可行性</span>
                                  <Badge variant="secondary" className="text-xs">
                                    权重15%
                                  </Badge>
                                </div>
                                <span className="text-amber-700 font-semibold">
                                  {selectedRecommendation.dimensionScores.timeMatch}分
                                </span>
                              </div>
                              <Progress
                                value={selectedRecommendation.dimensionScores.timeMatch}
                                className="h-2 mb-2"
                              />
                              <p className="text-sm text-amber-800">
                                {selectedRecommendation.dimensionScores.timeMatch >= 80
                                  ? "根据您的时间安排和目标时间线，这门语言的学习计划非常合理"
                                  : selectedRecommendation.dimensionScores.timeMatch >= 60
                                    ? "在您的时间安排下，这门语言的学习是可行的"
                                    : "需要更多时间投入才能达到预期目标"}
                              </p>
                            </div>

                            {/* Practical Value */}
                            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="h-5 w-5 text-purple-500" />
                                  <span className="font-medium text-purple-900">实用价值</span>
                                  <Badge variant="secondary" className="text-xs">
                                    权重10%
                                  </Badge>
                                </div>
                                <span className="text-purple-700 font-semibold">
                                  {selectedRecommendation.dimensionScores.experienceMatch}分
                                </span>
                              </div>
                              <Progress
                                value={selectedRecommendation.dimensionScores.experienceMatch}
                                className="h-2 mb-2"
                              />
                              <p className="text-sm text-purple-800">
                                {selectedRecommendation.dimensionScores.experienceMatch >= 80
                                  ? "这门语言在职场、学术或日常生活中具有很高的实用价值"
                                  : selectedRecommendation.dimensionScores.experienceMatch >= 60
                                    ? "这门语言具有良好的实用性和应用前景"
                                    : "这门语言的实用价值相对较低，但有其独特魅力"}
                              </p>
                            </div>
                          </div>

                          {/* Reasons to Learn */}
                          <div className="space-y-3">
                            <h4 className="text-lg font-semibold text-gray-900">推荐理由</h4>
                            {selectedRecommendation.reasonsToLearn.map((reason, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{reason}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="difficulty" className="mt-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>个性化难度分析</CardTitle>
                          <CardDescription>基于您的语言背景定制的难度评估</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <h4 className="font-semibold text-gray-900">各项技能难度</h4>
                              {Object.entries(selectedRecommendation.personalizedDifficulty.factors).map(
                                ([skill, difficulty]) => (
                                  <div key={skill} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="capitalize text-gray-600">
                                        {skill === "grammar"
                                          ? "语法"
                                          : skill === "pronunciation"
                                            ? "发音"
                                            : skill === "vocabulary"
                                              ? "词汇"
                                              : "写作"}
                                      </span>
                                      <span className="font-medium">{difficulty.toFixed(1)}/5</span>
                                    </div>
                                    <Progress value={difficulty * 20} className="h-2" />
                                  </div>
                                ),
                              )}
                            </div>
                            <div className="space-y-4">
                              <h4 className="font-semibold text-gray-900">成功预测</h4>
                              <div className="p-4 bg-emerald-50 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-emerald-800 font-medium">成功概率</span>
                                  <span className="text-2xl font-bold text-emerald-600">
                                    {Math.round(selectedRecommendation.successPrediction.probability * 100)}%
                                  </span>
                                </div>
                                <p className="text-sm text-emerald-700 mb-3">
                                  预计学习时长：{selectedRecommendation.successPrediction.timeline}
                                </p>
                                <div className="space-y-1">
                                  {selectedRecommendation.successPrediction.factors.map((factor, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                                      <span className="text-sm text-emerald-700">{factor}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="path" className="mt-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>个性化学习路径</CardTitle>
                          <CardDescription>为您定制的阶段性学习计划</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {Object.entries(selectedRecommendation.learningPath).map(([level, topics]) => (
                            <div key={level} className="space-y-3">
                              <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                                <span
                                  className={`w-3 h-3 rounded-full ${
                                    level === "beginner"
                                      ? "bg-emerald-400"
                                      : level === "intermediate"
                                        ? "bg-amber-400"
                                        : "bg-rose-400"
                                  }`}
                                ></span>
                                <span>
                                  {level === "beginner"
                                    ? "初级阶段"
                                    : level === "intermediate"
                                      ? "中级阶段"
                                      : "高级阶段"}
                                </span>
                              </h4>
                              <div className="grid grid-cols-2 gap-2">
                                {topics.map((topic, index) => (
                                  <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-700">{topic}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}

                          <div className="mt-6 p-4 bg-sky-50 rounded-lg">
                            <h4 className="font-semibold text-sky-900 mb-2">推荐学习资源</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <h5 className="text-sm font-medium text-sky-800 mb-1">应用程序</h5>
                                <ul className="text-sm text-sky-700 space-y-1">
                                  {selectedRecommendation.resources.apps.map((app, index) => (
                                    <li key={index}>• {app}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-sky-800 mb-1">教材书籍</h5>
                                <ul className="text-sm text-sky-700 space-y-1">
                                  {selectedRecommendation.resources.books.map((book, index) => (
                                    <li key={index}>• {book}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h5 className="text-sm font-medium text-sky-800 mb-1">在线网站</h5>
                                <ul className="text-sm text-sky-700 space-y-1">
                                  {selectedRecommendation.resources.websites.map((website, index) => (
                                    <li key={index}>• {website}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="culture" className="mt-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>文化背景与特色</CardTitle>
                          <CardDescription>了解语言背后的丰富文化内涵</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3">语言基本信息</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">语系谱：</span>
                                  <span className="font-medium">{selectedRecommendation.language.family}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">文字系统：</span>
                                  <span className="font-medium">{selectedRecommendation.language.script}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">主要使用地区：</span>
                                  <span className="font-medium">
                                    {selectedRecommendation.language.regions.join("、")}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">使用人数：</span>
                                  <span className="font-medium">
                                    {(selectedRecommendation.language.speakers.total / 1000000).toFixed(0)}万
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3">文化特色</h4>
                              <div className="space-y-2">
                                {selectedRecommendation.culturalHighlights.map((highlight, index) => (
                                  <div key={index} className="flex items-center space-x-2">
                                    <Star className="w-4 h-4 text-amber-500" />
                                    <span className="text-gray-700">{highlight}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
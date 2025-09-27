"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  Star,
  Clock,
  TrendingUp,
  Users,
  BookOpen,
  Globe,
  ArrowRight,
  CheckCircle,
  Target,
  Brain,
  Sparkles,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  BarChart3,
  Calendar,
  Award,
  Zap
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import type {
  LanguageRecommendation,
  SurveyResponses,
  PersonalizedDifficulty,
  Language
} from "@/lib/types"

// 新的问卷数据结构接口
interface NewSurveyData {
  answers: Array<{
    questionId: string
    answer: string
    weight?: number
  }>
  userSource?: string
  contentInterest?: string
  nativeLanguage?: string
  languageExperience?: string
  learningPurpose?: string
  timeExpectation?: string
  culturalInterest?: string
  learningStyle?: string
  persistence?: string
  dailyTime?: string
}

// 模拟基于新数据结构的推荐算法结果
const generateMockRecommendations = (surveyData?: SurveyResponses | NewSurveyData): LanguageRecommendation[] => {
  const mockLanguage: Language = {
    id: "japanese",
    flag: "🇯🇵",
    name: "日语",
    nameEn: "Japanese",
    nativeName: "日本語",
    description: "东亚文化圈核心语言，具有丰富的文化内涵和实用价值",
    category: "cultural",
    writingSystem: ["japanese"],
    speakers: {
      native: 125000000,
      total: 130000000,
      countries: ["日本", "巴西", "美国"]
    },
    regions: [
      { code: "JP", name: "日本", primaryLanguage: true },
      { code: "BR", name: "巴西", primaryLanguage: false }
    ],
    culturalInfo: {
      history: "拥有千年历史的语言文化传统",
      traditions: ["茶道", "花道", "武道"],
      festivals: ["樱花节", "新年", "盂兰盆节"],
      cuisine: ["寿司", "拉面", "天妇罗"],
      arts: ["浮世绘", "俳句", "能剧"],
      literature: ["源氏物语", "俳句集", "现代文学"],
      modernCulture: ["动漫", "J-pop", "科技文化"]
    },
    resources: [],
    tags: ["文化", "动漫", "商务", "科技"],
    metadata: {
      iso639_1: "ja",
      iso639_2: "jpn",
      family: "日语语系",
      branch: "日语族",
      order: 3,
      featured: true,
      lastUpdated: new Date()
    },
    profile: {
      linguisticFamily: {
        family: "日语语系",
        branch: "日语族",
        isIsolate: true,
        familyCode: "JP"
      },
      writingSystem: {
        primaryType: "mixed",
        scripts: ["hiragana", "katakana", "kanji"],
        characterCount: 3000,
        direction: "ltr",
        complexity: 4
      },
      grammar: {
        wordOrder: "SOV",
        features: {
          tenseCount: 2,
          caseCount: 0,
          genderCount: 0,
          hasAspect: true,
          hasEvidentiality: false,
          agglutination: 3
        },
        complexity: 3
      },
      phonetics: {
        isTonal: false,
        toneCount: 0,
        phoneCount: 15,
        hasDifficultSounds: ["r", "tsu"],
        complexity: 2
      },
      culture: {
        formalityLevels: 5,
        culturalRegion: "east_asia",
        hofstedeScores: {
          powerDistance: 54,
          individualism: 46,
          uncertainty: 92
        }
      }
    },
    dynamicDifficulty: {
      baseDifficulty: 3.5,
      difficultyFactors: {
        familyWeight: 0.3,
        writingWeight: 0.25,
        grammarWeight: 0.2,
        phoneticWeight: 0.15,
        culturalWeight: 0.1
      }
    },
    learningTimeMatrix: {
      baseHours: {
        beginner: 480,
        intermediate: 960,
        advanced: 1440
      },
      timeModifiers: {
        intensiveBonus: 0.7,
        casualPenalty: 1.3,
        experienceBonus: 0.8,
        immersionBonus: 0.6
      }
    }
  }

  const personalizedDifficulty: PersonalizedDifficulty = {
    overallDifficulty: 2.8,
    timeEstimateWeeks: 36,
    breakdown: {
      familyRelation: 0.3,    // 汉字优势
      writingSystem: -0.2,    // 汉字系统熟悉
      grammar: 0.1,           // 语序差异
      phonetics: -0.1,        // 相对简单发音
      culture: -0.2           // 文化接触经验
    },
    confidence: 0.85,
    reasons: [
      "汉字基础降低了文字学习难度",
      "您的文化兴趣与日本文化高度匹配",
      "语音系统相对简单，适合中文母语者",
      "丰富的学习资源和文化内容"
    ]
  }

  return [
    {
      language: mockLanguage,
      personalizedDifficulty,
      matchScore: 94,
      rank: 1,
      reasons: {
        primary: [
          {
            type: "cultural_interest",
            description: "与您的文化兴趣目标高度契合（94%匹配）",
            score: 0.94,
            weight: 0.3
          },
          {
            type: "difficulty_match",
            description: "基于您的语言背景，难度适中且有汉字优势",
            score: 0.88,
            weight: 0.25
          },
          {
            type: "time_feasible",
            description: "预计学习时间与您的计划高度吻合",
            score: 0.92,
            weight: 0.2
          }
        ],
        secondary: [
          {
            type: "practical_value",
            description: "在商务和技术领域有很高实用价值",
            score: 0.85,
            weight: 0.15
          },
          {
            type: "experience_level",
            description: "适合您当前的语言学习经验水平",
            score: 0.80,
            weight: 0.1
          }
        ],
        warnings: [
          "敬语系统较为复杂，需要额外注意",
          "汉字读音多样，需要系统学习"
        ]
      },
      learningPath: {
        phases: [
          {
            name: "基础阶段",
            duration: "1-3个月",
            goals: ["掌握平假名片假名", "基础语法", "常用词汇300个"],
            milestones: ["能读写假名", "基本自我介绍", "简单日常对话"],
            resources: ["五十音图", "基础教材", "发音练习"],
            assessments: ["假名测试", "词汇测试", "口语评估"]
          },
          {
            name: "初级阶段",
            duration: "4-8个月",
            goals: ["常用汉字300个", "基础语法完成", "日常对话能力"],
            milestones: ["N5水平", "基本交流", "短文阅读"],
            resources: ["标准日本语", "汉字学习", "听力练习"],
            assessments: ["N5模拟考试", "会话测试", "阅读理解"]
          },
          {
            name: "中级阶段",
            duration: "9-18个月",
            goals: ["汉字1000个", "中级语法", "敬语入门"],
            milestones: ["N4-N3水平", "工作交流", "新闻理解"],
            resources: ["中级教材", "敬语学习", "商务日语"],
            assessments: ["N3考试", "商务场景测试", "文章写作"]
          }
        ],
        totalDuration: "18个月",
        difficultyProgression: [2.0, 2.5, 3.2],
        recommendedSchedule: {
          hoursPerWeek: 6,
          studyDays: 5,
          sessionLength: 75,
          restDays: ["周日"]
        }
      },
      analysis: {
        pros: [
          "汉字基础优势显著",
          "文化资源极其丰富",
          "学习社区活跃",
          "实用价值很高",
          "发音相对简单"
        ],
        cons: [
          "语法结构与中文差异较大",
          "敬语系统复杂",
          "三套文字系统需要掌握",
          "汉字读音多样化"
        ],
        alternatives: {
          easier: ["韩语", "泰语"],
          similar: ["韩语", "越南语"],
          harder: ["阿拉伯语", "芬兰语"]
        }
      },
      tracks: {
        intensive: {
          overallDifficulty: 2.4,
          timeEstimateWeeks: 26,
          breakdown: {
            familyRelation: 0.3,
            writingSystem: -0.3,
            grammar: 0.0,
            phonetics: -0.2,
            culture: -0.3
          },
          confidence: 0.9,
          reasons: ["密集学习加速进度", "沉浸式环境优势"]
        },
        regular: personalizedDifficulty,
        casual: {
          overallDifficulty: 3.2,
          timeEstimateWeeks: 52,
          breakdown: {
            familyRelation: 0.3,
            writingSystem: -0.1,
            grammar: 0.2,
            phonetics: 0.0,
            culture: -0.1
          },
          confidence: 0.75,
          reasons: ["较慢进度但压力小", "适合业余时间学习"]
        }
      },
      successPrediction: {
        probability: 0.87,
        timeline: "18个月内达到N3水平",
        challengePoints: [
          "第3-4个月的语法转换期",
          "第8-10个月的敬语学习",
          "第12-15个月的中级语法"
        ],
        supportNeeded: [
          "定期练习伙伴",
          "文化沉浸体验",
          "语法重点突破"
        ]
      }
    }
  ]
}

export default function RecommendationPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [recommendations, setRecommendations] = useState<LanguageRecommendation[]>([])
  const [surveyData, setSurveyData] = useState<SurveyResponses | NewSurveyData | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    // 模拟加载和处理时间
    const timer = setTimeout(() => {
      // 尝试从URL参数获取调查数据
      const dataParam = searchParams.get('data')
      if (dataParam) {
        try {
          const parsedData = JSON.parse(decodeURIComponent(dataParam))
          setSurveyData(parsedData)
        } catch (error) {
          console.error('Failed to parse survey data:', error)
        }
      }

      // 生成个性化推荐
      const mockRecommendations = generateMockRecommendations(surveyData || undefined)
      setRecommendations(mockRecommendations)
      setIsLoaded(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [searchParams, surveyData])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
            <p className="text-lg text-muted-foreground">正在基于您的语言背景计算个性化难度...</p>
            <div className="max-w-md mx-auto space-y-2 text-sm text-muted-foreground">
              <p>✓ 分析语系关系</p>
              <p>✓ 计算文字系统差异</p>
              <p>✓ 评估学习时间</p>
              <p>✓ 生成个性化推荐</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (recommendations.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <AlertTriangle className="w-16 h-16 mx-auto text-yellow-500" />
            <h2 className="text-2xl font-bold">暂无推荐结果</h2>
            <p className="text-muted-foreground">请先完成语言学习测评</p>
            <Button asChild>
              <Link href="/survey">开始测评</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const primaryRecommendation = recommendations[0]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 section-bg-learning">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Sparkles className="w-8 h-8 text-yellow-500" />
                <h1 className="text-4xl font-bold gradient-text">AI驱动的个性化语言推荐</h1>
                <Sparkles className="w-8 h-8 text-yellow-500" />
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                基于您的语言背景、学习目标和个人偏好，我们通过先进的算法为您计算了个性化难度并推荐最适合的语言
              </p>
            </motion.div>
          </div>

          {/* Primary Recommendation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <Card className="border-2 border-blue-200 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-500 to-purple-500 text-white px-6 py-2 rounded-bl-lg">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold">AI推荐</span>
                </div>
              </div>

              <CardHeader className="text-center space-y-6 pt-16">
                <div className="space-y-4">
                  <div className="text-6xl">{primaryRecommendation.language.flag}</div>
                  <div>
                    <h2 className="text-3xl font-bold">{primaryRecommendation.language.name}</h2>
                    <p className="text-xl text-muted-foreground">{primaryRecommendation.language.nativeName}</p>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{primaryRecommendation.matchScore}%</div>
                    <div className="text-sm text-muted-foreground">匹配度</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{primaryRecommendation.personalizedDifficulty.overallDifficulty.toFixed(1)}/5</div>
                    <div className="text-sm text-muted-foreground">个性化难度</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{primaryRecommendation.personalizedDifficulty.timeEstimateWeeks}周</div>
                    <div className="text-sm text-muted-foreground">预计达到中级</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{Math.round(primaryRecommendation.personalizedDifficulty.confidence * 100)}%</div>
                    <div className="text-sm text-muted-foreground">推荐置信度</div>
                  </div>
                </div>

                <Progress value={primaryRecommendation.matchScore} className="w-64 mx-auto" />
              </CardHeader>

              <CardContent className="space-y-8">
                <div className="text-center">
                  <p className="text-lg text-muted-foreground">
                    {primaryRecommendation.language.description}
                  </p>
                </div>

                {/* Difficulty Breakdown */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
                    个性化难度分析
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {Object.entries(primaryRecommendation.personalizedDifficulty.breakdown).map(([key, value], index) => {
                      const labels: Record<string, string> = {
                        familyRelation: "语系关系",
                        writingSystem: "文字系统",
                        grammar: "语法结构",
                        phonetics: "语音系统",
                        culture: "文化距离"
                      }
                      const isAdvantage = value < 0
                      return (
                        <Card key={index} className={`text-center p-4 border-0 ${isAdvantage ? 'bg-green-50' : 'bg-orange-50'}`}>
                          <div className={`text-2xl mb-2 ${isAdvantage ? 'text-green-600' : 'text-orange-600'}`}>
                            {isAdvantage ? '↓' : '↑'}
                          </div>
                          <h4 className="font-semibold mb-1">{labels[key]}</h4>
                          <p className="text-sm text-muted-foreground">
                            {isAdvantage ? '有优势' : '需注意'}
                          </p>
                        </Card>
                      )
                    })}
                  </div>
                </div>

                {/* Reasons */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-600" />
                    推荐理由
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center text-green-700">
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        主要优势
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {primaryRecommendation.reasons.primary.map((reason, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium">{reason.description}</span>
                              <div className="text-sm text-muted-foreground">
                                评分: {Math.round(reason.score * 100)}% (权重: {Math.round(reason.weight * 100)}%)
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {primaryRecommendation.reasons.warnings.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center text-amber-700">
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          需要注意
                        </h4>
                        <div className="space-y-2">
                          {primaryRecommendation.reasons.warnings.map((warning, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{warning}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="text-center space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="btn-gradient">
                      <Link href={`/languages/${primaryRecommendation.language.id}`}>
                        开始学习 {primaryRecommendation.language.name}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/survey">
                        重新测评
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Detailed Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <Tabs defaultValue="path" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="path">学习路径</TabsTrigger>
                <TabsTrigger value="tracks">学习轨道</TabsTrigger>
                <TabsTrigger value="analysis">优劣分析</TabsTrigger>
                <TabsTrigger value="prediction">成功预测</TabsTrigger>
              </TabsList>

              <TabsContent value="path" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      详细学习路径规划
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          推荐学习安排
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>每周学习时间:</span>
                            <span className="font-medium">{primaryRecommendation.learningPath.recommendedSchedule.hoursPerWeek}小时</span>
                          </div>
                          <div className="flex justify-between">
                            <span>每周学习天数:</span>
                            <span className="font-medium">{primaryRecommendation.learningPath.recommendedSchedule.studyDays}天</span>
                          </div>
                          <div className="flex justify-between">
                            <span>每次学习时长:</span>
                            <span className="font-medium">{primaryRecommendation.learningPath.recommendedSchedule.sessionLength}分钟</span>
                          </div>
                          <div className="flex justify-between">
                            <span>休息日:</span>
                            <span className="font-medium">{primaryRecommendation.learningPath.recommendedSchedule.restDays.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          难度进阶曲线
                        </h4>
                        <div className="space-y-2">
                          {primaryRecommendation.learningPath.difficultyProgression.map((difficulty, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <Badge variant="outline">{primaryRecommendation.learningPath.phases[index]?.name || `阶段${index + 1}`}</Badge>
                              <Progress value={difficulty * 20} className="flex-1" />
                              <span className="text-sm font-medium">{difficulty.toFixed(1)}/5</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {primaryRecommendation.learningPath.phases.map((phase, index) => (
                        <Card key={index} className="border-l-4 border-l-blue-500">
                          <CardContent className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div>
                                <div className="flex items-center space-x-3 mb-4">
                                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                    <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-lg">{phase.name}</h4>
                                    <p className="text-sm text-muted-foreground">{phase.duration}</p>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <div>
                                    <h5 className="font-medium mb-2">学习目标</h5>
                                    <ul className="text-sm space-y-1">
                                      {phase.goals.map((goal, idx) => (
                                        <li key={idx} className="flex items-center space-x-2">
                                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                          <span>{goal}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-3">
                                <div>
                                  <h5 className="font-medium mb-2">关键里程碑</h5>
                                  <ul className="text-sm space-y-1">
                                    {phase.milestones.map((milestone, idx) => (
                                      <li key={idx} className="flex items-center space-x-2">
                                        <Award className="w-3 h-3 text-yellow-600" />
                                        <span>{milestone}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="font-medium mb-2">评估方式</h5>
                                  <div className="flex flex-wrap gap-1">
                                    {phase.assessments.map((assessment, idx) => (
                                      <Badge key={idx} variant="secondary" className="text-xs">
                                        {assessment}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tracks" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      选择您的学习轨道
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {Object.entries(primaryRecommendation.tracks).map(([trackType, trackData]) => {
                        const trackLabels: Record<string, { name: string, desc: string, icon: string }> = {
                          casual: { name: "休闲轨道", desc: "适合业余时间学习", icon: "🚶‍♂️" },
                          regular: { name: "常规轨道", desc: "稳定持续的学习节奏", icon: "🚴‍♂️" },
                          intensive: { name: "密集轨道", desc: "快速提升，高强度学习", icon: "🏃‍♂️" }
                        }
                        const trackInfo = trackLabels[trackType]
                        return (
                          <Card key={trackType} className={`border-2 ${trackType === 'regular' ? 'border-blue-500 bg-blue-50/50' : 'border-muted'}`}>
                            <CardContent className="p-6 text-center space-y-4">
                              <div className="text-4xl">{trackInfo.icon}</div>
                              <div>
                                <h3 className="text-xl font-semibold">{trackInfo.name}</h3>
                                <p className="text-sm text-muted-foreground">{trackInfo.desc}</p>
                                {trackType === 'regular' && (
                                  <Badge variant="secondary" className="mt-2">推荐</Badge>
                                )}
                              </div>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">难度等级:</span>
                                  <span className="font-semibold">{trackData.overallDifficulty.toFixed(1)}/5</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">预计时间:</span>
                                  <span className="font-semibold">{trackData.timeEstimateWeeks}周</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">置信度:</span>
                                  <span className="font-semibold">{Math.round(trackData.confidence * 100)}%</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Progress value={trackData.overallDifficulty * 20} className="h-2" />
                                <div className="text-xs text-muted-foreground">
                                  {trackData.reasons.slice(0, 2).map((reason, idx) => (
                                    <div key={idx}>• {reason}</div>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analysis" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-green-700">
                        <ThumbsUp className="w-5 h-5 mr-2" />
                        学习优势
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {primaryRecommendation.analysis.pros.map((pro, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-orange-700">
                        <ThumbsDown className="w-5 h-5 mr-2" />
                        挑战点
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {primaryRecommendation.analysis.cons.map((con, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      替代选择
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-green-700">更容易的选择</h4>
                        <div className="space-y-2">
                          {primaryRecommendation.analysis.alternatives.easier.map((lang, idx) => (
                            <Badge key={idx} variant="outline" className="block w-fit">{lang}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-blue-700">相似难度</h4>
                        <div className="space-y-2">
                          {primaryRecommendation.analysis.alternatives.similar.map((lang, idx) => (
                            <Badge key={idx} variant="outline" className="block w-fit">{lang}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-red-700">更有挑战</h4>
                        <div className="space-y-2">
                          {primaryRecommendation.analysis.alternatives.harder.map((lang, idx) => (
                            <Badge key={idx} variant="outline" className="block w-fit">{lang}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="prediction" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        成功预测
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">
                          {Math.round(primaryRecommendation.successPrediction.probability * 100)}%
                        </div>
                        <p className="text-muted-foreground">成功概率</p>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold mb-2">预期成果</h4>
                          <p className="text-sm bg-green-50 p-3 rounded-lg">
                            {primaryRecommendation.successPrediction.timeline}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        潜在挑战点
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {primaryRecommendation.successPrediction.challengePoints.map((challenge, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      建议支持
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {primaryRecommendation.successPrediction.supportNeeded.map((support, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <span className="text-sm">{support}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

            </Tabs>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16 space-y-6"
          >
            <h2 className="text-3xl font-bold gradient-text">准备开始您的AI个性化语言学习之旅了吗？</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              基于深度算法分析的个性化推荐，为您量身定制的学习路径，立即开始高效学习体验
            </p>
            <div className="bg-blue-50 rounded-xl p-6 max-w-2xl mx-auto mb-8">
              <h3 className="font-semibold mb-3">🎯 您的个性化学习方案特色</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>基于语系关系的难度优化</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>文化匹配度精准计算</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>多轨道学习路径选择</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>AI成功率预测分析</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-gradient">
                <Link href={`/languages/${primaryRecommendation.language.id}`}>
                  开始学习 {primaryRecommendation.language.name}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/languages">
                  浏览其他语言
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/survey">
                  重新测评
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
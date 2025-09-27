'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Heart,
  Clock,
  Target,
  TrendingUp,
  Users,
  Globe,
  BookOpen,
  Calendar,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  RefreshCw
} from 'lucide-react'
import type { LanguageRecommendation, SurveyResponses } from '@/lib/types/survey'
import { generateLanguageRecommendations } from '@/lib/services/recommendation-service'
import { convertSurveyData } from '@/lib/utils/survey-data-converter'

// 前端问卷数据格式
interface FrontendSurveyData {
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
  culturalInterest?: string | string[]  // 支持多选
  learningStyle?: string
  persistence?: string
  difficultyPreference?: string  // 新增难度偏好
  dailyTime?: string
}

export default function RecommendationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [recommendations, setRecommendations] = useState<LanguageRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)

  useEffect(() => {
    const generateRecommendations = async () => {
      try {
        setLoading(true)
        setError(null)

        // 从URL参数或localStorage获取问卷结果
        const surveyData = searchParams.get('data') || localStorage.getItem('surveyResponses')

        if (!surveyData) {
          router.push('/survey')
          return
        }

        // 解析前端问卷数据
        const frontendData: FrontendSurveyData = JSON.parse(surveyData)

        // 转换为推荐算法所需格式
        const surveyResponses: SurveyResponses = convertSurveyData(frontendData)

        // 生成推荐
        const results = await generateLanguageRecommendations(surveyResponses)

        setRecommendations(results)
        if (results.length > 0) {
          setSelectedLanguage(results[0].language.id)
        }
      } catch (err) {
        console.error('Error generating recommendations:', err)
        setError('生成推荐失败，请重新尝试')
      } finally {
        setLoading(false)
      }
    }

    generateRecommendations()
  }, [searchParams, router])

  const handleLanguageSelect = (languageId: string) => {
    setSelectedLanguage(languageId)
  }

  const handleStartLearning = (languageId: string) => {
    router.push(`/languages/${languageId}`)
  }

  const handleRetakeSurvey = () => {
    localStorage.removeItem('surveyResponses')
    router.push('/survey')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-lg text-gray-600">正在为您生成个性化推荐...</p>
          <div className="mt-4 text-sm text-gray-500">
            <p>✓ 分析您的语言背景</p>
            <p>✓ 计算个性化难度</p>
            <p>✓ 匹配文化兴趣</p>
            <p>✓ 生成学习路径</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-red-600" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">出错了</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-x-4">
            <Button onClick={handleRetakeSurvey} variant="outline">
              重新测评
            </Button>
            <Button onClick={() => router.push('/')}>
              回到首页
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (recommendations.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">暂无推荐结果</h1>
          <p className="text-gray-600 mb-6">请先完成问卷评估</p>
          <Button onClick={handleRetakeSurvey}>
            开始测评
          </Button>
        </div>
      </div>
    )
  }

  const selectedRecommendation = recommendations.find(rec => rec.language.id === selectedLanguage)

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🎉 您的专属语言推荐
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              基于您的个人偏好和学习目标，我们为您精心挑选了最适合的语言学习方案
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 推荐列表 */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                  AI智能推荐
                </CardTitle>
                <CardDescription>
                  基于您的背景和目标的个性化排序
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recommendations.map((recommendation, index) => (
                  <div
                    key={recommendation.language.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedLanguage === recommendation.language.id
                        ? 'bg-indigo-50 border-2 border-indigo-200'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                    onClick={() => handleLanguageSelect(recommendation.language.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{recommendation.language.flag}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {recommendation.language.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {recommendation.language.nativeName}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={index === 0 ? "default" : "secondary"}
                        className={index === 0 ? "bg-gradient-to-r from-indigo-600 to-purple-600" : ""}
                      >
                        #{index + 1}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">匹配度</span>
                        <span className="font-medium">{recommendation.matchScore}%</span>
                      </div>
                      <Progress
                        value={recommendation.matchScore}
                        className="h-2"
                      />
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">个性化难度</span>
                        <span className="font-medium">
                          {recommendation.personalizedDifficulty.overallDifficulty.toFixed(1)}/5
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {recommendation.language.tags?.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="mt-4 flex gap-3">
              <Button
                variant="outline"
                onClick={handleRetakeSurvey}
                className="flex-1"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                重新测评
              </Button>
            </div>
          </div>

          {/* 详细信息 */}
          <div className="lg:col-span-2">
            {selectedRecommendation && (
              <div className="space-y-6">
                {/* 语言概览 */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{selectedRecommendation.language.flag}</span>
                        <div>
                          <CardTitle className="text-2xl">
                            {selectedRecommendation.language.name}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {selectedRecommendation.language.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant="default"
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2"
                      >
                        匹配度 {selectedRecommendation.matchScore}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2">
                          <Target className="h-6 w-6 text-blue-600" />
                        </div>
                        <p className="text-sm text-gray-600">个性化难度</p>
                        <p className="font-semibold">
                          {selectedRecommendation.personalizedDifficulty.overallDifficulty.toFixed(1)}/5
                        </p>
                        <p className="text-xs text-gray-500">
                          (标准: {selectedRecommendation.language.difficulty || 3}/5)
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
                          <Users className="h-6 w-6 text-green-600" />
                        </div>
                        <p className="text-sm text-gray-600">使用人数</p>
                        <p className="font-semibold">
                          {Math.round((selectedRecommendation.language.speakers?.total || 0) / 1000000)}M
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-2">
                          <Clock className="h-6 w-6 text-orange-600" />
                        </div>
                        <p className="text-sm text-gray-600">预计时长</p>
                        <p className="font-semibold">
                          {selectedRecommendation.successPrediction.timeline}
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2">
                          <Globe className="h-6 w-6 text-purple-600" />
                        </div>
                        <p className="text-sm text-gray-600">成功率</p>
                        <p className="font-semibold">
                          {Math.round(selectedRecommendation.successPrediction.probability * 100)}%
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleStartLearning(selectedRecommendation.language.id)}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      size="lg"
                    >
                      开始学习 {selectedRecommendation.language.name}
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </CardContent>
                </Card>

                {/* 详细信息标签页 */}
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
                        <CardTitle>AI智能推荐详解</CardTitle>
                        <CardDescription>
                          基于5个维度的综合评分，为您量身定制的语言推荐
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* 总体匹配度 */}
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-lg font-semibold text-gray-900">总体匹配度</h4>
                            <div className="text-2xl font-bold text-blue-600">{selectedRecommendation.matchScore}%</div>
                          </div>
                          <Progress value={selectedRecommendation.matchScore} className="h-3 mb-2" />
                          <p className="text-sm text-gray-600">
                            基于您的问卷回答，这门语言与您的需求高度匹配
                          </p>
                        </div>

                        {/* 5维度评分详解 */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">评分维度详解</h4>

                          {/* 文化匹配度 30% */}
                          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Globe className="h-5 w-5 text-purple-600" />
                                <span className="font-medium text-purple-900">文化兴趣匹配</span>
                                <Badge variant="secondary" className="text-xs">权重30%</Badge>
                              </div>
                              <span className="text-purple-700 font-semibold">{selectedRecommendation.dimensionScores.culturalMatch}分</span>
                            </div>
                            <Progress value={selectedRecommendation.dimensionScores.culturalMatch} className="h-2 mb-2" />
                            <p className="text-sm text-purple-800">
                              {selectedRecommendation.dimensionScores.culturalMatch >= 80
                                ? '与您选择的文化区域高度匹配，该语言在您感兴趣的文化圈中广泛使用'
                                : selectedRecommendation.dimensionScores.culturalMatch >= 60
                                ? '与您的文化兴趣有一定匹配度，具有学习价值'
                                : '与您的文化兴趣匹配度较低，但仍有其他优势'}
                            </p>
                          </div>

                          {/* 难度适配度 25% */}
                          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Target className="h-5 w-5 text-green-600" />
                                <span className="font-medium text-green-900">难度适配度</span>
                                <Badge variant="secondary" className="text-xs">权重25%</Badge>
                              </div>
                              <span className="text-green-700 font-semibold">{selectedRecommendation.dimensionScores.difficultyFit}分</span>
                            </div>
                            <Progress value={selectedRecommendation.dimensionScores.difficultyFit} className="h-2 mb-2" />
                            <p className="text-sm text-green-800">
                              {selectedRecommendation.dimensionScores.difficultyFit >= 80
                                ? '基于您的语言背景和难度偏好，这门语言的学习难度非常适合您'
                                : selectedRecommendation.dimensionScores.difficultyFit >= 60
                                ? '这门语言的难度对您来说比较合适，需要一定努力但可以掌握'
                                : '这门语言的难度对您来说有一定挑战性，需要更多时间和努力'}
                            </p>
                          </div>

                          {/* 学习目标匹配 20% */}
                          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-blue-600" />
                                <span className="font-medium text-blue-900">目标匹配度</span>
                                <Badge variant="secondary" className="text-xs">权重20%</Badge>
                              </div>
                              <span className="text-blue-700 font-semibold">{selectedRecommendation.dimensionScores.goalAlignment}分</span>
                            </div>
                            <Progress value={selectedRecommendation.dimensionScores.goalAlignment} className="h-2 mb-2" />
                            <p className="text-sm text-blue-800">
                              {selectedRecommendation.dimensionScores.goalAlignment >= 80
                                ? '该语言在您的学习目标领域（职业/旅游/文化/学术）具有极高的实用价值'
                                : selectedRecommendation.dimensionScores.goalAlignment >= 60
                                ? '该语言对您的学习目标有较好的支持作用'
                                : '该语言对您的主要学习目标帮助有限，但在其他方面有优势'}
                            </p>
                          </div>

                          {/* 时间可行性 15% */}
                          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-orange-600" />
                                <span className="font-medium text-orange-900">时间可行性</span>
                                <Badge variant="secondary" className="text-xs">权重15%</Badge>
                              </div>
                              <span className="text-orange-700 font-semibold">{selectedRecommendation.dimensionScores.timeFeasibility}分</span>
                            </div>
                            <Progress value={selectedRecommendation.dimensionScores.timeFeasibility} className="h-2 mb-2" />
                            <p className="text-sm text-orange-800">
                              {selectedRecommendation.dimensionScores.timeFeasibility >= 80
                                ? '根据您的时间安排和学习目标，在预期时间内达到理想水平具有很好的可行性'
                                : selectedRecommendation.dimensionScores.timeFeasibility >= 60
                                ? '在您的时间安排下，达到目标水平具有一定的可行性，需要坚持努力'
                                : '根据您的时间安排，这门语言可能需要更长时间才能达到理想水平'}
                            </p>
                          </div>

                          {/* 实用价值 10% */}
                          <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-indigo-600" />
                                <span className="font-medium text-indigo-900">实用价值</span>
                                <Badge variant="secondary" className="text-xs">权重10%</Badge>
                              </div>
                              <span className="text-indigo-700 font-semibold">{selectedRecommendation.dimensionScores.practicalValue}分</span>
                            </div>
                            <Progress value={selectedRecommendation.dimensionScores.practicalValue} className="h-2 mb-2" />
                            <p className="text-sm text-indigo-800">
                              {selectedRecommendation.dimensionScores.practicalValue >= 80
                                ? '该语言拥有大量使用人群和广泛的地理覆盖，具有很高的实用价值'
                                : selectedRecommendation.dimensionScores.practicalValue >= 60
                                ? '该语言有一定的使用人群和应用场景，具有不错的实用价值'
                                : '该语言使用人群相对较小，但在特定领域仍有价值'}
                            </p>
                          </div>
                        </div>

                        {/* 个性化推荐理由 */}
                        {selectedRecommendation.reasons.primary.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="font-medium text-gray-900">个性化推荐理由</h4>
                            {selectedRecommendation.reasons.primary.map((reason, index) => (
                              <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="font-medium text-green-900">{reason.description}</p>
                                  <div className="mt-1">
                                    <Progress value={reason.score * 100} className="h-2 w-32" />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {selectedRecommendation.reasons.warnings.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-medium text-gray-900 flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-amber-600" />
                              学习建议
                            </h4>
                            {selectedRecommendation.reasons.warnings.map((warning, index) => (
                              <div key={index} className="p-3 bg-amber-50 rounded-lg">
                                <p className="text-amber-800">{warning}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="difficulty" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>个性化难度分析</CardTitle>
                        <CardDescription>
                          基于您的语言背景和学习经验调整的难度评估
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                            <span className="text-gray-600">标准难度</span>
                            <span className="font-semibold">
                              {selectedRecommendation.language.difficulty || 3}/5
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-lg">
                            <span className="text-gray-600">个性化难度</span>
                            <span className="font-semibold text-indigo-700">
                              {selectedRecommendation.personalizedDifficulty.overallDifficulty.toFixed(1)}/5
                            </span>
                          </div>
                          <p className="text-gray-600">
                            根据您的语言背景和学习经验，我们为您调整了难度评估。
                          </p>

                          <div className="space-y-3 pt-4">
                            <h4 className="font-medium">影响因素分析:</h4>
                            {Object.entries(selectedRecommendation.personalizedDifficulty.breakdown).map(([factor, value], index) => {
                              const factorNames: Record<string, string> = {
                                familyRelation: '语系关系',
                                writingSystem: '文字系统',
                                grammar: '语法结构',
                                phonetics: '语音系统'
                              }
                              const isAdvantage = value < 0
                              return (
                                <div key={index} className={`flex items-center justify-between p-2 rounded ${isAdvantage ? 'bg-green-50' : 'bg-orange-50'}`}>
                                  <span className="text-sm">{factorNames[factor] || factor}</span>
                                  <div className="flex items-center gap-2">
                                    <span className={`text-sm font-medium ${isAdvantage ? 'text-green-700' : 'text-orange-700'}`}>
                                      {isAdvantage ? '有优势' : '有挑战'}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      ({value > 0 ? '+' : ''}{value.toFixed(1)})
                                    </span>
                                  </div>
                                </div>
                              )
                            })}
                          </div>

                          <div className="space-y-3 pt-4">
                            <h4 className="font-medium">可能的挑战点:</h4>
                            {selectedRecommendation.successPrediction.challengePoints.map((challenge, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-amber-500" />
                                <span className="text-gray-600">{challenge}</span>
                              </div>
                            ))}
                          </div>

                          <div className="space-y-3 pt-4">
                            <h4 className="font-medium">建议的支持:</h4>
                            {selectedRecommendation.successPrediction.supportNeeded.map((support, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-gray-600">{support}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="path" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>学习路径规划</CardTitle>
                        <CardDescription>
                          根据您的时间安排和学习目标定制的学习计划
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {selectedRecommendation.learningPath.phases.map((phase, index) => (
                            <div key={index} className="relative">
                              {index < selectedRecommendation.learningPath.phases.length - 1 && (
                                <div className="absolute left-4 top-12 w-0.5 h-16 bg-gray-200" />
                              )}
                              <div className="flex gap-4">
                                <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full text-sm font-medium flex-shrink-0">
                                  {index + 1}
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg text-gray-900">{phase.name}</h3>
                                  <p className="text-gray-600 mb-2">{phase.duration}</p>

                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-medium text-gray-900 mb-2">学习目标</h4>
                                      <ul className="space-y-1">
                                        {phase.goals.map((goal, goalIndex) => (
                                          <li key={goalIndex} className="text-sm text-gray-600 flex items-center gap-2">
                                            <Target className="h-3 w-3" />
                                            {goal}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div>
                                      <h4 className="font-medium text-gray-900 mb-2">重要里程碑</h4>
                                      <ul className="space-y-1">
                                        {phase.milestones.map((milestone, milestoneIndex) => (
                                          <li key={milestoneIndex} className="text-sm text-gray-600 flex items-center gap-2">
                                            <CheckCircle className="h-3 w-3" />
                                            {milestone}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">推荐学习计划</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">每周学习:</span>
                              <span className="ml-2 font-medium">{selectedRecommendation.learningPath.recommendedSchedule.hoursPerWeek}小时</span>
                            </div>
                            <div>
                              <span className="text-gray-600">学习天数:</span>
                              <span className="ml-2 font-medium">{selectedRecommendation.learningPath.recommendedSchedule.studyDays}天/周</span>
                            </div>
                            <div>
                              <span className="text-gray-600">单次时长:</span>
                              <span className="ml-2 font-medium">{selectedRecommendation.learningPath.recommendedSchedule.sessionLength}分钟</span>
                            </div>
                            <div>
                              <span className="text-gray-600">休息安排:</span>
                              <span className="ml-2 font-medium">{selectedRecommendation.learningPath.recommendedSchedule.restDays.join('、')}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="culture" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>文化背景介绍</CardTitle>
                        <CardDescription>
                          了解语言背后的文化内涵，让学习更有意义
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">语言历史</h4>
                            <p className="text-gray-600">{selectedRecommendation.language.culturalInfo?.history}</p>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">传统文化</h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedRecommendation.language.culturalInfo?.traditions?.map(tradition => (
                                  <Badge key={tradition} variant="outline">{tradition}</Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">节日庆典</h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedRecommendation.language.culturalInfo?.festivals?.map(festival => (
                                  <Badge key={festival} variant="outline">{festival}</Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">特色美食</h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedRecommendation.language.culturalInfo?.cuisine?.map(food => (
                                  <Badge key={food} variant="outline">{food}</Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">现代文化</h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedRecommendation.language.culturalInfo?.modernCulture?.map(culture => (
                                  <Badge key={culture} variant="outline">{culture}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-medium text-purple-900 mb-2">文化学习建议</h4>
                            <p className="text-sm text-purple-800">
                              学习语言的同时接触相关文化内容，可以让您的学习更加生动有趣，理解更加深入。
                              建议您多接触该文化的音乐、电影、书籍等，在文化浸润中提升语言水平。
                            </p>
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
  )
}
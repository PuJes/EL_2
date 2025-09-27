"use client"

import * as React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  TrendingUp,
  BookOpen,
  Clock,
  Target,
  Award,
  Calendar,
  Users,
  BarChart3,
  PieChart,
  Activity,
  Brain,
  Languages,
  Trophy,
  Zap,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Download,
  Share,
  Settings,
  ChevronDown,
  Eye,
  Globe
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import type {
  UserAnalytics,
  SkillProgress,
  LanguageLearningHistory,
  LanguageCertification,
  ProficiencyLevel
} from "@/lib/types"

// Enhanced Analytics Data Structure
interface LearningMetric {
  label: string
  value: number
  previousValue: number
  unit: string
  trend: 'up' | 'down' | 'stable'
  icon: React.ComponentType<{ className?: string }>
  color: string
}

interface ProgressChart {
  period: string
  listening: number
  speaking: number
  reading: number
  writing: number
  overall: number
}

interface WeeklyActivity {
  day: string
  hours: number
  sessions: number
  efficiency: number
}

interface LanguageComparison {
  language: string
  proficiency: ProficiencyLevel
  progress: number
  timeSpent: number
  difficulty: number
  nextMilestone: string
}

// Mock User Analytics Data
const mockUserAnalytics: UserAnalytics = {
  userId: "user123",
  totalStudyTime: 245,
  averageDailyTime: 35,
  streakDays: 18,
  longestStreak: 45,
  sessionsCompleted: 156,
  skillsImproved: 12,
  certificationsEarned: 3,
  weakAreas: ["speaking", "grammar"],
  strongAreas: ["reading", "vocabulary"],
  learningEfficiency: 0.78,
  motivationScore: 0.85,
  consistencyScore: 0.72,
  overallProgress: 0.65,
  lastActive: new Date("2024-01-15"),
  languageBreakdown: {
    "japanese": { timeSpent: 120, progress: 0.45, proficiency: "A2" },
    "spanish": { timeSpent: 85, progress: 0.32, proficiency: "A1" },
    "french": { timeSpent: 40, progress: 0.18, proficiency: "A1" }
  },
  monthlyStats: {
    studyTime: 98,
    improvement: 0.23,
    consistencyDays: 22,
    challengesCompleted: 45
  },
  recentAchievements: [
    "完成N5语法专项训练",
    "连续学习15天",
    "词汇量达到500",
    "完成口语挑战"
  ]
}

const learningMetrics: LearningMetric[] = [
  {
    label: "学习总时长",
    value: mockUserAnalytics.totalStudyTime,
    previousValue: 220,
    unit: "小时",
    trend: "up",
    icon: Clock,
    color: "text-blue-600"
  },
  {
    label: "连续学习天数",
    value: mockUserAnalytics.streakDays,
    previousValue: 12,
    unit: "天",
    trend: "up",
    icon: Calendar,
    color: "text-green-600"
  },
  {
    label: "学习效率",
    value: Math.round(mockUserAnalytics.learningEfficiency * 100),
    previousValue: 72,
    unit: "%",
    trend: "up",
    icon: Brain,
    color: "text-purple-600"
  },
  {
    label: "技能提升",
    value: mockUserAnalytics.skillsImproved,
    previousValue: 8,
    unit: "项",
    trend: "up",
    icon: TrendingUp,
    color: "text-orange-600"
  }
]

const progressChartData: ProgressChart[] = [
  { period: "第1周", listening: 20, speaking: 15, reading: 25, writing: 10, overall: 18 },
  { period: "第2周", listening: 35, speaking: 25, reading: 40, writing: 20, overall: 30 },
  { period: "第3周", listening: 50, speaking: 40, reading: 55, writing: 35, overall: 45 },
  { period: "第4周", listening: 65, speaking: 55, reading: 70, writing: 50, overall: 60 },
]

const weeklyActivity: WeeklyActivity[] = [
  { day: "周一", hours: 2.5, sessions: 3, efficiency: 0.8 },
  { day: "周二", hours: 1.8, sessions: 2, efficiency: 0.75 },
  { day: "周三", hours: 3.2, sessions: 4, efficiency: 0.85 },
  { day: "周四", hours: 2.1, sessions: 3, efficiency: 0.7 },
  { day: "周五", hours: 1.5, sessions: 2, efficiency: 0.65 },
  { day: "周六", hours: 4.0, sessions: 5, efficiency: 0.9 },
  { day: "周日", hours: 3.5, sessions: 4, efficiency: 0.88 }
]

const languageComparison: LanguageComparison[] = [
  {
    language: "日语",
    proficiency: "A2",
    progress: 45,
    timeSpent: 120,
    difficulty: 4,
    nextMilestone: "N4语法完成"
  },
  {
    language: "西班牙语",
    proficiency: "A1",
    progress: 32,
    timeSpent: 85,
    difficulty: 2,
    nextMilestone: "基础对话"
  },
  {
    language: "法语",
    proficiency: "A1",
    progress: 18,
    timeSpent: 40,
    difficulty: 3,
    nextMilestone: "语音入门"
  }
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("month")
  const [selectedTab, setSelectedTab] = useState("overview")

  const calculateTrend = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100
    return Math.round(change)
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center text-white space-y-6"
            >
              <div className="flex items-center justify-center space-x-4">
                <div className="p-3 bg-white/20 rounded-full">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">学习分析仪表板</h1>
              </div>
              <p className="text-xl max-w-3xl mx-auto opacity-90">
                深度分析您的语言学习进度，发现学习模式，优化学习策略
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
                {learningMetrics.map((metric, index) => {
                  const IconComponent = metric.icon
                  const trendValue = calculateTrend(metric.value, metric.previousValue)
                  const TrendIcon = metric.trend === 'up' ? ArrowUpRight : ArrowDownRight

                  return (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white/10 backdrop-blur rounded-lg p-6 text-center"
                    >
                      <IconComponent className={`w-8 h-8 mx-auto mb-3 ${metric.color}`} />
                      <div className="text-3xl font-bold mb-1">
                        {metric.value}{metric.unit}
                      </div>
                      <div className="text-sm opacity-80">{metric.label}</div>
                      <div className={`flex items-center justify-center mt-2 text-xs ${
                        metric.trend === 'up' ? 'text-green-300' : 'text-red-300'
                      }`}>
                        <TrendIcon className="w-3 h-3 mr-1" />
                        {Math.abs(trendValue)}%
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Analytics Dashboard */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">详细分析</h2>
                <p className="text-slate-600">深入了解您的学习表现和进度趋势</p>
              </div>
              <div className="flex gap-3">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">本周</SelectItem>
                    <SelectItem value="month">本月</SelectItem>
                    <SelectItem value="quarter">本季度</SelectItem>
                    <SelectItem value="year">本年</SelectItem>
                  </SelectContent>
                </Select>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Download className="w-4 h-4 mr-2" />
                      导出报告
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share className="w-4 h-4 mr-2" />
                      分享进度
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      设置目标
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="overview">概览</TabsTrigger>
                <TabsTrigger value="progress">进度分析</TabsTrigger>
                <TabsTrigger value="skills">技能详情</TabsTrigger>
                <TabsTrigger value="languages">语言对比</TabsTrigger>
                <TabsTrigger value="insights">学习洞察</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Weekly Activity Chart */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Activity className="w-5 h-5 mr-2" />
                        本周学习活动
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {weeklyActivity.map((day, index) => (
                          <div key={day.day} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="w-12 text-sm font-medium">{day.day}</span>
                              <div className="flex-1 bg-slate-200 rounded-full h-2 w-32">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${(day.hours / 4) * 100}%` }}
                                />
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold">{day.hours}h</div>
                              <div className="text-xs text-slate-500">{day.sessions}次</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Learning Streak */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-orange-500" />
                        学习连击
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <div className="text-4xl font-bold text-orange-500">
                        {mockUserAnalytics.streakDays}
                      </div>
                      <div className="text-sm text-slate-600">连续学习天数</div>
                      <div className="bg-orange-100 rounded-lg p-3">
                        <div className="text-xs text-orange-700 mb-1">目标：30天</div>
                        <Progress
                          value={(mockUserAnalytics.streakDays / 30) * 100}
                          className="h-2"
                        />
                      </div>
                      <div className="text-xs text-slate-500">
                        最长纪录：{mockUserAnalytics.longestStreak}天
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Achievements */}
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                        最近成就
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {mockUserAnalytics.recentAchievements.map((achievement, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                            <Award className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                            <span className="text-sm font-medium">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Progress Analysis Tab */}
              <TabsContent value="progress" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Skills Progress Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>技能进度趋势</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {progressChartData.map((data, index) => (
                          <div key={data.period} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{data.period}</span>
                              <span className="font-semibold">{data.overall}%</span>
                            </div>
                            <div className="grid grid-cols-4 gap-2 text-xs">
                              <div>
                                <div className="text-slate-600">听力</div>
                                <Progress value={data.listening} className="h-2" />
                              </div>
                              <div>
                                <div className="text-slate-600">口语</div>
                                <Progress value={data.speaking} className="h-2" />
                              </div>
                              <div>
                                <div className="text-slate-600">阅读</div>
                                <Progress value={data.reading} className="h-2" />
                              </div>
                              <div>
                                <div className="text-slate-600">写作</div>
                                <Progress value={data.writing} className="h-2" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle>学习效能分析</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">学习效率</span>
                            <span className="text-sm font-semibold">78%</span>
                          </div>
                          <Progress value={78} className="h-3" />
                          <p className="text-xs text-slate-500 mt-1">高于平均水平15%</p>
                        </div>

                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">学习动机</span>
                            <span className="text-sm font-semibold">85%</span>
                          </div>
                          <Progress value={85} className="h-3" />
                          <p className="text-xs text-slate-500 mt-1">保持良好的学习热情</p>
                        </div>

                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">学习一致性</span>
                            <span className="text-sm font-semibold">72%</span>
                          </div>
                          <Progress value={72} className="h-3" />
                          <p className="text-xs text-slate-500 mt-1">建议提高学习规律性</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Skills Details Tab */}
              <TabsContent value="skills" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {['听力', '口语', '阅读', '写作'].map((skill, index) => {
                    const progress = [65, 55, 70, 50][index]
                    const level = ['B1', 'A2', 'B1', 'A2'][index]
                    const improvement = ['+12%', '+8%', '+15%', '+6%'][index]

                    return (
                      <Card key={skill}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">{skill}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-1">{level}</div>
                            <div className="text-sm text-slate-600">当前水平</div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm">进度</span>
                              <span className="text-sm font-semibold">{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span>本月提升</span>
                            <span className="text-green-600 font-semibold">{improvement}</span>
                          </div>

                          <Button size="sm" variant="outline" className="w-full">
                            <Eye className="w-4 h-4 mr-2" />
                            查看详情
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>

              {/* Languages Comparison Tab */}
              <TabsContent value="languages" className="space-y-6">
                <div className="space-y-6">
                  {languageComparison.map((lang, index) => (
                    <Card key={lang.language}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                              {lang.language.charAt(0)}
                            </div>
                            <div>
                              <CardTitle className="text-xl">{lang.language}</CardTitle>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="secondary">{lang.proficiency}</Badge>
                                <span className="text-sm text-slate-600">
                                  学习时长: {lang.timeSpent}小时
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">{lang.progress}%</div>
                            <div className="text-sm text-slate-600">完成度</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3">学习进度</h4>
                            <Progress value={lang.progress} className="h-3 mb-2" />
                            <p className="text-sm text-slate-600">下一目标: {lang.nextMilestone}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3">难度等级</h4>
                            <div className="flex items-center space-x-2">
                              {[1,2,3,4,5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-5 h-5 ${
                                    star <= lang.difficulty
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-slate-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-sm text-slate-600 mt-1">
                              {lang.difficulty}/5 难度
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3">投入时间</h4>
                            <div className="text-2xl font-bold text-green-600 mb-1">
                              {lang.timeSpent}h
                            </div>
                            <p className="text-sm text-slate-600">总学习时长</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Learning Insights Tab */}
              <TabsContent value="insights" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Strengths and Weaknesses */}
                  <Card>
                    <CardHeader>
                      <CardTitle>学习优势与弱项</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-green-600 mb-3">优势领域</h4>
                        <div className="space-y-2">
                          {mockUserAnalytics.strongAreas.map((area) => (
                            <div key={area} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full" />
                              <span className="text-sm capitalize">{area}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-orange-600 mb-3">需要改进</h4>
                        <div className="space-y-2">
                          {mockUserAnalytics.weakAreas.map((area) => (
                            <div key={area} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-orange-500 rounded-full" />
                              <span className="text-sm capitalize">{area}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle>个性化建议</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">学习时间优化</h4>
                          <p className="text-sm text-blue-700">
                            根据您的学习模式，建议在上午9-11点进行复杂概念学习，效率最高。
                          </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">技能平衡建议</h4>
                          <p className="text-sm text-green-700">
                            您的阅读能力较强，建议增加口语练习时间，以达到更好的技能平衡。
                          </p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg">
                          <h4 className="font-semibold text-purple-800 mb-2">学习策略调整</h4>
                          <p className="text-sm text-purple-700">
                            考虑增加互动式学习内容，这能提高您25%的学习效率。
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center text-white space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                继续您的学习之旅
              </h2>
              <p className="text-xl max-w-2xl mx-auto opacity-90">
                基于您的分析数据，我们为您推荐最适合的学习路径和内容
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                  <BookOpen className="mr-2 h-5 w-5" />
                  继续学习
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Target className="mr-2 h-5 w-5" />
                  设置新目标
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
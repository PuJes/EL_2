"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Search,
  Users,
  MessageSquare,
  GraduationCap,
  Clock,
  Globe,
  BookOpen,
  Target,
  TrendingUp,
  Smartphone,
  Brain,
  X,
} from "lucide-react"

// UI Components
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline" | "ghost"
    size?: "sm" | "default" | "lg"
    disabled?: boolean
  }
>(({ className = "", variant = "default", size = "default", disabled = false, children, ...props }, ref) => {
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

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`

  return (
    <button className={classes} ref={ref} disabled={disabled} {...props}>
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
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "secondary" }
>(({ className = "", variant = "default", ...props }, ref) => {
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
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

// Survey Data Types
interface SurveyAnswer {
  questionId: string
  answer: string
  weight?: number
}

interface SurveyData {
  answers: SurveyAnswer[]
  userSource?: string
  contentInterest?: string
  nativeLanguage?: string
  languageExperience?: string
  learningPurpose?: string
  timeExpectation?: string
  culturalInterest?: string | string[]
  learningStyle?: string
  persistence?: string
  difficultyPreference?: string
  dailyTime?: string
}

// Survey Questions Definition
const surveyQuestions = [
  {
    id: "q1_user_source",
    title: "你是怎么了解到我们网站的？",
    description: "帮助我们了解用户来源，优化推广策略",
    options: [
      {
        id: "search_engine",
        label: "搜索引擎搜索相关关键词",
        icon: Search,
        weight: 1,
      },
      {
        id: "social_media",
        label: "社交媒体推荐（微博、小红书、抖音等）",
        icon: MessageSquare,
        weight: 1,
      },
      {
        id: "friend_referral",
        label: "朋友或同事推荐",
        icon: Users,
        weight: 1,
      },
      {
        id: "other_websites",
        label: "其他语言学习网站/论坛",
        icon: Globe,
        weight: 1,
      },
      {
        id: "other",
        label: "其他途径",
        icon: TrendingUp,
        weight: 1,
      },
    ],
  },
  {
    id: "q2_content_interest",
    title: "你最希望从我们网站了解什么内容？",
    description: "帮助我们了解用户需求，提供更有价值的内容",
    options: [
      {
        id: "difficulty_comparison",
        label: "不同语言的学习难度对比分析",
        icon: Target,
        weight: 0.25,
      },
      {
        id: "cultural_introduction",
        label: "各种语言的文化背景和特色介绍",
        icon: Globe,
        weight: 0.25,
      },
      {
        id: "personalized_recommendation",
        label: "个性化的语言选择建议",
        icon: Target,
        weight: 0.25,
      },
      {
        id: "learning_methods",
        label: "具体的学习方法和学习资源推荐",
        icon: BookOpen,
        weight: 0.25,
      },
      {
        id: "time_planning",
        label: "学习时间规划和进度安排",
        icon: Clock,
        weight: 0.2,
      },
      {
        id: "just_browsing",
        label: "只是随便看看，没有特定目的",
        icon: TrendingUp,
        weight: 0,
      },
    ],
  },
  {
    id: "q3_native_language",
    title: "你的母语是什么？",
    description: "用于计算学习难度和推荐合适的语言",
    options: [
      {
        id: "chinese",
        label: "中文",
        icon: Globe,
        flag: "🇨🇳",
        weight: 1,
      },
      {
        id: "english",
        label: "英语",
        icon: Globe,
        flag: "🇺🇸",
        weight: 1,
      },
      {
        id: "spanish",
        label: "西班牙语",
        icon: Globe,
        flag: "🇪🇸",
        weight: 1,
      },
      {
        id: "french",
        label: "法语",
        icon: Globe,
        flag: "🇫🇷",
        weight: 1,
      },
      {
        id: "german",
        label: "德语",
        icon: Globe,
        flag: "🇩🇪",
        weight: 1,
      },
      {
        id: "italian",
        label: "意大利语",
        icon: Globe,
        flag: "🇮🇹",
        weight: 1,
      },
      {
        id: "portuguese",
        label: "葡萄牙语",
        icon: Globe,
        flag: "🇵🇹",
        weight: 1,
      },
      {
        id: "japanese",
        label: "日语",
        icon: Globe,
        flag: "🇯🇵",
        weight: 1,
      },
      {
        id: "korean",
        label: "韩语",
        icon: Globe,
        flag: "🇰🇷",
        weight: 1,
      },
      {
        id: "other",
        label: "其他语言",
        icon: Globe,
        flag: "🌐",
        weight: 1,
      },
    ],
  },
  {
    id: "q4_language_experience",
    title: "除了你的母语，你还能熟练使用多少门语言？",
    description: "评估你的语言学习经验（用于经验奖励计算）",
    options: [
      {
        id: "0",
        label: "0门（只会母语）",
        icon: BookOpen,
        weight: 1,
      },
      {
        id: "1",
        label: "1门",
        icon: MessageSquare,
        weight: 1,
      },
      {
        id: "2",
        label: "2门",
        icon: Globe,
        weight: 1,
      },
      {
        id: "3",
        label: "3门",
        icon: GraduationCap,
        weight: 1,
      },
      {
        id: "4+",
        label: "4门或以上",
        icon: Target,
        weight: 1,
      },
    ],
  },
  {
    id: "q5_learning_purpose",
    title: "你学习新语言的主要目的是什么？",
    description: "帮助匹配最适合你需求的语言",
    options: [
      {
        id: "career",
        label: "职业发展",
        description: "商务交流和工作竞争力提升",
        icon: TrendingUp,
        weight: 1,
      },
      {
        id: "travel",
        label: "旅游出行",
        description: "在当地自由交流和深度体验",
        icon: Globe,
        weight: 1,
      },
      {
        id: "culture",
        label: "文化兴趣",
        description: "了解语言背后的文化、艺术和历史",
        icon: Globe,
        weight: 1,
      },
      {
        id: "academic",
        label: "学术研究",
        description: "留学深造或学术交流需要",
        icon: GraduationCap,
        weight: 1,
      },
      {
        id: "other",
        label: "其他原因",
        icon: MessageSquare,
        weight: 1,
      },
    ],
  },
  {
    id: "q6_time_expectation",
    title: "你希望在多长时间内达到基本的交流水平？",
    description: "评估时间可行性（支持算法的timeline分类）",
    options: [
      {
        id: "3months",
        label: "3个月内",
        description: "希望快速入门",
        icon: Clock,
        weight: 1,
      },
      {
        id: "6months",
        label: "6个月左右",
        description: "稳步提升",
        icon: TrendingUp,
        weight: 1,
      },
      {
        id: "1year",
        label: "1年时间",
        description: "扎实学习",
        icon: BookOpen,
        weight: 1,
      },
      {
        id: "2years",
        label: "2年时间",
        description: "深入掌握",
        icon: GraduationCap,
        weight: 1,
      },
      {
        id: "no_rush",
        label: "没有时间压力",
        description: "慢慢学习",
        icon: Target,
        weight: 1,
      },
    ],
  },
  {
    id: "q7_cultural_interest",
    title: "你对哪些地区或文化感兴趣？（可多选）",
    description: "精确匹配算法的culturalMapping区域分类",
    multiple: true,
    options: [
      {
        id: "east-asia",
        label: "东亚文化",
        description: "中国、日本、韩国",
        icon: Globe,
        flag: "🏮",
        weight: 1,
      },
      {
        id: "southeast-asia",
        label: "东南亚文化",
        description: "泰国、越南、印尼等",
        icon: Globe,
        flag: "🛕",
        weight: 1,
      },
      {
        id: "europe",
        label: "欧洲文化",
        description: "法国、德国、意大利、西班牙等",
        icon: Globe,
        flag: "🏛️",
        weight: 1,
      },
      {
        id: "latin-america",
        label: "拉丁美洲文化",
        description: "西班牙语和葡萄牙语国家",
        icon: Globe,
        flag: "🎭",
        weight: 1,
      },
      {
        id: "middle-east",
        label: "中东文化",
        description: "阿拉伯、波斯、土耳其等",
        icon: Globe,
        flag: "🕌",
        weight: 1,
      },
      {
        id: "africa",
        label: "非洲文化",
        description: "斯瓦希里语区、阿拉伯语区等",
        icon: Globe,
        flag: "🌍",
        weight: 1,
      },
      {
        id: "north-america",
        label: "北美文化",
        description: "美国、加拿大",
        icon: Globe,
        flag: "🗽",
        weight: 1,
      },
      {
        id: "oceania",
        label: "大洋洲文化",
        description: "澳大利亚、新西兰等",
        icon: Globe,
        flag: "🏝️",
        weight: 1,
      },
      {
        id: "no_preference",
        label: "没有特别偏好",
        icon: Target,
        weight: 0,
      },
    ],
  },
  {
    id: "q8_learning_style",
    title: "你更喜欢哪种学习方式？",
    description: "为你推荐合适的学习路径",
    options: [
      {
        id: "systematic",
        label: "系统化学习，从语法规则开始",
        icon: BookOpen,
        weight: 1,
      },
      {
        id: "practical",
        label: "实践导向，通过对话和应用学习",
        icon: MessageSquare,
        weight: 1,
      },
      {
        id: "cultural_immersion",
        label: "文化沉浸，通过影视音乐等内容学习",
        icon: Globe,
        weight: 1,
      },
      {
        id: "mixed",
        label: "混合式学习，结合多种方式",
        icon: Target,
        weight: 1,
      },
      {
        id: "need_advice",
        label: "还不确定，希望得到建议",
        icon: TrendingUp,
        weight: 1,
      },
    ],
  },
  {
    id: "q9_persistence",
    title: "你认为自己的学习坚持能力如何？",
    description: "评估你的自律程度，推荐合适难度的学习路径",
    options: [
      {
        id: "very_strong",
        label: "很强，一旦开始就会坚持到底",
        icon: Target,
        weight: 1,
      },
      {
        id: "good",
        label: "还不错，能坚持几个月以上",
        icon: TrendingUp,
        weight: 1,
      },
      {
        id: "average",
        label: "一般，容易受挫折影响",
        icon: Clock,
        weight: 1,
      },
      {
        id: "weak",
        label: "比较弱，经常三天热度",
        icon: MessageSquare,
        weight: 1,
      },
      {
        id: "uncertain",
        label: "不太确定",
        icon: BookOpen,
        weight: 1,
      },
    ],
  },
  {
    id: "q10_difficulty_preference",
    title: "你倾向于学习什么难度的语言？",
    description: "支持算法的userPreference参数（1-5难度级别）",
    options: [
      {
        id: "1",
        label: "简单易学",
        description: "快速上手（难度1-2级）",
        icon: BookOpen,
        weight: 1,
      },
      {
        id: "2",
        label: "中等难度",
        description: "平衡挑战与可行性（难度3级）",
        icon: Target,
        weight: 2,
      },
      {
        id: "3",
        label: "较有挑战",
        description: "愿意投入更多努力（难度4级）",
        icon: TrendingUp,
        weight: 3,
      },
      {
        id: "4",
        label: "最有挑战",
        description: "享受克服困难的过程（难度5级）",
        icon: GraduationCap,
        weight: 4,
      },
      {
        id: "5",
        label: "听从推荐",
        description: "没有特别偏好",
        icon: MessageSquare,
        weight: 3,
      },
    ],
  },
  {
    id: "q11_daily_time",
    title: "你每天能投入多长时间学习语言？",
    description: "支持算法的timeCommitment分类",
    options: [
      {
        id: "intensive",
        label: "2小时或以上",
        description: "密集学习",
        icon: Clock,
        weight: 1,
      },
      {
        id: "regular",
        label: "1小时左右",
        description: "常规学习",
        icon: Clock,
        weight: 1,
      },
      {
        id: "light",
        label: "30分钟左右",
        description: "轻松学习",
        icon: Clock,
        weight: 1,
      },
      {
        id: "irregular",
        label: "时间不固定",
        description: "碎片化学习",
        icon: Smartphone,
        weight: 1,
      },
    ],
  },
]

// Main Survey Component
export default function LanguageSurveyPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [surveyData, setSurveyData] = useState<SurveyData>({
    answers: [],
  })
  const [isCompleted, setIsCompleted] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([])

  const currentQuestion = surveyQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / surveyQuestions.length) * 100

  // Get current answer from cache
  const currentAnswer = useMemo(() => {
    return surveyData.answers.find((a) => a.questionId === currentQuestion.id)?.answer || ""
  }, [surveyData.answers, currentQuestion.id])

  // Handle option selection for both single and multiple choice
  const handleOptionSelect = React.useCallback(
    (optionId: string) => {
      const isMultiple = currentQuestion.multiple || false

      if (isMultiple) {
        // Multiple choice logic
        const currentSelections = selectedMultiple.includes(optionId)
          ? selectedMultiple.filter((id) => id !== optionId)
          : [...selectedMultiple, optionId]

        setSelectedMultiple(currentSelections)

        // Save multiple choice answer
        const newAnswer: SurveyAnswer = {
          questionId: currentQuestion.id,
          answer: JSON.stringify(currentSelections),
          weight: 1,
        }

        const updatedAnswers = surveyData.answers.filter((a) => a.questionId !== currentQuestion.id)
        updatedAnswers.push(newAnswer)

        setSurveyData((prev) => ({
          ...prev,
          answers: updatedAnswers,
          ...(currentQuestion.id === "q7_cultural_interest" && { culturalInterest: currentSelections }),
        }))
      } else {
        // Single choice logic
        const newAnswer: SurveyAnswer = {
          questionId: currentQuestion.id,
          answer: optionId,
          weight: currentQuestion.options.find((opt) => opt.id === optionId)?.weight || 1,
        }

        const updatedAnswers = surveyData.answers.filter((a) => a.questionId !== currentQuestion.id)
        updatedAnswers.push(newAnswer)

        setSurveyData((prev) => ({
          ...prev,
          answers: updatedAnswers,
          // Update corresponding fields based on question ID
          ...(currentQuestion.id === "q1_user_source" && { userSource: optionId }),
          ...(currentQuestion.id === "q2_content_interest" && { contentInterest: optionId }),
          ...(currentQuestion.id === "q3_native_language" && { nativeLanguage: optionId }),
          ...(currentQuestion.id === "q4_language_experience" && { languageExperience: optionId }),
          ...(currentQuestion.id === "q5_learning_purpose" && { learningPurpose: optionId }),
          ...(currentQuestion.id === "q6_time_expectation" && { timeExpectation: optionId }),
          ...(currentQuestion.id === "q8_learning_style" && { learningStyle: optionId }),
          ...(currentQuestion.id === "q9_persistence" && { persistence: optionId }),
          ...(currentQuestion.id === "q10_difficulty_preference" && { difficultyPreference: optionId }),
          ...(currentQuestion.id === "q11_daily_time" && { dailyTime: optionId }),
        }))

        setSelectedAnswer(optionId)

        // Auto-advance after selection
        setTimeout(() => {
          if (currentQuestionIndex < surveyQuestions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1)
            setSelectedAnswer("")
          } else {
            setIsCompleted(true)
          }
        }, 600) // Increased delay for better UX
      }
    },
    [currentQuestion, surveyData.answers, currentQuestionIndex, selectedMultiple],
  )

  // Navigate to previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
      setSelectedAnswer("")
      setSelectedMultiple([])
    }
  }

  // Handle continue button for multiple choice questions
  const handleContinueMultiple = () => {
    if (selectedMultiple.length > 0) {
      if (currentQuestionIndex < surveyQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
        setSelectedMultiple([])
      } else {
        setIsCompleted(true)
      }
    }
  }

  // Survey completion screen
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-pink-100">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-pink-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">问卷调研完成！</h1>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              感谢您完成问卷！我们将根据您的回答为您推荐最适合的语言学习方案。
            </p>

            <Button
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-xl hover:from-pink-600 hover:to-purple-600 shadow-lg"
              onClick={() => {
                // Store survey data in localStorage for recommendation page
                localStorage.setItem('surveyData', JSON.stringify(surveyData))
                // Navigate to recommendation page
                window.location.href = '/recommendation'
              }}
            >
              查看推荐结果
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-100">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-2">
              {surveyQuestions.map((_, index) => (
                <div key={index} className="flex-1 h-2 bg-pink-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      index < currentQuestionIndex
                        ? "bg-gradient-to-r from-mint-400 to-teal-400"
                        : index === currentQuestionIndex
                          ? "bg-gradient-to-r from-coral-400 to-pink-400"
                          : "bg-pink-100"
                    }`}
                    style={{
                      width: index < currentQuestionIndex ? "100%" : index === currentQuestionIndex ? "50%" : "0%",
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>问题 {currentQuestionIndex + 1}</span>
              <span>共 {surveyQuestions.length} 题</span>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-2 rounded-xl border-pink-200 text-pink-600 hover:bg-pink-50 disabled:opacity-50 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              上一题
            </Button>

            {currentQuestion.multiple ? (
              <Button
                onClick={handleContinueMultiple}
                disabled={selectedMultiple.length === 0}
                className="bg-gradient-to-r from-coral-500 to-pink-500 text-white px-6 py-2 rounded-xl hover:from-coral-600 hover:to-pink-600 disabled:opacity-50 shadow-lg"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <div className="text-sm text-gray-500">点击选项自动进入下一题</div>
            )}
          </div>

          <div className="text-center mb-8">
            <p className="text-sm text-pink-500 mb-2 font-medium">
              Question {currentQuestionIndex + 1}/{surveyQuestions.length}
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">{currentQuestion.title}</h2>
            <p className="text-gray-600">{currentQuestion.description}</p>
          </div>

          <div
            className={`mb-6 ${
              currentQuestion.options.length <= 4
                ? "space-y-3"
                : currentQuestion.options.length <= 6
                  ? "grid grid-cols-1 md:grid-cols-2 gap-3"
                  : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
            }`}
          >
            {currentQuestion.options.map((option, index) => {
              const isMultiple = currentQuestion.multiple || false
              const isSelected = isMultiple ? selectedMultiple.includes(option.id) : currentAnswer === option.id
              const isJustSelected = selectedAnswer === option.id

              const colorVariants = [
                "border-coral-300 bg-coral-50 hover:bg-coral-100",
                "border-mint-300 bg-mint-50 hover:bg-mint-100",
                "border-lavender-300 bg-lavender-50 hover:bg-lavender-100",
                "border-peach-300 bg-peach-50 hover:bg-peach-100",
                "border-sky-300 bg-sky-50 hover:bg-sky-100",
              ]

              const selectedVariants = [
                "border-coral-400 bg-coral-100 shadow-coral-200",
                "border-mint-400 bg-mint-100 shadow-mint-200",
                "border-lavender-400 bg-lavender-100 shadow-lavender-200",
                "border-peach-400 bg-peach-100 shadow-peach-200",
                "border-sky-400 bg-sky-100 shadow-sky-200",
              ]

              const colorIndex = index % colorVariants.length
              const baseColor = colorVariants[colorIndex]
              const selectedColor = selectedVariants[colorIndex]

              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left shadow-sm ${
                    isSelected || isJustSelected
                      ? `${selectedColor} shadow-lg transform scale-[1.02]`
                      : `border-gray-200 hover:border-gray-300 ${baseColor}`
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-xl flex-shrink-0">
                        {option.flag || (
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              isSelected || isJustSelected ? "bg-white shadow-sm" : "bg-white/70"
                            }`}
                          >
                            {React.createElement(option.icon, {
                              className: `w-3.5 h-3.5 ${isSelected || isJustSelected ? "text-gray-700" : "text-gray-600"}`,
                            })}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-800 text-sm mb-0.5">{option.label}</div>
                        {option.description && <div className="text-xs text-gray-600">{option.description}</div>}
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-mint-400 to-teal-400 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {selectedAnswer && (
          <div className="mt-4 bg-gradient-to-r from-mint-50 to-teal-50 border border-mint-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-mint-600" />
              <span className="text-mint-800 font-medium">选择成功</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
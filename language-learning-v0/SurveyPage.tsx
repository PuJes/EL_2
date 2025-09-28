'use client'

import * as React from "react"
import { useState, useMemo } from "react"
import { ArrowRight, ArrowLeft, CheckCircle, Search, Users, MessageSquare, GraduationCap, Clock, Globe, BookOpen, Target, TrendingUp, Smartphone, Menu, Brain } from "lucide-react"

// UI Components
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'outline' | 'ghost'
    size?: 'sm' | 'default' | 'lg'
    disabled?: boolean
  }
>(({ className = '', variant = 'default', size = 'default', disabled = false, children, ...props }, ref) => {
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

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`

  return (
    <button className={classes} ref={ref} disabled={disabled} {...props}>
      {children}
    </button>
  )
})
Button.displayName = "Button"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', ...props }, ref) => (
  <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className = '', ...props }, ref) => (
  <h3 ref={ref} className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
))
CardContent.displayName = "CardContent"

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value?: number }
>(({ className = '', value = 0, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative h-4 w-full overflow-hidden rounded-full bg-secondary ${className}`}
    {...props}
  >
    <div
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
))
Progress.displayName = "Progress"

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'secondary' }
>(({ className = '', variant = 'default', ...props }, ref) => {
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
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
        weight: 1
      },
      {
        id: "social_media",
        label: "社交媒体推荐（微博、小红书、抖音等）",
        icon: MessageSquare,
        weight: 1
      },
      {
        id: "friend_referral",
        label: "朋友或同事推荐",
        icon: Users,
        weight: 1
      },
      {
        id: "other_websites",
        label: "其他语言学习网站/论坛",
        icon: Globe,
        weight: 1
      },
      {
        id: "other",
        label: "其他途径",
        icon: TrendingUp,
        weight: 1
      }
    ]
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
        weight: 0.25
      },
      {
        id: "cultural_introduction",
        label: "各种语言的文化背景和特色介绍",
        icon: Globe,
        weight: 0.25
      },
      {
        id: "personalized_recommendation",
        label: "个性化的语言选择建议",
        icon: Target,
        weight: 0.25
      },
      {
        id: "learning_methods",
        label: "具体的学习方法和学习资源推荐",
        icon: BookOpen,
        weight: 0.25
      },
      {
        id: "time_planning",
        label: "学习时间规划和进度安排",
        icon: Clock,
        weight: 0.2
      },
      {
        id: "just_browsing",
        label: "只是随便看看，没有特定目的",
        icon: TrendingUp,
        weight: 0
      }
    ]
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
        weight: 1
      },
      {
        id: "english",
        label: "英语",
        icon: Globe,
        flag: "🇺🇸",
        weight: 1
      },
      {
        id: "spanish",
        label: "西班牙语",
        icon: Globe,
        flag: "🇪🇸",
        weight: 1
      },
      {
        id: "french",
        label: "法语",
        icon: Globe,
        flag: "🇫🇷",
        weight: 1
      },
      {
        id: "german",
        label: "德语",
        icon: Globe,
        flag: "🇩🇪",
        weight: 1
      },
      {
        id: "italian",
        label: "意大利语",
        icon: Globe,
        flag: "🇮🇹",
        weight: 1
      },
      {
        id: "portuguese",
        label: "葡萄牙语",
        icon: Globe,
        flag: "🇵🇹",
        weight: 1
      },
      {
        id: "japanese",
        label: "日语",
        icon: Globe,
        flag: "🇯🇵",
        weight: 1
      },
      {
        id: "korean",
        label: "韩语",
        icon: Globe,
        flag: "🇰🇷",
        weight: 1
      },
      {
        id: "other",
        label: "其他语言",
        icon: Globe,
        flag: "🌐",
        weight: 1
      }
    ]
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
        weight: 1
      },
      {
        id: "1",
        label: "1门",
        icon: MessageSquare,
        weight: 1
      },
      {
        id: "2",
        label: "2门",
        icon: Globe,
        weight: 1
      },
      {
        id: "3",
        label: "3门",
        icon: GraduationCap,
        weight: 1
      },
      {
        id: "4+",
        label: "4门或以上",
        icon: Target,
        weight: 1
      }
    ]
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
        weight: 1
      },
      {
        id: "travel",
        label: "旅游出行",
        description: "在当地自由交流和深度体验",
        icon: Globe,
        weight: 1
      },
      {
        id: "culture",
        label: "文化兴趣",
        description: "了解语言背后的文化、艺术和历史",
        icon: Globe,
        weight: 1
      },
      {
        id: "academic",
        label: "学术研究",
        description: "留学深造或学术交流需要",
        icon: GraduationCap,
        weight: 1
      },
      {
        id: "other",
        label: "其他原因",
        icon: MessageSquare,
        weight: 1
      }
    ]
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
        weight: 1
      },
      {
        id: "6months",
        label: "6个月左右",
        description: "稳步提升",
        icon: TrendingUp,
        weight: 1
      },
      {
        id: "1year",
        label: "1年时间",
        description: "扎实学习",
        icon: BookOpen,
        weight: 1
      },
      {
        id: "2years",
        label: "2年时间",
        description: "深入掌握",
        icon: GraduationCap,
        weight: 1
      },
      {
        id: "no_rush",
        label: "没有时间压力",
        description: "慢慢学习",
        icon: Target,
        weight: 1
      }
    ]
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
        weight: 1
      },
      {
        id: "southeast-asia",
        label: "东南亚文化",
        description: "泰国、越南、印尼等",
        icon: Globe,
        flag: "🛕",
        weight: 1
      },
      {
        id: "europe",
        label: "欧洲文化",
        description: "法国、德国、意大利、西班牙等",
        icon: Globe,
        flag: "🏛️",
        weight: 1
      },
      {
        id: "latin-america",
        label: "拉丁美洲文化",
        description: "西班牙语和葡萄牙语国家",
        icon: Globe,
        flag: "🎭",
        weight: 1
      },
      {
        id: "middle-east",
        label: "中东文化",
        description: "阿拉伯、波斯、土耳其等",
        icon: Globe,
        flag: "🕌",
        weight: 1
      },
      {
        id: "africa",
        label: "非洲文化",
        description: "斯瓦希里语区、阿拉伯语区等",
        icon: Globe,
        flag: "🌍",
        weight: 1
      },
      {
        id: "north-america",
        label: "北美文化",
        description: "美国、加拿大",
        icon: Globe,
        flag: "🗽",
        weight: 1
      },
      {
        id: "oceania",
        label: "大洋洲文化",
        description: "澳大利亚、新西兰等",
        icon: Globe,
        flag: "🏝️",
        weight: 1
      },
      {
        id: "no_preference",
        label: "没有特别偏好",
        icon: Target,
        weight: 0
      }
    ]
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
        weight: 1
      },
      {
        id: "practical",
        label: "实践导向，通过对话和应用学习",
        icon: MessageSquare,
        weight: 1
      },
      {
        id: "cultural_immersion",
        label: "文化沉浸，通过影视音乐等内容学习",
        icon: Globe,
        weight: 1
      },
      {
        id: "mixed",
        label: "混合式学习，结合多种方式",
        icon: Target,
        weight: 1
      },
      {
        id: "need_advice",
        label: "还不确定，希望得到建议",
        icon: TrendingUp,
        weight: 1
      }
    ]
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
        weight: 1
      },
      {
        id: "good",
        label: "还不错，能坚持几个月以上",
        icon: TrendingUp,
        weight: 1
      },
      {
        id: "average",
        label: "一般，容易受挫折影响",
        icon: Clock,
        weight: 1
      },
      {
        id: "weak",
        label: "比较弱，经常三天热度",
        icon: MessageSquare,
        weight: 1
      },
      {
        id: "uncertain",
        label: "不太确定",
        icon: BookOpen,
        weight: 1
      }
    ]
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
        weight: 1
      },
      {
        id: "2",
        label: "中等难度",
        description: "平衡挑战与可行性（难度3级）",
        icon: Target,
        weight: 2
      },
      {
        id: "3",
        label: "较有挑战",
        description: "愿意投入更多努力（难度4级）",
        icon: TrendingUp,
        weight: 3
      },
      {
        id: "4",
        label: "最有挑战",
        description: "享受克服困难的过程（难度5级）",
        icon: GraduationCap,
        weight: 4
      },
      {
        id: "5",
        label: "听从推荐",
        description: "没有特别偏好",
        icon: MessageSquare,
        weight: 3
      }
    ]
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
        weight: 1
      },
      {
        id: "regular",
        label: "1小时左右",
        description: "常规学习",
        icon: Clock,
        weight: 1
      },
      {
        id: "light",
        label: "30分钟左右",
        description: "轻松学习",
        icon: Clock,
        weight: 1
      },
      {
        id: "irregular",
        label: "时间不固定",
        description: "碎片化学习",
        icon: Smartphone,
        weight: 1
      }
    ]
  }
]

// Animation wrapper component
const AnimatePresence: React.FC<{ children: React.ReactNode; mode?: string }> = ({ children }) => {
  return <div className="transition-all duration-150 ease-out">{children}</div>
}

// Motion div component
const MotionDiv: React.FC<{
  children: React.ReactNode
  className?: string
  onClick?: () => void
  initial?: { [key: string]: any }
  animate?: { [key: string]: any }
  exit?: { [key: string]: any }
  transition?: { [key: string]: any }
  whileHover?: { [key: string]: any }
  whileTap?: { [key: string]: any }
}> = ({ children, className, onClick, ...motionProps }) => {
  return (
    <div
      className={`${className} transition-all duration-100 hover:scale-[1.005] active:scale-[0.995]`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

// Header Component
const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Globe className="w-8 h-8 text-purple-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              语言世界
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">首页</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">语言推荐</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">文化探索</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">学习资源</a>
          </nav>
          <Button size="sm" className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
            返回首页
          </Button>
        </div>
      </div>
    </header>
  )
}

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Globe className="w-6 h-6 text-purple-400" />
            <span className="text-lg font-bold">语言世界</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 语言世界. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main Survey Component
export default function SurveyPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [surveyData, setSurveyData] = useState<SurveyData>({
    answers: []
  })
  const [isCompleted, setIsCompleted] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([])

  const currentQuestion = surveyQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / surveyQuestions.length) * 100

  // Get current answer from cache
  const currentAnswer = useMemo(() => {
    return surveyData.answers.find(a => a.questionId === currentQuestion.id)?.answer || ""
  }, [surveyData.answers, currentQuestion.id])

  // Handle option selection for both single and multiple choice
  const handleOptionSelect = React.useCallback((optionId: string) => {
    const isMultiple = currentQuestion.multiple || false

    if (isMultiple) {
      // Multiple choice logic
      const currentSelections = selectedMultiple.includes(optionId)
        ? selectedMultiple.filter(id => id !== optionId)
        : [...selectedMultiple, optionId]

      setSelectedMultiple(currentSelections)

      // Save multiple choice answer
      const newAnswer: SurveyAnswer = {
        questionId: currentQuestion.id,
        answer: JSON.stringify(currentSelections),
        weight: 1
      }

      const updatedAnswers = surveyData.answers.filter(a => a.questionId !== currentQuestion.id)
      updatedAnswers.push(newAnswer)

      setSurveyData(prev => ({
        ...prev,
        answers: updatedAnswers,
        ...(currentQuestion.id === "q7_cultural_interest" && { culturalInterest: currentSelections }),
      }))
    } else {
      // Single choice logic
      const newAnswer: SurveyAnswer = {
        questionId: currentQuestion.id,
        answer: optionId,
        weight: currentQuestion.options.find(opt => opt.id === optionId)?.weight || 1
      }

      const updatedAnswers = surveyData.answers.filter(a => a.questionId !== currentQuestion.id)
      updatedAnswers.push(newAnswer)

      setSurveyData(prev => ({
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
          setCurrentQuestionIndex(prev => prev + 1)
          setSelectedAnswer("")
        } else {
          setIsCompleted(true)
        }
      }, 300)
    }
  }, [currentQuestion, surveyData.answers, currentQuestionIndex, selectedMultiple])

  // Navigate to previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
      setSelectedAnswer("")
      setSelectedMultiple([])
    }
  }

  // Handle continue button for multiple choice questions
  const handleContinueMultiple = () => {
    if (selectedMultiple.length > 0) {
      if (currentQuestionIndex < surveyQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
        setSelectedMultiple([])
      } else {
        setIsCompleted(true)
      }
    }
  }

  // Survey completion screen
  if (isCompleted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-24 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center space-y-8"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  问卷调研完成！
                </h1>
                <p className="text-xl text-gray-600">
                  感谢您完成11题精简问卷！我们将根据您的个人背景、文化兴趣和学习目标，为您推荐最适合的语言和个性化学习方案。
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-semibold">基于您的问卷回答，AI将为您提供：</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span>AI智能语言推荐（匹配度评分）</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    <span>个性化难度调整</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <span>时间可行性分析</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-green-600" />
                    <span>5维度评分详解</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-8 py-3">
                  查看个性化推荐
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" className="px-8 py-3">
                  浏览所有语言
                </Button>
              </div>
            </MotionDiv>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Progress Header */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                    语言学习需求调研
                  </h1>
                  <p className="text-gray-600">
                    第 {currentQuestionIndex + 1} 题，共 {surveyQuestions.length} 题 • 预计3-5分钟
                  </p>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {Math.round(progress)}% 完成
                </Badge>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <MotionDiv
                key={currentQuestionIndex}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.5 }}
                transition={{ duration: 0.15 }}
              >
                <Card className="border-0 shadow-lg bg-white/50 backdrop-blur">
                  <CardHeader className="text-center space-y-4 pb-6">
                    <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                      {React.createElement(currentQuestion.options[0].icon || Brain, {
                        className: "w-8 h-8 text-blue-600"
                      })}
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      {currentQuestion.title}
                    </CardTitle>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                      {currentQuestion.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      {currentQuestion.options.map((option, index) => {
                        const isMultiple = currentQuestion.multiple || false
                        const isSelected = isMultiple
                          ? selectedMultiple.includes(option.id)
                          : currentAnswer === option.id
                        const isJustSelected = selectedAnswer === option.id

                        return (
                          <MotionDiv
                            key={option.id}
                            onClick={() => handleOptionSelect(option.id)}
                            className={`w-full p-6 rounded-2xl border-2 transition-colors text-left relative overflow-hidden cursor-pointer ${
                              isSelected || isJustSelected
                                ? "border-blue-500 bg-blue-50 shadow-lg"
                                : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                            }`}
                            whileHover={{ scale: 1.005 }}
                            whileTap={{ scale: 0.995 }}
                            transition={{ duration: 0.1 }}
                          >
                            {/* Selection animation background */}
                            {isJustSelected && !isMultiple && (
                              <MotionDiv
                                initial={{ scale: 0.8, opacity: 0.8 }}
                                animate={{ scale: 1, opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="absolute inset-0 bg-blue-200 rounded-2xl"
                              />
                            )}

                            <div className="flex items-start space-x-4 relative z-10">
                              <div className="text-3xl mt-1 flex-shrink-0">
                                {option.flag || React.createElement(option.icon, { className: "w-6 h-6" })}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-lg leading-tight text-gray-900">
                                  {option.label}
                                </div>
                                {option.description && (
                                  <div className="text-sm text-gray-600 mt-1">
                                    {option.description}
                                  </div>
                                )}
                              </div>
                              {isSelected && (
                                <MotionDiv
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="flex-shrink-0"
                                >
                                  <CheckCircle className="w-6 h-6 text-blue-600" />
                                </MotionDiv>
                              )}
                            </div>
                          </MotionDiv>
                        )
                      })}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between pt-8">
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        className="flex items-center space-x-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>上一题</span>
                      </Button>

                      {currentQuestion.multiple ? (
                        <div className="flex items-center space-x-4">
                          <div className="text-sm text-gray-600">
                            已选择 {selectedMultiple.length} 项
                          </div>
                          <Button
                            onClick={handleContinueMultiple}
                            disabled={selectedMultiple.length === 0}
                            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
                          >
                            <span>继续</span>
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center text-sm text-gray-600">
                          💡 点击选项自动进入下一题
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </MotionDiv>
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

// CSS Variables (to be included in global styles)
const styles = `
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.649 0.237 267);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.671 0.171 200);
  --secondary-foreground: oklch(0.145 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.732 0.249 143);
  --accent-foreground: oklch(1 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.649 0.237 267);
}
`
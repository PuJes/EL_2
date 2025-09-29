'use client'

import * as React from "react"
import { ArrowRight, ArrowLeft, Globe, Star, Clock, Target, BookOpen, Users, Lightbulb, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

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

  if (asChild) {
    return <div className={classes} ref={ref} {...props}>{children}</div>
  }

  return (
    <button className={classes} ref={ref} {...props}>
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

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
))
CardContent.displayName = "CardContent"

// Language data (expanded from homepage)
const languageData = {
  spanish: {
    id: "spanish",
    name: "西班牙语",
    englishName: "Spanish",
    flag: "🇪🇸",
    speakers: "500M+",
    difficulty: 2,
    popularity: 95,
    culture: "拉丁美洲文化",
    description: "世界第二大母语，职场和旅游热门选择",
    detailedDescription: "西班牙语是世界上使用人数第二多的母语，在全球超过20个国家作为官方语言。学习西班牙语将为您打开拉丁美洲的大门，无论是商务、旅游还是文化交流，都有巨大的优势。",
    countries: ["西班牙", "墨西哥", "阿根廷", "哥伦比亚", "秘鲁", "委内瑞拉"],
    learningTips: [
      "从发音开始，西班牙语发音相对简单规律",
      "重点掌握动词变位，这是西班牙语的核心",
      "多听拉丁音乐和观看西语电影",
      "与母语者对话练习，提升口语能力"
    ],
    careerOpportunities: [
      "国际贸易与商务",
      "旅游与酒店管理",
      "翻译与口译",
      "教育与培训",
      "新闻传媒"
    ],
    estimatedTime: {
      basic: "3-6个月",
      intermediate: "1-2年",
      advanced: "2-3年"
    }
  },
  french: {
    id: "french",
    name: "法语",
    englishName: "French",
    flag: "🇫🇷",
    speakers: "280M+",
    difficulty: 3,
    popularity: 88,
    culture: "浪漫主义文化",
    description: "优雅的语言，艺术和时尚的象征",
    detailedDescription: "法语被誉为世界上最优美的语言之一，是国际外交、艺术、时尚和美食文化的重要载体。掌握法语不仅能让您欣赏法国文学的魅力，还能在国际组织和高端服务业中获得更多机会。",
    countries: ["法国", "加拿大", "瑞士", "比利时", "摩纳哥", "卢森堡"],
    learningTips: [
      "重视语音语调，法语的音律感很重要",
      "掌握动词变位和性数配合规则",
      "大量阅读法语文学作品",
      "观看法语电影，培养语感"
    ],
    careerOpportunities: [
      "外交与国际关系",
      "奢侈品与时尚行业",
      "艺术与文化产业",
      "国际组织工作",
      "高端旅游服务"
    ],
    estimatedTime: {
      basic: "4-8个月",
      intermediate: "1.5-2.5年",
      advanced: "3-4年"
    }
  },
  japanese: {
    id: "japanese",
    name: "日语",
    englishName: "Japanese",
    flag: "🇯🇵",
    speakers: "125M+",
    difficulty: 5,
    popularity: 92,
    culture: "东亚文化",
    description: "动漫文化和先进科技的语言",
    detailedDescription: "日语是通往日本丰富文化和先进技术的桥梁。从传统的茶道、武道到现代的动漫、游戏产业，日语学习者能够深入体验这个独特的文化。在科技、制造业和服务业领域，日语技能具有很高的价值。",
    countries: ["日本"],
    learningTips: [
      "从平假名和片假名开始，打好基础",
      "逐步学习汉字，理解其读音规律",
      "重视敬语系统，这是日语的特色",
      "通过动漫、日剧练习听力和口语"
    ],
    careerOpportunities: [
      "科技与制造业",
      "动漫游戏产业",
      "汽车工业",
      "电子产品研发",
      "日企管理职位"
    ],
    estimatedTime: {
      basic: "8-12个月",
      intermediate: "2-3年",
      advanced: "4-5年"
    }
  },
  german: {
    id: "german",
    name: "德语",
    englishName: "German",
    flag: "🇩🇪",
    speakers: "100M+",
    difficulty: 4,
    popularity: 85,
    culture: "欧洲工业文化",
    description: "工程技术和哲学思想的语言",
    detailedDescription: "德语是欧洲经济强国的语言，在工程技术、制造业、哲学和科学研究领域有着重要地位。德国作为欧盟的经济引擎，为德语学习者提供了丰富的职业发展机会。",
    countries: ["德国", "奥地利", "瑞士", "列支敦士登"],
    learningTips: [
      "重点掌握名词的性、数、格变化",
      "理解复合词的构成规律",
      "练习德语特有的语序结构",
      "多读德语技术文献和新闻"
    ],
    careerOpportunities: [
      "工程与制造业",
      "汽车工业",
      "机械设备",
      "科学研究",
      "国际贸易"
    ],
    estimatedTime: {
      basic: "6-10个月",
      intermediate: "1.5-2.5年",
      advanced: "3-4年"
    }
  },
  korean: {
    id: "korean",
    name: "韩语",
    englishName: "Korean",
    flag: "🇰🇷",
    speakers: "77M+",
    difficulty: 4,
    popularity: 90,
    culture: "韩流文化",
    description: "K-pop和韩剧推动的热门语言",
    detailedDescription: "韩语在全球韩流文化的推动下成为热门学习语言。韩国在科技、娱乐、美妆和时尚领域的影响力不断扩大，为韩语学习者创造了丰富的文化体验和职业机会。",
    countries: ["韩国", "朝鲜"],
    learningTips: [
      "掌握韩文字母（한글）的发音规律",
      "理解敬语系统的使用场合",
      "通过韩剧、K-pop练习听力",
      "重视语音变化规则"
    ],
    careerOpportunities: [
      "娱乐传媒产业",
      "美妆时尚行业",
      "科技公司",
      "国际贸易",
      "文化交流"
    ],
    estimatedTime: {
      basic: "6-9个月",
      intermediate: "1.5-2年",
      advanced: "3-4年"
    }
  },
  portuguese: {
    id: "portuguese",
    name: "葡萄牙语",
    englishName: "Portuguese",
    flag: "🇵🇹",
    speakers: "260M+",
    difficulty: 3,
    popularity: 82,
    culture: "卢西塔尼亚文化",
    description: "巴西和葡语国家的官方语言",
    detailedDescription: "葡萄牙语是全球第六大语言，在巴西这个拉美最大经济体中占主导地位。随着巴西经济的发展和葡语国家在国际舞台上的活跃，葡萄牙语学习者有很好的发展前景。",
    countries: ["巴西", "葡萄牙", "安哥拉", "莫桑比克", "东帝汶"],
    learningTips: [
      "区分巴西葡语和欧洲葡语的差异",
      "掌握动词变位系统",
      "练习鼻音的发音",
      "通过巴西音乐和电影学习"
    ],
    careerOpportunities: [
      "国际贸易",
      "能源与矿业",
      "足球产业",
      "旅游服务",
      "文化交流"
    ],
    estimatedTime: {
      basic: "4-7个月",
      intermediate: "1-2年",
      advanced: "2.5-3.5年"
    }
  }
}

// Difficulty indicator component
const DifficultyIndicator = ({ level }: { level: number }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full ${
            i <= level
              ? i <= 2 ? 'bg-green-500' : i <= 3 ? 'bg-yellow-500' : 'bg-red-500'
              : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

// Header Component for the detail page
const Header = ({ language }: { language: any }) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>返回首页</span>
            </Link>
            <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{language.flag}</span>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{language.name}</h1>
                <p className="text-sm text-gray-600">{language.englishName}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/survey">
              <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
                开始学习
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default function LanguageDetailPage() {
  const params = useParams()
  const languageId = params.id as string

  const language = languageData[languageId as keyof typeof languageData]

  if (!language) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">语言未找到</h1>
          <Link href="/">
            <Button variant="outline">返回首页</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header language={language} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-6xl">{language.flag}</span>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{language.name}</h1>
                  <p className="text-xl text-gray-600">{language.englishName}</p>
                </div>
              </div>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {language.detailedDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/survey">
                  <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-lg px-8 py-3">
                    开始个性化测评
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" className="text-lg px-8 py-3">
                  试听课程
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">{language.speakers}</div>
                <div className="text-sm text-gray-600">全球使用者</div>
              </Card>

              <Card className="p-6 text-center">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">{language.popularity}%</div>
                <div className="text-sm text-gray-600">热门度</div>
              </Card>

              <Card className="p-6 text-center">
                <Target className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <div className="flex justify-center mb-3">
                  <DifficultyIndicator level={language.difficulty} />
                </div>
                <div className="text-sm text-gray-600">学习难度</div>
              </Card>

              <Card className="p-6 text-center">
                <Globe className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-lg font-bold text-gray-900 mb-1">{language.countries.length}+</div>
                <div className="text-sm text-gray-600">使用国家</div>
              </Card>
            </div>
          </div>
        </section>

        {/* Details Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Learning Path */}
          <Card className="lg:col-span-2">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <BookOpen className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">学习路径</h2>
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">初级</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">基础入门</h3>
                  <p className="text-sm text-gray-600 mb-3">掌握基本语法和日常对话</p>
                  <div className="text-lg font-bold text-purple-600">{language.estimatedTime.basic}</div>
                </div>

                <div className="text-center">
                  <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-yellow-600">中级</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">进阶提升</h3>
                  <p className="text-sm text-gray-600 mb-3">流利交流和阅读理解</p>
                  <div className="text-lg font-bold text-purple-600">{language.estimatedTime.intermediate}</div>
                </div>

                <div className="text-center">
                  <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-red-600">高级</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">精通掌握</h3>
                  <p className="text-sm text-gray-600 mb-3">专业级别运用能力</p>
                  <div className="text-lg font-bold text-purple-600">{language.estimatedTime.advanced}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <div className="space-y-6">
            {/* Countries */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">主要使用国家</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {language.countries.map((country) => (
                    <span key={country} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                      {country}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Tips */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  <h3 className="text-lg font-semibold text-gray-900">学习建议</h3>
                </div>
                <ul className="space-y-2">
                  {language.learningTips.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Career Opportunities */}
        <Card className="mt-8">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">职业机会</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {language.careerOpportunities.map((opportunity, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-800">{opportunity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white p-8 mt-8 text-center">
          <h2 className="text-3xl font-bold mb-4">准备开始学习{language.name}了吗？</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            通过我们的个性化测评，获得专属的{language.name}学习计划和路径建议
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/survey">
              <Button className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-full">
                开始个性化测评
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" className="text-lg px-8 py-3 rounded-full border-white text-white hover:bg-white/10">
              查看更多语言
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
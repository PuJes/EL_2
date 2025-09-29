'use client'

import * as React from "react"
import { ArrowRight, ArrowLeft, Globe, MapPin, Users, BookOpen, Calendar, Award } from "lucide-react"
import Link from "next/link"

// UI Components
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

// Expanded culture regions data
const cultureRegions = [
  {
    id: "east-asia",
    name: "东亚文化圈",
    description: "深厚的历史底蕴与现代科技的完美融合",
    languages: ["中文", "日语", "韩语", "蒙古语"],
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: ["儒家文化", "茶道艺术", "书法传统", "现代科技"],
    countries: ["中国", "日本", "韩国", "蒙古", "朝鲜"],
    traditions: ["春节", "樱花节", "茶道", "书法", "武术"],
    modernInfluence: ["科技创新", "流行文化", "制造业", "动漫产业"]
  },
  {
    id: "europe",
    name: "欧洲文化圈",
    description: "艺术、哲学与浪漫主义的发源地",
    languages: ["法语", "德语", "意大利语", "西班牙语", "英语"],
    image: "https://images.unsplash.com/photo-1543735717-24da73e8d324?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: ["文艺复兴", "古典音乐", "建筑艺术", "葡萄酒文化"],
    countries: ["法国", "德国", "意大利", "西班牙", "英国", "荷兰"],
    traditions: ["歌剧", "芭蕾", "美食文化", "城堡建筑", "艺术博物馆"],
    modernInfluence: ["时尚产业", "奢侈品", "汽车工业", "旅游业"]
  },
  {
    id: "latin-america",
    name: "拉丁美洲文化圈",
    description: "热情奔放的音乐舞蹈与丰富多彩的节庆文化",
    languages: ["西班牙语", "葡萄牙语"],
    image: "https://images.unsplash.com/photo-1518123159102-4f0b5ad1a78b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: ["探戈舞", "足球文化", "玛雅文明", "嘉年华节"],
    countries: ["巴西", "阿根廷", "墨西哥", "哥伦比亚", "秘鲁", "智利"],
    traditions: ["萨尔萨舞", "足球", "咖啡文化", "手工艺品", "宗教节庆"],
    modernInfluence: ["音乐产业", "足球运动", "农业出口", "生态旅游"]
  },
  {
    id: "middle-east",
    name: "中东文化圈",
    description: "古老文明与现代发展的交汇点",
    languages: ["阿拉伯语", "波斯语", "土耳其语", "希伯来语"],
    image: "https://images.unsplash.com/photo-1539081031845-8ca4d7e67e8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: ["伊斯兰艺术", "古代文明", "香料贸易", "书法艺术"],
    countries: ["阿联酋", "沙特阿拉伯", "土耳其", "伊朗", "以色列", "埃及"],
    traditions: ["清真寺建筑", "书法", "地毯艺术", "香料料理", "诗歌文学"],
    modernInfluence: ["石油工业", "金融中心", "航空枢纽", "科技发展"]
  },
  {
    id: "africa",
    name: "非洲文化圈",
    description: "人类起源地的丰富多元文化",
    languages: ["斯瓦希里语", "阿拉伯语", "法语", "英语", "阿非利堪斯语"],
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: ["部落文化", "野生动物", "音乐节拍", "手工艺术"],
    countries: ["南非", "肯尼亚", "尼日利亚", "埃及", "摩洛哥", "加纳"],
    traditions: ["部落舞蹈", "口述历史", "面具艺术", "编织工艺", "打击乐"],
    modernInfluence: ["矿业资源", "生态旅游", "文化艺术", "农业发展"]
  },
  {
    id: "south-asia",
    name: "南亚文化圈",
    description: "古老智慧与现代活力的融合",
    languages: ["印地语", "乌尔都语", "孟加拉语", "泰米尔语", "信德语"],
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: ["瑜伽哲学", "宝莱坞", "香料文化", "宗教多样性"],
    countries: ["印度", "巴基斯坦", "孟加拉国", "斯里兰卡", "尼泊尔", "不丹"],
    traditions: ["瑜伽冥想", "宝莱坞电影", "香料料理", "节庆庆典", "纺织工艺"],
    modernInfluence: ["IT服务业", "制药工业", "纺织业", "电影产业"]
  }
]

// Header Component
const Header = () => {
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
              <Globe className="w-8 h-8 text-purple-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">世界文化探索</h1>
                <p className="text-sm text-gray-600">文化是语言学习的源泉</p>
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

// Culture Region Card Component
const CultureRegionCard = ({ region }: { region: typeof cultureRegions[0] }) => {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative h-64 overflow-hidden">
        <img
          src={region.image}
          alt={region.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-2xl font-bold mb-2">{region.name}</h3>
          <p className="text-sm opacity-90 mb-3">{region.description}</p>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{region.countries.length} 个国家</span>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              主要语言
            </h4>
            <div className="flex flex-wrap gap-2">
              {region.languages.map((lang) => (
                <span key={lang} className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              文化特色
            </h4>
            <div className="flex flex-wrap gap-2">
              {region.highlights.map((highlight) => (
                <span key={highlight} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              传统文化
            </h4>
            <div className="flex flex-wrap gap-2">
              {region.traditions.slice(0, 3).map((tradition) => (
                <span key={tradition} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                  {tradition}
                </span>
              ))}
              {region.traditions.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                  +{region.traditions.length - 3} 更多
                </span>
              )}
            </div>
          </div>
        </div>

        <Link href={`/culture/${region.id}`} className="block w-full mt-6">
          <Button variant="outline" className="w-full">
            深入探索
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default function CulturePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center py-16 mb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                探索世界文化
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              语言是文化的载体，了解不同文化背景能让您的语言学习更加深入和有意义。
              从古老的传统到现代的影响，每种文化都有独特的魅力等待探索。
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">6</div>
                <div className="text-gray-600">文化圈</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                <div className="text-gray-600">国家地区</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">30+</div>
                <div className="text-gray-600">主要语言</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
                <div className="text-gray-600">文化传统</div>
              </div>
            </div>
          </div>
        </section>

        {/* Culture Regions Grid */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              六大文化圈
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              每个文化圈都有其独特的语言特色、历史传统和现代发展，
              选择您感兴趣的文化开始探索吧！
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {cultureRegions.map((region) => (
              <CultureRegionCard key={region.id} region={region} />
            ))}
          </div>
        </section>

        {/* Cultural Learning Benefits */}
        <section className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              文化学习的益处
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              了解文化背景不仅能提升语言学习效果，还能拓展您的国际视野
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: "深度理解",
                description: "理解语言背后的文化含义，让表达更地道自然",
                color: "text-blue-600"
              },
              {
                icon: Users,
                title: "跨文化交流",
                description: "增强与不同文化背景人群的沟通能力",
                color: "text-green-600"
              },
              {
                icon: Award,
                title: "职业优势",
                description: "在国际化工作环境中具备文化敏感性",
                color: "text-purple-600"
              },
              {
                icon: Globe,
                title: "世界观拓展",
                description: "培养全球化思维和包容开放的心态",
                color: "text-orange-600"
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-4">
                  <benefit.icon className={`h-8 w-8 ${benefit.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white p-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            开始您的文化语言学习之旅
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            选择一个您感兴趣的文化圈，我们将为您推荐最适合的语言学习路径
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/survey">
              <Button className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-full">
                开始个性化测评
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/languages">
              <Button variant="outline" className="text-lg px-8 py-3 rounded-full border-white text-white hover:bg-white/10">
                浏览语言列表
                <Globe className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
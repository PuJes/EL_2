'use client'

import * as React from "react"
import { ArrowRight, Globe, Brain, GraduationCap, Wrench, Menu, Moon, Sun, Star, Users, BookOpen, Clock, Target, MapPin } from "lucide-react"

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

// Mock Language Data
const popularLanguages = [
  {
    id: "spanish",
    name: "西班牙语",
    englishName: "Spanish",
    flag: "🇪🇸",
    speakers: "500M+",
    difficulty: 2,
    popularity: 95,
    culture: "拉丁美洲文化",
    description: "世界第二大母语，职场和旅游热门选择"
  },
  {
    id: "french",
    name: "法语",
    englishName: "French",
    flag: "🇫🇷",
    speakers: "280M+",
    difficulty: 3,
    popularity: 88,
    culture: "浪漫主义文化",
    description: "优雅的语言，艺术和时尚的象征"
  },
  {
    id: "japanese",
    name: "日语",
    englishName: "Japanese",
    flag: "🇯🇵",
    speakers: "125M+",
    difficulty: 5,
    popularity: 92,
    culture: "东亚文化",
    description: "动漫文化和先进科技的语言"
  },
  {
    id: "german",
    name: "德语",
    englishName: "German",
    flag: "🇩🇪",
    speakers: "100M+",
    difficulty: 4,
    popularity: 85,
    culture: "欧洲工业文化",
    description: "工程技术和哲学思想的语言"
  },
  {
    id: "korean",
    name: "韩语",
    englishName: "Korean",
    flag: "🇰🇷",
    speakers: "77M+",
    difficulty: 4,
    popularity: 90,
    culture: "韩流文化",
    description: "K-pop和韩剧推动的热门语言"
  },
  {
    id: "portuguese",
    name: "葡萄牙语",
    englishName: "Portuguese",
    flag: "🇵🇹",
    speakers: "260M+",
    difficulty: 3,
    popularity: 82,
    culture: "卢西塔尼亚文化",
    description: "巴西和葡语国家的官方语言"
  }
]

// Culture regions data
const cultureRegions = [
  {
    id: "east-asia",
    name: "东亚文化圈",
    description: "深厚的历史底蕴与现代科技的完美融合",
    languages: ["中文", "日语", "韩语"],
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: ["儒家文化", "茶道艺术", "书法传统", "现代科技"]
  },
  {
    id: "europe",
    name: "欧洲文化圈",
    description: "艺术、哲学与浪漫主义的发源地",
    languages: ["法语", "德语", "意大利语", "西班牙语"],
    image: "https://images.unsplash.com/photo-1543735717-24da73e8d324?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: ["文艺复兴", "古典音乐", "建筑艺术", "葡萄酒文化"]
  },
  {
    id: "latin-america",
    name: "拉丁美洲文化圈",
    description: "热情奔放的音乐舞蹈与丰富多彩的节庆文化",
    languages: ["西班牙语", "葡萄牙语"],
    image: "https://images.unsplash.com/photo-1518123159102-4f0b5ad1a78b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    highlights: ["探戈舞", "足球文化", "玛雅文明", "嘉年华节"]
  }
]

// Difficulty indicator component
const DifficultyIndicator = ({ level }: { level: number }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i <= level
              ? i <= 2 ? 'bg-green-500' : i <= 3 ? 'bg-yellow-500' : 'bg-red-500'
              : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

// Language Card Component
const LanguageCard = ({ language }: { language: typeof popularLanguages[0] }) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 h-full bg-white/50 backdrop-blur hover:bg-white/80">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-4xl">{language.flag}</span>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{language.name}</h3>
              <p className="text-sm text-gray-600">{language.englishName}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-purple-600">{language.speakers}</div>
            <div className="text-xs text-gray-500">使用者</div>
          </div>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{language.description}</p>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">学习难度</span>
            <DifficultyIndicator level={language.difficulty} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">热门度</span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{language.popularity}%</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Globe className="w-4 h-4" />
            <span>{language.culture}</span>
          </div>
        </div>

        <Button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white">
          了解详情
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}

// Culture Region Card Component
const CultureCard = ({ region }: { region: typeof cultureRegions[0] }) => {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={region.image}
          alt={region.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold mb-1">{region.name}</h3>
          <p className="text-sm opacity-90">{region.description}</p>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">主要语言</h4>
          <div className="flex flex-wrap gap-2">
            {region.languages.map((lang) => (
              <span key={lang} className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">文化特色</h4>
          <div className="flex flex-wrap gap-2">
            {region.highlights.map((highlight) => (
              <span key={highlight} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                {highlight}
              </span>
            ))}
          </div>
        </div>

        <Button variant="outline" className="w-full">
          探索文化
          <MapPin className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}

// Main Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

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
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">关于我们</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              登录
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
              开始探索
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-6 h-6 text-purple-400" />
              <span className="text-lg font-bold">语言世界</span>
            </div>
            <p className="text-gray-400 text-sm">
              个性化的语言学习指导，深入的文化探索体验。让每一次学习都成为通向更广阔世界的桥梁。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.017 0C18.624 0 20 1.376 20 8.017v3.966C20 18.624 18.624 20 12.017 20H7.983C1.376 20 0 18.624 0 11.983V8.017C0 1.376 1.376 0 7.983 0h4.034zm0 1.8H7.983C2.27 1.8 1.8 2.27 1.8 7.983v4.034c0 5.713.47 6.183 6.183 6.183h4.034c5.713 0 6.183-.47 6.183-6.183V7.983c0-5.713-.47-6.183-6.183-6.183z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">学习资源</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">语言推荐</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">学习计划</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">难度评估</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">学习工具</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">文化探索</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">世界文化</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">语言历史</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">文化对比</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">节日习俗</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">关于我们</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">联系方式</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">合作伙伴</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">隐私政策</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 语言世界. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main HomePage Component
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(124, 58, 237, 0.9) 0%, rgba(16, 185, 129, 0.8) 100%), url('https://images.unsplash.com/photo-1742415105376-43d3a5fd03fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTgxMDYyODR8MA&ixlib=rb-4.1.0&q=80&w=1080')`
            }}
          />

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-5xl mx-auto">
              {/* Main heading */}
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent">
                  发现语言
                </span>
                <br />
                <span className="text-white">探索世界</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
                个性化的语言学习指导，深入的文化探索体验
                <br />
                让每一次学习都成为通向更广阔世界的桥梁
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
                <Button
                  size="lg"
                  className="px-8 py-3 rounded-full font-medium group bg-white text-slate-900 hover:bg-slate-100 border-0"
                >
                  开始探索
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-16 max-w-lg mx-auto">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">50+</div>
                  <div className="text-white/80">支持语言</div>
                </div>
                <div className="hidden sm:block w-px h-16 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">100K+</div>
                  <div className="text-white/80">活跃学习者</div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-white/10 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                为什么选择我们
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                我们致力于为每位学习者提供最个性化、最有效的语言学习体验
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                {
                  icon: Brain,
                  title: "因材施教",
                  description: "根据您的母语和学习目标，定制学习难度和时间规划",
                  color: "text-blue-600"
                },
                {
                  icon: Globe,
                  title: "文化浸润",
                  description: "不只是语言，更是文化的深度体验和理解",
                  color: "text-green-600"
                },
                {
                  icon: GraduationCap,
                  title: "专家方法",
                  description: "汇聚语言学习专家的方法论和实践经验",
                  color: "text-purple-600"
                },
                {
                  icon: Wrench,
                  title: "学习工具排名",
                  description: "全世界的人都在用什么工具学习语言",
                  color: "text-orange-600"
                }
              ].map((feature, index) => (
                <div key={index} className="group">
                  <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 h-full bg-white/50 hover:bg-white/80">
                    <CardContent className="p-8 text-center">
                      <div className="mb-6">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <feature.icon className={`h-8 w-8 ${feature.color}`} />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Languages */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                热门语言推荐
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                探索世界上最受欢迎的语言，找到最适合您的学习选择
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {popularLanguages.map((language) => (
                <LanguageCard key={language.id} language={language} />
              ))}
            </div>

            <div className="text-center">
              <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-8 py-3">
                查看全部语言
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Culture Preview */}
        <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                探索世界文化
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                语言是文化的载体，了解文化让语言学习更加生动有趣
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {cultureRegions.map((region) => (
                <CultureCard key={region.id} region={region} />
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" className="px-8 py-3">
                探索更多文化
                <Globe className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-gradient-to-r from-purple-600 to-cyan-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                数字见证我们的成长
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                每一个数字背后，都是我们与学习者共同创造的语言学习故事
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold">50+</div>
                <div className="text-white/80">支持语言</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold">100K+</div>
                <div className="text-white/80">学习资源</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold">10M+</div>
                <div className="text-white/80">全球用户</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold">95%</div>
                <div className="text-white/80">满意度</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                准备开始您的语言学习之旅了吗？
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                通过我们的个性化测评，找到最适合您的语言和学习路径
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-lg px-8 py-6 h-auto rounded-full">
                  开始个性化测评
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" className="text-lg px-8 py-6 h-auto rounded-full">
                  探索文化世界
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

// CSS Variables (to be included in global styles or CSS module)
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

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.649 0.237 267);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.671 0.171 200);
  --secondary-foreground: oklch(1 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.732 0.249 143);
  --accent-foreground: oklch(1 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.649 0.237 267);
}
`
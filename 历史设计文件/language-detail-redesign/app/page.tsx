"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Globe,
  Users,
  MapPin,
  Flag,
  GraduationCap,
  PlayCircle,
  GitBranch,
  Map,
  Layers,
  Clock,
  Lightbulb,
  Route,
  Heart,
  Film,
  Music,
  Scroll,
  Construction,
  FileText,
  Wrench,
  ArrowUp,
  Menu,
  X,
  ChevronDown,
  Settings,
  Mail,
  Phone,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Star,
  BookOpen,
  Target,
} from "lucide-react"

export default function LanguageDetailPage() {
  const [activeTab, setActiveTab] = useState("basic-info")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-6">
          <div className="flex h-20 items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold gradient-text">语言世界</span>
                <span className="text-sm text-muted-foreground -mt-1">Language World</span>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Button variant="ghost" className="text-foreground hover:text-primary font-medium">
                首页
              </Button>
              <div className="relative group">
                <Button variant="ghost" className="text-foreground hover:text-primary font-medium">
                  语言探索 <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="relative group">
                <Button variant="ghost" className="text-foreground hover:text-primary font-medium">
                  文化世界 <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="relative group">
                <Button variant="ghost" className="text-foreground hover:text-primary font-medium">
                  学习指导 <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* User Settings */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="outline" size="sm" className="font-medium bg-transparent">
                <Settings className="w-4 h-4 mr-2" />
                设置
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </nav>

      <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-teal-600/5"></div>
        <div className="container mx-auto px-6 py-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left: Language Identity */}
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="text-8xl drop-shadow-sm">🇯🇵</div>
                <div>
                  <h1 className="text-5xl font-bold text-slate-900 mb-3">日语</h1>
                  <p className="text-2xl text-slate-600 font-medium mb-4">Japanese (日本語)</p>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 text-sm px-3 py-1">
                      ISO 639: ja-JP
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-purple-100 text-purple-700 border-purple-200 text-sm px-3 py-1"
                    >
                      日语族
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col gap-4">
                
                
              </div>
            </div>

            {/* Right: Language Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">1.25亿</div>
                  <p className="text-slate-700 font-semibold text-lg">使用人数</p>
                  <p className="text-slate-500 mt-1 text-sm">全球母语使用者</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">主要地区</div>
                  <p className="text-slate-700 font-semibold text-lg">日本、美国、巴西</p>
                  <p className="text-slate-500 mt-1 text-sm">及其他海外社区</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                    <Flag className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">1个</div>
                  <p className="text-slate-700 font-semibold text-lg">官方语言国家</p>
                  <p className="text-slate-500 mt-1 text-sm">日本国官方语言</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">500万+</div>
                  <p className="text-slate-700 font-semibold text-lg">在线学习者</p>
                  <p className="text-slate-500 mt-1 text-sm">全球学习人数</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <Card className="glass-card-solid overflow-hidden card-hover">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="bg-gradient-to-r from-muted/50 to-muted/30 p-2">
              <TabsList className="grid w-full grid-cols-4 bg-transparent gap-2">
                <TabsTrigger
                  value="basic-info"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold py-3 rounded-xl"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  基础信息
                </TabsTrigger>
                <TabsTrigger
                  value="learning-guide"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold py-3 rounded-xl"
                >
                  <Target className="w-4 h-4 mr-2" />
                  学习指南
                </TabsTrigger>
                <TabsTrigger
                  value="culture"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold py-3 rounded-xl"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  相关文化
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold py-3 rounded-xl"
                >
                  <Star className="w-4 h-4 mr-2" />
                  学习资源
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab 1: Basic Info */}
            <TabsContent value="basic-info" className="p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Language Family */}
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 card-hover">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-primary flex items-center gap-3 text-xl">
                      <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                        <GitBranch className="w-5 h-5 text-primary" />
                      </div>
                      语言家族详情
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-primary/80 mb-3 text-lg">家族树状图</h4>
                      <div className="bg-background/80 rounded-xl p-6 text-sm font-mono border border-primary/10">
                        日语族
                        <br />
                        └── 日语
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;├── 古日语
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;├── 中古日语
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;└── 现代日语
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary/80 mb-3 text-lg">同族语言列表</h4>
                      <p className="text-muted-foreground">琉球语族（已濒危）</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Geographic Distribution */}
                <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20 card-hover">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-secondary flex items-center gap-3 text-xl">
                      <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
                        <Map className="w-5 h-5 text-secondary" />
                      </div>
                      地理分布
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-8 mb-6 min-h-[200px] flex items-center justify-center border border-secondary/10">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🗺️</div>
                        <p className="text-secondary font-semibold text-lg">互动式世界地图</p>
                        <p className="text-muted-foreground text-sm mt-2">点击查看详细分布</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-secondary/80 mb-2 text-lg">各地区使用人数</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">日本</span>
                            <span className="font-semibold">1.25亿</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">美国</span>
                            <span className="font-semibold">100万</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">巴西</span>
                            <span className="font-semibold">80万</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Language Features */}
                <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 card-hover">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-accent flex items-center gap-3 text-xl">
                      <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                        <Layers className="w-5 h-5 text-accent" />
                      </div>
                      语言特点
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-accent/80 mb-4 flex items-center gap-2 text-lg">
                        <FileText className="w-5 h-5" />
                        文字系统
                      </h4>
                      <div className="space-y-4">
                        <div className="bg-background/80 rounded-xl p-4 border border-accent/10">
                          <span className="font-semibold text-accent">平假名:</span>
                          <span className="ml-2">表音文字，46个基本字符</span>
                        </div>
                        <div className="bg-background/80 rounded-xl p-4 border border-accent/10">
                          <span className="font-semibold text-accent">片假名:</span>
                          <span className="ml-2">表音文字，外来词专用</span>
                        </div>
                        <div className="bg-background/80 rounded-xl p-4 border border-accent/10">
                          <span className="font-semibold text-accent">汉字:</span>
                          <span className="ml-2">表意文字，常用约2000字</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Historical Development */}
                <Card className="bg-gradient-to-br from-chart-4/10 to-chart-4/5 border-chart-4/20 card-hover">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-chart-4 flex items-center gap-3 text-xl">
                      <div className="w-10 h-10 bg-chart-4/20 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-chart-4" />
                      </div>
                      历史发展
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-chart-4/80 mb-3 text-lg">语言起源</h4>
                      <p className="text-muted-foreground">约公元3-8世纪形成，起源存在争议</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-chart-4/80 mb-4 text-lg">重要发展阶段</h4>
                      <div className="space-y-3">
                        <div className="bg-background/80 rounded-xl p-4 border border-chart-4/10">
                          <span className="font-semibold text-chart-4">奈良时代:</span>
                          <span className="ml-2">汉字传入，万叶假名</span>
                        </div>
                        <div className="bg-background/80 rounded-xl p-4 border border-chart-4/10">
                          <span className="font-semibold text-chart-4">平安时代:</span>
                          <span className="ml-2">平假名、片假名确立</span>
                        </div>
                        <div className="bg-background/80 rounded-xl p-4 border border-chart-4/10">
                          <span className="font-semibold text-chart-4">江户时代:</span>
                          <span className="ml-2">现代日语基础形成</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="learning-guide" className="p-10">
              <div className="space-y-10">
                {/* Specialized Learning Methods */}
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 card-hover">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-primary flex items-center gap-3 text-2xl">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                        <Lightbulb className="w-6 h-6 text-primary" />
                      </div>
                      专属学习方法
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {[
                        {
                          title: "零基础日语入门指南",
                          description: "从五十音图开始的完整学习路径",
                          level: "入门",
                          time: "15分钟",
                          color: "from-green-500 to-green-600",
                        },
                        {
                          title: "动漫日语学习法",
                          description: "通过动漫提升听说能力的技巧",
                          level: "进阶",
                          time: "12分钟",
                          color: "from-blue-500 to-blue-600",
                        },
                        {
                          title: "JLPT考试策略",
                          description: "日语能力考试备考完全攻略",
                          level: "高级",
                          time: "20分钟",
                          color: "from-purple-500 to-purple-600",
                        },
                      ].map((article, index) => (
                        <Card key={index} className="bg-background/80 border-border/50 card-hover">
                          <CardContent className="p-6">
                            <div className={`w-full h-2 bg-gradient-to-r ${article.color} rounded-full mb-4`}></div>
                            <h4 className="font-semibold mb-3 text-lg">{article.title}</h4>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{article.description}</p>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{article.time}</span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {article.level}
                              </Badge>
                            </div>
                            <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                              开始阅读
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="text-center">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 py-3">
                        查看所有学习方法
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Personalized Learning Path */}
                <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20 card-hover">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-secondary flex items-center gap-3 text-2xl">
                      <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                        <Route className="w-6 h-6 text-secondary" />
                      </div>
                      个性化学习路径
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[
                        {
                          stage: "入门阶段",
                          duration: "0-3个月",
                          content: "五十音图、基础语法、常用词汇",
                          color: "from-green-500 to-green-600",
                          bgColor: "bg-green-100",
                          textColor: "text-green-700",
                        },
                        {
                          stage: "进阶阶段",
                          duration: "3-12个月",
                          content: "汉字学习、敬语入门、听说练习",
                          color: "from-yellow-500 to-yellow-600",
                          bgColor: "bg-yellow-100",
                          textColor: "text-yellow-700",
                        },
                        {
                          stage: "高级阶段",
                          duration: "12个月以上",
                          content: "专业词汇、商务日语、文学阅读",
                          color: "from-red-500 to-red-600",
                          bgColor: "bg-red-100",
                          textColor: "text-red-700",
                        },
                      ].map((stage, index) => (
                        <div key={index} className="text-center">
                          <div
                            className={`w-20 h-20 bg-gradient-to-br ${stage.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                          >
                            <PlayCircle className="w-10 h-10 text-white" />
                          </div>
                          <h4 className="font-semibold mb-2 text-xl">{stage.stage}</h4>
                          <p className="text-muted-foreground mb-3 font-medium">{stage.duration}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{stage.content}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="culture" className="p-10">
              <div className="space-y-10">
                {/* Culture Overview */}
                <Card className="gradient-primary text-white card-hover">
                  <CardHeader className="pb-6">
                    <CardTitle className="flex items-center gap-3 text-2xl text-white">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      文化概览
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold mb-3 text-lg text-white">语言文化简介</h4>
                        <p className="text-white/90 leading-relaxed">
                          日语承载着深厚的和文化传统，体现在敬语体系、季节感知等方面
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-lg text-white">文化核心价值观</h4>
                        <p className="text-white/90 leading-relaxed">和谐、礼貌、集体主义、完美主义、四季之美</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cultural Content Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      title: "🏖️ 旅游文化",
                      icon: <MapPin className="w-6 h-6" />,
                      articles: ["日本旅游必知礼仪", "樱花季旅行攻略"],
                      bgColor: "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20",
                      textColor: "text-primary",
                      iconBg: "bg-primary/20",
                    },
                    {
                      title: "🎬 影视文化",
                      icon: <Film className="w-6 h-6" />,
                      articles: ["宫崎骏动画中的日本", "日剧学日语技巧"],
                      bgColor: "bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20",
                      textColor: "text-secondary",
                      iconBg: "bg-secondary/20",
                    },
                    {
                      title: "🎵 音乐文化",
                      icon: <Music className="w-6 h-6" />,
                      articles: ["J-POP听歌学日语", "传统音乐与现代融合"],
                      bgColor: "bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20",
                      textColor: "text-accent",
                      iconBg: "bg-accent/20",
                    },
                    {
                      title: "🏛️ 历史文化",
                      icon: <Scroll className="w-6 h-6" />,
                      articles: ["武士道精神的现代影响", "明治维新对语言的影响"],
                      bgColor: "bg-gradient-to-br from-chart-4/10 to-chart-4/5 border-chart-4/20",
                      textColor: "text-chart-4",
                      iconBg: "bg-chart-4/20",
                    },
                  ].map((category, index) => (
                    <Card key={index} className={`${category.bgColor} card-hover`}>
                      <CardHeader className="pb-4">
                        <CardTitle className={`${category.textColor} flex items-center gap-3 text-xl`}>
                          <div className={`w-10 h-10 ${category.iconBg} rounded-xl flex items-center justify-center`}>
                            {category.icon}
                          </div>
                          {category.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {category.articles.map((article, articleIndex) => (
                          <Card key={articleIndex} className="bg-background/80 card-hover">
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-sm mb-2">{article}</h4>
                              <p className="text-xs text-muted-foreground mb-3">了解更多日本文化内容</p>
                              <Button size="sm" variant="outline" className="w-full bg-transparent">
                                阅读文章
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                        <Button
                          size="sm"
                          className={`w-full ${category.textColor.replace("text-", "bg-")} hover:opacity-90 text-white`}
                        >
                          查看更多内容
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Tab 4: Resources */}
            <TabsContent value="resources" className="p-10">
              <div className="text-center py-20">
                <div className="max-w-2xl mx-auto">
                  <div className="w-32 h-32 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <Construction className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold gradient-text mb-6">学习资源正在整理中</h3>
                  <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
                    我们正在为您准备最优质的学习资源，敬请期待
                  </p>

                  <div className="grid grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
                    {[
                      {
                        title: "在线课程",
                        icon: <PlayCircle className="w-6 h-6" />,
                        desc: "精选优质日语课程",
                        color: "from-primary to-primary/80",
                      },
                      {
                        title: "学习工具",
                        icon: <Wrench className="w-6 h-6" />,
                        desc: "实用学习辅助工具",
                        color: "from-secondary to-secondary/80",
                      },
                      {
                        title: "练习材料",
                        icon: <FileText className="w-6 h-6" />,
                        desc: "丰富的练习题库",
                        color: "from-accent to-accent/80",
                      },
                      {
                        title: "社区资源",
                        icon: <Users className="w-6 h-6" />,
                        desc: "学习者交流社区",
                        color: "from-chart-4 to-chart-4/80",
                      },
                    ].map((resource, index) => (
                      <Card
                        key={index}
                        className="bg-gradient-to-br from-muted/50 to-muted/30 border-border/50 card-hover"
                      >
                        <CardContent className="p-6 text-center">
                          <div
                            className={`w-16 h-16 bg-gradient-to-br ${resource.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                          >
                            <div className="text-white">{resource.icon}</div>
                          </div>
                          <h4 className="font-semibold mb-2 text-lg">{resource.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{resource.desc}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 py-3 text-lg">
                    订阅更新通知
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
        <Button
          variant="outline"
          onClick={scrollToTop}
          className="flex items-center gap-2 px-6 py-3 font-medium bg-transparent"
        >
          <ArrowUp className="w-5 h-5" />
          返回顶部
        </Button>
        <div className="flex items-center gap-6 text-sm">
          <Button variant="ghost" size="sm" className="font-medium">
            修改个人信息
          </Button>
          <span className="hidden sm:inline text-muted-foreground">|</span>
          <Button variant="ghost" size="sm" className="font-medium">
            查看推荐算法
          </Button>
        </div>
      </div>
      <footer className="bg-gradient-to-br from-card to-muted/30 border-t border-border mt-20">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand and Description */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold gradient-text">语言世界</span>
                  <span className="text-sm text-muted-foreground -mt-1">Language World</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                个性化的语言学习指导，深入的文化探索体验。让每一次学习都成为通向更广阔世界的桥梁。
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="font-medium">100K+ 活跃学习者</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="font-bold text-foreground mb-6 text-lg">语言探索</h3>
              <ul className="space-y-4">
                <li>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-muted-foreground hover:text-primary font-medium"
                  >
                    语言列表
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-muted-foreground hover:text-primary font-medium"
                  >
                    语言推荐
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-muted-foreground hover:text-primary font-medium"
                  >
                    语言对比
                  </Button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-6 text-lg">文化世界</h3>
              <ul className="space-y-4">
                <li>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-muted-foreground hover:text-primary font-medium"
                  >
                    旅游文化
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-muted-foreground hover:text-primary font-medium"
                  >
                    影视文化
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-muted-foreground hover:text-primary font-medium"
                  >
                    音乐文化
                  </Button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-6 text-lg">学习资源</h3>
              <ul className="space-y-4">
                <li>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-muted-foreground hover:text-primary font-medium"
                  >
                    学习方法
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-muted-foreground hover:text-primary font-medium"
                  >
                    学习工具
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-muted-foreground hover:text-primary font-medium"
                  >
                    资源推荐
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Links and Contact */}
          <div className="border-t border-border mt-12 pt-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="font-medium">contact@languageworld.com</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">+86 400-123-4567</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <Youtube className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-muted-foreground">
                <p className="font-medium">© 2024 语言世界 Language World. 保留所有权利。</p>
                <div className="flex items-center gap-8">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-muted-foreground hover:text-primary font-medium"
                  >
                    隐私政策
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-muted-foreground hover:text-primary font-medium"
                  >
                    服务条款
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-muted-foreground hover:text-primary font-medium"
                  >
                    关于我们
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

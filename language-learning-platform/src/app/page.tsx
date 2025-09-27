import * as React from "react"
import Link from "next/link"
import { ArrowRight, Globe, Brain, GraduationCap, Wrench } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { PopularLanguages } from "@/components/shared/popular-languages"
import { CulturePreview } from "@/components/shared/culture-preview"

export default function HomePage() {

  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="glass" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-bg-hero">
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
                  asChild
                  size="lg"
                  className="px-8 py-3 rounded-full font-medium group bg-white text-slate-900 hover:bg-slate-100 border-0"
                >
                  <Link href="/survey">
                    开始探索
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-16 max-w-lg mx-auto">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    50+
                  </div>
                  <div className="text-white/80">支持语言</div>
                </div>
                <div className="hidden sm:block w-px h-16 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    100K+
                  </div>
                  <div className="text-white/80">活跃学习者</div>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-white/10 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 section-bg-features">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                为什么选择我们
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                我们致力于为每位学习者提供最个性化、最有效的语言学习体验
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="group">
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 h-full bg-muted/50 hover:bg-card card-hover">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Brain className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">
                      因材施教
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                      根据您的母语和学习目标，定制学习难度和时间规划
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="group">
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 h-full bg-muted/50 hover:bg-card card-hover">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Globe className="h-8 w-8 text-green-600" />
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">
                      文化浸润
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                      不只是语言，更是文化的深度体验和理解
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="group">
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 h-full bg-muted/50 hover:bg-card card-hover">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <GraduationCap className="h-8 w-8 text-purple-600" />
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">
                      专家方法
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                      汇聚语言学习专家的方法论和实践经验
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="group">
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 h-full bg-muted/50 hover:bg-card card-hover">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Wrench className="h-8 w-8 text-orange-600" />
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">
                      学习工具排名
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                      全世界的人都在用什么工具学习语言
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Languages */}
        <PopularLanguages />

        {/* Culture Preview */}
        <CulturePreview />

        {/* Stats Section */}
        <section className="py-24 section-bg-hero">
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
        <section className="py-24 section-bg-learning">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold gradient-text">
                准备开始您的语言学习之旅了吗？
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                通过我们的个性化测评，找到最适合您的语言和学习路径
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="btn-gradient text-lg px-8 py-6 h-auto rounded-full">
                  <Link href="/survey">
                    开始个性化测评
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 h-auto rounded-full">
                  <Link href="/culture">
                    探索文化世界
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="gradient" />
    </div>
  )
}

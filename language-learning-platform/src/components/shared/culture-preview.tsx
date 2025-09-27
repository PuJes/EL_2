"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Clock,
  MapPin,
  Camera,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"

export function CulturePreview() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const cultureArticles = [
    {
      title: "日本樱花季：语言与自然的诗意融合",
      type: "旅游",
      region: "日本",
      image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&h=600&fit=crop",
      description: "探索日语中描述春天的独特词汇，感受樱花文化的深层意义",
      readTime: "5分钟阅读",
      color: "bg-pink-50 text-pink-700 border-pink-200"
    },
    {
      title: "西班牙弗拉明戈：激情舞蹈背后的语言艺术",
      type: "音乐",
      region: "西班牙",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      description: "了解弗拉明戈音乐中的西班牙语表达，体验音乐与语言的完美结合",
      readTime: "7分钟阅读",
      color: "bg-orange-50 text-orange-700 border-orange-200"
    },
    {
      title: "法国咖啡文化：从 'Café' 到生活哲学",
      type: "历史",
      region: "法国",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
      description: "深入巴黎咖啡馆文化，学习法语社交用语的精妙之处",
      readTime: "6分钟阅读",
      color: "bg-green-50 text-green-700 border-green-200"
    },
    {
      title: "意大利美食传统：从食物到语言的文化之旅",
      type: "美食",
      region: "意大利",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop",
      description: "通过意大利美食了解语言的丰富表达，品味文化与语言的完美融合",
      readTime: "8分钟阅读",
      color: "bg-red-50 text-red-700 border-red-200"
    }
  ]

  // 检查滚动状态
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  // 处理鼠标拖拽开始
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
    scrollContainerRef.current.style.cursor = "grabbing"
  }

  // 处理鼠标拖拽
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  // 处理鼠标拖拽结束
  const handleMouseUp = () => {
    setIsDragging(false)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab"
    }
  }

  // 滚动到左侧
  const scrollToLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -352,
        behavior: "smooth",
      })
    }
  }

  // 滚动到右侧
  const scrollToRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 352,
        behavior: "smooth",
      })
    }
  }

  // 监听滚动事件
  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      const handleScroll = () => checkScrollButtons()
      container.addEventListener("scroll", handleScroll)
      checkScrollButtons()

      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section className="py-24 section-bg-culture">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-6">
            <Camera className="w-4 h-4" />
            文化探索之旅
          </div>

          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            文化探索精选
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            通过文化故事，深度理解语言的魅力与内涵
          </p>
        </div>

        {/* Horizontal scrolling cards with drag support */}
        <div className="mb-16 relative">
          {/* Left scroll button */}
          <button
            onClick={scrollToLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-border flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? "opacity-100 hover:shadow-xl hover:scale-110"
                : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Right scroll button */}
          <button
            onClick={scrollToRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-border flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? "opacity-100 hover:shadow-xl hover:scale-110"
                : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!canScrollRight}
          >
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide pb-4 cursor-grab"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="flex gap-8 w-max px-12">
              {cultureArticles.map((article, index) => (
                <Card
                  key={index}
                  className="group card-hover glass-card overflow-hidden w-80 flex-shrink-0 select-none"
                  style={{ pointerEvents: isDragging ? "none" : "auto" }}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${article.color} border`}>
                        {article.type}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{article.region}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-2">
                      {article.description}
                    </p>

                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                      阅读更多
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">← 点击按钮或拖拽查看更多文化故事 →</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-muted/50 to-background max-w-3xl mx-auto">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4">
                发现更多文化故事！
              </h3>

              <p className="text-lg text-muted-foreground mb-8">
                100+ 篇精彩文化故事等你来探索，每一篇都是一次心灵之旅！
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-gradient px-8 py-3 rounded-full font-medium">
                  探索更多文化
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <Button variant="outline" className="px-8 py-3 rounded-full font-medium">
                  投稿故事
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
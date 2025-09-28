import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  ArrowRight,
  TrendingUp,
  Users,
  Star,
  Zap,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

export function PopularLanguages() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const languages = [
    {
      name: "英语",
      flag: "🇺🇸",
      speakers: "15亿使用者",
      difficulty: "中等",
      trend: "热门",
      rating: 4.6,
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      name: "中文",
      flag: "🇨🇳",
      speakers: "14亿使用者",
      difficulty: "困难",
      trend: "热门",
      rating: 4.8,
      color: "bg-red-50 text-red-700 border-red-200",
    },
    {
      name: "西班牙语",
      flag: "🇪🇸",
      speakers: "5亿使用者",
      difficulty: "简单",
      trend: "上升",
      rating: 4.5,
      color: "bg-orange-50 text-orange-700 border-orange-200",
    },
    {
      name: "日语",
      flag: "🇯🇵",
      speakers: "1.2亿使用者",
      difficulty: "困难",
      trend: "热门",
      rating: 4.7,
      color: "bg-pink-50 text-pink-700 border-pink-200",
    },
    {
      name: "法语",
      flag: "🇫🇷",
      speakers: "2.8亿使用者",
      difficulty: "中等",
      trend: "稳定",
      rating: 4.4,
      color: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      name: "德语",
      flag: "🇩🇪",
      speakers: "1.3亿使用者",
      difficulty: "困难",
      trend: "上升",
      rating: 4.3,
      color: "bg-green-50 text-green-700 border-green-200",
    },
  ];

  // 检查滚动状态
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // 处理鼠标拖拽开始
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = "grabbing";
  };

  // 处理鼠标拖拽
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 调整滚动速度
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // 处理鼠标拖拽结束
  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = "grab";
    }
  };

  // 滚动到左侧
  const scrollToLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -320, // 一个卡片的宽度
        behavior: "smooth",
      });
    }
  };

  // 滚动到右侧
  const scrollToRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 320, // 一个卡片的宽度
        behavior: "smooth",
      });
    }
  };

  // 监听滚动事件
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const handleScroll = () => checkScrollButtons();
      container.addEventListener("scroll", handleScroll);
      checkScrollButtons(); // 初始检查
      
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <section className="py-24 section-bg-languages">
      <div className="container mx-auto px-6">{/* Content wrapper */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            全球最受欢迎
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            热门语言推荐
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            探索全球最受欢迎的语言学习选择，开启你的多元文化之旅
          </p>
        </div>

        {/* Horizontal scrolling cards with drag support */}
        <div className="mb-16 relative">
          {/* Left scroll button */}
          <button
            onClick={scrollToLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? "opacity-100 hover:shadow-xl hover:scale-110"
                : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!canScrollLeft}
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>

          {/* Right scroll button */}
          <button
            onClick={scrollToRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? "opacity-100 hover:shadow-xl hover:scale-110"
                : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!canScrollRight}
          >
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide pb-4 cursor-grab"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="flex gap-6 w-max px-12">
              {languages.map((language, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 w-80 flex-shrink-0 select-none"
                  style={{ pointerEvents: isDragging ? "none" : "auto" }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl ${language.color} border flex items-center justify-center text-2xl`}
                      >
                        {language.flag}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">
                          {language.name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <Users className="h-3 w-3" />
                          {language.speakers}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">
                          热度
                        </span>
                        <Badge
                          variant="secondary"
                          className="text-xs"
                        >
                          {language.trend}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">
                          难度
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            language.difficulty === "简单"
                              ? "bg-green-100 text-green-700"
                              : language.difficulty === "中等"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {language.difficulty}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">
                          评分
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {language.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                    >
                      快速了解
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="text-center mt-4">
            <p className="text-sm text-slate-500">
              ← 点击按钮或拖拽查看更多语言 →
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Card className="border-0 shadow-sm bg-white max-w-3xl mx-auto">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                找到你的完美语言伙伴！
              </h3>

              <p className="text-lg text-slate-600 mb-8">
                还有 50+ 种语言等你来探索，总有一种适合你！
              </p>

              <Button className="px-8 py-3 rounded-full font-medium">
                查看所有语言
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
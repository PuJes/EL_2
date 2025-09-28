import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowRight, BookOpen, Clock, Star, Brain, Users, Target, Lightbulb, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export function LearningMethods() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const methods = [
    {
      title: "沉浸式学习法：像婴儿一样学语言",
      languages: ["英语", "西班牙语", "法语"],
      summary: "通过创造纯语言环境，让大脑自然习得语言规律。这种方法模拟母语学习过程，效果显著。",
      readTime: "8分钟阅读",
      rating: 4.8,
      difficulty: "初级",
      icon: Brain,
      color: "text-blue-600"
    },
    {
      title: "语言交换伙伴系统：真实对话的力量",
      languages: ["所有语言"],
      summary: "与母语者建立语言交换关系，在真实对话中提升口语能力。互助学习，文化交流并重。",
      readTime: "6分钟阅读",
      rating: 4.9,
      difficulty: "中级",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "记忆宫殿法：高效记忆单词和语法",
      languages: ["日语", "阿拉伯语", "中文"],
      summary: "运用空间记忆原理，将抽象的语言知识转化为具象的记忆场景，大幅提升记忆效率。",
      readTime: "10分钟阅读",
      rating: 4.7,
      difficulty: "高级",
      icon: Target,
      color: "text-purple-600"
    },
    {
      title: "间隔重复法：科学记忆新突破",
      languages: ["德语", "俄语", "韩语"],
      summary: "基于艾宾浩斯遗忘曲线，科学安排复习时间，让记忆更加牢固持久。",
      readTime: "7分钟阅读",
      rating: 4.6,
      difficulty: "中级",
      icon: Lightbulb,
      color: "text-amber-600"
    },
    {
      title: "影子练习法：完美模仿母语者",
      languages: ["英语", "法语", "德语"],
      summary: "通过跟读和模仿母语者的语音语调，快速提升发音准确度和语感。",
      readTime: "9分钟阅读",
      rating: 4.5,
      difficulty: "中级",
      icon: Brain,
      color: "text-indigo-600"
    }
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
        left: -312, // 一个卡片的宽度(288px + 24px gap)
        behavior: "smooth",
      });
    }
  };

  // 滚动到右侧
  const scrollToRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 312, // 一个卡片的宽度(288px + 24px gap)
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
    <section className="py-24 section-bg-learning">
      <div className="container mx-auto px-6"> {/* Content wrapper without z-index */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-6">
            <Lightbulb className="w-4 h-4" />
            专家推荐方法
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            学习方法推荐
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            专家验证的高效语言学习方法，让你的学习之路更加轻松高效
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
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="flex gap-6 w-max px-12">
              {methods.map((method, index) => {
                const IconComponent = method.icon;
                
                return (
                  <Card 
                    key={index} 
                    className="group hover:shadow-lg transition-all duration-300 w-72 flex-shrink-0 select-none"
                    style={{ pointerEvents: isDragging ? "none" : "auto" }}
                  >
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className={`h-5 w-5 ${method.color}`} />
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant={
                            method.difficulty === "初级" ? "default" :
                            method.difficulty === "中级" ? "secondary" : "outline"
                          } className="text-xs">
                            {method.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium text-slate-700">{method.rating}</span>
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-slate-900 mb-3 leading-tight line-clamp-2">
                        {method.title}
                      </h3>

                      {/* Languages */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {method.languages.slice(0, 2).map((lang, langIndex) => (
                          <Badge key={langIndex} variant="secondary" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                        {method.languages.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{method.languages.length - 2}
                          </Badge>
                        )}
                      </div>

                      {/* Summary */}
                      <p className="text-slate-600 leading-relaxed mb-4 text-sm line-clamp-3">
                        {method.summary}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="h-3 w-3" />
                          <span>{method.readTime}</span>
                        </div>
                        
                        <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white transition-colors">
                          详细了解
                          <BookOpen className="h-3 w-3 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="text-center mt-4">
            <p className="text-sm text-slate-500">← 点击按钮或拖拽查看更多学习方法 →</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Card className="border-0 shadow-sm bg-white max-w-3xl mx-auto">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                掌握更多学习秘籍！
              </h3>
              
              <p className="text-lg text-slate-600 mb-8">
                20+ 种专业学习方法等你来探索，总有一种适合你的学习风格！
              </p>
              
              <Button className="px-8 py-3 rounded-full font-medium">
                查看完整学习指导
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowRight, Star, Download, Users, TrendingUp, Trophy, Gamepad2, MessageCircle, Rocket, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export function ResourceTools() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const tools = [
    {
      name: "Duolingo",
      category: "综合学习",
      ranking: "#1",
      rating: 4.6,
      users: "5亿+",
      trend: "上升",
      features: ["游戏化学习", "多语言支持", "免费使用"],
      description: "全球最受欢迎的语言学习应用，通过游戏化方式让学习变得有趣。",
      icon: Gamepad2,
      color: "text-green-600"
    },
    {
      name: "Anki",
      category: "记忆工具",
      ranking: "#2",
      rating: 4.8,
      users: "1000万+",
      trend: "稳定",
      features: ["间隔重复", "自定义卡片", "社区共享"],
      description: "基于科学记忆原理的闪卡应用，是背单词和语法的强大工具。",
      icon: Trophy,
      color: "text-orange-600"
    },
    {
      name: "HelloTalk",
      category: "语言交换",
      ranking: "#3",
      rating: 4.5,
      users: "5000万+",
      trend: "上升",
      features: ["真人对话", "文化交流", "即时翻译"],
      description: "连接全球语言学习者的社交平台，与母语者进行真实对话练习。",
      icon: MessageCircle,
      color: "text-purple-600"
    },
    {
      name: "Busuu",
      category: "在线课程",
      ranking: "#4",
      rating: 4.4,
      users: "1200万+",
      trend: "上升",
      features: ["AI课程", "认证证书", "个性化"],
      description: "提供专业语言课程和认证，由语言专家设计的学习路径。",
      icon: Rocket,
      color: "text-blue-600"
    },
    {
      name: "Babbel",
      category: "专业课程",
      ranking: "#5",
      rating: 4.3,
      users: "1000万+",
      trend: "稳定",
      features: ["情境对话", "语法重点", "真人录音"],
      description: "专注于实用会话技能，通过真实情境提升语言应用能力。",
      icon: MessageCircle,
      color: "text-cyan-600"
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
    <section className="py-24 section-bg-resources">
      <div className="container mx-auto px-6"> {/* Content wrapper without z-index */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-6">
            <Rocket className="w-4 h-4" />
            全球精选工具
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            资源工具浏览
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            全球语言学习者都在使用的精选工具，让你的学习事半功倍
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
              {tools.map((tool, index) => {
                const IconComponent = tool.icon;
                
                return (
                  <Card 
                    key={index} 
                    className="group hover:shadow-lg transition-all duration-300 w-72 flex-shrink-0 select-none"
                    style={{ pointerEvents: isDragging ? "none" : "auto" }}
                  >
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 font-bold text-sm">
                            {tool.ranking}
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900">
                              {tool.name}
                            </h3>
                            <Badge variant="secondary" className="text-xs mt-1">
                              {tool.category}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                          <IconComponent className={`h-4 w-4 ${tool.color}`} />
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-3 mb-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium text-slate-700">{tool.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-slate-500" />
                          <span className="text-slate-600">{tool.users}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className={`h-3 w-3 ${
                            tool.trend === "上升" ? "text-green-500" : "text-slate-500"
                          }`} />
                          <span className={`text-xs ${
                            tool.trend === "上升" ? "text-green-600" : "text-slate-600"
                          }`}>
                            {tool.trend}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-600 leading-relaxed mb-4 text-sm line-clamp-2">
                        {tool.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {tool.features.slice(0, 2).map((feature, featureIndex) => (
                          <Badge key={featureIndex} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {tool.features.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{tool.features.length - 2}
                          </Badge>
                        )}
                      </div>

                      {/* CTA Button */}
                      <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                        了解详情
                        <Download className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="text-center mt-4">
            <p className="text-sm text-slate-500">← 点击按钮或拖拽查看更多工具资源 →</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-slate-50 to-white max-w-3xl mx-auto">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                发现更多神器工具！
              </h3>
              
              <p className="text-lg text-slate-600 mb-8">
                100+ 款精选学习工具等你来探索，总有一款让你爱不释手！
              </p>
              
              <Button className="px-8 py-3 rounded-full font-medium">
                查看所有资源与工具
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
import { motion } from "motion/react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Star, Clock, Users, MapPin, Heart, ArrowRight, Zap } from "lucide-react";
import { LanguageRecommendation } from "../../types/recommendation";

interface PrimaryRecommendationProps {
  recommendation: LanguageRecommendation;
  onLearnMore: () => void;
}

export function PrimaryRecommendation({ recommendation, onLearnMore }: PrimaryRecommendationProps) {
  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < count ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'
        }`}
      />
    ));
  };

  const getHighlightIcon = (type: string) => {
    switch (type) {
      case 'speakers':
        return <Users className="h-5 w-5" />;
      case 'regions':
        return <MapPin className="h-5 w-5" />;
      case 'culture':
        return <Heart className="h-5 w-5" />;
      default:
        return <Zap className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* 区域标题 */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
          为您推荐的语言
        </h2>
        <p className="text-slate-600">
          基于您的学习动机、时间投入和文化兴趣精心挑选
        </p>
      </motion.div>

      {/* 主推荐卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Card className="relative bg-gradient-to-br from-white to-blue-50/50 border-2 border-primary/20 shadow-2xl overflow-hidden">
          {/* 装饰性背景 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full transform -translate-x-12 translate-y-12"></div>

          <CardContent className="relative p-8 md:p-10">
            {/* 顶部标签和匹配度 */}
            <div className="flex items-center justify-between mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Badge
                  variant="default"
                  className="bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-2 text-sm font-semibold shadow-lg"
                >
                  最适合您
                </Badge>
              </motion.div>
              <motion.div
                className="text-right"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="text-3xl font-bold text-primary">
                  {recommendation.matchPercentage}%
                </div>
                <div className="text-sm text-slate-500 font-medium">
                  匹配度
                </div>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* 左侧：语言基本信息 */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {/* 语言标题 */}
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{recommendation.flag}</div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-800">
                      {recommendation.name}
                    </h3>
                    <p className="text-lg text-slate-600 font-medium">
                      {recommendation.nativeName}
                    </p>
                  </div>
                </div>

                {/* 学习信息 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-white/70 rounded-xl border border-slate-200/60">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-semibold text-slate-800">学习时长预估</div>
                      <div className="text-sm text-slate-600">{recommendation.estimatedTime}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-white/70 rounded-xl border border-slate-200/60">
                    <div className="flex items-center gap-2">
                      {renderStars(recommendation.difficulty.stars)}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{recommendation.difficulty.label}</div>
                      <div className="text-sm text-slate-600">{recommendation.difficulty.description}</div>
                    </div>
                  </div>
                </div>

                {/* 推荐理由 */}
                <div className="p-6 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-xl border border-primary/20">
                  <h4 className="font-bold text-slate-800 mb-2 text-lg">
                    {recommendation.reasonTitle}
                  </h4>
                  <p className="text-slate-700 leading-relaxed">
                    {recommendation.reasonDescription}
                  </p>
                </div>
              </motion.div>

              {/* 右侧：语言亮点 */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div>
                  <h4 className="text-xl font-bold text-slate-800 mb-4">语言亮点</h4>
                  <div className="space-y-4">
                    {recommendation.highlights.map((highlight, index) => (
                      <motion.div
                        key={highlight.title}
                        className="flex items-start gap-4 p-4 bg-white/70 rounded-xl border border-slate-200/60 hover:shadow-lg transition-shadow duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                          {getHighlightIcon(highlight.type)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 mb-1">
                            {highlight.title}
                          </div>
                          <div className="text-slate-600 text-sm">
                            {highlight.value}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 底部操作按钮 */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-slate-200/60"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button
                onClick={onLearnMore}
                className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>了解详情</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-2 border-primary/30 text-primary hover:bg-primary/5 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              >
                加入学习计划
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
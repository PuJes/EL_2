import { motion } from "motion/react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Star, Clock, ArrowRight } from "lucide-react";
import { LanguageRecommendation } from "../../types/recommendation";

interface OtherRecommendationsProps {
  recommendations: LanguageRecommendation[];
  onLearnMore: (languageId: string) => void;
}

export function OtherRecommendations({ recommendations, onLearnMore }: OtherRecommendationsProps) {
  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < count ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'
        }`}
      />
    ));
  };

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* 区域标题 */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          其他推荐选择
        </h2>
        <p className="text-slate-600">
          同样适合您的优质语言选择
        </p>
      </motion.div>

      {/* 推荐语言网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((recommendation, index) => (
          <motion.div
            key={recommendation.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="group h-full bg-white/70 backdrop-blur-sm border border-slate-200/60 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden">
              <CardContent className="p-6">
                {/* 头部：语言信息和匹配度 */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{recommendation.flag}</div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors">
                        {recommendation.name}
                      </h3>
                      <p className="text-sm text-slate-600 font-medium">
                        {recommendation.nativeName}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {recommendation.matchPercentage}%
                    </div>
                    <div className="text-xs text-slate-500">匹配度</div>
                  </div>
                </div>

                {/* 学习信息 */}
                <div className="space-y-4 mb-6">
                  {/* 学习时长 */}
                  <div className="flex items-center gap-3 p-3 bg-slate-50/70 rounded-lg">
                    <Clock className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-800">
                        学习时长
                      </div>
                      <div className="text-xs text-slate-600 truncate">
                        {recommendation.estimatedTime}
                      </div>
                    </div>
                  </div>

                  {/* 难度等级 */}
                  <div className="flex items-center gap-3 p-3 bg-slate-50/70 rounded-lg">
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {renderStars(recommendation.difficulty.stars)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-800">
                        {recommendation.difficulty.label}
                      </div>
                      <div className="text-xs text-slate-600 truncate">
                        {recommendation.difficulty.description}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 推荐理由 */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-800 mb-2">
                    {recommendation.reasonTitle}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {recommendation.reasonDescription}
                  </p>
                </div>

                {/* 语言亮点 */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-800 mb-3">核心优势</h4>
                  <div className="space-y-2">
                    {recommendation.highlights.slice(0, 2).map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 rounded-full bg-primary/60"></div>
                        <span className="font-medium text-slate-700">{highlight.title}:</span>
                        <span className="text-slate-600 truncate">{highlight.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 操作按钮 */}
                <Button
                  onClick={() => onLearnMore(recommendation.id)}
                  variant="outline"
                  className="w-full border-slate-200 text-slate-700 hover:bg-primary/5 hover:border-primary/30 hover:text-primary font-medium py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>了解详情</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 查看更多按钮 */}
      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Button
          variant="outline"
          className="border-2 border-primary/30 text-primary hover:bg-primary/5 font-semibold py-3 px-8 rounded-xl transition-all duration-300"
        >
          查看所有语言推荐
        </Button>
      </motion.div>
    </div>
  );
}
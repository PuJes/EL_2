import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import {
  Library,
  Globe,
  Brain,
  ChevronRight,
  BookOpen,
  Compass,
  Map
} from "lucide-react";

interface ExploreMoreProps {
  onExploreLanguages: () => void;
}

export function ExploreMore({ onExploreLanguages }: ExploreMoreProps) {
  const exploreOptions = [
    {
      icon: Library,
      title: "查看所有语言",
      description: "浏览完整的语言列表，发现更多学习可能",
      buttonText: "进入语言列表",
      action: onExploreLanguages,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      icon: Brain,
      title: "了解推荐方法",
      description: "详细了解我们的推荐算法和评估标准",
      buttonText: "查看推荐说明",
      action: () => window.open("/methodology", "_blank"),
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50"
    },
    {
      icon: Map,
      title: "探索文化世界",
      description: "先从文化角度了解各地区，再选择语言",
      buttonText: "进入文化世界",
      action: () => window.open("/culture", "_blank"),
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50"
    }
  ];

  return (
    <div className="space-y-6">
      {/* 区域标题 */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full mb-4">
          <Compass className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">探索更多</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          更多探索选项
        </h2>
        <p className="text-slate-600">
          发现更多学习路径和深入了解我们的推荐系统
        </p>
      </motion.div>

      {/* 探索选项网格 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {exploreOptions.map((option, index) => (
          <motion.div
            key={option.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className={`group h-full bg-gradient-to-br ${option.bgGradient} border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}>
              <CardContent className="p-6 h-full flex flex-col">
                {/* 图标和标题 */}
                <div className="text-center mb-6">
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${option.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    <option.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {option.description}
                  </p>
                </div>

                {/* 按钮 */}
                <div className="mt-auto">
                  <Button
                    onClick={option.action}
                    className={`w-full bg-gradient-to-r ${option.gradient} hover:from-opacity-90 hover:to-opacity-90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group`}
                  >
                    <span>{option.buttonText}</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 附加信息卡片 */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/60 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold text-slate-800">
                  个性化学习建议
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed max-w-3xl mx-auto mb-6">
                基于您的评估结果，我们建议从推荐的主要语言开始学习。同时，您也可以探索其他感兴趣的语言，
                我们的系统会根据您的学习进度持续优化推荐算法。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-4 bg-blue-50/50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 mb-1">95%</div>
                  <div className="text-sm text-slate-600">推荐准确率</div>
                </div>
                <div className="p-4 bg-green-50/50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600 mb-1">50+</div>
                  <div className="text-sm text-slate-600">支持语言数量</div>
                </div>
                <div className="p-4 bg-purple-50/50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600 mb-1">10万+</div>
                  <div className="text-sm text-slate-600">用户选择信赖</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Brain,
  Target,
  Clock,
  Heart,
  Globe,
  BookOpen,
  RefreshCw,
  ChevronRight,
  Info
} from "lucide-react";
import { UserProfile } from "../../types/recommendation";

interface AlgorithmTransparencyProps {
  userProfile: UserProfile;
  onRetakeAssessment: () => void;
}

export function AlgorithmTransparency({ userProfile, onRetakeAssessment }: AlgorithmTransparencyProps) {
  const algorithmWeights = [
    {
      icon: BookOpen,
      factor: "语言难度匹配",
      weight: "30%",
      description: "基于母语背景和学习经验",
      value: "考虑中文与目标语言的语言家族关系",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      factor: "动机匹配度",
      weight: "25%",
      description: "根据您的学习目标",
      value: `${userProfile.motivation === 'work' ? '工作需要' : userProfile.motivation === 'travel' ? '旅游准备' : '兴趣爱好'}导向推荐`,
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Heart,
      factor: "文化兴趣匹配",
      weight: "25%",
      description: "基于您的文化偏好",
      value: `偏好${userProfile.culturalInterests.join('、')}文化`,
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      factor: "时间适配度",
      weight: "20%",
      description: "匹配您的时间投入",
      value: `每周${userProfile.timeCommitment.replace('hours', '小时')}学习时间`,
      color: "from-orange-500 to-red-500"
    }
  ];

  const userProfileData = [
    {
      icon: Globe,
      label: "母语",
      value: userProfile.nativeLanguage,
      description: "影响学习难度评估"
    },
    {
      icon: Target,
      label: "学习动机",
      value: userProfile.learningType,
      description: "决定推荐语言的实用性权重"
    },
    {
      icon: Clock,
      label: "时间投入",
      value: userProfile.intensity + "学习",
      description: "匹配合适的学习周期"
    },
    {
      icon: BookOpen,
      label: "学习经验",
      value: userProfile.experience === 'beginner' ? '初学者' :
             userProfile.experience === 'intermediate' ? '有一定基础' : '经验丰富',
      description: "调整学习难度系数"
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
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full mb-4">
          <Brain className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">推荐算法透明化</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          推荐依据说明
        </h2>
        <p className="text-slate-600">
          了解我们如何为您生成个性化语言推荐
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 您的学习档案 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/60 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Info className="h-5 w-5 text-white" />
                </div>
                您的学习档案
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userProfileData.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex items-start gap-4 p-4 bg-slate-50/70 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-4 w-4 text-slate-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-slate-500">
                        {item.label}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {item.value}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* 文化兴趣标签 */}
              <motion.div
                className="p-4 bg-slate-50/70 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="text-sm font-medium text-slate-500 mb-3">
                  文化兴趣偏好
                </div>
                <div className="flex flex-wrap gap-2">
                  {userProfile.culturalInterests.map((interest) => (
                    <Badge
                      key={interest}
                      variant="outline"
                      className="bg-white/50 border-primary/30 text-primary"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 推荐逻辑 */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/60 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                推荐逻辑
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {algorithmWeights.map((factor, index) => (
                <motion.div
                  key={factor.factor}
                  className="p-4 bg-slate-50/70 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 bg-gradient-to-r ${factor.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <factor.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-800">
                          {factor.factor}
                        </h4>
                        <Badge className={`bg-gradient-to-r ${factor.color} text-white font-semibold`}>
                          {factor.weight}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-2 leading-relaxed">
                        {factor.description}
                      </p>
                      <div className="text-xs text-slate-500 bg-white/60 px-3 py-2 rounded-lg">
                        当前值: {factor.value}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 个性化修改入口 */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <Card className="bg-gradient-to-r from-primary/5 to-blue-500/5 border border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <h3 className="font-bold text-slate-800 mb-1">
                  想要调整推荐结果？
                </h3>
                <p className="text-sm text-slate-600">
                  重新填写问卷来获得更精准的个性化推荐
                </p>
              </div>
              <Button
                onClick={onRetakeAssessment}
                className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold py-2 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
              >
                <RefreshCw className="h-4 w-4" />
                重新评估
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
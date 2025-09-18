import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Meh,
  Star,
  Send,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

interface UserFeedbackProps {
  onSubmit: (rating: number, feedback?: string) => void;
}

interface FeedbackOption {
  id: string;
  emoji: string;
  label: string;
  value: number;
  description: string;
  color: string;
}

export function UserFeedback({ onSubmit }: UserFeedbackProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const feedbackOptions: FeedbackOption[] = [
    {
      id: "excellent",
      emoji: "😍",
      label: "非常有帮助",
      value: 5,
      description: "推荐完全符合我的需求",
      color: "border-green-500 bg-green-50 text-green-700"
    },
    {
      id: "good",
      emoji: "👍",
      label: "还不错",
      value: 4,
      description: "大部分推荐都很合适",
      color: "border-blue-500 bg-blue-50 text-blue-700"
    },
    {
      id: "neutral",
      emoji: "😐",
      label: "一般般",
      value: 3,
      description: "推荐还算合理",
      color: "border-yellow-500 bg-yellow-50 text-yellow-700"
    },
    {
      id: "poor",
      emoji: "👎",
      label: "不太合适",
      value: 2,
      description: "推荐与我的需求不匹配",
      color: "border-orange-500 bg-orange-50 text-orange-700"
    },
    {
      id: "terrible",
      emoji: "😞",
      label: "完全不合适",
      value: 1,
      description: "推荐完全不符合预期",
      color: "border-red-500 bg-red-50 text-red-700"
    }
  ];

  const handleSubmit = async () => {
    if (selectedRating === null) {
      toast.error("请先选择一个评价选项");
      return;
    }

    setIsSubmitting(true);

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500));

      onSubmit(selectedRating, feedback.trim() || undefined);
      setIsSubmitted(true);

      toast.success("感谢您的反馈！", {
        description: "您的意见将帮助我们改进推荐系统",
      });
    } catch (error) {
      toast.error("提交失败，请稍后重试");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">
              感谢您的宝贵反馈！
            </h3>
            <p className="text-green-700 mb-6">
              您的意见对我们改进推荐系统非常重要。我们会认真考虑您的建议，持续优化服务质量。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-white/50 rounded-xl">
                <div className="text-lg font-bold text-green-600 mb-1">24h</div>
                <div className="text-sm text-green-700">反馈处理时间</div>
              </div>
              <div className="p-4 bg-white/50 rounded-xl">
                <div className="text-lg font-bold text-green-600 mb-1">98%</div>
                <div className="text-sm text-green-700">用户满意度</div>
              </div>
              <div className="p-4 bg-white/50 rounded-xl">
                <div className="text-lg font-bold text-green-600 mb-1">持续</div>
                <div className="text-sm text-green-700">算法优化</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
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
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full mb-4">
          <MessageSquare className="h-4 w-4 text-pink-600" />
          <span className="text-sm font-medium text-pink-800">用户反馈</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          这些推荐对您有帮助吗？
        </h2>
        <p className="text-slate-600">
          您的反馈将帮助我们持续改进推荐算法
        </p>
      </motion.div>

      {/* 反馈表单 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Card className="bg-white/70 backdrop-blur-sm border border-slate-200/60 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Star className="h-5 w-5 text-yellow-500" />
              推荐满意度评价
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 快速反馈选项 */}
            <div>
              <div className="text-sm font-medium text-slate-700 mb-4">
                请选择您对推荐结果的整体评价：
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {feedbackOptions.map((option, index) => (
                  <motion.button
                    key={option.id}
                    onClick={() => setSelectedRating(option.value)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-center hover:shadow-lg ${
                      selectedRating === option.value
                        ? option.color
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-2xl mb-2">{option.emoji}</div>
                    <div className="font-semibold text-sm mb-1">
                      {option.label}
                    </div>
                    <div className="text-xs opacity-80">
                      {option.description}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* 详细反馈 */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: selectedRating !== null ? 1 : 0,
                height: selectedRating !== null ? "auto" : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-4">
                <div className="text-sm font-medium text-slate-700">
                  详细反馈（可选）
                </div>
                <Textarea
                  placeholder="请告诉我们您的具体想法或建议，这将帮助我们改进推荐系统..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-[100px] resize-none bg-white/80 border-slate-200 focus:border-primary/50 focus:ring-primary/20"
                />
                <div className="text-xs text-slate-500">
                  您的反馈将被匿名处理，仅用于改进我们的服务质量
                </div>
              </div>
            </motion.div>

            {/* 提交按钮 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center pt-4"
            >
              <Button
                onClick={handleSubmit}
                disabled={selectedRating === null || isSubmitting}
                className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>提交中...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>提交反馈</span>
                  </>
                )}
              </Button>
            </motion.div>

            {/* 反馈统计 */}
            <motion.div
              className="mt-8 pt-6 border-t border-slate-200/60"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-sm font-medium text-slate-600 mb-4">
                  其他用户的反馈统计
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">87%</div>
                    <div className="text-xs text-slate-600">非常满意</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">11%</div>
                    <div className="text-xs text-slate-600">比较满意</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">2%</div>
                    <div className="text-xs text-slate-600">一般般</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-600">1.2万+</div>
                    <div className="text-xs text-slate-600">评价总数</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
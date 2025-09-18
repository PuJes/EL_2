import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Toaster } from "./components/ui/sonner";
import { Header } from "./components/Header";
import { PersonalizedWelcome } from "./components/recommendation/PersonalizedWelcome";
import { PrimaryRecommendation } from "./components/recommendation/PrimaryRecommendation";
import { OtherRecommendations } from "./components/recommendation/OtherRecommendations";
import { AlgorithmTransparency } from "./components/recommendation/AlgorithmTransparency";
import { ExploreMore } from "./components/recommendation/ExploreMore";
import { UserFeedback } from "./components/recommendation/UserFeedback";
import { Footer } from "./components/Footer";
import { mockUserProfile, mockRecommendations } from "./utils/mockData";
import { UserProfile, LanguageRecommendation } from "./types/recommendation";

export default function App() {
  const [userProfile] = useState<UserProfile>(mockUserProfile);
  const [recommendations] = useState<LanguageRecommendation[]>(mockRecommendations);
  const [isLoading, setIsLoading] = useState(true);

  const primaryRecommendation = recommendations.find(r => r.isPrimary);
  const otherRecommendations = recommendations.filter(r => !r.isPrimary);

  useEffect(() => {
    // 模拟加载过程
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRetakeAssessment = () => {
    window.location.href = "/survey";
  };

  const handleExploreLanguages = () => {
    window.location.href = "/languages";
  };

  const handleLearnMore = (languageId: string) => {
    window.location.href = `/languages/${languageId}`;
  };

  const handleFeedbackSubmit = (rating: number, feedback?: string) => {
    console.log("用户反馈:", { rating, feedback });
    // 这里可以发送到后端API
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 mx-auto relative">
            <motion.div
              className="w-16 h-16 border-4 border-primary/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-primary rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-800">
              正在生成您的专属推荐
            </h2>
            <p className="text-slate-600">
              基于您的学习需求分析中...
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <main className="container mx-auto px-6 py-8 max-w-6xl">
        {/* 个性化欢迎信息 */}
        <PersonalizedWelcome userProfile={userProfile} />

        {/* 主推荐语言 */}
        {primaryRecommendation && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <PrimaryRecommendation
              recommendation={primaryRecommendation}
              onLearnMore={() => handleLearnMore(primaryRecommendation.id)}
            />
          </motion.div>
        )}

        {/* 其他推荐语言 */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <OtherRecommendations
            recommendations={otherRecommendations}
            onLearnMore={handleLearnMore}
          />
        </motion.div>

        {/* 推荐算法透明化 */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <AlgorithmTransparency
            userProfile={userProfile}
            onRetakeAssessment={handleRetakeAssessment}
          />
        </motion.div>

        {/* 探索更多选项 */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <ExploreMore onExploreLanguages={handleExploreLanguages} />
        </motion.div>

        {/* 用户反馈 */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <UserFeedback onSubmit={handleFeedbackSubmit} />
        </motion.div>
      </main>

      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { ProgressBar } from "./components/ProgressBar";
import { ModernSurveyForm } from "./components/ModernSurveyForm";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";
import { motion } from "motion/react";

interface SurveyFormData {
  nativeLanguage: string;
  nativeLanguageCustom?: string;
  motivation: string;
  motivationCustom?: string;
  timeCommitment: string;
  experience: string;
  culturalInterests: string[];
  timestamp?: string;
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Page load data restoration
  useEffect(() => {
    const savedData = localStorage.getItem("surveyData");
    if (savedData) {
      toast.info("检测到之前未完成的评估，您可以继续填写", {
        duration: 4000,
      });
    }
  }, []);

  const handleFormSubmit = (data: SurveyFormData) => {
    console.log("Survey submitted:", data);

    // Generate user profile
    const userProfile = generateUserProfile(data);
    console.log("Generated user profile:", userProfile);

    toast.success("学习需求评估完成！", {
      description: "正在为您生成个性化语言学习推荐方案...",
      duration: 4000,
    });
  };

  const handleFormReset = () => {
    setCurrentStep(1);
    localStorage.removeItem("surveyData");
    toast.info("评估表单已重置");
  };

  const handleBack = () => {
    // Navigate back to homepage
    window.location.href =
      "https://uncut-near-61695193.figma.site";
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  // Generate user profile
  const generateUserProfile = (data: SurveyFormData) => {
    const profile = {
      learningType: getLearningType(data.motivation),
      intensity: getIntensityLevel(data.timeCommitment),
      experienceLevel: data.experience,
      culturalPreferences: data.culturalInterests,
      nativeLanguage:
        data.nativeLanguage === "other"
          ? data.nativeLanguageCustom
          : data.nativeLanguage,
      tags: generateTags(data),
    };

    return profile;
  };

  const getLearningType = (motivation: string) => {
    switch (motivation) {
      case "work":
        return "实用型";
      case "academic":
        return "学术型";
      case "interest":
        return "兴趣型";
      case "travel":
        return "实用型";
      case "immigration":
        return "实用型";
      default:
        return "综合型";
    }
  };

  const getIntensityLevel = (timeCommitment: string) => {
    switch (timeCommitment) {
      case "1-3hours":
        return "轻度";
      case "3-5hours":
        return "中度";
      case "5-10hours":
        return "重度";
      case "10+hours":
        return "密集";
      default:
        return "中度";
    }
  };

  const generateTags = (data: SurveyFormData) => {
    const tags = [];

    // Generate tags based on motivation
    if (data.motivation === "work")
      tags.push("商务导向", "职业发展");
    if (data.motivation === "travel")
      tags.push("旅游爱好者", "文化探索");
    if (data.motivation === "academic")
      tags.push("学术研究", "深度学习");

    // Generate tags based on time commitment
    if (data.timeCommitment === "10+hours")
      tags.push("高强度学习者");
    if (data.timeCommitment === "1-3hours")
      tags.push("业余学习者");

    // Generate tags based on experience
    if (data.experience === "experienced")
      tags.push("多语言学习者");
    if (data.experience === "beginner")
      tags.push("语言学习新手");

    return tags;
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <Header
        currentStep={currentStep}
        totalSteps={totalSteps}
        onBack={handleBack}
      />

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-8 max-w-5xl">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full mb-4">
                <span className="text-sm font-medium">
                  语言学习需求评估
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                为您量身定制学习方案
              </h1>
            </motion.div>

            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              请花费 3-5
              分钟完成以下问题，我们将基于您的回答为您推荐最适合的语言学习计划
            </motion.p>
          </div>

          {/* Progress Overview */}
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center justify-center space-x-3">
              <span className="text-sm font-medium text-gray-600">
                步骤 {currentStep} / {totalSteps}
              </span>
              <div className="flex-1 max-w-32 bg-gray-200 rounded-full h-1.5">
                <motion.div
                  className="bg-indigo-600 h-1.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(currentStep / totalSteps) * 100}%`,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.8,
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Content Grid */}
        <div className="max-w-4xl mx-auto">
          {/* Main Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
              <ModernSurveyForm
                onSubmit={handleFormSubmit}
                onReset={handleFormReset}
                onBack={handleBack}
                currentStep={currentStep}
                onStepChange={handleStepChange}
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="max-w-3xl mx-auto"></div>
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          className: "rounded-xl border-gray-200",
        }}
      />
    </div>
  );
}
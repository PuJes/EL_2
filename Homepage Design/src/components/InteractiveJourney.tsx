import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Card, CardContent } from "./ui/card";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Circle,
  Sparkles,
  Globe,
  Clock,
  Target,
  Heart,
  Zap,
  Users,
  BookOpen,
  Music,
  Plane,
  Briefcase,
  GraduationCap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface InteractiveJourneyProps {
  onComplete: (preferences: any) => void;
  onBack: () => void;
}

export function InteractiveJourney({ onComplete, onBack }: InteractiveJourneyProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showAnimation, setShowAnimation] = useState(false);

  const steps = [
    {
      id: 'motivation',
      title: '您的学习动机是什么？',
      subtitle: '选择最符合您情况的选项，我们会为您定制专属体验',
      type: 'choice',
      options: [
        { 
          id: 'career', 
          icon: Briefcase, 
          title: '职业发展', 
          desc: '提升工作竞争力',
          color: 'from-blue-500 to-cyan-500'
        },
        { 
          id: 'travel', 
          icon: Plane, 
          title: '旅游准备', 
          desc: '探索世界文化',
          color: 'from-green-500 to-emerald-500'
        },
        { 
          id: 'interest', 
          icon: Heart, 
          title: '兴趣爱好', 
          desc: '纯粹的学习热情',
          color: 'from-pink-500 to-rose-500'
        },
        { 
          id: 'academic', 
          icon: GraduationCap, 
          title: '学术需求', 
          desc: '升学或研究需要',
          color: 'from-purple-500 to-violet-500'
        }
      ]
    },
    {
      id: 'time',
      title: '您每周能投入多少时间？',
      subtitle: '诚实回答有助于我们制定现实可行的学习计划',
      type: 'slider',
      min: 1,
      max: 20,
      unit: '小时',
      recommendations: [
        { range: [1, 3], label: '轻松入门', desc: '适合忙碌人士' },
        { range: [4, 7], label: '稳步提升', desc: '理想的学习节奏' },
        { range: [8, 15], label: '快速进步', desc: '短期内看到成效' },
        { range: [16, 20], label: '密集学习', desc: '最快速的成长' }
      ]
    },
    {
      id: 'level',
      title: '您的语言学习经验如何？',
      subtitle: '让我们了解您的起点，为您推荐合适的内容',
      type: 'experience',
      options: [
        {
          id: 'beginner',
          title: '完全新手',
          desc: '只会母语，第一次学外语',
          features: ['基础语音', '日常对话', '文化入门'],
          difficulty: 1
        },
        {
          id: 'some',
          title: '有些经验',
          desc: '学过1-2门外语，有基础',
          features: ['语法提升', '词汇扩展', '文化深入'],
          difficulty: 2
        },
        {
          id: 'experienced',
          title: '经验丰富',
          desc: '学过多门语言，有心得',
          features: ['高级技巧', '文化洞察', '学习方法'],
          difficulty: 3
        }
      ]
    },
    {
      id: 'interests',
      title: '您最感兴趣的文化领域？',
      subtitle: '可以选择多个，我们会为您推荐相关内容',
      type: 'multi-choice',
      options: [
        { id: 'food', icon: '🍜', title: '美食文化', color: 'bg-orange-100 text-orange-700' },
        { id: 'music', icon: '🎵', title: '音乐艺术', color: 'bg-purple-100 text-purple-700' },
        { id: 'history', icon: '🏛️', title: '历史传统', color: 'bg-blue-100 text-blue-700' },
        { id: 'nature', icon: '🌸', title: '自然风光', color: 'bg-green-100 text-green-700' },
        { id: 'tech', icon: '💻', title: '科技创新', color: 'bg-gray-100 text-gray-700' },
        { id: 'fashion', icon: '👗', title: '时尚生活', color: 'bg-pink-100 text-pink-700' }
      ]
    }
  ];

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleAnswer = (value: any) => {
    setAnswers({ ...answers, [currentStepData.id]: value });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 500);
    } else {
      // Complete the journey
      setShowAnimation(true);
      setTimeout(() => {
        onComplete(answers);
      }, 1000);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepComplete = () => {
    const answer = answers[currentStepData.id];
    if (currentStepData.type === 'multi-choice') {
      return answer && answer.length > 0;
    }
    return answer !== undefined && answer !== null;
  };

  const renderStepContent = () => {
    switch (currentStepData.type) {
      case 'choice':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {currentStepData.options?.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                    answers[currentStepData.id] === option.id 
                      ? 'border-purple-400 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-200'
                  }`}
                  onClick={() => handleAnswer(option.id)}
                >
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${option.color} flex items-center justify-center`}>
                      <option.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                    <p className="text-gray-600">{option.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        );

      case 'slider':
        const currentValue = answers[currentStepData.id] || 5;
        const getCurrentRecommendation = () => {
          return currentStepData.recommendations?.find(rec => 
            currentValue >= rec.range[0] && currentValue <= rec.range[1]
          );
        };
        
        return (
          <div className="max-w-2xl mx-auto">
            <div className="glass-card rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-purple-600 mb-2">
                  {currentValue}
                </div>
                <div className="text-lg text-gray-600">{currentStepData.unit}</div>
              </div>
              
              <input
                type="range"
                min={currentStepData.min}
                max={currentStepData.max}
                value={currentValue}
                onChange={(e) => handleAnswer(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{currentStepData.min}{currentStepData.unit}</span>
                <span>{currentStepData.max}{currentStepData.unit}</span>
              </div>

              {getCurrentRecommendation() && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-purple-50 rounded-lg text-center"
                >
                  <div className="font-semibold text-purple-800">
                    {getCurrentRecommendation()?.label}
                  </div>
                  <div className="text-sm text-purple-600">
                    {getCurrentRecommendation()?.desc}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {currentStepData.options?.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 h-full ${
                    answers[currentStepData.id] === option.id 
                      ? 'border-purple-400 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-200'
                  }`}
                  onClick={() => handleAnswer(option.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full ${
                              i < option.difficulty ? 'bg-purple-500' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{option.desc}</p>
                    <div className="space-y-2">
                      {option.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        );

      case 'multi-choice':
        const selectedInterests = answers[currentStepData.id] || [];
        
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {currentStepData.options?.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                    selectedInterests.includes(option.id)
                      ? 'border-purple-400 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-200 bg-white'
                  }`}
                  onClick={() => {
                    const newSelected = selectedInterests.includes(option.id)
                      ? selectedInterests.filter((id: string) => id !== option.id)
                      : [...selectedInterests, option.id];
                    handleAnswer(newSelected);
                  }}
                >
                  <div className="text-3xl mb-3">{option.icon}</div>
                  <div className={`text-sm font-medium px-3 py-1 rounded-full ${option.color}`}>
                    {option.title}
                  </div>
                  {selectedInterests.includes(option.id) && (
                    <CheckCircle className="w-5 h-5 text-purple-600 mx-auto mt-3" />
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              返回首页
            </Button>
            <div className="text-sm text-gray-600">
              步骤 {currentStep + 1} / {steps.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <Progress value={progress} className="h-2 mb-4" />
            <div className="flex justify-between absolute top-4 left-0 right-0">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 bg-white transition-all ${
                    index <= currentStep
                      ? 'border-purple-500 text-purple-500'
                      : 'border-gray-300 text-gray-400'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="w-5 h-5 text-purple-500" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            {/* Title */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {currentStepData.title}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {currentStepData.subtitle}
              </p>
            </div>

            {/* Step Content */}
            <div className="mb-12">
              {renderStepContent()}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            上一步
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={!isStepComplete()}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            {currentStep === steps.length - 1 ? '完成设置' : '下一步'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Loading Animation */}
        <AnimatePresence>
          {showAnimation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-4"
                >
                  <Sparkles className="w-16 h-16 text-purple-600" />
                </motion.div>
                <p className="text-xl font-semibold text-gray-900">
                  {currentStep === steps.length - 1 ? '正在生成您的专属学习计划...' : '加载中...'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
import { motion } from "motion/react";
import { Check } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  const stepLabels = [
    { label: "语言背景", description: "您的母语情况" },
    { label: "学习动机", description: "学习的主要目的" },
    { label: "时间投入", description: "可用学习时间" },
    { label: "学习经验", description: "之前的学习经历" },
    { label: "文化兴趣", description: "感兴趣的文化领域" }
  ];

  return (
    <motion.div 
      className="w-full bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          评估步骤
        </h3>
        <p className="text-sm text-gray-600">
          完成所有步骤，获取个性化推荐
        </p>
      </div>

      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-indigo-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="mt-2 text-right">
          <span className="text-sm font-medium text-gray-700">
            {Math.round(progress)}% 完成
          </span>
        </div>
      </div>

      {/* Step List */}
      <div className="space-y-4">
        {stepLabels.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <motion.div
              key={stepNumber}
              className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-300 ${
                isCurrent 
                  ? 'bg-indigo-50 border border-indigo-200' 
                  : isCompleted 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-gray-50 border border-gray-200'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div
                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-green-600 text-white' 
                    : isCurrent 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-300 text-gray-600'
                }`}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Check className="w-3 h-3" />
                  </motion.div>
                ) : (
                  stepNumber
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className={`font-medium text-sm transition-colors duration-300 ${
                  isCurrent 
                    ? 'text-indigo-900' 
                    : isCompleted 
                      ? 'text-green-900' 
                      : 'text-gray-700'
                }`}>
                  {step.label}
                </div>
                <p className={`text-xs mt-1 transition-colors duration-300 ${
                  isCurrent 
                    ? 'text-indigo-700' 
                    : isCompleted 
                      ? 'text-green-700' 
                      : 'text-gray-500'
                }`}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium text-blue-900 mb-1">评估提示</p>
            <p className="text-xs text-blue-800 leading-relaxed">
              您的答案将帮助我们为您推荐最合适的学习内容和进度安排。请诚实回答，无标准答案。
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
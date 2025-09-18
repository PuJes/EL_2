import { Progress } from "./ui/progress";
import { motion } from "motion/react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <motion.span 
          className="text-sm bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent font-medium"
          key={currentStep}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          问题 {currentStep} / {totalSteps}
        </motion.span>
        <motion.span 
          className="text-sm bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-medium"
          key={progress}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {Math.round(progress)}% 完成
        </motion.span>
      </div>
      
      {/* 增强的进度条 */}
      <div className="relative">
        <div className="h-2 bg-gradient-to-r from-slate-200 to-slate-100 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full shadow-sm"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <motion.div
          className="absolute top-0 h-2 w-8 bg-gradient-to-r from-white/40 to-transparent rounded-full"
          animate={{ 
            x: `${Math.max(0, progress - 8)}%`,
            opacity: progress > 5 ? 1 : 0
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      
      {/* 精致的步骤指示器 */}
      <div className="flex justify-center space-x-3 mt-6">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <motion.div
              key={stepNumber}
              className={`relative w-4 h-4 rounded-full transition-all duration-500 ${
                isCompleted 
                  ? 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/25' 
                  : isCurrent 
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/40' 
                    : 'bg-gradient-to-br from-slate-200 to-slate-300'
              }`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: isCurrent ? 1.2 : 1, 
                opacity: 1 
              }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              whileHover={{ scale: isCurrent ? 1.3 : 1.1 }}
            >
              {isCompleted && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <svg 
                    className="w-2.5 h-2.5 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </motion.div>
              )}
              {isCurrent && (
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-30"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
import { motion } from "motion/react";
import { ArrowLeft, Languages } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
}

export function Header({ currentStep, totalSteps, onBack }: HeaderProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <motion.header 
      className="w-full bg-white border-b border-gray-200 sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Back Button & Brand */}
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="default"
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg px-3 py-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">返回首页</span>
              </Button>
            </motion.div>

            <div className="h-6 w-px bg-gray-300 hidden sm:block" />

            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Languages className="h-4 w-4 text-white" />
              </div>
              
              <div>
                <h1 className="text-lg font-bold text-gray-900">LinguaLearn</h1>
                <p className="text-xs text-gray-500 hidden sm:block">语言学习评估</p>
              </div>
            </motion.div>
          </div>

          {/* Progress Info */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                步骤 {currentStep} / {totalSteps}
              </div>
              <div className="text-xs text-gray-500">
                {Math.round(progress)}% 完成
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
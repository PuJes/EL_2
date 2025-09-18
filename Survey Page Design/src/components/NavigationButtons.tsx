import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight, Check, Loader2, RotateCcw } from "lucide-react";

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onReset: () => void;
  onBack: () => void;
  onSubmit: () => void;
}

export function NavigationButtons({
  currentStep,
  totalSteps,
  canProceed,
  isSubmitting,
  onPrevious,
  onNext,
  onReset,
  onBack,
  onSubmit
}: NavigationButtonsProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <motion.div 
      className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Left side - Back/Previous */}
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="ghost"
            onClick={isFirstStep ? onBack : onPrevious}
            className="h-11 px-5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 rounded-xl font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {isFirstStep ? "返回首页" : "上一步"}
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="outline"
            onClick={onReset}
            className="h-11 px-3 text-gray-500 hover:text-red-600 border-gray-200 hover:border-red-200 hover:bg-red-50 transition-all duration-200 rounded-xl"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="sr-only">重置表单</span>
          </Button>
        </motion.div>
      </div>

      {/* Right side - Next/Submit */}
      <div className="flex items-center gap-3">
        {!isLastStep ? (
          <motion.div
            whileHover={{ scale: canProceed ? 1.02 : 1 }}
            whileTap={{ scale: canProceed ? 0.98 : 1 }}
          >
            <Button
              onClick={onNext}
              disabled={!canProceed}
              className={`h-11 px-6 font-medium rounded-xl transition-all duration-200 ${
                canProceed 
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              下一步
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            whileHover={{ scale: !isSubmitting ? 1.02 : 1 }}
            whileTap={{ scale: !isSubmitting ? 0.98 : 1 }}
          >
            <Button
              onClick={onSubmit}
              disabled={isSubmitting}
              className={`h-11 px-6 font-medium rounded-xl transition-all duration-200 ${
                isSubmitting
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow-md'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  提交中...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  完成评估
                </>
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
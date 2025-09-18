import { motion } from "motion/react";
import { ReactNode } from "react";

interface QuestionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  step: number;
  isRequired?: boolean;
}

export function QuestionCard({ title, description, children, step, isRequired = true }: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      <div className="p-8">
        {/* Question Header */}
        <motion.div 
          className="text-center mb-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
              {step}
            </div>
            {isRequired && (
              <div className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                必填
              </div>
            )}
          </div>
          
          <h2 className="text-2xl font-semibold text-neutral-900 leading-tight">
            {title}
          </h2>
          
          {description && (
            <p className="text-neutral-600 leading-relaxed max-w-md mx-auto">
              {description}
            </p>
          )}
        </motion.div>

        {/* Question Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}
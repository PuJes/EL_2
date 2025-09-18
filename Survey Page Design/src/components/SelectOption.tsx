import { motion } from "motion/react";
import { ReactNode } from "react";
import { Check } from "lucide-react";

interface SelectOptionProps {
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  isSelected: boolean;
  onClick: (value: string) => void;
  delay?: number;
}

export function SelectOption({ 
  value, 
  label, 
  description, 
  icon, 
  isSelected, 
  onClick, 
  delay = 0 
}: SelectOptionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative group cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-300 shadow-lg shadow-indigo-500/20'
          : 'bg-white hover:bg-neutral-50 border-neutral-200 hover:border-neutral-300 hover:shadow-md'
      } border-2 rounded-2xl p-6 overflow-hidden`}
      onClick={() => onClick(value)}
    >
      {/* Selection Indicator */}
      <motion.div
        className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          isSelected
            ? 'bg-indigo-600 border-indigo-600 text-white'
            : 'border-neutral-300 group-hover:border-indigo-300'
        }`}
        initial={false}
        animate={{
          scale: isSelected ? 1 : 0.8,
          opacity: isSelected ? 1 : 0.6
        }}
      >
        <motion.div
          initial={false}
          animate={{
            scale: isSelected ? 1 : 0,
            rotate: isSelected ? 0 : -180
          }}
          transition={{ duration: 0.2 }}
        >
          <Check className="w-3 h-3" />
        </motion.div>
      </motion.div>

      <div className="flex items-start space-x-4 pr-8">
        {/* Icon */}
        {icon && (
          <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isSelected
              ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg'
              : 'bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200'
          }`}>
            <div className="text-lg">
              {icon}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold mb-1 transition-colors duration-300 ${
            isSelected ? 'text-indigo-900' : 'text-neutral-900 group-hover:text-neutral-800'
          }`}>
            {label}
          </h3>
          {description && (
            <p className={`text-sm leading-relaxed transition-colors duration-300 ${
              isSelected ? 'text-indigo-700' : 'text-neutral-600 group-hover:text-neutral-700'
            }`}>
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Selection Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5 pointer-events-none"
        initial={false}
        animate={{
          opacity: isSelected ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Hover Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-neutral-900/5 to-neutral-900/5 pointer-events-none opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
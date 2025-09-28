import { motion } from "motion/react";
import { Heart, Shield, Clock, Award, Languages } from "lucide-react";

export function Footer() {
  return (
    <motion.footer 
      className="bg-white border-t border-gray-200 mt-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="container mx-auto px-6 py-8">
        <div className="text-center space-y-6">
          {/* Brand Section */}
          <div className="space-y-3">
            <motion.div 
              className="flex items-center justify-center space-x-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Languages className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">LinguaLearn</h3>
            </motion.div>
            
            <motion.p 
              className="text-sm text-gray-600 max-w-md mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              基于科学方法的个性化语言学习平台
            </motion.p>
          </div>

          {/* Features */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            {[
              { icon: Shield, label: "隐私保护", description: "数据安全保障" },
              { icon: Clock, label: "高效学习", description: "科学学习方法" },
              { icon: Award, label: "专业认证", description: "权威机构认可" }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-gray-600" />
                </div>
                <div className="text-center">
                  <h4 className="text-xs font-medium text-gray-900">{item.label}</h4>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div 
            className="pt-4 border-t border-gray-200 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-600">
              <a href="#" className="hover:text-gray-900 transition-colors duration-200">关于我们</a>
              <span>·</span>
              <a href="#" className="hover:text-gray-900 transition-colors duration-200">隐私政策</a>
              <span>·</span>
              <a href="#" className="hover:text-gray-900 transition-colors duration-200">服务条款</a>
              <span>·</span>
              <a href="#" className="hover:text-gray-900 transition-colors duration-200">帮助中心</a>
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
              <span>© 2024 LinguaLearn. 保留所有权利</span>
              <Heart className="w-3 h-3 text-red-500 animate-pulse" />
              <span>Made with care</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}
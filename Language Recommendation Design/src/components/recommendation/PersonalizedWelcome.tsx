import { motion } from "motion/react";
import { Sparkles, Target, Clock, BookOpen } from "lucide-react";
import { UserProfile } from "../../types/recommendation";

interface PersonalizedWelcomeProps {
  userProfile: UserProfile;
}

export function PersonalizedWelcome({ userProfile }: PersonalizedWelcomeProps) {
  const getGreeting = () => {
    const motivationMap = {
      'work': '职场达人',
      'academic': '学术探索者',
      'travel': '旅行爱好者',
      'interest': '语言爱好者',
      'immigration': '新环境适应者'
    };

    return motivationMap[userProfile.motivation as keyof typeof motivationMap] || '语言学习者';
  };

  const getMotivationDescription = () => {
    const descriptions = {
      'work': '为您的职业发展量身定制',
      'academic': '基于您的学术研究需求',
      'travel': '满足您的旅行交流愿望',
      'interest': '培养您的语言兴趣爱好',
      'immigration': '助力您的海外生活'
    };

    return descriptions[userProfile.motivation as keyof typeof descriptions] || '基于您的学习需求';
  };

  const profileHighlights = [
    {
      icon: Target,
      label: '学习目标',
      value: userProfile.learningType,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Clock,
      label: '时间投入',
      value: userProfile.intensity + '学习',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: BookOpen,
      label: '学习经验',
      value: userProfile.experience === 'beginner' ? '初学者' :
             userProfile.experience === 'intermediate' ? '有一定基础' : '经验丰富',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/60 shadow-xl">
        {/* 主标题区域 */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">专属推荐结果</span>
          </motion.div>

          <motion.h1
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            你好，{getGreeting()}！
          </motion.h1>

          <motion.p
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {getMotivationDescription()}，我们为您精心挑选了以下语言推荐
          </motion.p>
        </div>

        {/* 用户画像高亮 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {profileHighlights.map((highlight, index) => (
            <motion.div
              key={highlight.label}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              <div className="bg-white/80 rounded-2xl p-6 border border-white/60 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${highlight.color} flex items-center justify-center shadow-lg`}>
                    <highlight.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500 mb-1">
                      {highlight.label}
                    </div>
                    <div className="text-lg font-semibold text-slate-800">
                      {highlight.value}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 文化兴趣标签 */}
        {userProfile.culturalInterests.length > 0 && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="text-sm font-medium text-slate-500 mb-3">
              您感兴趣的文化地区
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {userProfile.culturalInterests.map((interest, index) => (
                <motion.span
                  key={interest}
                  className="px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 rounded-full text-sm font-medium border border-slate-200/60"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
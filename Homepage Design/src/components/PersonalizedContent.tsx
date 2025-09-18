import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  ArrowRight, 
  Star, 
  Clock, 
  Target, 
  Trophy,
  BookOpen,
  Globe,
  Users,
  Zap,
  Heart,
  CheckCircle,
  Play,
  Calendar,
  TrendingUp,
  Award,
  Sparkles
} from "lucide-react";
import { motion } from "motion/react";

interface PersonalizedContentProps {
  preferences: any;
  onRestart: () => void;
  onBackToHome: () => void;
}

export function PersonalizedContent({ preferences, onRestart, onBackToHome }: PersonalizedContentProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [completedActions, setCompletedActions] = useState<string[]>([]);

  // Generate personalized recommendations based on user preferences
  const getPersonalizedPlan = () => {
    const motivation = preferences.motivation;
    const timeCommitment = preferences.time || 5;
    const level = preferences.level;
    const interests = preferences.interests || [];

    let recommendedLanguages = [];
    let studyPlan = {};
    let culturalContent = [];

    // Language recommendations based on motivation
    switch (motivation) {
      case 'career':
        recommendedLanguages = [
          { 
            code: 'en', 
            name: '英语', 
            flag: '🇺🇸', 
            reason: '国际商务必备', 
            difficulty: '中等',
            marketValue: '极高',
            jobs: '200万+ 职位'
          },
          { 
            code: 'zh', 
            name: '中文', 
            flag: '🇨🇳', 
            reason: '世界第二大经济体', 
            difficulty: '困难',
            marketValue: '很高',
            jobs: '50万+ 职位'
          },
          { 
            code: 'es', 
            name: '西班牙语', 
            flag: '🇪🇸', 
            reason: '快速增长市场', 
            difficulty: '简单',
            marketValue: '高',
            jobs: '30万+ 职位'
          }
        ];
        break;
      case 'travel':
        recommendedLanguages = [
          { 
            code: 'es', 
            name: '西班牙语', 
            flag: '🇪🇸', 
            reason: '20+国家通用', 
            difficulty: '简单',
            destinations: '西班牙、墨西哥、阿根廷',
            culture: '热情、艺术、美食'
          },
          { 
            code: 'fr', 
            name: '法语', 
            flag: '🇫🇷', 
            reason: '浪漫文化体验', 
            difficulty: '中等',
            destinations: '法国、加拿大、瑞士',
            culture: '优雅、时尚、美食'
          },
          { 
            code: 'ja', 
            name: '日语', 
            flag: '🇯🇵', 
            reason: '独特文化魅力', 
            difficulty: '困难',
            destinations: '日本',
            culture: '传统、现代、精致'
          }
        ];
        break;
      case 'interest':
        recommendedLanguages = [
          { 
            code: 'ja', 
            name: '日语', 
            flag: '🇯🇵', 
            reason: '丰富的文化内容', 
            difficulty: '困难',
            content: '动漫、文学、艺术',
            uniqueness: '汉字+假名系统'
          },
          { 
            code: 'ko', 
            name: '韩语', 
            flag: '🇰🇷', 
            reason: '流行文化影响', 
            difficulty: '中等',
            content: 'K-pop、韩剧、美食',
            uniqueness: '表音文字系统'
          },
          { 
            code: 'it', 
            name: '意大利语', 
            flag: '🇮🇹', 
            reason: '艺术与美食天堂', 
            difficulty: '中等',
            content: '艺术、音乐、美食',
            uniqueness: '音韵优美'
          }
        ];
        break;
      case 'academic':
        recommendedLanguages = [
          { 
            code: 'en', 
            name: '英语', 
            flag: '🇺🇸', 
            reason: '学术论文通用语', 
            difficulty: '中等',
            academic: '90% 学术期刊',
            universities: '美国、英国、澳洲'
          },
          { 
            code: 'de', 
            name: '德语', 
            flag: '🇩🇪', 
            reason: '科研强国语言', 
            difficulty: '困难',
            academic: '工程、哲学领域',
            universities: '德国免费教育'
          },
          { 
            code: 'fr', 
            name: '法语', 
            flag: '🇫🇷', 
            reason: '人文学科重要', 
            difficulty: '中等',
            academic: '文学、艺术史',
            universities: '法国、瑞士、加拿大'
          }
        ];
        break;
      default:
        recommendedLanguages = [
          { code: 'en', name: '英语', flag: '🇺🇸', reason: '全球通用', difficulty: '中等' },
          { code: 'es', name: '西班牙语', flag: '🇪🇸', reason: '易学实用', difficulty: '简单' },
          { code: 'fr', name: '法语', flag: '🇫🇷', reason: '文化丰富', difficulty: '中等' }
        ];
    }

    // Study plan based on time commitment
    if (timeCommitment <= 3) {
      studyPlan = {
        type: '轻松学习',
        weeklyGoal: '掌握10个新单词',
        dailyTime: '15-20分钟',
        focusAreas: ['日常对话', '基础词汇', '发音练习'],
        timeline: '6个月达到初级水平'
      };
    } else if (timeCommitment <= 7) {
      studyPlan = {
        type: '稳步提升',
        weeklyGoal: '完成2个主题学习',
        dailyTime: '30-45分钟',
        focusAreas: ['语法结构', '情景对话', '文化背景'],
        timeline: '4个月达到中级水平'
      };
    } else if (timeCommitment <= 15) {
      studyPlan = {
        type: '快速进步',
        weeklyGoal: '掌握1个语法点 + 50个词汇',
        dailyTime: '1-2小时',
        focusAreas: ['系统语法', '阅读理解', '听力训练'],
        timeline: '2个月达到中级水平'
      };
    } else {
      studyPlan = {
        type: '密集学习',
        weeklyGoal: '完成3个单元 + 实践对话',
        dailyTime: '2-3小时',
        focusAreas: ['全面技能', '文化深入', '实战应用'],
        timeline: '1个月达到中级水平'
      };
    }

    // Cultural content based on interests
    const interestMap: Record<string, any> = {
      food: { title: '美食文化', icon: '🍜', content: ['传统料理', '餐桌礼仪', '食材词汇'] },
      music: { title: '音乐艺术', icon: '🎵', content: ['传统音乐', '流行文化', '音乐术语'] },
      history: { title: '历史传统', icon: '🏛️', content: ['历史典故', '传统节日', '文化遗产'] },
      nature: { title: '自然风光', icon: '🌸', content: ['地理特色', '季节表达', '自然词汇'] },
      tech: { title: '科技创新', icon: '💻', content: ['科技术语', '现代生活', '数字文化'] },
      fashion: { title: '时尚生活', icon: '👗', content: ['时尚潮流', '生活方式', '购物文化'] }
    };

    culturalContent = interests.map((interest: string) => interestMap[interest]).filter(Boolean);

    return { recommendedLanguages, studyPlan, culturalContent };
  };

  const { recommendedLanguages, studyPlan, culturalContent } = getPersonalizedPlan();

  const toggleAction = (actionId: string) => {
    setCompletedActions(prev => 
      prev.includes(actionId) 
        ? prev.filter(id => id !== actionId)
        : [...prev, actionId]
    );
  };

  const quickActions = [
    { 
      id: 'level-test', 
      title: '完成水平测试', 
      desc: '精确了解您的起点', 
      time: '5分钟',
      icon: Target,
      color: 'bg-blue-500'
    },
    { 
      id: 'first-lesson', 
      title: '开始第一课', 
      desc: '立即开启学习之旅', 
      time: '15分钟',
      icon: Play,
      color: 'bg-green-500'
    },
    { 
      id: 'schedule', 
      title: '设定学习时间', 
      desc: '制定专属学习计划', 
      time: '2分钟',
      icon: Calendar,
      color: 'bg-purple-500'
    },
    { 
      id: 'community', 
      title: '加入学习社区', 
      desc: '与同伴一起进步', 
      time: '1分钟',
      icon: Users,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full mb-6"
          >
            <Trophy className="w-5 h-5" />
            个性化方案已生成
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4"
          >
            您的专属语言学习计划
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            基于您的需求和偏好，我们为您量身定制了这套学习方案
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Language Recommendations */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recommended Languages */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-6 h-6 text-blue-600" />
                    推荐语言
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {recommendedLanguages.map((lang, index) => (
                      <motion.div
                        key={lang.code}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-102 ${
                          selectedLanguage === lang.code 
                            ? 'border-purple-400 bg-purple-50' 
                            : 'border-gray-200 hover:border-purple-200'
                        }`}
                        onClick={() => setSelectedLanguage(lang.code)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{lang.flag}</span>
                            <div>
                              <h3 className="font-semibold text-lg">{lang.name}</h3>
                              <p className="text-gray-600 text-sm">{lang.reason}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="ml-2">
                            {lang.difficulty}
                          </Badge>
                        </div>
                        
                        {/* Additional info based on motivation */}
                        <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                          {lang.marketValue && (
                            <div>
                              <span className="text-gray-500">市场价值:</span>
                              <span className="ml-1 font-medium">{lang.marketValue}</span>
                            </div>
                          )}
                          {lang.jobs && (
                            <div>
                              <span className="text-gray-500">相关职位:</span>
                              <span className="ml-1 font-medium">{lang.jobs}</span>
                            </div>
                          )}
                          {lang.destinations && (
                            <div className="col-span-2">
                              <span className="text-gray-500">热门目的地:</span>
                              <span className="ml-1 font-medium">{lang.destinations}</span>
                            </div>
                          )}
                          {lang.content && (
                            <div className="col-span-2">
                              <span className="text-gray-500">相关内容:</span>
                              <span className="ml-1 font-medium">{lang.content}</span>
                            </div>
                          )}
                          {lang.academic && (
                            <div className="col-span-2">
                              <span className="text-gray-500">学术应用:</span>
                              <span className="ml-1 font-medium">{lang.academic}</span>
                            </div>
                          )}
                        </div>
                        
                        {selectedLanguage === lang.code && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-4 p-3 bg-purple-100 rounded-lg"
                          >
                            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                              开始学习 {lang.name}
                            </Button>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Cultural Interests */}
            {culturalContent.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-6 h-6 text-pink-600" />
                      您感兴趣的文化内容
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {culturalContent.map((content, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">{content.icon}</span>
                            <h3 className="font-semibold">{content.title}</h3>
                          </div>
                          <div className="space-y-1">
                            {content.content.map((item: string, idx: number) => (
                              <div key={idx} className="flex items-center text-sm text-gray-700">
                                <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                                {item}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Right Column - Study Plan & Actions */}
          <div className="space-y-6">
            {/* Study Plan */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-6 h-6 text-green-600" />
                    {studyPlan.type}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span className="font-medium">每日投入</span>
                    </div>
                    <p className="text-lg font-bold text-green-700">{studyPlan.dailyTime}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      学习重点
                    </h4>
                    {studyPlan.focusAreas.map((area: string, index: number) => (
                      <div key={index} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {area}
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Trophy className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">预期目标</span>
                    </div>
                    <p className="text-sm text-blue-700">{studyPlan.timeline}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-6 h-6 text-yellow-600" />
                    快速开始
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-102 ${
                        completedActions.includes(action.id)
                          ? 'border-green-400 bg-green-50'
                          : 'border-gray-200 hover:border-purple-200'
                      }`}
                      onClick={() => toggleAction(action.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full ${action.color} flex items-center justify-center flex-shrink-0`}>
                          {completedActions.includes(action.id) ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : (
                            <action.icon className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm">{action.title}</h4>
                          <p className="text-xs text-gray-600 mt-1">{action.desc}</p>
                          <span className="text-xs text-gray-500">{action.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">完成进度</span>
                      <span className="text-sm text-purple-600">
                        {completedActions.length}/{quickActions.length}
                      </span>
                    </div>
                    <Progress 
                      value={(completedActions.length / quickActions.length) * 100} 
                      className="mt-2" 
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievement Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <div className="glass-card rounded-2xl p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">恭喜开启学习之旅！</h3>
                <p className="text-sm text-gray-600 mb-4">
                  您已获得"语言探索者"徽章
                </p>
                <Button 
                  variant="outline" 
                  onClick={onRestart}
                  className="w-full"
                >
                  重新定制方案
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onBackToHome}
              variant="outline"
              className="flex items-center gap-2"
            >
              返回首页
            </Button>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center gap-2"
            >
              立即开始学习
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
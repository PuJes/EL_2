import { useState, useEffect } from "react";
import { useForm } from "react-hook-form@7.55.0";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner@2.0.3";
import { Loader2, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SurveyFormData {
  nativeLanguage: string;
  nativeLanguageCustom?: string;
  motivation: string;
  motivationCustom?: string;
  timeCommitment: string;
  experience: string;
  culturalInterests: string[];
}

interface SurveyFormProps {
  onSubmit: (data: SurveyFormData) => void;
  onReset: () => void;
  onBack: () => void;
  currentStep: number;
  onStepChange: (step: number) => void;
}

export function SurveyForm({ onSubmit, onReset, onBack, currentStep, onStepChange }: SurveyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomNativeLanguage, setShowCustomNativeLanguage] = useState(false);
  const [showCustomMotivation, setShowCustomMotivation] = useState(false);
  const totalSteps = 5;

  const form = useForm<SurveyFormData>({
    defaultValues: {
      nativeLanguage: "",
      nativeLanguageCustom: "",
      motivation: "",
      motivationCustom: "",
      timeCommitment: "",
      experience: "",
      culturalInterests: [],
    },
  });

  // 自动保存到localStorage
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem('surveyData', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // 恢复数据
  useEffect(() => {
    const savedData = localStorage.getItem('surveyData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        form.reset(data);
        setShowCustomNativeLanguage(data.nativeLanguage === "other");
        setShowCustomMotivation(data.motivation === "other");
      } catch (error) {
        console.error('Failed to restore survey data:', error);
      }
    }
  }, [form]);

  const handleSubmit = async (data: SurveyFormData) => {
    setIsSubmitting(true);
    
    // 模拟提交延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const submitData = {
        ...data,
        timestamp: new Date().toISOString(),
      };
      
      onSubmit(submitData);
      toast.success("问卷提交成功！正在为您生成个性化推荐...");
      localStorage.removeItem('surveyData');
    } catch (error) {
      toast.error("提交失败，请重试");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    let isValid = false;
    
    switch (currentStep) {
      case 1:
        isValid = await form.trigger(['nativeLanguage', 'nativeLanguageCustom']);
        break;
      case 2:
        isValid = await form.trigger(['motivation', 'motivationCustom']);
        break;
      case 3:
        isValid = await form.trigger('timeCommitment');
        break;
      case 4:
        isValid = await form.trigger('experience');
        break;
      case 5:
        // 最后一步，文化兴趣是可选的
        isValid = true;
        break;
    }

    if (isValid && currentStep < totalSteps) {
      onStepChange(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      onStepChange(currentStep - 1);
    }
  };

  const canProceed = () => {
    const values = form.getValues();
    switch (currentStep) {
      case 1:
        return values.nativeLanguage && (values.nativeLanguage !== 'other' || values.nativeLanguageCustom);
      case 2:
        return values.motivation && (values.motivation !== 'other' || values.motivationCustom);
      case 3:
        return values.timeCommitment;
      case 4:
        return values.experience;
      case 5:
        return true; // 文化兴趣是可选的
      default:
        return false;
    }
  };

  const culturalOptions = [
    { value: "east-asia", label: "东亚文化" },
    { value: "southeast-asia", label: "东南亚文化" },
    { value: "europe", label: "欧洲文化" },
    { value: "north-america", label: "北美文化" },
    { value: "south-america", label: "南美文化" },
    { value: "middle-east", label: "中东文化" },
    { value: "africa", label: "非洲文化" },
    { value: "oceania", label: "大洋洲文化" },
  ];

  const renderQuestion = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="question1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-3xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  您的母语是什么？
                </h2>
              </motion.div>
              <motion.p 
                className="text-slate-600 leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                这将帮助我们为您推荐合适的学习方法
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <FormField
                control={form.control}
                name="nativeLanguage"
                rules={{ required: "请选择您的母语" }}
                render={({ field }) => (
                  <FormItem>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        setShowCustomNativeLanguage(value === "other");
                      }} 
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-14 text-base bg-white/80 backdrop-blur-sm border-slate-200/60 hover:border-blue-300/60 focus:border-blue-500/60 transition-all duration-300 shadow-sm hover:shadow-md">
                          <SelectValue placeholder="请选择您的母语" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="backdrop-blur-lg bg-white/95 border-slate-200/60">
                        <SelectItem value="zh-CN" className="hover:bg-blue-50/80">中文（简体）</SelectItem>
                        <SelectItem value="zh-TW" className="hover:bg-blue-50/80">中文（繁体）</SelectItem>
                        <SelectItem value="en" className="hover:bg-blue-50/80">英语</SelectItem>
                        <SelectItem value="ja" className="hover:bg-blue-50/80">日语</SelectItem>
                        <SelectItem value="ko" className="hover:bg-blue-50/80">韩语</SelectItem>
                        <SelectItem value="fr" className="hover:bg-blue-50/80">法语</SelectItem>
                        <SelectItem value="de" className="hover:bg-blue-50/80">德语</SelectItem>
                        <SelectItem value="es" className="hover:bg-blue-50/80">西班牙语</SelectItem>
                        <SelectItem value="ru" className="hover:bg-blue-50/80">俄语</SelectItem>
                        <SelectItem value="other" className="hover:bg-blue-50/80">其他</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            
            <AnimatePresence>
              {showCustomNativeLanguage && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <FormField
                    control={form.control}
                    name="nativeLanguageCustom"
                    rules={{ required: "请输入您的母语" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            placeholder="请输入您的母语" 
                            className="h-14 text-base bg-white/80 backdrop-blur-sm border-slate-200/60 hover:border-blue-300/60 focus:border-blue-500/60 transition-all duration-300"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="question2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <motion.h2 
                className="text-3xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                您学习语言的主要原因是什么？
              </motion.h2>
              <motion.p 
                className="text-slate-600 leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                帮助我们了解您的学习目标
              </motion.p>
            </div>
            
            <FormField
              control={form.control}
              name="motivation"
              rules={{ required: "请选择您的学习动机" }}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        setShowCustomMotivation(value === "other");
                      }}
                      value={field.value}
                      className="space-y-4"
                    >
                      {[
                        { value: "work", label: "工作需要", desc: "商务沟通、职业发展", icon: "💼" },
                        { value: "interest", label: "兴趣爱好", desc: "文化探索、个人兴趣", icon: "🎨" },
                        { value: "travel", label: "旅游准备", desc: "旅行交流、自由行", icon: "✈️" },
                        { value: "immigration", label: "移民准备", desc: "定居国外、生活需要", icon: "🏠" },
                        { value: "academic", label: "学术研究", desc: "学术交流、论文阅读", icon: "📚" },
                        { value: "other", label: "其他原因", desc: "请详细说明", icon: "💭" },
                      ].map((option, index) => (
                        <motion.div 
                          key={option.value}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                          className={`group relative overflow-hidden backdrop-blur-sm bg-white/60 hover:bg-white/80 border border-slate-200/60 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-300/60 ${
                            field.value === option.value 
                              ? 'border-blue-500/80 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 shadow-lg shadow-blue-500/20' 
                              : ''
                          }`}
                          onClick={() => {
                            field.onChange(option.value);
                            setShowCustomMotivation(option.value === "other");
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-lg">
                                {option.icon}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-3">
                                <RadioGroupItem value={option.value} id={option.value} className="border-slate-400/60" />
                                <label htmlFor={option.value} className="cursor-pointer font-medium text-slate-800 group-hover:text-slate-900">
                                  {option.label}
                                </label>
                              </div>
                              <p className="text-slate-600 mt-2 leading-relaxed">{option.desc}</p>
                            </div>
                          </div>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0"
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <AnimatePresence>
              {showCustomMotivation && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <FormField
                    control={form.control}
                    name="motivationCustom"
                    rules={{ required: "请简要说明您的学习动机" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="请简要说明您的学习动机..." 
                            rows={3}
                            className="bg-white/80 backdrop-blur-sm border-slate-200/60 hover:border-blue-300/60 focus:border-blue-500/60 transition-all duration-300 resize-none"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="question3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <motion.h2 
                className="text-3xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                您每周能投入多少时间学习？
              </motion.h2>
              <motion.p 
                className="text-slate-600 leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                我们将根据您的时间安排学习计划
              </motion.p>
            </div>
            
            <FormField
              control={form.control}
              name="timeCommitment"
              rules={{ required: "请选择您的时间投入" }}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="space-y-4"
                    >
                      {[
                        { value: "1-3hours", label: "1-3小时", desc: "轻松入门，适合忙碌的日程", color: "from-green-400 to-emerald-500", icon: "🌱" },
                        { value: "3-5hours", label: "3-5小时", desc: "稳步提升，平衡学习与生活", color: "from-blue-400 to-blue-500", icon: "⚖️" },
                        { value: "5-10hours", label: "5-10小时", desc: "快速进步，集中精力学习", color: "from-orange-400 to-orange-500", icon: "🚀" },
                        { value: "10+hours", label: "10小时以上", desc: "密集学习，快速掌握", color: "from-red-400 to-red-500", icon: "🔥" },
                      ].map((option, index) => (
                        <motion.div 
                          key={option.value}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                          className={`group relative overflow-hidden backdrop-blur-sm bg-white/60 hover:bg-white/80 border border-slate-200/60 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-300/60 ${
                            field.value === option.value 
                              ? 'border-blue-500/80 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 shadow-lg shadow-blue-500/20' 
                              : ''
                          }`}
                          onClick={() => field.onChange(option.value)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 mt-1">
                              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center text-lg shadow-sm`}>
                                {option.icon}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-3">
                                <RadioGroupItem value={option.value} id={option.value} className="border-slate-400/60" />
                                <label htmlFor={option.value} className="cursor-pointer font-medium text-slate-800 group-hover:text-slate-900">
                                  {option.label}
                                </label>
                              </div>
                              <p className="text-slate-600 mt-2 leading-relaxed">{option.desc}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="question4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <motion.h2 
                className="text-3xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                您的语言学习经验如何？
              </motion.h2>
              <motion.p 
                className="text-slate-600 leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                帮助我们选择合适的学习起点
              </motion.p>
            </div>
            
            <FormField
              control={form.control}
              name="experience"
              rules={{ required: "请选择您的学习经验" }}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="space-y-4"
                    >
                      {[
                        { value: "beginner", label: "完全新手", desc: "只会母语，初次接触外语学习", icon: "🌟", level: "初级" },
                        { value: "intermediate", label: "有一定经验", desc: "学过1-2门外语，有基础了解", icon: "📈", level: "中级" },
                        { value: "experienced", label: "经验丰富", desc: "学过3门以上外语，熟悉学习方法", icon: "🏆", level: "高级" },
                      ].map((option, index) => (
                        <motion.div 
                          key={option.value}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                          className={`group relative overflow-hidden backdrop-blur-sm bg-white/60 hover:bg-white/80 border border-slate-200/60 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-300/60 ${
                            field.value === option.value 
                              ? 'border-blue-500/80 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 shadow-lg shadow-blue-500/20' 
                              : ''
                          }`}
                          onClick={() => field.onChange(option.value)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center text-lg">
                                {option.icon}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-3">
                                <RadioGroupItem value={option.value} id={option.value} className="border-slate-400/60" />
                                <div className="flex items-center space-x-2">
                                  <label htmlFor={option.value} className="cursor-pointer font-medium text-slate-800 group-hover:text-slate-900">
                                    {option.label}
                                  </label>
                                  <span className="px-2 py-1 text-xs bg-gradient-to-r from-slate-100 to-slate-200 text-slate-600 rounded-full">
                                    {option.level}
                                  </span>
                                </div>
                              </div>
                              <p className="text-slate-600 mt-2 leading-relaxed">{option.desc}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="question5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <motion.h2 
                className="text-3xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                您对哪些文化感兴趣？
              </motion.h2>
              <motion.p 
                className="text-slate-600 leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                可多选，帮助我们推荐相关语言（可跳过）
              </motion.p>
            </div>
            
            <FormField
              control={form.control}
              name="culturalInterests"
              render={() => (
                <FormItem>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {culturalOptions.map((option, index) => {
                      const icons = {
                        "east-asia": "🏮",
                        "southeast-asia": "🌺",
                        "europe": "🏰",
                        "north-america": "🗽",
                        "south-america": "🌎",
                        "middle-east": "🕌",
                        "africa": "🦁",
                        "oceania": "🏄‍♂️"
                      };
                      
                      return (
                        <FormField
                          key={option.value}
                          control={form.control}
                          name="culturalInterests"
                          render={({ field }) => {
                            const isSelected = field.value?.includes(option.value);
                            return (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                                className={`group relative overflow-hidden backdrop-blur-sm border rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-md hover:shadow-blue-500/10 ${
                                  isSelected 
                                    ? 'border-blue-500/80 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 shadow-lg shadow-blue-500/20' 
                                    : 'border-slate-200/60 bg-white/60 hover:bg-white/80 hover:border-blue-300/60'
                                }`}
                                onClick={() => {
                                  const newValue = isSelected
                                    ? field.value?.filter(value => value !== option.value)
                                    : [...(field.value || []), option.value];
                                  field.onChange(newValue);
                                }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="flex-shrink-0">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-sm">
                                      {icons[option.value] || "🌍"}
                                    </div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2">
                                      <FormControl>
                                        <Checkbox
                                          checked={isSelected}
                                          onChange={() => {}}
                                          className="border-slate-400/60"
                                        />
                                      </FormControl>
                                      <FormLabel className="cursor-pointer text-slate-800 group-hover:text-slate-900">
                                        {option.label}
                                      </FormLabel>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )
                          }}
                        />
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  const handleReset = () => {
    form.reset();
    setShowCustomNativeLanguage(false);
    setShowCustomMotivation(false);
    localStorage.removeItem('surveyData');
    onReset();
    toast.info("表单已重置");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="min-h-[500px] flex flex-col">
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {renderQuestion()}
          </AnimatePresence>
        </div>

        {/* 精致的导航按钮 */}
        <motion.div 
          className="flex justify-between items-center pt-12 mt-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              type="button" 
              variant="ghost" 
              onClick={currentStep === 1 ? onBack : handlePrevious}
              className="flex items-center gap-2 h-12 px-6 bg-white/60 backdrop-blur-sm border border-slate-200/60 hover:bg-white/80 hover:border-slate-300/60 text-slate-700 hover:text-slate-900 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <ArrowLeft className="h-4 w-4" />
              {currentStep === 1 ? "返回首页" : "上一步"}
            </Button>
          </motion.div>

          <div className="flex gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleReset}
                className="h-12 px-6 bg-white/60 backdrop-blur-sm border border-slate-200/60 hover:bg-white/80 hover:border-red-300/60 text-slate-700 hover:text-red-700 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                重置
              </Button>
            </motion.div>
            
            {currentStep < totalSteps ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  type="button" 
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-400 text-white transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none border-0"
                >
                  下一步
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex items-center gap-2 h-12 px-8 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 disabled:from-slate-300 disabled:to-slate-400 text-white transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none border-0"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      提交中...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      完成问卷
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </form>
    </Form>
  );
}
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form@7.55.0";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner@2.0.3";
import { QuestionCard } from "./QuestionCard";
import { SelectOption } from "./SelectOption";
import { NavigationButtons } from "./NavigationButtons";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface SurveyFormData {
  nativeLanguage: string;
  nativeLanguageCustom?: string;
  motivation: string;
  motivationCustom?: string;
  timeCommitment: string;
  experience: string;
  culturalInterests: string[];
}

interface ModernSurveyFormProps {
  onSubmit: (data: SurveyFormData) => void;
  onReset: () => void;
  onBack: () => void;
  currentStep: number;
  onStepChange: (step: number) => void;
}

export function ModernSurveyForm({ 
  onSubmit, 
  onReset, 
  onBack, 
  currentStep, 
  onStepChange 
}: ModernSurveyFormProps) {
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

  // Auto-save to localStorage
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem('surveyData', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Restore data
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
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const submitData = {
        ...data,
        timestamp: new Date().toISOString(),
      };
      
      onSubmit(submitData);
      toast.success("评估完成！正在为您生成个性化推荐...");
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
        isValid = true; // Cultural interests are optional
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

  const handleReset = () => {
    form.reset();
    setShowCustomNativeLanguage(false);
    setShowCustomMotivation(false);
    localStorage.removeItem('surveyData');
    onReset();
    toast.info("表单已重置");
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
        return true;
      default:
        return false;
    }
  };

  const motivationOptions = [
    { value: "work", label: "工作需要", desc: "商务沟通、职业发展", icon: "💼" },
    { value: "interest", label: "兴趣爱好", desc: "文化探索、个人兴趣", icon: "🎨" },
    { value: "travel", label: "旅游准备", desc: "旅行交流、自由行", icon: "✈️" },
    { value: "immigration", label: "移民准备", desc: "定居国外、生活需要", icon: "🏠" },
    { value: "academic", label: "学术研究", desc: "学术交流、论文阅读", icon: "📚" },
    { value: "other", label: "其他原因", desc: "请详细说明", icon: "💭" },
  ];

  const timeOptions = [
    { value: "1-3hours", label: "1-3小时/周", desc: "轻松入门，适合忙碌的日程", icon: "🌱" },
    { value: "3-5hours", label: "3-5小时/周", desc: "稳步提升，平衡学习与生活", icon: "⚖️" },
    { value: "5-10hours", label: "5-10小时/周", desc: "快速进步，集中精力学习", icon: "🚀" },
    { value: "10+hours", label: "10小时以上/周", desc: "密集学习，快速掌握", icon: "🔥" },
  ];

  const experienceOptions = [
    { value: "beginner", label: "完全新手", desc: "只会母语，初次接触外语学习", icon: "🌟" },
    { value: "intermediate", label: "有一定经验", desc: "学过1-2门外语，有基础了解", icon: "📈" },
    { value: "experienced", label: "经验丰富", desc: "学过3门以上外语，熟悉学习方法", icon: "🏆" },
  ];

  const culturalOptions = [
    { value: "east-asia", label: "东亚文化", icon: "🏮" },
    { value: "southeast-asia", label: "东南亚文化", icon: "🌺" },
    { value: "europe", label: "欧洲文化", icon: "🏰" },
    { value: "north-america", label: "北美文化", icon: "🗽" },
    { value: "south-america", label: "南美文化", icon: "🌎" },
    { value: "middle-east", label: "中东文化", icon: "🕌" },
    { value: "africa", label: "非洲文化", icon: "🦁" },
    { value: "oceania", label: "大洋洲文化", icon: "🏄‍♂️" },
  ];

  const renderQuestion = () => {
    switch (currentStep) {
      case 1:
        return (
          <QuestionCard
            title="您的母语是什么？"
            description="这将帮助我们为您推荐合适的学习方法"
            step={1}
            isRequired={true}
          >
            <Form {...form}>
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
                        <SelectTrigger className="h-14 text-base bg-white border-neutral-200 hover:border-indigo-300 focus:border-indigo-500 transition-all duration-200 rounded-xl">
                          <SelectValue placeholder="请选择您的母语" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white border-neutral-200 rounded-xl shadow-xl">
                        <SelectItem value="zh-CN" className="hover:bg-indigo-50">中文（简体）</SelectItem>
                        <SelectItem value="zh-TW" className="hover:bg-indigo-50">中文（繁体）</SelectItem>
                        <SelectItem value="en" className="hover:bg-indigo-50">英语</SelectItem>
                        <SelectItem value="ja" className="hover:bg-indigo-50">日语</SelectItem>
                        <SelectItem value="ko" className="hover:bg-indigo-50">韩语</SelectItem>
                        <SelectItem value="fr" className="hover:bg-indigo-50">法语</SelectItem>
                        <SelectItem value="de" className="hover:bg-indigo-50">德语</SelectItem>
                        <SelectItem value="es" className="hover:bg-indigo-50">西班牙语</SelectItem>
                        <SelectItem value="ru" className="hover:bg-indigo-50">俄语</SelectItem>
                        <SelectItem value="other" className="hover:bg-indigo-50">其他</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <AnimatePresence>
                {showCustomNativeLanguage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
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
                              className="h-14 text-base bg-white border-neutral-200 hover:border-indigo-300 focus:border-indigo-500 transition-all duration-200 rounded-xl"
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
            </Form>
          </QuestionCard>
        );

      case 2:
        return (
          <QuestionCard
            title="您学习语言的主要原因是什么？"
            description="帮助我们了解您的学习目标"
            step={2}
            isRequired={true}
          >
            <Form {...form}>
              <FormField
                control={form.control}
                name="motivation"
                rules={{ required: "请选择您的学习动机" }}
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-4">
                      {motivationOptions.map((option, index) => (
                        <SelectOption
                          key={option.value}
                          value={option.value}
                          label={option.label}
                          description={option.desc}
                          icon={option.icon}
                          isSelected={field.value === option.value}
                          onClick={(value) => {
                            field.onChange(value);
                            setShowCustomMotivation(value === "other");
                          }}
                          delay={index * 0.1}
                        />
                      ))}
                    </div>
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
                    transition={{ duration: 0.3 }}
                    className="mt-6"
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
                              className="bg-white border-neutral-200 hover:border-indigo-300 focus:border-indigo-500 transition-all duration-200 rounded-xl resize-none"
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
            </Form>
          </QuestionCard>
        );

      case 3:
        return (
          <QuestionCard
            title="您每周能投入多少时间学习？"
            description="我们将根据您的时间制定学习计划"
            step={3}
            isRequired={true}
          >
            <Form {...form}>
              <FormField
                control={form.control}
                name="timeCommitment"
                rules={{ required: "请选择您的时间投入" }}
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-4">
                      {timeOptions.map((option, index) => (
                        <SelectOption
                          key={option.value}
                          value={option.value}
                          label={option.label}
                          description={option.desc}
                          icon={option.icon}
                          isSelected={field.value === option.value}
                          onClick={field.onChange}
                          delay={index * 0.1}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>
          </QuestionCard>
        );

      case 4:
        return (
          <QuestionCard
            title="您的语言学习经验如何？"
            description="帮助我们选择合适的学习起点"
            step={4}
            isRequired={true}
          >
            <Form {...form}>
              <FormField
                control={form.control}
                name="experience"
                rules={{ required: "请选择您的学习经验" }}
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-4">
                      {experienceOptions.map((option, index) => (
                        <SelectOption
                          key={option.value}
                          value={option.value}
                          label={option.label}
                          description={option.desc}
                          icon={option.icon}
                          isSelected={field.value === option.value}
                          onClick={field.onChange}
                          delay={index * 0.1}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>
          </QuestionCard>
        );

      case 5:
        return (
          <QuestionCard
            title="您对哪些文化感兴趣？"
            description="可多选，帮助我们推荐相关语言"
            step={5}
            isRequired={false}
          >
            <Form {...form}>
              <FormField
                control={form.control}
                name="culturalInterests"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {culturalOptions.map((option, index) => {
                        const isSelected = field.value?.includes(option.value);
                        return (
                          <SelectOption
                            key={option.value}
                            value={option.value}
                            label={option.label}
                            icon={option.icon}
                            isSelected={isSelected}
                            onClick={(value) => {
                              const newValue = isSelected
                                ? field.value?.filter(v => v !== value)
                                : [...(field.value || []), value];
                              field.onChange(newValue);
                            }}
                            delay={index * 0.05}
                          />
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>
          </QuestionCard>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        {renderQuestion()}
      </AnimatePresence>

      <NavigationButtons
        currentStep={currentStep}
        totalSteps={totalSteps}
        canProceed={canProceed()}
        isSubmitting={isSubmitting}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onReset={handleReset}
        onBack={onBack}
        onSubmit={() => form.handleSubmit(handleSubmit)()}
      />
    </div>
  );
}
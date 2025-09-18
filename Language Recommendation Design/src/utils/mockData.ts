import { UserProfile, LanguageRecommendation, DifficultyLevel } from '../types/recommendation';

// 模拟用户数据（来自问卷）
export const mockUserProfile: UserProfile = {
  nativeLanguage: '中文',
  motivation: 'work',
  timeCommitment: '3-5hours',
  experience: 'intermediate',
  culturalInterests: ['东亚', '欧洲'],
  learningType: '实用型',
  intensity: '中度',
  tags: ['商务导向', '职业发展', '多语言学习者']
};

// 语言难度数据
const difficultyLevels: Record<string, DifficultyLevel> = {
  easy: {
    stars: 2,
    label: '较容易',
    description: '与中文语言系谱相近，学习难度较低'
  },
  medium: {
    stars: 3,
    label: '中等难度',
    description: '需要一定时间掌握，但学习资源丰富'
  },
  hard: {
    stars: 4,
    label: '较困难',
    description: '语言体系差异较大，需要较长时间'
  },
  veryHard: {
    stars: 5,
    label: '困难',
    description: '语言结构复杂，需要专业指导'
  }
};

// 模拟推荐语言数据
export const mockRecommendations: LanguageRecommendation[] = [
  {
    id: 'japanese',
    name: '日语',
    nativeName: '日本語',
    flag: '🇯🇵',
    matchPercentage: 95,
    difficulty: difficultyLevels.medium,
    estimatedTime: '18个月达到日常交流水平',
    reasonTitle: '基于您的工作需求和东亚文化兴趣',
    reasonDescription: '日语在商务领域应用广泛，与中文有共同汉字基础，学习门槛相对较低。日本企业文化注重细节和礼仪，符合您的职业发展需求。',
    highlights: [
      { type: 'speakers', title: '全球使用人数', value: '1.25亿人' },
      { type: 'regions', title: '主要使用地区', value: '日本及海外日企' },
      { type: 'culture', title: '文化价值', value: '深厚的传统文化底蕴' }
    ],
    isPrimary: true
  },
  {
    id: 'korean',
    name: '韩语',
    nativeName: '한국어',
    flag: '🇰🇷',
    matchPercentage: 88,
    difficulty: difficultyLevels.medium,
    estimatedTime: '20个月达到日常交流水平',
    reasonTitle: '东亚文化圈优势明显',
    reasonDescription: '韩国在科技和娱乐产业领先，语言学习资源丰富，文化输出强劲。',
    highlights: [
      { type: 'speakers', title: '全球使用人数', value: '7700万人' },
      { type: 'regions', title: '主要使用地区', value: '韩国、朝鲜及韩企' },
      { type: 'culture', title: '文化价值', value: '现代流行文化影响力' }
    ]
  },
  {
    id: 'german',
    name: '德语',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    matchPercentage: 82,
    difficulty: difficultyLevels.hard,
    estimatedTime: '24个月达到日常交流水平',
    reasonTitle: '欧洲商务语言首选',
    reasonDescription: '德国是欧洲经济引擎，德语在工程、制造业领域应用广泛，职业发展机会丰富。',
    highlights: [
      { type: 'speakers', title: '全球使用人数', value: '1.3亿人' },
      { type: 'regions', title: '主要使用地区', value: '德国、奥地利、瑞士' },
      { type: 'culture', title: '文化价值', value: '理性严谨的文化传统' }
    ]
  },
  {
    id: 'spanish',
    name: '西班牙语',
    nativeName: 'Español',
    flag: '🇪🇸',
    matchPercentage: 78,
    difficulty: difficultyLevels.medium,
    estimatedTime: '22个月达到日常交流水平',
    reasonTitle: '全球第二大母语',
    reasonDescription: '使用范围广泛，学习资源丰富，在国际商务中应用广泛。',
    highlights: [
      { type: 'speakers', title: '全球使用人数', value: '5亿人' },
      { type: 'regions', title: '主要使用地区', value: '21个国家官方语言' },
      { type: 'culture', title: '文化价值', value: '丰富多彩的拉丁文化' }
    ]
  }
];

// 推荐算法权重计算
export const calculateMatchScore = (
  userProfile: UserProfile,
  language: LanguageRecommendation
): number => {
  const weights = {
    difficulty: 0.3,
    motivation: 0.25,
    culture: 0.25,
    time: 0.2
  };

  // 简化的匹配度计算逻辑
  const difficultyScore = getDifficultyScore(userProfile.experience, language.difficulty.stars);
  const motivationScore = getMotivationScore(userProfile.motivation, language.id);
  const cultureScore = getCultureScore(userProfile.culturalInterests, language.id);
  const timeScore = getTimeScore(userProfile.timeCommitment, language.estimatedTime);

  return Math.round(
    difficultyScore * weights.difficulty +
    motivationScore * weights.motivation +
    cultureScore * weights.culture +
    timeScore * weights.time
  );
};

function getDifficultyScore(experience: string, difficultyStars: number): number {
  const experienceMultiplier = {
    'beginner': 0.7,
    'intermediate': 1.0,
    'experienced': 1.3
  };

  const baseDifficultyScore = Math.max(0, 100 - (difficultyStars - 1) * 15);
  return baseDifficultyScore * (experienceMultiplier[experience as keyof typeof experienceMultiplier] || 1);
}

function getMotivationScore(motivation: string, languageId: string): number {
  const motivationMap: Record<string, Record<string, number>> = {
    'work': {
      'japanese': 95,
      'german': 90,
      'korean': 85,
      'spanish': 80
    },
    'travel': {
      'spanish': 95,
      'japanese': 85,
      'german': 75,
      'korean': 70
    }
  };

  return motivationMap[motivation]?.[languageId] || 70;
}

function getCultureScore(interests: string[], languageId: string): number {
  const cultureMap: Record<string, string[]> = {
    'japanese': ['东亚'],
    'korean': ['东亚'],
    'german': ['欧洲'],
    'spanish': ['欧洲', '拉美']
  };

  const languageCultures = cultureMap[languageId] || [];
  const matchCount = interests.filter(interest =>
    languageCultures.some(culture => culture.includes(interest))
  ).length;

  return Math.min(100, 60 + matchCount * 20);
}

function getTimeScore(timeCommitment: string, estimatedTime: string): number {
  // 简化的时间匹配评分
  const timeMap: Record<string, number> = {
    '1-3hours': 70,
    '3-5hours': 85,
    '5-10hours': 95,
    '10+hours': 100
  };

  return timeMap[timeCommitment] || 80;
}
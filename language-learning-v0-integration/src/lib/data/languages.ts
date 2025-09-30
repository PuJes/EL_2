import type { Language } from '@/types'

export const languages: Language[] = [
  {
    id: "spanish",
    code: "es",
    name: "西班牙语",
    nameEn: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    description: "世界第二大母语，职场和旅游热门选择",
    category: "popular",
    difficulty: 2,
    speakers: {
      total: 500000000,
      native: 460000000,
      countries: ["西班牙", "墨西哥", "阿根廷", "哥伦比亚", "秘鲁", "委内瑞拉", "智利", "厄瓜多尔", "危地马拉", "古巴"]
    },
    regions: ["欧洲", "北美洲", "南美洲", "中美洲"],
    family: "印欧语系",
    script: "拉丁字母",
    tags: ["拉丁语族", "职场热门", "旅游实用"],
    studyTime: "8个月",
    usage: ["旅游", "商务", "文化"],
    resources: ["影视资源", "音乐文化", "语言交换"],
    difficultyAnalysis: {
      grammar: 3,
      pronunciation: 2,
      writing: 2,
      vocabulary: 2
    },
    learningTimeEstimate: {
      beginner: "3-6个月",
      intermediate: "1-2年",
      advanced: "2-3年",
      totalHours: 600,
      basic: 150,
      intermediate: 300,
      advanced: 450
    }
  },
  {
    id: "french",
    code: "fr",
    name: "法语",
    nameEn: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    description: "优雅的语言，艺术和时尚的象征",
    category: "cultural",
    difficulty: 3,
    speakers: {
      total: 280000000,
      native: 76000000,
      countries: ["法国", "加拿大", "瑞士", "比利时", "摩纳哥", "卢森堡", "塞内加尔", "马达加斯加"]
    },
    regions: ["欧洲", "北美洲", "非洲", "大洋洲"],
    family: "印欧语系",
    script: "拉丁字母",
    tags: ["浪漫语族", "艺术文化", "外交语言"],
    studyTime: "12个月",
    usage: ["文化", "旅游", "外交"],
    resources: ["文学作品", "电影资源", "语言学校"],
    difficultyAnalysis: {
      grammar: 4,
      pronunciation: 4,
      writing: 3,
      vocabulary: 3
    },
    learningTimeEstimate: {
      beginner: "4-8个月",
      intermediate: "1.5-2.5年",
      advanced: "3-4年",
      totalHours: 750,
      basic: 200,
      intermediate: 400,
      advanced: 700
    }
  },
  {
    id: "japanese",
    code: "ja",
    name: "日语",
    nameEn: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    description: "动漫文化和先进科技的语言",
    category: "cultural",
    difficulty: 4,
    speakers: {
      total: 125000000,
      native: 122000000,
      countries: ["日本"]
    },
    regions: ["东亚"],
    family: "日语族",
    script: "假名+汉字",
    tags: ["东亚文化", "动漫游戏", "科技创新"],
    studyTime: "18个月",
    usage: ["文化", "商务", "娱乐"],
    resources: ["动漫资源", "文化体验", "在线课程"],
    difficultyAnalysis: {
      grammar: 5,
      pronunciation: 3,
      writing: 5,
      vocabulary: 5
    },
    learningTimeEstimate: {
      beginner: "8-12个月",
      intermediate: "2-3年",
      advanced: "4-5年",
      totalHours: 1200,
      basic: 600,
      intermediate: 1200,
      advanced: 2200
    },
    writingSystem: ["hiragana", "katakana", "kanji"]
  },
  {
    id: "german",
    code: "de",
    name: "德语",
    nameEn: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    description: "科学和工程的语言，欧洲商务重要语言",
    category: "business",
    difficulty: 3,
    speakers: {
      total: 132000000,
      native: 95000000,
      countries: ["德国", "奥地利", "瑞士", "列支敦士登", "卢森堡", "比利时"]
    },
    regions: ["欧洲"],
    family: "印欧语系",
    script: "拉丁字母",
    tags: ["日耳曼语族", "科学技术", "欧洲商务"],
    studyTime: "14个月",
    usage: ["学术", "商务", "技术"],
    resources: ["技术文档", "学术资源", "在线平台"],
    difficultyAnalysis: {
      grammar: 5,
      pronunciation: 3,
      writing: 3,
      vocabulary: 4
    },
    learningTimeEstimate: {
      beginner: "6-9个月",
      intermediate: "1.5-2年",
      advanced: "3-4年",
      totalHours: 900,
      basic: 300,
      intermediate: 600,
      advanced: 1200
    }
  },
  {
    id: "chinese",
    code: "zh",
    name: "中文",
    nameEn: "Chinese",
    nativeName: "中文",
    flag: "🇨🇳",
    description: "世界上使用人数最多的语言",
    category: "popular",
    difficulty: 5,
    speakers: {
      total: 1300000000,
      native: 918000000,
      countries: ["中国", "台湾", "新加坡", "马来西亚", "香港", "澳门"]
    },
    regions: ["东亚", "东南亚"],
    family: "汉藏语系",
    script: "汉字",
    tags: ["汉语族", "商务重要", "文化深厚"],
    studyTime: "24个月",
    usage: ["商务", "文化", "学术"],
    resources: ["汉语教材", "中文媒体", "文化交流"],
    difficultyAnalysis: {
      grammar: 4,
      pronunciation: 5,
      writing: 5,
      vocabulary: 5
    },
    learningTimeEstimate: {
      beginner: "12-18个月",
      intermediate: "3-4年",
      advanced: "5-6年",
      totalHours: 2200,
      basic: 600,
      intermediate: 1200,
      advanced: 2200
    },
    writingSystem: ["chinese"]
  },
  {
    id: "korean",
    code: "ko",
    name: "韩语",
    nameEn: "Korean",
    nativeName: "한국어",
    flag: "🇰🇷",
    description: "韩流文化的载体，科技产业重要语言",
    category: "cultural",
    difficulty: 4,
    speakers: {
      total: 77000000,
      native: 75000000,
      countries: ["韩国", "朝鲜"]
    },
    regions: ["东亚"],
    family: "朝鲜语族",
    script: "韩文",
    tags: ["东亚文化", "韩流", "科技"],
    studyTime: "16个月",
    usage: ["娱乐", "商务", "文化"],
    resources: ["K-pop资源", "韩剧学习", "在线课程"],
    difficultyAnalysis: {
      grammar: 4,
      pronunciation: 3,
      writing: 3,
      vocabulary: 4
    },
    learningTimeEstimate: {
      beginner: "6-10个月",
      intermediate: "2-3年",
      advanced: "3-4年",
      totalHours: 1100,
      basic: 500,
      intermediate: 1000,
      advanced: 1800
    }
  },
  {
    id: "italian",
    code: "it",
    name: "意大利语",
    nameEn: "Italian",
    nativeName: "Italiano",
    flag: "🇮🇹",
    description: "艺术、美食和设计的语言",
    category: "cultural",
    difficulty: 2,
    speakers: {
      total: 85000000,
      native: 65000000,
      countries: ["意大利", "瑞士", "圣马力诺", "梅尔泯特", "梅尔泯特"]
    },
    regions: ["欧洲"],
    family: "印欧语系",
    script: "拉丁字母",
    tags: ["浪漫语族", "艺术", "美食"],
    studyTime: "8个月",
    usage: ["文化", "旅游", "艺术"],
    resources: ["意大利电影", "音乐歌剧", "艺术史"],
    difficultyAnalysis: {
      grammar: 3,
      pronunciation: 2,
      writing: 2,
      vocabulary: 3
    },
    learningTimeEstimate: {
      beginner: "3-6个月",
      intermediate: "1-2年",
      advanced: "2-3年",
      totalHours: 600,
      basic: 150,
      intermediate: 300,
      advanced: 600
    }
  },
  {
    id: "portuguese",
    code: "pt",
    name: "葡萄牙语",
    nameEn: "Portuguese",
    nativeName: "Português",
    flag: "🇵🇹",
    description: "巴西和葡语国家的官方语言",
    category: "popular",
    difficulty: 2,
    speakers: {
      total: 260000000,
      native: 230000000,
      countries: ["巴西", "葡萄牙", "安哥拉", "莫桑比克", "东帝汶", "佛得角"]
    },
    regions: ["南美洲", "欧洲", "非洲"],
    family: "印欧语系",
    script: "拉丁字母",
    tags: ["浪漫语族", "南美", "商务"],
    studyTime: "9个月",
    usage: ["商务", "旅游", "文化"],
    resources: ["巴西文化", "葡语教材", "拉丁音乐"],
    difficultyAnalysis: {
      grammar: 3,
      pronunciation: 3,
      writing: 2,
      vocabulary: 3
    },
    learningTimeEstimate: {
      beginner: "4-7个月",
      intermediate: "1-2年",
      advanced: "2-3年",
      totalHours: 700,
      basic: 175,
      intermediate: 350,
      advanced: 700
    }
  },
  {
    id: "russian",
    code: "ru",
    name: "俄语",
    nameEn: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
    description: "东欧和中亚重要语言，科学文学语言",
    category: "emerging",
    difficulty: 5,
    speakers: {
      total: 260000000,
      native: 150000000,
      countries: ["俄罗斯", "白俄罗斯", "哈萨克斯坦", "吉尔吉斯斯坦", "乌克兰", "摩尔多瓦"]
    },
    regions: ["东欧", "中亚"],
    family: "印欧语系",
    script: "西里尔字母",
    tags: ["斯拉夫语族", "科学", "文学"],
    studyTime: "20个月",
    usage: ["学术", "科学", "文学"],
    resources: ["俄语文学", "科学文献", "俄语媒体"],
    difficultyAnalysis: {
      grammar: 5,
      pronunciation: 4,
      writing: 4,
      vocabulary: 5
    },
    learningTimeEstimate: {
      beginner: "10-15个月",
      intermediate: "2-3年",
      advanced: "4-5年",
      totalHours: 1800,
      basic: 500,
      intermediate: 1000,
      advanced: 1800
    }
  },
  {
    id: "arabic",
    code: "ar",
    name: "阿拉伯语",
    nameEn: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
    description: "中东和北非地区的重要语言",
    category: "emerging",
    difficulty: 5,
    speakers: {
      total: 422000000,
      native: 290000000,
      countries: ["沙特阿拉伯", "埃及", "伊拉克", "阿尔及利亚", "摩洛哥", "苏丹", "叙利亚", "也门"]
    },
    regions: ["中东", "北非"],
    family: "闪米特语族",
    script: "阿拉伯字母",
    tags: ["闪米特语族", "宗教", "中东"],
    studyTime: "30个月",
    usage: ["宗教", "商务", "学术"],
    resources: ["阿拉伯媒体", "宗教文献", "语言学院"],
    difficultyAnalysis: {
      grammar: 5,
      pronunciation: 4,
      writing: 5,
      vocabulary: 5
    },
    learningTimeEstimate: {
      beginner: "12-18个月",
      intermediate: "3-4年",
      advanced: "5-7年",
      totalHours: 2200,
      basic: 600,
      intermediate: 1200,
      advanced: 2200
    }
  }
]

export function getLanguageById(id: string): Language | undefined {
  return languages.find(lang => lang.id === id)
}

export function getLanguagesByDifficulty(difficulty: number): Language[] {
  return languages.filter(lang => lang.difficulty === difficulty)
}

export function getAllLanguages(): Language[] {
  return languages
}
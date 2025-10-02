import type { Language } from '@/types'

export const languages: Language[] = [
  {
    id: "spanish",
    code: "es",
    name: "西班牙语",
    nameEn: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    description: {
      zh: "世界第二大母语，职场和旅游热门选择",
      en: "World's second most spoken native language, popular for work and travel"
    },
    difficulty: 2,
    speakers: {
      total: 500000000,
      native: 460000000,
      countries: {
        zh: ["西班牙", "墨西哥", "阿根廷", "哥伦比亚", "秘鲁", "委内瑞拉", "智利", "厄瓜多尔", "危地马拉", "古巴"],
        en: ["Spain", "Mexico", "Argentina", "Colombia", "Peru", "Venezuela", "Chile", "Ecuador", "Guatemala", "Cuba"]
      }
    },
    regions: {
      zh: ["欧洲", "北美洲", "南美洲", "中美洲"],
      en: ["Europe", "North America", "South America", "Central America"]
    },
    family: {
      zh: "印欧语系",
      en: "Indo-European"
    },
    script: {
      zh: "拉丁字母",
      en: "Latin alphabet"
    },
    tags: {
      zh: ["拉丁语族", "职场热门", "旅游实用"],
      en: ["Romance languages", "Popular for careers", "Travel practical"]
    },
    studyTime: {
      zh: "8个月",
      en: "8 months"
    },
    usage: {
      zh: ["旅游", "商务", "文化"],
      en: ["Travel", "Business", "Culture"]
    },
    resources: {
      zh: ["影视资源", "音乐文化", "语言交换"],
      en: ["Film & TV resources", "Music culture", "Language exchange"]
    },
    difficultyAnalysis: {
      grammar: 3,
      pronunciation: 2,
      writing: 2,
      vocabulary: 2
    },
    learningTimeEstimate: {
      beginner: {
        zh: "3-6个月",
        en: "3-6 months"
      },
      intermediate: {
        zh: "1-2年",
        en: "1-2 years"
      },
      advanced: {
        zh: "2-3年",
        en: "2-3 years"
      },
      totalHours: 600,
      basic: 150,
      intermediateHours: 300,
      advancedHours: 450
    }
  },
  {
    id: "french",
    code: "fr",
    name: "法语",
    nameEn: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    description: {
      zh: "优雅的语言，艺术和时尚的象征",
      en: "Elegant language, symbol of art and fashion"
    },
    difficulty: 3,
    speakers: {
      total: 280000000,
      native: 76000000,
      countries: {
        zh: ["法国", "加拿大", "瑞士", "比利时", "摩纳哥", "卢森堡", "塞内加尔", "马达加斯加"],
        en: ["France", "Canada", "Switzerland", "Belgium", "Monaco", "Luxembourg", "Senegal", "Madagascar"]
      }
    },
    regions: {
      zh: ["欧洲", "北美洲", "非洲", "大洋洲"],
      en: ["Europe", "North America", "Africa", "Oceania"]
    },
    family: {
      zh: "印欧语系",
      en: "Indo-European"
    },
    script: {
      zh: "拉丁字母",
      en: "Latin alphabet"
    },
    tags: {
      zh: ["浪漫语族", "艺术文化", "外交语言"],
      en: ["Romance languages", "Art & culture", "Diplomatic language"]
    },
    studyTime: {
      zh: "12个月",
      en: "12 months"
    },
    usage: {
      zh: ["文化", "旅游", "外交"],
      en: ["Culture", "Travel", "Diplomacy"]
    },
    resources: {
      zh: ["文学作品", "电影资源", "语言学校"],
      en: ["Literary works", "Film resources", "Language schools"]
    },
    difficultyAnalysis: {
      grammar: 4,
      pronunciation: 4,
      writing: 3,
      vocabulary: 3
    },
    learningTimeEstimate: {
      beginner: {
        zh: "4-8个月",
        en: "4-8 months"
      },
      intermediate: {
        zh: "1.5-2.5年",
        en: "1.5-2.5 years"
      },
      advanced: {
        zh: "3-4年",
        en: "3-4 years"
      },
      totalHours: 750,
      basic: 200,
      intermediateHours: 400,
      advancedHours: 700
    }
  },
  {
    id: "japanese",
    code: "ja",
    name: "日语",
    nameEn: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    description: {
      zh: "动漫文化和先进科技的语言",
      en: "Language of anime culture and advanced technology"
    },
    difficulty: 4,
    speakers: {
      total: 125000000,
      native: 122000000,
      countries: {
        zh: ["日本"],
        en: ["Japan"]
      }
    },
    regions: {
      zh: ["东亚"],
      en: ["East Asia"]
    },
    family: {
      zh: "日语族",
      en: "Japonic"
    },
    script: {
      zh: "假名+汉字",
      en: "Kana + Kanji"
    },
    tags: {
      zh: ["东亚文化", "动漫游戏", "科技创新"],
      en: ["East Asian culture", "Anime & games", "Tech innovation"]
    },
    studyTime: {
      zh: "18个月",
      en: "18 months"
    },
    usage: {
      zh: ["文化", "商务", "娱乐"],
      en: ["Culture", "Business", "Entertainment"]
    },
    resources: {
      zh: ["动漫资源", "文化体验", "在线课程"],
      en: ["Anime resources", "Cultural immersion", "Online courses"]
    },
    difficultyAnalysis: {
      grammar: 5,
      pronunciation: 3,
      writing: 5,
      vocabulary: 5
    },
    learningTimeEstimate: {
      beginner: {
        zh: "8-12个月",
        en: "8-12 months"
      },
      intermediate: {
        zh: "2-3年",
        en: "2-3 years"
      },
      advanced: {
        zh: "4-5年",
        en: "4-5 years"
      },
      totalHours: 1200,
      basic: 600,
      intermediateHours: 1200,
      advancedHours: 2200
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
    description: {
      zh: "科学和工程的语言，欧洲商务重要语言",
      en: "Language of science and engineering, key European business language"
    },
    difficulty: 3,
    speakers: {
      total: 132000000,
      native: 95000000,
      countries: {
        zh: ["德国", "奥地利", "瑞士", "列支敦士登", "卢森堡", "比利时"],
        en: ["Germany", "Austria", "Switzerland", "Liechtenstein", "Luxembourg", "Belgium"]
      }
    },
    regions: {
      zh: ["欧洲"],
      en: ["Europe"]
    },
    family: {
      zh: "印欧语系",
      en: "Indo-European"
    },
    script: {
      zh: "拉丁字母",
      en: "Latin alphabet"
    },
    tags: {
      zh: ["日耳曼语族", "科学技术", "欧洲商务"],
      en: ["Germanic languages", "Science & technology", "European business"]
    },
    studyTime: {
      zh: "14个月",
      en: "14 months"
    },
    usage: {
      zh: ["学术", "商务", "技术"],
      en: ["Academic", "Business", "Technology"]
    },
    resources: {
      zh: ["技术文档", "学术资源", "在线平台"],
      en: ["Technical documentation", "Academic resources", "Online platforms"]
    },
    difficultyAnalysis: {
      grammar: 5,
      pronunciation: 3,
      writing: 3,
      vocabulary: 4
    },
    learningTimeEstimate: {
      beginner: {
        zh: "6-9个月",
        en: "6-9 months"
      },
      intermediate: {
        zh: "1.5-2年",
        en: "1.5-2 years"
      },
      advanced: {
        zh: "3-4年",
        en: "3-4 years"
      },
      totalHours: 900,
      basic: 300,
      intermediateHours: 600,
      advancedHours: 1200
    }
  },
  {
    id: "chinese",
    code: "zh",
    name: "中文",
    nameEn: "Chinese",
    nativeName: "中文",
    flag: "🇨🇳",
    description: {
      zh: "世界上使用人数最多的语言",
      en: "World's most spoken language by number of speakers"
    },
    difficulty: 5,
    speakers: {
      total: 1300000000,
      native: 918000000,
      countries: {
        zh: ["中国", "台湾", "新加坡", "马来西亚", "香港", "澳门"],
        en: ["China", "Taiwan", "Singapore", "Malaysia", "Hong Kong", "Macau"]
      }
    },
    regions: {
      zh: ["东亚", "东南亚"],
      en: ["East Asia", "Southeast Asia"]
    },
    family: {
      zh: "汉藏语系",
      en: "Sino-Tibetan"
    },
    script: {
      zh: "汉字",
      en: "Chinese characters"
    },
    tags: {
      zh: ["汉语族", "商务重要", "文化深厚"],
      en: ["Sinitic languages", "Business essential", "Rich culture"]
    },
    studyTime: {
      zh: "24个月",
      en: "24 months"
    },
    usage: {
      zh: ["商务", "文化", "学术"],
      en: ["Business", "Culture", "Academic"]
    },
    resources: {
      zh: ["汉语教材", "中文媒体", "文化交流"],
      en: ["Chinese textbooks", "Chinese media", "Cultural exchange"]
    },
    difficultyAnalysis: {
      grammar: 4,
      pronunciation: 5,
      writing: 5,
      vocabulary: 5
    },
    learningTimeEstimate: {
      beginner: {
        zh: "12-18个月",
        en: "12-18 months"
      },
      intermediate: {
        zh: "3-4年",
        en: "3-4 years"
      },
      advanced: {
        zh: "5-6年",
        en: "5-6 years"
      },
      totalHours: 2200,
      basic: 600,
      intermediateHours: 1200,
      advancedHours: 2200
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
    description: {
      zh: "韩流文化的载体，科技产业重要语言",
      en: "Vehicle of Korean Wave culture, key language for tech industry"
    },
    difficulty: 4,
    speakers: {
      total: 77000000,
      native: 75000000,
      countries: {
        zh: ["韩国", "朝鲜"],
        en: ["South Korea", "North Korea"]
      }
    },
    regions: {
      zh: ["东亚"],
      en: ["East Asia"]
    },
    family: {
      zh: "朝鲜语族",
      en: "Koreanic"
    },
    script: {
      zh: "韩文",
      en: "Hangul"
    },
    tags: {
      zh: ["东亚文化", "韩流", "科技"],
      en: ["East Asian culture", "Korean Wave", "Technology"]
    },
    studyTime: {
      zh: "16个月",
      en: "16 months"
    },
    usage: {
      zh: ["娱乐", "商务", "文化"],
      en: ["Entertainment", "Business", "Culture"]
    },
    resources: {
      zh: ["K-pop资源", "韩剧学习", "在线课程"],
      en: ["K-pop resources", "K-drama learning", "Online courses"]
    },
    difficultyAnalysis: {
      grammar: 4,
      pronunciation: 3,
      writing: 3,
      vocabulary: 4
    },
    learningTimeEstimate: {
      beginner: {
        zh: "6-10个月",
        en: "6-10 months"
      },
      intermediate: {
        zh: "2-3年",
        en: "2-3 years"
      },
      advanced: {
        zh: "3-4年",
        en: "3-4 years"
      },
      totalHours: 1100,
      basic: 500,
      intermediateHours: 1000,
      advancedHours: 1800
    }
  },
  {
    id: "italian",
    code: "it",
    name: "意大利语",
    nameEn: "Italian",
    nativeName: "Italiano",
    flag: "🇮🇹",
    description: {
      zh: "艺术、美食和设计的语言",
      en: "Language of art, cuisine and design"
    },
    difficulty: 2,
    speakers: {
      total: 85000000,
      native: 65000000,
      countries: {
        zh: ["意大利", "瑞士", "圣马力诺", "梵蒂冈"],
        en: ["Italy", "Switzerland", "San Marino", "Vatican City"]
      }
    },
    regions: {
      zh: ["欧洲"],
      en: ["Europe"]
    },
    family: {
      zh: "印欧语系",
      en: "Indo-European"
    },
    script: {
      zh: "拉丁字母",
      en: "Latin alphabet"
    },
    tags: {
      zh: ["浪漫语族", "艺术", "美食"],
      en: ["Romance languages", "Art", "Cuisine"]
    },
    studyTime: {
      zh: "8个月",
      en: "8 months"
    },
    usage: {
      zh: ["文化", "旅游", "艺术"],
      en: ["Culture", "Travel", "Art"]
    },
    resources: {
      zh: ["意大利电影", "音乐歌剧", "艺术史"],
      en: ["Italian cinema", "Music & opera", "Art history"]
    },
    difficultyAnalysis: {
      grammar: 3,
      pronunciation: 2,
      writing: 2,
      vocabulary: 3
    },
    learningTimeEstimate: {
      beginner: {
        zh: "3-6个月",
        en: "3-6 months"
      },
      intermediate: {
        zh: "1-2年",
        en: "1-2 years"
      },
      advanced: {
        zh: "2-3年",
        en: "2-3 years"
      },
      totalHours: 600,
      basic: 150,
      intermediateHours: 300,
      advancedHours: 600
    }
  },
  {
    id: "portuguese",
    code: "pt",
    name: "葡萄牙语",
    nameEn: "Portuguese",
    nativeName: "Português",
    flag: "🇵🇹",
    description: {
      zh: "巴西和葡语国家的官方语言",
      en: "Official language of Brazil and Portuguese-speaking countries"
    },
    difficulty: 2,
    speakers: {
      total: 260000000,
      native: 230000000,
      countries: {
        zh: ["巴西", "葡萄牙", "安哥拉", "莫桑比克", "东帝汶", "佛得角"],
        en: ["Brazil", "Portugal", "Angola", "Mozambique", "East Timor", "Cape Verde"]
      }
    },
    regions: {
      zh: ["南美洲", "欧洲", "非洲"],
      en: ["South America", "Europe", "Africa"]
    },
    family: {
      zh: "印欧语系",
      en: "Indo-European"
    },
    script: {
      zh: "拉丁字母",
      en: "Latin alphabet"
    },
    tags: {
      zh: ["浪漫语族", "南美", "商务"],
      en: ["Romance languages", "South America", "Business"]
    },
    studyTime: {
      zh: "9个月",
      en: "9 months"
    },
    usage: {
      zh: ["商务", "旅游", "文化"],
      en: ["Business", "Travel", "Culture"]
    },
    resources: {
      zh: ["巴西文化", "葡语教材", "拉丁音乐"],
      en: ["Brazilian culture", "Portuguese textbooks", "Latin music"]
    },
    difficultyAnalysis: {
      grammar: 3,
      pronunciation: 3,
      writing: 2,
      vocabulary: 3
    },
    learningTimeEstimate: {
      beginner: {
        zh: "4-7个月",
        en: "4-7 months"
      },
      intermediate: {
        zh: "1-2年",
        en: "1-2 years"
      },
      advanced: {
        zh: "2-3年",
        en: "2-3 years"
      },
      totalHours: 700,
      basic: 175,
      intermediateHours: 350,
      advancedHours: 700
    }
  },
  {
    id: "russian",
    code: "ru",
    name: "俄语",
    nameEn: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
    description: {
      zh: "东欧和中亚重要语言，科学文学语言",
      en: "Key language of Eastern Europe and Central Asia, language of science and literature"
    },
    difficulty: 5,
    speakers: {
      total: 260000000,
      native: 150000000,
      countries: {
        zh: ["俄罗斯", "白俄罗斯", "哈萨克斯坦", "吉尔吉斯斯坦", "乌克兰", "摩尔多瓦"],
        en: ["Russia", "Belarus", "Kazakhstan", "Kyrgyzstan", "Ukraine", "Moldova"]
      }
    },
    regions: {
      zh: ["东欧", "中亚"],
      en: ["Eastern Europe", "Central Asia"]
    },
    family: {
      zh: "印欧语系",
      en: "Indo-European"
    },
    script: {
      zh: "西里尔字母",
      en: "Cyrillic alphabet"
    },
    tags: {
      zh: ["斯拉夫语族", "科学", "文学"],
      en: ["Slavic languages", "Science", "Literature"]
    },
    studyTime: {
      zh: "20个月",
      en: "20 months"
    },
    usage: {
      zh: ["学术", "科学", "文学"],
      en: ["Academic", "Science", "Literature"]
    },
    resources: {
      zh: ["俄语文学", "科学文献", "俄语媒体"],
      en: ["Russian literature", "Scientific publications", "Russian media"]
    },
    difficultyAnalysis: {
      grammar: 5,
      pronunciation: 4,
      writing: 4,
      vocabulary: 5
    },
    learningTimeEstimate: {
      beginner: {
        zh: "10-15个月",
        en: "10-15 months"
      },
      intermediate: {
        zh: "2-3年",
        en: "2-3 years"
      },
      advanced: {
        zh: "4-5年",
        en: "4-5 years"
      },
      totalHours: 1800,
      basic: 500,
      intermediateHours: 1000,
      advancedHours: 1800
    }
  },
  {
    id: "arabic",
    code: "ar",
    name: "阿拉伯语",
    nameEn: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
    description: {
      zh: "中东和北非地区的重要语言",
      en: "Key language of the Middle East and North Africa"
    },
    difficulty: 5,
    speakers: {
      total: 422000000,
      native: 290000000,
      countries: {
        zh: ["沙特阿拉伯", "埃及", "伊拉克", "阿尔及利亚", "摩洛哥", "苏丹", "叙利亚", "也门"],
        en: ["Saudi Arabia", "Egypt", "Iraq", "Algeria", "Morocco", "Sudan", "Syria", "Yemen"]
      }
    },
    regions: {
      zh: ["中东", "北非"],
      en: ["Middle East", "North Africa"]
    },
    family: {
      zh: "闪米特语族",
      en: "Semitic"
    },
    script: {
      zh: "阿拉伯字母",
      en: "Arabic alphabet"
    },
    tags: {
      zh: ["闪米特语族", "宗教", "中东"],
      en: ["Semitic languages", "Religion", "Middle East"]
    },
    studyTime: {
      zh: "30个月",
      en: "30 months"
    },
    usage: {
      zh: ["宗教", "商务", "学术"],
      en: ["Religion", "Business", "Academic"]
    },
    resources: {
      zh: ["阿拉伯媒体", "宗教文献", "语言学院"],
      en: ["Arabic media", "Religious texts", "Language institutes"]
    },
    difficultyAnalysis: {
      grammar: 5,
      pronunciation: 4,
      writing: 5,
      vocabulary: 5
    },
    learningTimeEstimate: {
      beginner: {
        zh: "12-18个月",
        en: "12-18 months"
      },
      intermediate: {
        zh: "3-4年",
        en: "3-4 years"
      },
      advanced: {
        zh: "5-7年",
        en: "5-7 years"
      },
      totalHours: 2200,
      basic: 600,
      intermediateHours: 1200,
      advancedHours: 2200
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
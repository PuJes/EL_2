import type { Language } from '../types/language'

export const languages: Language[] = [
  {
    id: "spanish",
    name: "西班牙语",
    nativeName: "Español",
    flag: "🇪🇸",
    description: "世界第二大母语，职场和旅游热门选择",
    difficulty: 2,
    speakers: { total: 500000000, native: 460000000, secondary: 40000000 },
    tags: ["拉丁语族", "职场热门", "旅游实用"],
    family: "印欧语系",
    script: "拉丁字母",
    regions: ["西班牙", "拉丁美洲", "美国"],
    difficultyAnalysis: {
      grammar: 2.5,
      pronunciation: 2.0,
      writing: 2.0,
      vocabulary: 2.2
    },
    learningTimeEstimate: {
      totalHours: 600,
      basic: 150,
      intermediate: 300,
      advanced: 450
    }
  },
  {
    id: "french",
    name: "法语",
    nativeName: "Français",
    flag: "🇫🇷",
    description: "优雅的语言，艺术和时尚的象征",
    difficulty: 3,
    speakers: { total: 280000000, native: 76000000, secondary: 204000000 },
    tags: ["浪漫语族", "艺术文化", "外交语言"],
    family: "印欧语系",
    script: "拉丁字母",
    regions: ["法国", "加拿大", "非洲法语区"],
    difficultyAnalysis: {
      grammar: 3.5,
      pronunciation: 3.8,
      writing: 3.0,
      vocabulary: 2.8
    },
    learningTimeEstimate: {
      totalHours: 900,
      basic: 200,
      intermediate: 400,
      advanced: 700
    }
  },
  {
    id: "japanese",
    name: "日语",
    nativeName: "日本語",
    flag: "🇯🇵",
    description: "动漫文化和先进科技的语言",
    difficulty: 5,
    speakers: { total: 125000000, native: 122000000, secondary: 3000000 },
    tags: ["东亚文化", "动漫游戏", "科技创新"],
    family: "日语族",
    script: "假名+汉字",
    regions: ["日本"],
    difficultyAnalysis: {
      grammar: 4.5,
      pronunciation: 3.8,
      writing: 5.0,
      vocabulary: 5.0
    },
    learningTimeEstimate: {
      totalHours: 2200,
      basic: 600,
      intermediate: 1200,
      advanced: 2200
    },
    writingSystem: ["hiragana", "katakana", "kanji"]
  },
  {
    id: "german",
    name: "德语",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    description: "科学和工程的语言，欧洲商务重要语言",
    difficulty: 4,
    speakers: { total: 132000000, native: 95000000, secondary: 37000000 },
    tags: ["日耳曼语族", "科学技术", "欧洲商务"],
    family: "印欧语系",
    script: "拉丁字母",
    regions: ["德国", "奥地利", "瑞士"],
    difficultyAnalysis: {
      grammar: 5.0,
      pronunciation: 3.0,
      writing: 3.0,
      vocabulary: 3.5
    },
    learningTimeEstimate: {
      totalHours: 1200,
      basic: 300,
      intermediate: 600,
      advanced: 1200
    }
  },
  {
    id: "chinese",
    name: "中文",
    nativeName: "中文",
    flag: "🇨🇳",
    description: "世界上使用人数最多的语言",
    difficulty: 5,
    speakers: { total: 1300000000, native: 918000000, secondary: 382000000 },
    tags: ["汉语族", "商务重要", "文化深厚"],
    family: "汉藏语系",
    script: "汉字",
    regions: ["中国", "台湾", "新加坡"],
    difficultyAnalysis: {
      grammar: 4.0,
      pronunciation: 5.0,
      writing: 5.0,
      vocabulary: 4.5
    },
    learningTimeEstimate: {
      totalHours: 2200,
      basic: 600,
      intermediate: 1200,
      advanced: 2200
    },
    writingSystem: ["chinese"]
  },
  {
    id: "korean",
    name: "韩语",
    nativeName: "한국어",
    flag: "🇰🇷",
    description: "韩流文化的载体，科技产业重要语言",
    difficulty: 4,
    speakers: { total: 77000000, native: 75000000, secondary: 2000000 },
    tags: ["东亚文化", "韩流", "科技"],
    family: "朝鲜语族",
    script: "韩文",
    regions: ["韩国", "朝鲜"],
    difficultyAnalysis: {
      grammar: 4.0,
      pronunciation: 3.0,
      writing: 3.0,
      vocabulary: 4.0
    },
    learningTimeEstimate: {
      totalHours: 1800,
      basic: 500,
      intermediate: 1000,
      advanced: 1800
    }
  },
  {
    id: "italian",
    name: "意大利语",
    nativeName: "Italiano",
    flag: "🇮🇹",
    description: "艺术、美食和设计的语言",
    difficulty: 2,
    speakers: { total: 85000000, native: 65000000, secondary: 20000000 },
    tags: ["浪漫语族", "艺术", "美食"],
    family: "印欧语系",
    script: "拉丁字母",
    regions: ["意大利", "瑞士", "圣马力诺"],
    difficultyAnalysis: {
      grammar: 3.0,
      pronunciation: 2.0,
      writing: 2.0,
      vocabulary: 2.5
    },
    learningTimeEstimate: {
      totalHours: 600,
      basic: 150,
      intermediate: 300,
      advanced: 600
    }
  },
  {
    id: "portuguese",
    name: "葡萄牙语",
    nativeName: "Português",
    flag: "🇵🇹",
    description: "巴西和葡语国家的官方语言",
    difficulty: 2,
    speakers: { total: 260000000, native: 230000000, secondary: 30000000 },
    tags: ["浪漫语族", "南美", "商务"],
    family: "印欧语系",
    script: "拉丁字母",
    regions: ["巴西", "葡萄牙", "非洲葡语区"],
    difficultyAnalysis: {
      grammar: 3.0,
      pronunciation: 3.0,
      writing: 2.0,
      vocabulary: 2.5
    },
    learningTimeEstimate: {
      totalHours: 700,
      basic: 175,
      intermediate: 350,
      advanced: 700
    }
  },
  {
    id: "russian",
    name: "俄语",
    nativeName: "Русский",
    flag: "🇷🇺",
    description: "东欧和中亚重要语言，科学文学语言",
    difficulty: 5,
    speakers: { total: 260000000, native: 150000000, secondary: 110000000 },
    tags: ["斯拉夫语族", "科学", "文学"],
    family: "印欧语系",
    script: "西里尔字母",
    regions: ["俄罗斯", "中亚", "东欧"],
    difficultyAnalysis: {
      grammar: 5.0,
      pronunciation: 4.0,
      writing: 4.0,
      vocabulary: 4.5
    },
    learningTimeEstimate: {
      totalHours: 1800,
      basic: 500,
      intermediate: 1000,
      advanced: 1800
    }
  },
  {
    id: "arabic",
    name: "阿拉伯语",
    nativeName: "العربية",
    flag: "🇸🇦",
    description: "中东和北非地区的重要语言",
    difficulty: 5,
    speakers: { total: 422000000, native: 290000000, secondary: 132000000 },
    tags: ["闪米特语族", "宗教", "中东"],
    family: "闪米特语族",
    script: "阿拉伯字母",
    regions: ["中东", "北非"],
    difficultyAnalysis: {
      grammar: 5.0,
      pronunciation: 4.0,
      writing: 4.0,
      vocabulary: 4.5
    },
    learningTimeEstimate: {
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
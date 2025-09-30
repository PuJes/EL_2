import { Language } from '@/types'

export const enhancedLanguageData: Record<string, Language> = {
  spanish: {
    id: "spanish",
    flag: "🇪🇸",
    name: "西班牙语",
    nameEn: "Spanish",
    nativeName: "Español",
    description: "世界第二大母语，职场和旅游热门选择",
    category: "popular",
    difficulty: 2,
    speakers: {
      native: 500000000,
      total: 559000000,
      countries: ["西班牙", "墨西哥", "阿根廷", "哥伦比亚", "秘鲁", "委内瑞拉", "智利", "厄瓜多尔", "危地马拉", "古巴"]
    },
    regions: ["欧洲", "北美洲", "南美洲", "中美洲"],

    // 详细文化信息
    culturalInfo: {
      history: "西班牙语起源于伊比利亚半岛的卡斯蒂利亚地区，经过数世纪的发展，在15-16世纪随着西班牙的海外扩张传播到美洲、非洲和亚洲。今天，西班牙语是世界上使用人数第二多的母语，也是联合国六种官方语言之一。",
      traditions: ["弗拉明戈舞", "斗牛", "午睡文化", "圣诞节庆", "圣地亚哥朝圣之路", "塞维利亚圣周"],
      festivals: ["圣费尔明节", "番茄节", "圣周", "万圣节", "三王节", "复活节"],
      cuisine: ["海鲜饭", "伊比利亚火腿", "橄榄油", "塔帕斯", "玉米饼", "墨西哥卷饼"],
      arts: ["高迪建筑", "毕加索绘画", "洛尔卡诗歌", "塞万提斯文学", "戈雅绘画", "米罗艺术"],
      modernCulture: ["足球文化", "拉美音乐", "电影产业", "电视剧", "流行音乐", "现代建筑"]
    },

    // 语言元数据
    metadata: {
      iso639_1: "es",
      family: "印欧语系",
      branch: "罗曼语族",
      writingSystem: ["拉丁字母"]
    },

    // 学习指导
    learningGuide: {
      learningPath: [
        {
          title: "语音基础",
          description: "掌握西班牙语发音规则和语调模式",
          level: "初级",
          estimatedHours: 20,
          skills: ["字母发音", "重音规则", "语调练习", "卷舌音", "连读规则"]
        },
        {
          title: "基础语法",
          description: "学习动词变位和基本句型结构",
          level: "初级",
          estimatedHours: 40,
          skills: ["动词变位", "性别协调", "基本时态", "疑问句", "否定句"]
        },
        {
          title: "日常词汇",
          description: "掌握500-1000个高频生活词汇",
          level: "初级",
          estimatedHours: 30,
          skills: ["家庭词汇", "食物饮料", "数字时间", "方位交通", "颜色形容"]
        },
        {
          title: "中级语法",
          description: "学习复杂时态和虚拟语气",
          level: "中级",
          estimatedHours: 60,
          skills: ["完成时态", "虚拟语气", "条件句", "被动语态", "间接引语"]
        },
        {
          title: "高级应用",
          description: "商务、学术和专业领域西班牙语",
          level: "高级",
          estimatedHours: 80,
          skills: ["商务写作", "学术阅读", "演讲技巧", "文学欣赏", "跨文化交流"]
        }
      ],
      learningMethods: [
        {
          title: "沉浸式学习",
          description: "通过多媒体内容创造语言环境",
          techniques: ["西语电影", "拉美音乐", "播客收听", "新闻阅读", "社交媒体"]
        },
        {
          title: "交流练习",
          description: "与母语者互动提高口语流利度",
          techniques: ["语言交换", "在线对话", "角色扮演", "情景模拟", "发音纠正"]
        },
        {
          title: "系统学习",
          description: "结构化的语法和词汇学习",
          techniques: ["语法练习", "词汇卡片", "习题集", "模拟考试", "定期复习"]
        }
      ],
      learningTools: [
        {
          category: "在线课程",
          tools: ["Duolingo", "Babbel", "Rosetta Stone", "FluentU", "SpanishPod101"]
        },
        {
          category: "词典工具",
          tools: ["WordReference", "Linguee", "SpanishDict", "Reverso", "Google Translate"]
        },
        {
          category: "媒体资源",
          tools: ["Netflix西语", "YouTube西语", "Spotify播客", "BBC Mundo", "El País"]
        }
      ]
    },

    // 学习时间估算
    learningTimeEstimate: {
      beginner: "3-6个月",
      intermediate: "1-2年",
      advanced: "2-3年",
      totalHours: 600
    },

    // 难度分析
    difficultyAnalysis: {
      grammar: 3,      // 语法复杂度：动词变位较复杂
      pronunciation: 2, // 发音难度：相对简单规律
      writing: 2       // 文字难度：拉丁字母，较简单
    },

    // 学习资源
    learningResources: {
      apps: [
        { name: "Duolingo", description: "游戏化学习平台", price: "免费" },
        { name: "Babbel", description: "实用对话训练", price: "订阅制" },
        { name: "Busuu", description: "AI辅助学习", price: "订阅制" }
      ],
      books: [
        { title: "Madrigal's Magic Key to Spanish", author: "Margarita Madrigal", level: "初级" },
        { title: "Practice Makes Perfect Spanish Grammar", author: "Dorothy Richmond", level: "中级" },
        { title: "Advanced Spanish Grammar", author: "Luis Aragones", level: "高级" }
      ],
      websites: [
        { name: "SpanishDict", url: "https://spanishdict.com", description: "最全面的西语学习网站" },
        { name: "Conjuguemos", url: "https://conjuguemos.com", description: "动词变位练习专站" },
        { name: "News in Slow Spanish", url: "https://newsinslowspanish.com", description: "慢速西语新闻" }
      ]
    },

    // 职业机会
    careerOpportunities: {
      industries: ["国际贸易", "旅游酒店", "教育培训", "翻译口译", "新闻传媒", "医疗保健"],
      averageSalary: "40,000-80,000美元",
      jobGrowth: "增长率15%",
      remoteWork: true
    },

    // 旅游优势
    travelAdvantages: {
      countries: ["西班牙", "墨西哥", "阿根廷", "哥伦比亚", "秘鲁", "智利"],
      businessHubs: ["马德里", "巴塞罗那", "墨西哥城", "布宜诺斯艾利斯", "利马", "圣地亚哥"],
      culturalSites: ["阿尔罕布拉宫", "马丘比丘", "帕特里卡大教堂", "弗拉明戈表演", "墨西哥玛雅遗址"]
    }
  },

  french: {
    id: "french",
    flag: "🇫🇷",
    name: "法语",
    nameEn: "French",
    nativeName: "Français",
    description: "优雅的语言，艺术和时尚的象征",
    category: "cultural",
    difficulty: 3,
    speakers: {
      native: 280000000,
      total: 321000000,
      countries: ["法国", "加拿大", "瑞士", "比利时", "摩纳哥", "卢森堡", "塞内加尔", "马达加斯加"]
    },
    regions: ["欧洲", "北美洲", "非洲", "大洋洲"],

    culturalInfo: {
      history: "法语属于印欧语系罗曼语族，起源于古代拉丁语。中世纪时期成为欧洲宫廷和外交的通用语言，18-19世纪是国际外交的主要语言。今天，法语是联合国、欧盟、国际奥委会等国际组织的官方语言。",
      traditions: ["香水制作", "高级时装", "美食烹饪", "葡萄酒文化", "艺术收藏", "哲学思辨"],
      festivals: ["戛纳电影节", "阿维尼翁戏剧节", "巴士底日", "光明节", "音乐节", "美食节"],
      cuisine: ["法式面包", "奶酪", "葡萄酒", "马卡龙", "鹅肝", "松露"],
      arts: ["印象派绘画", "新古典主义", "雕塑艺术", "文学作品", "电影艺术", "时装设计"],
      modernCulture: ["奢侈品牌", "高级时装", "电影产业", "哲学思想", "现代艺术", "建筑设计"]
    },

    metadata: {
      iso639_1: "fr",
      family: "印欧语系",
      branch: "罗曼语族",
      writingSystem: ["拉丁字母"]
    },

    learningGuide: {
      learningPath: [
        {
          title: "语音语调",
          description: "掌握法语特有的鼻音和语调",
          level: "初级",
          estimatedHours: 25,
          skills: ["鼻音发音", "语调模式", "连音规则", "重音位置", "音变现象"]
        },
        {
          title: "基础语法",
          description: "学习动词变位和性数配合",
          level: "初级",
          estimatedHours: 50,
          skills: ["动词变位", "性数配合", "时态运用", "代词系统", "疑问表达"]
        },
        {
          title: "词汇积累",
          description: "掌握生活和文化相关词汇",
          level: "初中级",
          estimatedHours: 40,
          skills: ["日常词汇", "文化词汇", "学术词汇", "商务词汇", "艺术词汇"]
        }
      ],
      learningMethods: [
        {
          title: "文化浸润",
          description: "通过法语文化产品学习语言",
          techniques: ["法语电影", "文学阅读", "音乐欣赏", "艺术欣赏", "时尚杂志"]
        }
      ],
      learningTools: [
        {
          category: "学习应用",
          tools: ["Babbel", "FluentU", "Frantastique", "TV5Monde", "RFI"]
        }
      ]
    },

    learningTimeEstimate: {
      beginner: "4-8个月",
      intermediate: "1.5-2.5年",
      advanced: "3-4年",
      totalHours: 750
    },

    difficultyAnalysis: {
      grammar: 4,      // 语法复杂度：动词变位和语法规则复杂
      pronunciation: 4, // 发音难度：鼻音和语调较难
      writing: 3       // 文字难度：拼写规则较复杂
    }
  },

  japanese: {
    id: "japanese",
    flag: "🇯🇵",
    name: "日语",
    nameEn: "Japanese",
    nativeName: "日本語",
    description: "动漫文化和先进科技的语言",
    category: "cultural",
    difficulty: 5,
    speakers: {
      native: 125000000,
      total: 128000000,
      countries: ["日本"]
    },
    regions: ["东亚"],

    culturalInfo: {
      history: "日语是日语语系的代表语言，受到古代汉语的深度影响。从平安时代开始发展出独特的假名文字系统，明治维新后大量吸收西方词汇，形成了现代日语的复杂文字体系。",
      traditions: ["茶道", "花道", "武道", "和服文化", "传统节日", "神社文化"],
      festivals: ["樱花节", "七夕", "盂兰盆节", "新年", "儿童节", "文化祭"],
      cuisine: ["寿司", "拉面", "天妇罗", "味噌汤", "抹茶", "和果子"],
      arts: ["浮世绘", "书法", "俳句", "能剧", "歌舞伎", "现代动漫"],
      modernCulture: ["动漫产业", "游戏产业", "J-pop音乐", "时尚文化", "科技创新", "便利店文化"]
    },

    metadata: {
      iso639_1: "ja",
      family: "日语语系",
      branch: "日语族",
      writingSystem: ["平假名", "片假名", "汉字"]
    },

    learningGuide: {
      learningPath: [
        {
          title: "文字系统",
          description: "掌握平假名、片假名和基础汉字",
          level: "初级",
          estimatedHours: 60,
          skills: ["平假名", "片假名", "基础汉字", "笔顺", "读音"]
        },
        {
          title: "基础语法",
          description: "学习日语特有的语法结构",
          level: "初级",
          estimatedHours: 80,
          skills: ["助词使用", "动词活用", "形容词变化", "敬语入门", "语序结构"]
        },
        {
          title: "敬语系统",
          description: "掌握日语复杂的敬语体系",
          level: "中高级",
          estimatedHours: 100,
          skills: ["尊敬语", "谦譲語", "丁宁語", "场面运用", "社交礼仪"]
        }
      ]
    },

    learningTimeEstimate: {
      beginner: "8-12个月",
      intermediate: "2-3年",
      advanced: "4-5年",
      totalHours: 1200
    },

    difficultyAnalysis: {
      grammar: 5,      // 语法复杂度：敬语系统极其复杂
      pronunciation: 3, // 发音难度：发音相对简单
      writing: 5       // 文字难度：三套文字系统极其复杂
    }
  },

  german: {
    id: "german",
    flag: "🇩🇪",
    name: "德语",
    nameEn: "German",
    nativeName: "Deutsch",
    description: "科学和工程的语言，欧洲商务重要语言",
    category: "business",
    difficulty: 3,
    speakers: {
      native: 95000000,
      total: 132000000,
      countries: ["德国", "奥地利", "瑞士", "列支敦士登", "卢森堡", "比利时"]
    },
    regions: ["欧洲"],

    // 详细文化信息
    culturalInfo: {
      history: "德语属于印欧语系日耳曼语族西日耳曼语支，起源于古高地德语。中世纪时期马丁·路德的圣经翻译对德语标准化产生重大影响。德语是欧洲重要的科学、哲学和文学语言，产生了众多世界级的思想家和文学家。",
      traditions: ["啤酒节", "圣诞市场", "复活节", "工匠传统", "音乐传统", "哲学思辨"],
      festivals: ["慕尼黑啤酒节", "科隆狂欢节", "圣诞市场", "复活节", "五月节", "收获节"],
      cuisine: ["德式香肠", "椒盐卷饼", "德式酸菜", "猪肘", "德式面包", "啤酒"],
      arts: ["古典音乐", "巴洛克建筑", "哲学著作", "工业设计", "现代艺术", "歌剧"],
      modernCulture: ["工业4.0", "环保理念", "工程技术", "汽车工业", "可再生能源", "创新设计"]
    },

    // 语言元数据
    metadata: {
      iso639_1: "de",
      family: "印欧语系",
      branch: "日耳曼语族",
      writingSystem: ["拉丁字母"]
    },

    // 学习指导
    learningGuide: {
      learningPath: [
        {
          title: "德语发音",
          description: "掌握德语特有的发音规则和语调",
          level: "初级",
          estimatedHours: 30,
          skills: ["字母发音", "变音字母", "重音规则", "语调模式", "连读技巧"]
        },
        {
          title: "基础语法",
          description: "学习德语复杂的格变和动词变位",
          level: "初级",
          estimatedHours: 60,
          skills: ["四格变化", "动词变位", "形容词变格", "语序规则", "基本句型"]
        },
        {
          title: "词汇积累",
          description: "掌握日常和专业词汇",
          level: "初中级",
          estimatedHours: 50,
          skills: ["日常词汇", "商务词汇", "技术词汇", "学术词汇", "复合词构成"]
        },
        {
          title: "高级语法",
          description: "掌握德语高级语法结构",
          level: "高级",
          estimatedHours: 80,
          skills: ["从句结构", "被动语态", "虚拟语气", "分词结构", "复杂句型"]
        }
      ],
      learningMethods: [
        {
          title: "系统学习",
          description: "通过教材系统学习德语语法",
          techniques: ["语法教材", "练习册", "语法规则", "句型练习", "语法测试"]
        },
        {
          title: "媒体浸润",
          description: "通过德语媒体提高语言水平",
          techniques: ["德语新闻", "德国电影", "播客节目", "德语歌曲", "纪录片"]
        },
        {
          title: "实践应用",
          description: "在实际场景中使用德语",
          techniques: ["语言交换", "德语角", "商务会话", "学术讨论", "文化活动"]
        }
      ],
      learningTools: [
        {
          category: "学习应用",
          tools: ["Babbel", "Busuu", "Deutsche Welle", "Nemo German", "Memrise"]
        },
        {
          category: "词典工具",
          tools: ["Duden", "Leo.org", "Dict.cc", "Linguee", "Reverso"]
        },
        {
          category: "媒体资源",
          tools: ["Deutsche Welle", "ARD", "ZDF", "Spiegel Online", "Focus"]
        }
      ]
    },

    // 学习时间估算
    learningTimeEstimate: {
      beginner: "6-9个月",
      intermediate: "1.5-2年",
      advanced: "3-4年",
      totalHours: 900
    },

    // 难度分析
    difficultyAnalysis: {
      grammar: 5,      // 语法复杂度：格变系统极其复杂
      pronunciation: 3, // 发音难度：相对规律
      writing: 3       // 文字难度：拉丁字母，复合词较长
    },

    // 学习资源
    learningResources: {
      apps: [
        { name: "Babbel", description: "德语专业课程", price: "订阅制" },
        { name: "Busuu", description: "互动德语学习", price: "免费/付费" },
        { name: "Deutsche Welle", description: "官方德语课程", price: "免费" }
      ],
      books: [
        { title: "德语语法大全", author: "Duden", level: "中高级" },
        { title: "新标准德语强化教程", author: "外研社", level: "初中级" },
        { title: "德语国家概况", author: "同济大学出版社", level: "中级" }
      ],
      websites: [
        { name: "Deutsche Welle", url: "https://learngerman.dw.com", description: "德国官方德语学习网站" },
        { name: "Goethe Institut", url: "https://goethe.de", description: "歌德学院德语学习资源" },
        { name: "IchLiebeDE", url: "https://ichliebe.de", description: "德语学习社区" }
      ]
    },

    // 职业机会
    careerOpportunities: {
      industries: ["汽车工业", "机械制造", "化工", "金融", "科研", "教育"],
      averageSalary: "45,000-90,000美元",
      jobGrowth: "增长率12%",
      remoteWork: true
    },

    // 旅游优势
    travelAdvantages: {
      countries: ["德国", "奥地利", "瑞士", "卢森堡"],
      businessHubs: ["柏林", "慕尼黑", "法兰克福", "汉堡", "维也纳", "苏黎世"],
      culturalSites: ["新天鹅堡", "科隆大教堂", "柏林墙", "维也纳音乐厅", "阿尔卑斯山"]
    }
  },

  chinese: {
    id: "chinese",
    flag: "🇨🇳",
    name: "中文",
    nameEn: "Chinese",
    nativeName: "中文",
    description: "世界上使用人数最多的语言",
    category: "popular",
    difficulty: 5,
    speakers: {
      native: 918000000,
      total: 1300000000,
      countries: ["中国", "台湾", "新加坡", "马来西亚", "香港", "澳门"]
    },
    regions: ["东亚", "东南亚"],

    // 详细文化信息
    culturalInfo: {
      history: "汉语属于汉藏语系，拥有五千多年的历史，是世界最古老的语言之一。汉字是世界上仍在使用的最古老的文字系统，经历了甲骨文、金文、篆书、隶书、楷书等发展阶段。现代汉语以北京话为标准语，在台湾称为国语，在新加坡等地称为华语。",
      traditions: ["书法艺术", "茶文化", "中医", "武术", "京剧", "传统节日"],
      festivals: ["春节", "中秋节", "端午节", "清明节", "元宵节", "重阳节"],
      cuisine: ["八大菜系", "茶文化", "中式点心", "火锅", "饺子", "月饼"],
      arts: ["书法", "国画", "京剧", "昆曲", "太极", "古琴"],
      modernCulture: ["科技创新", "移动支付", "高铁", "电商", "短视频", "现代文学"]
    },

    // 语言元数据
    metadata: {
      iso639_1: "zh",
      family: "汉藏语系",
      branch: "汉语族",
      writingSystem: ["汉字简体", "汉字繁体"]
    },

    // 学习指导
    learningGuide: {
      learningPath: [
        {
          title: "拼音发音",
          description: "掌握汉语拼音和声调系统",
          level: "初级",
          estimatedHours: 40,
          skills: ["拼音字母", "四声调", "轻声", "声母韵母", "拼读规则"]
        },
        {
          title: "汉字入门",
          description: "学习汉字的基本结构和常用字",
          level: "初级",
          estimatedHours: 80,
          skills: ["笔画顺序", "部首偏旁", "汉字结构", "常用汉字", "简繁对照"]
        },
        {
          title: "基础语法",
          description: "掌握中文基本语法和句型",
          level: "初中级",
          estimatedHours: 60,
          skills: ["基本句型", "词类用法", "语序规则", "疑问句", "否定句"]
        },
        {
          title: "高级应用",
          description: "商务、学术和文学中文应用",
          level: "高级",
          estimatedHours: 100,
          skills: ["商务中文", "学术写作", "文言文", "成语俗语", "跨文化交际"]
        }
      ],
      learningMethods: [
        {
          title: "多媒体学习",
          description: "通过中文媒体内容学习",
          techniques: ["中文电影", "电视剧", "新闻", "音乐", "纪录片"]
        },
        {
          title: "文化体验",
          description: "深入了解中华文化",
          techniques: ["传统文化", "历史学习", "文学阅读", "艺术欣赏", "节日体验"]
        },
        {
          title: "实践交流",
          description: "与中文母语者交流练习",
          techniques: ["语言交换", "中文角", "社交媒体", "在线聊天", "文化活动"]
        }
      ],
      learningTools: [
        {
          category: "学习应用",
          tools: ["HelloChinese", "ChineseSkill", "Pleco", "HSK Online", "Yoyo Chinese"]
        },
        {
          category: "词典工具",
          tools: ["Pleco", "MDBG", "HanPing", "Nciku", "LINE Dict"]
        },
        {
          category: "媒体资源",
          tools: ["CCTV", "爱奇艺", "优酷", "喜马拉雅", "中文播客"]
        }
      ]
    },

    // 学习时间估算
    learningTimeEstimate: {
      beginner: "12-18个月",
      intermediate: "3-4年",
      advanced: "5-6年",
      totalHours: 2200
    },

    // 难度分析
    difficultyAnalysis: {
      grammar: 4,      // 语法复杂度：相对简单但有特殊性
      pronunciation: 5, // 发音难度：声调系统复杂
      writing: 5       // 文字难度：汉字系统极其复杂
    },

    // 学习资源
    learningResources: {
      apps: [
        { name: "HelloChinese", description: "游戏化中文学习", price: "免费/付费" },
        { name: "Pleco", description: "最强中文词典", price: "免费/付费功能" },
        { name: "ChineseSkill", description: "中文技能训练", price: "免费" }
      ],
      books: [
        { title: "新实用汉语课本", author: "北京语言大学出版社", level: "初中级" },
        { title: "HSK标准教程", author: "北京语言大学出版社", level: "各级别" },
        { title: "汉语口语速成", author: "北京语言大学出版社", level: "口语专项" }
      ],
      websites: [
        { name: "Confucius Institute", url: "https://confuciusinstitute.org", description: "孔子学院中文学习资源" },
        { name: "Chinese Grammar Wiki", url: "https://resources.allsetlearning.com", description: "中文语法详解" },
        { name: "YoyoChinese", url: "https://yoyochinese.com", description: "在线中文课程" }
      ]
    },

    // 职业机会
    careerOpportunities: {
      industries: ["国际贸易", "科技", "制造业", "金融", "教育", "旅游"],
      averageSalary: "35,000-75,000美元",
      jobGrowth: "增长率20%",
      remoteWork: true
    },

    // 旅游优势
    travelAdvantages: {
      countries: ["中国", "台湾", "新加坡", "马来西亚"],
      businessHubs: ["北京", "上海", "深圳", "广州", "台北", "新加坡"],
      culturalSites: ["长城", "故宫", "兵马俑", "天坛", "颐和园", "九寨沟"]
    }
  },

  korean: {
    id: "korean",
    flag: "🇰🇷",
    name: "韩语",
    nameEn: "Korean",
    nativeName: "한국어",
    description: "韩流文化的载体，科技产业重要语言",
    category: "cultural",
    difficulty: 4,
    speakers: {
      native: 75000000,
      total: 77000000,
      countries: ["韩国", "朝鲜", "中国东北", "俄罗斯远东", "美国", "日本"]
    },
    regions: ["东亚"],

    // 详细文化信息
    culturalInfo: {
      history: "韩语属于朝鲜语族，是朝鲜半岛的固有语言。15世纪世宗大王创制了韩文字母（한글），成为世界上最科学的表音文字之一。现代韩语分为韩国的标准语和朝鲜的文化语，两者在词汇和语法上略有差异。",
      traditions: ["韩服文化", "茶道", "跆拳道", "传统舞蹈", "宗庙祭礼", "民俗游戏"],
      festivals: ["春节", "中秋节", "儿童节", "成人节", "韩文日", "釜山电影节"],
      cuisine: ["韩式烤肉", "泡菜", "拌饭", "冷面", "炸鸡", "年糕汤"],
      arts: ["韩流音乐", "韩剧", "传统绘画", "陶瓷艺术", "书法", "现代电影"],
      modernCulture: ["K-pop", "韩流", "电竞", "美妆产业", "科技创新", "网络文化"]
    },

    // 语言元数据
    metadata: {
      iso639_1: "ko",
      family: "朝鲜语族",
      branch: "朝鲜语族",
      writingSystem: ["한글", "汉字"]
    },

    // 学习指导
    learningGuide: {
      learningPath: [
        {
          title: "韩文字母",
          description: "掌握한글字母系统和基础发音",
          level: "初级",
          estimatedHours: 25,
          skills: ["字母认读", "发音规则", "音变现象", "基础拼读", "手写练习"]
        },
        {
          title: "基础语法",
          description: "学习韩语语法基础和敬语系统",
          level: "初级",
          estimatedHours: 50,
          skills: ["语序结构", "助词使用", "动词活用", "形容词变化", "敬语入门"]
        },
        {
          title: "日常会话",
          description: "掌握日常生活交流用语",
          level: "初中级",
          estimatedHours: 40,
          skills: ["问候用语", "数字时间", "购物用语", "交通指路", "餐厅用语"]
        },
        {
          title: "敬语系统",
          description: "深入学习韩语敬语和社交礼仪",
          level: "中高级",
          estimatedHours: 60,
          skills: ["敬语等级", "社交礼仪", "职场用语", "正式场合", "文化背景"]
        },
        {
          title: "高级应用",
          description: "商务、学术和专业领域韩语",
          level: "高级",
          estimatedHours: 80,
          skills: ["商务韩语", "学术写作", "新闻阅读", "文学欣赏", "专业术语"]
        }
      ],
      learningMethods: [
        {
          title: "韩流媒体",
          description: "通过韩流文化产品学习语言",
          techniques: ["韩剧学习", "K-pop歌词", "综艺节目", "韩流电影", "YouTube频道"]
        },
        {
          title: "互动练习",
          description: "与韩语母语者交流互动",
          techniques: ["语言交换", "韩语角", "在线对话", "社交媒体", "文化活动"]
        },
        {
          title: "系统学习",
          description: "通过教材系统学习韩语",
          techniques: ["韩语教材", "语法练习", "词汇积累", "听力训练", "写作练习"]
        }
      ],
      learningTools: [
        {
          category: "学习应用",
          tools: ["LingoDeer", "Naver Dictionary", "Papago", "Talk To Me In Korean", "Korean Grammar Haja"]
        },
        {
          category: "词典工具",
          tools: ["Naver Dictionary", "Daum Dictionary", "Korean Grammar Guide", "Papago", "Google Translate"]
        },
        {
          category: "媒体资源",
          tools: ["KBS World", "SBS", "MBC", "Netflix韩剧", "Viki"]
        }
      ]
    },

    // 学习时间估算
    learningTimeEstimate: {
      beginner: "6-10个月",
      intermediate: "2-3年",
      advanced: "3-4年",
      totalHours: 1100
    },

    // 难度分析
    difficultyAnalysis: {
      grammar: 4,      // 语法复杂度：敬语系统复杂
      pronunciation: 3, // 发音难度：相对规律
      writing: 3       // 文字难度：表音文字，相对简单
    },

    // 学习资源
    learningResources: {
      apps: [
        { name: "LingoDeer", description: "专业韩语学习应用", price: "免费/付费" },
        { name: "Talk To Me In Korean", description: "韩语会话练习", price: "免费/付费" },
        { name: "Naver Dictionary", description: "权威韩语词典", price: "免费" }
      ],
      books: [
        { title: "延世韩国语", author: "延世大学出版社", level: "初中级" },
        { title: "首尔大学韩国语", author: "首尔大学出版社", level: "各级别" },
        { title: "韩语语法大全", author: "外研社", level: "中高级" }
      ],
      websites: [
        { name: "Talk To Me In Korean", url: "https://talktomeinkorean.com", description: "最受欢迎的韩语学习网站" },
        { name: "Naver Dictionary", url: "https://dict.naver.com", description: "韩语权威词典" },
        { name: "King Sejong Institute", url: "https://www.ksif.or.kr", description: "世宗学堂官方学习资源" }
      ]
    },

    // 职业机会
    careerOpportunities: {
      industries: ["科技", "娱乐", "制造业", "贸易", "教育", "旅游"],
      averageSalary: "38,000-70,000美元",
      jobGrowth: "增长率18%",
      remoteWork: true
    },

    // 旅游优势
    travelAdvantages: {
      countries: ["韩国", "朝鲜"],
      businessHubs: ["首尔", "釜山", "仁川", "大邱", "光州", "大田"],
      culturalSites: ["景福宫", "济州岛", "釜山海滩", "庆州", "安东河回村", "首尔塔"]
    }
  },

  italian: {
    id: "italian",
    flag: "🇮🇹",
    name: "意大利语",
    nameEn: "Italian",
    nativeName: "Italiano",
    description: "艺术、美食和设计的语言",
    category: "cultural",
    difficulty: 2,
    speakers: {
      native: 65000000,
      total: 85000000,
      countries: ["意大利", "瑞士", "圣马力诺", "梵蒂冈", "斯洛文尼亚", "克罗地亚"]
    },
    regions: ["欧洲"],

    // 详细文化信息
    culturalInfo: {
      history: "意大利语属于印欧语系罗曼语族，直接起源于拉丁语。但丁的《神曲》奠定了现代意大利语的基础。作为文艺复兴的摇篮，意大利语承载了丰富的艺术、建筑、音乐和文学传统。",
      traditions: ["歌剧传统", "文艺复兴", "天主教文化", "家庭观念", "手势语言", "工匠传统"],
      festivals: ["威尼斯嘉年华", "复活节", "圣诞节", "帕利奥赛马节", "柠檬节", "葡萄收获节"],
      cuisine: ["意大利面", "披萨", "咖啡文化", "葡萄酒", "奶酪", "冰淇淋"],
      arts: ["文艺复兴绘画", "雕塑艺术", "建筑设计", "歌剧", "电影", "时装设计"],
      modernCulture: ["时尚产业", "设计文化", "美食文化", "足球", "汽车工业", "奢侈品牌"]
    },

    // 语言元数据
    metadata: {
      iso639_1: "it",
      family: "印欧语系",
      branch: "罗曼语族",
      writingSystem: ["拉丁字母"]
    },

    // 学习指导
    learningGuide: {
      learningPath: [
        {
          title: "语音入门",
          description: "掌握意大利语发音和语调",
          level: "初级",
          estimatedHours: 20,
          skills: ["字母发音", "语调规律", "重音规则", "语音连读", "音变现象"]
        },
        {
          title: "基础语法",
          description: "学习动词变位和基本语法",
          level: "初级",
          estimatedHours: 35,
          skills: ["动词变位", "名词性数", "形容词协调", "基本时态", "疑问否定"]
        },
        {
          title: "日常词汇",
          description: "掌握生活必需词汇",
          level: "初级",
          estimatedHours: 30,
          skills: ["家庭生活", "饮食文化", "购物旅行", "时间数字", "颜色描述"]
        },
        {
          title: "中级语法",
          description: "深入学习复杂语法结构",
          level: "中级",
          estimatedHours: 50,
          skills: ["复合时态", "虚拟语气", "条件句", "被动语态", "从句结构"]
        },
        {
          title: "文化应用",
          description: "艺术、商务和专业意大利语",
          level: "高级",
          estimatedHours: 65,
          skills: ["艺术术语", "商务意语", "文学阅读", "新闻理解", "专业交流"]
        }
      ],
      learningMethods: [
        {
          title: "文化浸润",
          description: "通过意大利文化学习语言",
          techniques: ["意大利电影", "歌剧欣赏", "艺术史", "美食节目", "旅游纪录片"]
        },
        {
          title: "实际交流",
          description: "与意大利人直接交流",
          techniques: ["语言交换", "意语角", "文化活动", "旅行体验", "在线聊天"]
        },
        {
          title: "系统学习",
          description: "通过教材系统掌握",
          techniques: ["语法教材", "练习册", "听力材料", "阅读练习", "写作训练"]
        }
      ],
      learningTools: [
        {
          category: "学习应用",
          tools: ["Babbel", "Duolingo", "ItalianPod101", "Busuu", "Nemo Italian"]
        },
        {
          category: "词典工具",
          tools: ["Garzanti", "Treccani", "WordReference", "Reverso", "Google Translate"]
        },
        {
          category: "媒体资源",
          tools: ["RAI Play", "Mediaset", "La Gazzetta", "Corriere", "Il Post"]
        }
      ]
    },

    // 学习时间估算
    learningTimeEstimate: {
      beginner: "3-6个月",
      intermediate: "1-2年",
      advanced: "2-3年",
      totalHours: 600
    },

    // 难度分析
    difficultyAnalysis: {
      grammar: 3,      // 语法复杂度：动词变位较复杂
      pronunciation: 2, // 发音难度：相对简单规律
      writing: 2       // 文字难度：拉丁字母，较简单
    },

    // 学习资源
    learningResources: {
      apps: [
        { name: "Babbel", description: "专业意大利语课程", price: "订阅制" },
        { name: "ItalianPod101", description: "播客式学习", price: "免费/付费" },
        { name: "Busuu", description: "互动学习平台", price: "免费/付费" }
      ],
      books: [
        { title: "新视线意大利语", author: "外研社", level: "初中级" },
        { title: "意大利语语法", author: "上海外语教育出版社", level: "中级" },
        { title: "意大利语阅读教程", author: "北京语言大学出版社", level: "中高级" }
      ],
      websites: [
        { name: "ItalianPod101", url: "https://italianpod101.com", description: "专业意语学习网站" },
        { name: "Treccani", url: "https://treccani.it", description: "权威意大利语词典" },
        { name: "RAI Italiano", url: "https://rai.it", description: "意大利官方媒体学习资源" }
      ]
    },

    // 职业机会
    careerOpportunities: {
      industries: ["时尚", "设计", "艺术", "旅游", "美食", "奢侈品"],
      averageSalary: "35,000-65,000美元",
      jobGrowth: "增长率10%",
      remoteWork: true
    },

    // 旅游优势
    travelAdvantages: {
      countries: ["意大利", "瑞士", "圣马力诺", "梵蒂冈"],
      businessHubs: ["罗马", "米兰", "佛罗伦萨", "威尼斯", "那不勒斯", "都灵"],
      culturalSites: ["斗兽场", "比萨斜塔", "梵蒂冈", "威尼斯", "佛罗伦萨", "庞贝古城"]
    }
  },

  portuguese: {
    id: "portuguese",
    flag: "🇵🇹",
    name: "葡萄牙语",
    nameEn: "Portuguese",
    nativeName: "Português",
    description: "巴西和葡语国家的官方语言",
    category: "popular",
    difficulty: 2,
    speakers: {
      native: 230000000,
      total: 260000000,
      countries: ["巴西", "葡萄牙", "安哥拉", "莫桑比克", "东帝汶", "佛得角", "几内亚比绍", "圣多美和普林西比"]
    },
    regions: ["南美洲", "欧洲", "非洲", "亚洲"],

    // 详细文化信息
    culturalInfo: {
      history: "葡萄牙语起源于中世纪的加利西亚-葡萄牙语，随着大航海时代的殖民扩张传播到世界各地。巴西葡语和欧洲葡语在发音和词汇上有一定差异，但基本可以互通。葡语是世界第五大语言。",
      traditions: ["法朵音乐", "足球文化", "天主教传统", "嘉年华", "探戈舞", "海洋文化"],
      festivals: ["里约嘉年华", "圣约翰节", "死者节", "复活节", "圣诞节", "新年"],
      cuisine: ["烤肉", "海鲜饭", "蛋挞", "面包", "咖啡", "甜点"],
      arts: ["巴萨诺瓦音乐", "建筑艺术", "文学作品", "电影", "雕塑", "陶瓷艺术"],
      modernCulture: ["足球", "音乐产业", "电视剧", "时尚", "科技创新", "环保意识"]
    },

    // 语言元数据
    metadata: {
      iso639_1: "pt",
      family: "印欧语系",
      branch: "罗曼语族",
      writingSystem: ["拉丁字母"]
    },

    // 学习指导
    learningGuide: {
      learningPath: [
        {
          title: "语音基础",
          description: "掌握葡语发音和语调特点",
          level: "初级",
          estimatedHours: 25,
          skills: ["鼻音发音", "语调模式", "重音规则", "连读技巧", "音变现象"]
        },
        {
          title: "基础语法",
          description: "学习动词变位和基本语法",
          level: "初级",
          estimatedHours: 40,
          skills: ["动词变位", "性数配合", "基本时态", "疑问句", "否定句"]
        },
        {
          title: "日常交流",
          description: "掌握生活交流必需词汇和表达",
          level: "初中级",
          estimatedHours: 35,
          skills: ["日常对话", "购物用语", "交通出行", "饮食文化", "社交礼仪"]
        },
        {
          title: "中级语法",
          description: "深入学习复杂语法结构",
          level: "中级",
          estimatedHours: 50,
          skills: ["虚拟语气", "复合时态", "条件句", "被动语态", "间接引语"]
        },
        {
          title: "高级应用",
          description: "商务、学术和专业葡语",
          level: "高级",
          estimatedHours: 75,
          skills: ["商务葡语", "学术写作", "新闻阅读", "文学欣赏", "专业术语"]
        }
      ],
      learningMethods: [
        {
          title: "媒体学习",
          description: "通过葡语媒体内容学习",
          techniques: ["巴西电影", "葡语音乐", "新闻节目", "电视剧", "纪录片"]
        },
        {
          title: "文化体验",
          description: "深入了解葡语文化",
          techniques: ["巴西文化", "葡萄牙历史", "足球文化", "音乐舞蹈", "美食体验"]
        },
        {
          title: "交流练习",
          description: "与母语者实际交流",
          techniques: ["语言交换", "葡语角", "在线对话", "社交媒体", "文化活动"]
        }
      ],
      learningTools: [
        {
          category: "学习应用",
          tools: ["Babbel", "PortuguesePod101", "Mondly", "Busuu", "Memrise"]
        },
        {
          category: "词典工具",
          tools: ["Priberam", "Michaelis", "Infopédia", "Reverso", "Google Translate"]
        },
        {
          category: "媒体资源",
          tools: ["Globo", "SBT", "RTP", "BBC Brasil", "Folha de S.Paulo"]
        }
      ]
    },

    // 学习时间估算
    learningTimeEstimate: {
      beginner: "4-7个月",
      intermediate: "1-2年",
      advanced: "2-3年",
      totalHours: 700
    },

    // 难度分析
    difficultyAnalysis: {
      grammar: 3,      // 语法复杂度：动词变位较复杂
      pronunciation: 3, // 发音难度：鼻音较难
      writing: 2       // 文字难度：拉丁字母，相对简单
    },

    // 学习资源
    learningResources: {
      apps: [
        { name: "Babbel", description: "专业葡语课程", price: "订阅制" },
        { name: "PortuguesePod101", description: "播客式学习", price: "免费/付费" },
        { name: "Busuu", description: "互动学习社区", price: "免费/付费" }
      ],
      books: [
        { title: "新编葡萄牙语教程", author: "外研社", level: "初中级" },
        { title: "葡萄牙语语法", author: "上海外语教育出版社", level: "中级" },
        { title: "巴西葡语会话", author: "北京语言大学出版社", level: "口语专项" }
      ],
      websites: [
        { name: "PortuguesePod101", url: "https://portuguesepod101.com", description: "专业葡语学习网站" },
        { name: "Conjugação", url: "https://conjugacao.com.br", description: "动词变位练习" },
        { name: "Portal da Língua", url: "https://portaldalinguaportuguesa.org", description: "葡语官方学习门户" }
      ]
    },

    // 职业机会
    careerOpportunities: {
      industries: ["国际贸易", "旅游", "能源", "农业", "教育", "翻译"],
      averageSalary: "35,000-70,000美元",
      jobGrowth: "增长率14%",
      remoteWork: true
    },

    // 旅游优势
    travelAdvantages: {
      countries: ["巴西", "葡萄牙", "安哥拉", "莫桑比克", "东帝汶"],
      businessHubs: ["圣保罗", "里约热内卢", "里斯本", "波尔图", "罗安达", "马普托"],
      culturalSites: ["基督像", "亚马逊雨林", "里约海滩", "里斯本老城", "马德拉岛"]
    }
  },

  russian: {
    id: "russian",
    flag: "🇷🇺",
    name: "俄语",
    nameEn: "Russian",
    nativeName: "Русский",
    description: "东欧和中亚重要语言，科学文学语言",
    category: "emerging",
    difficulty: 5,
    speakers: {
      native: 150000000,
      total: 260000000,
      countries: ["俄罗斯", "白俄罗斯", "哈萨克斯坦", "吉尔吉斯斯坦", "乌克兰", "摩尔多瓦", "拉脱维亚", "爱沙尼亚"]
    },
    regions: ["东欧", "中亚", "北亚"],

    // 详细文化信息
    culturalInfo: {
      history: "俄语属于印欧语系斯拉夫语族东斯拉夫语支，使用西里尔字母。俄语是俄国文学黄金时代的载体，托尔斯泰、陀思妥耶夫斯基等文学大师的作品影响世界。苏联时期俄语成为社会主义阵营的通用语言。",
      traditions: ["东正教文化", "芭蕾艺术", "文学传统", "音乐传统", "冬宫文化", "民间艺术"],
      festivals: ["新年", "东正教圣诞节", "俄罗斯日", "胜利日", "谢肉节", "白夜节"],
      cuisine: ["罗宋汤", "鱼子酱", "伏特加", "俄式饺子", "黑面包", "俄式茶文化"],
      arts: ["芭蕾舞", "古典音乐", "文学作品", "绘画艺术", "建筑艺术", "电影"],
      modernCulture: ["航天科技", "数学物理", "计算机科学", "冰球", "文学电影", "网络文化"]
    },

    // 语言元数据
    metadata: {
      iso639_1: "ru",
      family: "印欧语系",
      branch: "斯拉夫语族",
      writingSystem: ["西里尔字母"]
    },

    // 学习指导
    learningGuide: {
      learningPath: [
        {
          title: "西里尔字母",
          description: "掌握俄语字母系统和基础发音",
          level: "初级",
          estimatedHours: 40,
          skills: ["字母认读", "书写练习", "发音规则", "重音位置", "软硬音"]
        },
        {
          title: "基础语法",
          description: "学习俄语六格变化系统",
          level: "初级",
          estimatedHours: 80,
          skills: ["名词变格", "形容词变化", "动词变位", "代词变化", "基本句型"]
        },
        {
          title: "动词体系",
          description: "掌握俄语复杂的动词体系",
          level: "中级",
          estimatedHours: 60,
          skills: ["完成体", "未完成体", "动词变位", "时态运用", "语态变化"]
        },
        {
          title: "高级语法",
          description: "深入学习复杂语法结构",
          level: "中高级",
          estimatedHours: 100,
          skills: ["复杂句式", "分词结构", "形动词", "副动词", "条件句式"]
        },
        {
          title: "文学应用",
          description: "文学、科学和专业俄语",
          level: "高级",
          estimatedHours: 120,
          skills: ["文学阅读", "科技俄语", "学术写作", "新闻理解", "专业交流"]
        }
      ],
      learningMethods: [
        {
          title: "文学浸润",
          description: "通过俄国文学学习语言",
          techniques: ["经典文学", "现代小说", "诗歌欣赏", "戏剧作品", "文学批评"]
        },
        {
          title: "媒体学习",
          description: "通过俄语媒体提高水平",
          techniques: ["俄语新闻", "电影欣赏", "音乐欣赏", "纪录片", "网络内容"]
        },
        {
          title: "系统学习",
          description: "通过教材系统掌握",
          techniques: ["语法教材", "练习册", "听力训练", "口语练习", "写作训练"]
        }
      ],
      learningTools: [
        {
          category: "学习应用",
          tools: ["Babbel", "RussianPod101", "Busuu", "Memrise", "RedKalinka"]
        },
        {
          category: "词典工具",
          tools: ["Multitran", "Lingvo", "ABBYY Lingvo", "Reverso", "Google Translate"]
        },
        {
          category: "媒体资源",
          tools: ["RT", "TASS", "Первый канал", "НТВ", "Российская газета"]
        }
      ]
    },

    // 学习时间估算
    learningTimeEstimate: {
      beginner: "10-15个月",
      intermediate: "2-3年",
      advanced: "4-5年",
      totalHours: 1800
    },

    // 难度分析
    difficultyAnalysis: {
      grammar: 5,      // 语法复杂度：六格变化系统极其复杂
      pronunciation: 4, // 发音难度：软硬音区分较难
      writing: 4       // 文字难度：西里尔字母需要适应
    },

    // 学习资源
    learningResources: {
      apps: [
        { name: "RussianPod101", description: "专业俄语播客课程", price: "免费/付费" },
        { name: "Babbel", description: "互动俄语学习", price: "订阅制" },
        { name: "RedKalinka", description: "俄语语法专项", price: "免费/付费" }
      ],
      books: [
        { title: "东方大学俄语", author: "外研社", level: "初中级" },
        { title: "俄语语法大全", author: "上海外语教育出版社", level: "中高级" },
        { title: "现代俄语实用语法", author: "商务印书馆", level: "语法专项" }
      ],
      websites: [
        { name: "RussianPod101", url: "https://russianpod101.com", description: "专业俄语学习网站" },
        { name: "RedKalinka", url: "https://redkalinka.com", description: "俄语语法和文化" },
        { name: "RussiaToday", url: "https://rt.com", description: "俄语新闻媒体" }
      ]
    },

    // 职业机会
    careerOpportunities: {
      industries: ["能源", "科技", "航天", "军工", "教育", "翻译"],
      averageSalary: "40,000-80,000美元",
      jobGrowth: "增长率8%",
      remoteWork: true
    },

    // 旅游优势
    travelAdvantages: {
      countries: ["俄罗斯", "白俄罗斯", "哈萨克斯坦", "吉尔吉斯斯坦"],
      businessHubs: ["莫斯科", "圣彼得堡", "新西伯利亚", "叶卡捷琳堡", "明斯克", "阿拉木图"],
      culturalSites: ["红场", "冬宫", "贝加尔湖", "克里姆林宫", "圣巴西尔大教堂", "涅瓦大街"]
    }
  },

  arabic: {
    id: "arabic",
    flag: "🇸🇦",
    name: "阿拉伯语",
    nameEn: "Arabic",
    nativeName: "العربية",
    description: "中东和北非地区的重要语言",
    category: "emerging",
    difficulty: 5,
    speakers: {
      native: 290000000,
      total: 422000000,
      countries: ["沙特阿拉伯", "埃及", "伊拉克", "阿尔及利亚", "摩洛哥", "苏丹", "叙利亚", "也门", "约旦", "阿联酋", "科威特", "卡塔尔"]
    },
    regions: ["中东", "北非"],

    // 详细文化信息
    culturalInfo: {
      history: "阿拉伯语属于闪米特语族，拥有超过1500年的文学传统。《古兰经》的启示使阿拉伯语成为神圣语言，推动了其在伊斯兰世界的传播。现代标准阿拉伯语是阿拉伯国家的官方语言，各地方言差异较大。",
      traditions: ["伊斯兰文化", "贝都因传统", "诗歌传统", "书法艺术", "香料贸易", "骑士精神"],
      festivals: ["开斋节", "宰牲节", "先知诞辰", "阿舒拉节", "拉马丹", "朝觐"],
      cuisine: ["烤肉", "椰枣", "阿拉伯咖啡", "胡姆斯", "塔布勒沙拉", "巴克拉瓦"],
      arts: ["书法艺术", "伊斯兰建筑", "阿拉伯音乐", "地毯编织", "金属工艺", "陶瓷艺术"],
      modernCulture: ["石油工业", "现代建筑", "金融中心", "科技发展", "媒体产业", "教育改革"]
    },

    // 语言元数据
    metadata: {
      iso639_1: "ar",
      family: "闪米特语族",
      branch: "闪米特语族",
      writingSystem: ["阿拉伯文字"]
    },

    // 学习指导
    learningGuide: {
      learningPath: [
        {
          title: "阿拉伯字母",
          description: "掌握阿拉伯文字系统和基础发音",
          level: "初级",
          estimatedHours: 60,
          skills: ["字母形态", "连写规则", "发音方法", "短元音", "长元音"]
        },
        {
          title: "基础语法",
          description: "学习阿拉伯语基本语法结构",
          level: "初级",
          estimatedHours: 80,
          skills: ["词根系统", "动词变位", "名词变格", "形容词协调", "基本句型"]
        },
        {
          title: "词汇积累",
          description: "掌握日常和宗教词汇",
          level: "初中级",
          estimatedHours: 70,
          skills: ["日常词汇", "宗教术语", "家庭社会", "商务贸易", "文化概念"]
        },
        {
          title: "高级语法",
          description: "深入学习复杂语法结构",
          level: "中高级",
          estimatedHours: 100,
          skills: ["复杂时态", "虚拟语气", "条件句", "被动语态", "修辞手法"]
        },
        {
          title: "专业应用",
          description: "商务、学术和宗教阿语",
          level: "高级",
          estimatedHours: 130,
          skills: ["商务阿语", "学术阿语", "宗教文献", "新闻媒体", "文学欣赏"]
        }
      ],
      learningMethods: [
        {
          title: "文化学习",
          description: "通过阿拉伯文化学习语言",
          techniques: ["伊斯兰文化", "历史学习", "宗教知识", "文学作品", "艺术欣赏"]
        },
        {
          title: "媒体浸润",
          description: "通过阿语媒体提高水平",
          techniques: ["阿语新闻", "电视节目", "宗教节目", "音乐欣赏", "纪录片"]
        },
        {
          title: "实践交流",
          description: "与阿拉伯人交流练习",
          techniques: ["语言交换", "阿语角", "宗教活动", "文化中心", "在线社区"]
        }
      ],
      learningTools: [
        {
          category: "学习应用",
          tools: ["ArabicPod101", "Memrise", "Busuu", "Nemo Arabic", "Learn Arabic"]
        },
        {
          category: "词典工具",
          tools: ["Hans Wehr", "Almaany", "Reverso", "Google Translate", "Arabic Almanac"]
        },
        {
          category: "媒体资源",
          tools: ["Al Jazeera", "BBC Arabic", "Al Arabiya", "Middle East Eye", "Al-Monitor"]
        }
      ]
    },

    // 学习时间估算
    learningTimeEstimate: {
      beginner: "12-18个月",
      intermediate: "3-4年",
      advanced: "5-7年",
      totalHours: 2200
    },

    // 难度分析
    difficultyAnalysis: {
      grammar: 5,      // 语法复杂度：词根变位系统复杂
      pronunciation: 4, // 发音难度：喉音等较难发音
      writing: 5       // 文字难度：从右到左书写，连写复杂
    },

    // 学习资源
    learningResources: {
      apps: [
        { name: "ArabicPod101", description: "专业阿语播客课程", price: "免费/付费" },
        { name: "Busuu", description: "互动阿语学习", price: "免费/付费" },
        { name: "Memrise", description: "词汇记忆训练", price: "免费/付费" }
      ],
      books: [
        { title: "新编阿拉伯语", author: "外研社", level: "初中级" },
        { title: "阿拉伯语语法", author: "北京大学出版社", level: "中高级" },
        { title: "现代阿拉伯语教程", author: "上海外语教育出版社", level: "综合教程" }
      ],
      websites: [
        { name: "ArabicPod101", url: "https://arabicpod101.com", description: "专业阿语学习网站" },
        { name: "Madinah Arabic", url: "https://madinaharabic.com", description: "伊斯兰阿语学习" },
        { name: "Arabic Online", url: "https://arabic-online.net", description: "在线阿语学习平台" }
      ]
    },

    // 职业机会
    careerOpportunities: {
      industries: ["石油能源", "国际贸易", "外交", "翻译", "新闻媒体", "教育"],
      averageSalary: "45,000-90,000美元",
      jobGrowth: "增长率16%",
      remoteWork: true
    },

    // 旅游优势
    travelAdvantages: {
      countries: ["沙特阿拉伯", "阿联酋", "埃及", "摩洛哥", "约旦", "黎巴嫩"],
      businessHubs: ["迪拜", "利雅得", "开罗", "贝鲁特", "安曼", "多哈"],
      culturalSites: ["麦加", "麦地那", "金字塔", "佩特拉", "阿尔汗布拉宫", "巴尔贝克"]
    }
  }
}
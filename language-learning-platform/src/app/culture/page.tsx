"use client"

import * as React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  Globe,
  Map,
  Calendar,
  Users,
  BookOpen,
  Music,
  Utensils,
  Camera,
  Play,
  ArrowRight,
  Heart,
  Star,
  MapPin,
  Clock,
  Search,
  Filter,
  ChevronDown,
  Eye,
  TrendingUp
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import type { CultureInfo, CulturalRegion } from "@/lib/types"

// Enhanced Culture Data Structure
interface CulturalRegionData {
  id: CulturalRegion
  name: string
  countries: string[]
  languages: string[]
  image: string
  description: string
  features: string[]
  cultureInfo: CultureInfo
  stats: {
    languageCount: number
    speakerCount: string
    heritageCount: number
    modernInfluence: number
  }
}

interface CulturalAspect {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  examples: {
    culture: string
    region: CulturalRegion
    item: string
    description: string
    significance: string
    modernRelevance: string
  }[]
}

interface VirtualTour {
  id: string
  title: string
  location: string
  region: CulturalRegion
  duration: string
  rating: number
  image: string
  description: string
  culturalAspects: string[]
  languageImmersion: boolean
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  features: string[]
}

// Mock enhanced culture data using new CultureInfo structure
const cultureData = {
  featured: {
    id: "east_asia",
    title: "东亚文化圈探索",
    subtitle: "儒家文明与现代创新的交融",
    image: "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?w=800",
    description: "深入探索东亚文化圈的深厚底蕴，从古老的哲学思想到现代科技创新的完美融合",
    highlights: [
      "深厚的儒家文化传统",
      "精致的茶道与书法艺术",
      "领先世界的现代科技文化",
      "独特的集体主义价值观"
    ],
    stats: {
      languages: "15种主要语言",
      regions: "3个核心文化区",
      population: "16亿文化群体",
      heritage: "180+世界文化遗产"
    }
  },

  regions: [
    {
      id: "east_asia" as CulturalRegion,
      name: "东亚文化圈",
      countries: ["中国", "日本", "韩国", "朝鲜", "蒙古"],
      languages: ["中文", "日语", "韩语", "蒙古语"],
      image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=400",
      description: "儒家文化深度影响的地区，重视教育、家庭和社会和谐，现代科技发达",
      features: ["汉字文化圈", "儒家思想", "茶文化", "书法艺术", "现代科技"],
      cultureInfo: {
        history: "拥有5000年悠久历史，儒家、道家、佛教思想交融发展",
        traditions: ["春节庆典", "茶道仪式", "书法练习", "太极拳", "围棋对弈"],
        festivals: ["春节", "中秋节", "端午节", "重阳节", "元宵节"],
        cuisine: ["中式料理", "日本料理", "韩式烧烤", "蒙古火锅", "素食文化"],
        arts: ["水墨画", "书法", "瓷器", "丝绸", "园林艺术", "戏曲"],
        literature: ["诗经", "论语", "红楼梦", "源氏物语", "春香传"],
        modernCulture: ["K-pop音乐", "动漫文化", "电子竞技", "移动支付", "高速铁路"]
      },
      stats: {
        languageCount: 15,
        speakerCount: "16亿+",
        heritageCount: 89,
        modernInfluence: 95
      }
    },
    {
      id: "europe" as CulturalRegion,
      name: "欧洲文化圈",
      countries: ["法国", "德国", "意大利", "西班牙", "英国", "荷兰"],
      languages: ["法语", "德语", "意大利语", "西班牙语", "英语"],
      image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400",
      description: "文艺复兴发源地，人文主义传统深厚，艺术、哲学和科学的重要摇篮",
      features: ["文艺复兴传统", "古典音乐", "哲学思辨", "建筑遗产", "美食文化"],
      cultureInfo: {
        history: "古希腊罗马文明基础上发展的现代西方文明",
        traditions: ["古典音乐", "油画艺术", "芭蕾舞", "歌剧", "哥特建筑"],
        festivals: ["圣诞节", "复活节", "慕尼黑啤酒节", "威尼斯嘉年华", "巴黎时装周"],
        cuisine: ["法式料理", "意大利面", "德国香肠", "西班牙海鲜饭", "英式下午茶"],
        arts: ["油画", "雕塑", "建筑", "古典音乐", "歌剧", "芭蕾"],
        literature: ["莎士比亚戏剧", "但丁神曲", "歌德浮士德", "雨果悲惨世界"],
        modernCulture: ["时尚产业", "现代艺术", "足球文化", "咖啡文化", "环保理念"]
      },
      stats: {
        languageCount: 24,
        speakerCount: "7.5亿+",
        heritageCount: 132,
        modernInfluence: 88
      }
    },
    {
      id: "latin_america" as CulturalRegion,
      name: "拉丁美洲",
      countries: ["墨西哥", "巴西", "阿根廷", "智利", "哥伦比亚"],
      languages: ["西班牙语", "葡萄牙语", "克丘亚语"],
      image: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=400",
      description: "热情奔放的文化氛围，印第安、欧洲、非洲文化的独特融合",
      features: ["音乐舞蹈", "节庆文化", "原住民传统", "热带风情", "足球文化"],
      cultureInfo: {
        history: "印第安文明与欧洲殖民文化融合的多元文化",
        traditions: ["萨尔萨舞", "探戈", "玛雅文化", "印加传统", "家族聚会"],
        festivals: ["嘉年华", "亡灵节", "圣母节", "收获节", "圣诞Novena"],
        cuisine: ["墨西哥卷", "巴西烤肉", "阿根廷牛排", "秘鲁海鲜", "智利红酒"],
        arts: ["壁画艺术", "民族舞蹈", "手工艺品", "彩色建筑", "街头艺术"],
        literature: ["魔幻现实主义", "博尔赫斯", "马尔克斯", "聂鲁达诗歌"],
        modernCulture: ["足球运动", "流行音乐", "电视剧", "生态旅游", "咖啡文化"]
      },
      stats: {
        languageCount: 8,
        speakerCount: "6.5亿+",
        heritageCount: 45,
        modernInfluence: 72
      }
    },
    {
      id: "middle_east" as CulturalRegion,
      name: "中东地区",
      countries: ["沙特阿拉伯", "土耳其", "伊朗", "以色列", "埃及"],
      languages: ["阿拉伯语", "土耳其语", "波斯语", "希伯来语"],
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73dd3?w=400",
      description: "古代文明交汇点，一神教发源地，丝绸之路的重要节点",
      features: ["古老文明", "宗教文化", "商贸传统", "建筑艺术", "诗歌文学"],
      cultureInfo: {
        history: "世界最古老文明之一，三大一神教发源地",
        traditions: ["朝圣仪式", "书法艺术", "地毯编织", "香料贸易", "诗歌朗诵"],
        festivals: ["开斋节", "宰牲节", "波斯新年", "光明节", "圣诞节"],
        cuisine: ["烤羊肉", "抓饭", "鹰嘴豆泥", "土耳其烤肉", "波斯米饭"],
        arts: ["伊斯兰建筑", "波斯地毯", "阿拉伯书法", "细密画", "几何图案"],
        literature: ["古兰经", "一千零一夜", "鲁米诗集", "菲尔多西史诗"],
        modernCulture: ["石油经济", "现代建筑", "时尚产业", "科技创新", "文化复兴"]
      },
      stats: {
        languageCount: 12,
        speakerCount: "4.8亿+",
        heritageCount: 67,
        modernInfluence: 78
      }
    },
    {
      id: "africa" as CulturalRegion,
      name: "非洲大陆",
      countries: ["埃及", "南非", "尼日利亚", "肯尼亚", "摩洛哥"],
      languages: ["阿拉伯语", "斯瓦希里语", "阿非利卡语", "约鲁巴语"],
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400",
      description: "人类文明摇篮，部落文化丰富，口述传统深厚，现代复兴蓬勃",
      features: ["部落文化", "野生动物", "音乐艺术", "口述传统", "手工艺品"],
      cultureInfo: {
        history: "人类起源地，古埃及文明和撒哈拉以南非洲文明的发源地",
        traditions: ["部落仪式", "面具舞蹈", "鼓乐演奏", "口述历史", "手工艺制作"],
        festivals: ["收获节", "成人礼", "雨季庆典", "祖先节", "独立日"],
        cuisine: ["烤肉文化", "小米粥", "木薯料理", "辣椒炖菜", "发酵饮品"],
        arts: ["面具艺术", "雕刻", "纺织品", "壁画", "金属工艺", "珠饰"],
        literature: ["口述史诗", "民间故事", "谚语智慧", "现代文学", "诗歌传统"],
        modernCulture: ["流行音乐", "时装设计", "电影产业", "数字创新", "生态保护"]
      },
      stats: {
        languageCount: 54,
        speakerCount: "13亿+",
        heritageCount: 78,
        modernInfluence: 65
      }
    },
    {
      id: "south_asia" as CulturalRegion,
      name: "南亚次大陆",
      countries: ["印度", "巴基斯坦", "孟加拉国", "斯里兰卡", "尼泊尔"],
      languages: ["印地语", "乌尔都语", "孟加拉语", "僧伽罗语", "尼泊尔语"],
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400",
      description: "世界文明古国，宗教哲学发源地，文化多样性极其丰富",
      features: ["宗教多样性", "瑜伽冥想", "香料文化", "纺织艺术", "数学哲学"],
      cultureInfo: {
        history: "印度河文明起源，佛教、印度教、锡克教发源地",
        traditions: ["瑜伽修行", "冥想禅定", "阿育吠陀", "古典舞蹈", "家族制度"],
        festivals: ["排灯节", "胡里节", "杜尔伽节", "开斋节", "佛诞节"],
        cuisine: ["咖喱料理", "印度飞饼", "香料茶", "素食文化", "甜品文化"],
        arts: ["古典舞蹈", "印度音乐", "纺织艺术", "建筑雕刻", "绘画艺术"],
        literature: ["吠陀经典", "罗摩衍那", "摩诃婆罗多", "泰戈尔诗歌"],
        modernCulture: ["宝莱坞电影", "IT产业", "瑜伽热潮", "素食主义", "精神旅游"]
      },
      stats: {
        languageCount: 22,
        speakerCount: "19亿+",
        heritageCount: 56,
        modernInfluence: 82
      }
    }
  ] as CulturalRegionData[],

  culturalAspects: [
    {
      id: "food",
      title: "美食文化",
      icon: Utensils,
      description: "通过美食了解不同文化的生活方式、价值观和历史传承",
      examples: [
        {
          culture: "意大利",
          region: "europe" as CulturalRegion,
          item: "意大利面",
          description: "家庭聚会的象征，传承数百年的制作工艺",
          significance: "代表家庭团结和传统传承",
          modernRelevance: "全球化美食的代表，慢生活哲学的体现"
        },
        {
          culture: "日本",
          region: "east_asia" as CulturalRegion,
          item: "寿司",
          description: "精工细作的艺术，体现日本职人精神",
          significance: "完美主义和对自然的敬畏",
          modernRelevance: "健康饮食文化的全球推广"
        },
        {
          culture: "印度",
          region: "south_asia" as CulturalRegion,
          item: "香料咖喱",
          description: "复杂香料的神奇组合，医食同源的智慧",
          significance: "阿育吠陀养生哲学的体现",
          modernRelevance: "功能性食品和健康生活方式"
        },
        {
          culture: "墨西哥",
          region: "latin_america" as CulturalRegion,
          item: "玉米饼",
          description: "印第安文明的主食传统",
          significance: "对土地和自然的感恩",
          modernRelevance: "可持续农业和地方食材运动"
        }
      ]
    },
    {
      id: "festivals",
      title: "节庆文化",
      icon: Calendar,
      description: "节日庆典展现文化的精神内核、社会价值和集体记忆",
      examples: [
        {
          culture: "中国",
          region: "east_asia" as CulturalRegion,
          item: "春节",
          description: "家庭团圆的重要时刻，传承千年的文化仪式",
          significance: "家族观念和社会和谐的体现",
          modernRelevance: "现代社会中情感纽带的重要性"
        },
        {
          culture: "印度",
          region: "south_asia" as CulturalRegion,
          item: "排灯节",
          description: "光明战胜黑暗的精神象征",
          significance: "希望、新生和精神觉醒",
          modernRelevance: "环保庆祝和文化包容性"
        },
        {
          culture: "巴西",
          region: "latin_america" as CulturalRegion,
          item: "嘉年华",
          description: "多元文化融合的盛大庆典",
          significance: "文化包容和创造力的释放",
          modernRelevance: "文化旅游和创意产业发展"
        },
        {
          culture: "德国",
          region: "europe" as CulturalRegion,
          item: "啤酒节",
          description: "社区欢聚的传统盛会",
          significance: "社会团结和地方认同",
          modernRelevance: "文化品牌和地方经济发展"
        }
      ]
    },
    {
      id: "arts",
      title: "艺术表达",
      icon: Camera,
      description: "艺术形式反映文化的审美观念、哲学思想和创造力",
      examples: [
        {
          culture: "日本",
          region: "east_asia" as CulturalRegion,
          item: "浮世绘",
          description: "江户时代的生活写照，影响了西方印象派",
          significance: "对瞬间美的捕捉和平民文化的兴起",
          modernRelevance: "数字艺术和流行文化的影响"
        },
        {
          culture: "非洲",
          region: "africa" as CulturalRegion,
          item: "面具艺术",
          description: "精神世界的物质表达，连接人与神灵",
          significance: "宗教信仰和社会认同的载体",
          modernRelevance: "当代艺术和文化身份的探讨"
        },
        {
          culture: "阿拉伯",
          region: "middle_east" as CulturalRegion,
          item: "几何图案",
          description: "数学与美学的完美融合",
          significance: "对秩序和完美的追求",
          modernRelevance: "现代设计和建筑的灵感源泉"
        },
        {
          culture: "法国",
          region: "europe" as CulturalRegion,
          item: "印象派绘画",
          description: "光影变化的诗意表达",
          significance: "艺术革命和个性表达的自由",
          modernRelevance: "现代艺术市场和美术教育"
        }
      ]
    },
    {
      id: "philosophy",
      title: "哲学思想",
      icon: BookOpen,
      description: "哲学体系体现文化对世界、人生和社会的深层思考",
      examples: [
        {
          culture: "中国",
          region: "east_asia" as CulturalRegion,
          item: "儒家思想",
          description: "和谐社会的理想，教育的重要性",
          significance: "社会秩序和道德修养的基础",
          modernRelevance: "现代管理学和教育理念"
        },
        {
          culture: "古希腊",
          region: "europe" as CulturalRegion,
          item: "古典哲学",
          description: "理性思辨的传统，逻辑思维的基础",
          significance: "科学方法论的起源",
          modernRelevance: "批判性思维和民主制度"
        },
        {
          culture: "印度",
          region: "south_asia" as CulturalRegion,
          item: "瑜伽哲学",
          description: "身心灵统一的修行之道",
          significance: "整体性健康观念的体现",
          modernRelevance: "现代心理学和健康产业"
        },
        {
          culture: "阿拉伯",
          region: "middle_east" as CulturalRegion,
          item: "苏菲主义",
          description: "通过内在体验寻求真理",
          significance: "精神修行和宗教包容性",
          modernRelevance: "心理治疗和精神健康关注"
        }
      ]
    }
  ] as CulturalAspect[],

  virtualTours: [
    {
      id: "kyoto-temples",
      title: "京都古寺巡礼",
      location: "日本京都",
      region: "east_asia" as CulturalRegion,
      duration: "45分钟",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400",
      description: "探访清水寺、金阁寺等千年古刹，感受日本传统建筑之美和禅宗文化精髓",
      culturalAspects: ["建筑艺术", "宗教文化", "园林设计", "禅宗哲学"],
      languageImmersion: true,
      difficulty: "intermediate" as const,
      features: ["360度全景", "专业导览", "历史讲解", "冥想体验"]
    },
    {
      id: "paris-museums",
      title: "巴黎艺术殿堂",
      location: "法国巴黎",
      region: "europe" as CulturalRegion,
      duration: "60分钟",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400",
      description: "卢浮宫、奥赛博物馆艺术珍品巡览，领略法国艺术精髓和文艺复兴传统",
      culturalAspects: ["绘画艺术", "雕塑", "历史文化", "建筑设计"],
      languageImmersion: true,
      difficulty: "advanced" as const,
      features: ["高清画质", "艺术解析", "历史背景", "互动问答"]
    },
    {
      id: "machu-picchu",
      title: "马丘比丘遗址探秘",
      location: "秘鲁库斯科",
      region: "latin_america" as CulturalRegion,
      duration: "40分钟",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400",
      description: "神秘的印加文明遗址，探索安第斯山脉的古老文化和建筑奇迹",
      culturalAspects: ["古代文明", "建筑技术", "天文学", "农业文化"],
      languageImmersion: false,
      difficulty: "beginner" as const,
      features: ["地理知识", "历史讲解", "3D重构", "考古发现"]
    },
    {
      id: "taj-mahal",
      title: "泰姬陵爱情传说",
      location: "印度阿格拉",
      region: "south_asia" as CulturalRegion,
      duration: "35分钟",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400",
      description: "莫卧儿建筑杰作，见证永恒爱情的白色奇迹，探索印度建筑艺术精华",
      culturalAspects: ["建筑艺术", "爱情文化", "宗教艺术", "工艺技术"],
      languageImmersion: true,
      difficulty: "intermediate" as const,
      features: ["建筑解析", "历史故事", "工艺展示", "文化背景"]
    }
  ] as VirtualTour[]
}

export default function CulturePage() {
  const [selectedAspect, setSelectedAspect] = useState("food")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState<CulturalRegion | "all">("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")

  // Filter logic for virtual tours
  const filteredTours = cultureData.virtualTours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tour.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRegion = selectedRegion === "all" || tour.region === selectedRegion
    const matchesDifficulty = selectedDifficulty === "all" || tour.difficulty === selectedDifficulty

    return matchesSearch && matchesRegion && matchesDifficulty
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${cultureData.featured.image})`
            }}
          />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  文化世界
                </h1>
                <p className="text-2xl md:text-3xl font-light">
                  探索语言背后的文化基因
                </p>
              </div>

              <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
                每种语言都承载着独特的文化DNA，通过文化的视角深入理解语言学习的深层意义，
                让学习成为一场穿越时空的文明对话
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                  开始文化探索
                  <Globe className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                  虚拟文化之旅
                  <Play className="ml-2 h-5 w-5" />
                </Button>
              </div>

              {/* Enhanced Featured Culture Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-16">
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur">
                  <div className="text-2xl font-bold">{cultureData.featured.stats.languages}</div>
                  <div className="text-sm opacity-80">主要语言</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur">
                  <div className="text-2xl font-bold">{cultureData.featured.stats.regions}</div>
                  <div className="text-sm opacity-80">文化区域</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur">
                  <div className="text-2xl font-bold">{cultureData.featured.stats.population}</div>
                  <div className="text-sm opacity-80">文化群体</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur">
                  <div className="text-2xl font-bold">{cultureData.featured.stats.heritage}</div>
                  <div className="text-sm opacity-80">文化遗产</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Cultural Regions */}
        <section className="py-24 section-bg-learning">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                世界文化地图
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                探索六大文化圈的独特魅力，深入了解语言与文化的深层联系，
                发现每个文化圈独特的历史传承和现代发展
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cultureData.regions.map((region, index) => (
                <motion.div
                  key={region.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full group">
                    <div className="relative h-48">
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                        style={{ backgroundImage: `url(${region.image})` }}
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge className="bg-white/90 text-slate-900">
                          {region.stats.languageCount} 种语言
                        </Badge>
                        <Badge className="bg-blue-500/90 text-white">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {region.stats.modernInfluence}%
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                          {region.name}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {region.description}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-sm mb-2 flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            文化群体
                          </h4>
                          <p className="text-sm text-muted-foreground">{region.stats.speakerCount} 使用者</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm mb-2">主要语言</h4>
                          <div className="flex flex-wrap gap-2">
                            {region.languages.slice(0, 3).map((lang, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {lang}
                              </Badge>
                            ))}
                            {region.languages.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{region.languages.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm mb-2">现代文化特色</h4>
                          <div className="flex flex-wrap gap-2">
                            {region.cultureInfo.modernCulture.slice(0, 3).map((feature, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {region.cultureInfo.modernCulture.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{region.cultureInfo.modernCulture.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button className="w-full group-hover:bg-blue-600 transition-colors" variant="outline">
                        探索文化详情
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Cultural Aspects */}
        <section className="py-24 section-bg-features">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                文化的多个维度
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                从美食、节庆、艺术、哲学四个核心维度深入了解世界文化的丰富内涵，
                发现文化传承与现代意义的完美结合
              </p>
            </motion.div>

            <Tabs value={selectedAspect} onValueChange={setSelectedAspect} className="w-full">
              <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-12">
                {cultureData.culturalAspects.map((aspect) => {
                  const IconComponent = aspect.icon
                  return (
                    <TabsTrigger key={aspect.id} value={aspect.id} className="flex items-center space-x-2">
                      <IconComponent className="w-4 h-4" />
                      <span className="hidden sm:inline">{aspect.title}</span>
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              {cultureData.culturalAspects.map((aspect) => (
                <TabsContent key={aspect.id} value={aspect.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                  >
                    <div className="text-center max-w-3xl mx-auto">
                      <h3 className="text-2xl font-bold mb-4">{aspect.title}</h3>
                      <p className="text-lg text-muted-foreground">{aspect.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {aspect.examples.map((example, index) => (
                        <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 group">
                          <CardContent className="p-6 space-y-4">
                            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform">
                              {example.culture.charAt(0)}
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                                {example.item}
                              </h4>
                              <p className="text-sm text-muted-foreground font-medium">{example.culture}</p>
                              <p className="text-sm">{example.description}</p>
                              <div className="pt-2 border-t">
                                <p className="text-xs text-blue-600 font-medium">现代意义</p>
                                <p className="text-xs text-muted-foreground">{example.modernRelevance}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Enhanced Virtual Tours with Filters */}
        <section className="py-24 section-bg-hero">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                虚拟文化之旅
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                足不出户，沉浸式体验世界各地的文化景观和历史遗迹，
                通过高科技手段获得真实的文化体验
              </p>
            </motion.div>

            {/* Search and Filter Controls */}
            <div className="mb-12 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                      <Input
                        placeholder="搜索文化景点或地区..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      />
                    </div>
                  </div>
                  <Select value={selectedRegion} onValueChange={(value) => setSelectedRegion(value as CulturalRegion | "all")}>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="选择文化圈" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有文化圈</SelectItem>
                      <SelectItem value="east_asia">东亚文化圈</SelectItem>
                      <SelectItem value="europe">欧洲文化圈</SelectItem>
                      <SelectItem value="latin_america">拉丁美洲</SelectItem>
                      <SelectItem value="middle_east">中东地区</SelectItem>
                      <SelectItem value="africa">非洲大陆</SelectItem>
                      <SelectItem value="south_asia">南亚次大陆</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="难度等级" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有难度</SelectItem>
                      <SelectItem value="beginner">初级</SelectItem>
                      <SelectItem value="intermediate">中级</SelectItem>
                      <SelectItem value="advanced">高级</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredTours.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/95 backdrop-blur group h-full">
                    <div className="relative h-48 group">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundImage: `url(${tour.image})` }}
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <div className="flex items-center space-x-1 bg-white/90 px-2 py-1 rounded">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-semibold">{tour.rating}</span>
                        </div>
                        {tour.languageImmersion && (
                          <Badge className="bg-blue-500 text-white">
                            语言沉浸
                          </Badge>
                        )}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-slate-900" />
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                          {tour.title}
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{tour.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{tour.duration}</span>
                          <Badge
                            variant={tour.difficulty === 'beginner' ? 'secondary' :
                                  tour.difficulty === 'intermediate' ? 'default' : 'destructive'}
                            className="ml-2 text-xs"
                          >
                            {tour.difficulty === 'beginner' ? '初级' :
                             tour.difficulty === 'intermediate' ? '中级' : '高级'}
                          </Badge>
                        </div>

                        <p className="text-sm leading-relaxed mb-3">{tour.description}</p>

                        <div className="space-y-2">
                          <h4 className="text-xs font-semibold text-muted-foreground">文化主题</h4>
                          <div className="flex flex-wrap gap-1">
                            {tour.culturalAspects.slice(0, 3).map((aspect, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {aspect}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Button className="w-full btn-gradient mt-4">
                        开始虚拟游览
                        <Eye className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredTours.length === 0 && (
              <div className="text-center text-white/80 py-12">
                <p className="text-lg">未找到符合条件的虚拟游览</p>
                <p className="text-sm">请尝试调整搜索条件</p>
              </div>
            )}

            <div className="text-center mt-12">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                查看更多虚拟游览
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-24 section-bg-learning">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold gradient-text">
                文化与语言，相互成就
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                通过文化的视角学习语言，让每一次学习都成为一次穿越时空的文明对话。
                选择一种语言，就是选择一种看世界的方式，选择一种思考的模式，
                选择一种与世界连接的独特方式。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="btn-gradient">
                  <Link href="/survey">
                    开始文化语言测评
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/languages">
                    探索语言世界
                    <Globe className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
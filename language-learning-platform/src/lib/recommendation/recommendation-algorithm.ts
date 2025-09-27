/**
 * 语言学习个性化推荐算法
 * 基于多维度权重计算，提供精准的语言推荐
 */

import type { Language, PersonalizedDifficulty } from '../types/language'
import type { SurveyResponses, LanguageRecommendation, RecommendationReason, LearningPath } from '../types/survey'

// 算法配置常量
const ALGORITHM_CONFIG = {
  // 权重分配 (总和必须为1)
  weights: {
    culturalMatch: 0.30,      // 文化兴趣匹配
    difficultyFit: 0.25,      // 难度适配度
    goalAlignment: 0.20,      // 学习目标匹配
    timeFeasibility: 0.15,    // 时间可行性
    practicalValue: 0.10      // 实用价值
  },

  // 难度调整因子
  difficultyAdjustment: {
    motherTongueBonus: 0.3,   // 母语相似度奖励
    experienceBonus: 0.2,     // 学习经验奖励
    timeConstraintPenalty: 0.15, // 时间约束惩罚
  },

  // 文化匹配映射
  culturalMapping: {
    'east-asia': ['japanese', 'korean', 'chinese'],
    'southeast-asia': ['thai', 'vietnamese', 'indonesian'],
    'europe': ['french', 'german', 'italian', 'spanish'],
    'latin-america': ['spanish', 'portuguese'],
    'middle-east': ['arabic', 'persian', 'turkish'],
    'africa': ['swahili', 'arabic'],
    'north-america': ['english', 'french'],
    'oceania': ['english']
  },

  // 语言各维度预设评分 (0-100分，更客观公平的评分体系)
  languageMotivationScores: {
    'japanese': { business: 85, travel: 90, culture: 95, academic: 75 },
    'korean': { business: 80, travel: 85, culture: 90, academic: 70 },
    'spanish': { business: 75, travel: 95, culture: 85, academic: 70 },
    'french': { business: 80, travel: 85, culture: 90, academic: 85 },
    'german': { business: 90, travel: 75, culture: 80, academic: 90 },
    'english': { business: 95, travel: 80, culture: 75, academic: 95 },
    'chinese': { business: 90, travel: 80, culture: 95, academic: 85 },
    'italian': { business: 70, travel: 95, culture: 90, academic: 75 },
    'portuguese': { business: 65, travel: 85, culture: 80, academic: 65 },
    'dutch': { business: 80, travel: 70, culture: 75, academic: 80 },
    'russian': { business: 70, travel: 75, culture: 85, academic: 85 },
    'arabic': { business: 75, travel: 80, culture: 90, academic: 75 },
    'hindi': { business: 70, travel: 85, culture: 90, academic: 70 },
    'turkish': { business: 65, travel: 90, culture: 85, academic: 60 },
    'thai': { business: 60, travel: 95, culture: 80, academic: 55 },
    'vietnamese': { business: 65, travel: 80, culture: 75, academic: 60 },
    'polish': { business: 70, travel: 75, culture: 80, academic: 75 },
    'swedish': { business: 75, travel: 80, culture: 75, academic: 85 },
    'norwegian': { business: 75, travel: 85, culture: 75, academic: 80 },
    'finnish': { business: 80, travel: 75, culture: 70, academic: 85 },
    'hungarian': { business: 65, travel: 75, culture: 80, academic: 70 },
    'czech': { business: 70, travel: 85, culture: 80, academic: 75 },
    'greek': { business: 60, travel: 90, culture: 95, academic: 70 },
    'hebrew': { business: 75, travel: 75, culture: 85, academic: 80 },
    'swahili': { business: 50, travel: 85, culture: 80, academic: 55 },
    'indonesian': { business: 65, travel: 90, culture: 85, academic: 60 },
    'malay': { business: 60, travel: 85, culture: 80, academic: 55 },
    'tagalog': { business: 55, travel: 85, culture: 75, academic: 50 },
    'persian': { business: 60, travel: 80, culture: 90, academic: 70 },
    'urdu': { business: 55, travel: 75, culture: 85, academic: 65 },
    'bengali': { business: 55, travel: 70, culture: 85, academic: 60 },
    'punjabi': { business: 50, travel: 70, culture: 80, academic: 55 },
    'tamil': { business: 60, travel: 75, culture: 85, academic: 65 },
    'telugu': { business: 55, travel: 70, culture: 80, academic: 60 },
    'marathi': { business: 55, travel: 70, culture: 80, academic: 60 },
    'gujarati': { business: 60, travel: 70, culture: 75, academic: 60 },
    'kannada': { business: 55, travel: 70, culture: 80, academic: 60 },
    'malayalam': { business: 55, travel: 75, culture: 80, academic: 65 },
    'ukrainian': { business: 60, travel: 70, culture: 85, academic: 75 },
    'romanian': { business: 65, travel: 80, culture: 80, academic: 70 },
    'bulgarian': { business: 60, travel: 75, culture: 80, academic: 70 },
    'serbian': { business: 55, travel: 75, culture: 80, academic: 65 },
    'croatian': { business: 60, travel: 85, culture: 80, academic: 70 },
    'slovenian': { business: 65, travel: 80, culture: 75, academic: 70 },
    'slovak': { business: 65, travel: 75, culture: 75, academic: 70 },
    'estonian': { business: 70, travel: 75, culture: 70, academic: 75 },
    'latvian': { business: 65, travel: 75, culture: 70, academic: 70 },
    'lithuanian': { business: 65, travel: 75, culture: 75, academic: 70 },
    'danish': { business: 80, travel: 80, culture: 75, academic: 85 },
    'icelandic': { business: 60, travel: 90, culture: 80, academic: 70 },
    'georgian': { business: 50, travel: 85, culture: 90, academic: 60 },
    'armenian': { business: 55, travel: 80, culture: 85, academic: 65 },
    'albanian': { business: 50, travel: 75, culture: 75, academic: 60 },
    'maltese': { business: 60, travel: 85, culture: 70, academic: 65 },
    'basque': { business: 65, travel: 80, culture: 90, academic: 70 },
    'catalan': { business: 70, travel: 85, culture: 85, academic: 75 },
    'galician': { business: 60, travel: 80, culture: 80, academic: 65 },
    'welsh': { business: 55, travel: 80, culture: 85, academic: 70 },
    'irish': { business: 60, travel: 85, culture: 90, academic: 75 },
    'scots_gaelic': { business: 45, travel: 80, culture: 85, academic: 60 }
  },

  // 语系相似度矩阵 (提升相似度系数，增强母语优势)
  languageFamilySimilarity: {
    // 汉语族
    'chinese': { 'japanese': 0.5, 'korean': 0.3, 'vietnamese': 0.2 },
    'japanese': { 'chinese': 0.5, 'korean': 0.4 },
    'korean': { 'chinese': 0.3, 'japanese': 0.4 },

    // 印欧语系 - 日耳曼语族
    'english': { 'german': 0.6, 'dutch': 0.5, 'swedish': 0.4, 'french': 0.3 },
    'german': { 'english': 0.6, 'dutch': 0.7, 'swedish': 0.6 },
    'dutch': { 'german': 0.7, 'english': 0.5 },
    'swedish': { 'german': 0.6, 'english': 0.4, 'norwegian': 0.8, 'danish': 0.8 },
    'norwegian': { 'swedish': 0.8, 'danish': 0.8 },
    'danish': { 'swedish': 0.8, 'norwegian': 0.8 },

    // 印欧语系 - 罗曼语族 (高相似度)
    'spanish': { 'portuguese': 0.8, 'italian': 0.7, 'french': 0.6, 'catalan': 0.7 },
    'portuguese': { 'spanish': 0.8, 'italian': 0.6, 'french': 0.5, 'galician': 0.9 },
    'italian': { 'spanish': 0.7, 'french': 0.7, 'portuguese': 0.6, 'romanian': 0.5 },
    'french': { 'spanish': 0.6, 'italian': 0.7, 'portuguese': 0.5, 'romanian': 0.4 },
    'catalan': { 'spanish': 0.7, 'french': 0.6, 'italian': 0.6 },
    'romanian': { 'italian': 0.5, 'french': 0.4, 'spanish': 0.4 },

    // 阿拉伯语族
    'arabic': { 'persian': 0.4, 'turkish': 0.2, 'hebrew': 0.5 },
    'persian': { 'arabic': 0.4, 'turkish': 0.3 },
    'hebrew': { 'arabic': 0.5 },
    'turkish': { 'arabic': 0.2, 'persian': 0.3 },

    // 印欧语系 - 印度语族
    'hindi': { 'urdu': 0.8, 'bengali': 0.5, 'punjabi': 0.6 },
    'urdu': { 'hindi': 0.8, 'persian': 0.4 },
    'bengali': { 'hindi': 0.5 },
    'punjabi': { 'hindi': 0.6, 'urdu': 0.5 },

    // 马来-波利尼西亚语族
    'indonesian': { 'malay': 0.9, 'tagalog': 0.4 },
    'malay': { 'indonesian': 0.9 },
    'tagalog': { 'indonesian': 0.4, 'malay': 0.4 },

    // 其他语族
    'thai': { 'lao': 0.7 },
    'vietnamese': { 'chinese': 0.2 },
    'finnish': { 'hungarian': 0.3, 'estonian': 0.6 },
    'hungarian': { 'finnish': 0.3 },
    'estonian': { 'finnish': 0.6 },
    'greek': { 'spanish': 0.2, 'italian': 0.2 },
    'russian': { 'ukrainian': 0.7, 'polish': 0.5, 'czech': 0.5 },
    'ukrainian': { 'russian': 0.7, 'polish': 0.4 },
    'polish': { 'russian': 0.5, 'czech': 0.6, 'ukrainian': 0.4 },
    'czech': { 'polish': 0.6, 'slovak': 0.8, 'russian': 0.5 },
    'slovak': { 'czech': 0.8, 'polish': 0.5 },
    'swahili': { 'arabic': 0.3 }
  },

  // 主要母语的难度基准数据 (1-5分制)
  nativeLanguageBaselines: {
    'chinese': { grammar: 4, pronunciation: 5, writing: 5 },     // 中文：复杂语法，声调，汉字
    'english': { grammar: 2, pronunciation: 3, writing: 2 },     // 英语：简单语法，中等发音，拉丁字母
    'spanish': { grammar: 3, pronunciation: 2, writing: 2 },     // 西班牙语：动词变位，相对简单
    'french': { grammar: 4, pronunciation: 3, writing: 3 },      // 法语：复杂语法，鼻音，拼写规则
    'german': { grammar: 5, pronunciation: 3, writing: 3 },      // 德语：极复杂语法，中等发音
    'japanese': { grammar: 4, pronunciation: 3, writing: 5 },    // 日语：复杂语法，中等发音，三套文字
    'korean': { grammar: 4, pronunciation: 3, writing: 3 },      // 韩语：语法变位，中等发音，韩文
    'arabic': { grammar: 5, pronunciation: 4, writing: 4 },      // 阿拉伯语：极复杂语法，难发音，从右到左
    'russian': { grammar: 5, pronunciation: 4, writing: 4 },     // 俄语：复杂格变，难发音，西里尔字母
    'portuguese': { grammar: 3, pronunciation: 3, writing: 2 },  // 葡萄牙语：类似西班牙语
    'italian': { grammar: 3, pronunciation: 2, writing: 2 },     // 意大利语：相对简单
    'hindi': { grammar: 4, pronunciation: 3, writing: 4 },       // 印地语：复杂语法，天城文
    'thai': { grammar: 2, pronunciation: 5, writing: 4 },        // 泰语：简单语法，声调复杂，泰文
    'vietnamese': { grammar: 2, pronunciation: 5, writing: 3 },  // 越南语：简单语法，6个声调
    'dutch': { grammar: 3, pronunciation: 2, writing: 2 },       // 荷兰语：中等复杂度
    'swedish': { grammar: 2, pronunciation: 2, writing: 2 },     // 瑞典语：相对简单
    'polish': { grammar: 5, pronunciation: 4, writing: 3 },      // 波兰语：极复杂语法
    'turkish': { grammar: 4, pronunciation: 3, writing: 3 },     // 土耳其语：黏着语特征
    'hebrew': { grammar: 4, pronunciation: 3, writing: 4 },      // 希伯来语：词根系统，从右到左
    'finnish': { grammar: 5, pronunciation: 2, writing: 2 },     // 芬兰语：15个格变
    'hungarian': { grammar: 5, pronunciation: 3, writing: 3 },   // 匈牙利语：极复杂语法
    'norwegian': { grammar: 2, pronunciation: 2, writing: 2 },   // 挪威语：相对简单
    'danish': { grammar: 2, pronunciation: 3, writing: 2 }       // 丹麦语：简单语法，发音略难
  }
}

export class LanguageRecommendationEngine {
  private languages: Language[]

  constructor(languages: Language[]) {
    this.languages = languages
  }

  /**
   * 主推荐方法
   */
  async recommend(responses: SurveyResponses): Promise<LanguageRecommendation[]> {
    const recommendations: LanguageRecommendation[] = []

    // 为每种语言计算推荐分数
    for (const language of this.languages) {
      const recommendation = await this.calculateRecommendation(language, responses)
      recommendations.push(recommendation)
    }

    // 按匹配分数排序
    recommendations.sort((a, b) => b.matchScore - a.matchScore)

    // 添加排名
    recommendations.forEach((rec, index) => {
      rec.rank = index + 1
    })

    return recommendations
  }

  /**
   * 计算单个语言的推荐度
   */
  private async calculateRecommendation(
    language: Language,
    responses: SurveyResponses
  ): Promise<LanguageRecommendation> {

    // 1. 计算各维度分数
    const culturalScore = this.calculateCulturalMatch(language, responses)
    const difficultyScore = this.calculateDifficultyFit(language, responses)
    const goalScore = this.calculateGoalAlignment(language, responses)
    const timeScore = this.calculateTimeFeasibility(language, responses)
    const practicalScore = this.calculatePracticalValue(language, responses)

    // 2. 加权计算总分
    const matchScore = Math.round(
      culturalScore * ALGORITHM_CONFIG.weights.culturalMatch +
      difficultyScore * ALGORITHM_CONFIG.weights.difficultyFit +
      goalScore * ALGORITHM_CONFIG.weights.goalAlignment +
      timeScore * ALGORITHM_CONFIG.weights.timeFeasibility +
      practicalScore * ALGORITHM_CONFIG.weights.practicalValue
    )

    // 3. 生成推荐理由
    const reasons = this.generateReasons(
      language, responses,
      { culturalScore, difficultyScore, goalScore, timeScore, practicalScore }
    )

    // 4. 计算个性化难度
    const personalizedDifficulty = this.calculatePersonalizedDifficulty(language, responses)

    // 5. 生成学习路径
    const learningPath = this.generateLearningPath(language, responses, personalizedDifficulty)

    // 6. 分析优缺点
    const analysis = this.generateAnalysis(language, responses)

    // 7. 生成成功预测
    const successPrediction = this.generateSuccessPrediction(language, responses, personalizedDifficulty)

    return {
      language,
      personalizedDifficulty,
      matchScore,
      rank: 0, // 将在排序后设置
      dimensionScores: {
        culturalMatch: culturalScore,
        difficultyFit: difficultyScore,
        goalAlignment: goalScore,
        timeFeasibility: timeScore,
        practicalValue: practicalScore
      },
      reasons,
      learningPath,
      analysis,
      tracks: {
        intensive: { ...personalizedDifficulty, overallDifficulty: personalizedDifficulty.overallDifficulty * 0.8, timeEstimateWeeks: Math.ceil(personalizedDifficulty.timeEstimateWeeks * 0.7) },
        regular: personalizedDifficulty,
        casual: { ...personalizedDifficulty, overallDifficulty: personalizedDifficulty.overallDifficulty * 1.2, timeEstimateWeeks: Math.ceil(personalizedDifficulty.timeEstimateWeeks * 1.5) }
      },
      successPrediction
    }
  }

  /**
   * 计算文化兴趣匹配度 (0-100)
   */
  private calculateCulturalMatch(language: Language, responses: SurveyResponses): number {
    let score = 0
    let maxScore = 0

    // 基于文化兴趣区域匹配
    const culturalInterests = responses.culturalInterests || []
    maxScore += 100

    for (const interest of culturalInterests) {
      const matchingLanguages = ALGORITHM_CONFIG.culturalMapping[interest] || []
      if (matchingLanguages.includes(language.id)) {
        score += 100 / culturalInterests.length
        break
      }
    }

    return Math.min(Math.round((score / maxScore) * 100), 100)
  }

  /**
   * 计算难度适配度 (0-100)
   */
  private calculateDifficultyFit(language: Language, responses: SurveyResponses): number {
    const baseDifficulty = language.difficulty || 3
    const userPreference = responses.difficultyPreference || 3

    // 基础适配度 - 用户偏好与语言难度的匹配
    const baseMatch = 100 - Math.abs(baseDifficulty - userPreference) * 20

    // 母语相似度调整 (提升奖励上限到50分)
    let familyBonus = 0
    const nativeLanguage = responses.nativeLanguage
    if (nativeLanguage && ALGORITHM_CONFIG.languageFamilySimilarity[nativeLanguage]) {
      const similarity = ALGORITHM_CONFIG.languageFamilySimilarity[nativeLanguage][language.id] || 0
      // 非线性奖励机制：高相似度获得额外奖励
      if (similarity >= 0.6) {
        familyBonus = similarity * 60  // 高相似度语言
      } else if (similarity >= 0.3) {
        familyBonus = similarity * 50  // 中等相似度
      } else {
        familyBonus = similarity * 40  // 低相似度
      }
    }

    // 学习经验调整
    let experienceBonus = 0
    const knownLanguagesCount = responses.knownLanguages?.length || 0
    if (knownLanguagesCount > 0) {
      experienceBonus = Math.min(knownLanguagesCount * 10, 30)
    }

    const finalScore = baseMatch + familyBonus + experienceBonus
    return Math.min(Math.max(Math.round(finalScore), 0), 100)
  }

  /**
   * 计算学习目标匹配度 (0-100) - 使用预设评分体系
   */
  private calculateGoalAlignment(language: Language, responses: SurveyResponses): number {
    let score = 0
    let maxScore = 0

    // 主要学习目标匹配 (使用预设评分)
    const motivation = responses.motivation?.primary
    maxScore += 100

    const languageScores = ALGORITHM_CONFIG.languageMotivationScores[language.id]
    if (languageScores && motivation) {
      // 根据动机类型获取对应维度分数
      let motivationScore = 50 // 默认基础分
      switch (motivation) {
        case 'career':
          motivationScore = languageScores.business || 50
          break
        case 'travel':
          motivationScore = languageScores.travel || 50
          break
        case 'culture':
          motivationScore = languageScores.culture || 50
          break
        case 'academic':
          motivationScore = languageScores.academic || 50
          break
      }
      // 直接使用0-100分
      score += motivationScore
    } else {
      score += 50 // 基础分
    }

    return Math.round((score / maxScore) * 100)
  }

  /**
   * 计算时间可行性 (0-100)
   */
  private calculateTimeFeasibility(language: Language, responses: SurveyResponses): number {
    const dailyMinutes = responses.timeCommitment === 'intensive' ? 120 :
                        responses.timeCommitment === 'regular' ? 60 : 30

    const totalHours = language.learningTimeEstimate?.totalHours || 1000
    const timeline = responses.timeline

    // 计算需要的总天数
    const requiredDays = Math.ceil(totalHours * 60 / dailyMinutes)

    // 根据用户时间线计算可行性
    let timelineLimit: number
    switch (timeline) {
      case '3months': timelineLimit = 90; break
      case '6months': timelineLimit = 180; break
      case '1year': timelineLimit = 365; break
      case '2years': timelineLimit = 730; break
      case 'no_rush': timelineLimit = 1095; break
      default: timelineLimit = 365
    }

    // 可行性分数
    const feasibilityRatio = timelineLimit / requiredDays
    if (feasibilityRatio >= 1.5) return 100
    if (feasibilityRatio >= 1.2) return 80
    if (feasibilityRatio >= 1.0) return 60
    if (feasibilityRatio >= 0.8) return 40
    if (feasibilityRatio >= 0.6) return 20
    return 10
  }

  /**
   * 计算实用价值 (0-100)
   */
  private calculatePracticalValue(language: Language, responses: SurveyResponses): number {
    let score = 0

    // 使用人数 (60%)
    const speakers = language.speakers?.total || 0
    if (speakers > 1000000000) score += 60
    else if (speakers > 500000000) score += 50
    else if (speakers > 100000000) score += 40
    else if (speakers > 50000000) score += 30
    else score += 20

    // 地理覆盖 (40%)
    const regions = language.regions?.length || 0
    score += Math.min(regions * 4, 40)

    return Math.min(score, 100)
  }

  /**
   * 生成推荐理由
   */
  private generateReasons(
    language: Language,
    responses: SurveyResponses,
    scores: { culturalScore: number, difficultyScore: number, goalScore: number, timeScore: number, practicalScore: number }
  ) {
    const primary: RecommendationReason[] = []
    const secondary: RecommendationReason[] = []
    const warnings: string[] = []

    // 主要理由 (分数>70的维度)
    if (scores.culturalScore > 70) {
      primary.push({
        type: 'cultural_interest',
        description: `与您的文化兴趣高度匹配 (${scores.culturalScore}%)`,
        score: scores.culturalScore,
        weight: ALGORITHM_CONFIG.weights.culturalMatch
      })
    }

    if (scores.difficultyScore > 70) {
      primary.push({
        type: 'difficulty_match',
        description: `难度水平符合您的学习偏好 (${scores.difficultyScore}%)`,
        score: scores.difficultyScore,
        weight: ALGORITHM_CONFIG.weights.difficultyFit
      })
    }

    if (scores.goalScore > 70) {
      primary.push({
        type: 'practical_value',
        description: `与您的学习目标高度契合 (${scores.goalScore}%)`,
        score: scores.goalScore,
        weight: ALGORITHM_CONFIG.weights.goalAlignment
      })
    }

    // 次要理由 (分数50-70的维度)
    if (scores.timeScore >= 50 && scores.timeScore <= 70) {
      secondary.push({
        type: 'time_feasible',
        description: `在您的时间范围内可以掌握 (${scores.timeScore}%)`,
        score: scores.timeScore,
        weight: ALGORITHM_CONFIG.weights.timeFeasibility
      })
    }

    // 警告 (分数<50的维度)
    if (scores.timeScore < 50) {
      warnings.push('根据您的时间安排，可能需要更长时间才能达到预期水平')
    }

    if (scores.difficultyScore < 50) {
      warnings.push('该语言的难度可能不太符合您的偏好')
    }

    return { primary, secondary, warnings }
  }

  /**
   * 获取母语基准数据
   */
  private getNativeLanguageBaseline(nativeLanguage: string | undefined): { grammar: number, pronunciation: number, writing: number } {
    if (!nativeLanguage || !ALGORITHM_CONFIG.nativeLanguageBaselines[nativeLanguage]) {
      // 默认返回中等难度基准
      return { grammar: 3, pronunciation: 3, writing: 3 }
    }
    return ALGORITHM_CONFIG.nativeLanguageBaselines[nativeLanguage]
  }

  /**
   * 计算个性化难度
   */
  private calculatePersonalizedDifficulty(language: Language, responses: SurveyResponses): PersonalizedDifficulty {
    const baseDifficulty = language.difficulty || 3
    let overallDifficulty = baseDifficulty

    // 获取目标语言的难度分析数据
    const targetGrammar = language.difficultyAnalysis?.grammar || baseDifficulty
    const targetPronunciation = language.difficultyAnalysis?.pronunciation || baseDifficulty
    const targetWriting = language.difficultyAnalysis?.writing || baseDifficulty

    // 获取用户母语基准
    const nativeBaseline = this.getNativeLanguageBaseline(responses.nativeLanguage)

    // 计算各个影响因子 (基于真实数据对比)
    const nativeLanguage = responses.nativeLanguage
    const familyRelation = nativeLanguage && ALGORITHM_CONFIG.languageFamilySimilarity[nativeLanguage]
      ? -(ALGORITHM_CONFIG.languageFamilySimilarity[nativeLanguage][language.id] || 0) * 0.5
      : 0

    // 根据语言学习经验调整文字系统难度
    const knownLanguagesCount = responses.knownLanguages?.length || 0
    const writingSystemBase = (targetWriting - nativeBaseline.writing) * 0.12 // 标准化到合理范围
    const writingSystem = writingSystemBase - (knownLanguagesCount > 0 ? 0.2 : 0) // 学习经验奖励

    // 基于真实数据的语法和发音对比
    const grammar = (targetGrammar - nativeBaseline.grammar) * 0.15  // 语法复杂度差异
    const phonetics = (targetPronunciation - nativeBaseline.pronunciation) * 0.1  // 发音难度差异

    // 应用调整
    overallDifficulty += familyRelation + writingSystem + grammar + phonetics
    overallDifficulty = Math.max(1, Math.min(5, overallDifficulty))

    // 计算时间估算 (周)
    const baseHours = language.learningTimeEstimate?.totalHours || 1000
    const dailyMinutes = responses.timeCommitment === 'intensive' ? 120 :
                        responses.timeCommitment === 'regular' ? 60 : 30
    const timeEstimateWeeks = Math.ceil(baseHours * 60 / (dailyMinutes * 7))

    // 置信度计算
    const confidence = Math.max(0.6, Math.min(0.95, 1 - Math.abs(overallDifficulty - baseDifficulty) * 0.2))

    // 生成理由 (基于具体的难度对比)
    const reasons = []
    if (familyRelation < -0.1) reasons.push('母语相似性降低了学习难度')
    if (writingSystemBase < -0.1) reasons.push(`文字系统比母语简单(${targetWriting} vs ${nativeBaseline.writing})`)
    if (writingSystemBase > 0.1) reasons.push(`文字系统比母语复杂(${targetWriting} vs ${nativeBaseline.writing})`)
    if (knownLanguagesCount > 0) reasons.push('已有语言学习经验提供优势')
    if (grammar < -0.1) reasons.push(`语法结构比母语简单(${targetGrammar} vs ${nativeBaseline.grammar})`)
    if (grammar > 0.1) reasons.push(`语法结构比母语复杂(${targetGrammar} vs ${nativeBaseline.grammar})`)
    if (phonetics < -0.1) reasons.push(`发音系统比母语简单(${targetPronunciation} vs ${nativeBaseline.pronunciation})`)
    if (phonetics > 0.1) reasons.push(`发音系统比母语复杂(${targetPronunciation} vs ${nativeBaseline.pronunciation})`)
    if (overallDifficulty < baseDifficulty) reasons.push('个人背景优势使学习更容易')
    if (overallDifficulty > baseDifficulty) reasons.push('需要克服一些额外挑战')

    return {
      overallDifficulty,
      timeEstimateWeeks,
      breakdown: {
        familyRelation,
        writingSystem,
        grammar,
        phonetics
      },
      confidence,
      reasons
    }
  }

  /**
   * 生成难度说明
   */
  private generateDifficultyExplanation(base: number, adjusted: number): string {
    const diff = adjusted - base
    if (Math.abs(diff) < 0.1) return '标准难度'
    if (diff > 0) return `比标准难度稍高 (+${diff.toFixed(1)})`
    return `比标准难度稍低 (${diff.toFixed(1)})`
  }

  /**
   * 生成学习路径
   */
  private generateLearningPath(language: Language, responses: SurveyResponses, difficulty: any): LearningPath {
    const phases = this.generateLearningPhases(language, responses, difficulty)

    return {
      phases,
      totalDuration: this.calculateTotalDuration(phases),
      difficultyProgression: phases.map(p => difficulty.adjustedDifficulty),
      recommendedSchedule: this.generateSchedule(responses)
    }
  }

  /**
   * 生成学习阶段
   */
  private generateLearningPhases(language: Language, responses: SurveyResponses, difficulty: any) {
    return [
      {
        name: '入门阶段',
        duration: '1-3个月',
        goals: ['掌握基础语法', '学习常用词汇', '进行简单对话'],
        milestones: ['掌握500个常用词', '完成自我介绍', '理解简单对话'],
        resources: ['基础教材', '语音练习', '词汇卡片'],
        assessments: ['词汇测试', '发音评估', '对话练习']
      },
      {
        name: '进阶阶段',
        duration: '3-8个月',
        goals: ['扩展词汇量', '掌握复杂语法', '提升听说能力'],
        milestones: ['掌握2000个词汇', '进行日常对话', '理解慢速语音'],
        resources: ['进阶教材', '听力材料', '对话练习'],
        assessments: ['语法测试', '听力测试', '口语评估']
      },
      {
        name: '精通阶段',
        duration: '8个月以上',
        goals: ['达到流利水平', '文化深度理解', '专业领域应用'],
        milestones: ['掌握5000+词汇', '流利对话', '阅读原版内容'],
        resources: ['原版材料', '文化内容', '专业资源'],
        assessments: ['综合能力测试', '文化理解测试', '实践应用评估']
      }
    ]
  }

  /**
   * 计算总学习时长
   */
  private calculateTotalDuration(phases: any[]): string {
    return '6个月 - 2年'
  }

  /**
   * 生成推荐学习计划
   */
  private generateSchedule(responses: SurveyResponses) {
    const timeCommitment = responses.timeCommitment || 'regular'

    switch (timeCommitment) {
      case 'intensive':
        return { hoursPerWeek: 10, studyDays: 6, sessionLength: 90, restDays: ['周日'] }
      case 'regular':
        return { hoursPerWeek: 5, studyDays: 4, sessionLength: 60, restDays: ['周六', '周日'] }
      case 'casual':
        return { hoursPerWeek: 3, studyDays: 3, sessionLength: 45, restDays: ['周末'] }
      default:
        return { hoursPerWeek: 5, studyDays: 4, sessionLength: 60, restDays: ['周六', '周日'] }
    }
  }

  /**
   * 生成优缺点分析
   */
  private generateAnalysis(language: Language, responses: SurveyResponses) {
    const pros: string[] = []
    const cons: string[] = []

    // 基于语言特征的优缺点
    if (language.difficulty <= 2) {
      pros.push('相对容易学习，入门门槛较低')
    } else if (language.difficulty >= 4) {
      cons.push('学习难度较高，需要更多时间和耐心')
    }

    if (language.speakers?.total && language.speakers.total > 500000000) {
      pros.push('使用人数众多，资源丰富')
    }

    if (language.tags?.includes('商务')) {
      pros.push('商务价值高，职业发展机会多')
    }

    return {
      pros,
      cons,
      alternatives: {
        easier: this.findAlternatives(language, 'easier'),
        similar: this.findAlternatives(language, 'similar'),
        harder: this.findAlternatives(language, 'harder')
      }
    }
  }

  /**
   * 查找替代语言
   */
  private findAlternatives(language: Language, type: 'easier' | 'similar' | 'harder'): string[] {
    const currentDifficulty = language.difficulty || 3
    let targetDifficulties: number[]

    switch (type) {
      case 'easier':
        targetDifficulties = [currentDifficulty - 2, currentDifficulty - 1]
        break
      case 'similar':
        targetDifficulties = [currentDifficulty]
        break
      case 'harder':
        targetDifficulties = [currentDifficulty + 1, currentDifficulty + 2]
        break
    }

    return this.languages
      .filter(l => l.id !== language.id && targetDifficulties.includes(l.difficulty || 3))
      .slice(0, 3)
      .map(l => l.name)
  }

  /**
   * 生成成功预测
   */
  private generateSuccessPrediction(language: Language, responses: SurveyResponses, difficulty: any) {
    // 基于多个因子计算成功概率
    let probability = 0.7 // 基础概率

    // 难度适配调整
    const difficultyGap = Math.abs(difficulty.adjustedDifficulty - (responses.difficultyPreference || 3))
    probability -= difficultyGap * 0.1

    // 时间承诺调整
    if (responses.timeCommitment === 'intensive') probability += 0.15
    else if (responses.timeCommitment === 'casual') probability -= 0.1

    // 动机强度调整
    if (responses.motivation?.commitment && responses.motivation.commitment >= 4) probability += 0.1

    probability = Math.max(0.3, Math.min(0.95, probability))

    return {
      probability,
      timeline: this.predictTimeline(language, responses),
      challengePoints: this.identifyChallengePoints(language, responses),
      supportNeeded: this.identifySupportNeeded(language, responses)
    }
  }

  private predictTimeline(language: Language, responses: SurveyResponses): string {
    const baseHours = language.learningTimeEstimate?.totalHours || 1000
    const dailyMinutes = responses.timeCommitment === 'intensive' ? 120 :
                        responses.timeCommitment === 'regular' ? 60 : 30

    const months = Math.ceil(baseHours * 60 / (dailyMinutes * 30))

    if (months <= 6) return '6个月内'
    if (months <= 12) return '1年内'
    if (months <= 24) return '2年内'
    return '2年以上'
  }

  private identifyChallengePoints(language: Language, responses: SurveyResponses): string[] {
    const challenges: string[] = []

    if (language.difficulty >= 4) challenges.push('语法复杂度较高')
    if (language.writingSystem?.includes('chinese')) challenges.push('文字系统学习')
    if (!responses.culturalInterests?.some(i => language.tags?.includes(i))) {
      challenges.push('文化背景理解')
    }

    return challenges
  }

  private identifySupportNeeded(language: Language, responses: SurveyResponses): string[] {
    const support: string[] = []

    if (responses.timeCommitment === 'casual') support.push('学习计划制定')
    if (language.difficulty >= 4) support.push('专业指导')
    support.push('学习社区交流')

    return support
  }
}

/**
 * 工厂函数：创建推荐引擎实例
 */
export function createRecommendationEngine(languages: Language[]): LanguageRecommendationEngine {
  return new LanguageRecommendationEngine(languages)
}

/**
 * 快速推荐函数
 */
export async function getLanguageRecommendations(
  languages: Language[],
  responses: SurveyResponses
): Promise<LanguageRecommendation[]> {
  const engine = createRecommendationEngine(languages)
  return await engine.recommend(responses)
}
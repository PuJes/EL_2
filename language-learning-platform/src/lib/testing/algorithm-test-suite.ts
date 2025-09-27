/**
 * 推荐算法测试套件
 * 用于验证推荐算法的准确性和有效性
 */

import { LanguageRecommendationEngine } from '../recommendation/recommendation-algorithm'
import { convertSurveyData } from '../utils/survey-data-converter'
import type { Language } from '../types/language'
import type { SurveyResponses, LanguageRecommendation } from '../types/survey'

// 测试用例类型
interface TestCase {
  id: string
  name: string
  description: string
  input: {
    nativeLanguage: string
    learningPurpose: string
    culturalInterest: string
    languageExperience: string
    timeExpectation: string
    timeCommitment: 'casual' | 'regular' | 'intensive'
  }
  expectedResults: {
    topLanguageId: string
    shouldInclude: string[]
    shouldExclude?: string[]
    minMatchScore: number
    maxDifficulty?: number
  }
}

// 测试结果类型
interface TestResult {
  testCase: TestCase
  actualResults: LanguageRecommendation[]
  passed: boolean
  score: number
  issues: string[]
}

export class AlgorithmTestSuite {
  private engine: LanguageRecommendationEngine
  private languages: Language[] = []

  constructor() {
    this.loadLanguages()
  }

  private async loadLanguages() {
    try {
      const { languages } = await import('../../data/languages/languages.json')
      this.languages = languages
      this.engine = new LanguageRecommendationEngine(languages)
    } catch (error) {
      console.error('Failed to load languages for testing:', error)
    }
  }

  /**
   * 预定义测试用例
   */
  private getTestCases(): TestCase[] {
    return [
      {
        id: 'chinese-cultural-interest',
        name: '中文母语用户 - 文化兴趣导向',
        description: '中文母语，对东亚文化感兴趣，希望学习相关语言',
        input: {
          nativeLanguage: 'chinese',
          learningPurpose: 'cultural_interest',
          culturalInterest: 'east_asia',
          languageExperience: 'basic_english',
          timeExpectation: '6_months',
          timeCommitment: 'regular'
        },
        expectedResults: {
          topLanguageId: 'japanese',
          shouldInclude: ['japanese', 'korean'],
          shouldExclude: ['arabic'],
          minMatchScore: 80,
          maxDifficulty: 3.5
        }
      },
      {
        id: 'english-business-focus',
        name: '英文母语用户 - 商务发展',
        description: '英文母语，职业发展需求，希望学习商务价值高的语言',
        input: {
          nativeLanguage: 'english',
          learningPurpose: 'career_development',
          culturalInterest: 'europe',
          languageExperience: 'multiple_languages',
          timeExpectation: '1_year_plus',
          timeCommitment: 'intensive'
        },
        expectedResults: {
          topLanguageId: 'chinese',
          shouldInclude: ['chinese', 'spanish', 'german'],
          minMatchScore: 75,
          maxDifficulty: 4.0
        }
      },
      {
        id: 'beginner-easy-language',
        name: '零基础用户 - 简单语言',
        description: '完全零基础，希望学习相对简单的语言',
        input: {
          nativeLanguage: 'chinese',
          learningPurpose: 'personal_interest',
          culturalInterest: 'europe',
          languageExperience: 'complete_beginner',
          timeExpectation: '1_3_months',
          timeCommitment: 'casual'
        },
        expectedResults: {
          topLanguageId: 'spanish',
          shouldInclude: ['spanish', 'italian'],
          shouldExclude: ['japanese', 'arabic'],
          minMatchScore: 70,
          maxDifficulty: 2.5
        }
      },
      {
        id: 'travel-focused-learner',
        name: '旅行导向用户',
        description: '主要为旅行交流，需要实用性强的语言',
        input: {
          nativeLanguage: 'chinese',
          learningPurpose: 'travel_communication',
          culturalInterest: 'latin_america',
          languageExperience: 'fluent_english',
          timeExpectation: '6_months',
          timeCommitment: 'regular'
        },
        expectedResults: {
          topLanguageId: 'spanish',
          shouldInclude: ['spanish', 'portuguese'],
          minMatchScore: 85,
          maxDifficulty: 3.0
        }
      },
      {
        id: 'time-constrained-learner',
        name: '时间紧张用户',
        description: '希望快速见效，时间投入有限',
        input: {
          nativeLanguage: 'chinese',
          learningPurpose: 'cultural_interest',
          culturalInterest: 'east_asia',
          languageExperience: 'basic_english',
          timeExpectation: '1_3_months',
          timeCommitment: 'casual'
        },
        expectedResults: {
          topLanguageId: 'korean',
          shouldInclude: ['korean'],
          shouldExclude: ['chinese', 'arabic'],
          minMatchScore: 75,
          maxDifficulty: 3.2
        }
      }
    ]
  }

  /**
   * 运行单个测试用例
   */
  private async runTestCase(testCase: TestCase): Promise<TestResult> {
    const issues: string[] = []

    // 构建问卷数据
    const surveyData = this.buildSurveyData(testCase.input)

    // 运行推荐算法
    const recommendations = await this.engine.recommend(surveyData)

    // 验证结果
    let score = 100
    let passed = true

    // 1. 验证顶部推荐
    if (recommendations.length > 0) {
      const topRecommendation = recommendations[0]
      if (topRecommendation.language.id !== testCase.expectedResults.topLanguageId) {
        issues.push(`期望顶部推荐: ${testCase.expectedResults.topLanguageId}, 实际: ${topRecommendation.language.id}`)
        score -= 30
        passed = false
      }
    } else {
      issues.push('没有生成任何推荐结果')
      score = 0
      passed = false
    }

    // 2. 验证必须包含的语言
    const recommendedIds = recommendations.map(r => r.language.id)
    for (const shouldInclude of testCase.expectedResults.shouldInclude) {
      if (!recommendedIds.includes(shouldInclude)) {
        issues.push(`应该包含语言 ${shouldInclude} 但未找到`)
        score -= 15
        passed = false
      }
    }

    // 3. 验证应该排除的语言
    if (testCase.expectedResults.shouldExclude) {
      for (const shouldExclude of testCase.expectedResults.shouldExclude) {
        if (recommendedIds.slice(0, 3).includes(shouldExclude)) {
          issues.push(`不应该在前3推荐中包含 ${shouldExclude}`)
          score -= 10
        }
      }
    }

    // 4. 验证匹配分数
    if (recommendations.length > 0) {
      const topScore = recommendations[0].matchScore
      if (topScore < testCase.expectedResults.minMatchScore) {
        issues.push(`顶部推荐分数 ${topScore} 低于期望的 ${testCase.expectedResults.minMatchScore}`)
        score -= 20
        passed = false
      }
    }

    // 5. 验证难度合理性
    if (testCase.expectedResults.maxDifficulty && recommendations.length > 0) {
      const topDifficulty = recommendations[0].personalizedDifficulty.overallDifficulty
      if (topDifficulty > testCase.expectedResults.maxDifficulty) {
        issues.push(`顶部推荐难度 ${topDifficulty} 超过期望的 ${testCase.expectedResults.maxDifficulty}`)
        score -= 15
      }
    }

    return {
      testCase,
      actualResults: recommendations,
      passed,
      score: Math.max(0, score),
      issues
    }
  }

  /**
   * 构建测试用的问卷数据
   */
  private buildSurveyData(input: TestCase['input']): SurveyResponses {
    const frontendData = {
      answers: [
        { questionId: 'q3_native_language', answer: input.nativeLanguage },
        { questionId: 'q4_language_experience', answer: input.languageExperience },
        { questionId: 'q5_learning_purpose', answer: input.learningPurpose },
        { questionId: 'q6_time_expectation', answer: input.timeExpectation },
        { questionId: 'q7_cultural_interest', answer: input.culturalInterest }
      ],
      nativeLanguage: input.nativeLanguage,
      languageExperience: input.languageExperience,
      learningPurpose: input.learningPurpose,
      timeExpectation: input.timeExpectation,
      culturalInterest: input.culturalInterest
    }

    return convertSurveyData(frontendData)
  }

  /**
   * 运行完整测试套件
   */
  async runFullTestSuite(): Promise<{
    results: TestResult[]
    summary: {
      totalTests: number
      passedTests: number
      failedTests: number
      averageScore: number
      overallPassed: boolean
    }
  }> {
    if (!this.engine || this.languages.length === 0) {
      await this.loadLanguages()
    }

    const testCases = this.getTestCases()
    const results: TestResult[] = []

    console.log('🧪 开始运行推荐算法测试套件...')

    for (const testCase of testCases) {
      console.log(`📋 运行测试: ${testCase.name}`)
      const result = await this.runTestCase(testCase)
      results.push(result)

      if (result.passed) {
        console.log(`✅ ${testCase.name} - 通过 (分数: ${result.score})`)
      } else {
        console.log(`❌ ${testCase.name} - 失败 (分数: ${result.score})`)
        result.issues.forEach(issue => console.log(`   ⚠️  ${issue}`))
      }
    }

    const passedTests = results.filter(r => r.passed).length
    const totalTests = results.length
    const averageScore = results.reduce((sum, r) => sum + r.score, 0) / totalTests
    const overallPassed = passedTests >= totalTests * 0.8 && averageScore >= 80

    const summary = {
      totalTests,
      passedTests,
      failedTests: totalTests - passedTests,
      averageScore: Math.round(averageScore),
      overallPassed
    }

    console.log('\n📊 测试套件总结:')
    console.log(`   总测试数: ${totalTests}`)
    console.log(`   通过数: ${passedTests}`)
    console.log(`   失败数: ${summary.failedTests}`)
    console.log(`   平均分数: ${summary.averageScore}`)
    console.log(`   整体状态: ${overallPassed ? '✅ 通过' : '❌ 需要改进'}`)

    return { results, summary }
  }

  /**
   * 测试算法一致性
   */
  async testConsistency(): Promise<{
    consistent: boolean
    variance: number
    details: Array<{
      testCase: string
      runs: number[]
      variance: number
    }>
  }> {
    console.log('🔄 测试算法一致性...')

    const testCase = this.getTestCases()[0]
    const results: number[] = []
    const details: Array<{
      testCase: string
      runs: number[]
      variance: number
    }> = []

    // 运行同一测试用例10次
    for (let i = 0; i < 10; i++) {
      const result = await this.runTestCase(testCase)
      if (result.actualResults.length > 0) {
        results.push(result.actualResults[0].matchScore)
      }
    }

    const mean = results.reduce((sum, score) => sum + score, 0) / results.length
    const variance = results.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / results.length

    details.push({
      testCase: testCase.name,
      runs: results,
      variance: Math.round(variance * 100) / 100
    })

    const consistent = variance < 5 // 方差小于5表示一致性良好

    console.log(`   测试用例: ${testCase.name}`)
    console.log(`   10次运行分数: ${results.join(', ')}`)
    console.log(`   平均分数: ${Math.round(mean)}`)
    console.log(`   方差: ${Math.round(variance * 100) / 100}`)
    console.log(`   一致性: ${consistent ? '✅ 良好' : '⚠️ 需要改进'}`)

    return { consistent, variance, details }
  }

  /**
   * 性能测试
   */
  async testPerformance(): Promise<{
    averageTime: number
    maxTime: number
    minTime: number
    performanceGrade: 'A' | 'B' | 'C' | 'D'
  }> {
    console.log('⚡ 测试算法性能...')

    const testCase = this.getTestCases()[0]
    const times: number[] = []

    // 运行性能测试10次
    for (let i = 0; i < 10; i++) {
      const startTime = Date.now()
      await this.runTestCase(testCase)
      const endTime = Date.now()
      times.push(endTime - startTime)
    }

    const averageTime = times.reduce((sum, time) => sum + time, 0) / times.length
    const maxTime = Math.max(...times)
    const minTime = Math.min(...times)

    let performanceGrade: 'A' | 'B' | 'C' | 'D'
    if (averageTime < 100) performanceGrade = 'A'
    else if (averageTime < 200) performanceGrade = 'B'
    else if (averageTime < 500) performanceGrade = 'C'
    else performanceGrade = 'D'

    console.log(`   平均响应时间: ${Math.round(averageTime)}ms`)
    console.log(`   最大响应时间: ${maxTime}ms`)
    console.log(`   最小响应时间: ${minTime}ms`)
    console.log(`   性能等级: ${performanceGrade}`)

    return { averageTime, maxTime, minTime, performanceGrade }
  }
}

/**
 * 便利函数：运行完整测试
 */
export async function runAlgorithmTests() {
  const testSuite = new AlgorithmTestSuite()

  console.log('🚀 启动推荐算法全面测试\n')

  // 运行功能测试
  const functionalTests = await testSuite.runFullTestSuite()

  // 运行一致性测试
  const consistencyTest = await testSuite.testConsistency()

  // 运行性能测试
  const performanceTest = await testSuite.testPerformance()

  // 生成综合评估
  const overallScore = (
    (functionalTests.summary.averageScore * 0.6) +
    (consistencyTest.consistent ? 20 : 10) +
    (performanceTest.performanceGrade === 'A' ? 20 :
     performanceTest.performanceGrade === 'B' ? 15 :
     performanceTest.performanceGrade === 'C' ? 10 : 5)
  )

  console.log('\n🏆 算法综合评估:')
  console.log(`   功能准确性: ${functionalTests.summary.averageScore}/100 (权重60%)`)
  console.log(`   算法一致性: ${consistencyTest.consistent ? '✅' : '❌'} (权重20%)`)
  console.log(`   响应性能: ${performanceTest.performanceGrade} (权重20%)`)
  console.log(`   综合得分: ${Math.round(overallScore)}/100`)
  console.log(`   算法等级: ${overallScore >= 90 ? 'A优秀' : overallScore >= 80 ? 'B良好' : overallScore >= 70 ? 'C及格' : 'D需改进'}`)

  return {
    functional: functionalTests,
    consistency: consistencyTest,
    performance: performanceTest,
    overallScore: Math.round(overallScore)
  }
}
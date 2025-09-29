/**
 * Language related type definitions
 */

export interface Language {
  id: string
  name: string
  nativeName: string
  flag: string
  description: string
  difficulty: number
  speakers: {
    total: number
    native?: number
    secondary?: number
  }
  tags: string[]
  family: string
  script: string
  regions: string[]
  difficultyAnalysis?: {
    grammar: number
    pronunciation: number
    writing: number
    vocabulary: number
  }
  learningTimeEstimate?: {
    totalHours: number
    basic: number
    intermediate: number
    advanced: number
  }
  writingSystem?: string[]
}

export interface PersonalizedDifficulty {
  overallDifficulty: number
  timeEstimateWeeks: number
  breakdown: {
    familyRelation: number
    writingSystem: number
    grammar: number
    phonetics: number
  }
  confidence: number
  reasons: string[]
}

export interface DifficultyFactors {
  grammar: number
  pronunciation: number
  vocabulary: number
  writing: number
}
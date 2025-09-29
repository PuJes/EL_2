/**
 * Survey related type definitions
 */

export interface SurveyResponses {
  userSource?: string
  contentInterest?: string
  nativeLanguage?: string
  knownLanguages?: string[]
  languageExperience?: string
  motivation?: {
    primary: string
    commitment?: number
  }
  timeline?: string
  culturalInterests?: string[]
  learningStyle?: string
  persistence?: string
  difficultyPreference?: number
  timeCommitment?: string
}

export interface LanguageRecommendation {
  language: import('./language').Language
  personalizedDifficulty: import('./language').PersonalizedDifficulty
  matchScore: number
  rank: number
  dimensionScores: {
    culturalMatch: number
    difficultyFit: number
    goalAlignment: number
    timeFeasibility: number
    practicalValue: number
  }
  reasons: {
    primary: RecommendationReason[]
    secondary: RecommendationReason[]
    warnings: string[]
  }
  learningPath: LearningPath
  analysis: LanguageAnalysis
  tracks: {
    intensive: import('./language').PersonalizedDifficulty
    regular: import('./language').PersonalizedDifficulty
    casual: import('./language').PersonalizedDifficulty
  }
  successPrediction: SuccessPrediction
}

export interface RecommendationReason {
  type: string
  description: string
  score: number
  weight: number
}

export interface LearningPath {
  phases: LearningPhase[]
  totalDuration: string
  difficultyProgression: number[]
  recommendedSchedule: StudySchedule
}

export interface LearningPhase {
  name: string
  duration: string
  goals: string[]
  milestones: string[]
  resources: string[]
  assessments: string[]
}

export interface StudySchedule {
  hoursPerWeek: number
  studyDays: number
  sessionLength: number
  restDays: string[]
}

export interface LanguageAnalysis {
  pros: string[]
  cons: string[]
  alternatives: {
    easier: string[]
    similar: string[]
    harder: string[]
  }
}

export interface SuccessPrediction {
  probability: number
  timeline: string
  challengePoints: string[]
  supportNeeded: string[]
}
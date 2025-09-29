/**
 * Survey data converter utility
 * Converts survey data from frontend format to algorithm format
 */

import type { SurveyResponses } from '../types/survey'

interface SurveyData {
  answers: Array<{
    questionId: string
    answer: string
    weight?: number
  }>
  userSource?: string
  contentInterest?: string
  nativeLanguage?: string
  languageExperience?: string
  learningPurpose?: string
  timeExpectation?: string
  culturalInterest?: string | string[]
  learningStyle?: string
  persistence?: string
  difficultyPreference?: string
  dailyTime?: string
}

export function convertSurveyDataToResponses(surveyData: SurveyData): SurveyResponses {
  // Parse cultural interests
  let culturalInterests: string[] = []
  if (surveyData.culturalInterest) {
    try {
      culturalInterests = typeof surveyData.culturalInterest === 'string'
        ? JSON.parse(surveyData.culturalInterest)
        : surveyData.culturalInterest
    } catch {
      culturalInterests = []
    }
  }

  // Convert difficulty preference from string to number
  const difficultyPreference = surveyData.difficultyPreference
    ? parseInt(surveyData.difficultyPreference)
    : 3

  // Map learning purpose to motivation
  let motivation = undefined
  if (surveyData.learningPurpose) {
    motivation = {
      primary: surveyData.learningPurpose,
      commitment: 4 // Default commitment level
    }
  }

  // Map time expectation to timeline
  const timelineMapping: Record<string, string> = {
    '3months': '3months',
    '6months': '6months',
    '1year': '1year',
    '2years': '2years',
    'no_rush': 'no_rush'
  }

  // Map daily time to time commitment
  const timeCommitmentMapping: Record<string, string> = {
    'intensive': 'intensive',
    'regular': 'regular',
    'light': 'light',
    'irregular': 'light'
  }

  return {
    userSource: surveyData.userSource,
    contentInterest: surveyData.contentInterest,
    nativeLanguage: surveyData.nativeLanguage,
    knownLanguages: [], // Could be derived from languageExperience
    languageExperience: surveyData.languageExperience,
    motivation,
    timeline: surveyData.timeExpectation ? timelineMapping[surveyData.timeExpectation] : undefined,
    culturalInterests,
    learningStyle: surveyData.learningStyle,
    persistence: surveyData.persistence,
    difficultyPreference,
    timeCommitment: surveyData.dailyTime ? timeCommitmentMapping[surveyData.dailyTime] : 'regular'
  }
}
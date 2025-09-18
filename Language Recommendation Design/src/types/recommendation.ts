export interface UserProfile {
  nativeLanguage: string;
  motivation: string;
  timeCommitment: string;
  experience: string;
  culturalInterests: string[];
  learningType: string;
  intensity: string;
  tags: string[];
}

export interface LanguageRecommendation {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  matchPercentage: number;
  difficulty: DifficultyLevel;
  estimatedTime: string;
  reasonTitle: string;
  reasonDescription: string;
  highlights: LanguageHighlight[];
  isPrimary?: boolean;
}

export interface DifficultyLevel {
  stars: number;
  label: string;
  description: string;
}

export interface LanguageHighlight {
  type: 'speakers' | 'regions' | 'culture';
  title: string;
  value: string;
}

export interface RecommendationAlgorithm {
  difficultyWeight: number;
  motivationWeight: number;
  cultureWeight: number;
  timeWeight: number;
}

export interface FeedbackOption {
  id: string;
  emoji: string;
  label: string;
  value: number;
}
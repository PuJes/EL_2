import type { Locale, TranslationKeys } from '@/types/i18n'
import { zh } from './zh'
import { en } from './en'

export const translations: Record<Locale, TranslationKeys> = {
  zh,
  en,
}

export function getTranslations(locale: Locale): TranslationKeys {
  return translations[locale] || translations.zh
}
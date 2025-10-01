import { useLanguageStore } from '@/store/language'
import { getTranslations } from '@/locales'

export function useTranslation() {
  const locale = useLanguageStore((state) => state.locale)
  const setLocale = useLanguageStore((state) => state.setLocale)
  const t = getTranslations(locale)

  return {
    t,
    locale,
    setLocale,
  }
}
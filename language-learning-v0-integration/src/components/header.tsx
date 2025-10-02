'use client'

import * as React from "react"
import Link from "next/link"
import { Globe, Menu, ArrowLeft, Languages } from "lucide-react"
import { usePathname } from "next/navigation"
import { useTranslation } from "@/hooks/useTranslation"
import type { Locale } from "@/types/i18n"

// UI Components
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'outline' | 'ghost'
    size?: 'sm' | 'default' | 'lg'
    asChild?: boolean
  }
>(({ className = '', variant = 'default', size = 'default', asChild = false, children, ...props }, ref) => {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  }

  const sizes = {
    sm: "h-9 rounded-md px-3",
    default: "h-10 px-4 py-2",
    lg: "h-11 rounded-md px-8"
  }

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`

  if (asChild) {
    return <div className={classes} ref={ref} {...props}>{children}</div>
  }

  return (
    <button className={classes} ref={ref} {...props}>
      {children}
    </button>
  )
})
Button.displayName = "Button"

// Header Theme Types
export type HeaderTheme = 'default' | 'rose' | 'culture'

interface HeaderProps {
  theme?: HeaderTheme
  fixed?: boolean
  showBackButton?: boolean
  customTitle?: string
  customSubtitle?: string
}

// Theme configurations
const themeConfig = {
  default: {
    bg: 'bg-background/90',
    border: 'border-border',
    logoColor: 'text-purple-600',
    gradient: 'from-purple-600 to-cyan-600',
    linkHover: 'hover:text-purple-600',
    buttonGradient: 'from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600'
  },
  rose: {
    bg: 'bg-white/90',
    border: 'border-pink-100',
    logoColor: 'text-rose-500',
    gradient: 'from-rose-500 to-violet-500',
    linkHover: 'hover:text-rose-500',
    buttonGradient: 'from-rose-400 to-violet-400 hover:from-rose-500 hover:to-violet-500'
  },
  culture: {
    bg: 'bg-white',
    border: 'border-gray-200',
    logoColor: 'text-purple-600',
    gradient: 'from-purple-600 to-cyan-600',
    linkHover: 'hover:text-purple-600',
    buttonGradient: 'from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600'
  }
}

// Language Switcher Component
const LanguageSwitcher: React.FC<{ config: typeof themeConfig[keyof typeof themeConfig] }> = ({ config }) => {
  const { locale, setLocale, t } = useTranslation()
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
        title={t.header.switchLanguage}
      >
        <Languages className="w-4 h-4" />
        <span className="hidden sm:inline">{locale === 'zh' ? '中文' : 'English'}</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white border border-gray-200 z-50">
          <div className="py-1">
            <button
              onClick={() => handleLocaleChange('zh')}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                locale === 'zh' ? 'bg-purple-50 text-purple-700 font-medium' : 'text-gray-700'
              }`}
            >
              中文
            </button>
            <button
              onClick={() => handleLocaleChange('en')}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                locale === 'en' ? 'bg-purple-50 text-purple-700 font-medium' : 'text-gray-700'
              }`}
            >
              English
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Main Header Component
export const Header: React.FC<HeaderProps> = ({
  theme = 'default',
  fixed = true,
  showBackButton = false,
  customTitle,
  customSubtitle
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const pathname = usePathname()
  const config = themeConfig[theme]
  const { t } = useTranslation()

  // Determine position class
  const positionClass = fixed ? 'fixed top-0 left-0 right-0 z-50' : 'relative'

  return (
    <header className={`${positionClass} ${config.bg} backdrop-blur-md border-b ${config.border}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <>
                <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                  <span>{t.common.backToHome}</span>
                </Link>
                <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
              </>
            )}

            <div className="flex items-center space-x-2">
              <Globe className={`w-8 h-8 ${config.logoColor}`} />
              {customTitle ? (
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{customTitle}</h1>
                  {customSubtitle && (
                    <p className="text-sm text-gray-600">{customSubtitle}</p>
                  )}
                </div>
              ) : (
                <span className={`text-xl font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
                  {t.header.title}
                </span>
              )}
            </div>
          </div>

          {/* Center navigation - hidden on culture page with custom title */}
          {!customTitle && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className={`text-foreground ${config.linkHover} transition-colors ${pathname === '/' ? 'font-semibold' : ''}`}
              >
                {t.common.home}
              </Link>
              <Link
                href="/survey"
                className={`text-foreground ${config.linkHover} transition-colors ${pathname === '/survey' ? 'font-semibold' : ''}`}
              >
                {t.common.languageRecommendation}
              </Link>
              <Link
                href="/culture"
                className={`text-foreground ${config.linkHover} transition-colors ${pathname === '/culture' ? 'font-semibold' : ''}`}
              >
                {t.common.cultureExploration}
              </Link>
              <Link
                href="/languages"
                className={`text-foreground ${config.linkHover} transition-colors ${pathname?.startsWith('/languages') ? 'font-semibold' : ''}`}
              >
                {t.common.languageList}
              </Link>
              <a href="#" className={`text-foreground ${config.linkHover} transition-colors`}>
                {t.common.aboutUs}
              </a>
            </nav>
          )}

          {/* Right section */}
          <div className="flex items-center space-x-2">
            <LanguageSwitcher config={config} />
            <Link href="/survey">
              <Button size="sm" className={`bg-gradient-to-r ${config.buttonGradient}`}>
                {customTitle ? t.common.startLearning : t.common.startExploring}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && !customTitle && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-card/95 backdrop-blur-md border-b border-border shadow-lg">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              <Link href="/" className={`block py-2 text-foreground ${config.linkHover} transition-colors`}>{t.common.home}</Link>
              <Link href="/survey" className={`block py-2 text-foreground ${config.linkHover} transition-colors`}>{t.common.languageRecommendation}</Link>
              <Link href="/culture" className={`block py-2 text-foreground ${config.linkHover} transition-colors`}>{t.common.cultureExploration}</Link>
              <Link href="/languages" className={`block py-2 text-foreground ${config.linkHover} transition-colors`}>{t.common.languageList}</Link>
              <a href="#" className={`block py-2 text-foreground ${config.linkHover} transition-colors`}>{t.common.aboutUs}</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
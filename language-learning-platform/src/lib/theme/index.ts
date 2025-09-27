export { colors, themeColors } from './colors'

/**
 * 语言世界主题配置
 */
export const themeConfig = {
  // 字体系统
  fonts: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    serif: ['Georgia', 'serif'],
    mono: ['JetBrains Mono', 'monospace']
  },

  // 间距系统
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
  },

  // 圆角系统
  radius: {
    none: '0',
    sm: '0.125rem',   // 2px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    full: '9999px'
  },

  // 阴影系统
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    card: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    floating: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
  },

  // 动画时长
  animations: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '800ms'
  },

  // 断点系统
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
}

/**
 * CSS 变量生成函数
 */
export function generateCSSVariables(theme: 'light' | 'dark') {
  const variables: Record<string, string> = {}

  // 添加主题颜色变量
  Object.entries(themeColors[theme]).forEach(([key, value]) => {
    variables[`--${key}`] = value
  })

  return variables
}

/**
 * Tailwind CSS 类名工具函数
 */
export const tw = {
  gradient: {
    primary: 'bg-gradient-to-r from-purple-500 via-purple-600 to-teal-500',
    hero: 'bg-gradient-to-br from-purple-50 to-teal-50',
    card: 'bg-gradient-to-br from-white to-purple-50/30',
    text: 'bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent',
    button: 'bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600'
  },

  glass: {
    card: 'bg-white/95 backdrop-blur-sm border-0 shadow-xl',
    overlay: 'bg-black/20 backdrop-blur-sm',
    nav: 'bg-white/90 backdrop-blur-md border-b border-purple-100/50'
  },

  animation: {
    fadeIn: 'animate-in fade-in duration-300',
    slideUp: 'animate-in slide-in-from-bottom-4 duration-300',
    scaleIn: 'animate-in zoom-in-95 duration-200'
  }
}
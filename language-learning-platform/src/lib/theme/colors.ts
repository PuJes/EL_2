/**
 * 语言世界品牌色彩系统
 * 基于紫色到青色的渐变主题
 */

export const colors = {
  // 主品牌色 - 紫色系
  primary: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6', // 主紫色
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
    950: '#2e1065'
  },

  // 次要品牌色 - 青色系
  secondary: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4', // 主青色
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
    950: '#083344'
  },

  // 强调色 - 绿色系
  accent: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981', // 主绿色
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22'
  },

  // 渐变定义
  gradients: {
    primary: 'from-purple-500 via-purple-600 to-teal-500',
    hero: 'from-purple-50 to-teal-50',
    card: 'from-white to-purple-50/30',
    footer: 'from-gray-900 to-gray-800',
    button: 'from-purple-500 to-teal-500',
    text: 'from-purple-600 to-teal-600'
  }
}

export const themeColors = {
  light: {
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(222.2 84% 4.9%)',

    card: 'hsl(0 0% 100%)',
    'card-foreground': 'hsl(222.2 84% 4.9%)',

    popover: 'hsl(0 0% 100%)',
    'popover-foreground': 'hsl(222.2 84% 4.9%)',

    primary: 'hsl(262.1 83.3% 57.8%)', // purple-500
    'primary-foreground': 'hsl(210 40% 98%)',

    secondary: 'hsl(187.1 85.7% 53.3%)', // teal-500
    'secondary-foreground': 'hsl(222.2 84% 4.9%)',

    muted: 'hsl(210 40% 96%)',
    'muted-foreground': 'hsl(215.4 16.3% 46.9%)',

    accent: 'hsl(159.6 81.5% 45.7%)', // green-500
    'accent-foreground': 'hsl(210 40% 98%)',

    destructive: 'hsl(0 84.2% 60.2%)',
    'destructive-foreground': 'hsl(210 40% 98%)',

    border: 'hsl(214.3 31.8% 91.4%)',
    input: 'hsl(214.3 31.8% 91.4%)',
    ring: 'hsl(262.1 83.3% 57.8%)',
  },

  dark: {
    background: 'hsl(222.2 84% 4.9%)',
    foreground: 'hsl(210 40% 98%)',

    card: 'hsl(222.2 84% 4.9%)',
    'card-foreground': 'hsl(210 40% 98%)',

    popover: 'hsl(222.2 84% 4.9%)',
    'popover-foreground': 'hsl(210 40% 98%)',

    primary: 'hsl(262.1 83.3% 57.8%)',
    'primary-foreground': 'hsl(210 40% 98%)',

    secondary: 'hsl(217.2 32.6% 17.5%)',
    'secondary-foreground': 'hsl(210 40% 98%)',

    muted: 'hsl(217.2 32.6% 17.5%)',
    'muted-foreground': 'hsl(215 20.2% 65.1%)',

    accent: 'hsl(217.2 32.6% 17.5%)',
    'accent-foreground': 'hsl(210 40% 98%)',

    destructive: 'hsl(0 62.8% 30.6%)',
    'destructive-foreground': 'hsl(210 40% 98%)',

    border: 'hsl(217.2 32.6% 17.5%)',
    input: 'hsl(217.2 32.6% 17.5%)',
    ring: 'hsl(262.1 83.3% 57.8%)',
  }
}
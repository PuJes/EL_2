'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  FileText,
  Brain,
  Globe,
  TrendingUp,
  Users,
  User,
  Menu,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useNavigationStore } from '@/store'
import { NavItem } from '@/types'

// 导航配置
const navigation: NavItem[] = [
  {
    title: '首页',
    href: '/',
    icon: 'Home',
    description: '平台首页和概览'
  },
  {
    title: '需求调研',
    href: '/survey',
    icon: 'FileText',
    description: '个性化语言学习需求问卷'
  },
  {
    title: 'AI推荐',
    href: '/recommendation',
    icon: 'Brain',
    description: '智能语言推荐系统'
  },
  {
    title: '语言列表',
    href: '/languages',
    icon: 'Globe',
    description: '浏览所有支持的语言'
  },
  {
    title: '学习进度',
    href: '/progress',
    icon: 'TrendingUp',
    description: '跟踪您的学习进度'
  },
  {
    title: '学习社区',
    href: '/community',
    icon: 'Users',
    description: '与其他学习者交流'
  },
  {
    title: '个人中心',
    href: '/profile',
    icon: 'User',
    description: '管理个人信息和设置'
  }
]

// 图标映射
const iconMap = {
  Home,
  FileText,
  Brain,
  Globe,
  TrendingUp,
  Users,
  User,
  Menu,
  X
}

interface NavigationProps {
  className?: string
}

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname()
  const { isSidebarOpen, setSidebarOpen } = useNavigationStore()

  return (
    <>
      {/* 移动端遮罩层 */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 侧边栏 */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center text-white font-bold">
              语
            </div>
            <span className="font-semibold text-lg">语言世界</span>
          </Link>

          {/* 移动端关闭按钮 */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap]
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                {Icon && <Icon className="w-5 h-5" />}
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>

        {/* 底部信息 */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 space-y-1">
            <p>语言世界 v1.0</p>
            <p>V0.dev 集成框架</p>
          </div>
        </div>
      </aside>
    </>
  )
}

// 顶部导航栏
interface TopBarProps {
  title?: string
  className?: string
}

export function TopBar({ title, className }: TopBarProps) {
  const { setSidebarOpen, pageTitle } = useNavigationStore()

  return (
    <header className={cn("h-16 bg-white border-b border-gray-200", className)}>
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* 左侧 */}
        <div className="flex items-center space-x-4">
          {/* 移动端菜单按钮 */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* 页面标题 */}
          <h1 className="text-lg font-semibold text-gray-900">
            {title || pageTitle || '语言世界'}
          </h1>
        </div>

        {/* 右侧 */}
        <div className="flex items-center space-x-4">
          {/* 这里可以添加用户头像、通知等 */}
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-purple-600" />
          </div>
        </div>
      </div>
    </header>
  )
}

// 面包屑导航
interface BreadcrumbsProps {
  items: Array<{ label: string; href: string }>
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn("flex items-center space-x-2 text-sm", className)}>
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center space-x-2">
          {index > 0 && <span className="text-gray-400">/</span>}
          {index === items.length - 1 ? (
            <span className="text-gray-900 font-medium">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
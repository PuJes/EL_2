'use client'

import * as React from "react"
import Link from "next/link"
import { Globe, Menu } from "lucide-react"

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

// Main Header Component
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Globe className="w-8 h-8 text-purple-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              语言世界
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors">首页</Link>
            <Link href="/survey" className="text-gray-700 hover:text-purple-600 transition-colors">语言推荐</Link>
            <Link href="/culture" className="text-gray-700 hover:text-purple-600 transition-colors">文化探索</Link>
            <Link href="/languages" className="text-gray-700 hover:text-purple-600 transition-colors">语言列表</Link>
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">关于我们</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              登录
            </Button>
            <Link href="/survey">
              <Button size="sm" className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
                开始探索
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
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-lg">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              <Link href="/" className="block py-2 text-gray-700 hover:text-purple-600 transition-colors">首页</Link>
              <Link href="/survey" className="block py-2 text-gray-700 hover:text-purple-600 transition-colors">语言推荐</Link>
              <Link href="/culture" className="block py-2 text-gray-700 hover:text-purple-600 transition-colors">文化探索</Link>
              <Link href="/languages" className="block py-2 text-gray-700 hover:text-purple-600 transition-colors">语言列表</Link>
              <a href="#" className="block py-2 text-gray-700 hover:text-purple-600 transition-colors">关于我们</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
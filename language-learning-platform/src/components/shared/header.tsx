"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Globe, Menu, Search, Settings, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "./theme-provider"

interface HeaderProps {
  variant?: 'default' | 'transparent' | 'glass'
  showSearch?: boolean
}

const navigationItems = [
  {
    title: "语言探索",
    href: "/languages",
    description: "发现和比较不同语言",
    items: [
      {
        title: "语言列表",
        href: "/languages",
        description: "浏览所有可学习的语言"
      },
      {
        title: "语言推荐",
        href: "/recommendation",
        description: "获取个性化语言推荐"
      },
      {
        title: "难度评估",
        href: "/languages/difficulty",
        description: "了解各语言学习难度"
      }
    ]
  },
  {
    title: "文化世界",
    href: "/culture",
    description: "深入了解语言背后的文化",
    items: [
      {
        title: "文化介绍",
        href: "/culture",
        description: "探索各国文化传统"
      },
      {
        title: "节日庆典",
        href: "/culture/festivals",
        description: "了解传统节日"
      },
      {
        title: "生活方式",
        href: "/culture/lifestyle",
        description: "体验当地生活"
      }
    ]
  },
  {
    title: "学习指导",
    href: "/learning",
    description: "科学的语言学习方法",
    items: [
      {
        title: "学习计划",
        href: "/learning/plans",
        description: "制定个性化学习计划"
      },
      {
        title: "学习资源",
        href: "/learning/resources",
        description: "精选学习材料推荐"
      },
      {
        title: "进度跟踪",
        href: "/learning/progress",
        description: "记录学习成果"
      }
    ]
  }
]

export function Header({ variant = 'default', showSearch = true }: HeaderProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  const headerClassName = React.useMemo(() => {
    const baseClasses = "sticky top-0 z-50 w-full border-b transition-all duration-300"

    switch (variant) {
      case 'transparent':
        return `${baseClasses} bg-transparent border-transparent backdrop-blur-sm`
      case 'glass':
        return `${baseClasses} glass-nav`
      default:
        return `${baseClasses} bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60`
    }
  }, [variant])

  return (
    <header className={headerClassName}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-teal-500 shadow-md transition-transform group-hover:scale-105">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold gradient-text">语言世界</h1>
                <p className="text-xs text-muted-foreground">Language World</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuTrigger className="h-10">
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {item.items.map((subItem) => (
                        <li key={subItem.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={subItem.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">
                                {subItem.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {subItem.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar */}
          {showSearch && (
            <div className="hidden lg:flex flex-1 max-w-sm mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="搜索语言..."
                  className="pl-10 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            </div>
          )}

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Button (Mobile) */}
            {showSearch && (
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search className="h-5 w-5" />
                <span className="sr-only">搜索</span>
              </Button>
            )}

            {/* Settings */}
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">设置</span>
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">菜单</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle className="text-left flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span>语言世界</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-6 space-y-4">
                  {navigationItems.map((item) => (
                    <div key={item.href} className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                        {item.title}
                      </h4>
                      <div className="space-y-1">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setIsOpen(false)}
                            className={`block py-2 px-3 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                              pathname === subItem.href
                                ? 'bg-accent text-accent-foreground'
                                : ''
                            }`}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
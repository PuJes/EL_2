"use client"

import * as React from "react"
import Link from "next/link"
import { Globe, Github, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface FooterProps {
  variant?: 'default' | 'gradient' | 'dark'
  showSocial?: boolean
  sections?: FooterSection[]
}

const defaultSections: FooterSection[] = [
  {
    title: "语言探索",
    links: [
      { label: "语言推荐", href: "/recommendation" },
      { label: "语言列表", href: "/languages" },
      { label: "学习路径", href: "/learning/paths" },
      { label: "难度评估", href: "/languages/difficulty" },
      { label: "进度跟踪", href: "/learning/progress" }
    ]
  },
  {
    title: "文化世界",
    links: [
      { label: "文化介绍", href: "/culture" },
      { label: "传统节日", href: "/culture/festivals" },
      { label: "生活方式", href: "/culture/lifestyle" },
      { label: "历史背景", href: "/culture/history" },
      { label: "现代文化", href: "/culture/modern" }
    ]
  },
  {
    title: "学习资源",
    links: [
      { label: "在线课程", href: "/learning/courses" },
      { label: "学习工具", href: "/learning/tools" },
      { label: "练习材料", href: "/learning/materials" },
      { label: "社区交流", href: "/community" },
      { label: "专家指导", href: "/learning/mentorship" }
    ]
  },
  {
    title: "帮助支持",
    links: [
      { label: "使用指南", href: "/help/guide" },
      { label: "常见问题", href: "/help/faq" },
      { label: "联系我们", href: "/contact" },
      { label: "意见反馈", href: "/feedback" },
      { label: "技术支持", href: "/support" }
    ]
  }
]

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" }
]

export function Footer({
  variant = 'default',
  showSocial = true,
  sections = defaultSections
}: FooterProps) {
  const footerClassName = React.useMemo(() => {
    const baseClasses = "mt-auto border-t"

    switch (variant) {
      case 'gradient':
        return `${baseClasses} gradient-hero border-purple-100/50`
      case 'dark':
        return `${baseClasses} bg-gray-900 text-white border-gray-800`
      default:
        return `${baseClasses} bg-background border-border`
    }
  }, [variant])

  return (
    <footer className={footerClassName}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-teal-500 shadow-md">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold gradient-text">语言世界</h3>
                <p className="text-xs text-muted-foreground">Language World</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              个性化的语言学习指导，深入的文化探索体验，让每一次学习都成为通向更广阔世界的桥梁。
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@languageworld.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+86 400-123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>北京市朝阳区语言科技园</span>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          {sections.map((section, index) => (
            <div key={section.title} className="space-y-4">
              <h4 className="font-semibold text-sm uppercase tracking-wide text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media & Bottom Section */}
        <div className="mt-12 pt-8">
          <Separator className="mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground">
              © 2024 语言世界 Language World. 保留所有权利。
            </p>

            {/* Social Links */}
            {showSocial && (
              <div className="flex items-center space-x-2">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-accent"
                    asChild
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
            )}

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                隐私政策
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                服务条款
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                关于我们
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
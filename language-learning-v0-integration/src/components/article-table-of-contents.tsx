'use client'

import { useEffect, useState } from 'react'
import { type LocalizedTocItem } from '@/lib/utils/i18n-data'
import { cn } from '@/lib/utils'

interface ArticleTableOfContentsProps {
  items: LocalizedTocItem[]
  currentSection?: string
}

export function ArticleTableOfContents({
  items,
  currentSection,
}: ArticleTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (currentSection) {
      setActiveId(currentSection)
    }
  }, [currentSection])

  // 滚动到指定章节
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100 // 偏移量，避免被header遮挡
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })

      setActiveId(id)
    }
  }

  return (
    <nav className="sticky top-24 space-y-2">
      <h3 className="font-semibold text-sm text-muted-foreground mb-4">
        目录
      </h3>
      <ul className="space-y-2 border-l-2 border-muted pl-4">
        {items.map(item => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={cn(
                'text-sm text-left transition-colors hover:text-primary w-full',
                activeId === item.id
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              )}
            >
              {item.title}
            </button>

            {/* H3 子标题 */}
            {item.children && item.children.length > 0 && (
              <ul className="mt-2 ml-4 space-y-2">
                {item.children.map(child => (
                  <li key={child.id}>
                    <button
                      onClick={() => scrollToSection(child.id)}
                      className={cn(
                        'text-xs text-left transition-colors hover:text-primary w-full',
                        activeId === child.id
                          ? 'text-primary font-medium'
                          : 'text-muted-foreground'
                      )}
                    >
                      {child.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

// 移动端抽屉式目录
export function MobileArticleTableOfContents({
  items,
  currentSection,
}: ArticleTableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (currentSection) {
      setActiveId(currentSection)
    }
  }, [currentSection])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })

      setActiveId(id)
      setIsOpen(false) // 关闭抽屉
    }
  }

  return (
    <>
      {/* 展开按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground rounded-full p-4 shadow-lg lg:hidden"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* 遮罩层 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 抽屉 */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 bg-background rounded-t-2xl shadow-xl z-50 transition-transform duration-300 lg:hidden',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
        style={{ maxHeight: '70vh' }}
      >
        <div className="p-6 overflow-y-auto h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">目录</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <ul className="space-y-3">
            {items.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    'text-sm text-left transition-colors hover:text-primary w-full py-2',
                    activeId === item.id
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground'
                  )}
                >
                  {item.title}
                </button>

                {item.children && item.children.length > 0 && (
                  <ul className="mt-2 ml-4 space-y-2">
                    {item.children.map(child => (
                      <li key={child.id}>
                        <button
                          onClick={() => scrollToSection(child.id)}
                          className={cn(
                            'text-xs text-left transition-colors hover:text-primary w-full py-1',
                            activeId === child.id
                              ? 'text-primary font-medium'
                              : 'text-muted-foreground'
                          )}
                        >
                          {child.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

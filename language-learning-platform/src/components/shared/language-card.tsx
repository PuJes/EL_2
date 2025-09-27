"use client"

import * as React from "react"
import Link from "next/link"
import { Star, Clock, Users, BookOpen, ChevronRight } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Language } from "@/lib/types"

interface LanguageCardProps {
  language: Language
  variant?: 'default' | 'compact' | 'detailed' | 'recommendation'
  isPrimary?: boolean
  matchScore?: number
  onSelect?: (language: Language) => void
  showMatchScore?: boolean
}

export function LanguageCard({
  language,
  variant = 'default',
  isPrimary = false,
  matchScore,
  onSelect,
  showMatchScore = false
}: LanguageCardProps) {
  const difficultyStars = "★".repeat(language.difficulty) + "☆".repeat(5 - language.difficulty)

  const handleClick = () => {
    if (onSelect) {
      onSelect(language)
    }
  }

  // Compact variant for lists
  if (variant === 'compact') {
    return (
      <Card className="group hover:shadow-md transition-all duration-300 cursor-pointer card-hover">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{language.flag}</span>
              <div>
                <h3 className="font-medium">{language.name}</h3>
                <p className="text-sm text-muted-foreground">{language.nameEn}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                难度 {language.difficulty}/5
              </Badge>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Recommendation variant with match score
  if (variant === 'recommendation') {
    return (
      <Card className={`group transition-all duration-300 card-hover ${
        isPrimary ? 'ring-2 ring-primary shadow-brand-lg' : 'hover:shadow-md'
      }`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{language.flag}</span>
              <div>
                <h3 className="text-lg font-semibold">{language.name}</h3>
                <p className="text-sm text-muted-foreground">{language.nameEn}</p>
              </div>
            </div>
            {showMatchScore && matchScore && (
              <div className="text-right">
                <div className="text-2xl font-bold gradient-text">{matchScore}%</div>
                <p className="text-xs text-muted-foreground">匹配度</p>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {language.description}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-amber-500" />
              <span>难度: {difficultyStars}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span>{language.learningTimeEstimate.beginner}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-green-500" />
              <span>{Math.round(language.speakers.total / 1000000)}M 使用者</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-purple-500" />
              <span>{language.category}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {language.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex space-x-2 pt-2">
            <Button
              asChild
              variant={isPrimary ? "default" : "outline"}
              className={isPrimary ? "btn-gradient flex-1" : "flex-1"}
            >
              <Link href={`/languages/${language.id}`}>
                了解详情
              </Link>
            </Button>
            {isPrimary && (
              <Button variant="outline" size="icon">
                <Star className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Detailed variant with full information
  if (variant === 'detailed') {
    return (
      <Card className="group transition-all duration-300 card-hover">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-4xl">{language.flag}</span>
              <div>
                <h3 className="text-xl font-bold">{language.name}</h3>
                <p className="text-muted-foreground">{language.nameEn}</p>
                <p className="text-sm text-muted-foreground">{language.nativeName}</p>
              </div>
            </div>
            <Badge variant={
              language.category === 'popular' ? 'default' :
              language.category === 'business' ? 'secondary' : 'outline'
            }>
              {language.category}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            {language.description}
          </p>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-lg font-semibold">{language.difficulty}/5</div>
              <div className="text-xs text-muted-foreground">学习难度</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-lg font-semibold">
                {Math.round(language.speakers.total / 1000000)}M
              </div>
              <div className="text-xs text-muted-foreground">全球使用者</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-lg font-semibold">{language.regions.length}</div>
              <div className="text-xs text-muted-foreground">主要地区</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-lg font-semibold">{language.resources.length}</div>
              <div className="text-xs text-muted-foreground">学习资源</div>
            </div>
          </div>

          {/* Cultural highlights */}
          {language.culturalInfo.modernCulture.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">文化亮点</h4>
              <div className="flex flex-wrap gap-1">
                {language.culturalInfo.modernCulture.slice(0, 4).map((item, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <Button asChild className="flex-1 btn-gradient">
              <Link href={`/languages/${language.id}`}>
                开始学习
              </Link>
            </Button>
            <Button variant="outline">
              <Star className="h-4 w-4 mr-2" />
              收藏
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Default variant
  return (
    <Card className="group transition-all duration-300 card-hover" onClick={handleClick}>
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{language.flag}</span>
          <div>
            <h3 className="font-semibold">{language.name}</h3>
            <p className="text-sm text-muted-foreground">{language.nameEn}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {language.description}
        </p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-amber-500" />
            <span>难度 {language.difficulty}/5</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-blue-500" />
            <span>{Math.round(language.speakers.total / 1000000)}M</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {language.tags.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Button asChild variant="outline" className="w-full group-hover:bg-accent">
          <Link href={`/languages/${language.id}`}>
            了解更多
            <ChevronRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
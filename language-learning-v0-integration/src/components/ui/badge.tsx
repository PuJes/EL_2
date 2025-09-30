'use client'

import * as React from "react"

interface BadgeProps {
  variant?: 'default' | 'secondary' | 'outline'
  children: React.ReactNode
  className?: string
}

export const Badge = React.forwardRef<
  HTMLDivElement,
  BadgeProps
>(({ variant = 'default', children, className = '' }, ref) => {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80 bg-gray-900 text-white",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 bg-gray-100 text-gray-900",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground border-gray-200 text-gray-700"
  }

  const classes = `${baseClasses} ${variants[variant]} ${className}`

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  )
})

Badge.displayName = "Badge"
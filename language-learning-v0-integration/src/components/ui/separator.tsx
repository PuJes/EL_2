'use client'

import * as React from "react"

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export const Separator = React.forwardRef<
  HTMLDivElement,
  SeparatorProps
>(({ orientation = 'horizontal', className = '' }, ref) => {
  return (
    <div
      ref={ref}
      className={`shrink-0 bg-border ${
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]'
      } bg-gray-200 ${className}`}
    />
  )
})

Separator.displayName = "Separator"
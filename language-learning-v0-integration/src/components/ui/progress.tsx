'use client'

import * as React from "react"

interface ProgressProps {
  value?: number
  max?: number
  className?: string
}

export const Progress = React.forwardRef<
  HTMLDivElement,
  ProgressProps
>(({ value = 0, max = 100, className = '' }, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div
      ref={ref}
      className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}
    >
      <div
        className="h-full w-full flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300 ease-in-out"
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  )
})

Progress.displayName = "Progress"
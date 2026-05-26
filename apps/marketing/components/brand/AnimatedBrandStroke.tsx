"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"

import { cn } from "@/lib/utils"

type AnimatedBrandStrokeProps = {
  className?: string
  strokeClassName?: string
  delay?: number
  duration?: number
  title?: string
}

export function AnimatedBrandStroke({
  className,
  strokeClassName,
  delay = 0.2,
  duration = 2,
  title,
}: AnimatedBrandStrokeProps) {
  const rootRef = useRef<SVGSVGElement | null>(null)
  const [isInView, setIsInView] = useState(() => {
    if (typeof window === "undefined") {
      return false
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  })

  useEffect(() => {
    const root = rootRef.current
    if (!root) {
      return
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue
          }

          setIsInView(true)
          observer.disconnect()
          break
        }
      },
      {
        threshold: 0.2,
      },
    )

    observer.observe(root)

    return () => {
      observer.disconnect()
    }
  }, [])

  const style = {
    "--brand-stroke-delay": `${delay}s`,
    "--brand-stroke-duration": `${duration}s`,
  } as CSSProperties

  const isDecorative = !title

  return (
    <svg
      ref={rootRef}
      aria-hidden={isDecorative}
      className={cn(
        "animated-brand-stroke overflow-visible",
        isInView && "is-in-view",
        className,
      )}
      role={isDecorative ? undefined : "img"}
      style={style}
      viewBox="0 0 260 260"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <path
        className={strokeClassName}
        d="M 86 34 C 39 61, 20 113, 30 160 C 41 211, 84 238, 130 229 C 177 220, 205 181, 201 139 C 197 100, 169 78, 138 88 C 108 98, 92 130, 101 162 C 112 202, 151 229, 189 222 C 218 217, 240 201, 250 184"
        fill="none"
        pathLength="1"
        stroke="currentColor"
        strokeLinecap="butt"
        strokeLinejoin="round"
        strokeWidth="38"
      />
    </svg>
  )
}

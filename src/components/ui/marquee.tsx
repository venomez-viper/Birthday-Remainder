"use client"

import { type ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number
  /**
   * Duration of one loop, e.g. "20s"
   * @default "40s"
   */
  duration?: string
  /**
   * Gap between items, e.g. "1rem"
   * @default "1rem"
   */
  gap?: string
}

/**
 * Tailwind-v3 compatible marquee. The original MagicUI component relied on
 * v4-only utilities (`gap-(--gap)`, `animate-marquee`) whose keyframes lived in
 * a v4 `@theme` block, so it never animated under Tailwind v3. This version
 * injects its own scoped keyframes and uses inline styles for the timing/gap.
 */
export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  duration = "40s",
  gap = "1rem",
  ...props
}: MarqueeProps) {
  const animationName = vertical ? "bd-marquee-vertical" : "bd-marquee-horizontal"

  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2",
        vertical ? "flex-col" : "flex-row",
        pauseOnHover && "[&:hover_*]:[animation-play-state:paused]",
        className
      )}
      style={{ gap }}
    >
      <style>{`
        @keyframes bd-marquee-horizontal {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% - ${gap})); }
        }
        @keyframes bd-marquee-vertical {
          from { transform: translateY(0); }
          to { transform: translateY(calc(-100% - ${gap})); }
        }
      `}</style>
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around",
              vertical ? "flex-col" : "flex-row"
            )}
            style={{
              gap,
              animationName,
              animationDuration: duration,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDirection: reverse ? "reverse" : "normal",
            }}
          >
            {children}
          </div>
        ))}
    </div>
  )
}

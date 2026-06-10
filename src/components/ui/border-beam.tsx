"use client"

import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface BorderBeamProps {
  size?: number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  className?: string
  /**
   * Border width of the animated ring, in px.
   */
  borderWidth?: number
}

/**
 * Tailwind-v3 compatible BorderBeam. The original MagicUI version used v4-only
 * utilities (`mask-*`, `bg-linear-to-*`, `border-(length:--…)`, `offsetPath`)
 * which render as a solid bar under Tailwind v3. This implementation draws a
 * thin rotating conic-gradient ring with framer-motion and masks it to a hairline
 * border using two layered, inset panels, so it works without any v4 utilities.
 */
export const BorderBeam = ({
  className,
  size = 200,
  delay = 0,
  duration = 6,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  borderWidth = 1.5,
}: BorderBeamProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden z-0",
        className
      )}
    >
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[180%] w-[180%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, ${colorFrom} 40deg, ${colorTo} 90deg, transparent 150deg, transparent 360deg)`,
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration, delay }}
      />
      {/* Inset panel masks the gradient down to a thin ring along the border.
          It matches the card surface so only the rim shows. */}
      <div
        className="absolute rounded-[inherit] bg-white/80 backdrop-blur-xl"
        style={{ inset: borderWidth }}
      />
    </div>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedBackgroundProps {
  children: React.ReactNode
  className?: string
  heroImage?: string
}

export function AnimatedBackground({ children, className, heroImage }: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div ref={containerRef} className={cn("relative min-h-screen overflow-hidden bg-[#fbf6f2]", className)}>
      {/* 1. Main Background Image with Parallax */}
      {heroImage && (
        <motion.div 
          className="absolute inset-0 z-0" 
          style={{ y, opacity }}
        >
          <img
            src={heroImage}
            alt="Hero background"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient Overlays to blend the image into the page */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf6f2]/95 via-[#fbf6f2]/80 to-[#fbf6f2]/40 mix-blend-normal" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fbf6f2] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[#fbf6f2]/30 backdrop-blur-[2px]" />
        </motion.div>
      )}

      {/* 2. Animated Ambient Glows (Subtle, slow-moving blobs) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: ["0%", "5%", "0%"],
            y: ["0%", "10%", "0%"],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#f4e4e9] to-transparent blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: ["0%", "-5%", "0%"],
            y: ["0%", "-10%", "0%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-bl from-[#f7ead9] to-transparent blur-[120px]"
        />
      </div>

      {/* 3. Floating Sparkles / Petals effect */}
      <FloatingParticles />

      {/* 4. Foreground Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
}

function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>>([])

  useEffect(() => {
    // Generate random particles only on the client
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#d4c5a9]/40 backdrop-blur-sm"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: ["0vh", "-100vh"],
            x: ["0px", `${Math.sin(p.id) * 50}px`],
            opacity: [0, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

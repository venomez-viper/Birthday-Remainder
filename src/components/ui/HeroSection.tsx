"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles, Star } from "lucide-react"
import { SparklesText } from "./sparkles-text"
import { ShimmerButton } from "./shimmer-button"

interface HeroSectionProps {
  title1: string
  title2: string
  title2Color?: string
  subtitle: string
  ctaText: string
  ctaLink: string
  secondaryText: string
  secondaryLink: string
}

export function HeroSection({
  title1,
  title2,
  title2Color = "#8b4c5e",
  subtitle,
  ctaText,
  ctaLink,
  secondaryText,
  secondaryLink,
}: HeroSectionProps) {
  return (
    <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center min-h-[90vh]">
      {/* Left Content Area */}
      <div className="space-y-8 relative z-10">
        
        {/* Large Typography Title */}
        <div className="space-y-1">
          <SparklesText 
            className="text-7xl md:text-9xl lg:text-[10rem] font-handwritten text-[#2d2418] leading-[0.9] tracking-tight"
            colors={{ first: "#8b4c5e", second: "#c9956b" }}
          >
            {title1}
          </SparklesText>
          <SparklesText 
            className="text-7xl md:text-9xl lg:text-[10rem] font-handwritten leading-[0.9] tracking-tight"
            colors={{ first: title2Color, second: "#d4c5a9" }}
            style={{ color: title2Color }}
          >
            {title2}
          </SparklesText>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-lg md:text-xl font-serif text-[#6b5d4d] leading-relaxed max-w-md drop-shadow-sm"
        >
          {subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row gap-4 pt-2"
        >
          <Link href={ctaLink} className="w-full sm:w-auto">
            <ShimmerButton className="w-full px-8 py-4 text-white font-serif text-lg shadow-xl" background="#8b4c5e">
              <span className="flex items-center gap-2">
                {ctaText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </ShimmerButton>
          </Link>
          <a
            href={secondaryLink}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#d4c5a9] text-[#4a3728] font-serif text-lg hover:bg-[#f0e9dc]/50 backdrop-blur-md transition-all hover:border-[#c9956b]"
          >
            {secondaryText}
          </a>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex items-center gap-6 pt-4"
        >
          <div className="flex -space-x-3">
            {["🌸", "🌺", "🌷", "💐"].map((emoji, i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-full bg-white/60 backdrop-blur-md border border-white flex items-center justify-center text-lg shadow-sm"
              >
                {emoji}
              </div>
            ))}
          </div>
          <div>
            <div className="flex gap-1 text-[#c9956b]">
              {Array(5).fill(null).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-sm font-serif text-[#9a8b7a] mt-1">
              Loved by 10,000+ thoughtful people
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Visual Area (can be empty, allowing the background to show through, or take custom children) */}
      <div className="hidden md:block relative h-full">
        {/* The visual weight here is balanced by the AnimatedBackground and its floating particles/parallax images */}
      </div>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles, Star, CalendarHeart, Gift, Clock } from "lucide-react"
import { SparklesText } from "./sparkles-text"
import { ShimmerButton } from "./shimmer-button"
import { BorderBeam } from "./border-beam"

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
    <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32 grid md:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[90vh]">
      {/* Left Content Area */}
      <div className="space-y-8 relative z-10">
        
        {/* Smaller SaaS Typography Title */}
        <div className="space-y-2">
          <SparklesText 
            className="text-5xl md:text-6xl lg:text-7xl font-handwritten text-[#2d2418] leading-[1.1] tracking-tight"
            colors={{ first: "#8b4c5e", second: "#c9956b" }}
          >
            {title1}
          </SparklesText>
          <SparklesText
            className="text-5xl md:text-6xl lg:text-7xl font-handwritten leading-[1.1] tracking-tight"
            colors={{ first: title2Color, second: "#d4c5a9" }}
          >
            {title2}
          </SparklesText>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-lg md:text-xl font-serif text-[#6b5d4d] leading-relaxed max-w-lg drop-shadow-sm"
        >
          {subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row gap-4 pt-4"
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
          transition={{ delay: 1.0, duration: 1 }}
          className="flex items-center gap-6 pt-6"
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

      {/* Right Visual Area: Interactive Floating 3D Mockup */}
      <motion.div 
        className="hidden md:flex relative h-full items-center justify-center perspective-[1000px]"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <motion.div 
          className="relative w-full max-w-md aspect-[4/5] rounded-3xl bg-white/70 backdrop-blur-xl border border-[#e8dfd2] shadow-2xl p-8 flex flex-col gap-6"
          animate={{
            y: [-10, 10, -10],
            rotateX: [2, -2, 2],
            rotateY: [-5, 5, -5],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <BorderBeam size={200} duration={12} colorFrom="#8b4c5e" colorTo="#c9956b" />

          {/* Mockup Header */}
          <div className="flex items-center justify-between border-b border-[#e8dfd2] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#8b4c5e]/10 flex items-center justify-center">
                <CalendarHeart className="w-5 h-5 text-[#8b4c5e]" />
              </div>
              <div>
                <h4 className="font-handwritten text-xl text-[#4a3728]">Eleanor's Birthday</h4>
                <p className="font-serif text-xs text-[#9a8b7a]">October 14th (in 2 days)</p>
              </div>
            </div>
          </div>

          {/* Mockup Content */}
          <div className="space-y-4 flex-1">
            <div className="bg-[#f0e9dc]/50 rounded-2xl p-4 border border-[#e8dfd2]/50">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-4 h-4 text-[#c9956b]" />
                <span className="font-serif text-sm text-[#4a3728]">Gift Ideas (AI)</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-xs font-serif text-[#6b5d4d]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c9956b]" />
                  Vintage Film Camera
                </li>
                <li className="flex items-center gap-2 text-xs font-serif text-[#6b5d4d]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c9956b]" />
                  Hand-poured Botanical Candle
                </li>
              </ul>
            </div>

            <div className="bg-[#8b4c5e]/5 rounded-2xl p-4 border border-[#8b4c5e]/10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#8b4c5e]" />
                <span className="font-serif text-sm text-[#8b4c5e]">Drafting Message...</span>
              </div>
              <p className="font-handwritten text-[#4a3728] text-lg leading-relaxed italic opacity-80">
                "To the one who brings so much light into my life. May your year be as beautiful as..."
              </p>
            </div>
          </div>

          {/* Mockup Footer */}
          <div className="pt-4 border-t border-[#e8dfd2] flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-serif text-[#6b5d4d] bg-white px-3 py-1.5 rounded-full shadow-sm">
              <Clock className="w-3.5 h-3.5" />
              Reminder set
            </span>
            <button className="text-xs font-serif text-white bg-[#c9956b] px-4 py-1.5 rounded-full shadow-sm hover:scale-105 transition-transform">
              Send Gift
            </button>
          </div>
        </motion.div>

        {/* Decorative background blur blobs for the mockup */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#8b4c5e]/20 blur-3xl rounded-full -z-10" />
        <div className="absolute top-1/3 right-0 w-48 h-48 bg-[#c9956b]/20 blur-3xl rounded-full -z-10" />
      </motion.div>
    </div>
  )
}

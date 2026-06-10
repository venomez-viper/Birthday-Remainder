"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface FloralCardProps {
  title: string
  description: string
  icon: LucideIcon
  image?: string
  color?: string
  className?: string
  delay?: number
}

export function FloralCard({
  title,
  description,
  icon: Icon,
  image,
  color = "#8b4c5e",
  className,
  delay = 0,
}: FloralCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn("group relative h-full", className)}
    >
      {/* Glow effect behind the card */}
      <div 
        className="absolute -inset-4 rounded-3xl opacity-0 blur-2xl transition-all duration-700 group-hover:opacity-30 group-hover:scale-105 pointer-events-none"
        style={{ backgroundColor: color }}
      />
      
      {/* Main Card Container */}
      <div className="relative h-full p-8 rounded-2xl bg-white/80 backdrop-blur-xl border border-[#e8dfd2] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col z-10">
        
        {/* Subtle floral pattern overlay (CSS gradient pattern) */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${color} 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Header with Icon */}
        <div className="flex items-center gap-4 mb-6 relative z-10">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className="w-6 h-6 transition-colors duration-500" style={{ color }} />
          </div>
          <h3 className="text-2xl font-handwritten text-[#2d2418] group-hover:text-[#4a3728] transition-colors duration-300">
            {title}
          </h3>
        </div>

        {/* Content */}
        <p className="font-serif text-[#6b5d4d] leading-relaxed relative z-10 flex-1">
          {description}
        </p>

        {/* Optional Image Reveal on Hover */}
        {image && (
          <div className="mt-8 relative h-48 rounded-xl overflow-hidden shadow-inner hidden md:block">
            <div className="absolute inset-0 bg-[#f0e9dc] flex items-center justify-center text-xs font-serif text-[#9a8b7a] italic">
              Hover to reveal
            </div>
            <motion.img
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover origin-center opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700"
            />
          </div>
        )}
        
        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:from-transparent group-hover:via-current group-hover:to-transparent opacity-30 transition-all duration-1000" style={{ color }} />
      </div>
    </motion.div>
  )
}

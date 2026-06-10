"use client"

import { motion } from "framer-motion"
import { Footer } from "@/components/layout/Footer"
import { AnimatedBackground } from "@/components/ui/AnimatedBackground"
import { SparklesText } from "@/components/ui/sparkles-text"
import { TextReveal } from "@/components/ui/text-reveal"
import { Marquee } from "@/components/ui/marquee"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const images = [
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80&auto=format",
  "https://images.unsplash.com/photo-1581451006543-f1df499f5dfb?w=600&q=80&auto=format",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80&auto=format",
  "https://images.unsplash.com/photo-1544377193-33dce4ea9a7e?w=600&q=80&auto=format",
  "https://images.unsplash.com/photo-1494887205043-c5f291293cf6?w=600&q=80&auto=format"
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#2d2418] overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#faf6f0]/80 border-b border-[#e8dfd2] px-6 h-16 flex items-center">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-serif text-[#6b5d4d] hover:text-[#8b4c5e] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </nav>

      <AnimatedBackground className="pt-32 pb-0 relative">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center flex flex-col items-center">
            <SparklesText 
              className="text-6xl md:text-8xl font-handwritten text-[#2d2418] mb-6"
              colors={{ first: "#8b4c5e", second: "#c9956b" }}
            >
              Our Story
            </SparklesText>
          </motion.div>
        </div>

        {/* Text Reveal Section */}
        <div className="z-10 flex min-h-64 items-center justify-center bg-[#faf6f0]">
          <TextReveal className="font-serif">
            We built Birthday Diary to revive the lost art of remembering. Today, birthdays have become a chore. We wanted something different. Something that feels like flipping through a physical address book. Something that gives you time to plan, to buy a gift, to actually care.
          </TextReveal>
        </div>

        {/* Cinematic Image Marquees */}
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-[#faf6f0]">
          <Marquee pauseOnHover className="[--duration:20s]">
            {images.map((src, idx) => (
              <div key={idx} className="relative h-64 w-64 md:h-80 md:w-80 overflow-hidden rounded-2xl border-4 border-white shadow-xl rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
                <img src={src} alt={`Aesthetic imagery ${idx}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:25s] mt-8">
            {images.slice().reverse().map((src, idx) => (
              <div key={idx} className="relative h-64 w-64 md:h-80 md:w-80 overflow-hidden rounded-2xl border-4 border-white shadow-xl rotate-[2deg] hover:rotate-0 transition-transform duration-300">
                <img src={src} alt={`Aesthetic imagery ${idx}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </Marquee>
          
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#faf6f0] dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#faf6f0] dark:from-background"></div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-32 text-center">
          <h2 className="text-4xl font-handwritten text-[#2d2418] mb-8">Craftsmanship in Code</h2>
          <p className="font-serif text-[#6b5d4d] text-lg leading-relaxed mb-6">
            Birthday Diary isn't just an app. It's a digital heirloom. We spent months obsessing over typography, paper textures, and page-turning animations so that every time you open it, you feel a sense of calm.
          </p>
          <p className="font-serif text-[#6b5d4d] text-lg leading-relaxed">
            By combining beautiful vintage design with modern AI capabilities, we've created a tool that not only remembers the dates, but helps you find the perfect words to say.
          </p>
        </div>
      </AnimatedBackground>

      <Footer />
    </div>
  )
}

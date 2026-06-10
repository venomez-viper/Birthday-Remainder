"use client"

import { motion } from "framer-motion"
import { Footer } from "@/components/layout/Footer"
import { AnimatedBackground } from "@/components/ui/AnimatedBackground"
import { Particles } from "@/components/ui/particles"
import { SparklesText } from "@/components/ui/sparkles-text"
import { MagicCard } from "@/components/ui/magic-card"
import Link from "next/link"
import { ArrowLeft, BookHeart, PenTool } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#2d2418] overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#faf6f0]/80 border-b border-[#e8dfd2] px-6 h-16 flex items-center">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-serif text-[#6b5d4d] hover:text-[#8b4c5e] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </nav>

      <AnimatedBackground className="pt-32 pb-20 relative">
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          color="#8b4c5e"
          refresh
        />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16 flex flex-col items-center">
            <SparklesText 
              text="Our Story" 
              className="text-6xl md:text-8xl font-handwritten text-[#2d2418] mb-6"
              colors={{ first: "#8b4c5e", second: "#c9956b" }}
            />
            <p className="text-xl font-serif text-[#6b5d4d] leading-relaxed mt-4">
              We built Birthday Diary to revive the lost art of remembering.
            </p>
          </motion.div>

          <div className="space-y-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="h-full">
              <MagicCard 
                className="w-full bg-[#faf6f0]/80 backdrop-blur-xl border-[#e8dfd2] shadow-xl p-8 md:p-12 rounded-3xl"
                gradientColor="#8b4c5e20"
                gradientSize={300}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#8b4c5e]/10 flex items-center justify-center mb-6 relative z-10">
                  <BookHeart className="w-6 h-6 text-[#8b4c5e]" />
                </div>
                <h2 className="text-4xl font-handwritten text-[#2d2418] mb-4 relative z-10">The Problem with Feeds</h2>
                <p className="font-serif text-[#6b5d4d] text-lg leading-relaxed mb-6 relative z-10">
                  Today, birthdays have become a chore. You get a notification from social media that it's someone's birthday today. You quickly type "HBD!" on their wall and move on. The thoughtfulness is gone.
                </p>
                <p className="font-serif text-[#6b5d4d] text-lg leading-relaxed relative z-10">
                  We wanted something different. Something that feels like flipping through a physical address book. Something that gives you time to plan, to buy a gift, to actually *care*.
                </p>
              </MagicCard>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="h-full">
              <MagicCard 
                className="w-full bg-[#faf6f0]/80 backdrop-blur-xl border-[#e8dfd2] shadow-xl p-8 md:p-12 rounded-3xl"
                gradientColor="#c9956b20"
                gradientSize={300}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#c9956b]/10 flex items-center justify-center mb-6 relative z-10">
                  <PenTool className="w-6 h-6 text-[#c9956b]" />
                </div>
                <h2 className="text-4xl font-handwritten text-[#2d2418] mb-4 relative z-10">Craftsmanship in Code</h2>
                <p className="font-serif text-[#6b5d4d] text-lg leading-relaxed mb-6 relative z-10">
                  Birthday Diary isn't just an app. It's a digital heirloom. We spent months obsessing over typography, paper textures, and page-turning animations so that every time you open it, you feel a sense of calm.
                </p>
                <p className="font-serif text-[#6b5d4d] text-lg leading-relaxed relative z-10">
                  By combining beautiful vintage design with modern AI capabilities, we've created a tool that not only remembers the dates, but helps you find the perfect words to say.
                </p>
              </MagicCard>
            </motion.div>
          </div>
        </div>
      </AnimatedBackground>

      <Footer />
    </div>
  )
}

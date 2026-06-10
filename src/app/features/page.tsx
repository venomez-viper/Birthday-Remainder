"use client"

import { motion } from "framer-motion"
import { Footer } from "@/components/layout/Footer"
import { AnimatedBackground } from "@/components/ui/AnimatedBackground"
import Link from "next/link"
import { ArrowLeft, BookOpen, Sparkles, Bell } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } },
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#2d2418] overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#faf6f0]/80 border-b border-[#e8dfd2] px-6 h-16 flex items-center">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-serif text-[#6b5d4d] hover:text-[#8b4c5e] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </nav>

      <AnimatedBackground className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-24">
            <h1 className="text-6xl md:text-8xl font-handwritten text-[#2d2418] mb-6">Everything you need</h1>
            <p className="text-xl font-serif text-[#6b5d4d] leading-relaxed max-w-2xl mx-auto">
              A deep dive into the thoughtfully crafted features that make Birthday Diary special.
            </p>
          </motion.div>

          <div className="space-y-32">
            
            {/* Feature 1 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-[#8b4c5e]/5 rounded-3xl p-8 border border-[#8b4c5e]/20 aspect-square flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80&auto=format')] bg-cover bg-center opacity-40 mix-blend-multiply" />
                <BookOpen className="w-24 h-24 text-[#8b4c5e] relative z-10 drop-shadow-lg" />
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl font-handwritten text-[#2d2418]">The Vintage Book Experience</h2>
                <p className="text-lg font-serif text-[#6b5d4d] leading-relaxed">
                  We built a proprietary 3D page-flipping engine that mimics the physical sensation of turning the pages of an old diary. Every friend, family member, and colleague gets their own beautifully typeset page.
                </p>
                <ul className="space-y-3 font-serif text-[#6b5d4d]">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#8b4c5e]" /> Authentic typography</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#8b4c5e]" /> Leather binding aesthetics</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#8b4c5e]" /> Paper texture overlays</li>
                </ul>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="grid md:grid-cols-2 gap-12 items-center md:[direction:rtl]">
              <div className="md:[direction:ltr] bg-[#c9956b]/5 rounded-3xl p-8 border border-[#c9956b]/20 aspect-square flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&q=80&auto=format')] bg-cover bg-center opacity-40 mix-blend-multiply" />
                <Sparkles className="w-24 h-24 text-[#c9956b] relative z-10 drop-shadow-lg" />
              </div>
              <div className="space-y-6 md:[direction:ltr]">
                <h2 className="text-4xl font-handwritten text-[#2d2418]">Gemini AI Wishes</h2>
                <p className="text-lg font-serif text-[#6b5d4d] leading-relaxed">
                  Writer's block? Our integration with Google's Gemini AI generates personalized, heartfelt, or hilarious birthday messages instantly. Just tell the AI what tone you want.
                </p>
                <ul className="space-y-3 font-serif text-[#6b5d4d]">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#c9956b]" /> Context-aware generation</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#c9956b]" /> Multiple tone settings (funny, poetic, formal)</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#c9956b]" /> Copy to clipboard instantly</li>
                </ul>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-[#6b8f71]/5 rounded-3xl p-8 border border-[#6b8f71]/20 aspect-square flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&q=80&auto=format')] bg-cover bg-center opacity-40 mix-blend-multiply" />
                <Bell className="w-24 h-24 text-[#6b8f71] relative z-10 drop-shadow-lg" />
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl font-handwritten text-[#2d2418]">Proactive Reminders</h2>
                <p className="text-lg font-serif text-[#6b5d4d] leading-relaxed">
                  A reminder on the day of the birthday is too late. Our smart notification system lets you know days in advance so you can buy a gift or plan a surprise.
                </p>
                <ul className="space-y-3 font-serif text-[#6b5d4d]">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#6b8f71]" /> Customizable lead times (e.g., 3 days before)</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#6b8f71]" /> Visual calendar dashboard</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#6b8f71]" /> Push & email notifications</li>
                </ul>
              </div>
            </motion.div>

          </div>
        </div>
      </AnimatedBackground>

      <Footer />
    </div>
  )
}

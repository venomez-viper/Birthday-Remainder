"use client"

import { motion } from "framer-motion"
import { Footer } from "@/components/layout/Footer"
import { AnimatedBackground } from "@/components/ui/AnimatedBackground"
import { SparklesText } from "@/components/ui/sparkles-text"
import { MagicCard } from "@/components/ui/magic-card"
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
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-24 flex flex-col items-center">
            <SparklesText 
              className="text-6xl md:text-8xl font-handwritten text-[#2d2418] mb-6"
              colors={{ first: "#8b4c5e", second: "#c9956b" }}
            >
              Inside the Diary
            </SparklesText>
            <p className="text-xl font-serif text-[#6b5d4d] leading-relaxed max-w-2xl mx-auto mt-4">
              Discover the careful details and gentle touches that make keeping this diary a truly special experience.
            </p>
          </motion.div>

          <div className="space-y-32">
            
            {/* Feature 1 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="w-full">
              <MagicCard className="grid md:grid-cols-2 gap-12 items-center bg-white/60 backdrop-blur-xl border-[#e8dfd2] p-8 md:p-12 rounded-[2rem] shadow-sm" gradientColor="#8b4c5e15" gradientSize={350}>
                <div className="bg-[#8b4c5e]/5 rounded-3xl p-8 border border-[#8b4c5e]/20 aspect-square flex items-center justify-center relative overflow-hidden z-10">
                  <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80&auto=format')" }} />
                  <BookOpen className="w-24 h-24 text-[#8b4c5e] relative z-10 drop-shadow-lg" />
                </div>
                <div className="space-y-6 relative z-10">
                  <h2 className="text-6xl md:text-7xl font-handwritten text-[#2d2418]">A Handcrafted Feel</h2>
                  <p className="text-lg font-serif text-[#6b5d4d] leading-relaxed">
                    We created an authentic reading experience that feels just like holding a real physical book. Every person you care about gets their own beautiful page to celebrate their life.
                  </p>
                  <ul className="space-y-3 font-serif text-[#6b5d4d]">
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#8b4c5e]" /> Elegant typography</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#8b4c5e]" /> Classic leather aesthetics</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#8b4c5e]" /> Rich paper textures</li>
                  </ul>
                </div>
              </MagicCard>
            </motion.div>

            {/* Feature 2 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="w-full">
              <MagicCard className="grid md:grid-cols-2 gap-12 items-center md:[direction:rtl] bg-white/60 backdrop-blur-xl border-[#e8dfd2] p-8 md:p-12 rounded-[2rem] shadow-sm" gradientColor="#c9956b15" gradientSize={350}>
                <div className="md:[direction:ltr] bg-[#c9956b]/5 rounded-3xl p-8 border border-[#c9956b]/20 aspect-square flex items-center justify-center relative overflow-hidden z-10">
                  <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505322022379-7c3353ee6291?w=800&q=80&auto=format')" }} />
                  <Sparkles className="w-24 h-24 text-[#c9956b] relative z-10 drop-shadow-lg" />
                </div>
                <div className="space-y-6 md:[direction:ltr] relative z-10">
                  <h2 className="text-6xl md:text-7xl font-handwritten text-[#2d2418]">Perfect Words Every Time</h2>
                  <p className="text-lg font-serif text-[#6b5d4d] leading-relaxed">
                    When you are not sure what to say, our smart assistant helps you find the right words. Whether you want something deeply heartfelt or just a bit funny, we will help you write a beautiful message in seconds.
                  </p>
                  <ul className="space-y-3 font-serif text-[#6b5d4d]">
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#c9956b]" /> Personal and contextual</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#c9956b]" /> Easy tone adjustments</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#c9956b]" /> Ready to share instantly</li>
                  </ul>
                </div>
              </MagicCard>
            </motion.div>

            {/* Feature 3 */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="w-full">
              <MagicCard className="grid md:grid-cols-2 gap-12 items-center bg-white/60 backdrop-blur-xl border-[#e8dfd2] p-8 md:p-12 rounded-[2rem] shadow-sm" gradientColor="#6b8f7115" gradientSize={350}>
                <div className="bg-[#6b8f71]/5 rounded-3xl p-8 border border-[#6b8f71]/20 aspect-square flex items-center justify-center relative overflow-hidden z-10">
                  <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-multiply" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516562309708-05f43a08b98b?w=800&q=80&auto=format')" }} />
                  <Bell className="w-24 h-24 text-[#6b8f71] relative z-10 drop-shadow-lg" />
                </div>
                <div className="space-y-6 relative z-10">
                  <h2 className="text-6xl md:text-7xl font-handwritten text-[#2d2418]">Gentle Reminders</h2>
                  <p className="text-lg font-serif text-[#6b5d4d] leading-relaxed">
                    We believe a reminder on the actual day is simply too late. We will gently let you know a few days in advance so you have plenty of time to plan a thoughtful surprise.
                  </p>
                  <ul className="space-y-3 font-serif text-[#6b5d4d]">
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#6b8f71]" /> Advance notice to plan</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#6b8f71]" /> Clean visual calendar</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#6b8f71]" /> Quiet and unobtrusive alerts</li>
                  </ul>
                </div>
              </MagicCard>
            </motion.div>

          </div>
        </div>
      </AnimatedBackground>

      <Footer />
    </div>
  )
}

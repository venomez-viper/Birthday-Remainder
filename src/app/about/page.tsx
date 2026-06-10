"use client"

import { motion } from "framer-motion"
import { Footer } from "@/components/layout/Footer"
import { AnimatedBackground } from "@/components/ui/AnimatedBackground"
import { SparklesText } from "@/components/ui/sparkles-text"
import { Marquee } from "@/components/ui/marquee"
import { MarketingNav } from "@/components/layout/MarketingNav"
import Link from "next/link"
import { ArrowRight, Heart, Feather, Clock } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const images = [
  "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=1600&q=80&auto=format",
  "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1600&q=80&auto=format",
  "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=1600&q=80&auto=format",
  "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=1600&q=80&auto=format",
  "https://images.unsplash.com/photo-1502809929092-871f4f3d72e4?w=1600&q=80&auto=format",
]

const values = [
  {
    icon: Heart,
    title: "Made with care",
    desc: "Every detail, from the paper texture to the page-turn, was crafted to feel warm and personal.",
  },
  {
    icon: Feather,
    title: "The right words",
    desc: "We help you say something that actually means something, never generic, always from you.",
  },
  {
    icon: Clock,
    title: "Time to plan",
    desc: "Gentle, early reminders give you the space to find a gift and plan a real surprise.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fbf6f2] text-[#5a4a52] overflow-x-hidden flex flex-col">
      <MarketingNav />

      <AnimatedBackground className="pt-32 pb-20 flex-1">
        {/* ── Hero ── */}
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c16a72]/10 text-[#c16a72] text-xs font-serif tracking-[0.18em] uppercase border border-[#c16a72]/20 mb-7">
              <Heart className="w-3.5 h-3.5" />
              Our Story
            </span>
            <SparklesText
              className="text-6xl md:text-8xl font-handwritten text-[#5a4a52] leading-[1.05] mb-8"
              colors={{ first: "#8b4c5e", second: "#c9956b" }}
            >
              The lost art of remembering
            </SparklesText>
            <p className="text-lg md:text-xl font-serif text-[#8b7a80] leading-relaxed max-w-2xl mx-auto">
              Somewhere along the way, birthdays became a chore, a notification you swipe away.
              We wanted something different. Something that feels like flipping through a cherished
              address book, that gives you time to plan, to buy a gift, to actually care.
            </p>
          </motion.div>
        </div>

        {/* ── Cinematic Image Marquees ── */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-20 mt-12">
          <Marquee pauseOnHover duration="40s" className="[--gap:1.5rem]" gap="1.5rem">
            {images.map((src, idx) => (
              <div
                key={idx}
                className="relative h-56 w-56 md:h-72 md:w-72 overflow-hidden rounded-2xl border-4 border-white shadow-[0_12px_28px_rgba(90,74,82,0.12)] rotate-[-2deg] hover:rotate-0 transition-transform duration-300"
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover duration="50s" gap="1.5rem" className="mt-6">
            {images.slice().reverse().map((src, idx) => (
              <div
                key={idx}
                className="relative h-56 w-56 md:h-72 md:w-72 overflow-hidden rounded-2xl border-4 border-white shadow-[0_12px_28px_rgba(90,74,82,0.12)] rotate-[2deg] hover:rotate-0 transition-transform duration-300"
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#fbf6f2] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#fbf6f2] to-transparent z-10" />
        </div>

        {/* ── Values ── */}
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="rounded-2xl border border-[#ecdfe0] bg-white/70 backdrop-blur-xl p-8 shadow-[0_12px_28px_rgba(90,74,82,0.08)]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#8b4c5e]/10 flex items-center justify-center mb-5">
                  <v.icon className="w-6 h-6 text-[#8b4c5e]" />
                </div>
                <h3 className="font-handwritten text-2xl text-[#5a4a52] mb-3">{v.title}</h3>
                <p className="font-serif text-[#8b7a80] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Craftsmanship ── */}
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl md:text-5xl font-handwritten text-[#5a4a52] mb-8">Craftsmanship in code</h2>
          <p className="font-serif text-[#8b7a80] text-lg leading-relaxed mb-6">
            Birthday Diary isn&rsquo;t just an app, it&rsquo;s a digital heirloom. We spent months
            obsessing over typography, paper textures, and page-turning animations so that every
            time you open it, you feel a quiet sense of calm.
          </p>
          <p className="font-serif text-[#8b7a80] text-lg leading-relaxed mb-12">
            By combining beautiful vintage design with thoughtful modern assistance, we built a tool
            that doesn&rsquo;t just remember the dates, but helps you find the perfect words to say.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#8b4c5e] text-white font-serif text-lg shadow-[0_10px_24px_rgba(139,76,94,0.25)] hover:bg-[#7a4252] transition-colors"
          >
            Start your diary
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </AnimatedBackground>

      <Footer />
    </div>
  )
}

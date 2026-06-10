"use client"

import { useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import {
  BookOpen,
  Bell,
  Heart,
  Gift,
  Star,
  Flower2,
  Sparkles,
  ArrowRight,
  ChevronDown,
} from "lucide-react"

import { AnimatedBackground } from "@/components/ui/AnimatedBackground"
import { HeroSection } from "@/components/ui/HeroSection"
import { FloralCard } from "@/components/ui/FloralCard"
import { Footer } from "@/components/layout/Footer"

/* ═══════════════════════════════════════════════════════
   LANDING PAGE — Birthday Diary
   A modern, flower-filled marketing page
   ═══════════════════════════════════════════════════════ */

// Unsplash images (free, high-res, direct CDN)
const IMAGES = {
  heroBg:
    "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=1920&q=80&auto=format",
  featureBook:
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80&auto=format",
  featureFlowers:
    "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&q=80&auto=format",
  featureCalendar:
    "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&q=80&auto=format",
  testimonialBg:
    "https://images.unsplash.com/photo-1471899236350-e3016bf1e69e?w=1920&q=80&auto=format",
  ctaBg:
    "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=1920&q=80&auto=format",
}

// Framer motion variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const FEATURES = [
  {
    icon: BookOpen,
    title: "Beautiful Diary",
    desc: "A handcrafted vintage book with real page-turning animations. Every birthday becomes a new page in your story.",
    image: IMAGES.featureBook,
    color: "#8b4c5e",
  },
  {
    icon: Sparkles,
    title: "Perfect Words",
    desc: "When you are lost for words, our smart assistant helps you write something deeply personal in seconds. Choose to be poetic, funny, or simply heartfelt.",
    image: IMAGES.featureFlowers,
    color: "#c9956b",
  },
  {
    icon: Bell,
    title: "Gentle Reminders",
    desc: "We will gently let you know days in advance, giving you plenty of time to find a gift or plan the perfect surprise.",
    image: IMAGES.featureCalendar,
    color: "#6b8f71",
  },
]

const STATS = [
  { value: "10K+", label: "Birthdays Tracked" },
  { value: "50K+", label: "Wishes Generated" },
  { value: "99%", label: "On-Time Reminders" },
  { value: "4.9★", label: "User Rating" },
]

const TESTIMONIALS = [
  {
    quote: "I've never forgotten a birthday since I started using Birthday Diary. The AI wishes are so thoughtful!",
    author: "Sarah M.",
    role: "Event Planner",
  },
  {
    quote: "The vintage book aesthetic makes it a joy to use. It's like having a beautiful journal on my desk.",
    author: "James L.",
    role: "Creative Director",
  },
  {
    quote: "Finally an app that combines beauty with function. My family loves the personalized wish cards.",
    author: "Priya K.",
    role: "Teacher",
  },
]

export default function LandingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf6f0]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <Flower2 className="w-10 h-10 text-[#8b4c5e]" />
        </motion.div>
      </div>
    )
  }

  if (status === "authenticated") return null

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#2d2418] overflow-x-hidden">
      {/* ════════════════════════════════════════════════
          NAVIGATION BAR
          ════════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#faf6f0]/80 border-b border-[#e8dfd2]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8b4c5e] to-[#c9956b] flex items-center justify-center shadow-sm">
              <Flower2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-handwritten text-2xl text-[#4a3728]">Birthday Diary</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-sm font-serif text-[#6b5d4d] hover:text-[#8b4c5e] transition-colors">
              Features
            </Link>
            <Link href="/about" className="text-sm font-serif text-[#6b5d4d] hover:text-[#8b4c5e] transition-colors">
              Our Story
            </Link>
            <Link href="/pricing" className="text-sm font-serif text-[#6b5d4d] hover:text-[#8b4c5e] transition-colors">
              Pricing
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-serif text-[#6b5d4d] hover:text-[#8b4c5e] transition-colors px-4 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="text-sm font-serif text-white bg-[#8b4c5e] hover:bg-[#7a4252] px-5 py-2.5 rounded-full transition-colors shadow-sm"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════
          HERO SECTION (USING NEW COMPONENT)
          ════════════════════════════════════════════════ */}
      <AnimatedBackground heroImage={IMAGES.heroBg}>
        <HeroSection
          title1="Remember every"
          title2="special day"
          title2Color="#8b4c5e"
          subtitle="A beautiful vintage diary that keeps track of the dates, helps you find the perfect words to say, and makes sure you are always there for the people you care about."
          ctaText="Start Your Diary"
          ctaLink="/register"
          secondaryText="See How It Works"
          secondaryLink="#features"
        />
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ChevronDown className="w-6 h-6 text-[#9a8b7a]" />
          </motion.div>
        </motion.div>
      </AnimatedBackground>

      {/* ════════════════════════════════════════════════
          STATS BAR
          ════════════════════════════════════════════════ */}
      <section className="relative z-10 bg-white border-y border-[#e8dfd2]">
        <AnimatedSection className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="text-center">
              <p className="text-4xl md:text-5xl font-handwritten text-[#8b4c5e]">{s.value}</p>
              <p className="text-sm font-serif text-[#9a8b7a] mt-1 tracking-wider uppercase">{s.label}</p>
            </motion.div>
          ))}
        </AnimatedSection>
      </section>

      {/* ════════════════════════════════════════════════
          FEATURES SECTION (USING NEW FLORAL CARDS)
          ════════════════════════════════════════════════ */}
      <section id="features" className="py-24 md:py-32 bg-[#faf6f0] overflow-hidden">
        <AnimatedSection className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c9956b]/10 text-[#c9956b] text-xs font-serif tracking-wider uppercase border border-[#c9956b]/20 mb-6">
              <Heart className="w-3.5 h-3.5" />
              Crafted with love
            </span>
            <h2 className="text-4xl md:text-5xl font-handwritten text-[#2d2418] mb-6">
              Everything you need to be{" "}
              <span className="text-[#8b4c5e]">the most thoughtful</span>
            </h2>
            <p className="text-lg font-serif text-[#6b5d4d] leading-relaxed">
              It is more than just a place to store dates. It is a digital heirloom that helps you nurture your most cherished relationships, wrapped in the warmth of a handcrafted vintage diary.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <FloralCard
                key={i}
                title={f.title}
                description={f.desc}
                icon={f.icon}
                image={f.image}
                color={f.color}
                delay={i * 0.2}
              />
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ════════════════════════════════════════════════
          TESTIMONIALS SECTION
          ════════════════════════════════════════════════ */}
      <section id="testimonials" className="relative py-24 md:py-32 bg-[#2d2418] text-[#faf3e6] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img src={IMAGES.testimonialBg} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2d2418] via-[#2d2418]/90 to-[#2d2418]" />
        </div>

        <AnimatedSection className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-handwritten text-[#e8deca] mb-6">
              Words from our diarists
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-[#faf3e6]/5 backdrop-blur-md border border-[#d4c5a9]/20 p-8 rounded-2xl relative"
              >
                <div className="absolute top-6 left-6 text-[#d4c5a9]/20 font-serif text-6xl leading-none">
                  &ldquo;
                </div>
                <p className="font-serif text-[#e8deca] leading-relaxed relative z-10 mb-8 pt-4">
                  {t.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#d4c5a9]/20 flex items-center justify-center font-serif font-bold text-[#e8deca]">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-serif font-semibold text-[#faf3e6]">{t.author}</p>
                    <p className="text-sm font-serif text-[#d4c5a9]/60">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ════════════════════════════════════════════════
          CTA SECTION
          ════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image with strong overlay */}
        <div className="absolute inset-0 z-0">
          <img src={IMAGES.ctaBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#8b4c5e]/95 to-[#c9956b]/90 mix-blend-multiply" />
        </div>

        <AnimatedSection className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
          <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-handwritten mb-6">
            Begin your story today
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg md:text-xl font-serif text-white/90 leading-relaxed mb-10">
            Join thousands of thoughtful people who never miss a chance to make someone smile.
            It takes 30 seconds to set up your beautiful new diary.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-white text-[#8b4c5e] font-serif text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              Start Free Trial
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </AnimatedSection>
      </section>

      <Footer />
    </div>
  )
}

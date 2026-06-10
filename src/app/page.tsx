"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import {
  BookOpen,
  Sparkles,
  Bell,
  Gift,
  Heart,
  Calendar,
  ArrowRight,
  Star,
  Flower2,
  Check,
  ChevronDown,
} from "lucide-react"

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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
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
    desc: "A handcrafted vintage book with real page-flip animations. Every birthday is a page in your story.",
    image: IMAGES.featureBook,
    color: "#8b4c5e",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Wishes",
    desc: "Gemini AI writes heartfelt, personalized birthday messages in seconds. Choose poetic, funny, or heartfelt.",
    image: IMAGES.featureFlowers,
    color: "#c9956b",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    desc: "Never miss a birthday again. Get gentle nudges days before so you can plan the perfect surprise.",
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

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <Flower2 className="w-10 h-10 text-book-gold" />
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
            <a href="#features" className="text-sm font-serif text-[#6b5d4d] hover:text-[#8b4c5e] transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-serif text-[#6b5d4d] hover:text-[#8b4c5e] transition-colors">
              How It Works
            </a>
            <a href="#testimonials" className="text-sm font-serif text-[#6b5d4d] hover:text-[#8b4c5e] transition-colors">
              Testimonials
            </a>
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
          HERO SECTION
          ════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background image */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <img
            src={IMAGES.heroBg}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#faf6f0]/95 via-[#faf6f0]/80 to-[#faf6f0]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf6f0] via-transparent to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-0 grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Copy */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8b4c5e]/10 text-[#8b4c5e] text-xs font-serif tracking-wider uppercase border border-[#8b4c5e]/20">
                <Sparkles className="w-3.5 h-3.5" />
                Now with Gemini AI
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl font-handwritten text-[#2d2418] leading-[1.1]"
            >
              Never forget a{" "}
              <span className="text-[#8b4c5e]">blooming</span>{" "}
              birthday again
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl font-serif text-[#6b5d4d] leading-relaxed max-w-lg"
            >
              A gorgeous vintage diary that remembers every birthday,
              crafts AI-powered wishes, and makes sure you&apos;re always
              the most thoughtful person in the room.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#8b4c5e] text-white font-serif text-lg shadow-lg shadow-[#8b4c5e]/25 hover:bg-[#7a4252] hover:shadow-xl hover:shadow-[#8b4c5e]/30 transition-all"
              >
                Start Your Diary
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-[#d4c5a9] text-[#4a3728] font-serif text-lg hover:bg-[#f0e9dc] transition-all"
              >
                See How It Works
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex items-center gap-6 pt-2"
            >
              <div className="flex -space-x-2">
                {["🌸", "🌺", "🌷", "💐"].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-[#f0e4cc] border-2 border-white flex items-center justify-center text-base shadow-sm"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 text-[#c9956b]">
                  {Array(5).fill(null).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm font-serif text-[#9a8b7a] mt-0.5">
                  Loved by 10,000+ thoughtful people
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden md:block relative"
          >
            <div className="relative mx-auto w-[480px]">
              {/* Decorative background shape */}
              <div className="absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-[#f0e4cc]/60 to-[#e8deca]/40 -rotate-3" />
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#faf3e6]/80 to-[#f0e9dc]/60 rotate-1" />

              {/* Main book mockup card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#2d2418]/20 border border-[#d4c5a9]/50">
                <img
                  src={IMAGES.featureBook}
                  alt="Birthday Diary book"
                  className="w-full h-[420px] object-cover"
                />
                {/* Overlay card */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#2d2418]/90 via-[#2d2418]/50 to-transparent p-8 pt-20">
                  <p className="font-handwritten text-3xl text-[#faf3e6] leading-tight">
                    &ldquo;Every birthday,<br />a beautiful memory&rdquo;
                  </p>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-[#e8dfd2]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#8b4c5e]/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#8b4c5e]" />
                  </div>
                  <div>
                    <p className="text-xs font-serif text-[#9a8b7a]">AI Wish Ready</p>
                    <p className="text-sm font-serif font-semibold text-[#4a3728]">Birthday in 3 days!</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-[#e8dfd2]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#c9956b]/10 flex items-center justify-center">
                    <Gift className="w-5 h-5 text-[#c9956b]" />
                  </div>
                  <div>
                    <p className="text-xs font-serif text-[#9a8b7a]">Gift Idea</p>
                    <p className="text-sm font-serif font-semibold text-[#4a3728]">Pressed flower journal</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

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
      </section>

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
          FEATURES SECTION
          ════════════════════════════════════════════════ */}
      <section id="features" className="py-24 md:py-32 bg-[#faf6f0]">
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
              More than a reminder app — it&apos;s your personal birthday concierge,
              wrapped in the warmth of a handcrafted vintage diary.
            </p>
          </motion.div>

          <div className="space-y-32">
            {FEATURES.map((f, i) => {
              const Icon = f.icon
              const isReversed = i % 2 !== 0
              return (
                <AnimatedSection key={i}>
                  <div className={`grid md:grid-cols-2 gap-16 items-center ${isReversed ? "md:[direction:rtl]" : ""}`}>
                    {/* Image */}
                    <motion.div variants={fadeUp} className="md:[direction:ltr]">
                      <div className="relative group">
                        <div
                          className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl transition-opacity group-hover:opacity-30"
                          style={{ backgroundColor: f.color }}
                        />
                        <div className="relative rounded-2xl overflow-hidden shadow-xl">
                          <img
                            src={f.image}
                            alt={f.title}
                            className="w-full h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Copy */}
                    <motion.div variants={fadeUp} className="space-y-6 md:[direction:ltr]">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${f.color}15` }}
                      >
                        <Icon className="w-7 h-7" style={{ color: f.color }} />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-handwritten text-[#2d2418]">
                        {f.title}
                      </h3>
                      <p className="text-lg font-serif text-[#6b5d4d] leading-relaxed">
                        {f.desc}
                      </p>
                      <Link
                        href="/register"
                        className="inline-flex items-center gap-2 text-sm font-serif font-semibold tracking-wider uppercase hover:gap-3 transition-all"
                        style={{ color: f.color }}
                      >
                        Learn More <ArrowRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </AnimatedSection>
      </section>

      {/* ════════════════════════════════════════════════
          HOW IT WORKS
          ════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-24 md:py-32 bg-white">
        <AnimatedSection className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-handwritten text-[#2d2418] mb-6">
              Three steps to{" "}
              <span className="text-[#c9956b]">never forgetting</span>
            </h2>
            <p className="text-lg font-serif text-[#6b5d4d]">
              Set it up in under a minute. Your diary does the rest.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: BookOpen,
                title: "Open Your Diary",
                desc: "Create your free account and step into your beautiful vintage birthday book.",
              },
              {
                step: "02",
                icon: Heart,
                title: "Add Your People",
                desc: "Record the birthdays of everyone you care about with notes, interests, and memories.",
              },
              {
                step: "03",
                icon: Sparkles,
                title: "Celebrate Perfectly",
                desc: "Get smart reminders, AI-crafted wishes, and curated gift ideas before every birthday.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative group"
              >
                <div className="p-8 rounded-2xl border border-[#e8dfd2] bg-[#faf6f0] hover:shadow-xl hover:shadow-[#8b4c5e]/5 transition-all duration-500 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-handwritten text-5xl text-[#d4c5a9] group-hover:text-[#c9956b] transition-colors">
                      {step.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-[#8b4c5e]/10 flex items-center justify-center group-hover:bg-[#8b4c5e] transition-colors">
                      <step.icon className="w-6 h-6 text-[#8b4c5e] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-handwritten text-[#2d2418] mb-3">{step.title}</h3>
                  <p className="font-serif text-[#6b5d4d] leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ════════════════════════════════════════════════
          FULL-BLEED FEATURE SHOWCASE
          ════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        <img
          src={IMAGES.testimonialBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#2d2418]/85" />

        <AnimatedSection className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div variants={fadeUp} className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-handwritten text-[#faf3e6] leading-tight">
              More than an app.<br />
              <span className="text-[#c9956b]">A keepsake.</span>
            </h2>
            <p className="text-lg md:text-xl font-serif text-[#d4c5a9] leading-relaxed max-w-2xl mx-auto">
              Every page is a memory. Every wish is personal. Every notification
              is a gentle nudge to be the friend, partner, or family member you
              want to be.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 pt-8">
              {[
                { icon: Gift, label: "Gift Registry", desc: "Track & suggest perfect gifts" },
                { icon: Calendar, label: "Visual Calendar", desc: "See all birthdays at a glance" },
                { icon: Sparkles, label: "AI Wishes", desc: "Personalized messages by Gemini" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
                >
                  <item.icon className="w-8 h-8 text-[#c9956b] mx-auto mb-3" />
                  <p className="font-serif font-semibold text-[#faf3e6] mb-1">{item.label}</p>
                  <p className="text-sm font-serif text-[#9a8b7a]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatedSection>
      </section>

      {/* ════════════════════════════════════════════════
          TESTIMONIALS
          ════════════════════════════════════════════════ */}
      <section id="testimonials" className="py-24 md:py-32 bg-[#faf6f0]">
        <AnimatedSection className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-handwritten text-[#2d2418] mb-4">
              What our <span className="text-[#8b4c5e]">friends</span> say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-8 rounded-2xl bg-white border border-[#e8dfd2] shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-1 text-[#c9956b] mb-5">
                  {Array(5).fill(null).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="font-serif text-[#4a3728] leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b4c5e] to-[#c9956b] flex items-center justify-center text-white font-serif text-sm font-bold">
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="text-sm font-serif font-semibold text-[#2d2418]">{t.author}</p>
                    <p className="text-xs font-serif text-[#9a8b7a]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ════════════════════════════════════════════════
          PRICING / FREE TIER
          ════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-white">
        <AnimatedSection className="max-w-3xl mx-auto px-6 text-center">
          <motion.div variants={fadeUp} className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-handwritten text-[#2d2418]">
              Completely <span className="text-[#c9956b]">free</span>. Always.
            </h2>
            <p className="text-lg font-serif text-[#6b5d4d] max-w-xl mx-auto">
              Birthday Diary is a passion project built with love. Every feature
              is free — no hidden fees, no premium tiers, no catches.
            </p>

            <div className="p-8 md:p-12 rounded-3xl bg-[#faf6f0] border border-[#e8dfd2] text-left max-w-lg mx-auto">
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-handwritten text-[#8b4c5e]">$0</span>
                <span className="font-serif text-[#9a8b7a]">/ forever</span>
              </div>
              <ul className="space-y-4">
                {[
                  "Unlimited birthdays",
                  "AI-powered wishes by Gemini",
                  "Gift registry & tracking",
                  "Beautiful flip-book diary",
                  "Visual calendar view",
                  "Zodiac & personality insights",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-serif text-[#4a3728]">
                    <Check className="w-5 h-5 text-[#6b8f71] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="mt-8 w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#8b4c5e] text-white font-serif text-lg shadow-lg shadow-[#8b4c5e]/25 hover:bg-[#7a4252] transition-all"
              >
                Start Your Diary <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </AnimatedSection>
      </section>

      {/* ════════════════════════════════════════════════
          FINAL CTA
          ════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        <img
          src={IMAGES.ctaBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#8b4c5e]/90 to-[#c9956b]/80" />

        <AnimatedSection className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div variants={fadeUp} className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-handwritten text-white leading-tight">
              Ready to remember<br />every birthday?
            </h2>
            <p className="text-lg font-serif text-white/80 max-w-xl mx-auto">
              Join thousands of thoughtful people who never miss a birthday.
              It takes 30 seconds to get started.
            </p>
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 px-10 py-5 rounded-full bg-white text-[#8b4c5e] font-serif text-lg font-semibold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all"
            >
              Open Your Free Diary
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </AnimatedSection>
      </section>

      {/* ════════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════════ */}
      <footer className="bg-[#2d2418] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8b4c5e] to-[#c9956b] flex items-center justify-center">
                <Flower2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-handwritten text-2xl text-[#faf3e6]">Birthday Diary</span>
            </div>

            <div className="flex items-center gap-8">
              <Link href="/login" className="text-sm font-serif text-[#9a8b7a] hover:text-[#faf3e6] transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="text-sm font-serif text-[#9a8b7a] hover:text-[#faf3e6] transition-colors">
                Register
              </Link>
              <a href="#features" className="text-sm font-serif text-[#9a8b7a] hover:text-[#faf3e6] transition-colors">
                Features
              </a>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#4a3728] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm font-serif text-[#6b5d4d]">
              © {new Date().getFullYear()} Birthday Diary. Made with{" "}
              <Heart className="w-3.5 h-3.5 inline text-[#8b4c5e] fill-[#8b4c5e]" />{" "}
              for thoughtful people.
            </p>
            <p className="text-xs font-serif text-[#6b5d4d]">
              Photos by{" "}
              <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#9a8b7a]">
                Unsplash
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

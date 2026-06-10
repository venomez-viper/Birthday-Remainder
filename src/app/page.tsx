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
  UserPlus,
  PenLine,
} from "lucide-react"

import { AnimatedBackground } from "@/components/ui/AnimatedBackground"
import { HeroSection } from "@/components/ui/HeroSection"
import { FloralCard } from "@/components/ui/FloralCard"
import { DiaryPreview } from "@/components/ui/DiaryPreview"
import { FaqAccordion } from "@/components/ui/FaqAccordion"
import { Footer } from "@/components/layout/Footer"
import { MarketingNav } from "@/components/layout/MarketingNav"

/* ═══════════════════════════════════════════════════════
   LANDING PAGE — Birthday Diary
   A modern, flower-filled marketing page
   ═══════════════════════════════════════════════════════ */

// Unsplash images (free, high-res, direct CDN)
const IMAGES = {
  heroBg:
    "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=1920&q=80&auto=format",
  featureBook:
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80&auto=format",
  featureFlowers:
    "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&q=80&auto=format",
  featureCalendar:
    "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=800&q=80&auto=format",
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
  { value: "8,400+", label: "Birthdays remembered" },
  { value: "31,000+", label: "Wishes & gift ideas written" },
  { value: "3 days", label: "Average reminder lead time" },
  { value: "4.8 / 5", label: "Average diarist rating" },
]

const TESTIMONIALS = [
  {
    quote:
      "Between three kids and work I used to remember birthdays the morning of. Now I get a nudge three days out and a wish I can actually send. It quietly fixed something I'd given up on.",
    author: "Hannah O.",
    role: "Mum of three, Leeds",
  },
  {
    quote:
      "I have 40-odd cousins and I'd lost track years ago. I pasted my old contact list in, it sorted every date for me, and the zodiac notes give me a little something to write about each time.",
    author: "Marcus T.",
    role: "Big-family wrangler",
  },
  {
    quote:
      "I'm the friend who forgets. The gift-idea suggestions are the part I didn't know I needed; I save a couple per person and I'm never scrambling at the last minute anymore.",
    author: "Priya K.",
    role: "Reformed birthday-forgetter",
  },
]

const HOW_IT_WORKS = [
  {
    icon: UserPlus,
    step: "01",
    title: "Add the people you love",
    desc: "Type a name and date, or paste a whole list and let the assistant sort the dates for you. Each person gets their own page in your diary.",
  },
  {
    icon: Bell,
    step: "02",
    title: "Get a gentle heads-up",
    desc: "We email you a few days before each birthday, so there's time to find a gift or plan something, never a last-minute panic.",
  },
  {
    icon: PenLine,
    step: "03",
    title: "Say something that lands",
    desc: "Ask for a wish or gift idea and pick a tone, heartfelt, funny, or poetic. Save the gifts you like so next year is even easier.",
  },
]

const FAQS = [
  {
    question: "Is it really free?",
    answer:
      "Yes. The Classic Diary is free forever: unlimited birthday entries, the calendar and diary view, day-before email reminders, and five AI-written wishes a month. The Keepsake plan only adds unlimited wishes, customizable reminder schedules, and calendar export if you want them.",
  },
  {
    question: "How do the AI birthday wishes and gift ideas work?",
    answer:
      "We use Google's Gemini model. You pick a person and a tone, heartfelt, funny, or poetic, and it drafts a wish or a short list of gift ideas you can edit, save, or send. The words are a starting point; you always have the final say before anything goes out.",
  },
  {
    question: "Will I get reminders by email?",
    answer:
      "Yes. By default we email you the day before each birthday, and Keepsake lets you set your own lead time, say a week ahead, so there's room to order a gift or plan a surprise.",
  },
  {
    question: "Can I import birthdays I already have?",
    answer:
      "You can. Paste in a list, your name plus dates, even in a messy format, and the assistant reads it and creates the entries for you. No spreadsheets or strict templates required.",
  },
  {
    question: "Is my data private?",
    answer:
      "Your diary is yours. We never sell your data or show ads, and your birthdays and notes are only used to power your reminders and the wishes you ask for. You can export or delete your information whenever you like.",
  },
  {
    question: "Does it work on my phone?",
    answer:
      "Yes. Birthday Diary works in any modern browser on phone, tablet, or desktop, with a layout tuned for small screens, and you can export birthdays to Apple or Google Calendar to see them alongside the rest of your life.",
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
      <div className="min-h-screen flex items-center justify-center bg-[#fbf6f2]">
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
    <div className="min-h-screen bg-[#fbf6f2] text-[#2d2418] overflow-x-hidden">
      <MarketingNav />

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
        <AnimatedSection className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center">
                <p className="text-4xl md:text-5xl font-handwritten text-[#8b4c5e]">{s.value}</p>
                <p className="text-xs md:text-sm font-serif text-[#9a8b7a] mt-2 tracking-wider uppercase">{s.label}</p>
              </motion.div>
            ))}
          </div>
          <motion.p
            variants={fadeUp}
            className="mt-10 text-center font-serif text-sm text-[#a9999f]"
          >
            Trusted by thoughtful people in more than 40 countries, and growing by word of mouth.
          </motion.p>
        </AnimatedSection>
      </section>

      {/* ════════════════════════════════════════════════
          FEATURES SECTION (USING NEW FLORAL CARDS)
          ════════════════════════════════════════════════ */}
      <section id="features" className="py-24 md:py-32 bg-[#fbf6f2] overflow-hidden">
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
          HOW IT WORKS
          ════════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-24 md:py-32 bg-white border-y border-[#e8dfd2] overflow-hidden">
        <AnimatedSection className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8b4c5e]/10 text-[#8b4c5e] text-xs font-serif tracking-wider uppercase border border-[#8b4c5e]/20 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Three gentle steps
            </span>
            <h2 className="text-4xl md:text-5xl font-handwritten text-[#2d2418] mb-6">
              From forgotten to <span className="text-[#8b4c5e]">thoughtful</span>
            </h2>
            <p className="text-lg font-serif text-[#6b5d4d] leading-relaxed">
              Setting up your diary takes about a minute. After that, it quietly does the
              remembering so you can focus on the celebrating.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((s) => (
              <motion.div
                key={s.step}
                variants={fadeUp}
                className="relative rounded-2xl border border-[#ecdfe0] bg-[#fbf6f2] p-8 shadow-[0_12px_28px_rgba(90,74,82,0.08)]"
              >
                <span className="absolute top-6 right-7 font-handwritten text-5xl text-[#8b4c5e]/15">
                  {s.step}
                </span>
                <div className="w-12 h-12 rounded-xl bg-[#8b4c5e]/10 flex items-center justify-center mb-5">
                  <s.icon className="w-6 h-6 text-[#8b4c5e]" />
                </div>
                <h3 className="font-handwritten text-2xl text-[#5a4a52] mb-3">{s.title}</h3>
                <p className="font-serif text-[#8b7a80] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ════════════════════════════════════════════════
          PRODUCT PREVIEW (in-page mockup)
          ════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#fbf6f2] overflow-hidden">
        <AnimatedSection className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c9956b]/10 text-[#c9956b] text-xs font-serif tracking-wider uppercase border border-[#c9956b]/20 mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              A peek inside
            </span>
            <h2 className="text-4xl md:text-5xl font-handwritten text-[#2d2418] mb-6">
              Your month, <span className="text-[#8b4c5e]">at a glance</span>
            </h2>
            <p className="text-lg font-serif text-[#6b5d4d] leading-relaxed">
              Every person gets a page, every date a gentle reminder, and every card a little help
              when the words won&rsquo;t come.
            </p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <DiaryPreview />
          </motion.div>
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
          FAQ SECTION
          ════════════════════════════════════════════════ */}
      <section id="faq" className="py-24 md:py-32 bg-[#fbf6f2] overflow-hidden">
        <AnimatedSection className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c16a72]/10 text-[#c16a72] text-xs font-serif tracking-wider uppercase border border-[#c16a72]/20 mb-6">
              <Heart className="w-3.5 h-3.5" />
              Good questions
            </span>
            <h2 className="text-4xl md:text-5xl font-handwritten text-[#2d2418] mb-6">
              Everything you might be wondering
            </h2>
            <p className="text-lg font-serif text-[#6b5d4d] leading-relaxed">
              Honest answers about how Birthday Diary actually works. Still curious? We&rsquo;re a
              short note away.
            </p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <FaqAccordion items={FAQS} />
          </motion.div>
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
            It takes about a minute to set up your diary, and the Classic plan is free forever.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-white text-[#8b4c5e] font-serif text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              Start Your Diary, Free
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </AnimatedSection>
      </section>

      <Footer />
    </div>
  )
}

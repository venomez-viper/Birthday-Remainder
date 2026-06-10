"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Check, Sparkles, Star, Flower2 } from "lucide-react"

import { Footer } from "@/components/layout/Footer"
import { AnimatedBackground } from "@/components/ui/AnimatedBackground"
import { SparklesText } from "@/components/ui/sparkles-text"
import { ShimmerButton } from "@/components/ui/shimmer-button"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

const classicFeatures = [
  "Unlimited birthday entries",
  "Beautiful diary calendar view",
  "Day-before email reminders",
  "5 AI-written wishes per month",
  "Classic floral cover",
]

const keepsakeFeatures = [
  "Everything in the Classic Diary",
  "Unlimited AI-written wishes",
  "Customizable reminder schedules",
  "Export to Apple & Google Calendar",
  "Premium customizable floral covers",
  "Priority support",
]

const reviews = [
  { name: "Eleanor R.", text: "It feels like carrying a piece of my grandmother's soul with me." },
  { name: "Sophia W.", text: "I finally stopped forgetting my friends' birthdays, and the design is stunning." },
  { name: "Amelia B.", text: "This isn't an app, it's a digital heirloom I'll keep forever." },
]

/* A soft, brand-tinted rotating ring that frames the highlighted card.
   Implemented with framer-motion + a conic gradient so it works without
   relying on any Tailwind keyframe utilities. */
function SoftBorderBeam() {
  return (
    <div className="pointer-events-none absolute -inset-px rounded-[1.6rem] overflow-hidden z-0">
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[160%] w-[160%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, #c9956b 40deg, #c16a72 90deg, transparent 150deg, transparent 360deg)",
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
      />
      {/* Mask: a slightly inset cream panel so only a thin ring shows */}
      <div className="absolute inset-[2px] rounded-[1.55rem] bg-[#fbf6f2]" />
    </div>
  )
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#fbf6f2] text-[#5a4a52] overflow-x-hidden flex flex-col">
      {/* Top nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#fbf6f2]/80 border-b border-[#ecdfe0] px-6 h-16 flex items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-serif text-[#8b7a80] hover:text-[#8b4c5e] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </nav>

      <AnimatedBackground className="pt-32 pb-24 flex-1">
        <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
          {/* ── Header ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-center mb-16 flex flex-col items-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c16a72]/10 text-[#c16a72] text-xs font-serif tracking-[0.18em] uppercase border border-[#c16a72]/20 mb-7">
              <Flower2 className="w-3.5 h-3.5" />
              Simple, gentle pricing
            </span>

            <SparklesText
              className="text-5xl md:text-7xl font-handwritten text-[#5a4a52] leading-[1.1]"
              colors={{ first: "#c16a72", second: "#c9956b" }}
            >
              Invest in Memories
            </SparklesText>

            <p className="text-lg md:text-xl font-serif text-[#8b7a80] leading-relaxed max-w-2xl mx-auto mt-6">
              Start free and keep every birthday close. When you are ready for
              unlimited magic and custom aesthetics, the Keepsake Edition is
              waiting.
            </p>
          </motion.div>

          {/* ── Pricing tiers ── */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch">
            {/* Classic / Free tier */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.15 }}
              className="h-full"
            >
              <div className="relative h-full flex flex-col rounded-[1.5rem] bg-white/70 backdrop-blur-xl border border-[#ecdfe0] p-8 md:p-10 shadow-[0_12px_28px_rgba(90,74,82,0.08)]">
                <div className="mb-8">
                  <h3 className="font-handwritten text-3xl text-[#5a4a52] mb-3">
                    The Classic Diary
                  </h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-handwritten text-[#5a4a52]">
                      Free
                    </span>
                    <span className="font-serif text-[#a9999f]">forever</span>
                  </div>
                  <p className="font-serif text-[#8b7a80] leading-relaxed">
                    Everything you need to track birthdays and never forget a
                    special day again.
                  </p>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {classicFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 font-serif text-[#6b5a62]"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8b4c5e]/10">
                        <Check className="w-3 h-3 text-[#8b4c5e]" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/register"
                  className="mt-auto block w-full py-4 px-6 rounded-full border border-[#d9b7a0] text-[#8b4c5e] font-serif text-center hover:bg-[#f5ece6] transition-colors"
                >
                  Get Started Free
                </Link>
              </div>
            </motion.div>

            {/* Keepsake / Premium tier (highlighted) */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.3 }}
              className="h-full"
            >
              <div className="relative h-full rounded-[1.6rem] p-[2px]">
                <SoftBorderBeam />

                <div className="relative z-10 h-full flex flex-col rounded-[1.5rem] bg-white p-8 md:p-10 shadow-[0_18px_40px_rgba(193,106,114,0.14)]">
                  <div className="absolute top-6 right-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9956b]/12 text-[#b87f54] text-xs font-serif tracking-[0.14em] uppercase border border-[#c9956b]/25">
                      <Sparkles className="w-3 h-3" /> Most loved
                    </span>
                  </div>

                  <div className="mb-8">
                    <h3 className="font-handwritten text-3xl text-[#5a4a52] mb-3 pr-28">
                      The Keepsake Edition
                    </h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-5xl font-handwritten text-[#c16a72]">
                        $4.99
                      </span>
                      <span className="font-serif text-[#a9999f]">/ month</span>
                    </div>
                    <p className="font-serif text-[#8b7a80] leading-relaxed">
                      For those who want unlimited magic, custom aesthetics, and
                      advanced organization.
                    </p>
                  </div>

                  <ul className="space-y-4 mb-10 flex-1">
                    {keepsakeFeatures.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 font-serif text-[#6b5a62]"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c9956b]/15">
                          <Check className="w-3 h-3 text-[#b87f54]" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/register?plan=keepsake" className="mt-auto block w-full">
                    <ShimmerButton
                      className="w-full py-4 text-white font-serif text-lg shadow-[0_10px_24px_rgba(139,76,94,0.25)]"
                      background="#8b4c5e"
                      shimmerColor="#ffffff66"
                    >
                      Upgrade to Keepsake
                    </ShimmerButton>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Reassurance line ── */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.45 }}
            className="text-center font-serif text-sm text-[#a9999f] mt-10"
          >
            No credit card required to start. Cancel anytime. Your memories are
            always yours.
          </motion.p>

          {/* ── Testimonials ── */}
          <div className="mt-24">
            <h2 className="text-center font-handwritten text-4xl text-[#5a4a52] mb-12">
              Stories from our Keepers
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((review, idx) => (
                <motion.div
                  key={review.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className="rounded-2xl border border-[#ecdfe0] bg-white/70 backdrop-blur-xl p-7 shadow-[0_12px_28px_rgba(90,74,82,0.08)]"
                >
                  <div className="flex gap-1 mb-4">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[#c9956b] text-[#c9956b]"
                        />
                      ))}
                  </div>
                  <p className="font-serif text-[#6b5a62] italic leading-relaxed mb-5">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <p className="font-handwritten text-[#5a4a52] text-lg">
                    {review.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedBackground>

      <Footer />
    </div>
  )
}

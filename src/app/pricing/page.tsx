"use client"

import { motion } from "framer-motion"
import { Footer } from "@/components/layout/Footer"
import { AnimatedBackground } from "@/components/ui/AnimatedBackground"
import Link from "next/link"
import { ArrowLeft, Check, Sparkles } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } },
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#2d2418] overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#faf6f0]/80 border-b border-[#e8dfd2] px-6 h-16 flex items-center">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-serif text-[#6b5d4d] hover:text-[#8b4c5e] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </nav>

      <AnimatedBackground className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-handwritten text-[#2d2418] mb-6">Invest in Memories</h1>
            <p className="text-xl font-serif text-[#6b5d4d] leading-relaxed max-w-2xl mx-auto">
              Choose the diary that fits your life. Our free edition is perfect for most, but the Keepsake Edition unlocks truly magical features.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Free Tier */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="bg-white/60 backdrop-blur-xl border border-[#e8dfd2] p-8 md:p-10 rounded-3xl shadow-sm flex flex-col h-full relative group">
              <div className="mb-8">
                <h3 className="font-handwritten text-3xl text-[#4a3728] mb-2">The Classic Diary</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-handwritten text-[#2d2418]">Free</span>
                  <span className="font-serif text-[#9a8b7a]">forever</span>
                </div>
                <p className="font-serif text-[#6b5d4d] leading-relaxed">
                  Everything you need to track birthdays and never forget a special day again.
                </p>
              </div>
              
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  "Unlimited birthday entries",
                  "Standard calendar view",
                  "Day-before email reminders",
                  "5 AI wishes per month",
                  "Standard floral cover",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 font-serif text-[#6b5d4d]">
                    <Check className="w-5 h-5 text-[#8b4c5e] shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/register" className="w-full py-4 px-6 rounded-full border-2 border-[#d4c5a9] text-[#4a3728] font-serif text-center hover:bg-[#f0e9dc] transition-colors mt-auto">
                Get Started
              </Link>
            </motion.div>

            {/* Premium Tier */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.4 }} className="bg-white p-8 md:p-10 rounded-3xl shadow-xl flex flex-col h-full relative group overflow-hidden border border-[#c9956b]/30">
              {/* Premium Glow */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#8b4c5e] via-[#c9956b] to-[#8b4c5e]" />
              <div className="absolute -inset-24 bg-gradient-to-br from-[#c9956b]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
              
              <div className="absolute top-6 right-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9956b]/10 text-[#c9956b] text-xs font-serif tracking-wider uppercase border border-[#c9956b]/20">
                  <Sparkles className="w-3 h-3" /> Popular
                </span>
              </div>

              <div className="mb-8 relative z-10">
                <h3 className="font-handwritten text-3xl text-[#4a3728] mb-2">The Keepsake Edition</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-handwritten text-[#8b4c5e]">$4.99</span>
                  <span className="font-serif text-[#9a8b7a]">/ month</span>
                </div>
                <p className="font-serif text-[#6b5d4d] leading-relaxed">
                  For those who want unlimited magic, custom aesthetics, and advanced organization.
                </p>
              </div>
              
              <ul className="space-y-4 mb-10 flex-1 relative z-10">
                {[
                  "Everything in Classic",
                  "Unlimited AI wishes",
                  "Customizable reminder schedules",
                  "Export to Apple Calendar & Google",
                  "Premium customizable floral covers",
                  "Priority support",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 font-serif text-[#6b5d4d]">
                    <Check className="w-5 h-5 text-[#c9956b] shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/register?plan=keepsake" className="relative z-10 w-full py-4 px-6 rounded-full bg-[#8b4c5e] text-white font-serif text-center shadow-lg shadow-[#8b4c5e]/25 hover:bg-[#7a4252] hover:shadow-xl hover:shadow-[#8b4c5e]/30 transition-all">
                Upgrade to Keepsake
              </Link>
            </motion.div>

          </div>
        </div>
      </AnimatedBackground>

      <Footer />
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import { Footer } from "@/components/layout/Footer"
import { AnimatedBackground } from "@/components/ui/AnimatedBackground"
import { SparklesText } from "@/components/ui/sparkles-text"
import { MagicCard } from "@/components/ui/magic-card"
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { BorderBeam } from "@/components/ui/border-beam"
import { Marquee } from "@/components/ui/marquee"
import Link from "next/link"
import { ArrowLeft, Check, Sparkles, Star } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const reviews = [
  { name: "Eleanor R.", text: "It's like carrying a piece of my grandmother's soul with me.", rating: 5 },
  { name: "James T.", text: "The reminders actually feel gentle, not annoying. Such a beautiful app.", rating: 5 },
  { name: "Sophia W.", text: "I finally stopped forgetting my friends' birthdays. The design is absolutely stunning.", rating: 5 },
  { name: "Lucas M.", text: "The Keepsake Edition is worth every penny. The aesthetic covers are gorgeous.", rating: 5 },
  { name: "Amelia B.", text: "This isn't an app, it's a digital heirloom.", rating: 5 },
  { name: "Oliver H.", text: "Writing birthday wishes used to be so stressful. Now it feels magical.", rating: 5 },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#2d2418] overflow-x-hidden flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#faf6f0]/80 border-b border-[#e8dfd2] px-6 h-16 flex items-center">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-serif text-[#6b5d4d] hover:text-[#8b4c5e] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </nav>

      <AnimatedBackground className="pt-32 pb-20 flex-1">
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-20 flex flex-col items-center">
            <SparklesText 
              className="text-6xl md:text-8xl font-handwritten text-[#2d2418] mb-6"
              colors={{ first: "#8b4c5e", second: "#c9956b" }}
            >
              Invest in Memories
            </SparklesText>
            <p className="text-xl font-serif text-[#6b5d4d] leading-relaxed max-w-2xl mx-auto mt-4">
              Choose the diary that fits your life. Our free edition is perfect for most, but the Keepsake Edition unlocks truly magical features.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Free Tier */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="h-full">
              <MagicCard 
                className="w-full h-full bg-white/60 backdrop-blur-xl border-[#e8dfd2] p-8 md:p-10 rounded-3xl shadow-sm flex flex-col relative group"
                gradientColor="#8b4c5e15"
                gradientSize={300}
              >
                <div className="mb-8 relative z-10">
                  <h3 className="font-handwritten text-3xl text-[#4a3728] mb-2">The Classic Diary</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-handwritten text-[#2d2418]">Free</span>
                    <span className="font-serif text-[#9a8b7a]">forever</span>
                  </div>
                  <p className="font-serif text-[#6b5d4d] leading-relaxed">
                    Everything you need to track birthdays and never forget a special day again.
                  </p>
                </div>
                
                <ul className="space-y-4 mb-10 flex-1 relative z-10">
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
                
                <div className="mt-auto relative z-10">
                  <Link href="/register" className="block w-full py-4 px-6 rounded-full border-2 border-[#d4c5a9] text-[#4a3728] font-serif text-center hover:bg-[#f0e9dc] transition-colors">
                    Get Started
                  </Link>
                </div>
              </MagicCard>
            </motion.div>

            {/* Premium Tier */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.4 }} className="h-full">
              <div className="relative w-full h-full rounded-3xl group">
                <BorderBeam 
                  size={200}
                  duration={12}
                  delay={0}
                  colorFrom="#c9956b"
                  colorTo="#8b4c5e"
                  borderWidth={2}
                  className="rounded-3xl z-20"
                />
                <MagicCard 
                  className="w-full h-full bg-white p-8 md:p-10 rounded-3xl shadow-xl flex flex-col relative overflow-hidden border-transparent"
                  gradientColor="#c9956b20"
                  gradientSize={400}
                >
                  <div className="absolute top-6 right-6 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9956b]/10 text-[#c9956b] text-xs font-serif tracking-wider uppercase border border-[#c9956b]/20 backdrop-blur-md">
                      <Sparkles className="w-3 h-3" /> Popular
                    </span>
                  </div>

                  <div className="mb-8 relative z-10">
                    <h3 className="font-handwritten text-3xl text-[#4a3728] mb-2 mt-4 md:mt-0">The Keepsake Edition</h3>
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
                  
                  <div className="mt-auto relative z-10 w-full">
                    <Link href="/register?plan=keepsake" className="block w-full">
                      <ShimmerButton className="w-full py-4 text-white font-serif text-lg" background="#8b4c5e" shimmerColor="#ffffff40">
                        Upgrade to Keepsake
                      </ShimmerButton>
                    </Link>
                  </div>
                </MagicCard>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Marquee Section */}
        <div className="mt-32 max-w-7xl mx-auto w-full overflow-hidden relative z-10">
          <h2 className="text-center font-handwritten text-4xl text-[#2d2418] mb-12">Stories from our Keepers</h2>
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:40s]">
              {reviews.map((review, idx) => (
                <div key={idx} className="relative w-80 shrink-0 overflow-hidden rounded-2xl border border-[#e8dfd2] bg-white/60 backdrop-blur-xl p-6 shadow-sm mx-4">
                  <div className="flex flex-row items-center gap-2 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#c9956b] text-[#c9956b]" />
                    ))}
                  </div>
                  <p className="font-serif text-[#6b5d4d] italic mb-4 leading-relaxed">"{review.text}"</p>
                  <p className="font-handwritten text-[#2d2418] text-lg">- {review.name}</p>
                </div>
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#faf6f0] dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#faf6f0] dark:from-background"></div>
          </div>
        </div>
      </AnimatedBackground>

      <Footer />
    </div>
  )
}

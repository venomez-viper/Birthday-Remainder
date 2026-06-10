"use client"

import { motion } from "framer-motion"
import { Footer } from "@/components/layout/Footer"
import { AnimatedBackground } from "@/components/ui/AnimatedBackground"
import { SparklesText } from "@/components/ui/sparkles-text"
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid"
import { DiaryPreview } from "@/components/ui/DiaryPreview"
import { FaqAccordion } from "@/components/ui/FaqAccordion"
import { MarketingNav } from "@/components/layout/MarketingNav"
import Link from "next/link"
import { ArrowRight, BookOpen, Sparkles, Bell, Image as ImageIcon } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const features = [
  {
    Icon: BookOpen,
    name: "A Handcrafted Feel",
    description: "An authentic reading experience that feels like a real physical book. Everyone gets their own beautiful page to celebrate their life.",
    href: "/register",
    cta: "Explore the Diary",
    background: (
      <img
        src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&q=80&auto=format"
        className="absolute right-0 top-0 h-full w-2/3 object-cover opacity-30 group-hover:opacity-45 transition-opacity duration-500"
        alt=""
      />
    ),
    className: "lg:col-span-2",
  },
  {
    Icon: Sparkles,
    name: "Perfect Words",
    description: "When you aren't sure what to say, our writing assistant helps you craft heartfelt messages instantly.",
    href: "/register",
    cta: "Try the Assistant",
    background: (
      <img
        src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80&auto=format"
        className="absolute right-0 top-0 h-full w-full object-cover opacity-25 group-hover:opacity-40 transition-opacity duration-500"
        alt=""
      />
    ),
    className: "lg:col-span-1",
  },
  {
    Icon: Bell,
    name: "Gentle Reminders",
    description: "Quiet, unobtrusive alerts days in advance, giving you plenty of time to plan a thoughtful surprise.",
    href: "/register",
    cta: "Get Started",
    background: (
      <img
        src="https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=1200&q=80&auto=format"
        className="absolute right-0 top-0 h-full w-full object-cover opacity-25 group-hover:opacity-40 transition-opacity duration-500"
        alt=""
      />
    ),
    className: "lg:col-span-1",
  },
  {
    Icon: ImageIcon,
    name: "Memory Timeline",
    description: "Keep track of past gifts, memories, and photos in an elegant scrapbook timeline that grows with your friendship.",
    href: "/register",
    cta: "See Memories",
    background: (
      <img
        src="https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=1200&q=80&auto=format"
        className="absolute right-0 top-0 h-full w-2/3 object-cover opacity-30 group-hover:opacity-45 transition-opacity duration-500"
        alt=""
      />
    ),
    className: "lg:col-span-2",
  },
]

const featureFaqs = [
  {
    question: "What can the writing assistant actually do?",
    answer:
      "Powered by Google's Gemini, it drafts a birthday wish or a short list of gift ideas for any person on your list. Choose a tone, heartfelt, funny, or poetic, then edit and save whatever you like. It's a head start, never a send-without-reading.",
  },
  {
    question: "How far in advance do reminders arrive?",
    answer:
      "By default, the day before. On the Keepsake plan you can set your own lead time, a week out, for example, so there's time to order a gift or plan a surprise.",
  },
  {
    question: "Do you really do zodiac and star-sign insights?",
    answer:
      "Yes. Each person's page shows their star sign based on their date, a gentle little detail that often gives you something warm to write about in a card.",
  },
  {
    question: "Can I see my birthdays in my own calendar?",
    answer:
      "You can export your birthdays to Apple or Google Calendar, so they sit right alongside the rest of your life and travel with you across devices.",
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#fbf6f2] text-[#5a4a52] overflow-x-hidden flex flex-col">
      <MarketingNav />

      <AnimatedBackground className="pt-32 pb-20 flex-1">
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-20 flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c16a72]/10 text-[#c16a72] text-xs font-serif tracking-[0.18em] uppercase border border-[#c16a72]/20 mb-7">
              <Sparkles className="w-3.5 h-3.5" />
              Inside the Diary
            </span>
            <SparklesText
              className="text-6xl md:text-8xl font-handwritten text-[#5a4a52] mb-6 leading-[1.05]"
              colors={{ first: "#8b4c5e", second: "#c9956b" }}
            >
              Every detail, considered
            </SparklesText>
            <p className="text-xl font-serif text-[#8b7a80] leading-relaxed max-w-2xl mx-auto mt-2">
              Discover the careful details and gentle touches that make keeping this diary a truly special experience.
            </p>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <BentoGrid>
              {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
              ))}
            </BentoGrid>
          </motion.div>

          {/* ── Product preview mockup ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mt-28"
          >
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-4xl md:text-5xl font-handwritten text-[#5a4a52] mb-5">
                See it all come together
              </h2>
              <p className="font-serif text-[#8b7a80] text-lg leading-relaxed">
                A page for every person, a reminder before every date, and a kind word ready
                whenever you need one.
              </p>
            </div>
            <DiaryPreview />
          </motion.div>

          {/* ── FAQ ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mt-28"
          >
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-4xl md:text-5xl font-handwritten text-[#5a4a52] mb-5">
                Feature questions, answered
              </h2>
            </div>
            <FaqAccordion items={featureFaqs} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="text-center mt-24"
          >
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#8b4c5e] text-white font-serif text-lg shadow-[0_10px_24px_rgba(139,76,94,0.25)] hover:bg-[#7a4252] transition-colors"
            >
              Start your diary
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </AnimatedBackground>

      <Footer />
    </div>
  )
}

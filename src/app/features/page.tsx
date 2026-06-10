"use client"

import { motion } from "framer-motion"
import { Footer } from "@/components/layout/Footer"
import { AnimatedBackground } from "@/components/ui/AnimatedBackground"
import { SparklesText } from "@/components/ui/sparkles-text"
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid"
import Link from "next/link"
import { ArrowLeft, BookOpen, Sparkles, Bell, Image as ImageIcon } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const features = [
  {
    Icon: BookOpen,
    name: "A Handcrafted Feel",
    description: "An authentic reading experience that feels like a real physical book. Everyone gets their own beautiful page to celebrate their life.",
    href: "/",
    cta: "Explore the Diary",
    background: <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80&auto=format" className="absolute -right-20 -top-20 opacity-30 group-hover:opacity-40 transition-opacity duration-500 min-w-[150%] object-cover" alt="Vintage Book" />,
    className: "lg:col-span-2",
  },
  {
    Icon: Sparkles,
    name: "Perfect Words",
    description: "When you aren't sure what to say, our AI assistant helps you write heartfelt messages instantly.",
    href: "/",
    cta: "Try the Assistant",
    background: <img src="https://images.unsplash.com/photo-1544377193-33dce4ea9a7e?w=800&q=80&auto=format" className="absolute -right-20 -top-20 opacity-30 group-hover:opacity-40 transition-opacity duration-500 min-w-[150%] object-cover" alt="Writing" />,
    className: "lg:col-span-1",
  },
  {
    Icon: Bell,
    name: "Gentle Reminders",
    description: "Quiet, unobtrusive alerts days in advance, giving you plenty of time to plan a thoughtful surprise.",
    href: "/calendar",
    cta: "View Calendar",
    background: <img src="https://images.unsplash.com/photo-1516562309708-05f43a08b98b?w=800&q=80&auto=format" className="absolute -right-20 -top-20 opacity-30 group-hover:opacity-40 transition-opacity duration-500 min-w-[150%] object-cover" alt="Vintage clock and flowers" />,
    className: "lg:col-span-1",
  },
  {
    Icon: ImageIcon,
    name: "Memory Timeline",
    description: "Keep track of past gifts, memories, and photos in an elegant scrapbook timeline that grows with your friendship.",
    href: "/",
    cta: "See Memories",
    background: <img src="https://images.unsplash.com/photo-1494887205043-c5f291293cf6?w=800&q=80&auto=format" className="absolute -right-20 -top-20 opacity-30 group-hover:opacity-40 transition-opacity duration-500 min-w-[150%] object-cover" alt="Polaroid photos" />,
    className: "lg:col-span-2",
  },
]

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
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-20 flex flex-col items-center">
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

          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <BentoGrid className="lg:grid-rows-2">
              {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
              ))}
            </BentoGrid>
          </motion.div>
        </div>
      </AnimatedBackground>

      <Footer />
    </div>
  )
}

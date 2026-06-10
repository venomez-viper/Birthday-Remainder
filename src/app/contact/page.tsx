"use client"

import { motion } from "framer-motion"
import { Footer } from "@/components/layout/Footer"
import { AnimatedBackground } from "@/components/ui/AnimatedBackground"
import Link from "next/link"
import { ArrowLeft, Send } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#2d2418] overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#faf6f0]/80 border-b border-[#e8dfd2] px-6 h-16 flex items-center">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-serif text-[#6b5d4d] hover:text-[#8b4c5e] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </nav>

      <AnimatedBackground className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-handwritten text-[#2d2418] mb-6">Send a Letter</h1>
            <p className="text-xl font-serif text-[#6b5d4d] leading-relaxed">
              We read every message. Drop us a note below.
            </p>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="relative max-w-2xl mx-auto">
            {/* Decorative Envelope Backing */}
            <div className="absolute -inset-4 bg-[#f0e9dc] rounded-sm transform rotate-2 -z-10 shadow-lg border border-[#e8dfd2]" />
            <div className="absolute -inset-2 bg-[#f5efe4] rounded-sm transform -rotate-1 -z-10 shadow-md border border-[#e8dfd2]" />

            {/* The Form (The Letter) */}
            <div className="bg-white p-8 md:p-12 rounded-sm shadow-xl border border-[#e8dfd2] relative">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2 relative">
                    <label className="font-serif text-[#9a8b7a] text-sm uppercase tracking-wider block">Your Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-transparent border-b-2 border-[#d4c5a9] outline-none font-serif text-lg text-[#4a3728] pb-2 focus:border-[#8b4c5e] transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2 relative">
                    <label className="font-serif text-[#9a8b7a] text-sm uppercase tracking-wider block">Your Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-transparent border-b-2 border-[#d4c5a9] outline-none font-serif text-lg text-[#4a3728] pb-2 focus:border-[#8b4c5e] transition-colors"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2 relative mt-12">
                  <label className="font-serif text-[#9a8b7a] text-sm uppercase tracking-wider block">Your Message</label>
                  {/* Lined paper effect for textarea */}
                  <div className="relative">
                    <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(transparent 95%, #e8dfd2 95%)', backgroundSize: '100% 2rem' }} />
                    <textarea 
                      className="w-full bg-transparent outline-none font-serif text-lg text-[#4a3728] leading-[2rem] min-h-[16rem] resize-none relative z-10 pt-1"
                      placeholder="Write your message here..."
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-8">
                  <button type="submit" className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#8b4c5e] text-white font-serif text-lg shadow-lg hover:bg-[#7a4252] hover:shadow-xl transition-all">
                    Send Letter
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </AnimatedBackground>

      <Footer />
    </div>
  )
}

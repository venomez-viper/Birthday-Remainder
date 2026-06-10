"use client"

import { motion } from "framer-motion"
import { Footer } from "@/components/layout/Footer"
import { AnimatedBackground } from "@/components/ui/AnimatedBackground"
import { MarketingNav } from "@/components/layout/MarketingNav"
import { Send, Mail } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fbf6f2] text-[#5a4a52] overflow-x-hidden flex flex-col">
      <MarketingNav />

      <AnimatedBackground className="pt-32 pb-20 flex-1">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16 flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c16a72]/10 text-[#c16a72] text-xs font-serif tracking-[0.18em] uppercase border border-[#c16a72]/20 mb-7">
              <Mail className="w-3.5 h-3.5" />
              Say hello
            </span>
            <h1 className="text-6xl md:text-8xl font-handwritten text-[#5a4a52] mb-6 leading-[1.05]">Send a Letter</h1>
            <p className="text-xl font-serif text-[#8b7a80] leading-relaxed">
              We read every message. Drop us a note below.
            </p>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="relative max-w-2xl mx-auto">
            {/* Decorative Envelope Backing */}
            <div className="absolute -inset-4 bg-[#f0e9dc] rounded-sm transform rotate-2 -z-10 shadow-lg border border-[#ecdfe0]" />
            <div className="absolute -inset-2 bg-[#f5efe4] rounded-sm transform -rotate-1 -z-10 shadow-md border border-[#ecdfe0]" />

            {/* The Form (The Letter) */}
            <div className="bg-white p-8 md:p-12 rounded-sm shadow-xl border border-[#ecdfe0] relative">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2 relative">
                    <label className="font-serif text-[#a9999f] text-sm uppercase tracking-wider block">Your Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-transparent border-b-2 border-[#ddc9c2] outline-none font-serif text-lg text-[#5a4a52] pb-2 focus:border-[#8b4c5e] transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2 relative">
                    <label className="font-serif text-[#a9999f] text-sm uppercase tracking-wider block">Your Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-transparent border-b-2 border-[#ddc9c2] outline-none font-serif text-lg text-[#5a4a52] pb-2 focus:border-[#8b4c5e] transition-colors"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2 relative mt-12">
                  <label className="font-serif text-[#a9999f] text-sm uppercase tracking-wider block">Your Message</label>
                  {/* Lined paper effect for textarea */}
                  <div className="relative">
                    <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(transparent 95%, #ecdfe0 95%)', backgroundSize: '100% 2rem' }} />
                    <textarea
                      className="w-full bg-transparent outline-none font-serif text-lg text-[#5a4a52] leading-[2rem] min-h-[16rem] resize-none relative z-10 pt-1"
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

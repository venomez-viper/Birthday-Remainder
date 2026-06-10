"use client"

import { motion } from "framer-motion"
import { Bell, Gift, Sparkles, Star, Cake } from "lucide-react"

/**
 * A purely presentational, in-page mockup of the Birthday Diary product.
 * Built entirely from divs + Tailwind (no screenshots) so it reads like a
 * real product shot in the cream / rose / gold brand palette.
 *
 * Left: a faux open diary "page" for a saved person.
 * Right: a floating reminder card and an AI-wish card.
 */
export function DiaryPreview() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* soft glow behind the artifact */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[#c16a72]/10 via-[#c9956b]/10 to-transparent blur-2xl" />

      <div className="grid items-center gap-8 md:grid-cols-[1.15fr_0.85fr]">
        {/* ── Open diary page ── */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative rounded-[1.6rem] border border-[#ecdfe0] bg-[#fdfaf6] p-7 shadow-[0_24px_60px_rgba(90,74,82,0.16)]"
        >
          {/* binding seam */}
          <div className="absolute left-7 top-7 bottom-7 w-px bg-gradient-to-b from-transparent via-[#e3d4cf] to-transparent" />

          <div className="mb-6 flex items-center justify-between">
            <span className="font-handwritten text-3xl text-[#8b4c5e]">June</span>
            <span className="font-serif text-xs uppercase tracking-[0.2em] text-[#a9999f]">
              This week
            </span>
          </div>

          <div className="space-y-4">
            {[
              { name: "Mum", date: "Jun 12", sign: "Gemini", tone: "#c16a72" },
              { name: "Daniel (brother)", date: "Jun 14", sign: "Gemini", tone: "#c9956b" },
              { name: "Aisha", date: "Jun 18", sign: "Cancer", tone: "#6b8f71" },
            ].map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-4 rounded-2xl border border-[#f0e6e0] bg-white px-4 py-3.5 shadow-[0_6px_16px_rgba(90,74,82,0.06)]"
              >
                <div
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full font-serif text-lg font-semibold text-white"
                  style={{ backgroundColor: p.tone }}
                >
                  {p.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-serif text-[15px] text-[#5a4a52]">{p.name}</p>
                  <p className="flex items-center gap-1.5 font-serif text-xs text-[#a9999f]">
                    <Star className="h-3 w-3" /> {p.sign}
                  </p>
                </div>
                <span className="flex-shrink-0 rounded-full bg-[#8b4c5e]/8 px-3 py-1 font-serif text-xs text-[#8b4c5e]">
                  {p.date}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 font-handwritten text-xl text-[#c16a72]">
            <Cake className="h-5 w-5" />
            3 birthdays blooming this month
          </div>
        </motion.div>

        {/* ── Floating cards ── */}
        <div className="space-y-5">
          {/* Reminder card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl border border-[#ecdfe0] bg-white p-5 shadow-[0_16px_36px_rgba(90,74,82,0.12)]"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c9956b]/15 text-[#c9956b]">
                <Bell className="h-4 w-4" />
              </span>
              <span className="font-serif text-xs uppercase tracking-[0.16em] text-[#a9999f]">
                Reminder
              </span>
            </div>
            <p className="font-serif text-[15px] leading-relaxed text-[#5a4a52]">
              Mum&rsquo;s birthday is in <span className="text-[#8b4c5e]">3 days</span>. Want help
              finding a gift or writing her card?
            </p>
          </motion.div>

          {/* AI wish card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="rounded-2xl border border-[#e7d6cf] bg-gradient-to-br from-[#8b4c5e] to-[#a85a6a] p-5 text-[#fbf1ee] shadow-[0_16px_36px_rgba(139,76,94,0.28)]"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="font-serif text-xs uppercase tracking-[0.16em] text-white/70">
                AI-written wish
              </span>
            </div>
            <p className="font-serif text-[15px] italic leading-relaxed">
              &ldquo;Happy birthday, Mum. Thank you for a lifetime of warm kitchens and softer
              landings. Here&rsquo;s to another year of your laugh filling the room.&rdquo;
            </p>
            <div className="mt-4 flex gap-2">
              <span className="rounded-full bg-white/15 px-3 py-1 font-serif text-xs">Heartfelt</span>
              <span className="rounded-full bg-white/15 px-3 py-1 font-serif text-xs">Funny</span>
              <span className="rounded-full bg-white/15 px-3 py-1 font-serif text-xs">Poetic</span>
            </div>
          </motion.div>

          {/* Gift idea chip row */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-3 rounded-2xl border border-[#ecdfe0] bg-white p-4 shadow-[0_16px_36px_rgba(90,74,82,0.12)]"
          >
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#6b8f71]/15 text-[#6b8f71]">
              <Gift className="h-4 w-4" />
            </span>
            <p className="font-serif text-sm text-[#8b7a80]">
              Gift ideas saved: <span className="text-[#5a4a52]">ceramics class, linen scarf</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

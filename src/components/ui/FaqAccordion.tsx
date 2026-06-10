"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"

export interface FaqItem {
  question: string
  answer: string
}

/**
 * A calm, brand-tinted FAQ accordion. One item open at a time.
 * Pure presentational — pass in the question/answer list.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="mx-auto max-w-3xl divide-y divide-[#ecdfe0] rounded-2xl border border-[#ecdfe0] bg-white/70 backdrop-blur-xl shadow-[0_12px_28px_rgba(90,74,82,0.08)]">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.question} className="px-6 md:px-8">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-lg text-[#5a4a52]">{item.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#8b4c5e]/10 text-[#8b4c5e]"
              >
                <Plus className="h-4 w-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 font-serif leading-relaxed text-[#8b7a80]">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

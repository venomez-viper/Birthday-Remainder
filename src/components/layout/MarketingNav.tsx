"use client"

import Link from "next/link"
import { Flower2 } from "lucide-react"

const links = [
  { href: "/features", label: "Features" },
  { href: "/about", label: "Our Story" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
]

/**
 * Shared marketing navigation. Visually identical across every public page:
 * logo left, links centered, Sign in + Get started on the right.
 */
export function MarketingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#fbf6f2]/80 border-b border-[#ecdfe0]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8b4c5e] to-[#c9956b] flex items-center justify-center shadow-sm">
            <Flower2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-handwritten text-2xl text-[#5a4a52]">Birthday Diary</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-serif text-[#8b7a80] hover:text-[#8b4c5e] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-serif text-[#8b7a80] hover:text-[#8b4c5e] transition-colors px-4 py-2"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="text-sm font-serif text-white bg-[#8b4c5e] hover:bg-[#7a4252] px-5 py-2.5 rounded-full transition-colors shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  )
}

"use client"

import { Footer } from "@/components/layout/Footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#2d2418] overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#faf6f0]/80 border-b border-[#e8dfd2] px-6 h-16 flex items-center">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-serif text-[#6b5d4d] hover:text-[#8b4c5e] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </nav>

      <main className="pt-32 pb-20 max-w-3xl mx-auto px-6">
        <h1 className="text-5xl font-handwritten text-[#2d2418] mb-8">Cookie Policy</h1>
        <div className="prose prose-stone max-w-none font-serif text-[#6b5d4d] leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. What Are Cookies?</h2>
          <p>Cookies are small text files stored on your device when you visit our website. We use them to remember your login session and application preferences.</p>
          
          <h2>2. Essential Cookies</h2>
          <p>We use strictly necessary cookies to maintain your authenticated session. Without these cookies, the Birthday Diary application cannot function properly.</p>
          
          <h2>3. Preference Cookies</h2>
          <p>We may use cookies to remember your visual preferences, such as your chosen theme or layout within the diary.</p>

          <h2>4. Analytics Cookies</h2>
          <p>We use minimal analytics to understand how users interact with our marketing pages. This data is anonymized and used strictly to improve the website experience.</p>

          <h2>5. Managing Cookies</h2>
          <p>You can manage or disable cookies in your browser settings. Please note that disabling essential cookies will prevent you from logging into your diary.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

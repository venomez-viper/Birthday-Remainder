"use client"

import { Footer } from "@/components/layout/Footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#2d2418] overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#faf6f0]/80 border-b border-[#e8dfd2] px-6 h-16 flex items-center">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-serif text-[#6b5d4d] hover:text-[#8b4c5e] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </nav>

      <main className="pt-32 pb-20 max-w-3xl mx-auto px-6">
        <h1 className="text-5xl font-handwritten text-[#2d2418] mb-8">Privacy Policy</h1>
        <div className="prose prose-stone max-w-none font-serif text-[#6b5d4d] leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as your name, email address, and the names, birthdays, and relationship details of the contacts you add to your diary.</p>
          
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services. Specifically, we use your contact data to generate personalized birthday wishes via AI and to send you proactive reminders.</p>
          
          <h2>3. Data Security</h2>
          <p>We implement strict security measures to protect your personal information. Your diary entries are private and are only processed by AI generation services when you explicitly request a birthday wish.</p>

          <h2>4. Data Sharing</h2>
          <p>We do not sell your personal data. We may share necessary context (such as relationship and tone preferences) with our AI partners (e.g., Google Gemini) solely for the purpose of generating birthday wishes.</p>

          <h2>5. Your Rights</h2>
          <p>You have the right to access, update, or delete your data at any time. You can export your diary entries or permanently delete your account from your settings page.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

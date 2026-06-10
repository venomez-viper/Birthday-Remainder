"use client"

import { Footer } from "@/components/layout/Footer"
import { MarketingNav } from "@/components/layout/MarketingNav"
import { LegalSection } from "@/components/layout/LegalSection"

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#fbf6f2] text-[#5a4a52] overflow-x-hidden flex flex-col">
      <MarketingNav />

      <main className="pt-32 pb-24 max-w-3xl mx-auto px-6 flex-1 w-full">
        <p className="font-serif text-sm tracking-[0.18em] uppercase text-[#c16a72] mb-3">Legal</p>
        <h1 className="text-5xl md:text-6xl font-handwritten text-[#5a4a52] mb-4">Cookie Policy</h1>
        <p className="font-serif text-sm text-[#a9999f] mb-12">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8">
          <LegalSection title="1. What Are Cookies?">
            Cookies are small text files stored on your device when you visit our website. We use them to
            remember your login session and application preferences.
          </LegalSection>
          <LegalSection title="2. Essential Cookies">
            We use strictly necessary cookies to maintain your authenticated session. Without these cookies,
            the Birthday Diary application cannot function properly.
          </LegalSection>
          <LegalSection title="3. Preference Cookies">
            We may use cookies to remember your visual preferences, such as your chosen theme or layout within
            the diary.
          </LegalSection>
          <LegalSection title="4. Analytics Cookies">
            We use minimal analytics to understand how users interact with our marketing pages. This data is
            anonymized and used strictly to improve the website experience.
          </LegalSection>
          <LegalSection title="5. Managing Cookies">
            You can manage or disable cookies in your browser settings. Please note that disabling essential
            cookies will prevent you from logging into your diary.
          </LegalSection>
        </div>
      </main>
      <Footer />
    </div>
  )
}

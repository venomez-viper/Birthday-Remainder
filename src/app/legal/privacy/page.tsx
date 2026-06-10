"use client"

import { Footer } from "@/components/layout/Footer"
import { MarketingNav } from "@/components/layout/MarketingNav"
import { LegalSection } from "@/components/layout/LegalSection"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#fbf6f2] text-[#5a4a52] overflow-x-hidden flex flex-col">
      <MarketingNav />

      <main className="pt-32 pb-24 max-w-3xl mx-auto px-6 flex-1 w-full">
        <p className="font-serif text-sm tracking-[0.18em] uppercase text-[#c16a72] mb-3">Legal</p>
        <h1 className="text-5xl md:text-6xl font-handwritten text-[#5a4a52] mb-4">Privacy Policy</h1>
        <p className="font-serif text-sm text-[#a9999f] mb-12">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8">
          <LegalSection title="1. Information We Collect">
            We collect information you provide directly to us, such as your name, email address, and the
            names, birthdays, and relationship details of the contacts you add to your diary.
          </LegalSection>
          <LegalSection title="2. How We Use Your Information">
            We use the information we collect to provide, maintain, and improve our services. Specifically,
            we use your contact data to generate personalized birthday wishes and to send you proactive reminders.
          </LegalSection>
          <LegalSection title="3. Data Security">
            We implement strict security measures to protect your personal information. Your diary entries are
            private and are only processed by our generation services when you explicitly request a birthday wish.
          </LegalSection>
          <LegalSection title="4. Data Sharing">
            We do not sell your personal data. We may share necessary context (such as relationship and tone
            preferences) with our generation partners solely for the purpose of writing birthday wishes.
          </LegalSection>
          <LegalSection title="5. Your Rights">
            You have the right to access, update, or delete your data at any time. You can export your diary
            entries or permanently delete your account from your settings page.
          </LegalSection>
        </div>
      </main>
      <Footer />
    </div>
  )
}

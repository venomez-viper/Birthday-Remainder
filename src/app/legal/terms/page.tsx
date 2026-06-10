"use client"

import { Footer } from "@/components/layout/Footer"
import { MarketingNav } from "@/components/layout/MarketingNav"
import { LegalSection } from "@/components/layout/LegalSection"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#fbf6f2] text-[#5a4a52] overflow-x-hidden flex flex-col">
      <MarketingNav />

      <main className="pt-32 pb-24 max-w-3xl mx-auto px-6 flex-1 w-full">
        <p className="font-serif text-sm tracking-[0.18em] uppercase text-[#c16a72] mb-3">Legal</p>
        <h1 className="text-5xl md:text-6xl font-handwritten text-[#5a4a52] mb-4">Terms of Service</h1>
        <p className="font-serif text-sm text-[#a9999f] mb-12">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8">
          <LegalSection title="1. Introduction">
            Welcome to Birthday Diary. By accessing our website, you agree to these Terms of Service. Please
            read them carefully.
          </LegalSection>
          <LegalSection title="2. Use of Service">
            You agree to use Birthday Diary only for lawful purposes. You must not use the service to transmit
            any malicious code or spam.
          </LegalSection>
          <LegalSection title="3. User Accounts">
            To use certain features of the service, you must register for an account. You are responsible for
            maintaining the confidentiality of your account credentials.
          </LegalSection>
          <LegalSection title="4. Generated Content">
            Our service helps generate birthday wishes. While we strive for high quality, we do not guarantee
            the appropriateness or accuracy of generated content. Always review messages before sending them.
          </LegalSection>
          <LegalSection title="5. Premium Subscriptions">
            If you purchase a Keepsake Edition subscription, you agree to our billing terms. Subscriptions
            auto-renew unless cancelled prior to the renewal date.
          </LegalSection>
          <LegalSection title="6. Termination">
            We reserve the right to terminate or suspend your account at any time for violations of these terms.
          </LegalSection>
        </div>
      </main>
      <Footer />
    </div>
  )
}

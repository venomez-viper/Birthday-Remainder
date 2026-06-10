"use client"

import { Footer } from "@/components/layout/Footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#2d2418] overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#faf6f0]/80 border-b border-[#e8dfd2] px-6 h-16 flex items-center">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-serif text-[#6b5d4d] hover:text-[#8b4c5e] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </nav>

      <main className="pt-32 pb-20 max-w-3xl mx-auto px-6">
        <h1 className="text-5xl font-handwritten text-[#2d2418] mb-8">Terms of Service</h1>
        <div className="prose prose-stone max-w-none font-serif text-[#6b5d4d] leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <h2>1. Introduction</h2>
          <p>Welcome to Birthday Diary. By accessing our website, you agree to these Terms of Service. Please read them carefully.</p>
          
          <h2>2. Use of Service</h2>
          <p>You agree to use Birthday Diary only for lawful purposes. You must not use the service to transmit any malicious code or spam.</p>
          
          <h2>3. User Accounts</h2>
          <p>To use certain features of the service, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials.</p>

          <h2>4. AI Generation</h2>
          <p>Our service uses AI to generate birthday wishes. While we strive for high-quality generation, we do not guarantee the appropriateness or accuracy of AI-generated content. Always review messages before sending them.</p>

          <h2>5. Premium Subscriptions</h2>
          <p>If you purchase a Keepsake Edition subscription, you agree to our billing terms. Subscriptions auto-renew unless cancelled prior to the renewal date.</p>

          <h2>6. Termination</h2>
          <p>We reserve the right to terminate or suspend your account at any time for violations of these terms.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

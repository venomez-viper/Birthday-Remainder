import Link from "next/link"
import { Flower2, Mail, Globe, Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#faf6f0] border-t border-[#e8dfd2] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8b4c5e] to-[#c9956b] flex items-center justify-center shadow-sm">
                <Flower2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-handwritten text-2xl text-[#4a3728]">Birthday Diary</span>
            </Link>
            <p className="font-serif text-[#6b5d4d] max-w-sm leading-relaxed">
              A handcrafted digital sanctuary for your most cherished relationships.
              Never forget a blooming birthday again.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-[#d4c5a9] flex items-center justify-center text-[#6b5d4d] hover:bg-[#8b4c5e] hover:text-white hover:border-[#8b4c5e] transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#d4c5a9] flex items-center justify-center text-[#6b5d4d] hover:bg-[#8b4c5e] hover:text-white hover:border-[#8b4c5e] transition-all">
                <Sparkles className="w-4 h-4" />
              </a>
              <a href="mailto:hello@birthdaydiary.app" className="w-10 h-10 rounded-full border border-[#d4c5a9] flex items-center justify-center text-[#6b5d4d] hover:bg-[#8b4c5e] hover:text-white hover:border-[#8b4c5e] transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-6">
            <h4 className="font-serif text-sm tracking-widest text-[#9a8b7a] uppercase">Product</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/features" className="font-serif text-[#4a3728] hover:text-[#8b4c5e] transition-colors">Features</Link>
              </li>
              <li>
                <Link href="/pricing" className="font-serif text-[#4a3728] hover:text-[#8b4c5e] transition-colors">Pricing</Link>
              </li>
              <li>
                <Link href="/about" className="font-serif text-[#4a3728] hover:text-[#8b4c5e] transition-colors">Our Story</Link>
              </li>
              <li>
                <Link href="/contact" className="font-serif text-[#4a3728] hover:text-[#8b4c5e] transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-6">
            <h4 className="font-serif text-sm tracking-widest text-[#9a8b7a] uppercase">Legal</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/legal/terms" className="font-serif text-[#4a3728] hover:text-[#8b4c5e] transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="font-serif text-[#4a3728] hover:text-[#8b4c5e] transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="font-serif text-[#4a3728] hover:text-[#8b4c5e] transition-colors">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#e8dfd2] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-serif text-sm text-[#9a8b7a]">
            &copy; {new Date().getFullYear()} Birthday Diary. Handcrafted with love.
          </p>
          <div className="flex items-center gap-2 font-serif text-sm text-[#9a8b7a]">
            <span>Designed for the thoughtful ones.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

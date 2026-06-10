import { type ReactNode } from "react"

/**
 * Consistent, brand-styled section for the legal pages. Replaces the unstyled
 * `prose` classes (the typography plugin is not installed in this project).
 */
export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-handwritten text-2xl text-[#5a4a52] mb-3">{title}</h2>
      <p className="font-serif text-[#8b7a80] leading-relaxed">{children}</p>
    </section>
  )
}

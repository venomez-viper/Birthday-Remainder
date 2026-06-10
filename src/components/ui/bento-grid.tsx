import { type ComponentPropsWithoutRef, type ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends Omit<ComponentPropsWithoutRef<"div">, "className"> {
  name: string
  className?: string
  background: ReactNode
  Icon: React.ElementType
  description: string
  href: string
  cta: string
}

/**
 * Tailwind-v3 compatible bento grid. The original MagicUI version used v4-only
 * `bg-background` (oklch, theme-dependent → opaque clash on the cream page),
 * defaulted every card to `col-span-3`, and rendered CTAs through the base-ui
 * Button (`render`/`nativeButton` props). This version is plain Tailwind v3 and
 * matches the brand palette.
 */
const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 gap-6 lg:grid-cols-3 auto-rows-[20rem]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    className={cn(
      "group relative flex flex-col justify-end overflow-hidden rounded-2xl",
      "bg-white/80 backdrop-blur-xl border border-[#ecdfe0]",
      "shadow-[0_12px_28px_rgba(90,74,82,0.08)] hover:shadow-[0_18px_40px_rgba(139,76,94,0.14)] transition-shadow duration-500",
      className
    )}
    {...props}
  >
    {/* Background image / decoration */}
    <div className="absolute inset-0 pointer-events-none">{background}</div>

    {/* Readability gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent pointer-events-none" />

    {/* Content */}
    <div className="relative z-10 p-7 flex flex-col gap-2 transition-transform duration-300 lg:group-hover:-translate-y-10">
      <div className="w-12 h-12 rounded-xl bg-[#8b4c5e]/10 flex items-center justify-center mb-2 origin-left transition-transform duration-300 group-hover:scale-90">
        <Icon className="h-6 w-6 text-[#8b4c5e]" />
      </div>
      <h3 className="text-2xl font-handwritten text-[#5a4a52]">{name}</h3>
      <p className="font-serif text-[#8b7a80] leading-relaxed max-w-md">{description}</p>
    </div>

    {/* CTA revealed on hover (desktop), always shown on mobile */}
    <div className="relative z-10 px-7 pb-6 -mt-2 lg:absolute lg:bottom-5 lg:left-0 lg:translate-y-6 lg:opacity-0 lg:transition-all lg:duration-300 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 font-serif text-[#8b4c5e] hover:text-[#7a4252] transition-colors"
      >
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  </div>
)

export { BentoCard, BentoGrid }

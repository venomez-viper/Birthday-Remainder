"use client"

import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import { Navbar } from "./Navbar"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { cn } from "@/lib/utils"
import { FloatingPetals } from "./FloatingPetals"

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  return (
    <div className={cn("min-h-screen relative overflow-hidden wood-desk")}>
      {/* Soft vignette glow at the desk corners (drawn, blends with the wood) */}
      {session && (
        <>
          <div className="fixed -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(201,149,107,0.10),transparent_70%)] pointer-events-none z-0" />
          <div className="fixed -bottom-32 -right-32 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(212,169,169,0.10),transparent_70%)] pointer-events-none z-0" />
        </>
      )}

      {/* Interactive Floating Petals Canvas */}
      {session && <FloatingPetals />}

      <Navbar />
      <ThemeSwitcher />

      {/* Content area */}
      <div
        className={cn(
          "transition-all duration-300",
          isHomePage
            ? "h-screen overflow-hidden"
            : session
              ? "min-h-screen lg:pl-64"
              : "min-h-screen"
        )}
      >
        {isHomePage ? (
          <div className="relative z-10 w-full h-full">
            {children}
          </div>
        ) : (
          <div className="relative z-10 px-4 sm:px-8 py-8 max-w-6xl mx-auto pb-24 lg:pb-8">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

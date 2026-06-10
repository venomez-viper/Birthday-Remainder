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
  const isLandingPage = isHomePage && !session
  // The diary book needs the full viewport (no max-width / padding box).
  const isImmersive = isHomePage || pathname === "/dashboard"

  // Landing page renders without any app chrome
  if (isLandingPage) {
    return <>{children}</>
  }

  return (
    <div className={cn("min-h-screen relative overflow-hidden soft-floral-bg")}>
      {/* Interactive Floating Petals Canvas */}
      {session && <FloatingPetals />}

      <Navbar />
      <ThemeSwitcher />

      {/* Content area */}
      <div
        className={cn(
          "transition-all duration-300",
          isImmersive
            ? "h-screen overflow-hidden"
            : session
              ? "min-h-screen lg:pl-64"
              : "min-h-screen"
        )}
      >
        {isImmersive ? (
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

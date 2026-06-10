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

  // Landing page renders without any app chrome
  if (isLandingPage) {
    return <>{children}</>
  }

  return (
    <div className={cn("min-h-screen relative overflow-hidden soft-floral-bg")}>
      {/* Real flower photography softly faded into the corners (blends, never pasted) */}
      <div
        className="flower-accent -top-24 -left-24 w-[380px] h-[380px]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&q=80&auto=format')" }}
      />
      <div
        className="flower-accent -bottom-28 -right-24 w-[420px] h-[420px]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&q=80&auto=format')" }}
      />

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

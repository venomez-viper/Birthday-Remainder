"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { 
  LayoutDashboard, 
  CalendarDays, 
  Sparkles, 
  Users, 
  Settings, 
  LogOut, 
  BookHeart,
  User
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Calendar", href: "/calendar", icon: CalendarDays },
    { name: "Constellation", href: "/constellation", icon: Sparkles },
    { name: "People", href: "/people", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  if (!session) return null
  if (pathname === "/" || pathname === "/dashboard") return null

  const userInitials = session.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U"

  return (
    <>
      {/* Desktop Left Sidebar: Glassmorphism Floral Style */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 border-r border-border/40 bg-background/60 backdrop-blur-3xl p-6 z-40 shadow-[4px_0_24px_-4px_rgba(0,0,0,0.05)]">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 mb-8 px-2 border-b border-border/40 pb-5">
          <div className="p-2 bg-primary/20 rounded-xl text-primary shadow-inner">
            <BookHeart className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-base text-foreground tracking-wide">
              Birthday Diary
            </h1>
            <p className="text-[9px] text-primary/70 uppercase tracking-widest font-semibold font-serif italic">
              Ledger of Memories
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-serif italic tracking-wide transition-all duration-300 group",
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm font-bold"
                    : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                )}
              >
                <item.icon className={cn(
                  "w-4 h-4 transition-transform duration-300 group-hover:scale-110",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                )} />
                {item.name}
              </Link>
            )
          })}
        </nav>


        {/* Bottom Profile Info & Logout */}
        <div className="border-t border-border/40 pt-4 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <Avatar className="h-9 w-9 border border-primary/20">
              <AvatarImage src={session.user?.image || undefined} />
              <AvatarFallback className="bg-primary/10 text-primary font-serif font-bold text-sm">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <h4 className="text-xs font-bold text-foreground truncate font-serif">
                {session.user?.name}
              </h4>
              <p className="text-[10px] text-muted-foreground truncate">
                {session.user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-serif italic text-destructive/80 hover:bg-destructive/10 transition-all duration-300"
          >
            <LogOut className="w-4 h-4 text-destructive/80" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Floating Bottom Nav Bar */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl py-2.5 px-3 flex justify-around items-center z-50">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-300",
                isActive ? "text-primary scale-105" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="w-4.5 h-4.5" />
              <span className="text-[9px] mt-0.5 font-serif italic">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </>
  )
}

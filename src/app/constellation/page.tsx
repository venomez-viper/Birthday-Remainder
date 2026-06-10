"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format, differenceInDays } from "date-fns"
import { 
  Sparkles, 
  Clock, 
  X,
  Compass,
  BookOpen,
  Plus,
  CalendarDays,
  Settings,
  Heart
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getZodiac } from "@/lib/zodiac"

interface Birthday {
  id: string
  name: string
  date: string
  notes: string | null
  relationship: string | null
  interests: string | null
}

interface Star extends Birthday {
  x: number
  y: number
  size: number
  glow: boolean
  daysUntil: number
}

export default function ConstellationPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [birthdays, setBirthdays] = useState<Birthday[]>([])
  const [stars, setStars] = useState<Star[]>([])
  const [selectedStar, setSelectedStar] = useState<Star | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchBirthdays()
    }
  }, [session])

  const fetchBirthdays = async () => {
    try {
      const res = await fetch("/api/birthdays")
      if (res.ok) {
        const data = await res.json()
        setBirthdays(data)
        generateStars(data)
      }
    } catch (error) {
      console.error("Failed to fetch birthdays", error)
    } finally {
      setLoading(false)
    }
  }

  const getDaysUntil = (dateString: string) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const birthDate = new Date(dateString)
    let nextBday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())
    if (nextBday < today) {
      nextBday.setFullYear(today.getFullYear() + 1)
    }
    return differenceInDays(nextBday, today)
  }

  const generateStars = (items: Birthday[]) => {
    const generated = items.map((b) => {
      const daysUntil = getDaysUntil(b.date)
      const birthMonth = new Date(b.date).getMonth()
      const x = 10 + (birthMonth / 11) * 80 + (Math.random() - 0.5) * 5
      
      const birthDay = new Date(b.date).getDate()
      const y = 15 + (birthDay / 31) * 70 + (Math.random() - 0.5) * 5

      const size = Math.max(3, 8 - (daysUntil / 365) * 5)
      const glow = daysUntil <= 14

      return {
        ...b,
        x,
        y,
        size,
        glow,
        daysUntil,
      }
    })
    setStars(generated)
  }

  if (status === "loading" || status === "unauthenticated" || loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-3">
        <Clock className="w-8 h-8 animate-spin text-amber-900" />
        <p className="text-sm font-serif text-stone-600 italic">Mapping the stars...</p>
      </div>
    )
  }

  const glowingStars = stars.filter(s => s.glow).sort((a,b) => a.daysUntil - b.daysUntil)

  return (
    <div className="relative pt-6">
      {/* Immersive Book Container */}
      <div className="relative w-full max-w-5xl mx-auto flex shadow-book rounded-r-2xl rounded-l-md overflow-visible bg-paper select-none perspective-[1500px]">
        
        {/* Book Spine Shadow */}
        <div className="absolute top-0 bottom-0 left-[50%] -translate-x-[50%] w-10 book-spine-shadow z-20 pointer-events-none hidden md:block"></div>

        {/* Spiral Rings */}
        <div className="absolute top-0 bottom-0 left-[50%] -translate-x-[50%] w-3 flex flex-col justify-around py-8 z-30 pointer-events-none hidden md:flex">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="w-6 h-3 bg-stone-300 rounded-full border-t border-b border-stone-500 shadow-inner -translate-x-[6px] opacity-75"></div>
          ))}
        </div>

        {/* TABS */}
        <div className="absolute right-0 top-16 translate-x-[100%] flex flex-col gap-2 z-0 font-serif italic text-xs select-none">
          <Link
            href="/dashboard"
            className="w-14 py-3 rounded-r-xl border border-stone-400/80 shadow-md bg-amber-900/20 text-stone-700 border-l-0 hover:bg-paper-light transition-all duration-300 flex flex-col items-center gap-1 hover:translate-x-1"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Index</span>
          </Link>

          <Link
            href="/dashboard?action=add"
            className="w-14 py-3 rounded-r-xl border border-stone-400/80 shadow-md bg-amber-900/20 text-stone-700 border-l-0 hover:bg-paper-light transition-all duration-300 flex flex-col items-center gap-1 hover:translate-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New</span>
          </Link>

          <Link
            href="/calendar"
            className="w-14 py-3 rounded-r-xl border border-stone-400/80 shadow-md bg-amber-900/20 text-stone-700 border-l-0 hover:bg-paper-light transition-all duration-300 flex flex-col items-center gap-1 hover:translate-x-1"
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Cal</span>
          </Link>

          <Link
            href="/settings"
            className="w-14 py-3 rounded-r-xl border border-stone-400/80 shadow-md bg-amber-900/20 text-stone-700 border-l-0 hover:bg-paper-light transition-all duration-300 flex flex-col items-center gap-1 hover:translate-x-1"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Setup</span>
          </Link>
        </div>

        {/* BOOK CONTENTS */}
        <div className="w-full flex flex-col md:flex-row bg-paper min-h-[480px] rounded-r-2xl rounded-l-md overflow-hidden">
          
          {/* LEFT PAGE: ASTRONOMICAL DETAILS */}
          <div className="w-full md:w-1/2 bg-paper-light border-b md:border-b-0 md:border-r border-stone-400/40 p-6 md:p-8 flex flex-col justify-between shadow-page-left relative min-h-[400px]">
            <div className="space-y-6 flex-1 flex flex-col min-h-0">
              <div>
                <h2 className="font-handwritten text-4xl text-stone-850 font-bold border-b border-stone-300 pb-2">
                  Constellation Map
                </h2>
                <p className="text-[10px] text-stone-600 font-serif italic mt-1.5">
                  An immersive alignment view of your circle&apos;s elements.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-stone-650 font-serif italic leading-relaxed">
                  Hover or click stars in the night sky. In the astronomical calendar, stars glow brighter as birthday dates draw near.
                </p>

                {glowingStars.length > 0 ? (
                  <div className="p-3 bg-amber-900/5 border border-amber-900/10 rounded-xl space-y-2">
                    <span className="text-[9px] uppercase font-bold text-amber-900 tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 animate-pulse" /> Active Glow Stars
                    </span>
                    <div className="space-y-1">
                      {glowingStars.slice(0, 3).map(star => (
                        <div key={star.id} className="flex justify-between items-center text-xs font-serif italic">
                          <span className="text-stone-800 font-bold">{star.name}</span>
                          <span className="text-stone-500 text-[10px]">{star.daysUntil} days away</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-stone-500/5 border border-stone-400/25 rounded-xl text-[10px] text-stone-600 font-serif italic text-center">
                    All stars currently rest in quiet orbits. No immediate celebrations.
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-stone-400/20 pt-4 text-[10px] text-stone-500 font-serif italic">
              * Star size matches proximity. Bright yellow stars are currently in active glow phases.
            </div>
          </div>

          {/* RIGHT PAGE: THE STAR MAP CANVAS */}
          <div className="w-full md:w-1/2 bg-paper-light p-6 md:p-8 flex flex-col justify-between shadow-page-right relative min-h-[400px]">
            <div className="flex-1 flex flex-col justify-between h-full space-y-4 relative min-h-0">
              
              {/* Star Canvas frame */}
              <div className="flex-1 relative w-full border border-stone-500/30 rounded-2xl overflow-hidden shadow-inner bg-slate-950 min-h-[280px]">
                {/* Sky Ambient overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/40 z-0"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.06),transparent_70%)] z-0"></div>
                
                {/* Stars Background pattern */}
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTU5IiBoZWlnaHQ9IjE1OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxLjUiIGN5PSIxLjUiIHI9IjEuNSIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')] bg-repeat z-0"></div>

                {/* Grid Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-30">
                  {stars.map((star, idx) => {
                    const nextStar = stars[(idx + 1) % stars.length]
                    if (!nextStar || stars.length < 2) return null
                    return (
                      <line
                        key={idx}
                        x1={`${star.x}%`}
                        y1={`${star.y}%`}
                        x2={`${nextStar.x}%`}
                        y2={`${nextStar.y}%`}
                        stroke="rgba(251, 191, 36, 0.15)"
                        strokeWidth="0.75"
                        strokeDasharray="4 4"
                      />
                    )
                  })}
                </svg>

                {/* Stars rendering */}
                {stars.map((star) => {
                  return (
                    <motion.button
                      key={star.id}
                      onClick={() => setSelectedStar(star)}
                      className="absolute z-20 group -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                      style={{ left: `${star.x}%`, top: `${star.y}%` }}
                      whileHover={{ scale: 1.3 }}
                    >
                      {/* Active glow ping */}
                      {star.glow && (
                        <span className="absolute -inset-2 rounded-full bg-amber-400/30 blur-sm animate-ping duration-1000"></span>
                      )}
                      {/* Core star */}
                      <div 
                        className={`rounded-full transition-all duration-300 ${
                          star.glow 
                            ? "bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.8)]" 
                            : "bg-blue-100 group-hover:bg-amber-300"
                        }`}
                        style={{ width: `${star.size}px`, height: `${star.size}px` }}
                      />
                      
                      {/* Name Tag */}
                      <div className="absolute top-4.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-stone-900/90 text-stone-100 border border-amber-900/30 text-[9px] px-2 py-0.5 rounded-full font-serif italic whitespace-nowrap shadow-md pointer-events-none transition-all duration-300 z-50">
                        {star.name}
                      </div>
                    </motion.button>
                  )
                })}

                {/* Selected Star Overlay Detail Card */}
                <AnimatePresence>
                  {selectedStar && (
                    <motion.div
                      initial={{ y: 80, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 80, opacity: 0 }}
                      className="absolute bottom-3 left-3 right-3 z-30"
                    >
                      <Card className="border-amber-900/20 bg-slate-900/95 text-stone-100 shadow-2xl">
                        <CardContent className="p-3.5 space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{getZodiac(selectedStar.date).emoji}</span>
                              <div>
                                <h4 className="font-serif font-bold text-xs leading-none truncate w-32">
                                  {selectedStar.name}
                                </h4>
                                <span className="text-[8px] text-stone-400 uppercase tracking-widest block mt-0.5">
                                  {selectedStar.relationship || "friend"}
                                </span>
                              </div>
                            </div>
                            <button 
                              onClick={() => setSelectedStar(null)}
                              className="text-stone-400 hover:text-white p-0.5 rounded-full"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex justify-between items-center text-[10px] bg-white/5 border border-white/5 p-2 rounded-lg font-serif italic">
                            <span>Born {format(new Date(selectedStar.date), "MMMM d, yyyy")}</span>
                            <span className="font-sans font-bold text-amber-300 not-italic text-[9px]">
                              {selectedStar.daysUntil === 0 
                                ? "Birthday Today! 🎉" 
                                : `${selectedStar.daysUntil} days left`}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                {stars.length === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-30">
                    <Compass className="w-10 h-10 text-stone-600/40 mb-2" />
                    <p className="text-stone-500 text-xs italic">Add contacts in your diary to map stars.</p>
                  </div>
                )}
              </div>

              {/* Notebook footer margins */}
              <div className="border-t border-stone-300/40 pt-3 text-[10px] text-stone-500 font-serif leading-none flex items-center gap-1 shrink-0">
                <Heart className="w-3 h-3 text-amber-900/60" />
                <span>The alignment updates automatically with the earth&apos;s orbit.</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

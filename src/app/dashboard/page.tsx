"use client"

import { cn } from "@/lib/utils"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { format, differenceInDays, addYears, isBefore, startOfDay, differenceInYears, isThisMonth, isThisWeek, addMonths, subMonths } from "date-fns"
import confetti from "canvas-confetti"
import {
  Plus,
  Settings,
  BookOpen,
  Search,
  CalendarDays,
  Heart,
  Sparkles,
  Clock,
  ChevronLeft,
  ChevronRight,
  Cake,
  Gift,
  Users,
  Leaf,
  LogOut
} from "lucide-react"
import Link from "next/link"
import { getZodiac } from "@/lib/zodiac"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import BirthdayForm from "@/components/birthdays/BirthdayForm"
import { BirthdayBookPage } from "@/components/birthdays/BirthdayBookPage"
import { BirthdayMobileView } from "@/components/birthdays/BirthdayMobileView"
import { BirthdayDetailDrawer } from "@/components/birthdays/BirthdayDetailDrawer"
import { AnimatePresence, motion } from "framer-motion"
import dynamic from "next/dynamic"
import { BookPage } from "@/components/ui/BookPage"
import {
  CalendarLedger, CalendarGrid,
  PeopleOverview, PeopleList,
  ConstellationOverview, ConstellationList,
  SettingsProfile, SettingsPrefs,
  type Profile,
} from "@/components/birthdays/DiarySpreads"
import React, { useRef } from "react"

// Page-turn animation for switching diary sections (button-triggered flip).
const spreadMotion = {
  initial: { rotateY: 88, opacity: 0.2 },
  animate: { rotateY: 0, opacity: 1 },
  exit: { rotateY: -88, opacity: 0.2 },
  transition: { duration: 0.45, ease: "easeInOut" as const },
}

interface Birthday {
  id: string
  name: string
  date: string
  notes: string | null
  relationship: string | null
  interests: string | null
  imageUrl?: string | null
}

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  // Data state
  const [birthdays, setBirthdays] = useState<Birthday[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  
  // Navigation & details state
  const [selectedBday, setSelectedBday] = useState<Birthday | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Mobile Views state
  const [mobileTocTab, setMobileTocTab] = useState<"index" | "stats">("index")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  // Page Flip Animation state
  const bookRef = useRef<any>(null)
  const [currentSpread, setCurrentSpread] = useState(0) // 0: TOC, 1: Details, 2: Add

  // Unified diary sections
  const [section, setSection] = useState<"index" | "calendar" | "people" | "constellation" | "settings" | "detail" | "add">("index")
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [profile, setProfile] = useState<Profile | null>(null)
  const [savingProfile, setSavingProfile] = useState(false)

  const goToPage = (page: number, sec: typeof section) => {
    setSelectedBday(null)
    setIsAdding(false)
    setSection(sec)
    if (bookRef.current) bookRef.current.pageFlip().turnToPage(page)
  }

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/user/profile")
      if (res.ok) setProfile(await res.json())
    } catch (e) { console.error(e) }
  }

  const saveProfile = async () => {
    if (!profile) return
    setSavingProfile(true)
    try {
      await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      })
    } catch (e) { console.error(e) } finally { setSavingProfile(false) }
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchBirthdays()
      fetchProfile()
    }
  }, [session, refreshTrigger])

  useEffect(() => {
    if (typeof window !== "undefined" && birthdays.length > 0) {
      const params = new URLSearchParams(window.location.search)
      const id = params.get("id")
      const action = params.get("action")
      if (id) {
        const found = birthdays.find(b => b.id === id)
        if (found) {
          setSelectedBday(found)
          setIsAdding(false)
          setSection("detail")
          if (bookRef.current) bookRef.current.pageFlip().turnToPage(10)
        }
      } else if (action === "add") {
        setIsAdding(true)
        setSelectedBday(null)
        setSection("add")
        if (bookRef.current) bookRef.current.pageFlip().turnToPage(12)
      }
    }
  }, [birthdays, refreshTrigger])

  const fetchBirthdays = async () => {
    try {
      const res = await fetch("/api/birthdays")
      if (res.ok) {
        const data = await res.json()
        setBirthdays(data)
        if (selectedBday) {
          const updated = data.find((b: Birthday) => b.id === selectedBday.id)
          if (updated) setSelectedBday(updated)
        }
      }
    } catch (error) {
      console.error("Failed to fetch birthdays", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this journal entry?")) return

    try {
      const res = await fetch(`/api/birthdays/${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        if (bookRef.current) bookRef.current.pageFlip().turnToPage(0)
        setTimeout(() => {
          setSelectedBday(null)
          setIsAdding(false)
          setCurrentSpread(0)
          fetchBirthdays()
        }, 600)
      }
    } catch (error) {
      console.error("Failed to delete", error)
    }
  }

  const getNextBirthday = (dateString: string) => {
    const today = startOfDay(new Date())
    const birthDate = startOfDay(new Date(dateString))
    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())
    if (isBefore(nextBirthday, today)) {
      nextBirthday = addYears(nextBirthday, 1)
    }
    return nextBirthday
  }

  const calculateAge = (dateString: string, targetDate: Date) => {
    const birthDate = new Date(dateString)
    return differenceInYears(targetDate, birthDate)
  }

  // Sorting
  const sortedBirthdays = [...birthdays]
    .map(b => ({
      ...b,
      nextBirthday: getNextBirthday(b.date),
      daysUntil: differenceInDays(getNextBirthday(b.date), startOfDay(new Date()))
    }))
    .sort((a, b) => a.daysUntil - b.daysUntil)

  const todaysBirthdays = sortedBirthdays.filter(b => b.daysUntil === 0)
  const upcomingBirthdays = sortedBirthdays.filter(b => b.daysUntil > 0)
  const nextBirthday = sortedBirthdays[0]

  const filteredBirthdays = sortedBirthdays.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    if (todaysBirthdays.length > 0) {
      const duration = 4 * 1000
      const end = Date.now() + duration

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#8b4c5e', '#c9956b', '#d4a9a9', '#a9b8a0']
        })
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#8b4c5e', '#c9956b', '#d4a9a9', '#a9b8a0']
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }
      frame()
    }
  }, [todaysBirthdays])

  const handleSelectBday = (bday: Birthday) => {
    setSelectedBday(bday)
    setIsAdding(false)
    setSection("detail")
    if (bookRef.current) bookRef.current.pageFlip().turnToPage(10)
  }

  const handleBackToToc = () => {
    if (bookRef.current) bookRef.current.pageFlip().turnToPage(0)
    setTimeout(() => {
      setSelectedBday(null)
      setIsAdding(false)
      setSection("index")
      setMobileTocTab("index")
    }, 600)
  }

  const handleOpenAdd = () => {
    setSelectedBday(null)
    setIsAdding(true)
    setSection("add")
    if (bookRef.current) bookRef.current.pageFlip().turnToPage(12)
  }

  const handleSuccess = () => {
    setRefreshTrigger(prev => prev + 1)
    // A soft pastel confetti burst to celebrate a new entry
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      scalar: 0.9,
      colors: ['#e89bb0', '#c16a72', '#d4a9a9', '#c9956b', '#f7d6df'],
    })
    handleBackToToc()
  }

  if (status === "loading" || status === "unauthenticated" || loading) {
    return (
      <div className="soft-floral-bg min-h-screen flex flex-col justify-center items-center gap-4">
        <div className="relative">
          <Clock className="w-10 h-10 animate-spin text-book-gold" />
        </div>
        <p className="font-handwritten text-2xl text-book-text italic">Opening your birthday diary...</p>
        <div className="flex gap-1 mt-2">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-book-gold animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    )
  }

  const totalCount = birthdays.length
  const averageAge = totalCount > 0 
    ? Math.round(birthdays.reduce((acc, curr) => acc + calculateAge(curr.date, new Date()), 0) / totalCount)
    : 0
  
  let maxGap = 0
  if (sortedBirthdays.length > 1) {
    for (let i = 0; i < sortedBirthdays.length; i++) {
      const nextIndex = (i + 1) % sortedBirthdays.length
      const currentBday = sortedBirthdays[i].nextBirthday
      const nextBday = sortedBirthdays[nextIndex].nextBirthday
      let gap = differenceInDays(nextBday, currentBday)
      if (gap < 0) gap += 365
      if (gap > maxGap) maxGap = gap
    }
  }

  const upcomingZodiac = nextBirthday ? getZodiac(nextBirthday.date) : null

  // Computed stats for the new design
  const birthdaysThisMonth = sortedBirthdays.filter(b => {
    const nb = b.nextBirthday
    const now = new Date()
    return nb.getMonth() === now.getMonth() && nb.getFullYear() === now.getFullYear()
  }).length

  const birthdaysThisWeek = sortedBirthdays.filter(b => {
    return b.daysUntil >= 0 && b.daysUntil <= 7
  }).length

  // No framer motion pageVariants needed

  const today = new Date()

  return (
    <div className={cn(
      "soft-floral-bg w-full h-full relative",
      isMobile
        ? "overflow-y-auto"
        : "flex flex-col items-center px-3 md:px-6 pt-3 md:pt-5 pb-3 overflow-hidden"
    )}>
      {/* ═══════════════════════════════════════════════════════
          MOBILE VIEW (phones) — clean scrollable layout
          ═══════════════════════════════════════════════════════ */}
      {isMobile && (
        <>
          <BirthdayMobileView
            today={today}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredBirthdays={filteredBirthdays}
            todaysBirthdays={todaysBirthdays}
            upcomingBirthdays={upcomingBirthdays}
            totalCount={totalCount}
            birthdaysThisMonth={birthdaysThisMonth}
            birthdaysThisWeek={birthdaysThisWeek}
            onSelect={handleSelectBday}
            onAdd={handleOpenAdd}
            onSignOut={() => signOut({ callbackUrl: "/" })}
          />
          <AnimatePresence>
            {selectedBday && (
              <BirthdayDetailDrawer birthday={selectedBday} onClose={() => setSelectedBday(null)} />
            )}
          </AnimatePresence>
          {isAdding && (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
              <div className="absolute inset-0 bg-black/60" onClick={() => setIsAdding(false)} />
              <div className="relative z-10 w-full sm:max-w-lg max-h-[88vh] overflow-y-auto bg-book-paper rounded-t-2xl sm:rounded-2xl border border-book-border shadow-2xl">
                <BirthdayForm onSuccess={() => { setRefreshTrigger(prev => prev + 1); setIsAdding(false) }} />
              </div>
            </div>
          )}
        </>
      )}

      {!isMobile && (
      <>
      {/* ═══════════════════════════════════════════════════════
          FLOATING HEADER ABOVE BOOK
          ═══════════════════════════════════════════════════════ */}
      <div className="shrink-0 flex flex-col md:flex-row justify-between items-center w-full max-w-5xl mb-3 md:mb-4 gap-2 md:gap-0">
        {/* LEFT: Logo */}
        <div className="text-center md:text-left">
          <h1 className="font-handwritten text-3xl md:text-4xl text-book-text leading-none">
            Birthday Diary
          </h1>
          <p className="font-serif italic text-book-muted text-xs md:text-sm mt-0.5">
            Every Birthday, a Beautiful Memory
          </p>
        </div>

        {/* CENTER: Search bar */}
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-book-muted" />
          <input
            type="text"
            placeholder="Search names..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full border border-book-border bg-book-paper text-book-text placeholder:text-book-muted text-sm font-serif focus:outline-none focus:ring-2 focus:ring-book-gold/50"
          />
        </div>

        {/* RIGHT: Today's date */}
        <div className="flex items-center gap-2 text-book-text">
          <ChevronLeft className="w-4 h-4 text-book-muted cursor-pointer hover:text-book-text transition-colors opacity-50" />
          <div className="text-center">
            <span className="font-serif text-sm md:text-base text-book-text font-medium">
              {format(today, "MMM dd, yyyy")}
            </span>
            <span className="block font-serif text-xs text-book-muted italic">
              {format(today, "EEEE")}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-book-muted cursor-pointer hover:text-book-text transition-colors opacity-50" />
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-book-border bg-book-paper text-book-text shadow-sm transition-colors hover:bg-book-cream focus:outline-none focus:ring-2 focus:ring-book-gold/50"
            aria-label="Log out"
            title="Log out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          THE BOOK
          ═══════════════════════════════════════════════════════ */}
      <div className="relative flex-1 min-h-0 w-full flex items-center justify-center">
        {/* Book frame — aspect-locked (8:5 spread) so it always fits the viewport */}
        <div className="relative h-full max-h-full max-w-full aspect-[8/5]">

        {/* Book cover (dark green leather) */}
        <div className="book-cover flex justify-center items-center p-2 w-full h-full relative z-10">
          {/* react-pageflip wrapper */}
          <div className="book-scene w-full h-full">
            <AnimatePresence mode="wait" initial={false}>
            {section === "index" && (
            <motion.div key="index" className="diary-spread" initial={spreadMotion.initial} animate={spreadMotion.animate} exit={spreadMotion.exit} transition={spreadMotion.transition}>
            {/* ══════════════════════════════════════════════
                SPREAD 1: VIEW 1 - TABLE OF CONTENTS
                ══════════════════════════════════════════════ */}
            {/* Page 1 (Left) - INDEX */}
            <BookPage className="book-page-bg page-shadow-left p-7 md:p-12 flex flex-col min-h-0 overflow-hidden">
              <div className="floral-corner-tl" />
              <div className="floral-corner-bl" />
              
              <div className="text-center mb-4 mt-2 relative z-10 shrink-0">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-book-text tracking-[0.16em] uppercase">
                  Index
                </h2>
                <div className="floral-divider mt-3 scale-75 opacity-80" />
              </div>

              <div className="index-list flex-1 min-h-0 overflow-y-auto overscroll-contain pr-2 md:pr-3 space-y-1.5 md:space-y-2 scrollbar-thin relative z-10">
                {totalCount === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-lg md:text-xl text-book-muted font-serif italic mb-6">Your diary is empty.</p>
                    <Button onClick={handleOpenAdd} size="lg" className="bg-book-accent hover:bg-book-accent/90 text-white rounded-full font-serif text-lg px-8 py-6">
                      Add First Birthday
                    </Button>
                  </div>
                ) : filteredBirthdays.length === 0 ? (
                  <p className="text-lg text-book-muted font-serif italic py-12 text-center">
                    No names match your search.
                  </p>
                ) : (
                  filteredBirthdays.map((b) => {
                    const isToday = b.daysUntil === 0
                    return (
                      <button
                        type="button"
                        key={b.id}
                        onClick={() => handleSelectBday(b)}
                        className={cn(
                          "index-row w-full min-w-0 text-left text-base md:text-lg font-serif cursor-pointer group transition-all duration-200 py-2 px-3 rounded-md",
                          isToday ? "bg-book-sage/70 shadow-sm" : "hover:bg-book-cream/50"
                        )}
                      >
                        {isToday ? (
                          <Cake className="w-4 h-4 mr-3 shrink-0 text-book-accent" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-book-muted/50 mr-3 shrink-0 group-hover:bg-book-accent transition-colors" />
                        )}
                        <span className="index-name font-medium text-book-text group-hover:text-book-accent transition-colors truncate">{b.name}</span>
                        <span className="dotted-leader opacity-50" aria-hidden="true" />
                        <span className="text-book-muted text-sm md:text-base whitespace-nowrap">{format(new Date(b.date), "MMM dd")}</span>
                      </button>
                    )
                  })
                )}
              </div>
              
              <div className="index-quote mt-4 pt-3 relative z-10 pl-4 md:pl-8 shrink-0">
                <p className="font-serif text-book-muted text-sm md:text-base italic text-left leading-relaxed max-w-[250px]">
                  Good friends are like stars.<br/>
                  You don&apos;t always see them,<br/>
                  but you know they&apos;re always there.
                </p>
                <div className="mt-2 flex justify-start opacity-50">
                  <Leaf className="w-4 h-4 text-book-muted" />
                </div>
              </div>
            </BookPage>

            {/* Page 2 (Right) - CELEBRATIONS & STATS */}
            <BookPage className="book-page-bg page-shadow-right p-8 md:p-14 flex flex-col pb-10">
              <div className="floral-corner-tr" />
              <div className="floral-corner-br" />
              
              <div className="space-y-6 relative z-10 flex-1 flex flex-col">
                {/* Top Section: Celebrations Today */}
                <div className="text-center relative pt-8 pb-4">
                  <div className="relative z-10">
                    <p className="text-[10px] uppercase font-serif text-book-muted tracking-[0.2em] mb-4">Celebrations Today</p>
                    {todaysBirthdays.length > 0 ? (
                      todaysBirthdays.map(b => (
                        <div key={b.id} className="cursor-pointer group" onClick={() => handleSelectBday(b)}>
                          <div className="flex items-center justify-center gap-4">
                            <Heart className="w-5 h-5 text-book-accent/40 group-hover:text-book-accent transition-colors" />
                            <h3 className="font-handwritten text-5xl md:text-7xl text-book-accent font-bold group-hover:scale-105 transition-transform drop-shadow-sm break-words leading-tight max-w-full text-center">
                              {b.name}
                            </h3>
                            <Heart className="w-5 h-5 text-book-accent/40 group-hover:text-book-accent transition-colors" />
                          </div>
                          <div className="flex items-center justify-center gap-3 mt-4 opacity-80">
                            <Leaf className="w-4 h-4 text-book-accent/70" />
                            <span className="font-serif text-book-text font-bold text-xl md:text-2xl tracking-wide">
                              {format(new Date(b.date), "MMM dd")}
                            </span>
                            <Leaf className="w-4 h-4 text-book-accent/70 -scale-x-100" />
                          </div>
                        </div>
                      ))
                    ) : nextBirthday ? (
                      <div className="cursor-pointer group" onClick={() => handleSelectBday(nextBirthday)}>
                         <div className="flex items-center justify-center gap-4">
                            <Heart className="w-5 h-5 text-book-accent/40 group-hover:text-book-accent transition-colors" />
                            <h3 className="font-handwritten text-5xl md:text-7xl text-book-accent font-bold group-hover:scale-105 transition-transform drop-shadow-sm break-words leading-tight max-w-full text-center">
                              {nextBirthday.name}
                            </h3>
                            <Heart className="w-5 h-5 text-book-accent/40 group-hover:text-book-accent transition-colors" />
                          </div>
                          <div className="flex items-center justify-center gap-3 mt-4 opacity-80">
                            <Leaf className="w-4 h-4 text-book-accent/70" />
                            <span className="font-serif text-book-text font-bold text-xl md:text-2xl tracking-wide">
                              {format(new Date(nextBirthday.date), "MMM dd")}
                            </span>
                            <Leaf className="w-4 h-4 text-book-accent/70 -scale-x-100" />
                          </div>
                      </div>
                    ) : (
                      <div className="py-6">
                        <p className="font-handwritten text-4xl text-book-muted italic">No upcoming birthdays...</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-end space-y-4">
                  {/* Stats Card */}
                  <div className="bg-book-card-warm border border-book-line shadow-[2px_2px_8px_rgba(0,0,0,0.1)] rounded-sm p-4 md:p-6 grid grid-cols-3 gap-2">
                    <div className="text-center border-r border-book-border/20 last:border-0 flex flex-col justify-center">
                      <Gift className="w-5 h-5 mx-auto mb-2 text-book-accent/70" />
                      <span className="font-serif text-3xl md:text-4xl text-book-text mb-1">{birthdaysThisMonth}</span>
                      <span className="text-[10px] md:text-[11px] text-book-muted uppercase font-serif tracking-wider leading-tight">Birthdays<br/>This Month</span>
                    </div>
                    <div className="text-center border-r border-book-border/20 last:border-0 flex flex-col justify-center">
                      <Cake className="w-5 h-5 mx-auto mb-2 text-book-accent/70" />
                      <span className="font-serif text-3xl md:text-4xl text-book-text mb-1">{birthdaysThisWeek}</span>
                      <span className="text-[10px] md:text-[11px] text-book-muted uppercase font-serif tracking-wider leading-tight">Celebrations<br/>This Week</span>
                    </div>
                    <div className="text-center border-r border-book-border/20 last:border-0 flex flex-col justify-center">
                      <Users className="w-5 h-5 mx-auto mb-2 text-book-accent/70" />
                      <span className="font-serif text-3xl md:text-4xl text-book-text mb-1">{totalCount}</span>
                      <span className="text-[10px] md:text-[11px] text-book-muted uppercase font-serif tracking-wider leading-tight">Friends in<br/>Your Diary</span>
                    </div>
                  </div>

                  {/* Quote Banner */}
                  <div className="bg-book-sage border border-book-sage-line shadow-[2px_2px_8px_rgba(0,0,0,0.1)] rounded-sm p-5 md:p-6 text-center relative overflow-hidden">
                    <p className="font-handwritten text-book-text text-xl md:text-2xl italic leading-relaxed">
                      Every birthday is a reminder<br/>to celebrate life and the people<br/>who make it special.
                    </p>
                    <Heart className="w-3.5 h-3.5 mx-auto mt-3 text-book-accent/50" />
                  </div>

                  {/* Upcoming Birthdays Section */}
                  <div className="bg-book-card border border-book-line shadow-[2px_2px_8px_rgba(0,0,0,0.1)] rounded-sm p-5 md:p-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <span className="h-px w-6 bg-book-border" />
                      <span className="text-[11px] uppercase font-serif tracking-[0.2em] text-book-muted">Upcoming Birthdays</span>
                      <span className="h-px w-6 bg-book-border" />
                    </div>
                    
                    <div className="space-y-3">
                      {upcomingBirthdays.slice(0, 2).map(b => (
                        <div key={b.id} className="flex items-center gap-4 cursor-pointer hover:bg-book-cream/50 p-2 rounded transition-colors" onClick={() => handleSelectBday(b)}>
                          <div className="border border-book-line bg-book-cream rounded-sm w-12 h-12 flex flex-col items-center justify-center shrink-0 shadow-sm">
                            <span className="text-[8px] uppercase tracking-wider text-book-muted font-serif leading-none mt-1">{format(new Date(b.date), "MMM")}</span>
                            <span className="text-xl font-serif text-book-text leading-tight">{format(new Date(b.date), "dd")}</span>
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <span className="font-serif font-bold text-book-text text-sm md:text-base truncate">{b.name}</span>
                            <span className="font-serif text-book-muted text-xs md:text-sm truncate">
                              {format(new Date(b.date), "EEEE, dd MMMM")}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-book-muted/60 shrink-0" />
                        </div>
                      ))}
                      {upcomingBirthdays.length === 0 && (
                        <p className="text-xs text-book-muted italic text-center font-serif">No upcoming birthdays found.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </BookPage>

            {/* ══════════════════════════════════════════════
                SPREAD: CALENDAR  (pages 2-3)
                ══════════════════════════════════════════════ */}
            </motion.div>
            )}
            {section === "calendar" && (
            <motion.div key="calendar" className="diary-spread" initial={spreadMotion.initial} animate={spreadMotion.animate} exit={spreadMotion.exit} transition={spreadMotion.transition}>
            <BookPage className="book-page-bg page-shadow-left p-8 md:p-12 flex flex-col">
              <CalendarLedger birthdays={birthdays} month={currentMonth} />
            </BookPage>
            <BookPage className="book-page-bg page-shadow-right p-8 md:p-12 flex flex-col">
              <CalendarGrid
                birthdays={birthdays}
                month={currentMonth}
                onPrev={() => setCurrentMonth(subMonths(currentMonth, 1))}
                onNext={() => setCurrentMonth(addMonths(currentMonth, 1))}
                onPick={handleOpenAdd}
              />
            </BookPage>

            {/* ══════════════════════════════════════════════
                SPREAD: PEOPLE  (pages 4-5)
                ══════════════════════════════════════════════ */}
            </motion.div>
            )}
            {section === "people" && (
            <motion.div key="people" className="diary-spread" initial={spreadMotion.initial} animate={spreadMotion.animate} exit={spreadMotion.exit} transition={spreadMotion.transition}>
            <BookPage className="book-page-bg page-shadow-left p-8 md:p-12 flex flex-col">
              <PeopleOverview birthdays={birthdays} />
            </BookPage>
            <BookPage className="book-page-bg page-shadow-right p-8 md:p-12 flex flex-col">
              <PeopleList birthdays={birthdays} onSelect={handleSelectBday} />
            </BookPage>

            {/* ══════════════════════════════════════════════
                SPREAD: CONSTELLATION  (pages 6-7)
                ══════════════════════════════════════════════ */}
            </motion.div>
            )}
            {section === "constellation" && (
            <motion.div key="constellation" className="diary-spread" initial={spreadMotion.initial} animate={spreadMotion.animate} exit={spreadMotion.exit} transition={spreadMotion.transition}>
            <BookPage className="book-page-bg page-shadow-left p-8 md:p-12 flex flex-col">
              <ConstellationOverview birthdays={birthdays} />
            </BookPage>
            <BookPage className="book-page-bg page-shadow-right p-8 md:p-12 flex flex-col">
              <ConstellationList birthdays={birthdays} onSelect={handleSelectBday} />
            </BookPage>

            {/* ══════════════════════════════════════════════
                SPREAD: SETTINGS  (pages 8-9)
                ══════════════════════════════════════════════ */}
            </motion.div>
            )}
            {section === "settings" && (
            <motion.div key="settings" className="diary-spread" initial={spreadMotion.initial} animate={spreadMotion.animate} exit={spreadMotion.exit} transition={spreadMotion.transition}>
            <BookPage className="book-page-bg page-shadow-left p-8 md:p-12 flex flex-col">
              {profile && <SettingsProfile profile={profile} onChange={(p) => setProfile({ ...profile, ...p })} />}
            </BookPage>
            <BookPage className="book-page-bg page-shadow-right p-8 md:p-12 flex flex-col">
              {profile && (
                <SettingsPrefs
                  profile={profile}
                  onChange={(p) => setProfile({ ...profile, ...p })}
                  onSave={saveProfile}
                  saving={savingProfile}
                  onSignOut={() => signOut({ callbackUrl: "/" })}
                />
              )}
            </BookPage>

            {/* ══════════════════════════════════════════════
                SPREAD: BIRTHDAY DETAIL  (pages 10-11)
                ══════════════════════════════════════════════ */}
            {/* Page (Left) - Profile Portal Mount */}
            </motion.div>
            )}
            {section === "detail" && (
            <motion.div key="detail" className="diary-spread" initial={spreadMotion.initial} animate={spreadMotion.animate} exit={spreadMotion.exit} transition={spreadMotion.transition}>
            <BookPage className="book-page-bg page-shadow-left">
              <div id="profile-portal-mount" className="w-full h-full relative" />
            </BookPage>

            {/* Page 4 (Right) - Details Portal Mount */}
            <BookPage className="book-page-bg page-shadow-right">
              <div id="details-portal-mount" className="w-full h-full relative" />
            </BookPage>

            {/* ══════════════════════════════════════════════
                SPREAD 3: VIEW 2 - ADD NEW ENTRY
                ══════════════════════════════════════════════ */}
            {/* Page 5 (Left) - Add Context */}
            </motion.div>
            )}
            {section === "add" && (
            <motion.div key="add" className="diary-spread" initial={spreadMotion.initial} animate={spreadMotion.animate} exit={spreadMotion.exit} transition={spreadMotion.transition}>
            <BookPage className="book-page-bg page-shadow-left p-6 md:p-10 flex flex-col justify-between">
              <div className="floral-corner-tl" />
              <div className="floral-corner-bl" />
              <div className="relative z-10 space-y-6">
                <button onClick={handleBackToToc} className="flex items-center gap-1.5 text-sm text-book-muted hover:text-book-text transition-colors font-serif italic group">
                  <ChevronLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  Cancel Entry
                </button>
                <div className="space-y-4 mt-4">
                  <h2 className="font-handwritten text-4xl text-book-text font-bold">Add a New Entry</h2>
                  <div className="floral-divider" />
                  <p className="text-sm text-book-muted font-serif italic leading-relaxed">Record the birthday of someone who fills your world with joy.</p>
                </div>
              </div>
            </BookPage>

            {/* Page 6 (Right) - Form */}
            <BookPage className="book-page-bg page-shadow-right p-6 md:p-10">
              <div className="floral-corner-tr" />
              <div className="floral-corner-br" />
              <div className="relative z-10 h-full">
                <BirthdayForm onSuccess={handleSuccess} />
              </div>
            </BookPage>
            </motion.div>
            )}
            </AnimatePresence>
          </div>
          
          {/* External BirthdayBookPage render (Portals its content into Spread 2) */}
          {selectedBday && (
            <BirthdayBookPage
              birthday={selectedBday}
              onBack={handleBackToToc}
              onUpdate={fetchBirthdays}
              onDelete={handleDelete}
            />
          )}
        </div>

        {/* ═══════════════════════════════════════════════════════
            PHYSICAL TABS (right edge, desktop only)
            ═══════════════════════════════════════════════════════ */}
        <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 flex-col gap-1.5 z-40">
          <button onClick={() => goToPage(0, "index")} className={cn("book-tab book-tab-index", section === "index" && "active")}>
            <BookOpen className="w-4 h-4" />
            <span>Index</span>
          </button>
          <button onClick={() => goToPage(2, "calendar")} className={cn("book-tab book-tab-calendar", section === "calendar" && "active")}>
            <CalendarDays className="w-4 h-4" />
            <span>Calendar</span>
          </button>
          <button onClick={() => goToPage(4, "people")} className={cn("book-tab book-tab-add", section === "people" && "active")}>
            <Users className="w-4 h-4" />
            <span>People</span>
          </button>
          <button onClick={() => goToPage(6, "constellation")} className={cn("book-tab book-tab-settings", section === "constellation" && "active")}>
            <Sparkles className="w-4 h-4" />
            <span>Stars</span>
          </button>
          <button onClick={() => goToPage(8, "settings")} className={cn("book-tab book-tab-calendar", section === "settings" && "active")}>
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button onClick={handleOpenAdd} className={cn("book-tab book-tab-add", section === "add" && "active")}>
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
        </div>
      </div>
      </>
      )}
    </div>
  )
}

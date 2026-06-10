"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { format, differenceInYears } from "date-fns"
import { 
  Search, 
  Clock,
  BookOpen,
  Plus,
  CalendarDays,
  Settings,
  Heart,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { getZodiac } from "@/lib/zodiac"
import { cn } from "@/lib/utils"

interface Birthday {
  id: string
  name: string
  date: string
  notes: string | null
  relationship: string | null
  interests: string | null
}

const relationshipFilters = [
  { label: "All Circle", value: "all" },
  { label: "Family", value: "family" },
  { label: "Friends", value: "friend" },
  { label: "Colleagues", value: "colleague" },
  { label: "Partners", value: "partner" },
  { label: "Others", value: "other" },
]

export default function PeoplePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [birthdays, setBirthdays] = useState<Birthday[]>([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  // Mobile Views tab
  const [mobilePeopleTab, setMobilePeopleTab] = useState<"filters" | "list">("list")

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
      }
    } catch (error) {
      console.error("Failed to fetch birthdays", error)
    } finally {
      setLoading(false)
    }
  }

  const calculateAge = (dateString: string) => {
    return differenceInYears(new Date(), new Date(dateString))
  }

  if (status === "loading" || status === "unauthenticated" || loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-3">
        <Clock className="w-8 h-8 animate-spin text-amber-900" />
        <p className="text-sm font-serif text-stone-600 dark:text-stone-400 italic">Opening journal directory...</p>
      </div>
    )
  }

  const filteredBirthdays = birthdays
    .filter((b) => b.name.toLowerCase().includes(search.toLowerCase()))
    .filter((b) => filter === "all" || b.relationship === filter)
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="relative pt-6">
      {/* Immersive Book Container */}
      <div className="relative w-full max-w-5xl mx-auto flex shadow-book rounded-r-2xl rounded-l-md overflow-visible bg-paper select-none perspective-[1500px]">
        
        {/* Book Spine Shadow */}
        <div className="absolute top-0 bottom-0 left-[50%] -translate-x-[50%] w-10 book-spine-shadow z-20 pointer-events-none hidden md:block"></div>

        {/* Spiral Rings */}
        <div className="absolute top-0 bottom-0 left-[50%] -translate-x-[50%] w-3 flex flex-col justify-around py-8 z-30 pointer-events-none hidden md:flex">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="w-6 h-3 bg-stone-300 dark:bg-stone-700 rounded-full border-t border-b border-stone-500 dark:border-stone-850 shadow-inner -translate-x-[6px] opacity-75"></div>
          ))}
        </div>

        {/* PHYSICAL JOURNAL TABS STICKING OUT THE RIGHT EDGE */}
        <div className="absolute right-0 top-16 translate-x-[100%] flex flex-col gap-2 z-0 font-serif italic text-xs select-none">
          <Link
            href="/"
            className="w-14 py-3 rounded-r-xl border border-stone-400/80 dark:border-stone-850 shadow-md bg-amber-900/20 text-stone-750 dark:text-stone-400 border-l-0 hover:bg-paper-light transition-all duration-300 flex flex-col items-center gap-1 hover:translate-x-1"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Index</span>
          </Link>

          <Link
            href="/?action=add"
            className="w-14 py-3 rounded-r-xl border border-stone-400/80 dark:border-stone-850 shadow-md bg-amber-900/20 text-stone-750 dark:text-stone-400 border-l-0 hover:bg-paper-light transition-all duration-300 flex flex-col items-center gap-1 hover:translate-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New</span>
          </Link>

          <Link
            href="/calendar"
            className="w-14 py-3 rounded-r-xl border border-stone-400/80 dark:border-stone-850 shadow-md bg-amber-900/20 text-stone-750 dark:text-stone-400 border-l-0 hover:bg-paper-light transition-all duration-300 flex flex-col items-center gap-1 hover:translate-x-1"
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Cal</span>
          </Link>

          <Link
            href="/settings"
            className="w-14 py-3 rounded-r-xl border border-stone-400/80 dark:border-stone-850 shadow-md bg-amber-900/20 text-stone-750 dark:text-stone-400 border-l-0 hover:bg-paper-light transition-all duration-300 flex flex-col items-center gap-1 hover:translate-x-1"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Setup</span>
          </Link>
        </div>

        {/* BOOK CONTENTS */}
        <div className="w-full flex flex-col md:flex-row bg-paper min-h-[480px] rounded-r-2xl rounded-l-md overflow-hidden">
          
          {/* MOBILE TABS FOR PEOPLE SEARCH */}
          <div className="flex md:hidden bg-stone-300/40 dark:bg-stone-800/40 p-1 rounded-full mb-2 mx-4 mt-4 border border-stone-400/20 shrink-0 z-10 relative">
            <button
              type="button"
              onClick={() => setMobilePeopleTab("list")}
              className={cn(
                "flex-1 py-1 text-center text-xs font-serif italic rounded-full transition-all",
                mobilePeopleTab === "list" 
                  ? "bg-stone-800 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-bold shadow-sm" 
                  : "text-stone-650 dark:text-stone-400"
              )}
            >
              Circle Directory
            </button>
            <button
              type="button"
              onClick={() => setMobilePeopleTab("filters")}
              className={cn(
                "flex-1 py-1 text-center text-xs font-serif italic rounded-full transition-all",
                mobilePeopleTab === "filters" 
                  ? "bg-stone-800 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-bold shadow-sm" 
                  : "text-stone-655 dark:text-stone-400"
              )}
            >
              Filter Ledger
            </button>
          </div>

          {/* LEFT PAGE: SEARCH & FILTERS */}
          <div className={cn(
            "w-full md:w-1/2 bg-paper-light border-b md:border-b-0 md:border-r border-stone-400/40 dark:border-stone-800/45 p-6 md:p-8 flex flex-col justify-between shadow-page-left relative min-h-[400px]",
            mobilePeopleTab === "filters" ? "flex" : "hidden md:flex"
          )}>
            <div className="space-y-6 flex-1 flex flex-col min-h-0">
              <div>
                <h2 className="font-handwritten text-4xl text-stone-850 dark:text-stone-100 font-bold border-b border-stone-300 dark:border-stone-750 pb-2">
                  Social Circle
                </h2>
                <p className="text-[10px] text-stone-600 dark:text-stone-400 font-serif italic mt-1.5 flex items-center justify-between">
                  <span>Browse and filter your contacts list.</span>
                </p>
              </div>

              {/* Search Bar Line */}
              <div className="relative flex items-center shrink-0">
                <Search className="absolute left-1 w-3.5 h-3.5 text-stone-600 dark:text-stone-450" />
                <Input
                  placeholder="Search by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-7 pr-3 bg-transparent border-t-0 border-x-0 border-b border-stone-400 dark:border-stone-700 rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-stone-800 dark:focus:border-stone-200 placeholder:text-stone-500/50 text-stone-800 dark:text-stone-200 text-xs py-1.5 font-sans"
                />
              </div>

              {/* Filter stamps */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider block">
                  Category Index
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {relationshipFilters.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => setFilter(r.value)}
                      className={cn(
                        "text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border transition-all",
                        filter === r.value 
                          ? "border-amber-900 bg-amber-900/10 text-amber-900 dark:border-amber-600 dark:bg-amber-600/10 dark:text-amber-400" 
                          : "border-stone-400/40 dark:border-stone-750 text-stone-600 dark:text-stone-400 hover:border-stone-600 dark:hover:border-stone-500"
                      )}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-stone-400/20 dark:border-stone-800/20 pt-4 text-[10px] text-stone-500 dark:text-stone-500 font-serif italic">
              * Click any name on the right page to flip to their journal ledger.
            </div>
          </div>

          {/* RIGHT PAGE: DIRECTORY LIST */}
          <div className={cn(
            "w-full md:w-1/2 bg-paper-light p-6 md:p-8 flex flex-col justify-between shadow-page-right relative min-h-[400px]",
            mobilePeopleTab === "list" ? "flex" : "hidden md:flex"
          )}>
            <div className="flex-1 flex flex-col justify-between h-full space-y-4">
              
              <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 max-h-[360px] scrollbar-thin">
                {filteredBirthdays.length === 0 ? (
                  <p className="text-xs text-stone-600 dark:text-stone-450 font-serif italic text-center py-10">
                    No contacts found.
                  </p>
                ) : (
                  filteredBirthdays.map((b) => {
                    const zodiac = getZodiac(b.date)
                    return (
                      <div
                        key={b.id}
                        onClick={() => router.push(`/?id=${b.id}`)}
                        className="flex items-center justify-between p-2.5 hover:bg-stone-500/5 dark:hover:bg-stone-100/5 border-b border-stone-300/30 dark:border-stone-800/20 group cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-2xl">{zodiac.emoji}</span>
                          <div className="min-w-0">
                            <h4 className="font-serif font-bold text-sm text-stone-850 dark:text-stone-100 truncate leading-none">
                              {b.name}
                            </h4>
                            <span className="text-[9px] text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                              {format(new Date(b.date), "MMM d, yyyy")} • Age {calculateAge(b.date)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {b.relationship && (
                            <Badge variant="outline" className="text-[9px] rounded-full px-1.5 py-0 border-stone-400/35 dark:border-stone-750 text-stone-600 dark:text-stone-400 uppercase font-sans font-normal capitalize">
                              {b.relationship}
                            </Badge>
                          )}
                          <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-amber-900 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              {/* Notebook footer margins */}
              <div className="border-t border-stone-300/40 dark:border-stone-800/45 pt-3 text-[10px] text-stone-500 dark:text-stone-500 font-serif leading-none flex items-center gap-1 shrink-0">
                <Heart className="w-3 h-3 text-amber-900/60 dark:text-amber-600/60" />
                <span>Showing {filteredBirthdays.length} matching lives.</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from "date-fns"
import { ChevronLeft, ChevronRight, Clock, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import BirthdayForm from "@/components/birthdays/BirthdayForm"
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

export default function CalendarPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [birthdays, setBirthdays] = useState<Birthday[]>([])
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [loading, setLoading] = useState(true)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [mobileCalTab, setMobileCalTab] = useState<"list" | "grid">("grid")

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login")
  }, [status, router])

  useEffect(() => {
    if (session) fetchBirthdays()
  }, [session])

  const fetchBirthdays = async () => {
    try {
      const res = await fetch("/api/birthdays")
      if (res.ok) setBirthdays(await res.json())
    } catch (error) {
      console.error("Failed to fetch birthdays", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || status === "unauthenticated" || loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-3">
        <Clock className="w-8 h-8 animate-spin text-book-gold" />
        <p className="font-handwritten text-2xl text-book-accent italic">Opening your calendar...</p>
      </div>
    )
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const days = eachDayOfInterval({ start: startOfWeek(monthStart), end: endOfWeek(monthEnd) })

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))

  const getDayBirthdays = (day: Date) =>
    birthdays.filter(b => {
      const d = new Date(b.date)
      return d.getUTCMonth() === day.getMonth() && d.getUTCDate() === day.getDate()
    })

  const activeMonthBirthdays = birthdays
    .filter(b => new Date(b.date).getUTCMonth() === currentMonth.getMonth())
    .sort((a, b) => new Date(a.date).getUTCDate() - new Date(b.date).getUTCDate())

  const handleDayClick = (day: Date) => {
    setSelectedDate(format(day, "yyyy-MM-dd"))
    setIsAddOpen(true)
  }

  const handleSuccess = () => {
    setIsAddOpen(false)
    fetchBirthdays()
  }

  return (
    <div className="relative">
      {/* Page heading */}
      <div className="text-center mb-6">
        <h1 className="font-handwritten text-4xl md:text-5xl text-book-text leading-none">Calendar</h1>
        <p className="font-serif italic text-book-muted text-sm mt-1">A month-by-month view of every celebration</p>
      </div>

      {/* Paper spread */}
      <div className="max-w-5xl mx-auto book-page-bg rounded-xl shadow-book border border-book-border overflow-hidden">
        {/* Mobile view toggle */}
        <div className="flex md:hidden bg-book-card/70 p-1 rounded-full m-4 border border-book-line">
          {(["grid", "list"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setMobileCalTab(tab)}
              className={cn(
                "flex-1 py-1.5 text-center text-xs font-serif rounded-full transition-all",
                mobileCalTab === tab ? "bg-book-text text-book-cream font-bold shadow-sm" : "text-book-muted"
              )}
            >
              {tab === "grid" ? "Calendar" : "This Month"}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row">
          {/* LEFT: Monthly ledger */}
          <div className={cn(
            "w-full md:w-[42%] p-6 md:p-8 md:border-r border-book-border/60 flex flex-col",
            mobileCalTab === "list" ? "flex" : "hidden md:flex"
          )}>
            <div className="relative">
              <div className="floral-corner-tl" />
            </div>
            <div className="flex items-end justify-between border-b border-book-border pb-3 mb-4">
              <h2 className="font-handwritten text-3xl text-book-text leading-none">Monthly Ledger</h2>
              <span className="text-[10px] font-serif uppercase tracking-wider text-book-accent bg-book-accent/10 px-2.5 py-1 rounded-full">
                {activeMonthBirthdays.length} {activeMonthBirthdays.length === 1 ? "entry" : "entries"}
              </span>
            </div>
            <p className="font-serif italic text-book-muted text-xs mb-4">
              Celebrations in {format(currentMonth, "MMMM yyyy")}
            </p>

            <div className="flex-1 overflow-y-auto pr-1 space-y-1.5 max-h-[300px] scrollbar-thin">
              {activeMonthBirthdays.length === 0 ? (
                <p className="text-sm text-book-muted font-serif italic py-10 text-center">
                  No birthdays in {format(currentMonth, "MMMM")}.
                </p>
              ) : (
                activeMonthBirthdays.map(b => {
                  const zodiac = getZodiac(b.date)
                  return (
                    <div key={b.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-book-cream/60 transition-colors">
                      <div className="w-9 h-9 rounded-full bg-book-accent/10 text-book-accent flex items-center justify-center font-serif font-bold shrink-0">
                        {b.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block font-serif font-bold text-book-text text-sm truncate leading-tight">{b.name}</span>
                        <span className="block text-[11px] text-book-muted capitalize">{b.relationship || "friend"} · {zodiac.name}</span>
                      </div>
                      <span className="font-serif text-sm text-book-muted shrink-0">{format(new Date(b.date), "MMM d")}</span>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* RIGHT: Month grid */}
          <div className={cn(
            "w-full md:w-[58%] p-6 md:p-8 flex flex-col",
            mobileCalTab === "grid" ? "flex" : "hidden md:flex"
          )}>
            {/* Month nav */}
            <div className="flex items-center justify-between border-b border-book-border pb-3 mb-4">
              <h3 className="font-handwritten text-3xl text-book-text leading-none">{format(currentMonth, "MMMM yyyy")}</h3>
              <div className="flex items-center gap-1.5">
                <Button variant="outline" size="icon" onClick={handlePrevMonth} className="h-8 w-8 rounded-full border-book-border text-book-text hover:bg-book-cream bg-transparent">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleNextMonth} className="h-8 w-8 rounded-full border-book-border text-book-text hover:bg-book-cream bg-transparent">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Weekday header */}
            <div className="grid grid-cols-7 text-center mb-1">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i} className="text-[11px] font-serif uppercase tracking-wider text-book-muted py-1">{d}</div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, idx) => {
                const dayBdays = getDayBirthdays(day)
                const isCurrentMonth = isSameMonth(day, currentMonth)
                const isToday = isSameDay(day, new Date())
                return (
                  <button
                    key={idx}
                    onClick={() => handleDayClick(day)}
                    className={cn(
                      "aspect-square rounded-lg flex flex-col items-center justify-start p-1 transition-colors relative",
                      isCurrentMonth ? "text-book-text hover:bg-book-cream/70" : "text-book-muted/40",
                      isToday && "bg-book-sage/40"
                    )}
                  >
                    <span className={cn(
                      "w-6 h-6 flex items-center justify-center rounded-full text-xs font-serif",
                      isToday && "bg-book-accent text-white font-bold"
                    )}>
                      {format(day, "d")}
                    </span>

                    {dayBdays.length > 0 && (
                      <div className="flex flex-wrap gap-0.5 justify-center mt-0.5">
                        {dayBdays.slice(0, 3).map(b => (
                          <Popover key={b.id}>
                            <PopoverTrigger
                              onClick={e => e.stopPropagation()}
                              className="w-4 h-4 rounded-full bg-book-accent/15 hover:bg-book-accent/30 text-book-accent text-[8px] font-bold font-serif flex items-center justify-center transition-colors"
                              title={b.name}
                            >
                              {b.name.charAt(0).toUpperCase()}
                            </PopoverTrigger>
                            <PopoverContent className="w-52 p-3 bg-book-cream border-book-border shadow-lg">
                              <h4 className="font-serif font-bold text-sm text-book-text truncate">{b.name}</h4>
                              <p className="text-[11px] text-book-muted mt-0.5 font-serif italic">
                                Born {format(new Date(b.date), "MMMM d, yyyy")}
                              </p>
                              <div className="flex gap-1.5 mt-2">
                                <Badge className="text-[9px] rounded-full px-2 py-0 bg-book-accent/10 text-book-accent border-none font-serif uppercase tracking-wide">
                                  {getZodiac(b.date).name}
                                </Badge>
                                {b.relationship && (
                                  <Badge className="text-[9px] rounded-full px-2 py-0 bg-book-sage/50 text-book-text border-none font-serif uppercase tracking-wide capitalize">
                                    {b.relationship}
                                  </Badge>
                                )}
                              </div>
                            </PopoverContent>
                          </Popover>
                        ))}
                        {dayBdays.length > 3 && (
                          <span className="text-[8px] text-book-muted font-bold">+{dayBdays.length - 3}</span>
                        )}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-book-border/60 flex items-center gap-1.5 text-[11px] text-book-muted font-serif italic">
              <CalendarDays className="w-3.5 h-3.5 text-book-accent/60" />
              <span>Tap any day to add a birthday on that date.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick add dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-lg book-page-bg border-book-border shadow-2xl p-0 overflow-hidden">
          <BirthdayForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

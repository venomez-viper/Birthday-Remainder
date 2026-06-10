"use client"

import { format } from "date-fns"
import { Search, Plus, Cake, Gift, Users, CalendarDays, Settings, Leaf, ChevronRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Birthday {
  id: string
  name: string
  date: string
  notes: string | null
  relationship: string | null
  interests: string | null
}

type MobileBday = Birthday & { daysUntil: number; nextBirthday: Date }

interface BirthdayMobileViewProps {
  today: Date
  searchQuery: string
  setSearchQuery: (s: string) => void
  filteredBirthdays: MobileBday[]
  todaysBirthdays: MobileBday[]
  upcomingBirthdays: MobileBday[]
  totalCount: number
  birthdaysThisMonth: number
  birthdaysThisWeek: number
  onSelect: (b: Birthday) => void
  onAdd: () => void
}

export function BirthdayMobileView({
  today,
  searchQuery,
  setSearchQuery,
  filteredBirthdays,
  todaysBirthdays,
  upcomingBirthdays,
  totalCount,
  birthdaysThisMonth,
  birthdaysThisWeek,
  onSelect,
  onAdd,
}: BirthdayMobileViewProps) {
  return (
    <div className="w-full min-h-full px-4 pt-5 pb-28">
      {/* Header */}
      <header className="flex items-end justify-between mb-5">
        <div>
          <h1 className="font-handwritten text-4xl text-book-cream leading-none">Birthday Diary</h1>
          <p className="font-serif italic text-book-muted text-xs mt-1">Every birthday, a beautiful memory</p>
        </div>
        <div className="text-right shrink-0">
          <span className="block font-serif text-sm text-book-cream font-medium">{format(today, "MMM dd")}</span>
          <span className="block font-serif text-[11px] text-book-muted italic">{format(today, "EEEE")}</span>
        </div>
      </header>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-book-muted" />
        <input
          type="text"
          placeholder="Search names..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-full border border-book-border bg-book-paper text-book-text placeholder:text-book-muted text-sm font-serif focus:outline-none focus:ring-2 focus:ring-book-gold/50"
        />
      </div>

      {/* Today's celebration */}
      {todaysBirthdays.length > 0 && (
        <div className="bg-book-card-warm border border-book-line rounded-2xl p-5 mb-5 text-center shadow-md">
          <p className="text-[10px] uppercase font-serif text-book-muted tracking-[0.2em] mb-2">Celebrating Today</p>
          {todaysBirthdays.map((b) => (
            <button key={b.id} onClick={() => onSelect(b)} className="block w-full">
              <span className="font-handwritten text-5xl text-book-accent leading-tight">{b.name}</span>
              <span className="flex items-center justify-center gap-2 mt-2 text-book-text font-serif">
                <Leaf className="w-4 h-4 text-book-accent/70" />
                {format(new Date(b.date), "MMMM dd")}
                <Leaf className="w-4 h-4 text-book-accent/70 -scale-x-100" />
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { icon: Gift, value: birthdaysThisMonth, label: "This Month" },
          { icon: Cake, value: birthdaysThisWeek, label: "This Week" },
          { icon: Users, value: totalCount, label: "Friends" },
        ].map(({ icon: Icon, value, label }) => (
          <div key={label} className="bg-book-card border border-book-line rounded-xl p-3 text-center shadow-sm">
            <Icon className="w-4 h-4 mx-auto mb-1.5 text-book-accent/70" />
            <span className="block font-serif text-2xl text-book-text leading-none">{value}</span>
            <span className="block text-[9px] text-book-muted uppercase tracking-wider mt-1">{label}</span>
          </div>
        ))}
      </div>

      {/* Upcoming */}
      {upcomingBirthdays.length > 0 && (
        <section className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-5 bg-book-border" />
            <h2 className="text-[11px] uppercase font-serif tracking-[0.2em] text-book-muted">Upcoming</h2>
            <span className="h-px flex-1 bg-book-border/50" />
          </div>
          <div className="space-y-2">
            {upcomingBirthdays.slice(0, 3).map((b) => (
              <button
                key={b.id}
                onClick={() => onSelect(b)}
                className="w-full flex items-center gap-3 bg-book-card border border-book-line rounded-xl p-3 text-left shadow-sm active:scale-[0.99] transition-transform"
              >
                <div className="border border-book-line bg-book-cream rounded-lg w-11 h-11 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[8px] uppercase tracking-wider text-book-muted font-serif leading-none">{format(new Date(b.date), "MMM")}</span>
                  <span className="text-lg font-serif text-book-text leading-tight">{format(new Date(b.date), "dd")}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block font-serif font-bold text-book-text truncate">{b.name}</span>
                  <span className="block text-xs text-book-muted">
                    {b.daysUntil === 1 ? "Tomorrow" : `in ${b.daysUntil} days`}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-book-muted shrink-0" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Full index */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <span className="h-px w-5 bg-book-border" />
          <h2 className="text-[11px] uppercase font-serif tracking-[0.2em] text-book-muted">All Birthdays</h2>
          <span className="h-px flex-1 bg-book-border/50" />
        </div>

        {totalCount === 0 ? (
          <div className="bg-book-card border border-book-line rounded-2xl p-8 text-center shadow-sm">
            <p className="text-book-muted font-serif italic mb-4">Your diary is empty.</p>
            <button onClick={onAdd} className="bg-book-accent text-white rounded-full font-serif px-6 py-2.5 text-sm shadow">
              Add First Birthday
            </button>
          </div>
        ) : filteredBirthdays.length === 0 ? (
          <p className="text-book-muted font-serif italic py-8 text-center">No names match your search.</p>
        ) : (
          <div className="bg-book-card/60 border border-book-line rounded-2xl divide-y divide-book-border/40 overflow-hidden shadow-sm">
            {filteredBirthdays.map((b) => {
              const isToday = b.daysUntil === 0
              return (
                <button
                  key={b.id}
                  onClick={() => onSelect(b)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-left active:bg-book-cream/60 transition-colors",
                    isToday && "bg-book-sage/40"
                  )}
                >
                  {isToday ? (
                    <Cake className="w-4 h-4 text-book-accent shrink-0" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-book-muted/50 shrink-0" />
                  )}
                  <span className="flex-1 font-serif text-book-text truncate">{b.name}</span>
                  <span className="font-serif text-sm text-book-muted whitespace-nowrap">{format(new Date(b.date), "MMM dd")}</span>
                </button>
              )
            })}
          </div>
        )}
      </section>

      {/* Bottom links */}
      <div className="flex justify-center gap-6 mt-8">
        <Link href="/calendar" className="flex items-center gap-1.5 text-book-muted text-sm font-serif">
          <CalendarDays className="w-4 h-4" /> Calendar
        </Link>
        <Link href="/settings" className="flex items-center gap-1.5 text-book-muted text-sm font-serif">
          <Settings className="w-4 h-4" /> Settings
        </Link>
      </div>

      {/* Floating add button */}
      <button
        onClick={onAdd}
        aria-label="Add birthday"
        className="fixed bottom-6 right-5 z-40 w-14 h-14 rounded-full bg-book-accent text-white shadow-lg shadow-black/40 flex items-center justify-center active:scale-95 transition-transform"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  )
}

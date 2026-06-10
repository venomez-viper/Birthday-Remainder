"use client"

import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek, endOfWeek } from "date-fns"
import { ChevronLeft, ChevronRight, CalendarDays, Users, Sparkles, Heart, Star } from "lucide-react"
import { getZodiac } from "@/lib/zodiac"
import { ImageUpload } from "@/components/ui/ImageUpload"
import { cn } from "@/lib/utils"

export interface Bday {
  id: string
  name: string
  date: string
  notes: string | null
  relationship: string | null
  interests: string | null
  imageUrl?: string | null
}

/* Small reusable avatar (photo or initial) */
function Avatar({ b, size = 40 }: { b: Bday; size?: number }) {
  return (
    <div
      className="rounded-full overflow-hidden bg-book-accent/10 text-book-accent flex items-center justify-center font-serif font-bold shrink-0 border border-book-line"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {b.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={b.imageUrl} alt="" className="w-full h-full object-cover" />
      ) : (
        b.name.charAt(0).toUpperCase()
      )}
    </div>
  )
}

function PageHeading({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-5 mt-2 relative z-10">
      <Icon className="w-6 h-6 mx-auto mb-2 text-book-accent/70" />
      <h2 className="text-2xl md:text-4xl font-serif font-bold text-book-text tracking-[0.18em] uppercase">{title}</h2>
      {subtitle && <p className="font-serif italic text-book-muted text-xs mt-2">{subtitle}</p>}
      <div className="floral-divider mt-3 scale-90 opacity-80" />
    </div>
  )
}

/* ════════════════ CALENDAR ════════════════ */
export function CalendarLedger({ birthdays, month }: { birthdays: Bday[]; month: Date }) {
  const inMonth = birthdays
    .filter(b => new Date(b.date).getUTCMonth() === month.getMonth())
    .sort((a, b) => new Date(a.date).getUTCDate() - new Date(b.date).getUTCDate())
  return (
    <div className="h-full flex flex-col">
      <div className="floral-corner-tl" />
      <div className="floral-corner-bl" />
      <PageHeading icon={CalendarDays} title="Calendar" subtitle={`Celebrations in ${format(month, "MMMM yyyy")}`} />
      <div className="flex-1 overflow-y-auto pr-2 space-y-1.5 scrollbar-thin relative z-10">
        {inMonth.length === 0 ? (
          <p className="text-sm text-book-muted font-serif italic py-10 text-center">No birthdays this month.</p>
        ) : (
          inMonth.map(b => (
            <div key={b.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-book-cream/60 transition-colors">
              <Avatar b={b} size={36} />
              <div className="min-w-0 flex-1">
                <span className="block font-serif font-bold text-book-text text-sm truncate">{b.name}</span>
                <span className="block text-[11px] text-book-muted capitalize">{b.relationship || "friend"}</span>
              </div>
              <span className="font-serif text-sm text-book-muted">{format(new Date(b.date), "MMM d")}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export function CalendarGrid({
  birthdays, month, onPrev, onNext, onPick,
}: { birthdays: Bday[]; month: Date; onPrev: () => void; onNext: () => void; onPick: (d: Date) => void }) {
  const days = eachDayOfInterval({ start: startOfWeek(startOfMonth(month)), end: endOfWeek(endOfMonth(month)) })
  const dayBdays = (day: Date) =>
    birthdays.filter(b => {
      const d = new Date(b.date)
      return d.getUTCMonth() === day.getMonth() && d.getUTCDate() === day.getDate()
    })
  return (
    <div className="h-full flex flex-col">
      <div className="floral-corner-tr" />
      <div className="floral-corner-br" />
      <div className="flex items-center justify-between border-b border-book-border pb-3 mb-4 relative z-10">
        <h3 className="font-handwritten text-3xl text-book-text leading-none">{format(month, "MMMM yyyy")}</h3>
        <div className="flex gap-1.5">
          <button onClick={onPrev} className="h-8 w-8 rounded-full border border-book-border text-book-text hover:bg-book-cream flex items-center justify-center">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={onNext} className="h-8 w-8 rounded-full border border-book-border text-book-text hover:bg-book-cream flex items-center justify-center">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center mb-1 relative z-10">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} className="text-[11px] font-serif uppercase tracking-wider text-book-muted py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 flex-1 relative z-10">
        {days.map((day, idx) => {
          const list = dayBdays(day)
          const isCur = isSameMonth(day, month)
          const isToday = isSameDay(day, new Date())
          return (
            <button
              key={idx}
              onClick={() => onPick(day)}
              className={cn(
                "rounded-lg flex flex-col items-center justify-start p-1 transition-colors",
                isCur ? "text-book-text hover:bg-book-cream/70" : "text-book-muted/40",
                isToday && "bg-book-sage/40"
              )}
            >
              <span className={cn("w-6 h-6 flex items-center justify-center rounded-full text-xs font-serif", isToday && "bg-book-accent text-white font-bold")}>
                {format(day, "d")}
              </span>
              {list.length > 0 && (
                <span className="mt-0.5 flex gap-0.5">
                  {list.slice(0, 3).map(b => (
                    <span key={b.id} className="w-1.5 h-1.5 rounded-full bg-book-accent" />
                  ))}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ════════════════ PEOPLE ════════════════ */
export function PeopleOverview({ birthdays }: { birthdays: Bday[] }) {
  const groups = birthdays.reduce<Record<string, number>>((acc, b) => {
    const k = (b.relationship || "friend").toLowerCase()
    acc[k] = (acc[k] || 0) + 1
    return acc
  }, {})
  const entries = Object.entries(groups).sort((a, b) => b[1] - a[1])
  return (
    <div className="h-full flex flex-col">
      <div className="floral-corner-tl" />
      <div className="floral-corner-bl" />
      <PageHeading icon={Users} title="People" subtitle={`${birthdays.length} cherished ${birthdays.length === 1 ? "soul" : "souls"}`} />
      <div className="flex-1 space-y-3 relative z-10 mt-2">
        {entries.length === 0 ? (
          <p className="text-sm text-book-muted font-serif italic py-10 text-center">No one in your diary yet.</p>
        ) : (
          entries.map(([rel, count]) => (
            <div key={rel} className="flex items-center justify-between bg-book-card border border-book-line rounded-xl p-4 shadow-sm">
              <span className="font-serif text-book-text capitalize flex items-center gap-2">
                <Heart className="w-4 h-4 text-book-accent/60" /> {rel}
              </span>
              <span className="font-handwritten text-3xl text-book-accent">{count}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export function PeopleList({ birthdays, onSelect }: { birthdays: Bday[]; onSelect: (b: Bday) => void }) {
  const sorted = [...birthdays].sort((a, b) => a.name.localeCompare(b.name))
  return (
    <div className="h-full flex flex-col">
      <div className="floral-corner-tr" />
      <div className="floral-corner-br" />
      <h3 className="font-handwritten text-3xl text-book-text leading-none border-b border-book-border pb-3 mb-4 relative z-10">Directory</h3>
      <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 gap-2 scrollbar-thin relative z-10">
        {sorted.length === 0 ? (
          <p className="text-sm text-book-muted font-serif italic py-10 text-center">Add someone to begin your directory.</p>
        ) : (
          sorted.map(b => (
            <button key={b.id} onClick={() => onSelect(b)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-book-cream/60 text-left transition-colors">
              <Avatar b={b} size={40} />
              <div className="min-w-0 flex-1">
                <span className="block font-serif font-bold text-book-text truncate">{b.name}</span>
                <span className="block text-[11px] text-book-muted">{format(new Date(b.date), "MMMM d")} · {getZodiac(b.date).name}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-book-muted/60" />
            </button>
          ))
        )}
      </div>
    </div>
  )
}

/* ════════════════ CONSTELLATION ════════════════ */
export function ConstellationOverview({ birthdays }: { birthdays: Bday[] }) {
  const elements = birthdays.reduce<Record<string, number>>((acc, b) => {
    const el = getZodiac(b.date).element
    acc[el] = (acc[el] || 0) + 1
    return acc
  }, {})
  const order = ["Fire", "Earth", "Air", "Water"]
  return (
    <div className="h-full flex flex-col">
      <div className="floral-corner-tl" />
      <div className="floral-corner-bl" />
      <PageHeading icon={Sparkles} title="Stars" subtitle="The zodiac of your loved ones" />
      <div className="flex-1 grid grid-cols-2 gap-3 relative z-10 mt-2">
        {order.map(el => (
          <div key={el} className="bg-book-card border border-book-line rounded-xl p-4 text-center shadow-sm flex flex-col justify-center">
            <Star className="w-5 h-5 mx-auto mb-2 text-book-accent/60" />
            <span className="font-handwritten text-4xl text-book-accent leading-none">{elements[el] || 0}</span>
            <span className="block text-[11px] uppercase tracking-wider text-book-muted mt-1 font-serif">{el}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ConstellationList({ birthdays, onSelect }: { birthdays: Bday[]; onSelect: (b: Bday) => void }) {
  const sorted = [...birthdays].sort((a, b) => getZodiac(a.date).name.localeCompare(getZodiac(b.date).name))
  return (
    <div className="h-full flex flex-col">
      <div className="floral-corner-tr" />
      <div className="floral-corner-br" />
      <h3 className="font-handwritten text-3xl text-book-text leading-none border-b border-book-border pb-3 mb-4 relative z-10">Signs</h3>
      <div className="flex-1 overflow-y-auto pr-2 space-y-2 scrollbar-thin relative z-10">
        {sorted.length === 0 ? (
          <p className="text-sm text-book-muted font-serif italic py-10 text-center">No stars charted yet.</p>
        ) : (
          sorted.map(b => {
            const z = getZodiac(b.date)
            return (
              <button key={b.id} onClick={() => onSelect(b)} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-book-cream/60 text-left transition-colors">
                <span className="w-9 h-9 rounded-full bg-book-accent/10 text-book-accent flex items-center justify-center text-lg shrink-0 border border-book-line">{z.emoji}</span>
                <div className="min-w-0 flex-1">
                  <span className="block font-serif font-bold text-book-text truncate">{b.name}</span>
                  <span className="block text-[11px] text-book-muted">{z.name} · {z.element}</span>
                </div>
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}

/* ════════════════ SETTINGS ════════════════ */
export interface Profile {
  name: string | null
  email?: string
  avatarUrl?: string | null
  ownBirthday?: string | null
  reminderDays?: number
}

export function SettingsProfile({
  profile, onChange,
}: { profile: Profile; onChange: (p: Partial<Profile>) => void }) {
  return (
    <div className="h-full flex flex-col">
      <div className="floral-corner-tl" />
      <div className="floral-corner-bl" />
      <PageHeading icon={Heart} title="You" subtitle="Your corner of the diary" />
      <div className="flex-1 flex flex-col items-center gap-5 relative z-10 mt-2">
        <ImageUpload
          value={profile.avatarUrl ?? null}
          onChange={(v) => onChange({ avatarUrl: v })}
          size={104}
          fallback={profile.name ? profile.name.charAt(0).toUpperCase() : undefined}
        />
        <div className="w-full max-w-xs space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-book-muted tracking-wider">Your Name</label>
            <input
              value={profile.name || ""}
              onChange={(e) => onChange({ name: e.target.value })}
              className="input-diary"
              placeholder="Your name"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-book-muted tracking-wider">Your Birthday</label>
            <input
              type="date"
              value={profile.ownBirthday ? new Date(profile.ownBirthday).toISOString().split("T")[0] : ""}
              onChange={(e) => onChange({ ownBirthday: e.target.value })}
              className="input-diary"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export function SettingsPrefs({
  profile, onChange, onSave, saving, onSignOut,
}: { profile: Profile; onChange: (p: Partial<Profile>) => void; onSave: () => void; saving: boolean; onSignOut: () => void }) {
  return (
    <div className="h-full flex flex-col">
      <div className="floral-corner-tr" />
      <div className="floral-corner-br" />
      <h3 className="font-handwritten text-3xl text-book-text leading-none border-b border-book-border pb-3 mb-5 relative z-10">Preferences</h3>
      <div className="flex-1 space-y-5 relative z-10">
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-book-muted tracking-wider">Remind me before a birthday</label>
          <select
            value={profile.reminderDays ?? 1}
            onChange={(e) => onChange({ reminderDays: parseInt(e.target.value) })}
            className="flex h-10 w-full bg-transparent border-b border-book-border rounded-none focus:outline-none focus:border-book-gold text-book-text font-serif text-sm"
          >
            {[1, 2, 3, 7, 14].map(d => (
              <option key={d} value={d} className="bg-book-paper">{d} day{d > 1 ? "s" : ""} before</option>
            ))}
          </select>
        </div>
        {profile.email && (
          <div className="bg-book-card border border-book-line rounded-xl p-4 shadow-sm">
            <span className="block text-[10px] uppercase tracking-wider text-book-muted font-serif">Signed in as</span>
            <span className="block font-serif text-book-text text-sm mt-0.5 truncate">{profile.email}</span>
          </div>
        )}
      </div>
      <div className="space-y-3 pt-4 relative z-10">
        <button onClick={onSave} disabled={saving} className="btn-primary w-full">
          {saving ? "Saving..." : "Save Changes"}
        </button>
        <button onClick={onSignOut} className="w-full text-sm font-serif italic text-book-muted hover:text-book-accent transition-colors py-2">
          Sign out
        </button>
      </div>
    </div>
  )
}

"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { format } from "date-fns"
import { 
  User, 
  Palette, 
  Bell, 
  Database,
  Loader2,
  FileSpreadsheet,
  Download,
  Calendar,
  Clock,
  Sparkles,
  Sun,
  Moon,
  BookOpen,
  Plus,
  Settings,
  ChevronLeft,
  CalendarDays,
  Heart
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const themesList = [
  { name: "Cherry Blossom", value: "cherry-blossom", color: "bg-pink-300", desc: "Soft pastel blush & rose hues" },
  { name: "Sunflower Garden", value: "sunflower-garden", color: "bg-amber-400", desc: "Warm gold & parchment vibes" },
  { name: "Lavender Dreams", value: "lavender-dreams", color: "bg-purple-300", desc: "Soothing lavender & lilac mist" },
  { name: "Botanical Green", value: "botanical-green", color: "bg-emerald-450", desc: "Fresh sage & deep forest tones" },
  { name: "Midnight Garden", value: "midnight-garden", color: "bg-slate-800", desc: "Rich navy & moody dark tones" },
  { name: "Rose Garden", value: "rose-garden", color: "bg-rose-700", desc: "Bold crimson & classic velvet" },
]

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  // State
  const [activeTab, setActiveTab] = useState("profile")
  const [name, setName] = useState("")
  const [ownBirthday, setOwnBirthday] = useState("")
  const [timezone, setTimezone] = useState("UTC")
  const [reminderDays, setReminderDays] = useState("1")
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Mobile navigation
  const [mobileTabState, setMobileTabState] = useState<"menu" | "form">("form")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchProfile()
    }
  }, [session])

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/user/profile")
      if (res.ok) {
        const data = await res.json()
        setName(data.name || "")
        setOwnBirthday(data.ownBirthday ? format(new Date(data.ownBirthday), "yyyy-MM-dd") : "")
        setTimezone(data.timezone || "UTC")
        setReminderDays(data.reminderDays?.toString() || "1")
      }
    } catch (err) {
      console.error("Error fetching profile", err)
    } finally {
      setFetchLoading(false)
    }
  }

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          ownBirthday,
          timezone,
          reminderDays: parseInt(reminderDays),
        }),
      })

      if (res.ok) {
        setSuccess("Journal preferences saved!")
        setTimeout(() => setSuccess(""), 3000)
      } else {
        setError("Failed to update preferences.")
      }
    } catch (err) {
      setError("An error occurred.")
    } finally {
      setLoading(false)
    }
  }

  const handleThemeChange = async (themeValue: string) => {
    setTheme(themeValue)
    try {
      await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ themePreference: themeValue }),
      })
    } catch (err) {
      console.error("Failed to persist theme in database")
    }
  }

  const handleExportCSV = async () => {
    try {
      const res = await fetch("/api/birthdays")
      if (res.ok) {
        const birthdays = await res.json()
        const header = "Name,Date of Birth,Notes,Relationship,Interests\n"
        const rows = birthdays
          .map(
            (b: any) =>
              `"${b.name}","${format(new Date(b.date), "yyyy-MM-dd")}","${b.notes || ""}","${
                b.relationship || ""
              }","${b.interests || ""}"`
          )
          .join("\n")
        
        const blob = new Blob([header + rows], { type: "text/csv" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "birthday_diary_export.csv"
        a.click()
      }
    } catch (err) {
      console.error("Failed to export CSV", err)
    }
  }

  const handleExportICS = () => {
    window.open("/api/export-ics", "_blank")
  }

  const handleMenuSelect = (tabId: string) => {
    setActiveTab(tabId)
    setMobileTabState("form")
  }

  if (status === "loading" || status === "unauthenticated" || fetchLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-3">
        <Clock className="w-8 h-8 animate-spin text-amber-900" />
        <p className="text-sm font-serif text-stone-600 dark:text-stone-400 italic">Opening settings ledger...</p>
      </div>
    )
  }

  const tabsList = [
    { id: "profile", label: "Profile", icon: User },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "notifications", label: "Alerts", icon: Bell },
    { id: "data", label: "Export/Import", icon: Database },
  ]

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
            className="w-14 py-3 rounded-r-xl border border-stone-400/80 dark:border-stone-850 shadow-md bg-amber-900/20 text-stone-755 dark:text-stone-400 border-l-0 hover:bg-paper-light transition-all duration-300 flex flex-col items-center gap-1 hover:translate-x-1"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Index</span>
          </Link>

          <Link
            href="/?action=add"
            className="w-14 py-3 rounded-r-xl border border-stone-400/80 dark:border-stone-850 shadow-md bg-amber-900/20 text-stone-755 dark:text-stone-400 border-l-0 hover:bg-paper-light transition-all duration-300 flex flex-col items-center gap-1 hover:translate-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New</span>
          </Link>

          <Link
            href="/calendar"
            className="w-14 py-3 rounded-r-xl border border-stone-400/80 dark:border-stone-850 shadow-md bg-amber-900/20 text-stone-755 dark:text-stone-400 border-l-0 hover:bg-paper-light transition-all duration-300 flex flex-col items-center gap-1 hover:translate-x-1"
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Cal</span>
          </Link>

          <button
            className="w-14 py-3 rounded-r-xl border border-stone-450 dark:border-stone-850 shadow-md bg-paper-light text-amber-900 dark:text-amber-400 border-l-0 z-20 font-bold translate-x-[3px] flex flex-col items-center gap-1 hover:translate-x-1"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Setup</span>
          </button>
        </div>

        {/* BOOK CONTENTS */}
        <div className="w-full flex flex-col md:flex-row bg-paper min-h-[480px] rounded-r-2xl rounded-l-md overflow-hidden">
          
          {/* LEFT PAGE: SETTINGS TABS SELECTOR */}
          <div className={cn(
            "w-full md:w-1/2 bg-paper-light border-b md:border-b-0 md:border-r border-stone-400/40 dark:border-stone-800/45 p-6 md:p-8 flex flex-col justify-between shadow-page-left relative min-h-[400px]",
            mobileTabState === "menu" ? "flex" : "hidden md:flex"
          )}>
            <div className="space-y-6 flex-1 flex flex-col">
              <div>
                <h2 className="font-handwritten text-4xl text-stone-850 dark:text-stone-100 font-bold border-b border-stone-300 dark:border-stone-750 pb-2">
                  Diary Preferences
                </h2>
                <p className="text-[10px] text-stone-600 dark:text-stone-400 font-serif italic mt-1.5">
                  Configure aesthetics, alerts, and backup ledgers.
                </p>
              </div>

              <div className="space-y-2 mt-4">
                {tabsList.map((t) => {
                  const Icon = t.icon
                  const isActive = activeTab === t.id
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleMenuSelect(t.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-2.5 text-left text-xs font-serif italic transition-all rounded-lg",
                        isActive 
                          ? "bg-amber-900/10 text-amber-900 dark:bg-amber-100/10 dark:text-amber-400 border-l-2 border-amber-900 dark:border-amber-500 pl-3 font-bold" 
                          : "text-stone-700 dark:text-stone-300 hover:bg-stone-500/5 dark:hover:bg-stone-100/5"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5" />
                        {t.label}
                      </span>
                      {isActive && <span className="text-[9px] uppercase font-sans tracking-wide">editing</span>}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="border-t border-stone-400/20 dark:border-stone-800/20 pt-4 text-[10px] text-stone-500 dark:text-stone-500 font-serif italic">
              * Preferences are saved locally on your database server.
            </div>
          </div>

          {/* RIGHT PAGE: ACTIVE TAB PREFERENCE PRESETS */}
          <div className={cn(
            "w-full md:w-1/2 bg-paper-light p-6 md:p-8 flex flex-col justify-between shadow-page-right relative min-h-[400px]",
            mobileTabState === "form" ? "flex" : "hidden md:flex"
          )}>
            <div className="flex-1 flex flex-col justify-between h-full space-y-6">
              
              <div className="flex-1 min-h-0 overflow-y-auto pr-1 scrollbar-thin space-y-4">
                {/* Mobile Back Button */}
                <div className="md:hidden mb-2 z-10 relative">
                  <button 
                    onClick={() => setMobileTabState("menu")}
                    className="flex items-center gap-1 text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900 transition-colors font-serif italic"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Preferences Menu
                  </button>
                </div>

                {/* Error/Success Feedbacks */}
                {error && <div className="text-xs p-2.5 bg-rose-105 text-rose-800 rounded border border-rose-200 dark:bg-rose-900/20 dark:text-rose-450 dark:border-rose-900/30">{error}</div>}
                {success && <div className="text-xs p-2.5 bg-emerald-100 text-emerald-800 rounded border border-emerald-250 dark:bg-emerald-950/20 dark:text-emerald-450 dark:border-emerald-900/30">{success}</div>}

                {/* PROFILE CONFIG */}
                {activeTab === "profile" && (
                  <form onSubmit={handleProfileSave} className="space-y-4">
                    <div className="space-y-1">
                      <Label className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-500 tracking-wider">Display Name</Label>
                      <Input 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                        className="bg-transparent border-t-0 border-x-0 border-b border-stone-400 dark:border-stone-700 rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-stone-850 dark:focus:border-stone-200 text-stone-850 dark:text-stone-100 font-sans"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <Label className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-500 tracking-wider">Timezone</Label>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="flex h-10 w-full bg-transparent border-t-0 border-x-0 border-b border-stone-400 dark:border-stone-700 rounded-none focus:outline-none focus:border-stone-850 dark:focus:border-stone-200 text-stone-850 dark:text-stone-100 font-sans text-sm"
                      >
                        <option value="UTC">UTC (Coordinated Universal Time)</option>
                        <option value="America/New_York">America/New_York (EST/EDT)</option>
                        <option value="America/Chicago">America/Chicago (CST/CDT)</option>
                        <option value="America/Denver">America/Denver (MST/MDT)</option>
                        <option value="America/Los_Angeles">America/Los_Angeles (PST/PDT)</option>
                        <option value="Europe/London">Europe/London (GMT/BST)</option>
                        <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                        <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-500 tracking-wider">Your Birthday</Label>
                      <Input 
                        type="date" 
                        value={ownBirthday} 
                        onChange={(e) => setOwnBirthday(e.target.value)} 
                        className="bg-transparent border-t-0 border-x-0 border-b border-stone-400 dark:border-stone-700 rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-stone-850 dark:focus:border-stone-200 text-stone-850 dark:text-stone-100 font-sans"
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button type="submit" disabled={loading} className="bg-amber-900 hover:bg-amber-950 dark:bg-amber-800 dark:hover:bg-amber-700 text-white rounded-full px-5 text-xs font-serif">
                        {loading ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 mr-1.5" />}
                        Save Account
                      </Button>
                    </div>
                  </form>
                )}

                {/* APPEARANCE/THEMES CONFIG */}
                {activeTab === "appearance" && (
                  <div className="space-y-5">
                    <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-500 tracking-wider block">
                      Aesthetic Color Palette
                    </span>

                    <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin">
                      {themesList.map((t) => {
                        const isSelected = theme === t.value
                        return (
                          <div
                            key={t.value}
                            onClick={() => handleThemeChange(t.value)}
                            className={cn(
                              "flex items-center gap-3 p-2.5 rounded-xl border transition-all cursor-pointer",
                              isSelected 
                                ? "border-amber-900 bg-amber-900/5 dark:border-amber-500 dark:bg-amber-500/5 shadow-sm scale-102" 
                                : "border-stone-400/35 dark:border-stone-750 hover:border-stone-550 bg-white/20 dark:bg-stone-900/10"
                            )}
                          >
                            <div className={`w-8 h-8 rounded-full border border-stone-500/20 shadow-inner ${t.color}`} />
                            <div className="min-w-0 flex-1">
                              <h4 className="font-bold text-xs text-stone-800 dark:text-stone-200 font-serif">{t.name}</h4>
                              <p className="text-[9px] text-stone-550 dark:text-stone-400 font-sans leading-none mt-0.5">{t.desc}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    
                    <div className="border-t border-stone-300/40 dark:border-stone-800/40 pt-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-xs text-stone-800 dark:text-stone-200 font-serif">Aura Backdrop Color</h4>
                        <p className="text-[9px] text-stone-500">Light / Dark basic mode framework</p>
                      </div>
                      <div className="flex gap-1.5">
                        <Button size="xs" variant="outline" onClick={() => handleThemeChange("light")} className="rounded-full border-stone-400 dark:border-stone-750 text-stone-850 dark:text-stone-200 h-7 text-[10px] bg-transparent">
                          <Sun className="w-3 h-3 mr-1" /> Light
                        </Button>
                        <Button size="xs" variant="outline" onClick={() => handleThemeChange("dark")} className="rounded-full border-stone-400 dark:border-stone-750 text-stone-850 dark:text-stone-200 h-7 text-[10px] bg-transparent">
                          <Moon className="w-3 h-3 mr-1" /> Dark
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* NOTIFICATIONS CONFIG */}
                {activeTab === "notifications" && (
                  <form onSubmit={handleProfileSave} className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-500 tracking-wider">Default Reminder Schedule</Label>
                      <p className="text-[10px] text-stone-600 dark:text-stone-400 font-serif italic mt-0.5 leading-relaxed">
                        Adjust how many days in advance your intelligence daemon scans and prepares wishes.
                      </p>
                      <select
                        value={reminderDays}
                        onChange={(e) => setReminderDays(e.target.value)}
                        className="flex h-10 w-full bg-transparent border-t-0 border-x-0 border-b border-stone-400 dark:border-stone-700 rounded-none focus:outline-none focus:border-stone-800 text-stone-850 dark:text-stone-100 font-sans text-sm"
                      >
                        <option value="0">Day of the birthday (at 8:00 AM)</option>
                        <option value="1">1 day before (at 8:00 AM)</option>
                        <option value="3">3 days before (at 8:00 AM)</option>
                        <option value="7">1 week before (at 8:00 AM)</option>
                      </select>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button type="submit" disabled={loading} className="bg-amber-900 hover:bg-amber-950 dark:bg-amber-800 dark:hover:bg-amber-700 text-white rounded-full px-5 text-xs font-serif">
                        {loading ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 mr-1.5" />}
                        Save Alerts
                      </Button>
                    </div>
                  </form>
                )}

                {/* DATA PORTABILITY & EXPORT */}
                {activeTab === "data" && (
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-stone-500 tracking-wider">
                      Ledger Backup & Export
                    </span>
                    
                    <div className="p-3 bg-stone-500/5 dark:bg-stone-100/5 border border-stone-400/20 dark:border-stone-800/25 rounded-xl space-y-2">
                      <h4 className="font-serif font-bold text-xs text-stone-800 dark:text-stone-150 flex items-center gap-1.5">
                        <FileSpreadsheet className="w-3.5 h-3.5 text-amber-900 dark:text-amber-500" />
                        CSV Spreadsheets
                      </h4>
                      <p className="text-[9px] text-stone-605 dark:text-stone-400 italic leading-relaxed">
                        Export all raw names, birth dates, notes, and relationship details to a clean Excel-compatible CSV file.
                      </p>
                      <Button onClick={handleExportCSV} size="xs" className="w-full bg-stone-800 hover:bg-stone-900 dark:bg-stone-200 dark:text-stone-900 dark:hover:bg-stone-100 text-white rounded-full text-[10px] h-7">
                        <Download className="w-3 h-3 mr-1" /> Export CSV Spreadsheet
                      </Button>
                    </div>

                    <div className="p-3 bg-stone-500/5 dark:bg-stone-100/5 border border-stone-400/20 dark:border-stone-800/25 rounded-xl space-y-2">
                      <h4 className="font-serif font-bold text-xs text-stone-800 dark:text-stone-150 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-900 dark:text-amber-500" />
                        Apple/Google iCalendar (.ics)
                      </h4>
                      <p className="text-[9px] text-stone-605 dark:text-stone-400 italic leading-relaxed">
                        Generate recurring calendar feeds of your birthdays to sync natively with Apple Calendar, Google Calendar, or Outlook.
                      </p>
                      <Button onClick={handleExportICS} size="xs" className="w-full bg-amber-900 hover:bg-amber-950 dark:bg-amber-800 dark:hover:bg-amber-700 text-white rounded-full text-[10px] h-7">
                        <Download className="w-3 h-3 mr-1" /> Export iCal Calendar
                      </Button>
                    </div>
                  </div>
                )}

              </div>

              {/* Notebook footer margins */}
              <div className="border-t border-stone-300/40 dark:border-stone-800/45 pt-4 text-[10px] text-stone-550 dark:text-stone-500 font-serif leading-none flex items-center gap-1 shrink-0">
                <Heart className="w-3 h-3 text-stone-500" />
                <span>Adjusted settings deploy immediately on compile-time.</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

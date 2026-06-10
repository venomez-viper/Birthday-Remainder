"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion } from "framer-motion"
import { 
  Sparkles, 
  Gift, 
  Bookmark, 
  Plus, 
  Trash2, 
  Check, 
  Copy, 
  Wand2, 
  Loader2,
  ChevronLeft,
  PenTool,
  Heart,
  Star,
  Gem,
  CalendarClock,
  Cake,
  Users,
  ScrollText,
  BookHeart,
  Clock
} from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getZodiac } from "@/lib/zodiac"
import { cn } from "@/lib/utils"

interface Birthday {
  id: string
  name: string
  date: string
  notes: string | null
  relationship: string | null
  interests: string | null
  imageUrl?: string | null
}

interface GiftIdea {
  id: string
  title: string
  status: "idea" | "purchased"
}

interface MessageHistory {
  id: string
  year: number
  message: string
  giftGiven: string | null
}

interface BirthdayBookPageProps {
  birthday: Birthday
  onBack: () => void
  onUpdate: () => void
  onDelete: (id: string) => void
}

export function BirthdayBookPage({ birthday, onBack, onUpdate, onDelete }: BirthdayBookPageProps) {
  const [activeTab, setActiveTab] = useState<"gifts" | "wishes" | "history">("gifts")
  const [mobileSubTab, setMobileSubTab] = useState<"profile" | "details">("profile")
  
  // Data State
  const [gifts, setGifts] = useState<GiftIdea[]>([])
  const [history, setHistory] = useState<MessageHistory[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [portalNodes, setPortalNodes] = useState<{ profile: HTMLElement; details: HTMLElement } | null>(null)
  
  // Edit Form Fields
  const [editName, setEditName] = useState(birthday.name)
  const [editDate, setEditDate] = useState(birthday.date ? new Date(birthday.date).toISOString().split('T')[0] : "")
  const [editRelationship, setEditRelationship] = useState(birthday.relationship || "friend")
  const [editInterests, setEditInterests] = useState(birthday.interests || "")
  const [editNotes, setEditNotes] = useState(birthday.notes || "")
  const [updating, setUpdating] = useState(false)
  const [editError, setEditError] = useState("")

  // Form inputs
  const [newGiftTitle, setNewGiftTitle] = useState("")
  const [newLogYear, setNewLogYear] = useState(new Date().getFullYear().toString())
  const [newLogMsg, setNewLogMsg] = useState("")
  const [newLogGift, setNewLogGift] = useState("")

  // AI State
  const [wishTone, setWishTone] = useState("heartfelt")
  const [generatedWish, setGeneratedWish] = useState("")
  const [generatingWish, setGeneratingWish] = useState(false)
  const [suggestingGifts, setSuggestingGifts] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetchGifts()
    fetchHistory()
    setGeneratedWish("")
    setIsEditing(false)
    setMobileSubTab("profile")
    // reset form fields
    setEditName(birthday.name)
    setEditDate(birthday.date ? new Date(birthday.date).toISOString().split('T')[0] : "")
    setEditRelationship(birthday.relationship || "friend")
    setEditInterests(birthday.interests || "")
    setEditNotes(birthday.notes || "")
  }, [birthday])

  // The portal mount points live in the detail spread, which mounts a moment
  // later with the flip animation. Poll until they exist so the card isn't blank.
  useEffect(() => {
    let raf = 0
    let cancelled = false
    const find = () => {
      if (cancelled) return
      const p = document.getElementById("profile-portal-mount")
      const d = document.getElementById("details-portal-mount")
      if (p && d) setPortalNodes({ profile: p, details: d })
      else raf = requestAnimationFrame(find)
    }
    find()
    return () => { cancelled = true; cancelAnimationFrame(raf) }
  }, [birthday])

  const zodiac = getZodiac(birthday.date)
  const age = Math.floor((Date.now() - new Date(birthday.date).getTime()) / 31557600000)

  // Days until the next occurrence of their birthday (month/day) from today.
  const computeDaysUntil = () => {
    const bd = new Date(birthday.date)
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    let next = new Date(today.getFullYear(), bd.getMonth(), bd.getDate())
    if (next.getTime() < today.getTime()) {
      next = new Date(today.getFullYear() + 1, bd.getMonth(), bd.getDate())
    }
    return Math.round((next.getTime() - today.getTime()) / 86400000)
  }
  const daysUntil = computeDaysUntil()

  // Interests split into clean tags.
  const interestTags = (birthday.interests || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)

  const relationshipLabel = (birthday.relationship || "friend")
    .replace(/^\w/, (c) => c.toUpperCase())

  // Compute initials
  const nameParts = birthday.name.trim().split(/\s+/)
  const initials = nameParts.length >= 2
    ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
    : birthday.name.slice(0, 2).toUpperCase()

  const birthDate = new Date(birthday.date)
  const monthName = format(birthDate, "MMMM")
  const dayNumber = format(birthDate, "d")
  const yearNumber = format(birthDate, "yyyy")

  // Fetch functions
  const fetchGifts = async () => {
    try {
      const res = await fetch(`/api/birthdays/${birthday.id}/gifts`)
      if (res.ok) {
        setGifts(await res.json())
      }
    } catch (err) {
      console.error(err)
    }
  }

  const fetchHistory = async () => {
    try {
      const res = await fetch(`/api/birthdays/${birthday.id}/history`)
      if (res.ok) {
        setHistory(await res.json())
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Gift operations
  const handleAddGift = async (titleStr: string) => {
    if (!titleStr.trim()) return
    try {
      const res = await fetch(`/api/birthdays/${birthday.id}/gifts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: titleStr }),
      })
      if (res.ok) {
        setNewGiftTitle("")
        fetchGifts()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleToggleGift = async (giftId: string, currentStatus: string) => {
    const nextStatus = currentStatus === "idea" ? "purchased" : "idea"
    try {
      const res = await fetch(`/api/birthdays/${birthday.id}/gifts`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ giftId, status: nextStatus }),
      })
      if (res.ok) {
        fetchGifts()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteGift = async (giftId: string) => {
    try {
      const res = await fetch(`/api/birthdays/${birthday.id}/gifts?giftId=${giftId}`, {
        method: "DELETE",
      })
      if (res.ok) {
        fetchGifts()
      }
    } catch (err) {
      console.error(err)
    }
  }

  // History operations
  const handleAddHistoryLog = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newLogMsg.trim()) return
    try {
      const res = await fetch(`/api/birthdays/${birthday.id}/history`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year: parseInt(newLogYear),
          message: newLogMsg,
          giftGiven: newLogGift || null,
        }),
      })
      if (res.ok) {
        setNewLogMsg("")
        setNewLogGift("")
        fetchHistory()
      }
    } catch (err) {
      console.error(err)
    }
  }

  // AI Actions
  const handleGenerateWish = async () => {
    setGeneratingWish(true)
    setGeneratedWish("")
    try {
      const res = await fetch("/api/ai/wish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: birthday.name,
          relationship: birthday.relationship,
          interests: birthday.interests || birthday.notes,
          tone: wishTone,
        }),
      })
      if (res.ok) {
        const data = await res.json()
        setGeneratedWish(data.wish)
      }
    } catch (err) {
      console.error(err)
      setGeneratedWish("Failed to generate wish. Please verify your GEMINI_API_KEY.")
    } finally {
      setGeneratingWish(false)
    }
  }

  const handleSuggestGifts = async () => {
    setSuggestingGifts(true)
    try {
      const res = await fetch("/api/ai/gifts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: birthday.name,
          age,
          relationship: birthday.relationship,
          interests: birthday.interests || birthday.notes,
        }),
      })
      if (res.ok) {
        const data = await res.json()
        for (const item of data.gifts) {
          await handleAddGift(`${item.title} (${item.desc})`)
        }
      }
    } catch (err) {
      console.error(err)
      alert("AI gift suggestions failed. Verify your GEMINI_API_KEY.")
    } finally {
      setSuggestingGifts(false)
    }
  }

  const handleCopyWish = () => {
    navigator.clipboard.writeText(generatedWish)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    setEditError("")
    try {
      const res = await fetch(`/api/birthdays/${birthday.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName,
          date: editDate,
          relationship: editRelationship,
          interests: editInterests,
          notes: editNotes,
        })
      })
      if (res.ok) {
        setIsEditing(false)
        onUpdate()
      } else {
        const data = await res.json()
        setEditError(data.error || "Failed to update")
      }
    } catch (err) {
      setEditError("Failed to update birthday details")
    } finally {
      setUpdating(false)
    }
  }

  if (!portalNodes) return null
  const profileNode = portalNodes.profile
  const detailsNode = portalNodes.details

  const profileContent = (
    <div className="absolute inset-0 p-8 md:p-14 flex flex-col overflow-hidden">

        {/* Floral corners */}
        <div className="floral-corner-tl" />
        <div className="floral-corner-bl" />

        <div className="relative z-10 flex flex-col flex-1">
          {/* Back link */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-base text-book-muted hover:text-book-text transition-colors font-serif italic group mb-6 self-start"
          >
            <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Index
          </button>

          {/* Section label */}
          <span className="text-xs md:text-sm uppercase tracking-[0.3em] font-serif text-book-muted mb-8 block">
            Birthday Detail
          </span>

          {isEditing ? (
            /* ── EDIT FORM ── */
            <form onSubmit={handleEditSubmit} className="flex flex-col flex-1 space-y-6">
              <h3 className="font-handwritten text-5xl text-book-text border-b border-book-border pb-4">
                Edit Journal Entry
              </h3>
              <p className="text-sm text-book-muted font-serif leading-relaxed italic">
                Amend the records of your dear friend. The stars and elements will recalibrate accordingly.
              </p>
              {editError && (
                <div className="text-sm p-4 bg-red-100 text-red-800 rounded border border-red-200">
                  {editError}
                </div>
              )}

              <div className="space-y-6 flex-1">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-book-muted tracking-wider">Name</label>
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                    placeholder="E.g. Jane Doe"
                    className="bg-transparent border-t-0 border-x-0 border-b border-book-border rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-book-gold text-book-text font-serif text-lg h-12"
                  />
                </div>

                {/* Date + Relationship */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-book-muted tracking-wider">Date of Birth</label>
                    <Input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      required
                      className="bg-transparent border-t-0 border-x-0 border-b border-book-border rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-book-gold text-book-text font-serif text-lg h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold text-book-muted tracking-wider">Relationship</label>
                    <select
                      value={editRelationship}
                      onChange={(e) => setEditRelationship(e.target.value)}
                      className="flex h-12 w-full bg-transparent border-t-0 border-x-0 border-b border-book-border rounded-none focus:outline-none focus:border-book-gold text-book-text font-serif text-lg"
                    >
                      <option value="family">Family</option>
                      <option value="friend">Friend</option>
                      <option value="colleague">Colleague</option>
                      <option value="partner">Partner</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Interests */}
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-book-muted tracking-wider flex items-center gap-2">
                    Interests <span className="text-[10px] text-book-muted font-normal italic">(comma-separated)</span>
                  </label>
                  <Input
                    value={editInterests}
                    onChange={(e) => setEditInterests(e.target.value)}
                    placeholder="E.g. coffee, thriller novels, painting"
                    className="bg-transparent border-t-0 border-x-0 border-b border-book-border rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-book-gold text-book-text font-serif text-lg h-12"
                  />
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-book-muted tracking-wider">Special Journal Notes</label>
                  <textarea
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Favorite flowers, food allergies, memories..."
                    rows={5}
                    className="flex min-h-[120px] w-full bg-transparent border-t-0 border-x-0 border-b border-book-border rounded-none focus:outline-none focus:border-book-gold text-book-text font-serif text-lg resize-none"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4 pt-6 border-t border-book-border mt-auto">
                <Button
                  type="submit"
                  disabled={updating}
                  size="lg"
                  className="bg-book-accent hover:bg-book-accent/90 text-white rounded-full px-8 text-base font-serif"
                >
                  {updating ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <PenTool className="w-5 h-5 mr-2" />}
                  Save Changes
                </Button>
                <Button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  size="lg"
                  variant="outline"
                  className="border-book-border text-book-muted hover:bg-book-cream rounded-full px-6 text-base font-serif"
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            /* ── PROFILE DISPLAY (Identity) ── */
            <div className="flex flex-col items-center flex-1 pt-2 overflow-y-auto scrollbar-thin">

              {/* Oval portrait medallion with initials */}
              <div className="relative w-full flex items-center justify-center mb-6 py-2 shrink-0">
                <div className="relative w-44 h-60 md:w-52 md:h-72">
                  {/* Outer gold ring */}
                  <div className="absolute inset-0 rounded-[50%] border border-book-gold/40" />
                  {/* Inner framed portrait area */}
                  <div className="absolute inset-2 rounded-[50%] border-2 border-book-line bg-book-card shadow-inner flex items-center justify-center overflow-hidden">
                    {birthday.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={birthday.imageUrl} alt={birthday.name} className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-book-card-warm opacity-50" />
                        <span className="font-handwritten text-[5rem] md:text-[6.5rem] text-book-accent/80 leading-none relative z-10">
                          {initials}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Name — the ONLY prominent name across the spread */}
              <h2 className="font-handwritten text-5xl md:text-6xl text-book-text text-center leading-tight mb-2 shrink-0">
                {birthday.name}
              </h2>

              {/* Relationship badge */}
              <div className="flex items-center justify-center gap-2 mb-5 shrink-0">
                <Users className="w-3.5 h-3.5 text-book-muted" />
                <span className="text-[11px] uppercase font-serif tracking-[0.25em] text-book-muted">
                  {relationshipLabel}
                </span>
              </div>

              {/* Birth date plaque */}
              <div className="relative z-20 mb-6 shrink-0">
                <div className="vintage-card px-8 py-3 shadow-lg border border-book-line text-center">
                  <span className="block text-lg md:text-xl font-serif text-book-text">
                    {monthName} {dayNumber}, {yearNumber}
                  </span>
                </div>
              </div>

              {/* Fact grid: Turning N + Countdown */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-6 shrink-0">
                <div className="flex flex-col items-center text-center border border-book-border/60 rounded-lg bg-book-card/40 py-4 px-2">
                  <Cake className="w-5 h-5 text-book-accent/70 mb-1.5" />
                  <span className="font-handwritten text-3xl text-book-text leading-none">{age + (daysUntil === 0 ? 0 : 1) }</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-serif text-book-muted mt-1">
                    {daysUntil === 0 ? `Turned ${age}` : "Turning"}
                  </span>
                </div>
                <div className="flex flex-col items-center text-center border border-book-border/60 rounded-lg bg-book-card/40 py-4 px-2">
                  <CalendarClock className="w-5 h-5 text-book-accent/70 mb-1.5" />
                  <span className="font-handwritten text-3xl text-book-text leading-none">
                    {daysUntil === 0 ? "Today" : daysUntil}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-serif text-book-muted mt-1">
                    {daysUntil === 0 ? "Celebrate!" : daysUntil === 1 ? "Day to go" : "Days to go"}
                  </span>
                </div>
              </div>

              {/* Zodiac strip */}
              <div className="w-full max-w-sm mb-6 shrink-0">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[11px] uppercase font-serif tracking-[0.2em] text-book-muted">Under the Stars</span>
                  <div className="h-px bg-book-border/40 flex-1" />
                </div>
                <div className="flex items-stretch gap-3">
                  <div className="flex items-center gap-3 flex-1 border border-book-border/60 rounded-lg bg-book-card/40 px-4 py-3">
                    <span className="text-3xl leading-none">{zodiac.emoji}</span>
                    <div className="flex flex-col">
                      <span className="font-serif text-lg text-book-text leading-tight">{zodiac.name}</span>
                      <span className="flex items-center gap-1 text-[11px] font-serif text-book-muted">
                        <Star className="w-3 h-3" /> {zodiac.element}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center border border-book-border/60 rounded-lg bg-book-card/40 px-4 py-3 text-center">
                    <Gem className="w-4 h-4 text-book-accent/70 mb-1" />
                    <span className="font-serif text-sm text-book-text leading-tight">{zodiac.stone}</span>
                    <span className="text-[9px] uppercase tracking-[0.15em] font-serif text-book-muted">Birthstone</span>
                  </div>
                </div>
              </div>

              {/* Interests as chips */}
              {interestTags.length > 0 && (
                <div className="w-full max-w-sm mb-6 shrink-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] uppercase font-serif tracking-[0.2em] text-book-muted">Fond Of</span>
                    <div className="h-px bg-book-border/40 flex-1" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {interestTags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full border border-book-line bg-book-cream text-book-text font-serif text-sm shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Journal note */}
              {birthday.notes && (
                <div className="w-full max-w-sm mb-2 shrink-0">
                  <div className="flex items-center gap-3 mb-3">
                    <ScrollText className="w-3.5 h-3.5 text-book-muted" />
                    <span className="text-[11px] uppercase font-serif tracking-[0.2em] text-book-muted">Journal Note</span>
                    <div className="h-px bg-book-border/40 flex-1" />
                  </div>
                  <div className="relative bg-book-card/40 border border-book-border/60 rounded-lg px-5 py-4">
                    <span className="absolute -top-2 left-4 font-handwritten text-4xl text-book-accent/40 leading-none">&ldquo;</span>
                    <p className="font-handwritten text-xl md:text-2xl text-book-text leading-relaxed italic whitespace-pre-line">
                      {birthday.notes}
                    </p>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Bottom actions (non-editing) */}
          {!isEditing && (
            <div className="flex justify-center gap-4 pt-8 border-t border-book-border mt-8">
              <Button
                onClick={() => setIsEditing(true)}
                size="lg"
                className="bg-book-text hover:bg-book-text/90 text-book-cream rounded-full px-8 text-base font-serif shadow-sm"
              >
                <PenTool className="w-5 h-5 mr-2" />
                Edit Record
              </Button>
              <Button
                onClick={() => onDelete(birthday.id)}
                size="lg"
                variant="outline"
                className="border-book-border text-red-700 hover:bg-red-50 rounded-full px-6 text-base font-serif"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Delete
              </Button>
            </div>
          )}
        </div>

      </div>

  )

  const detailsContent = (
    <div className="absolute inset-0 p-8 md:p-14 flex flex-col overflow-hidden">
        {/* Floral corners */}
        <div className="floral-corner-tr" />
        <div className="floral-corner-br" />

        {isEditing ? (
          /* ── EDIT FORM (RIGHT PAGE) ── */
          <div className="flex-1 flex flex-col relative z-10">
            <form onSubmit={handleEditSubmit} className="space-y-4 flex-1 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-book-muted tracking-wider">Name</label>
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                    placeholder="E.g. Jane Doe"
                    className="bg-transparent border-t-0 border-x-0 border-b border-book-border rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-book-gold text-book-text font-serif"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-book-muted tracking-wider">Date of Birth</label>
                    <Input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      required
                      className="bg-transparent border-t-0 border-x-0 border-b border-book-border rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-book-gold text-book-text font-serif"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-book-muted tracking-wider">Relationship</label>
                    <select
                      value={editRelationship}
                      onChange={(e) => setEditRelationship(e.target.value)}
                      className="flex h-10 w-full bg-transparent border-t-0 border-x-0 border-b border-book-border rounded-none focus:outline-none focus:border-book-gold text-book-text font-serif text-sm"
                    >
                      <option value="family">Family</option>
                      <option value="friend">Friend</option>
                      <option value="colleague">Colleague</option>
                      <option value="partner">Partner</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-book-muted tracking-wider flex items-center gap-1">
                    Interests <span className="text-[9px] text-book-muted font-normal italic">(comma-separated)</span>
                  </label>
                  <Input
                    value={editInterests}
                    onChange={(e) => setEditInterests(e.target.value)}
                    placeholder="E.g. coffee, thriller novels, painting"
                    className="bg-transparent border-t-0 border-x-0 border-b border-book-border rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-book-gold text-book-text font-serif"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-book-muted tracking-wider">Special Journal Notes</label>
                  <textarea
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Favorite flowers, food allergies, memories..."
                    rows={4}
                    className="flex min-h-[90px] w-full bg-transparent border-t-0 border-x-0 border-b border-book-border rounded-none focus:outline-none focus:border-book-gold text-book-text font-serif text-sm resize-none"
                  />
                </div>
              </div>

              <div className="text-[10px] italic text-book-muted font-serif border-t border-book-border pt-4 mt-4">
                * Journal records are safely encrypted in your personal bookshelf database.
              </div>
            </form>
          </div>
        ) : (
          /* ── CELEBRATE / ACTIVITY ── */
          <div className="flex-1 flex flex-col relative z-10 min-h-0">

            {/* Header — tiny subtitle only, no prominent name/date */}
            <div className="text-center pb-4 shrink-0 relative">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-serif text-book-muted">
                Celebration Planner
              </span>
              <p className="font-serif text-sm italic text-book-muted/80 mt-1">
                for {birthday.name.split(" ")[0]}
              </p>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-book-border/60">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-book-border/60 bg-book-paper" />
              </div>
            </div>

            {/* Tab strip */}
            <div className="flex items-center justify-center gap-1 mt-4 mb-5 shrink-0">
              {([
                { key: "gifts", label: "Gift Ideas", icon: Gift },
                { key: "wishes", label: "Birthday Wish", icon: Sparkles },
                { key: "history", label: "Scrapbook", icon: BookHeart },
              ] as const).map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-serif transition-colors border",
                    activeTab === key
                      ? "bg-book-text text-book-cream border-book-text shadow-sm"
                      : "border-book-border text-book-muted hover:bg-book-cream"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin pr-2 min-h-0">

              {/* ── GIFTS TAB ── */}
              {activeTab === "gifts" && (
                <div className="space-y-5">
                  <h3 className="font-serif text-lg text-book-text flex items-center gap-3">
                    <Gift className="w-4 h-4 text-book-accent/70" /> Gift Ideas
                    <div className="h-px bg-book-border/40 flex-1" />
                  </h3>

                  {/* Add a gift + AI suggest */}
                  <div className="flex gap-2">
                    <Input
                      value={newGiftTitle}
                      onChange={(e) => setNewGiftTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddGift(newGiftTitle)
                        }
                      }}
                      placeholder="Add a gift idea..."
                      className="bg-transparent border-t-0 border-x-0 border-b border-book-border rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-book-gold text-book-text font-serif"
                    />
                    <Button
                      type="button"
                      onClick={() => handleAddGift(newGiftTitle)}
                      className="bg-book-text hover:bg-book-text/90 text-book-cream rounded-full px-4 shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      onClick={handleSuggestGifts}
                      disabled={suggestingGifts}
                      variant="outline"
                      className="border-book-border text-book-text hover:bg-book-cream rounded-full px-4 shrink-0 font-serif"
                    >
                      {suggestingGifts ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                    </Button>
                  </div>

                  {/* Gift checklist */}
                  <ul className="space-y-2">
                    {gifts.length > 0 ? (
                      gifts.map((g) => (
                        <li
                          key={g.id}
                          className="group flex items-start gap-3 border-b border-book-border/30 pb-2"
                        >
                          <button
                            type="button"
                            onClick={() => handleToggleGift(g.id, g.status)}
                            className={cn(
                              "mt-1 w-5 h-5 shrink-0 rounded-full border flex items-center justify-center transition-colors",
                              g.status === "purchased"
                                ? "bg-book-accent/70 border-book-accent text-white"
                                : "border-book-border text-transparent hover:border-book-accent"
                            )}
                            aria-label="Toggle purchased"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <span
                            className={cn(
                              "font-handwritten text-xl md:text-2xl leading-tight flex-1",
                              g.status === "purchased"
                                ? "text-book-muted line-through"
                                : "text-book-text"
                            )}
                          >
                            {g.title}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteGift(g.id)}
                            className="mt-1 text-book-muted/40 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                            aria-label="Delete gift"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="font-handwritten text-xl text-book-muted italic py-2">
                        No gift ideas yet. Add one above, or let the muse suggest a few.
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* ── WISHES TAB ── */}
              {activeTab === "wishes" && (
                <div className="space-y-5">
                  <h3 className="font-serif text-lg text-book-text flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-book-accent/70" /> AI Birthday Wish
                    <div className="h-px bg-book-border/40 flex-1" />
                  </h3>

                  <div className="flex flex-wrap items-center gap-3">
                    <label className="text-[10px] uppercase font-bold text-book-muted tracking-wider">Tone</label>
                    <select
                      value={wishTone}
                      onChange={(e) => setWishTone(e.target.value)}
                      className="flex h-10 bg-transparent border-t-0 border-x-0 border-b border-book-border rounded-none focus:outline-none focus:border-book-gold text-book-text font-serif text-sm px-1"
                    >
                      <option value="heartfelt">Heartfelt</option>
                      <option value="funny">Funny</option>
                      <option value="poetic">Poetic</option>
                      <option value="formal">Formal</option>
                      <option value="playful">Playful</option>
                    </select>
                    <Button
                      type="button"
                      onClick={handleGenerateWish}
                      disabled={generatingWish}
                      className="bg-book-accent hover:bg-book-accent/90 text-white rounded-full px-5 font-serif"
                    >
                      {generatingWish ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
                      Generate
                    </Button>
                  </div>

                  {/* Wish display */}
                  <div className="relative bg-book-card/40 border border-book-border/60 rounded-lg px-5 py-5 min-h-[140px]">
                    <div className="font-handwritten text-xl md:text-2xl text-book-text leading-loose italic whitespace-pre-line pr-8">
                      {generatedWish || (
                        <>
                          May your day be filled with love,<br />
                          laughter, and all the beautiful<br />
                          things your heart desires.<br />
                          Happy Birthday, {birthday.name.split(" ")[0]}!{" "}
                          <Heart className="inline w-5 h-5 -mt-1 text-book-accent/70 fill-book-accent/20" />
                        </>
                      )}
                    </div>
                    {generatedWish && (
                      <button
                        type="button"
                        onClick={handleCopyWish}
                        className="absolute top-3 right-3 text-book-muted hover:text-book-text transition-colors"
                        aria-label="Copy wish"
                      >
                        {copied ? <Check className="w-4 h-4 text-book-accent" /> : <Copy className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* ── HISTORY / SCRAPBOOK TAB ── */}
              {activeTab === "history" && (
                <div className="space-y-5">
                  <h3 className="font-serif text-lg text-book-text flex items-center gap-3">
                    <BookHeart className="w-4 h-4 text-book-accent/70" /> Memory Scrapbook
                    <div className="h-px bg-book-border/40 flex-1" />
                  </h3>

                  {/* Existing entries */}
                  <div className="space-y-3">
                    {history.length > 0 ? (
                      history.map((h) => (
                        <div
                          key={h.id}
                          className="bg-book-cream border border-book-line rounded-sm px-4 py-3 shadow-[2px_3px_10px_rgba(0,0,0,0.08)]"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-3 h-3 text-book-muted" />
                            <span className="text-[11px] uppercase tracking-[0.2em] font-serif text-book-muted">{h.year}</span>
                          </div>
                          <p className="font-handwritten text-lg md:text-xl text-book-text leading-snug">{h.message}</p>
                          {h.giftGiven && (
                            <p className="flex items-center gap-1.5 text-xs font-serif italic text-book-muted mt-1">
                              <Gift className="w-3 h-3" /> Gave: {h.giftGiven}
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="font-handwritten text-xl text-book-muted italic">
                        No memories pressed here yet. Record your first below.
                      </p>
                    )}
                  </div>

                  {/* Add entry form */}
                  <form onSubmit={handleAddHistoryLog} className="space-y-3 border-t border-book-border/40 pt-4">
                    <div className="flex gap-3">
                      <Input
                        type="number"
                        value={newLogYear}
                        onChange={(e) => setNewLogYear(e.target.value)}
                        placeholder="Year"
                        className="w-24 bg-transparent border-t-0 border-x-0 border-b border-book-border rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-book-gold text-book-text font-serif"
                      />
                      <Input
                        value={newLogGift}
                        onChange={(e) => setNewLogGift(e.target.value)}
                        placeholder="Gift given (optional)"
                        className="flex-1 bg-transparent border-t-0 border-x-0 border-b border-book-border rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-book-gold text-book-text font-serif"
                      />
                    </div>
                    <textarea
                      value={newLogMsg}
                      onChange={(e) => setNewLogMsg(e.target.value)}
                      placeholder="A memory from this year's celebration..."
                      rows={2}
                      className="flex min-h-[60px] w-full bg-transparent border-t-0 border-x-0 border-b border-book-border rounded-none focus:outline-none focus:border-book-gold text-book-text font-serif text-base resize-none"
                    />
                    <Button
                      type="submit"
                      className="bg-book-text hover:bg-book-text/90 text-book-cream rounded-full px-5 font-serif"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Memory
                    </Button>
                  </form>
                </div>
              )}

            </div>

            {/* Bottom flourish */}
            <div className="shrink-0 flex justify-center pt-3 pb-1">
              <div className="floral-divider opacity-80" />
            </div>
          </div>
        )}
      </div>
  )

  return (
    <>
      {createPortal(profileContent, profileNode)}
      {createPortal(detailsContent, detailsNode)}
    </>
  )
}

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
  Heart
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
  const [mounted, setMounted] = useState(false)
  
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
    setMounted(true)
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

  const zodiac = getZodiac(birthday.date)
  const age = Math.floor((Date.now() - new Date(birthday.date).getTime()) / 31557600000)

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

  if (!mounted) return null
  
  const profileNode = document.getElementById("profile-portal-mount")
  const detailsNode = document.getElementById("details-portal-mount")

  if (!profileNode || !detailsNode) return null

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
            /* ── PROFILE DISPLAY ── */
            <div className="flex flex-col items-center flex-1 justify-center pt-4">
              
              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="h-px w-6 bg-book-border" />
                <span className="text-[11px] uppercase font-serif tracking-[0.2em] text-book-muted">Birthday Detail</span>
                <span className="h-px w-6 bg-book-border" />
              </div>

              {/* Oval portrait medallion with initials */}
              <div className="relative w-full flex items-center justify-center mb-8 py-4">
                <div className="relative w-60 h-80 md:w-72 md:h-96">
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
                        <span className="font-handwritten text-[7rem] md:text-[9rem] text-book-accent/80 leading-none relative z-10">
                          {initials}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Decorative date badge (matching the March 12 plaque) */}
              <div className="relative z-20 -mt-16">
                <div className="vintage-card px-10 py-4 shadow-lg border border-book-line">
                  <span className="text-xl md:text-2xl font-serif text-book-text">
                    {monthName} {dayNumber}
                  </span>
                </div>
              </div>

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
          /* ── STANDARD BOOK VIEWS ── */
          <div className="flex-1 flex flex-col relative z-10 space-y-6">
            
            {/* Top header - Person name */}
            <div className="text-center pb-4 relative">
              <h2 className="font-serif text-4xl md:text-5xl text-book-text tracking-wider">
                {birthday.name}
              </h2>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-book-border/60">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-book-border/60 bg-book-paper" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 flex-1 overflow-y-auto scrollbar-thin pr-2 mt-4">
              <div className="flex-1 space-y-8 pb-4">
                {/* Notes & Wishes */}
                <div className="space-y-4">
                  <h3 className="font-serif text-lg text-book-text flex items-center gap-3">
                     Notes &amp; Wishes
                     <div className="h-px bg-book-border/40 flex-1" />
                  </h3>
                  <div className="font-handwritten text-xl md:text-2xl text-book-text leading-loose italic whitespace-pre-line pr-4">
                    {birthday.notes || (
                      <span className="text-book-muted">
                        No notes recorded yet. They are a kind soul...
                      </span>
                    )}
                  </div>
                </div>

                {/* Gift Ideas */}
                <div className="space-y-4">
                  <h3 className="font-serif text-lg text-book-text flex items-center gap-3">
                     Gift Ideas
                     <div className="h-px bg-book-border/40 flex-1" />
                  </h3>
                  <ul className="space-y-2 pl-2">
                    {gifts.length > 0 ? (
                      gifts.map(g => (
                        <li key={g.id} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-book-accent/60 mt-2 self-start" />
                          <span className="font-handwritten text-xl md:text-2xl text-book-text leading-tight">{g.title}</span>
                        </li>
                      ))
                    ) : (
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-book-accent/40 mt-2 self-start" />
                        <span className="font-handwritten text-xl text-book-muted italic">Pressed flower journal</span>
                      </li>
                    )}
                  </ul>
                </div>

                {/* AI Birthday Wish */}
                <div className="space-y-4">
                  <h3 className="font-serif text-lg text-book-text flex items-center gap-3">
                     AI Birthday Wish
                     <div className="h-px bg-book-border/40 flex-1" />
                  </h3>
                  <div className="font-handwritten text-xl md:text-2xl text-book-text leading-loose italic whitespace-pre-line pr-4">
                    {generatedWish || (
                      <>
                        May your day be filled with love,<br/>
                        laughter, and all the beautiful<br/>
                        things your heart desires.<br/>
                        Happy Birthday, {birthday.name.split(" ")[0]}!{" "}
                        <Heart className="inline w-5 h-5 -mt-1 text-book-accent/70 fill-book-accent/20" />
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right column: Pinned Note */}
              <div className="w-full md:w-48 shrink-0 flex justify-center items-start pt-4">
                <div className="bg-book-cream border border-book-line rounded-sm p-4 w-40 rotate-3 shadow-[3px_5px_15px_rgba(0,0,0,0.12)] relative">
                   {/* Push pin */}
                   <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#d4c38d] to-[#8a7a49] shadow-[1px_2px_4px_rgba(0,0,0,0.4)] border border-[#6b5d30] z-10" />
                   
                   <p className="font-handwritten text-xl text-book-text leading-relaxed text-center mt-3 relative z-10">
                     Never stop<br/>
                     blooming,<br/>
                     {birthday.name.split(" ")[0]}
                   </p>
                   <Heart className="w-4 h-4 mx-auto mt-1 text-book-accent/60 fill-book-accent/20 relative z-10" />
                </div>
              </div>
            </div>

            {/* Bottom flourish */}
            <div className="shrink-0 flex justify-center pt-4 pb-2">
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

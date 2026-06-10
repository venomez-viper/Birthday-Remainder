"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  X, 
  Sparkles, 
  Gift, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Check, 
  Copy, 
  Calendar,
  Wand2,
  Bookmark,
  ChevronRight,
  TrendingUp,
  Award,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getZodiac } from "@/lib/zodiac"
import { format } from "date-fns"

interface Birthday {
  id: string
  name: string
  date: string
  notes: string | null
  relationship: string | null
  interests: string | null
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

interface BirthdayDetailDrawerProps {
  birthday: Birthday | null
  onClose: () => void
}

export function BirthdayDetailDrawer({ birthday, onClose }: BirthdayDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState<"gifts" | "wishes" | "history">("gifts")
  
  // Data State
  const [gifts, setGifts] = useState<GiftIdea[]>([])
  const [history, setHistory] = useState<MessageHistory[]>([])
  
  // Forms state
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
    if (birthday) {
      fetchGifts()
      fetchHistory()
      setGeneratedWish("")
    }
  }, [birthday])

  if (!birthday) return null

  const zodiac = getZodiac(birthday.date)
  const age = Math.floor((Date.now() - new Date(birthday.date).getTime()) / 31557600000)

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

  // Gift idea operations
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
      setGeneratedWish("Failed to generate. Please verify your GEMINI_API_KEY in the .env file.")
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
        // Save all 5 suggested gift ideas to the checklist
        for (const item of data.gifts) {
          await handleAddGift(`${item.title} (${item.desc})`)
        }
      }
    } catch (err) {
      console.error(err)
      alert("AI Gift suggestions failed. Please check GEMINI_API_KEY config.")
    } finally {
      setSuggestingGifts(false)
    }
  }

  const handleCopyWish = () => {
    navigator.clipboard.writeText(generatedWish)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-40"
      />

      {/* Drawer Body */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md h-full bg-card/95 backdrop-blur-xl border-l border-primary/10 shadow-2xl z-50 flex flex-col justify-between"
      >
        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-12">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-primary/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-2xl font-serif">
                {zodiac.emoji}
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-foreground flex items-center gap-1.5">
                  {birthday.name}
                </h3>
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold capitalize">
                  {birthday.relationship || "contact"}
                </span>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="text-muted-foreground hover:text-foreground p-1.5 hover:bg-primary/5 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-primary/5 p-3 rounded-2xl border border-primary/5">
              <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Date of Birth</span>
              <span className="text-xs font-bold block mt-1">{format(new Date(birthday.date), "MMMM d, yyyy")}</span>
            </div>
            <div className="bg-primary/5 p-3 rounded-2xl border border-primary/5">
              <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Astrology Spotlight</span>
              <span className="text-xs font-bold block mt-1">{zodiac.name} ({zodiac.emoji})</span>
            </div>
          </div>

          {/* Custom Tabs */}
          <div className="flex bg-muted rounded-full p-1 border border-primary/5">
            {(["gifts", "wishes", "history"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-center py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {tab === "gifts" ? "Gifts" : tab === "wishes" ? "AI Wishes" : "Scrapbook"}
              </button>
            ))}
          </div>

          {/* Tab 1 Content: Gifts Checklist */}
          {activeTab === "gifts" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-serif font-bold text-base flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-primary" /> Gift Checklist
                </h4>
                <Button 
                  size="xs" 
                  variant="outline" 
                  onClick={handleSuggestGifts}
                  disabled={suggestingGifts}
                  className="rounded-full text-[10px] font-bold uppercase tracking-wider py-1.5 h-auto hover:bg-primary/5"
                >
                  {suggestingGifts ? (
                    <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                  ) : (
                    <Wand2 className="w-3.5 h-3.5 mr-1 animate-pulse" />
                  )}
                  AI Suggest
                </Button>
              </div>

              {/* Add Custom Gift Box */}
              <div className="flex gap-2">
                <Input
                  value={newGiftTitle}
                  onChange={(e) => setNewGiftTitle(e.target.value)}
                  placeholder="Add custom gift idea..."
                  className="bg-background/50 border-primary/10 rounded-full text-xs h-9"
                  onKeyDown={(e) => e.key === "Enter" && handleAddGift(newGiftTitle)}
                />
                <Button onClick={() => handleAddGift(newGiftTitle)} size="icon" className="w-9 h-9 rounded-full shrink-0">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Checklist list */}
              <div className="space-y-2.5">
                {gifts.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic text-center py-4">No gift ideas recorded yet.</p>
                ) : (
                  gifts.map((g) => (
                    <div 
                      key={g.id} 
                      className="flex items-center justify-between p-2.5 bg-background/45 hover:bg-primary/5 rounded-xl border border-primary/5 group"
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <button
                          onClick={() => handleToggleGift(g.id, g.status)}
                          className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                            g.status === "purchased" 
                              ? "bg-primary border-primary text-primary-foreground" 
                              : "border-primary/20 hover:border-primary/50"
                          }`}
                        >
                          {g.status === "purchased" && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                        <span className={`text-xs truncate ${g.status === "purchased" ? "line-through text-muted-foreground" : "font-medium"}`}>
                          {g.title}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteGift(g.id)}
                        className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Tab 2 Content: AI Wish Generator */}
          {activeTab === "wishes" && (
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-base flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary" /> Personalized AI Greeting
              </h4>
              
              {/* Tone Grid Selectors */}
              <div className="grid grid-cols-2 gap-2">
                {["heartfelt", "funny", "professional", "poetic"].map((tone) => (
                  <button
                    key={tone}
                    type="button"
                    onClick={() => setWishTone(tone)}
                    className={`py-2 px-3 text-[11px] font-bold uppercase tracking-wider rounded-xl border transition-all ${
                      wishTone === tone 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-primary/10 hover:border-primary/30"
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>

              <Button
                onClick={handleGenerateWish}
                disabled={generatingWish}
                className="w-full rounded-full shadow-md mt-2"
              >
                {generatingWish ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Drafting Wish...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2 animate-pulse" /> Write Personalized Message
                  </>
                )}
              </Button>

              {/* Textarea generated container */}
              {generatedWish && (
                <div className="relative bg-primary/5 border border-primary/10 p-4 rounded-2xl space-y-3 mt-4">
                  <p className="text-xs leading-relaxed italic pr-8">&quot;{generatedWish}&quot;</p>
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleCopyWish} 
                      className="text-xs rounded-full hover:bg-primary/10"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-1 text-emerald-600" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-1" /> Copy message
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 3 Content: Scrapbook history logs */}
          {activeTab === "history" && (
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-base flex items-center gap-1.5">
                <Bookmark className="w-4 h-4 text-primary" /> Memory Timeline
              </h4>

              {/* Log message history form */}
              <form onSubmit={handleAddHistoryLog} className="space-y-3 p-4 bg-primary/5 border border-primary/10 rounded-2xl">
                <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Log Past Birthday</span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <Input
                      type="number"
                      placeholder="Year"
                      value={newLogYear}
                      onChange={(e) => setNewLogYear(e.target.value)}
                      required
                      className="bg-background/80 border-primary/10 text-xs h-9"
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      placeholder="Gift given (optional)"
                      value={newLogGift}
                      onChange={(e) => setNewLogGift(e.target.value)}
                      className="bg-background/80 border-primary/10 text-xs h-9"
                    />
                  </div>
                </div>
                <textarea
                  value={newLogMsg}
                  onChange={(e) => setNewLogMsg(e.target.value)}
                  placeholder="Write message sent or memories..."
                  required
                  rows={2}
                  className="flex min-h-[50px] w-full rounded-md border border-primary/10 bg-background/80 px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary resize-none"
                />
                <div className="flex justify-end">
                  <Button type="submit" size="sm" className="rounded-full text-xs">
                    <Plus className="w-3.5 h-3.5 mr-1" /> Log Memory
                  </Button>
                </div>
              </form>

              {/* List of past history logs */}
              <div className="space-y-3">
                {history.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic text-center py-4">No historical memories logged.</p>
                ) : (
                  history.map((h) => (
                    <div key={h.id} className="relative pl-6 border-l border-primary/20 space-y-1">
                      <div className="absolute left-0 top-1.5 -translate-x-[50%] w-2 h-2 rounded-full bg-primary" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-foreground">{h.year} Celebration</span>
                        {h.giftGiven && (
                          <Badge variant="outline" className="text-[9px] px-1.5 py-0">
                            🎁 Gifted: {h.giftGiven}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-xs text-muted-foreground leading-relaxed italic bg-card/60 p-2.5 rounded-xl border border-primary/5">
                        &quot;{h.message}&quot;
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

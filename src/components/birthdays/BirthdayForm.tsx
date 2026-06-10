"use client"

import { useState } from "react"
import { CalendarHeart, Loader2, Sparkles, Wand2, Keyboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "@/components/ui/ImageUpload"

interface BirthdayFormProps {
  onSuccess: () => void
}

const relationships = [
  { label: "Family", value: "family" },
  { label: "Friend", value: "friend" },
  { label: "Colleague", value: "colleague" },
  { label: "Partner", value: "partner" },
  { label: "Other", value: "other" },
]

export default function BirthdayForm({ onSuccess }: BirthdayFormProps) {
  // Input Modes
  const [mode, setMode] = useState<"form" | "ai">("form")
  const [aiText, setAiText] = useState("")
  const [parsing, setParsing] = useState(false)

  // Form Fields
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [notes, setNotes] = useState("")
  const [relationship, setRelationship] = useState("friend")
  const [interests, setInterests] = useState("")
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleMagicParse = async () => {
    if (!aiText.trim()) return
    setParsing(true)
    setError("")

    try {
      const res = await fetch("/api/ai/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: aiText }),
      })

      if (res.ok) {
        const data = await res.json()
        setName(data.name || "")
        setDate(data.date || "")
        setRelationship(data.relationship || "friend")
        setInterests(data.interests || "")
        setNotes(data.notes || "")
        setMode("form") // Switch to form so user can review
      } else {
        const data = await res.json()
        setError(data.error || "Failed to parse text. Please try standard entry.")
      }
    } catch (err) {
      setError("AI Parsing service unavailable. Please define GEMINI_API_KEY in your env.")
    } finally {
      setParsing(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/birthdays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, date, notes, relationship, interests, imageUrl }),
      })

      if (res.ok) {
        setName("")
        setDate("")
        setNotes("")
        setRelationship("friend")
        setInterests("")
        setImageUrl(null)
        setAiText("")
        onSuccess()
      } else {
        const data = await res.json()
        setError(data.error || "Failed to add birthday")
      }
    } catch (err) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="p-4 md:p-6 relative overflow-hidden bg-transparent text-book-text"
      onMouseDownCapture={(e) => e.stopPropagation()}
      onTouchStartCapture={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-6 border-b border-book-border/50 pb-4">
        <div className="flex items-center gap-2 text-book-accent">
          <CalendarHeart className="w-6 h-6" />
          <h3 className="font-handwritten text-2xl md:text-3xl text-book-text font-bold">Record Birthday</h3>
        </div>
        
        {/* Input Mode Toggle buttons */}
        <div className="flex bg-book-cream/50 rounded-full p-1 border border-book-border/50">
          <button
            type="button"
            onClick={() => setMode("form")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider transition-all duration-300 ${
              mode === "form" 
                ? "bg-book-text text-book-cream shadow-sm" 
                : "text-book-muted hover:text-book-text"
            }`}
          >
            <Keyboard className="w-3 h-3" /> Manual
          </button>
          <button
            type="button"
            onClick={() => setMode("ai")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider transition-all duration-300 ${
              mode === "ai" 
                ? "bg-book-text text-book-cream shadow-sm" 
                : "text-book-muted hover:text-book-text"
            }`}
          >
            <Wand2 className="w-3 h-3" /> AI Magic
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded border border-red-200 text-xs mb-4">
          {error}
        </div>
      )}

      {mode === "ai" ? (
        <div className="space-y-4">
          <div className="space-y-1">
            <Label className="text-[10px] uppercase font-bold text-book-muted tracking-wider">
              Describe the birthday in natural language
            </Label>
            <textarea
              value={aiText}
              onChange={(e) => setAiText(e.target.value)}
              placeholder="e.g. My mom's birthday is on Sept 14th, she turns 55 and loves gardening, coffee, and cooking."
              rows={5}
              className="flex min-h-[120px] w-full bg-transparent border-t-0 border-x-0 border-b border-book-border rounded-none focus:outline-none focus:border-book-gold text-book-text placeholder:text-book-muted/60 font-handwritten text-base resize-none"
            />
          </div>
          <Button
            type="button"
            disabled={parsing}
            onClick={handleMagicParse}
            className="w-full bg-book-text hover:bg-book-text/90 text-book-cream rounded-full shadow-sm text-xs font-serif h-9"
          >
            {parsing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Inking form details...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" /> Auto-Fill Journal Sheet
              </>
            )}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center pb-2">
            <ImageUpload
              value={imageUrl}
              onChange={setImageUrl}
              size={88}
              shape="circle"
              fallback={name ? name.charAt(0).toUpperCase() : undefined}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-[10px] uppercase font-bold text-book-muted tracking-wider">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jane Doe"
                required
                className="bg-transparent border-t-0 border-x-0 border-b border-book-border rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-book-gold text-book-text font-serif"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="date" className="text-[10px] uppercase font-bold text-book-muted tracking-wider">
                Date of Birth
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="bg-transparent border-t-0 border-x-0 border-b border-book-border rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-book-gold text-book-text font-serif"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="relationship" className="text-[10px] uppercase font-bold text-book-muted tracking-wider">
                Relationship
              </Label>
              <select
                id="relationship"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="flex h-10 w-full bg-transparent border-t-0 border-x-0 border-b border-book-border rounded-none focus:outline-none focus:border-book-gold text-book-text font-serif text-sm"
              >
                {relationships.map((r) => (
                  <option key={r.value} value={r.value} className="bg-book-paper">
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="interests" className="text-[10px] uppercase font-bold text-book-muted tracking-wider flex items-center gap-1">
                Interests <span className="text-[9px] text-book-muted font-normal italic">(comma-separated)</span>
              </Label>
              <Input
                id="interests"
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g. hiking, espresso, books"
                className="bg-transparent border-t-0 border-x-0 border-b border-book-border rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-book-gold text-book-text font-serif"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="notes" className="text-[10px] uppercase font-bold text-book-muted tracking-wider flex items-center gap-1">
              Special Journal Notes <span className="text-[9px] text-book-muted font-normal italic">(memories or gift details)</span>
            </Label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Always drinks espresso, reads thriller novels..."
              rows={3}
              className="flex min-h-[70px] w-full bg-transparent border-t-0 border-x-0 border-b border-book-border rounded-none focus:outline-none focus:border-book-gold text-book-text font-handwritten text-base resize-none"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-book-border">
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-book-accent hover:bg-book-accent/90 text-white rounded-full px-6 shadow-sm font-serif"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Inking Record...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" /> Save to Journal Ledger
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

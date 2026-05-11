"use client"

import { useState } from "react"
import { CalendarHeart, Loader2 } from "lucide-react"

interface BirthdayFormProps {
  onSuccess: () => void;
}

export default function BirthdayForm({ onSuccess }: BirthdayFormProps) {
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/birthdays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, date, notes }),
      })

      if (res.ok) {
        setName("")
        setDate("")
        setNotes("")
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
    <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-stone-200 shadow-sm mb-8 relative overflow-hidden">
      {/* Decorative corner element */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-rose-50 rounded-bl-full -z-10 border-l border-b border-rose-100/50"></div>
      
      <div className="flex items-center gap-2 mb-4 text-rose-500">
        <CalendarHeart className="w-5 h-5" />
        <h3 className="font-bold text-stone-800 text-lg">Record a New Birthday</h3>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-2 rounded text-sm mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jane Doe"
              className="input-diary"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-diary"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">Special Notes (for personalized messages)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Loves hiking, favorite color is blue, always drinks espresso..."
            className="input-diary resize-none"
            rows={2}
          />
        </div>

        <div className="flex justify-end pt-2">
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary flex items-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Save to Diary
          </button>
        </div>
      </form>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { format, differenceInDays, addYears, isBefore, startOfDay } from "date-fns"
import { Gift, Trash2, BellRing, Sparkles } from "lucide-react"

interface Birthday {
  id: string
  name: string
  date: string
  notes: string | null
}

interface BirthdayListProps {
  refreshTrigger: number
}

export default function BirthdayList({ refreshTrigger }: BirthdayListProps) {
  const [birthdays, setBirthdays] = useState<Birthday[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBirthdays()
  }, [refreshTrigger])

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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this from your diary?")) return

    try {
      const res = await fetch(`/api/birthdays/${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        fetchBirthdays()
      }
    } catch (error) {
      console.error("Failed to delete", error)
    }
  }

  const getNextBirthday = (dateString: string) => {
    const today = startOfDay(new Date())
    const birthDate = startOfDay(new Date(dateString))
    
    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())
    
    if (isBefore(nextBirthday, today)) {
      nextBirthday = addYears(nextBirthday, 1)
    }
    
    return nextBirthday
  }

  const sortedBirthdays = [...birthdays].sort((a, b) => {
    const dateA = getNextBirthday(a.date)
    const dateB = getNextBirthday(b.date)
    return dateA.getTime() - dateB.getTime()
  })

  if (loading) {
    return <div className="text-center py-10 text-stone-500 italic">Reading diary...</div>
  }

  if (birthdays.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed border-stone-200 rounded-xl bg-white/30">
        <Gift className="w-12 h-12 text-stone-300 mx-auto mb-3" />
        <p className="text-stone-500 italic">Your diary is empty. Add a birthday above to get started.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {sortedBirthdays.map((bday) => {
        const nextDate = getNextBirthday(bday.date)
        const daysUntil = differenceInDays(nextDate, startOfDay(new Date()))
        
        let urgencyColor = "border-l-stone-300"
        let urgencyBadge = "bg-stone-100 text-stone-600"
        
        if (daysUntil === 0) {
          urgencyColor = "border-l-rose-500"
          urgencyBadge = "bg-rose-500 text-white"
        } else if (daysUntil <= 7) {
          urgencyColor = "border-l-amber-400"
          urgencyBadge = "bg-amber-100 text-amber-700"
        }

        return (
          <div key={bday.id} className={`bg-white p-5 rounded-lg border border-stone-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between border-l-4 ${urgencyColor} hover:shadow-md transition-shadow relative overflow-hidden group`}>
            {/* Soft decorative background pattern on hover */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZWNkZDMiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h4 className="text-xl font-bold text-stone-800">{bday.name}</h4>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${urgencyBadge}`}>
                  {daysUntil === 0 ? "Today!" : `${daysUntil} days away`}
                </span>
              </div>
              <p className="text-stone-500 text-sm font-medium mb-3">
                {format(new Date(bday.date), "MMMM do, yyyy")}
              </p>
              
              {bday.notes && (
                <div className="bg-amber-50/50 p-3 rounded border border-amber-100 text-sm text-stone-600 italic">
                  &quot;{bday.notes}&quot;
                </div>
              )}
            </div>

            <div className="relative z-10 flex sm:flex-col gap-2 items-end justify-center sm:justify-start shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-stone-100 sm:pl-4 mt-2 sm:mt-0">
              <button className="text-stone-400 hover:text-amber-500 transition-colors p-2 rounded-full hover:bg-amber-50" title="Notification Settings (Coming Soon)">
                <BellRing className="w-5 h-5" />
              </button>
              <button className="text-stone-400 hover:text-rose-500 transition-colors p-2 rounded-full hover:bg-rose-50" title="Draft Message (Coming Soon)">
                <Sparkles className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleDelete(bday.id)}
                className="text-stone-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50" title="Delete"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

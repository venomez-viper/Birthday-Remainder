"use client"

import { signOut, useSession } from "next-auth/react"
import { BookHeart, LogOut } from "lucide-react"

export default function Header() {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <header className="flex justify-between items-center pb-6 mb-8 border-b border-stone-200">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-rose-100 rounded-full text-rose-500">
          <BookHeart className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-stone-800">
            {session.user?.name}&apos;s Diary
          </h2>
          <p className="text-xs text-stone-500 italic">Never forget a special day</p>
        </div>
      </div>
      
      <button 
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="flex items-center gap-2 text-stone-500 hover:text-rose-500 transition-colors text-sm font-medium"
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden sm:inline">Close Diary</span>
      </button>
    </header>
  )
}

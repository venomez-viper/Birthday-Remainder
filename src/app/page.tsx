"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Header from "@/components/layout/Header"
import BirthdayForm from "@/components/birthdays/BirthdayForm"
import BirthdayList from "@/components/birthdays/BirthdayList"
import { Loader2 } from "lucide-react"

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-rose-300" />
      </div>
    )
  }

  const handleSuccess = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <main className="max-w-3xl mx-auto">
      <Header />
      
      <div className="mb-12">
        <BirthdayForm onSuccess={handleSuccess} />
      </div>

      <div>
        <h3 className="text-2xl font-bold text-stone-800 border-b-2 border-rose-200 pb-2 mb-6 inline-block">Upcoming Birthdays</h3>
        <BirthdayList refreshTrigger={refreshTrigger} />
      </div>
    </main>
  )
}

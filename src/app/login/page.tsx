"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Flower2 } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        setError("Invalid credentials")
        return
      }

      router.replace("/")
      router.refresh()
    } catch (error) {
      setError("Something went wrong")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center mb-10">
        <Flower2 className="w-12 h-12 text-rose-400 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-stone-800 mb-2">Birthday Diary</h1>
        <p className="text-stone-500 italic">Open your book of memories</p>
      </div>

      <div className="w-full max-w-md p-8 bg-white/40 backdrop-blur-sm rounded-xl border border-stone-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded text-sm text-center">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-diary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-diary"
              required
            />
          </div>

          <button type="submit" className="w-full btn-primary mt-8">
            Unlock Diary
          </button>
        </form>

        <p className="mt-6 text-center text-stone-600 text-sm">
          Don&apos;t have a diary yet?{" "}
          <Link href="/register" className="text-rose-500 hover:text-rose-600 font-medium underline underline-offset-4">
            Start one today
          </Link>
        </p>
      </div>
    </div>
  )
}

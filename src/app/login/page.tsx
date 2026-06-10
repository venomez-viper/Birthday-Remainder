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
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-center mb-8">
        <Flower2 className="w-12 h-12 text-book-accent mx-auto mb-3" />
        <h1 className="font-handwritten text-5xl text-book-cream leading-none mb-1">Birthday Diary</h1>
        <p className="font-serif italic text-book-muted">Open your book of memories</p>
      </div>

      <div className="w-full max-w-md p-8 book-page-bg rounded-2xl border border-book-border shadow-book">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 border border-red-200 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-book-muted mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-diary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-book-muted mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-diary"
              required
            />
          </div>

          <button type="submit" className="w-full btn-primary mt-6">
            Unlock Diary
          </button>
        </form>

        <p className="mt-6 text-center text-book-muted text-sm font-serif">
          Don&apos;t have a diary yet?{" "}
          <Link href="/register" className="text-book-accent hover:text-book-accent/80 font-medium underline underline-offset-4">
            Start one today
          </Link>
        </p>
      </div>
    </div>
  )
}

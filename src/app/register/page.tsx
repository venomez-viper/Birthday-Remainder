"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Flower2 } from "lucide-react"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name || !email || !password) {
      setError("Please fill in all fields")
      return
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      if (res.ok) {
        router.push("/login")
      } else {
        const { error } = await res.json()
        setError(error || "Registration failed")
      }
    } catch (error) {
      setError("Something went wrong")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-center mb-8">
        <Flower2 className="w-12 h-12 text-book-accent mx-auto mb-3" />
        <h1 className="font-handwritten text-5xl text-book-cream leading-none mb-1">New Diary</h1>
        <p className="font-serif italic text-book-muted">Start recording special days</p>
      </div>

      <div className="w-full max-w-md p-8 book-page-bg rounded-2xl border border-book-border shadow-book">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 border border-red-200 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-book-muted mb-1.5">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-diary"
              required
            />
          </div>

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
            Create Diary
          </button>
        </form>

        <p className="mt-6 text-center text-book-muted text-sm font-serif">
          Already have a diary?{" "}
          <Link href="/login" className="text-book-accent hover:text-book-accent/80 font-medium underline underline-offset-4">
            Open it here
          </Link>
        </p>
      </div>
    </div>
  )
}

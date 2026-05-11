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
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center mb-10">
        <Flower2 className="w-12 h-12 text-rose-400 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-stone-800 mb-2">New Diary</h1>
        <p className="text-stone-500 italic">Start recording special days</p>
      </div>

      <div className="w-full max-w-md p-8 bg-white/40 backdrop-blur-sm rounded-xl border border-stone-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded text-sm text-center">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-diary"
              required
            />
          </div>

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
            Create Diary
          </button>
        </form>

        <p className="mt-6 text-center text-stone-600 text-sm">
          Already have a diary?{" "}
          <Link href="/login" className="text-rose-500 hover:text-rose-600 font-medium underline underline-offset-4">
            Open it here
          </Link>
        </p>
      </div>
    </div>
  )
}

import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { authOptions } from "@/lib/authOptions"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "Gemini API key is not configured in environment." }, { status: 500 })
  }

  try {
    const { name, relationship, interests, tone = "heartfelt" } = await req.json()

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `Write a short, highly personalized birthday wish for ${name}.
      Relationship to me: ${relationship || "friend"}
      Their interests: ${interests || "not specified"}
      Tone: ${tone}
      Guidelines: Keep it to 2-3 warm, engaging sentences. Write it as if it's directly from me. Do not include subject lines or greetings like 'Dear' or placeholders.`

    const result = await model.generateContent(prompt)
    const text = result.response.text().trim()

    return NextResponse.json({ wish: text })
  } catch (error) {
    console.error("Gemini API wish generation failed", error)
    return NextResponse.json({ error: "Failed to generate birthday wish." }, { status: 500 })
  }
}

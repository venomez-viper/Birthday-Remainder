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
    const { text } = await req.json()

    if (!text) {
      return NextResponse.json({ error: "Text prompt is required" }, { status: 400 })
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    })

    const currentYear = new Date().getFullYear()
    const prompt = `Parse the following natural language request into structured birthday details:
      "${text}"
      
      Current Reference Year: ${currentYear}
      
      Respond STRICTLY with a JSON object containing these exact fields:
      - "name" (string, the person's name)
      - "date" (string, date in format "YYYY-MM-DD". If birth year is not mentioned, use the current year or default to a logical dummy year like 1990)
      - "relationship" (string, must be one of: "friend", "family", "colleague", "partner", "other")
      - "interests" (string, comma-separated keywords of hobbies/interests)
      - "notes" (string, any additional details, preferences, or trivia)
      
      Do not include any Markdown wrapping or text outside of the JSON object.`

    const result = await model.generateContent(prompt)
    const resText = result.response.text().trim()
    
    const parsedData = JSON.parse(resText)

    return NextResponse.json(parsedData)
  } catch (error) {
    console.error("Gemini API natural language parsing failed", error)
    return NextResponse.json({ error: "Failed to parse text prompt." }, { status: 500 })
  }
}

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
    const { name, age, interests, relationship } = await req.json()

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    })

    const prompt = `Recommend 5 specific and unique gift ideas for ${name}.
      Age: ${age || "unknown"}
      Relationship to me: ${relationship || "friend"}
      Their interests: ${interests || "not specified"}
      
      Respond STRICTLY with a JSON array containing 5 gift objects. Each object MUST have precisely two fields:
      - "title" (string, name of the specific item/experience)
      - "desc" (string, 1-2 sentences explaining why this fits their profile)
      
      Do not include any Markdown wrapping, brackets outside the root array, or explanatory intro text.`

    const result = await model.generateContent(prompt)
    const text = result.response.text().trim()
    
    // Parse to ensure validity before returning
    const parsedGifts = JSON.parse(text)

    return NextResponse.json({ gifts: parsedGifts })
  } catch (error) {
    console.error("Gemini API gift generation failed", error)
    return NextResponse.json({ error: "Failed to generate gift recommendations." }, { status: 500 })
  }
}

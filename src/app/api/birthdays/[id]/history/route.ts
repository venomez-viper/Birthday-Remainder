import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/authOptions"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const history = await prisma.messageHistory.findMany({
      where: { birthdayId: params.id },
      orderBy: { year: "desc" },
    })
    return NextResponse.json(history)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch message history" }, { status: 500 })
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { year, message, giftGiven } = await req.json()

    if (!year || !message) {
      return NextResponse.json({ error: "Year and message are required" }, { status: 400 })
    }

    const log = await prisma.messageHistory.create({
      data: {
        year: parseInt(year),
        message,
        giftGiven,
        birthdayId: params.id,
      },
    })

    return NextResponse.json(log, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to log message history" }, { status: 500 })
  }
}

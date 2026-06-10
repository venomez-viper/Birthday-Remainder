import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/authOptions"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const birthdays = await prisma.birthday.findMany({
    where: { userId: user.id },
    orderBy: { date: 'asc' }
  })

  return NextResponse.json(birthdays)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  try {
    const { name, date, notes, relationship, interests } = await req.json()

    if (!name || !date) {
      return NextResponse.json({ error: "Name and date are required" }, { status: 400 })
    }

    const newBirthday = await prisma.birthday.create({
      data: {
        name,
        date: new Date(date),
        notes,
        relationship,
        interests,
        userId: user.id
      }
    })

    return NextResponse.json(newBirthday, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create birthday" }, { status: 500 })
  }
}

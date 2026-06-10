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
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      email: true,
      themePreference: true,
      reminderDays: true,
      timezone: true,
      ownBirthday: true,
      avatarUrl: true,
    }
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { name, themePreference, reminderDays, timezone, ownBirthday, avatarUrl } = await req.json()

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        themePreference,
        reminderDays: reminderDays ? parseInt(reminderDays) : undefined,
        timezone,
        ownBirthday: ownBirthday ? new Date(ownBirthday) : null,
        avatarUrl,
      },
      select: {
        id: true,
        name: true,
        email: true,
        themePreference: true,
        reminderDays: true,
        timezone: true,
        ownBirthday: true,
        avatarUrl: true,
      }
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Failed to update profile", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}

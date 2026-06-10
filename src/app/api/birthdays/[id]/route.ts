import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/authOptions"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
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
    const birthday = await prisma.birthday.findUnique({
      where: { id: params.id }
    })

    if (!birthday) {
      return NextResponse.json({ error: "Birthday not found" }, { status: 404 })
    }

    if (birthday.userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await prisma.birthday.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: "Deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete birthday" }, { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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
    const birthday = await prisma.birthday.findUnique({
      where: { id: params.id }
    })

    if (!birthday) {
      return NextResponse.json({ error: "Birthday not found" }, { status: 404 })
    }

    if (birthday.userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, date, notes, relationship, interests, imageUrl } = await req.json()

    const updatedBirthday = await prisma.birthday.update({
      where: { id: params.id },
      data: {
        name,
        date: date ? new Date(date) : undefined,
        notes,
        relationship,
        interests,
        imageUrl,
      }
    })

    return NextResponse.json(updatedBirthday)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update birthday" }, { status: 500 })
  }
}

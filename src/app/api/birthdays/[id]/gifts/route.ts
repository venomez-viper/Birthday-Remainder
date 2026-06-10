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
    const gifts = await prisma.giftIdea.findMany({
      where: { birthdayId: params.id },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(gifts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch gift ideas" }, { status: 500 })
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
    const { title, url, price } = await req.json()

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    const gift = await prisma.giftIdea.create({
      data: {
        title,
        url,
        price: price ? parseFloat(price) : null,
        birthdayId: params.id,
      },
    })

    return NextResponse.json(gift, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add gift idea" }, { status: 500 })
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

  try {
    const { giftId, status } = await req.json()

    if (!giftId || !status) {
      return NextResponse.json({ error: "Gift ID and status are required" }, { status: 400 })
    }

    const updatedGift = await prisma.giftIdea.update({
      where: { id: giftId },
      data: { status },
    })

    return NextResponse.json(updatedGift)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update gift status" }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const giftId = searchParams.get("giftId")

    if (!giftId) {
      return NextResponse.json({ error: "Gift ID is required" }, { status: 400 })
    }

    await prisma.giftIdea.delete({
      where: { id: giftId },
    })

    return NextResponse.json({ message: "Gift idea deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete gift idea" }, { status: 500 })
  }
}

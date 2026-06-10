import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { authOptions } from "@/lib/authOptions"

function formatDateToICS(dateString: string | Date) {
  const date = new Date(dateString)
  const yyyy = date.getUTCFullYear()
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0")
  const dd = String(date.getUTCDate()).padStart(2, "0")
  return `${yyyy}${mm}${dd}`
}

function formatDTStamp() {
  const date = new Date()
  const yyyy = date.getUTCFullYear()
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0")
  const dd = String(date.getUTCDate()).padStart(2, "0")
  const hh = String(date.getUTCHours()).padStart(2, "0")
  const min = String(date.getUTCMinutes()).padStart(2, "0")
  const ss = String(date.getUTCSeconds()).padStart(2, "0")
  return `${yyyy}${mm}${dd}T${hh}${min}${ss}Z`
}

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    return new Response("User not found", { status: 404 })
  }

  try {
    const birthdays = await prisma.birthday.findMany({
      where: { userId: user.id }
    })

    const dtstamp = formatDTStamp()
    
    let icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Birthday Diary//Ledger 1.0//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH"
    ]

    for (const b of birthdays) {
      const bdayFormatted = formatDateToICS(b.date)
      const sanitizedName = b.name.replace(/[,;]/g, "\\$&")
      const description = [
        b.relationship ? `Relationship: ${b.relationship}` : "",
        b.interests ? `Interests: ${b.interests}` : "",
        b.notes ? `Notes: ${b.notes}` : ""
      ].filter(Boolean).join("\\n").replace(/[,;]/g, "\\$&")

      icsContent.push(
        "BEGIN:VEVENT",
        `UID:${b.id}@birthdaydiary.com`,
        `DTSTAMP:${dtstamp}`,
        `SUMMARY:${sanitizedName}'s Birthday 🎂`,
        `DTSTART;VALUE=DATE:${bdayFormatted}`,
        "RRULE:FREQ=YEARLY",
        `DESCRIPTION:${description}`,
        "CLASS:PUBLIC",
        "END:VEVENT"
      )
    }

    icsContent.push("END:VCALENDAR")

    const body = icsContent.join("\r\n")

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="birthday_diary_export.ics"`,
        "Cache-Control": "no-store, no-cache, must-revalidate"
      }
    })
  } catch (error) {
    console.error("Failed to generate ICS file", error)
    return new Response("Failed to generate ICS", { status: 500 })
  }
}

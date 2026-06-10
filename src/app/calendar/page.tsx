import { redirect } from "next/navigation"

// The calendar now lives inside the diary book on /dashboard.
export default function CalendarRedirect() {
  redirect("/dashboard")
}

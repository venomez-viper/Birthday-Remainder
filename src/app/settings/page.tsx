import { redirect } from "next/navigation"

// Settings now lives inside the diary book on /dashboard.
export default function SettingsRedirect() {
  redirect("/dashboard")
}

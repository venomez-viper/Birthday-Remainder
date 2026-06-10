import { redirect } from "next/navigation"

// The constellation now lives inside the diary book on /dashboard.
export default function ConstellationRedirect() {
  redirect("/dashboard")
}

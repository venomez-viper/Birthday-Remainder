import { redirect } from "next/navigation"

// People now lives inside the diary book on /dashboard.
export default function PeopleRedirect() {
  redirect("/dashboard")
}

import { redirect } from "next/navigation"
import { isAdmin } from "@/features/me/services/me-service"

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/app")

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-primary">Administration</h1>
      <p className="mt-2 text-muted-foreground">Cette page sera bientôt disponible.</p>
    </div>
  )
}

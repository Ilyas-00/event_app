import { Event } from "@/features/events/types"
import { serverFetch } from "@/lib/api-client"

export async function getEvents(search?: string, date?: string, themeId?: string): Promise<Event[]> {
  const params = new URLSearchParams()
  if (search) params.set("search", search)
  if (date) params.set("date", date)
  if (themeId) params.set("themeId", themeId)
  const qs = params.toString()

  const res = await serverFetch(`/api/events${qs ? `?${qs}` : ""}`, { cache: "no-store" })

  if (!res.ok) return []

  return res.json()
}

export async function getRegistration(eventId: string): Promise<Number> {
  const res = await serverFetch(`/api/events/${eventId}/registrations/count`, { cache: "no-store" })

  if (!res.ok) return 0

  return Number(res)
}

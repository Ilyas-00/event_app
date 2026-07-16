import { auth } from "@/auth"
import { Event } from "@/features/events/types"

export async function getEvents(search?: string, date?: string, themeId?: string): Promise<Event[]> {
  const session = await auth()

  const url = new URL(`${process.env.BACKEND_URL}/api/events`)
  if (search) url.searchParams.set("search", search)
  if (date) url.searchParams.set("date", date)
  if (themeId) url.searchParams.set("themeId", themeId)

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${session?.accessToken}` },
    cache: "no-store",
  })

  if (!res.ok) return []

  return res.json()
}

export async function getRegistration(eventId: string): Promise<Number> {
  const session = await auth()

  const url = new URL(`${process.env.BACKEND_URL}/api/events/${eventId}/registrations/count`)

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${session?.accessToken}` },
    cache: "no-store",
  })

  if (!res.ok) return 0

  return Number(res)
}

// http://localhost:8081/api/events/c49d323d-51e2-4186-a418-f325e8293afd/registrations/count

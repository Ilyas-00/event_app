"use server"

import { revalidatePath } from "next/cache"
import { CreateEventInput } from "@/features/events/types"
import { serverFetch } from "@/lib/api-client"

export async function createEvent(input: CreateEventInput): Promise<void> {
  const res = await serverFetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })

  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  revalidatePath("/app")
}

export async function registerToEvent(eventId: string): Promise<void> {
  const res = await serverFetch(`/api/events/${eventId}/registrations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventId)
  })

  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  revalidatePath("/app")
}

export async function unregisterFromEvent(eventId: string): Promise<void> {
  const res = await serverFetch(`/api/events/${eventId}/registrations`, { method: "DELETE" })

  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  revalidatePath("/app")
}
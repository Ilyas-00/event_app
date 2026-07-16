"use server"

import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { CreateEventInput } from "@/features/events/types"

export async function createEvent(input: CreateEventInput): Promise<void> {
  const session = await auth()

  const res = await fetch(`${process.env.BACKEND_URL}/api/events`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })

  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  revalidatePath("/app")
}

export async function registerToEvent(eventId: string): Promise<void> {
  const session = await auth()

  const res = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}/registrations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventId)
  })

  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  revalidatePath("/app")
}

export async function unregisterFromEvent(eventId: string): Promise<void> {
  const session = await auth()

  const res = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}/registrations`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${session?.accessToken}` },
  })

  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  revalidatePath("/app")
}
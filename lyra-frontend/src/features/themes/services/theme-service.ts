"use server"

import { auth } from "@/auth"
import { Theme } from "@/features/themes/types"

export async function getThemes(): Promise<Theme[]> {
  const session = await auth()

  const res = await fetch(`${process.env.BACKEND_URL}/api/themes`, {
    headers: { Authorization: `Bearer ${session?.accessToken}` },
    next: { revalidate: 3600 },
  })

  if (!res.ok) return []

  return res.json()
}

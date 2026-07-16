"use server"

import { Theme } from "@/features/themes/types"
import { serverFetch } from "@/lib/api-client"

export async function getThemes(): Promise<Theme[]> {
  const res = await serverFetch("/api/themes", { next: { revalidate: 3600 } })

  if (!res.ok) return []

  return res.json()
}

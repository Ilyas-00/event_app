"use server"

import { Me } from "@/features/me/types"
import { serverFetch } from "@/lib/api-client"

export async function getMe(): Promise<Me | null> {
  const res = await serverFetch("/api/me", { cache: "no-store" })
  if (!res.ok) return null
  return res.json()
}

export async function isAdmin(): Promise<boolean> {
  const me = await getMe()
  return me?.role === 'SUPER_ADMIN' || me?.role === 'SERVICE_ADMIN'
}

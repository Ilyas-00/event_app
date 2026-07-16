"use server"

import { auth } from "@/auth"
import { Me } from "@/lib/types/me"

export async function getMe(): Promise<Me | null> {
  const session = await auth()
  const res = await fetch(`${process.env.BACKEND_URL}/api/me`, {
    headers: { Authorization: `Bearer ${session?.accessToken}` },
    cache: "no-store",
  })
  if (!res.ok) return null
  return res.json()
}

export async function isAdmin(): Promise<boolean> {
  const me = await getMe()
  return me?.role === 'SUPER_ADMIN' || me?.role === 'SERVICE_ADMIN'
}

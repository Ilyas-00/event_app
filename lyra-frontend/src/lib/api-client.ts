import { auth } from "@/auth"

export async function serverFetch(path: string, init: RequestInit = {}) {
  const session = await auth()
  return fetch(`${process.env.BACKEND_URL}${path}`, {
    ...init,
    headers: { ...init.headers, Authorization: `Bearer ${session?.accessToken}` },
  })
}

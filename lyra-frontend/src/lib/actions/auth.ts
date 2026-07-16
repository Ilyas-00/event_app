"use server"

import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"

export async function logoutAction() {
    const session = await auth()
    await signOut({ redirect: false })
    const params = new URLSearchParams({
        post_logout_redirect_uri: `${process.env.NEXTAUTH_URL}/login`,
        client_id: process.env.KC_CLIENT_ID!,
        ...(session?.idToken ? { id_token_hint: session.idToken } : {}),
    })
    redirect(`${process.env.KC_URL}/realms/lyra/protocol/openid-connect/logout?${params}`)
}

import { NextResponse } from "next/server"
import { auth } from "@/auth"

export default auth((req) => {
  const { pathname } = req.nextUrl

  // Proxy /api/* → Spring Boot backend (sauf les routes next-auth)
  if (pathname.startsWith("/api/") && !pathname.startsWith("/api/auth/")) {
    const targetUrl = `${process.env.BACKEND_URL}${pathname}${req.nextUrl.search}`

    const headers = new Headers(req.headers)
    headers.delete("host")

    if (req.auth?.accessToken) {
      headers.set("Authorization", `Bearer ${req.auth.accessToken}`)
    }

    return fetch(targetUrl, {
      method: req.method,
      headers,
      body: req.body,
      // @ts-expect-error — requis pour le streaming du body (fetch duplex)
      duplex: "half",
    })
  }

  

  if (pathname === "/") {
    if (req.auth) return NextResponse.redirect(new URL("/app", req.url))
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (!req.auth && pathname.startsWith("/app")) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (req.auth && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/app", req.url))
  }

})

export const config = {
  matcher: ["/", "/login", "/app/:path*", "/api/:path*"],
}

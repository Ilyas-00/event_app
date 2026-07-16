import NextAuth from "next-auth"
import Keycloak from "next-auth/providers/keycloak"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Keycloak({
      clientId: process.env.KC_CLIENT_ID!,
      clientSecret: process.env.KC_SECRET!,
      issuer: `${process.env.KC_URL}/realms/lyra`,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token!
        token.refreshToken = account.refresh_token
        token.idToken = account.id_token
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.idToken = token.idToken as string | undefined
      return session
    },
  },
})

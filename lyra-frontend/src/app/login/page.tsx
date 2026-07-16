import Image from "next/image"
import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Image src="/logo.png" alt="Lyra" width={200} height={80} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Connexion</CardTitle>
            <CardDescription>
              Connectez-vous avec votre compte pour accéder à l&apos;application.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              action={async () => {
                "use server"
                await signIn("keycloak", { redirectTo: "/app" })
              }}
            >
              <Button type="submit" className="w-full" size="lg">
                Se connecter avec Keycloak
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

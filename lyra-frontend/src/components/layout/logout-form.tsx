"use client"

import { logoutAction } from "@/lib/actions/auth"
import { DropdownMenuItem } from "../ui/dropdown-menu"
import { LogOutIcon } from "lucide-react"

export default function LogoutForm() {
    return (
        <form action={logoutAction}>
            <DropdownMenuItem asChild>
                <button type="submit" className="w-full cursor-pointer">
                    <LogOutIcon /> Se déconnecter
                </button>
            </DropdownMenuItem>
        </form>
    )
}

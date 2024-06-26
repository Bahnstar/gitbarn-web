import { logout } from "@/server/handlers/auth"
import { getCurrentUser } from "@/server/handlers/users"
import Link from "next/link"

export default async function AuthButton() {
    const {
        data: { user },
    } = await getCurrentUser()

    return user ? (
        <div className="flex items-center gap-4">
            Hey, {user.email}!
            <form action={logout}>
                <button className="rounded-md bg-btn-background px-4 py-2 no-underline hover:bg-btn-background-hover">
                    Logout
                </button>
            </form>
        </div>
    ) : (
        <Link
            href="/login"
            className="flex rounded-md bg-btn-background px-3 py-2 no-underline hover:bg-btn-background-hover"
        >
            Login
        </Link>
    )
}

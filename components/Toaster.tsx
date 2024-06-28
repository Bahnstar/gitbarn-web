"use client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const Toaster = ({ message, redirect }: Readonly<{ message: string; redirect?: string }>) => {
    toast.error(message)

    if (redirect) {
        const router = useRouter()
        router.push(redirect)
    }

    return null
}

export default Toaster

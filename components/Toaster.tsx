"use client"
import { toast } from "sonner"

const Toaster = ({ message }: Readonly<{ message: string }>) => {
    toast.error(message)

    return null
}

export default Toaster

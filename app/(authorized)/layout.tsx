import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

import Sidebar from "@/components/Sidebar"

export default async function ProtectedLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect("/login")
    }

    return <Sidebar>{children}</Sidebar>
}

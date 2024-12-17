import Image from "next/image"
import { redirect } from "next/navigation"

import MobileSidebar from "./MobileSidebar"
import NavButtons from "./NavButtons"
import Link from "next/link"
import { logout } from "@/server/handlers/auth"
import { getUserWithProfile } from "@/server/handlers/users"
import { Profile } from "@/types/profile"
import { getUnreadNotificationCount } from "@/server/handlers/notifications"
import { toast } from "sonner"
import { getCartsCount } from "@/server/handlers/carts"

const Sidebar = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { data: user } = await getUserWithProfile()
  if (!user) {
    toast.error("You must be logged in to view this page")
    redirect("/login")
  }
  const [notificationCount, cartCount] = await Promise.all([
    getUnreadNotificationCount(user.id),
    getCartsCount(user.id),
  ])

  if (!user) {
    return redirect("/login")
  }

  return (
    <div className="flex flex-1 flex-col">
      <MobileSidebar avatar_url={user.avatar_url}>
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white">
          <SidebarContent user={user} />
        </div>
      </MobileSidebar>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}

        <SidebarContent user={user} />
      </div>

      <main className="flex flex-1 flex-col py-10 lg:pl-72">
        <div className="flex flex-1 flex-col px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
}

const SidebarContent = ({ user }: { user: Profile }) => (
  <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
    <div className="flex h-16 shrink-0 items-center">
      <Image
        className="h-8 w-auto"
        src="https://gitbarn.com/wp-content/uploads/2018/06/gitbarn-logo.png"
        alt="GitBarn"
        width={162}
        height={150}
      />
    </div>
    <nav className="flex flex-1 flex-col">
      <ul className="flex flex-1 flex-col gap-y-7">
        <NavButtons role={user.role} />

        <li className="-mx-6 mt-auto">
          <Link
            href="/profile"
            className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
          >
            <Image
              className="h-8 w-8 rounded-full bg-gray-50"
              src={
                `${process.env.NEXT_PUBLIC_SUPABASE_BUCKETS}${user.avatar_url}` ??
                "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg"
              }
              alt=""
              width={649}
              height={649}
            />
            <span className="sr-only">Your profile</span>
            {user.first_name} {user.last_name}
          </Link>
          <div className="mx-4 mb-3">
            <form action={logout}>
              <button className="w-full rounded-md bg-green-600 px-4 py-2 text-white no-underline duration-200 hover:bg-green-700">
                Logout
              </button>
            </form>
          </div>
        </li>
      </ul>
    </nav>
  </div>
)

export default Sidebar

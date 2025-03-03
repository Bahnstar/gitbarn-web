"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import navigation from "@/data/navigation"

type NavButton = {
  name: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ")
}

const NavButtons = (props: {
  role: string
  unreadNotificationCount: number
  cartCount: number
}) => {
  const { role, unreadNotificationCount, cartCount } = props
  const pathname: string = usePathname()

  const getIndicatorCountForItem = (itemName: string): number => {
    switch (itemName) {
      case "Notifications":
        return unreadNotificationCount > 0 ? unreadNotificationCount : 0
      case "Cart":
        return cartCount > 0 ? cartCount : 0
      default:
        return 0
    }
  }

  return (
    <li>
      <ul className="-mx-2 space-y-1">
        {navigation.map((item) => {
          const itemRole = item.role
          const itemCount = getIndicatorCountForItem(item.name)

          if (itemRole && !(role === itemRole || role === "admin")) return <></>

          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={classNames(
                  item.href === pathname
                    ? "bg-gray-50 text-green-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-green-600",
                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                )}
              >
                <div className="relative">
                  <item.icon
                    className={classNames(
                      item.href === pathname
                        ? "text-green-600"
                        : "text-gray-400 group-hover:text-green-600",
                      "h-6 w-6 shrink-0",
                    )}
                    aria-hidden="true"
                  />
                  {itemCount !== 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-400 text-xs text-white">
                      {itemCount <= 9 ? itemCount : ""}
                    </span>
                  )}
                </div>
                {item.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </li>
  )
}

export default NavButtons

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

const NavButtons = () => {
  const pathname: string = usePathname()

  return (
    <li>
      <ul className="-mx-2 space-y-1">
        {navigation.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={classNames(
                item.href === pathname
                  ? "bg-gray-50 text-green-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-green-600",
                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
              )}
            >
              <item.icon
                className={classNames(
                  item.href === pathname
                    ? "text-green-600"
                    : "text-gray-400 group-hover:text-green-600",
                  "h-6 w-6 shrink-0",
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  )
}

export default NavButtons

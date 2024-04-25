import Image from "next/image"
import { redirect } from "next/navigation"

import MobileSidebar from "./MobileSidebar"
import NavButtons from "./NavButtons"
import AuthButton from "./AuthButton"
import Link from "next/link"
import { getCurrentUser } from "@/server/handlers/users"

const Sidebar = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const {
        data: { user },
    } = await getCurrentUser()

    if (!user) {
        return redirect("/login")
    }

    return (
        <div className="flex flex-1 flex-col">
            <MobileSidebar>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
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
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <NavButtons />
                            </li>
                        </ul>
                    </nav>
                </div>
            </MobileSidebar>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
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
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <NavButtons />

                            <li className="-mx-6 mt-auto">
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                                >
                                    <Image
                                        className="h-8 w-8 rounded-full bg-gray-50"
                                        src={
                                            null ??
                                            "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg"
                                        }
                                        alt=""
                                        width={649}
                                        height={649}
                                    />
                                    <span className="sr-only">Your profile</span>
                                    {user.email}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <main className="py-10 lg:pl-72">
                <div className="px-4 sm:px-6 lg:px-8">{children}</div>
            </main>
        </div>
    )
}

export default Sidebar

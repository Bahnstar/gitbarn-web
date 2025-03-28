"use client"

import { sendMassEmail } from "@/server/handlers/massEmails"
import { getUserWithProfile } from "@/server/handlers/users"
import { Role } from "@/types/profile"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import Link from "next/link"

export default function MassEmailPage() {
  const router = useRouter()
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([])
  const [emailSubject, setEmailSubject] = useState("")
  const [emailBody, setEmailBody] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const { data: user, error } = await getUserWithProfile()
        if (error || user?.role !== Role.ADMIN) {
          router.push("/users")
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Error checking user role:", error)
        router.push("/users")
      }
    }

    checkUserRole()
  }, [router])

  const handleRoleToggle = (role: Role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    )
  }

  useEffect(() => {
    console.log(selectedRoles)
  }, [selectedRoles])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (selectedRoles.length === 0) {
      alert("Please select at least one role")
      return
    }
    if (!emailSubject.trim()) {
      alert("Please enter a subject")
      return
    }
    if (!emailBody.trim()) {
      alert("Please enter an email body")
      return
    }

    try {
      await sendMassEmail(emailSubject, emailBody, selectedRoles)
      toast.success("Emails sent successfully!")
      setEmailSubject("")
      setEmailBody("")
      setSelectedRoles([])
    } catch (error) {
      console.error("Error sending emails:", error)
      toast.error("Failed to send emails. Please try again.")
    }
  }

  if (isLoading) {
    return <div className="flex w-full flex-1 items-center justify-center">Loading...</div>
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-6 p-4 sm:gap-10">
      <h1 className="text-4xl leading-6 font-semibold text-gray-900">Mass Email</h1>
      <div className="max-w-4xl rounded-lg bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h3 className="text-md block font-medium text-gray-700">Select Recipient Roles:</h3>
          <div className="mt-4 flex w-full justify-start gap-6">
            {Object.values(Role).map((role) => (
              <label key={role} className="relative flex cursor-pointer items-start">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={role}
                    checked={selectedRoles.includes(role)}
                    onChange={() => handleRoleToggle(role)}
                    className="peer sr-only"
                  />
                  <div className="h-5 w-5 rounded-sm border border-gray-300 bg-white transition-all peer-checked:border-green-600 peer-checked:bg-green-600 peer-focus:ring-2 peer-focus:ring-green-600 peer-focus:ring-offset-2">
                    <svg
                      className="h-full w-full stroke-white stroke-2 opacity-0 peer-checked:opacity-100"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M4 8.5L6.5 11L12 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    {role === Role.USER ? "Customer" : role.charAt(0).toUpperCase() + role.slice(1)}
                  </span>
                </div>
              </label>
            ))}
          </div>
          <hr className="my-2" />
          <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={emailSubject}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailSubject(e.target.value)}
              placeholder="Enter email subject"
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-xs ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:ring-inset disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="emailBody" className="block text-sm font-medium text-gray-700">
              Email Body
            </label>
            <textarea
              id="emailBody"
              value={emailBody}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEmailBody(e.target.value)}
              placeholder="Enter email content"
              rows={8}
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-xs ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:ring-inset disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="col-span-2 mt-4">
            <button type="submit" className="mb-2 w-full btn-primary">
              Send Email
            </button>
            <Link className="w-full btn-secondary" href="/users">
              Return to user list
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

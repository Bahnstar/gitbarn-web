"use client"

import { massEmailSend } from "@/server/handlers/massEmails"
import { Role } from "@/types/profile"
import { useEffect, useState } from "react"

export default function MassEmailPage() {
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([])
  const [subject, setSubject] = useState("")
  const [emailBody, setEmailBody] = useState("")

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
    if (!subject.trim()) {
      alert("Please enter a subject")
      return
    }
    if (!emailBody.trim()) {
      alert("Please enter an email body")
      return
    }

    massEmailSend(subject, emailBody, selectedRoles)
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-6 p-4 sm:gap-10">
      <h1 className="text-4xl font-semibold leading-6 text-gray-900">Mass Email</h1>
      <div className=" min-w-4xl max-w-4xl rounded-lg bg-white p-6 shadow">
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
                  <div className="h-5 w-5 rounded border border-gray-300 bg-white transition-all peer-checked:border-green-600 peer-checked:bg-green-600 peer-focus:ring-2 peer-focus:ring-green-600 peer-focus:ring-offset-2">
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
              value={subject}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)}
              placeholder="Enter email subject"
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
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
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="col-span-2 mt-4">
            <button
              type="submit"
              className="w-full rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Send Email
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

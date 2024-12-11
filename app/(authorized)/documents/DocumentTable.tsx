"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { DownloadIcon } from "lucide-react"

import { DocumentFile } from "@/types/documentFile"
import { createClient } from "@/utils/supabase/client"
import DeleteDocumentButton from "./DeleteDocumentButton"
import { deleteDocument } from "@/server/handlers/documents"
import revalidateTag from "@/utils/clientRevalidate"
import { formatDate } from "@/utils/utils"

const DocumentTable = ({ documents }: { documents: DocumentFile[] }) => {
  const [session, setSession] = useState("")
  const [role, setRole] = useState("")

  const handleDownload = async (doc: DocumentFile) => {
    const sourceURL = `${process.env.NEXT_PUBLIC_SUPABASE_BUCKETS_AUTHENTICATED}${doc.path}`

    toast.info(`Starting download of ${doc.name}`)
    const res = await fetch(sourceURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session}`,
      },
    })

    if (!res.ok) return toast.error("There was an error downloading the file")

    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = doc.name
    document.body.appendChild(link)
    link.click()

    toast.success(`${doc.name} downloaded`)
  }

  const handleDelete = async (id: string) => {
    await deleteDocument(id)
    revalidateTag("/documents")
  }

  useEffect(() => {
    const supabase = createClient()

    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session?.access_token || "")
    }

    getSession()
  }, [])

  if (documents.length === 0) {
    return (
      <div className="w-full">
        <h1 className="text-2xl font-semibold text-gray-800">
          It appears you have not uploaded any documents yet.
        </h1>
      </div>
    )
  }

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Uploaded
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {documents.map((document) => (
                  <tr key={document.path}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {document.name}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {document.profiles?.email}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {document.created_at
                        ? formatDate(document?.created_at, "MM/d/YY [at] h:mm A")
                        : "Unknown"}
                    </td>
                    <td className="relative space-x-2 whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        onClick={() => handleDownload(document)}
                        className="inline-flex items-center gap-1.5 rounded-md bg-green-50 px-3 py-1.5 text-sm text-green-600 transition-colors hover:bg-green-100"
                      >
                        Download<span className="sr-only">, {document.path}</span>{" "}
                        <DownloadIcon className="h-4 w-4" />
                      </button>
                      <DeleteDocumentButton documentId={document.id} onClose={handleDelete} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocumentTable

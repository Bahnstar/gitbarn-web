"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { DownloadIcon } from "lucide-react"
import { LoaderCircle } from "lucide-react"

import { DocumentFile } from "@/types/documentFile"
import { createClient } from "@/utils/supabase/client"

import { deleteDocument, getDocumentsByUserId } from "@/server/handlers/documents"
import revalidateTag from "@/utils/clientRevalidate"
import { formatDate } from "@/utils/utils"

import DeleteDocumentButton from "./DeleteDocumentButton"
import PersonAutocomplete from "@/components/PersonAutocomplete"

const DocumentTable = ({
  initialDocuments,
  role,
}: {
  initialDocuments: DocumentFile[]
  role: string
}) => {
  const [session, setSession] = useState("")
  const [loadingInitial, setLoadingInitial] = useState(false)
  const [documents, setDocuments] = useState(initialDocuments)

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

  const setFilterUser = async (u: string) => {
    setLoadingInitial(true)
    const { data: documentData, error } = await getDocumentsByUserId(u)
    console.log(documentData)
    if (!documentData) setDocuments([])
    else setDocuments(documentData)
    setLoadingInitial(false)
  }

  useEffect(() => {
    const supabase = createClient()

    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session?.access_token || "")
    }

    getSession()
  }, [])

  return (
    <div className="mt-8 flow-root">
      {(role === "admin" || role === "support") && (
        <div className="mb-5 flex items-center gap-5">
          Viewing as{" "}
          <span className="w-80">
            <PersonAutocomplete setCustomerId={setFilterUser} autoInitialCustomer={true} />
          </span>
        </div>
      )}

      {loadingInitial ? (
        <LoaderCircle className="mx-auto mt-5 h-28 w-28 animate-spin text-green-600" />
      ) : documents.length !== 0 ? (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((document) => (
            <li
              key={document.id}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
            >
              <div className="flex w-full items-center justify-between p-6 pb-4">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-sm font-medium text-gray-900">
                      {document.name.split(".")[0]}
                    </h3>
                    <span className="inline-flex shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                      {document.name.split(".")[1].toUpperCase()}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm text-gray-500">
                    Uploaded{" "}
                    {document.created_at
                      ? formatDate(document?.created_at, "MM/d/YY [at] h:mm A")
                      : "Unknown"}
                    <br />
                    {document.profiles?.email}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex justify-center gap-3 py-4">
                  <div>
                    <button
                      onClick={() => handleDownload(document)}
                      className="inline-flex items-center gap-1.5 rounded-md bg-green-50 px-3 py-1.5 text-sm text-green-600 transition-colors hover:bg-green-100"
                    >
                      Download<span className="sr-only">, {document.path}</span>{" "}
                      <DownloadIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <DeleteDocumentButton documentId={document.id} onClose={handleDelete} />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-lg font-medium text-gray-600">
          No further documents found
        </div>
      )}
    </div>
  )
}

export default DocumentTable

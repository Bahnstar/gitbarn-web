"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import { DownloadIcon, FileIcon } from "lucide-react"
import { DocumentFile } from "@/types/documentFile"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"

export default function DocumentGrid({ documents }: { documents: DocumentFile[] }) {
  const [session, setSession] = useState("")

  if (documents.length === 0) {
    return <p className="text-center text-gray-500">No documents uploaded yet.</p>
  }

  const getFileType = async (url: string) => {
    const response = await fetch(url)
    const blob = await response.blob()
    const type = blob.type

    if (type.startsWith("image/")) {
      return "image"
    } else if (type.startsWith("application/pdf")) {
      return "pdf"
    } else {
      return "file"
    }
  }

  const generatePreview = async (fileId: string) => {
    const fileType = await getFileType(
      `${process.env.NEXT_PUBLIC_SUPABASE_BUCKETS_AUTHENTICATED}${fileId}`,
    )

    switch (fileType) {
      case "image":
        return (
          <Image
            src={`${process.env.NEXT_PUBLIC_SUPABASE_BUCKETS_AUTHENTICATED}${fileId}`}
            alt={fileId}
            layout="fill"
            objectFit="cover"
            className="h-full w-full object-cover"
          />
        )
      case "pdf":
        return (
          <iframe
            src={`http://docs.google.com/gview?url=${process.env.NEXT_PUBLIC_SUPABASE_BUCKETS}${fileId}&embedded=true`}
            className="h-full w-full"
          />
        )
      default:
        return <FileIcon className="h-16 w-16 text-gray-400" />
    }
  }

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

  useEffect(() => {
    const getSession = async () => {
      const supabase = await createClient()
      const { data } = await supabase.auth.getSession()
      setSession(data.session?.access_token || "")
    }
    getSession()
  }, [])

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="flex flex-col overflow-hidden rounded-lg bg-white shadow-xs transition-shadow hover:shadow-md"
        >
          <div className="relative flex h-32 w-full items-center justify-center rounded-t-md border-2 border-gray-200 bg-gray-100">
            <FileIcon className="h-16 w-16 text-gray-400" />
          </div>
          <div className="flex flex-1 flex-col justify-between p-4">
            <div>
              <h3 className="mb-1 line-clamp-1 text-sm font-medium">{doc.name}</h3>
              {/* <p className="text-xs text-gray-500">{(doc.size / 1024).toFixed(2)} KB</p> */}
            </div>
            <button
              onClick={() => handleDownload(doc)}
              className="mt-2 flex items-center justify-center rounded-md bg-blue-500 px-2 py-1 text-xs text-white transition-colors hover:bg-blue-600"
            >
              <DownloadIcon className="mr-1 h-3 w-3" />
              Download
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

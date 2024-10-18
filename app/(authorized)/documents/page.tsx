"use client"
import { useState } from "react"
import DocumentList from "./DocumentList"
import DocumentUpload from "./DocumentUpload"

interface Document {
  id: number
  name: string
  size: number
  type: string
  file: File
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])

  const handleUpload = (newDocument: Document) => {
    setDocuments([...documents, newDocument])
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-8 p-6">
      <h1 className="text-3xl font-semibold text-gray-900">Documents</h1>
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full md:w-1/4 lg:w-1/5">
          <DocumentUpload onUpload={handleUpload} />
        </div>
        <div className="w-full md:w-3/4 lg:w-4/5">
          <DocumentList documents={documents} />
        </div>
      </div>
    </div>
  )
}

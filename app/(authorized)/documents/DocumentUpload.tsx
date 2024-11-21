"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { UploadIcon, FileIcon, Loader2 } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import PersonAutocomplete from "@/components/PersonAutocomplete"

type FilePreview = {
  file: File
  preview: string
}

export default function DocumentUpload(props: { action: any }) {
  const [filePreview, setFilePreview] = useState<FilePreview | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((file: File) => {
    setFilePreview({
      file,
      preview: URL.createObjectURL(file),
    })
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (filePreview) {
      const formData = new FormData()
      formData.append("file", filePreview.file)
      formData.append("name", filePreview.file.name)
      setIsLoading(true)
      const res = await props.action(null, formData)
      setFilePreview(null)
      setIsLoading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      if (res.message.includes("mime type")) {
        return toast.error("The requested file is not supported")
      } else {
        return toast.error("There was an error uploading the file")
      }

      setIsModalOpen(false)
    }
  }

  useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview.preview)
      }
    }
  }, [filePreview])

  const isImageFile = (type: string) => type.startsWith("image/")

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-md bg-green-50 px-3 py-1.5 text-sm text-green-600 transition-colors hover:bg-green-100"
        disabled={isLoading}
      >
        Upload
        <UploadIcon className="h-4 w-4" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex w-screen items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-medium">Upload file</h3>
            <p className="mb-6 text-gray-600">Accepts only the following formats:</p>
            <form onSubmit={handleSubmit} className="mb-4">
              {!filePreview ? (
                <div
                  className={`mb-4 flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed ${
                    isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                  }`}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={handleUploadClick}
                >
                  <UploadIcon className="mb-2 h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
                  <input
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf"
                    ref={fileInputRef}
                  />
                </div>
              ) : (
                <div className="mb-4 overflow-hidden rounded-lg border border-gray-300">
                  <div className="relative h-32 w-full bg-gray-100">
                    {isImageFile(filePreview.file.type) ? (
                      <Image
                        src={filePreview.preview}
                        alt={filePreview.file.name}
                        layout="fill"
                        objectFit="cover"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <FileIcon className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <p className="truncate text-sm font-semibold">{filePreview.file.name}</p>
                    <p className="text-xs text-gray-600">
                      Size: {(filePreview.file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
              )}
              <input type="hidden" name="name" value={filePreview?.file.name} />
              <PersonAutocomplete />
              <button
                type="submit"
                // disabled={!filePreview}
                className="flex w-full justify-center rounded bg-blue-500 px-4 py-2 text-white disabled:bg-gray-300"
              >
                {isLoading ? (
                  <>
                    Uploading... <Loader2 className="h-5 w-5 animate-spin" />
                  </>
                ) : (
                  "Upload Document"
                )}
              </button>
            </form>
            <button
              onClick={() => {
                setIsModalOpen(false)
                setFilePreview(null)
              }}
              className="w-full rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

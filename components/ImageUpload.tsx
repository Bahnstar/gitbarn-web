"use client"

import Image from "next/image"
import { useState } from "react"

const ImageUpload = () => {
  const [image, setImage] = useState<File>()
  const [preview, setPreview] = useState<string>("")
  const [isOver, setIsOver] = useState<boolean>(false)

  const makeImage = (rawImg: File) => {
    setPreview(URL.createObjectURL(rawImg))
    setImage(rawImg)
  }

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList
    makeImage(files[0])
  }

  const handleOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsOver(true)
  }

  const handleLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsOver(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    const items = e.dataTransfer?.items
    for (let i = 0; i < items.length; i++) {
      const item = items[i]

      if (item.kind === "file") {
        const file = item.getAsFile() as File
        makeImage(file)
        return
      }
    }
  }

  return (
    <div className="flex h-full flex-col">
      <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
        Product Image
      </label>
      <div
        className={`mt-2 flex flex-1 justify-center rounded-lg border border-dashed border-gray-900/25 bg-cover bg-center px-6 py-10 ${isOver ? "bg-gray-50" : ""}`}
        style={{
          backgroundImage: preview ? `url(${preview})` : "",
        }}
        onDragOver={handleOver}
        onDragLeave={handleLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          {/* <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" /> */}
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="image"
              className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id="image"
                name="image"
                type="file"
                onChange={handleImage}
                accept="image/png, image/jpg, image/jpeg, image/gif"
                className="sr-only"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
    </div>
  )
}

export default ImageUpload

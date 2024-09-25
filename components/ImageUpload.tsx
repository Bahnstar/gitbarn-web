"use client"

import Image from "next/image"
import { useState } from "react"
import { Image as ImageIcon } from "lucide-react"

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

  // const handleOver = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault()
  //   setIsOver(true)
  // }

  // const handleLeave = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault()
  //   setIsOver(false)
  // }

  // const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault()

  //   const items = e.dataTransfer?.items
  //   for (let i = 0; i < items.length; i++) {
  //     const item = items[i]

  //     if (item.kind === "file") {
  //       const file = item.getAsFile() as File
  //       makeImage(file)
  //       return
  //     }
  //   }
  // }

  return (
    <div className="flex h-full flex-col">
      <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
        Product Image
      </label>
      <div
        className={`mt-2 flex min-h-[175px] flex-1 items-center justify-center rounded-lg border border-dashed border-gray-900/25 bg-cover bg-center px-6 py-6 ${isOver ? "bg-gray-50" : ""}`}
        style={{
          backgroundImage: preview ? `url(${preview})` : "",
        }}
        // onDragOver={handleOver}
        // onDragLeave={handleLeave}
        // onDrop={handleDrop}
      >
        {!preview && <ImageIcon aria-hidden="true" className="h-[50%] w-[30%] text-gray-300" />}
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mt-4 flex text-sm leading-6 text-gray-600">
          <label
            htmlFor="image"
            className="relative cursor-pointer rounded-md font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
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
        </div>
        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
      </div>
    </div>
  )
}

export default ImageUpload

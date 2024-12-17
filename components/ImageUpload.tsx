"use client"

import { useState } from "react"
import { Image as ImageIcon } from "lucide-react"

type Props = {
  id?: string
  image?: string
  title?: string
  buttonText?: string
  caption?: string
  containerClassName?: string
  imageClassName?: string
}

const ImageUpload = (props: Props) => {
  const { id, image, title, buttonText, caption, containerClassName, imageClassName } = props

  const [preview, setPreview] = useState<string>(
    id ? `${process.env.NEXT_PUBLIC_SUPABASE_BUCKETS}${image}` : "",
  )
  const [isOver, setIsOver] = useState<boolean>(false)

  const makeImage = (rawImg: File) => {
    setPreview(URL.createObjectURL(rawImg))
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
    <div className={containerClassName}>
      <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
        {title}
      </label>
      <div
        className={`mt-2 flex items-center justify-center rounded-lg border border-dashed border-gray-900/25 bg-cover bg-center px-6 py-6 ${isOver ? "bg-gray-50" : ""} ${imageClassName}`}
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
            <span>{buttonText}</span>
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
        <p className="text-xs leading-5 text-gray-600">{caption}</p>
      </div>
    </div>
  )
}

export default ImageUpload

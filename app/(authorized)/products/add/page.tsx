"use client"
import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { submitNewProduct } from "@/server/utils"

import Toaster from "@/components/Toaster"
import ImageUpload from "@/components/ImageUpload"

const initialState = {
  message: "",
}

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
      {pending ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        (() => (
          <>
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </>
        ))()
      )}
    </div>
  )
}

const AddProductPage = () => {
  const [state, formAction] = useFormState(submitNewProduct, initialState)

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      {state && <Toaster message={state.message} />}
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
        Create Product
      </h1>

      {/* Settings forms */}
      <div className="w-full max-w-5xl rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5">
        <form className="flex flex-col gap-6" action={formAction}>
          <div className="flex flex-col gap-6 px-4 py-4">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex-[2]">
                <ImageUpload />
              </div>

              <div className="flex flex-[4] flex-col gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium leading-6 ">
                    Title
                  </label>
                  <div className="mt-2">
                    <input
                      id="title"
                      name="title"
                      type="title"
                      required
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      rows={6}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-6 md:flex-row">
              <div className="flex-1">
                <label htmlFor="cost" className="block text-sm font-medium leading-6 ">
                  Cost
                </label>
                <div className="mt-2">
                  <input
                    id="cost"
                    name="cost"
                    type="number"
                    min={0}
                    step={0.01}
                    required
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex-1">
                <label htmlFor="status" className="block text-sm font-medium leading-6 ">
                  Status
                </label>
                <div className="mt-2">
                  <select
                    id="status"
                    name="status"
                    className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  >
                    <option>Draft</option>
                    <option>Hidden</option>
                    <option>Public</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  )
}

export default AddProductPage

"use client"
import { useFormState, useFormStatus } from "react-dom"
import Link from "next/link"
import { redirect } from "next/navigation"

import Toaster from "@/components/Toaster"
import ImageUpload from "@/components/ImageUpload"
import { Product } from "@/types/product"

const initialState = {
  message: "",
  status: "",
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
            <Link
              href="/products/manage"
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </Link>
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

const ProductForm = (props: { action: any; product?: Product }) => {
  const [state, formAction] = useFormState(props.action, initialState)

  return (
    <form className="flex flex-col gap-6" action={formAction}>
      {state.status !== "" && <Toaster message={state.message} />}
      {state.status === "success" && redirect("/products/manage")}
      <div className="flex flex-col gap-6 px-4 py-4">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex-[2]">
            <ImageUpload id={props.product?.id} version={props.product?.image} />
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
                  defaultValue={props?.product?.title}
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <input id="id" name="id" defaultValue={props?.product?.id} hidden />

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
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  defaultValue={props?.product?.description}
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
                defaultValue={props?.product?.amount}
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
                defaultValue={props?.product?.status}
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
  )
}

export default ProductForm

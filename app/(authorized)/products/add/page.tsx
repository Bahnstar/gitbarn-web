import { FormEvent } from "react"
import { createProduct } from "@/server/handlers/products"
import { Product } from "@/types/product"
import { createClient } from "@/utils/supabase/server"

import ImageUpload from "@/components/ImageUpload"

const AddProductPage = () => {
  const onSubmit = async (formData: FormData) => {
    "use server"

    const supabase = createClient()

    const product: Product = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      amount: formData.get("cost") as string,
      status: formData.get("status") as string,
    }

    console.log(formData)

    const { data: productData, error: productError } = await createProduct(product)

    const { data: imageData, error: imageError } = await supabase.storage
      .from("images")
      .upload(`products/${productData?.id ?? "null"}`, formData.get("image") as File, {
        cacheControl: "3600",
        upsert: false,
      })
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
        Create Product
      </h1>

      {/* Settings forms */}
      <div className="w-full rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5">
        <form className="flex flex-col gap-6" action={onSubmit}>
          <div className="flex flex-col gap-6 px-4 py-4">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex-[2]">
                <ImageUpload />
              </div>

              <div className="flex-[4]">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium leading-6 ">
                    Title
                  </label>
                  <div className="mt-2">
                    <input
                      id="title"
                      name="title"
                      type="title"
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
                      rows={4}
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
                    type="cost"
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

          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProductPage

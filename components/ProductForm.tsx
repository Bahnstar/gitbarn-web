import Form from "./Form"
import ImageUpload from "@/components/ImageUpload"
import { Product } from "@/types/product"

const ProductForm = (props: { action: any; product?: Product }) => {
  const { action, product } = props

  return (
    <Form action={action} redirect="/products/manage" showSubmitButton={true}>
      <div className="flex flex-col gap-6 px-4 py-4">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex-2">
            <ImageUpload
              id={product?.id}
              image={product?.image}
              caption="PNG, JPG, GIF up to 10MB"
              containerClassName="flex h-full flex-col"
              imageClassName="min-h-[175px] flex-1"
              title="Product Image"
              buttonText="Upload a file"
            />
          </div>

          <div className="flex flex-4 flex-col gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium leading-6 ">
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="title"
                  defaultValue={product?.title}
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-xs ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <input id="id" name="id" defaultValue={product?.id} hidden />
            <input id="tiger_id" name="tiger_id" defaultValue={product?.tiger_id} hidden />

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
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  defaultValue={product?.description}
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
                defaultValue={product?.amount}
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-xs ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="flex-1">
            <label htmlFor="sku" className="block text-sm font-medium leading-6 ">
              SKU
            </label>
            <div className="mt-2">
              <input
                id="sku"
                name="sku"
                type="text"
                required
                defaultValue={product?.sku}
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-xs ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
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
                defaultValue={product?.status}
                className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
              >
                <option>Draft</option>
                <option>Hidden</option>
                <option>Public</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
}

export default ProductForm

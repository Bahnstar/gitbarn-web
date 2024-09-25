import { processProduct } from "@/server/utils"
import ProductForm from "@/components/ProductForm"

const AddProductPage = () => {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
        Create Product
      </h1>

      <div className="w-full max-w-5xl rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5">
        <ProductForm action={processProduct} />
      </div>
    </div>
  )
}

export default AddProductPage

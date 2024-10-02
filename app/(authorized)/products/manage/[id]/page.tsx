import { getProductsById } from "@/server/handlers/products"
import { processProduct } from "@/utils/forms"

import ProductForm from "@/components/ProductForm"

const EditProductPage = async ({ params }: { params: { id: string } }) => {
  const { data: products, error } = await getProductsById(params.id)

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
        Edit Product
      </h1>

      <div className="w-full max-w-5xl rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5">
        <ProductForm action={processProduct} product={products?.[0]} />
      </div>
    </div>
  )
}

export default EditProductPage

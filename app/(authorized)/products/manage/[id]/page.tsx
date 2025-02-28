import { getProductsById } from "@/server/handlers/products"
import { processProduct } from "@/utils/forms"

import ProductForm from "@/components/ProductForm"
import { redirect } from "next/navigation"

type Params = Promise<{ id: string }>

const EditProductPage = async ({ params }: { params: Params }) => {
  const { id } = await params
  const { data: products, error } = await getProductsById(id)

  if (!products || products.length === 0) redirect("/products/manage")

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <h1 className="text-3xl leading-tight font-bold tracking-tight text-gray-900">
        Edit Product
      </h1>

      <div className="w-full max-w-5xl rounded-xl bg-white shadow-xs ring-1 ring-gray-900/5">
        <ProductForm action={processProduct} product={products?.[0]} />
      </div>
    </div>
  )
}

export default EditProductPage

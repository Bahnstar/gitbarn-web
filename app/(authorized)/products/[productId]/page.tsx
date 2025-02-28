import Image from "next/image"
import { CheckIcon } from "@heroicons/react/20/solid"
import { getProductsById } from "@/server/handlers/products"
import AddToCartButton from "@/components/AddToCartButton"
import { ShoppingCartIcon } from "lucide-react"
import Toaster from "@/components/Toaster"
import { redirect } from "next/navigation"

type Params = Promise<{ productId: string }>

const ProductPage = async ({ params }: { params: Params }) => {
  const { productId } = await params
  const { data: products, error } = await getProductsById(productId)
  const product = products?.[0]

  if (!product) {
    redirect("/products")
  }

  return (
    <div className="flex flex-col justify-between gap-4 rounded-lg bg-white p-6 lg:flex-row">
      <div className="flex flex-1 flex-col">
        <div className="mt-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {product?.title}
          </h1>
          <p className="text-sm text-gray-500">SKU: {product?.sku}</p>
        </div>

        <div className="mt-4 flex flex-1 flex-col justify-between">
          <div className="flex-1">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="">
              <p className="text-lg text-gray-900 sm:text-xl">${product?.amount}</p>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base">{product?.description}</p>
            </div>
          </div>

          <div className="">
            <div className="mt-6 mb-3 flex items-center justify-center">
              <CheckIcon aria-hidden="true" className="size-5 shrink-0 text-green-500" />
              <p className="ml-2 text-sm text-gray-500">In stock and ready to ship</p>
            </div>

            <AddToCartButton
              className="w-full btn-primary"
              productId={product!.id!}
              productTitle={product!.title}
            >
              <ShoppingCartIcon /> Add to Cart
            </AddToCartButton>
          </div>
        </div>
      </div>

      <div>
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_BUCKETS}${product?.image}`}
          alt={product?.title || "Unknown"}
          width={400}
          height={200}
          className="aspect-square w-full rounded-lg object-cover"
        />
      </div>
    </div>
  )
}

export default ProductPage

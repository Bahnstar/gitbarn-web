"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

import { getProducts } from "@/server/handlers/products"
import { createCart, getCartsById, updateCart } from "@/server/handlers/carts"
import { getCurrentUser } from "@/server/handlers/users"
import { Product } from "@/types/product"
import { Cart } from "@/types/cart"
import { ShoppingCartIcon, LoaderCircle } from "lucide-react"
import { revalidatePath } from "next/cache"
import clientRevalidate from "@/utils/clientRevalidate"

type CartLoading = {
  loading: boolean
  productTitle: string
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [addToCartLoading, setAddToCartLoading] = useState<CartLoading>({
    loading: false,
    productTitle: "",
  })

  useEffect(() => {
    getPublicProducts()
  }, [])

  const getPublicProducts = async () => {
    const { data: products, error } = await getProducts()
    if (error) {
      console.log(error)
      return
    }
    setProducts(products!)
  }

  const addToCart = async (product: Product) => {
    const {
      data: { user },
    } = await getCurrentUser()

    const { data: carts, error: cError } = await getCartsById(product.id!, true)

    const cartItem: Cart = {
      user_id: user!.id,
      product_id: product.id!,
      quantity: 1,
    }

    setAddToCartLoading({ loading: true, productTitle: product.title })

    let error: any
    if (carts && carts?.length > 0) {
      const { data, error: err } = await updateCart(carts[0].id!, {
        quantity: carts[0].quantity + 1,
      })
      error = err
    } else {
      const { error: err } = await createCart(cartItem)
      error = err
    }

    if (error) {
      console.error(error)
      return
    }

    setAddToCartLoading({ loading: false, productTitle: "" })
    clientRevalidate("/cart")
    toast.success(`${product.title} was successfully added to your cart`)
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <h1 className="self-start text-4xl font-semibold leading-6 text-gray-900">View Products</h1>
      <div className="flex w-full flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row  items-center gap-x-4">
          <label className="input input-bordered flex w-full max-w-xs items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
            <input type="text" className="grow" placeholder="Search Products" />
          </label>
          <Link
            href="/products/manage"
            type="button"
            className="btn bg-green-600 text-white hover:bg-green-700"
          >
            Manage Products
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8 2xl:grid-cols-4">
          {products?.map((product, index) => (
            <div
              key={`${product.title}_${index}`}
              className="aspect-h-7 aspect-w-10 group block w-full overflow-hidden rounded-md bg-base-100 shadow-sm"
            >
              <figure>
                <Image
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_BUCKETS}${product.image}`}
                  alt={product.title}
                  width={800}
                  height={600}
                  className="h-64 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.title}</h2>
                <p className="line-clamp-1">{product.description}</p>
                <div className="card-actions justify-end">
                  <button
                    onClick={() => addToCart(product)}
                    className="btn flex items-center bg-green-600 text-white hover:bg-green-700"
                  >
                    {addToCartLoading.loading && addToCartLoading.productTitle === product.title ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      <ShoppingCartIcon className="h-5 w-5" />
                    )}
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsPage

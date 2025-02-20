"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { getProducts } from "@/server/handlers/products"
import { getUserWithProfile } from "@/server/handlers/users"
import { Product } from "@/types/product"
import AddToCartButton from "@/components/AddToCartButton"
import { ShoppingCartIcon } from "lucide-react"

type CartLoading = {
  loading: boolean
  productTitle: string
}

const ProductsPage = () => {
  const [role, setRole] = useState("user")
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    getPublicProducts()

    const getRole = async () => {
      const { data: profile, error } = await getUserWithProfile()
      setRole(profile?.role || "user")
    }

    getRole()
  }, [])

  const getPublicProducts = async () => {
    const { data: products, error } = await getProducts()
    if (error) {
      console.log(error)
      return
    }
    setProducts(products!)
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-6 p-4 sm:gap-10">
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
          {role === "admin" && (
            <Link
              href="/products/manage"
              type="button"
              className="btn bg-green-600 text-white hover:bg-green-700"
            >
              Manage Products
            </Link>
          )}
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
                  <AddToCartButton
                    className="inline-flex items-center gap-1.5 rounded-md bg-green-50 px-3 py-3 text-sm text-green-600 transition-colors hover:bg-green-100"
                    productId={product.id!}
                    productTitle={product.title}
                  >
                    <ShoppingCartIcon /> Add to Cart
                  </AddToCartButton>
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

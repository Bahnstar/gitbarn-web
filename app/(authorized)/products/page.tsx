"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { getProducts } from "@/server/handlers/products"
import { getUserWithProfile } from "@/server/handlers/users"
import { Product } from "@/types/product"
import AddToCartButton from "@/components/AddToCartButton"
import { ShoppingCartIcon, PencilIcon, MinusIcon, PlusIcon } from "lucide-react"

type CartLoading = { loading: boolean; productTitle: string }

const ProductsPage = () => {
  const [role, setRole] = useState("user")
  const [products, setProducts] = useState<Product[]>([])
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})

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

    // Initialize quantities
    const initialQuantities: { [productId: string]: number } = {}
    products?.forEach((product) => {
      initialQuantities[product.id!] = 1
    })
    setQuantities(initialQuantities)

    setProducts(products!)
  }

  const incrementQuantity = (productId: string) => {
    setQuantities((prev) => ({ ...prev, [productId]: (prev[productId] || 1) + 1 }))
  }

  const decrementQuantity = (productId: string) => {
    setQuantities((prev) => ({ ...prev, [productId]: Math.max(1, (prev[productId] || 1) - 1) }))
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="self-start text-4xl leading-6 font-semibold text-gray-900">View Products</h1>
        <div className="mt-4 sm:mt-0">
          {role === "admin" && (
            <Link href="/products/manage" className="self-stretch btn-primary">
              <PencilIcon className="h-4 w-4" />
              Manage Products
            </Link>
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 2xl:grid-cols-4">
        {products?.map((product, index) => (
          <div
            key={`${product.title}_${index}`}
            className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <div className="aspect-h-1 aspect-w-1 relative overflow-hidden bg-gray-200">
              <Image
                src={`${process.env.NEXT_PUBLIC_SUPABASE_BUCKETS}${product.image}`}
                alt={product.title}
                width={800}
                height={800}
                className="h-60 w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col space-y-2 p-4">
              <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
              <p className="line-clamp-2 text-sm text-gray-500">{product.description}</p>
              <div className="mt-auto pt-3">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xl font-semibold text-emerald-600">
                    ${parseFloat(product.amount || "0").toFixed(2)}
                  </span>
                  <div className="flex items-center rounded-md border border-gray-300">
                    <button
                      type="button"
                      onClick={() => decrementQuantity(product.id!)}
                      className="rounded-l-md p-1 hover:bg-gray-100"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span className="px-3 py-1 text-sm">{quantities[product.id!] || 1}</span>
                    <button
                      type="button"
                      onClick={() => incrementQuantity(product.id!)}
                      className="rounded-r-md p-1 hover:bg-gray-100"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <AddToCartButton
                  className="w-full justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-colors btn-primary hover:bg-emerald-600"
                  productId={product.id!}
                  productTitle={product.title}
                  quantity={quantities[product.id!] || 1}
                >
                  <ShoppingCartIcon className="h-4 w-4" /> Add to Cart
                </AddToCartButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductsPage

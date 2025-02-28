import { Trash2Icon, PencilIcon, PackagePlusIcon } from "lucide-react"
import Image from "next/image"
import { getProducts, deleteProduct } from "@/server/handlers/products"
import Link from "next/link"
import ConfirmationButton from "@/components/ConfirmationButton"
import { revalidatePath } from "next/cache"

const ManageProductsPage = async () => {
  // "true" gets all products regardless of status
  const { data: products, error } = await getProducts(true)

  const handleDelete = async (ids: any[]) => {
    "use server"

    const res = await deleteProduct(ids[0], ids[1])
    revalidatePath("/products")

    return {
      status: res,
      message: res === "sucess" ? "Product successfully deleted" : "Product deletion failed",
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="self-start text-4xl leading-6 font-semibold text-gray-900">
            Manage Products
          </h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link type="button" href="/products/add" className="btn-primary">
            Add product
            <PackagePlusIcon />
          </Link>
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
            </div>
            <div className="flex items-center justify-center gap-3 p-3">
              <Link
                href={`/products/manage/${product.id}`}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-green-50 px-3 py-1.5 text-sm text-green-600 transition-colors hover:bg-green-100"
              >
                Edit
                <PencilIcon className="h-4 w-4" />
              </Link>
              <ConfirmationButton
                title="Delete Product"
                description={`Are you sure you want to delete ${product.title}?\nThis action cannot be reversed.`}
                action={handleDelete}
                actionParams={[product.id!, product.tiger_id]}
                actionTitle="Delete"
                actionPending={`Deleting ${product.title}...`}
                actionStyle="inline-flex justify-center flex-1 items-center gap-1.5 rounded-md bg-red-50 px-3 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-100"
                ActionButton={
                  <>
                    Delete
                    <Trash2Icon className="h-4 w-4" />
                  </>
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageProductsPage

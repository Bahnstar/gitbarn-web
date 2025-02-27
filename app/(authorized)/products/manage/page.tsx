import { Product } from "@/types/product"
import { Trash2Icon } from "lucide-react"
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
          <Link
            type="button"
            href="/products/add"
            className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add product
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="ring-opacity-5 overflow-hidden shadow-sm ring-1 ring-black/5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {products?.map((product) => (
                    <tr key={product.id}>
                      <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                        {product.title}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {product.description}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {product.amount}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {product.status}
                      </td>
                      <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6">
                        {/* <CloseConversationButton conversationId="" onClose={test} /> */}
                        <Link
                          href={`/products/manage/${product.id}`}
                          className="text-green-600 hover:text-green-900"
                        >
                          Edit<span className="sr-only">, {product.title}</span>
                        </Link>
                        <ConfirmationButton
                          title="Delete Product"
                          description={`Are you sure you want to delete ${product.title}?`}
                          action={handleDelete}
                          actionParams={[product.id!, product.tiger_id]}
                          actionTitle="Delete"
                          actionPending={`Deleting ${product.title}...`}
                          ActionButton={
                            <span className="inline-flex items-center gap-1.5 rounded-md bg-red-50 px-3 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-100">
                              Delete
                              <Trash2Icon className="h-4 w-4" />
                            </span>
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageProductsPage

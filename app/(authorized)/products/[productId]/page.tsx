import { Check } from "lucide-react"

const ProductPage = ({ params }: { params: { productId: string } }) => {
  const { productId } = params

  const product = {
    name: "Some product",
    price: "a million bux",
    description: "This is a description",
    imageAlt: "Hmmm",
    imageSrc: "",
  }

  return (
    <div>
      <div>
        <div className="mt-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {product.name}
          </h1>
        </div>

        <section aria-labelledby="information-heading" className="mt-4">
          <h2 id="information-heading" className="sr-only">
            Product information
          </h2>

          <div className="flex items-center">
            <p className="text-lg text-gray-900 sm:text-xl">{product.price}</p>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{product.description}</p>
            </div>

            <div className="mt-6 flex items-center">
              <Check aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-green-500" />
              <p className="ml-2 text-sm text-gray-500">In stock and ready to ship</p>
            </div>
          </div>
        </section>
      </div>

      {/* Product image */}
      <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
          <img
            alt={product.imageAlt}
            src={product.imageSrc}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  )
}

export default ProductPage

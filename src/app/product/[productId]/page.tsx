import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { getProductById } from "@/data/product"
import { db } from "@/lib/db"
import { products } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"

export default async function ProductDetails({
  params,
}: {
  params: { productId: string }
}) {
  const id = params.productId
  const product = await getProductById(id)

  if (!product) return notFound()

  return (
    <MaxWidthWrapper>
      <h1 className="mt-16 text-xl font-bold">
        PRODUCT DETAILS {product.name}
      </h1>
    </MaxWidthWrapper>
  )
}

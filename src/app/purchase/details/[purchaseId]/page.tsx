import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PurchaseDetails from '@/components/purchases/purchase-details'
import { getProductById } from '@/data/product'
import { getPurchaseById } from '@/data/purchase'
import { getUserById, getUserByUsername } from '@/data/user'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

type Props = {
  params: { purchaseId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function page({ params }: Props) {
  const user = await currentUser()
  const purchase = await getPurchaseById(params.purchaseId)
  const product = await getProductById(purchase?.productId!)
  const seller = await getUserByUsername(purchase?.seller!)
  const buyer = await getUserByUsername(purchase?.buyer!)

  if (
    purchase?.buyer !== user?.username &&
    purchase?.seller !== user?.username
  ) {
    return redirect('/')
  }

  return (
    <MaxWidthWrapper className="mt-16 md:mt-24">
      <PurchaseDetails
        purchaseData={purchase!}
        productData={product!}
        seller={seller!}
        buyer={buyer!}
        cancel={purchase?.cancel!}
      />
    </MaxWidthWrapper>
  )
}

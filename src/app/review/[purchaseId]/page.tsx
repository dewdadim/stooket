import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PurchaseForm from '@/components/forms/purchase-form'
import { ReviewForm } from '@/components/forms/review-form'
import { getPurchaseById } from '@/data/purchase'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

type Props = {
  params: { purchaseId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function page({ params }: Props) {
  const user = await currentUser()
  const purchase = await getPurchaseById(params.purchaseId)

  if (purchase?.buyer !== user?.username) {
    return redirect('/')
  }

  return (
    <MaxWidthWrapper className="mt-16">
      <ReviewForm purchaseData={purchase!} />
    </MaxWidthWrapper>
  )
}

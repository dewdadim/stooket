import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import SellerDashboard from '@/components/seller/dashboard'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function page() {
  const user = await currentUser()

  if (user?.isSeller === false) {
    return redirect('/not-seller')
  }
  return (
    <MaxWidthWrapper className="mt-24">
      <SellerDashboard />
    </MaxWidthWrapper>
  )
}

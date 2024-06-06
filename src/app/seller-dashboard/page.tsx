import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import SellerDashboard from '@/components/seller/dashboard'
import { getUserById } from '@/data/user'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function page() {
  const user = await currentUser()
  const userDt = await getUserById(user?.id!)

  if (userDt?.isSeller === false) {
    redirect('/not-seller')
  }

  return (
    <MaxWidthWrapper className="mt-24">
      <SellerDashboard />
    </MaxWidthWrapper>
  )
}

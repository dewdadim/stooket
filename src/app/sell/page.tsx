import SellForm from '@/components/forms/sell-form'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function page() {
  const user = await currentUser()

  if (user?.isSeller === false) {
    redirect('/not-seller')
  }

  return (
    <div>
      <SellForm />
    </div>
  )
}

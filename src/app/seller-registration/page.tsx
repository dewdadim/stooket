import RegisterSellerForm from '@/components/forms/seller-registeration-form'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function page() {
  const user = await currentUser()

  if (user?.isSeller === true) {
    return redirect('/')
  }

  return (
    <div>
      <RegisterSellerForm />
    </div>
  )
}

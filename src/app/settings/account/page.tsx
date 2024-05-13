import AccountSettings from '@/components/settings/AccountSettings'
import ChangePassword from '@/components/settings/ChangePassword'
import { getUserById } from '@/data/user'
import { currentUser } from '@/lib/auth'

export default async function page() {
  const user = await currentUser()
  const userData = await getUserById(user?.id!)

  return (
    <div className="flex flex-col gap-16 lg:gap-8">
      <AccountSettings user={userData!} className="w-full" />
      <ChangePassword />
    </div>
  )
}

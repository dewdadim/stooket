import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProfileSettings from '@/components/settings/ProfileSettings'
import SettingsNav from '@/components/settings/SettingsNav'
import { getUserById } from '@/data/user'
import { currentUser } from '@/lib/auth'

export default async function page() {
  const user = await currentUser()
  const userData = await getUserById(user?.id!)

  return <ProfileSettings user={userData!} className="w-full" />
}

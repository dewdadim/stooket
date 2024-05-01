import { AspectRatio } from '@/components/ui/aspect-ratio'
import { GraduationCap } from 'lucide-react'
import Image from 'next/image'
import { Separator } from '../ui/separator'
import { cn } from '@/lib/utils'
import { currentUser } from '@/lib/auth'
import { Button } from '../ui/button'
import Link from 'next/link'

interface ProfileCardProps {
  profile: {
    id: string
    name: string | null
    username: string | null
    email: string
    phoneNumber: string | null
    password: string | null
    emailVerified: Date | null
    image: string | null
    institute: string | null
    isSeller: boolean | null
    register_at: Date | null
  }
  className?: string
}

export async function ProfileCard({ profile, className }: ProfileCardProps) {
  const currentDate = new Date()
  const userRegisterDate = profile.register_at
  const difference_inTime = currentDate.getTime() - userRegisterDate?.getTime()!
  const difference_inDay = Math.round(difference_inTime / (1000 * 3600 * 24))
  const user = await currentUser()

  return (
    <div
      className={cn(
        'flex w-full min-w-80 flex-col space-y-4 rounded-lg p-2 md:shadow-md lg:max-w-min lg:space-y-6 lg:p-6 dark:lg:border dark:lg:border-solid dark:lg:border-secondary',
        className,
      )}
    >
      <div className="flex flex-row flex-wrap items-center gap-6">
        <div className="size-28 md:size-40">
          <AspectRatio ratio={1 / 1}>
            <Image
              src={profile.image!}
              alt={profile.username!}
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
        <div className="w-fit space-y-2">
          <div className="text-2xl font-semibold">{profile.name}</div>
          <div>
            <p className="text-xl">@{profile.username}</p>
            <p className="text-sm">Joined {difference_inDay} days ago</p>
          </div>
        </div>
      </div>
      <Separator />
      <div>
        <div className="flex items-center gap-1">
          <GraduationCap strokeWidth={1} size={16} />
          <p className="text-sm">Institute:</p>
        </div>
        <div>{profile.institute}</div>
      </div>
      {user?.username.match(profile.username!) ? (
        <>
          <Separator />
          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              Edit Profile
            </Button>
          </div>
        </>
      ) : null}
    </div>
  )
}

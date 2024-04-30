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
        'flex min-h-96 min-w-80 max-w-min flex-col space-y-6 rounded-lg p-6 shadow-md dark:border dark:border-solid dark:border-secondary',
        className,
      )}
    >
      <div className="size-40">
        <AspectRatio ratio={1 / 1}>
          <Image
            src={profile.image!}
            alt={profile.username!}
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </div>
      <div className="space-y-2">
        <div className="text-2xl font-semibold">{profile.name}</div>
        <div>
          <p className="text-xl">@{profile.username}</p>
          <p className="text-sm">Joined {difference_inDay} days ago</p>
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
            <Link href="/sell">
              <Button className="w-full">Sell Item</Button>
            </Link>
            <Button variant="outline" className="w-full">
              Edit Profile
            </Button>
          </div>
        </>
      ) : null}
    </div>
  )
}

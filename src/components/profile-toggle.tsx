import { LayoutDashboard, PlusSquare, Settings, User2 } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Separator } from './ui/separator'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import Link from 'next/link'
import { Logout } from './forms/auth/logout'
import { currentUser } from '@/lib/auth'

export async function ProfileToggle() {
  const user = await currentUser()

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="size-8 rounded-sm">
          <AvatarImage src={user?.image!} alt="Profile" />
          <AvatarFallback className="size-8 rounded-sm bg-secondary">
            IMG
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent className="w-auto min-w-56 max-w-64" align="center">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 rounded-md p-2">
            <Avatar className="size-10 rounded-sm">
              <AvatarImage src={user?.image!} alt="Profile" />
              <AvatarFallback className="size-8 rounded-sm bg-secondary">
                IMG
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <div className="truncate font-medium leading-none">
                {user?.name}
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col">
            <Link
              href={`/${user?.username}`}
              className="flex cursor-pointer items-center justify-start gap-2 rounded-md p-2 hover:bg-primary-foreground"
            >
              <User2 />
              <p className="text-sm leading-none">Profile</p>
            </Link>
            <Link
              href="/seller-dashboard"
              className="flex cursor-pointer items-center justify-start gap-2 rounded-md p-2 hover:bg-primary-foreground"
            >
              <LayoutDashboard />
              <p className="text-sm leading-none">Seller Dashboard</p>
            </Link>
            <Link
              href="/sell"
              className="flex cursor-pointer items-center justify-start gap-2 rounded-md p-2 hover:bg-primary-foreground"
            >
              <PlusSquare />
              <p className="text-sm leading-none">Sell Item</p>
            </Link>
          </div>
          <Separator />
          <Link
            href="/settings"
            className="flex cursor-pointer items-center justify-start gap-2 rounded-md p-2 hover:bg-primary-foreground"
          >
            <Settings />
            <p className="text-sm leading-none">Settings</p>
          </Link>
          <Separator />
          <Logout />
        </div>
      </PopoverContent>
    </Popover>
  )
}

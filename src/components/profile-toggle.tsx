'use client'

import { LayoutDashboard, LogOut, Settings, User2 } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Separator } from './ui/separator'
import { signOut } from 'next-auth/react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import Link from 'next/link'
import { useCurrentUser } from '@/hooks/use-current-user'

export function ProfileToggle() {
  const user = useCurrentUser()

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
              <h4 className="truncate font-medium leading-none">
                {user?.name}
              </h4>
              <p className="text-xs">@{user?.username}</p>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col">
            <Link
              href="/profile"
              className="flex cursor-pointer items-center justify-start gap-2 rounded-md p-2 hover:bg-primary-foreground"
            >
              <User2 />
              <p className="text-sm leading-none">Profile</p>
            </Link>
            <Link
              href="/settings"
              className="flex cursor-pointer items-center justify-start gap-2 rounded-md p-2 hover:bg-primary-foreground"
            >
              <Settings />
              <p className="text-sm leading-none">Settings</p>
            </Link>
            <Link
              href="/sales-dashboard"
              className="flex cursor-pointer items-center justify-start gap-2 rounded-md p-2 hover:bg-primary-foreground"
            >
              <LayoutDashboard />
              <p className="text-sm leading-none">Sales Manager</p>
            </Link>
          </div>

          <Separator />
          <div
            className="flex cursor-pointer items-center justify-start gap-2 rounded-md p-2 hover:bg-primary-foreground"
            onClick={() => {
              signOut()
            }}
          >
            <LogOut />
            <p className="text-sm leading-none">Logout</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

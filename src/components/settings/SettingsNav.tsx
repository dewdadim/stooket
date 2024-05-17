'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SettingsNavProps {
  className?: string
  currentPage: 'profile' | 'account' | 'notifications' | string
}

function SettingsNav({ currentPage, className }: SettingsNavProps) {
  const pathName = usePathname()
  return (
    <div className={cn('mt-8', className)}>
      <ul className="flex w-full flex-col gap-4">
        <Link href="/settings/profile">
          <li
            className={cn(
              'p-2 px-4',
              pathName.match('profile')
                ? 'border-l-2 border-primary bg-accent font-medium'
                : 'hover:bg-accent',
            )}
          >
            Edit Profile
          </li>
        </Link>
        <Link href="/settings/account">
          <li
            className={cn(
              'p-2 px-4',
              pathName.match('account')
                ? 'border-l-2 border-primary bg-accent font-medium'
                : 'hover:bg-accent',
            )}
          >
            Account
          </li>
        </Link>
      </ul>
    </div>
  )
}

export default SettingsNav

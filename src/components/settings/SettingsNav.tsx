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
        <li
          className={cn(
            'p-2 px-4',
            pathName.match('profile')
              ? 'border-l-2 border-primary bg-accent lg:bg-transparent'
              : null,
          )}
        >
          <Link
            href="/settings/profile"
            className={cn(
              'w-full',
              pathName.match('/settings/profile') ? 'font-medium' : null,
            )}
          >
            Edit Profile
          </Link>
        </li>
        <li
          className={cn(
            'p-2 px-4',
            pathName.match('account')
              ? 'border-l-2 border-primary bg-accent lg:bg-transparent'
              : null,
          )}
        >
          <Link
            href="/settings/account"
            className={cn(
              'w-full',
              pathName.match('/settings/account') ? 'font-medium' : null,
            )}
          >
            Account
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default SettingsNav

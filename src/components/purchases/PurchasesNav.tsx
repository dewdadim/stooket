'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function PurchasesNav() {
  const pathName = usePathname()
  const tab = pathName.split('/').slice(-1)[0]

  return (
    <div className="flex w-96 grow flex-col gap-2">
      <ul className="flex flex-row gap-1">
        <li>
          <Link
            href={`/purchases/in-progress`}
            className={cn(
              'px-4 py-2 hover:bg-accent',
              tab.match('in-progress')
                ? 'border-b-4 border-primary font-medium'
                : '',
            )}
          >
            In Progress
          </Link>
        </li>
        <li>
          <Link
            href={`/purchases/completed`}
            className={cn(
              'px-4 py-2 hover:bg-accent',
              tab?.match('completed')
                ? 'border-b-4 border-primary font-medium'
                : '',
            )}
          >
            Completed
          </Link>
        </li>
        <li>
          <Link
            href={`/purchases/cancelled`}
            className={cn(
              'px-4 py-2 hover:bg-accent',
              tab?.match('cancelled')
                ? 'border-b-4 border-primary font-medium'
                : '',
            )}
          >
            Cancelled
          </Link>
        </li>
      </ul>
    </div>
  )
}

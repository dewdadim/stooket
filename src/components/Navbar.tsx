import MaxWidthWrapper from './MaxWidthWrapper'
import { Input } from './ui/input'
import { ModeToggle } from './mode-toggle'
import { ProfileToggle } from './profile-toggle'
import Link from 'next/link'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { NotificationToggle } from './notification_sheet/notification-toggle'
import { SearchBar } from './search-bar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export async function Navbar() {
  const session = await getServerSession(authOptions)

  return (
    <div className="fixed top-0 z-50 w-full bg-primary-foreground">
      <MaxWidthWrapper>
        <div className="flex items-center justify-between py-2">
          <div>
            <h1 className="text-2xl font-bold text-primary">
              <Link href="/">Stooket</Link>
            </h1>
          </div>
          <SearchBar className="hidden" />
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="lg:hidden">
              <Search className="size-5" />
            </Button>
            <ModeToggle />
            {session?.user ? (
              <>
                <NotificationToggle />
                <ProfileToggle />
                <Link href="/sell" className="hidden md:inline">
                  <Button
                    className="ml-2 font-medium"
                    variant="default"
                    size="sm"
                  >
                    Sell Product
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button className="font-medium" variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    className="col hidden font-medium md:inline-flex"
                    variant="ghost"
                    size="sm"
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

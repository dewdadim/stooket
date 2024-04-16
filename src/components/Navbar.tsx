import MaxWidthWrapper from './MaxWidthWrapper'
import { Input } from './ui/input'
import { ModeToggle } from './mode-toggle'
import { ProfileToggle } from './profile-toggle'
import Link from 'next/link'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

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
          <form className="hidden gap-0 lg:flex">
            <Input
              type="text"
              placeholder="Search"
              className=" z-10 w-72 rounded-l-md rounded-r-none "
            />
            <Button
              size="icon"
              variant="secondary"
              className=" rounded-l-none rounded-r-md"
            >
              <Search className="size-5" />
            </Button>
          </form>
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              size="icon"
              variant="ghost"
              className="infline-flex rounded-l-none rounded-r-md lg:hidden"
            >
              <Search className="size-5" />
            </Button>
            <ModeToggle />
            {session?.user ? (
              <>
                <ProfileToggle />
                <Link href="/sell" className="hidden md:inline">
                  <Button className="font-medium" variant="default" size="sm">
                    Sell Item
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

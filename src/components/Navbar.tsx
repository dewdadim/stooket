import MaxWidthWrapper from './MaxWidthWrapper'
import { Input } from './ui/input'
import { ModeToggle } from './mode-toggle'
import { ProfileToggle } from './profile-toggle'
import Link from 'next/link'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

import NextAuth from 'next-auth'
import authConfig from '@/auth.config'

const { auth } = NextAuth(authConfig)

export function Navbar() {
  return (
    <div className="bg-primary-foreground fixed top-0 w-full z-10">
      <MaxWidthWrapper>
        <div className="py-2 flex justify-between items-center">
          <div>
            <h1 className="font-bold text-2xl text-primary">
              <Link href="/">Stooket</Link>
            </h1>
          </div>
          <form className="hidden lg:flex gap-0">
            <Input
              type="text"
              placeholder="Search"
              className=" rounded-l-md rounded-r-none z-10 w-72 "
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
            {auth ? (
              <>
                <Link href="/login">
                  <Button className="font-medium" variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    className="hidden font-medium col md:inline-flex"
                    variant="ghost"
                    size="sm"
                  >
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <ProfileToggle />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

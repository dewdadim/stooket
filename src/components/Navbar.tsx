import MaxWidthWrapper from './MaxWidthWrapper'
import { Input } from './ui/input'
import { ModeToggle } from './ModeToggle'
import { ProfileToggle } from './ProfileToggle'
import Link from 'next/link'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

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
          <form className="flex gap">
            <Input
              type="text"
              placeholder="Search"
              className="hidden rounded-l-md rounded-r-none z-10 w-72 md:inline-flex "
            />
            <Button
              size="icon"
              variant="secondary"
              className="hidden rounded-l-none rounded-r-md md:inline-flex"
            >
              <Search className="size-5"></Search>
            </Button>
          </form>
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              size="icon"
              variant="ghost"
              className="infline-flex rounded-l-none rounded-r-md md:hidden"
            >
              <Search className="size-5"></Search>
            </Button>
            <ModeToggle />
            <ProfileToggle />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

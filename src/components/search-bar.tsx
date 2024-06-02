'use client'

import { Search } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  className?: string
  inputClassName?: string
}

export function SearchBar({ className, inputClassName }: SearchBarProps) {
  const [search, setSearch] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/product?search=${search}`)
  }

  return (
    <form
      className={cn('flex gap-0 lg:flex', className)}
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="Search"
        name="search"
        className={cn('z-10 w-72 rounded-l-md rounded-r-none ', inputClassName)}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        autoComplete="off"
      />
      <Button
        size="icon"
        variant="secondary"
        className=" rounded-l-none rounded-r-md"
        type="submit"
        disabled={search.length === 0}
      >
        <Search className="size-5" />
      </Button>
    </form>
  )
}

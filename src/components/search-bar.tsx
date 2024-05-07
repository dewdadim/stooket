'use client'

import { Search } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function SearchBar(this: any) {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/product?search=${search}`)
  }

  return (
    <form className="hidden gap-0 lg:flex" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Search"
        name="search"
        className=" z-10 w-72 rounded-l-md rounded-r-none "
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
        }}
      />
      <Button
        size="icon"
        variant="secondary"
        className=" rounded-l-none rounded-r-md"
        type="submit"
      >
        <Search className="size-5" />
      </Button>
    </form>
  )
}

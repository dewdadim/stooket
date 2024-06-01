'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import institutes from '@/data/institute.json'
import { createUrl } from '@/utils/createUrl'
import { useCurrentUser } from '@/hooks/use-current-user'

export function SortFilterProduct() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const user = useCurrentUser()

  return (
    <div className="flex gap-2 overflow-auto">
      <Select
        defaultValue={searchParams.get('sort')?.toString() ?? 'bestMatch'}
        onValueChange={(value) => {
          const sortSearchParams = new URLSearchParams(searchParams.toString())
          sortSearchParams.set('sort', value)

          const sortURL = createUrl(pathname, sortSearchParams)

          router.push(sortURL)
        }}
      >
        <SelectTrigger className="w-[200px] focus:ring-0">
          <p className="text-paragraph">Sort:</p>
          <SelectValue placeholder="Select sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="bestMatch">Best Match</SelectItem>
            <SelectItem value="lowPrice">Price - Low to High</SelectItem>
            <SelectItem value="highPrice">Price - High to Low</SelectItem>
            <SelectItem value="recent">Recent</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        defaultValue={
          searchParams.get('institute')?.toString() ?? user?.institute ?? 'all'
        }
        onValueChange={(value) => {
          const instituteSearchParams = new URLSearchParams(
            searchParams.toString(),
          )
          instituteSearchParams.set('institute', value)

          const instituteURL = createUrl(pathname, instituteSearchParams)

          router.push(instituteURL)
        }}
      >
        <SelectTrigger className="w-[500px] focus:ring-0">
          <p className="text-paragraph">Institute:</p>
          <SelectValue placeholder="Select Institute" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Institutes</SelectItem>
          {institutes.map((institute) => (
            <SelectItem key={institute.id} value={institute.name}>
              {institute.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

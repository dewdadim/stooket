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
    <div className="flex flex-wrap gap-2 py-2">
      <Select
        defaultValue={searchParams.get('sort')?.toString() ?? 'bestMatch'}
        onValueChange={(value) => {
          const sortSearchParams = new URLSearchParams(searchParams.toString())
          sortSearchParams.set('sort', value)

          const sortURL = createUrl(pathname, sortSearchParams)

          router.push(sortURL)
        }}
      >
        <SelectTrigger className="w-[220px] font-medium focus:ring-0">
          <div className="line-clamp-1 flex gap-2">
            <p className="font-normal text-paragraph">Sort:</p>
            <SelectValue placeholder="Select sort" />
          </div>
        </SelectTrigger>
        <SelectContent
          ref={(ref) => {
            if (!ref) return
            ref.ontouchstart = (e) => {
              e.preventDefault()
            }
          }}
        >
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
        <SelectTrigger className="w-[500px] font-medium focus:ring-0">
          <div className="line-clamp-1 flex gap-2">
            <p className="font-normal text-paragraph">Institute:</p>
            <SelectValue placeholder="Select Institute" />
          </div>
        </SelectTrigger>
        <SelectContent
          ref={(ref) => {
            if (!ref) return
            ref.ontouchstart = (e) => {
              e.preventDefault()
            }
          }}
        >
          <SelectItem value="all">All Institutes (No Filter)</SelectItem>
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

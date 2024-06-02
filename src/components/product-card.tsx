import { AspectRatio } from './ui/aspect-ratio'
import Image from 'next/image'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  id: string
  title: string
  price: string
  thumbnailUrl: string
  avatar?: string
  username?: string
  isProfile: boolean
  status?: 'listed' | 'unlisted' | 'sold'
}

export function ProductCard(data: ProductCardProps) {
  return (
    <div className="w-auto rounded-md p-2 transition-shadow duration-200 hover:shadow-2xl dark:hover:border-solid dark:hover:bg-secondary">
      {data.isProfile ? (
        <div className="w-fit">
          <div className="flex w-fit flex-row items-center gap-1 py-1 md:gap-2 md:py-2">
            <Link href={'/' + data.username} scroll={true}>
              <Avatar className="size-7 rounded-sm md:size-8">
                <AvatarImage
                  src={data.avatar}
                  alt="Profile"
                  className="object-cover"
                />
                <AvatarFallback className="size-8 rounded-sm bg-secondary">
                  IMG
                </AvatarFallback>
              </Avatar>
            </Link>
            <p className="text-sm md:text-base">
              <Link href={'/' + data.username} scroll={true}>
                @{data.username}
              </Link>
            </p>
          </div>
        </div>
      ) : null}
      <Link href={'/product/' + data.id} scroll={true}>
        <div className="relative py-2">
          {data.status === 'unlisted' ? (
            <div className="absolute left-1/2 top-1/2 z-30 w-fit -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-60">
              <p className="p-10 text-center font-semibold text-white">
                Unlisted
              </p>
            </div>
          ) : data.status === 'sold' ? (
            <div className="absolute left-1/2 top-1/2 z-30 w-fit -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-60">
              <p className="p-10 text-center font-semibold text-white">Sold</p>
            </div>
          ) : null}
          <AspectRatio ratio={1 / 1} className="w-full bg-muted">
            <Image
              src={data.thumbnailUrl}
              alt="Photo by Drew Beamer"
              fill
              className={cn(
                'rounded-md object-cover',
                data.status === 'sold' ? 'opacity-70' : '',
              )}
            />
          </AspectRatio>
        </div>
        <div className="flex h-24 flex-col items-start gap-1 py-2">
          <div
            className={cn(
              'line-clamp-2 text-sm font-medium text-primary',
              data.status === 'sold' ? 'opacity-20' : '',
            )}
          >
            {data.title}
          </div>
          <div
            className={cn(
              'text-lg font-bold tracking-tight text-primary',
              data.status === 'sold' ? 'opacity-20' : '',
            )}
          >
            {data.price !== '0.00' ? `RM${data.price}` : 'FREE'}
          </div>
        </div>
      </Link>
    </div>
  )
}

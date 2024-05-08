import { AspectRatio } from './ui/aspect-ratio'
import Image from 'next/image'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import Link from 'next/link'

interface ProductCardProps {
  id: string
  title: string
  price: string
  thumbnailUrl: string
  avatar?: string
  username?: string
}

export function ProductCard(data: ProductCardProps) {
  return (
    <div className="w-auto rounded-md p-2 transition-shadow duration-200 hover:shadow-2xl dark:hover:border-solid dark:hover:bg-secondary">
      {data.avatar || data.username ? (
        <div className="w-fit">
          <div className="flex w-fit flex-row items-center gap-1 py-1 md:gap-2 md:py-2">
            <Link href={'/' + data.username} scroll={false}>
              <Avatar className="size-7 rounded-sm md:size-8">
                <AvatarImage src={data.avatar} alt="Profile" />
                <AvatarFallback className="size-8 rounded-sm bg-secondary">
                  IMG
                </AvatarFallback>
              </Avatar>
            </Link>
            <p className="text-sm md:text-base">
              <Link href={'/' + data.username} scroll={false}>
                @{data.username}
              </Link>
            </p>
          </div>
        </div>
      ) : null}
      <Link href={'/product/' + data.id} scroll={false}>
        <div className="py-2">
          <AspectRatio ratio={1 / 1} className="w-full bg-muted">
            <Image
              src={data.thumbnailUrl}
              alt="Photo by Drew Beamer"
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
        <div className="flex h-24 flex-col items-start gap-1 py-2">
          <div className="line-clamp-2 text-sm font-medium text-primary">
            {data.title}
          </div>
          <div className="text-lg font-bold tracking-tight text-primary">
            {data.price !== '0.00' ? `RM${data.price}` : 'FREE'}
          </div>
        </div>
      </Link>
    </div>
  )
}

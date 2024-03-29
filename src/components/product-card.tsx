import { AspectRatio } from './ui/aspect-ratio'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import Image from 'next/image'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import Link from 'next/link'

interface ProductCardProps {
  id: string
  title: string
  price: string
  thumbnailUrl: string
  avatar: string
  username: string
}

export function ProductCard(data: ProductCardProps) {
  return (
    <section className="w-auto rounded-md p-2 transition-shadow duration-200 hover:shadow-2xl dark:hover:border-solid dark:hover:bg-secondary">
      <Link href={'/product/' + data.id}>
        <div className="flex flex-row items-center gap-2 py-2">
          <Avatar className="size-7 rounded-sm md:size-8">
            <AvatarImage src={data.avatar} alt="Profile" />
            <AvatarFallback className="size-8 rounded-sm bg-secondary">
              IMG
            </AvatarFallback>
          </Avatar>
          <p className="text-sm md:text-base">@{data.username}</p>
        </div>
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
            RM{data.price}
          </div>
        </div>
      </Link>
    </section>
  )
}

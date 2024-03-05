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
    <section className="w-auto p-2 rounded-md hover:shadow-2xl transition-shadow duration-200 dark:hover:border-solid dark:hover:bg-secondary">
      <Link href={'/product/' + data.id}>
        <div className="flex flex-row gap-2 py-2 items-center">
          <Avatar className="size-7 md:size-8 rounded-sm">
            <AvatarImage src={data.avatar} alt="Profile" />
            <AvatarFallback className="size-8 rounded-sm bg-secondary">
              IMG
            </AvatarFallback>
          </Avatar>
          <p className="text-sm lg:text-base">@{data.username}</p>
        </div>
        <div className="py-2">
          <AspectRatio ratio={1 / 1} className="bg-muted w-full">
            <Image
              src={data.thumbnailUrl}
              alt="Photo by Drew Beamer"
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
        <div className="flex flex-col gap-1 h-24 items-start py-2">
          <div className="text-sm font-medium text-primary line-clamp-2">
            {data.title}
          </div>
          <div className="text-lg font-bold text-primary tracking-tight">
            RM{data.price}
          </div>
        </div>
      </Link>
    </section>
  )
}

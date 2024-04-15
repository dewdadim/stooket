'use client'

import { cn } from '@/lib/utils'
import * as React from 'react'
import { AspectRatio } from './ui/aspect-ratio'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from './ui/carousel'
import { Button } from './ui/button'

type ProductImage = {
  url: string
  post_at: Date | null
  productId: string
}[]

interface ProductCarouselProps {
  productImages: ProductImage
}

export function ProductCarousel(productImages: ProductCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const productImg = productImages.productImages

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      console.log('current')
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <>
      <Carousel
        opts={{
          align: 'start',
          loop: false,
          dragFree: false,
        }}
        className="mt-4"
        setApi={setApi}
      >
        <CarouselContent>
          {productImg.map((productImg) => (
            <CarouselItem
              key={productImg.url}
              className={cn('md:basis-1/2 lg:basis-1/3')}
            >
              <AspectRatio ratio={3 / 2}>
                <Image
                  src={productImg.url}
                  alt="Product's image"
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex" />
        <CarouselNext className="hidden lg:flex" />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        {current} of {count}
      </div>
    </>
  )
}

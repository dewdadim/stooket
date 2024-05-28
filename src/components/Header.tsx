'use client'

import { AspectRatio } from './ui/aspect-ratio'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import * as React from 'react'

export function Header({ className }: { className?: string }) {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  )

  const data = [
    {
      id: 1,
      img: '/image/stooketxumpsa.png',
      alt: 'stooket x umpsa',
    },
    {
      id: 2,
      img: '/image/stooket.png',
      alt: 'stooket',
    },
    {
      id: 3,
      img: '/image/stooketxumpsa.png',
      alt: 'stooket',
    },
    {
      id: 4,
      img: '/image/stooket.png',
      alt: 'stooket',
    },
  ]

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className={className}
      plugins={[plugin.current]}
    >
      <CarouselContent>
        {data.map((dt) => (
          <CarouselItem key={dt.id} className="lg:basis-1/2">
            <AspectRatio ratio={5 / 2}>
              <Image
                src={dt.img}
                alt={dt.alt}
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
  )
}

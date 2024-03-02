import { AspectRatio } from './ui/aspect-ratio'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'
import Image from 'next/image'
import * as React from 'react'

export function Header({ className }: { className?: string }) {
  return (
    <Carousel className={className}>
      <CarouselContent>
        <CarouselItem className="lg:basis-1/2">
          <AspectRatio ratio={5 / 2}>
            <Image
              src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
              alt="Photo by Drew Beamer"
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </CarouselItem>
        <CarouselItem className="lg:basis-1/2">
          <AspectRatio ratio={5 / 2}>
            <Image
              src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
              alt="Photo by Drew Beamer"
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </CarouselItem>
        <CarouselItem className="lg:basis-1/2">
          <AspectRatio ratio={5 / 2}>
            <Image
              src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
              alt="Photo by Drew Beamer"
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </CarouselItem>
        <CarouselItem className="lg:basis-1/2">
          <AspectRatio ratio={5 / 2}>
            <Image
              src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
              alt="Photo by Drew Beamer"
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="hidden lg:flex" />
      <CarouselNext className="hidden lg:flex" />
    </Carousel>
  )
}

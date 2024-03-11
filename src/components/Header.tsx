"use client"

import { AspectRatio } from "./ui/aspect-ratio"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import * as React from "react"

export function Header({ className }: { className?: string }) {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  )

  return (
    <Carousel className={className} plugins={[plugin.current]}>
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
      </CarouselContent>
      <CarouselPrevious className="hidden lg:flex" />
      <CarouselNext className="hidden lg:flex" />
    </Carousel>
  )
}

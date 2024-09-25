import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export type SwiperData = {
  title: string
  image: string
  description: string
}

export default function CarouselPlugin(props: Readonly<{ data: SwiperData[] }>) {
  const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: false }))

  return (
    <Carousel plugins={[plugin.current]} className="h-full w-5/6">
      <CarouselContent className="h-[50vh]">
        {props.data.map((slide, index) => (
          <CarouselItem key={index} className="h-full">
            <div className="h-full w-full md:p-1">
              <Card className="flex h-full flex-col items-center justify-between rounded-md bg-gray-50 p-4 shadow-md">
                <div className="h-full w-full overflow-hidden">
                  <img
                    className="h-full w-full rounded-md object-cover shadow-sm"
                    src={slide.image}
                    alt={slide.title}
                  />
                </div>
                <CardContent className="flex h-1/4 items-center justify-center p-2">
                  <span className="text-md text-center md:text-2xl">{slide.description}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden hover:bg-green-400 md:block" />
      <CarouselNext className="hidden hover:bg-green-400 md:block" />
    </Carousel>
  )
}

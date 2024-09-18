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
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-5/6 h-full"
    >
      <CarouselContent className="h-[50vh]">
        {props.data.map((slide, index) => (
          <CarouselItem key={index} className="h-full">
            <div className="p-1 w-full h-full">
              <Card className="flex flex-col items-center bg-gray-50 justify-between rounded-md shadow-md p-4 h-full">
                <div className="w-full h-full overflow-hidden">
                  <img className="w-full h-full object-cover rounded-md shadow-sm" src={slide.image} alt={slide.title} />
                </div>
                <CardContent className="flex items-center justify-center p-2 h-1/4">
                  <span className="text-2xl">{slide.description}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hover:bg-green-400" />
      <CarouselNext className="hover:bg-green-400" />
    </Carousel>
  )
}

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

const destinations = [
  {
    name: "Dubai",
    image: "https://picsum.photos/seed/dubai/600/800",
    hint: "dubai skyline",
  },
  {
    name: "Turkey",
    image: "https://picsum.photos/seed/turkey/600/800",
    hint: "cappadocia balloons",
  },
  {
    name: "Malaysia",
    image: "https://picsum.photos/seed/malaysia/600/800",
    hint: "petronas towers",
  },
  {
    name: "Kashmir",
    image: "https://picsum.photos/seed/kashmir/600/800",
    hint: "kashmir valley",
  },
  {
    name: "Umrah",
    image: "https://picsum.photos/seed/umrah/600/800",
    hint: "mecca kaaba",
  },
  {
    name: "Maldives",
    image: "https://picsum.photos/seed/maldives/600/800",
    hint: "maldives beach",
  },
]

export default function PopularDestinations() {
  return (
    <section id="destinations" className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl font-bold tracking-tight">Popular Destinations</h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Explore breathtaking destinations loved by our travelers.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {destinations.map((dest) => (
              <CarouselItem key={dest.name} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <Link href={`/packages?destination=${dest.name}`} className="group">
                  <Card className="overflow-hidden">
                    <CardContent className="p-0 relative aspect-[3/4]">
                      <Image
                        src={dest.image}
                        alt={dest.name}
                        fill
                        className="object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
                        data-ai-hint={dest.hint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6">
                        <h3 className="text-2xl font-bold text-white font-headline">{dest.name}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-16" />
          <CarouselNext className="mr-16" />
        </Carousel>
      </div>
    </section>
  )
}

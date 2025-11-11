"use client"

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

const heroImages = [
  {
    src: "https://picsum.photos/seed/hero1/1920/1080",
    alt: "Cinematic view of mountains at sunset",
    hint: "mountains sunset"
  },
  {
    src: "https://picsum.photos/seed/hero2/1920/1080",
    alt: "Pristine tropical beach with turquoise water",
    hint: "tropical beach"
  },
  {
    src: "https://picsum.photos/seed/hero3/1920/1080",
    alt: "Bustling cityscape at night with neon lights",
    hint: "cityscape night"
  },
  {
    src: "https://picsum.photos/seed/hero4/1920/1080",
    alt: "Ancient ruins in a lush jungle",
    hint: "jungle ruins"
  }
];

export default function Hero() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  return (
    <section className="relative h-[70vh] md:h-[85vh] flex items-center justify-center text-white overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        opts={{
          loop: true,
        }}
        className="absolute inset-0 w-full h-full"
      >
        <CarouselContent className="h-full">
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className="h-full">
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover brightness-50"
                    priority={index === 0}
                    data-ai-hint={image.hint}
                />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="relative z-10 container text-center px-4">
        <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-md uppercase">
          SafarHub — Your Journey Starts Here.
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200 drop-shadow-sm font-body">
         All verified travel agents and tour packages, brought together in one place.
        </p>
        <div className="mt-8 max-w-xl mx-auto">
          <Button asChild size="lg">
            <Link href="/packages">Explore Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

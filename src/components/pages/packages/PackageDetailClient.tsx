"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { BookingForm } from "./BookingForm";
import type { Package } from "@/lib/types";

interface PackageDetailClientProps {
  pkg: Package;
}

export default function PackageDetailClient({ pkg }: PackageDetailClientProps) {
  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-8">
        <Carousel className="w-full">
          <CarouselContent>
            {pkg.images.map((img, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="relative aspect-[4/3] p-0">
                    <Image
                      src={img}
                      alt={`${pkg.title} image ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                      data-ai-hint="package photo"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-16" />
          <CarouselNext className="mr-16" />
        </Carousel>
      </div>
      <div className="lg:col-span-1">
        <BookingForm pkg={pkg} />
      </div>
    </div>
  );
}

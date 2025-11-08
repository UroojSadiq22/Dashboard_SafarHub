import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Package } from "@/lib/types";
import { Calendar, DollarSign, ArrowRight } from "lucide-react";

interface PackageCardProps {
  pkg: Package;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/packages/${pkg.id}`} className="block aspect-[4/3] w-full relative">
          <Image
            src={pkg.images[0]}
            alt={pkg.title}
            fill
            className="object-cover"
            data-ai-hint="package image"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <Link href={`/packages/${pkg.id}`}>
          <CardTitle className="text-lg font-bold leading-tight mb-2 hover:text-primary transition-colors">
            {pkg.title}
          </CardTitle>
        </Link>
        <div className="flex items-center text-sm text-muted-foreground gap-4">
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-accent" />
            <span className="font-semibold">{pkg.price.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-accent" />
            <span>{pkg.durationDays} Days</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/packages/${pkg.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

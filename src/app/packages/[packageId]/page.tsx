import { mockPackages, mockAgents } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar, DollarSign, Users, MapPin, Building, Star, ShieldCheck, Sun } from "lucide-react";
import PackageDetailClient from "@/components/pages/packages/PackageDetailClient";
import Link from "next/link";

interface PackageDetailPageProps {
  params: { packageId: string };
}

export default function PackageDetailPage({ params }: PackageDetailPageProps) {
  const pkg = mockPackages.find((p) => p.id === params.packageId);

  if (!pkg) {
    notFound();
  }

  const agent = mockAgents.find((a) => a.id === pkg.agentId);

  return (
    <div className="container py-12">
      <div className="space-y-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{pkg.destination}</Badge>
            <Badge variant="outline">{pkg.travelType}</Badge>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{pkg.title}</h1>
        <p className="text-lg text-muted-foreground">{pkg.description}</p>
      </div>

      <PackageDetailClient pkg={pkg} />

      <div className="grid lg:grid-cols-3 gap-8 mt-12">
        <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-card p-4 rounded-lg shadow-sm">
                    <DollarSign className="w-8 h-8 mx-auto text-primary mb-2"/>
                    <p className="font-bold text-xl">${pkg.price.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">per person</p>
                </div>
                 <div className="bg-card p-4 rounded-lg shadow-sm">
                    <Calendar className="w-8 h-8 mx-auto text-primary mb-2"/>
                    <p className="font-bold text-xl">{pkg.durationDays}</p>
                    <p className="text-sm text-muted-foreground">Days</p>
                </div>
                 <div className="bg-card p-4 rounded-lg shadow-sm">
                    <Users className="w-8 h-8 mx-auto text-primary mb-2"/>
                    <p className="font-bold text-xl">{pkg.seatsAvailable}</p>
                    <p className="text-sm text-muted-foreground">Seats Left</p>
                </div>
                 <div className="bg-card p-4 rounded-lg shadow-sm">
                    <MapPin className="w-8 h-8 mx-auto text-primary mb-2"/>
                    <p className="font-bold text-xl">{pkg.destination}</p>
                    <p className="text-sm text-muted-foreground">Destination</p>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">Daily Itinerary</h2>
                <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                {pkg.itinerary.map((day, index) => (
                    <AccordionItem value={`item-${index}`} key={day.day}>
                    <AccordionTrigger>
                        <div className="flex items-center gap-4">
                            <div className="bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold">{day.day}</div>
                            <h3 className="font-semibold text-lg">{day.title}</h3>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-12">
                        {day.description}
                    </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            </div>
        </div>

        {agent && (
             <div className="lg:col-span-1">
                <div className="bg-card rounded-lg shadow-sm p-6 sticky top-20">
                    <h3 className="text-xl font-bold mb-4">Your Travel Agent</h3>
                    <div className="flex items-center gap-4 mb-4">
                         <Image src={agent.logoUrl} alt={agent.name} width={64} height={64} className="rounded-full border" data-ai-hint="agent logo"/>
                         <div>
                            <Link href={`/agents/${agent.id}`} className="font-bold hover:text-primary transition-colors flex items-center gap-2">
                                {agent.name}
                                {agent.verified && <ShieldCheck className="h-5 w-5 text-primary" />}
                            </Link>
                            <div className="flex items-center gap-1 text-sm text-amber-500 font-semibold mt-1">
                                <Star className="w-4 h-4 fill-current"/>
                                <span>{agent.rating.toFixed(1)}</span>
                            </div>
                         </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{agent.description}</p>
                </div>
            </div>
        )}
      </div>

    </div>
  );
}

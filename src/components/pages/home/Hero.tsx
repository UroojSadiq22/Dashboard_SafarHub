import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white">
      <Image
        src="https://picsum.photos/seed/hero1/1920/1080"
        alt="Cinematic view of mountains at sunset"
        fill
        className="object-cover brightness-50"
        priority
        data-ai-hint="mountains sunset"
      />
      <div className="relative z-10 container text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-md">
          Find Your Next Adventure
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200 drop-shadow-sm">
          Compare travel agents, discover unique packages, and book your dream vacation with confidence.
        </p>
        <div className="mt-8 max-w-xl mx-auto">
          <form className="flex items-center gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-2xl">
            <Input
              type="search"
              placeholder="Search destinations, agents, or travel styles..."
              className="flex-grow bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base text-black"
            />
            <Button type="submit" size="lg">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

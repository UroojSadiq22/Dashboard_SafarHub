import Hero from "@/components/pages/home/Hero";
import FeaturedAgents from "@/components/pages/home/FeaturedAgents";
import FeaturedPackages from "@/components/pages/home/FeaturedPackages";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedPackages />
      <FeaturedAgents />
    </>
  );
}

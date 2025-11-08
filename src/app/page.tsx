import Hero from "@/components/pages/home/Hero";
import FeaturedAgents from "@/components/pages/home/FeaturedAgents";
import FeaturedPackages from "@/components/pages/home/FeaturedPackages";
import HowItWorks from "@/components/pages/home/HowItWorks";
import Testimonials from "@/components/pages/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedPackages />
      <HowItWorks />
      <FeaturedAgents />
      <Testimonials />
    </>
  );
}

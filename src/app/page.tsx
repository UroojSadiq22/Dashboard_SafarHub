import Hero from "@/components/pages/home/Hero";
import FeaturedPackages from "@/components/pages/home/FeaturedPackages";
import HowItWorks from "@/components/pages/home/HowItWorks";
import Testimonials from "@/components/pages/home/Testimonials";
import WhyChooseUs from "@/components/pages/home/WhyChooseUs";
import PopularDestinations from "@/components/pages/home/PopularDestinations";
import Technology from "@/components/pages/home/Technology";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <WhyChooseUs />
      <PopularDestinations />
      <Testimonials />
      <Technology />
    </>
  );
}

import Hero from "@/components/pages/home/Hero";
import HowItWorks from "@/components/pages/home/HowItWorks";
import Testimonials from "@/components/pages/home/Testimonials";
import WhyChooseUs from "@/components/pages/home/WhyChooseUs";
import PopularDestinations from "@/components/pages/home/PopularDestinations";
import Technology from "@/components/pages/home/Technology";
import TrustedPartners from "@/components/pages/home/TrustedPartners";
import FloatingPlane from "@/components/shared/FloatingPlane";

export default function Home() {
  return (
    <>
    <FloatingPlane />
      <Hero />
      <TrustedPartners/>
      <HowItWorks />
      <WhyChooseUs />
      <PopularDestinations />
      <Testimonials />
      {/* <Technology /> */}
    </>
  );
}

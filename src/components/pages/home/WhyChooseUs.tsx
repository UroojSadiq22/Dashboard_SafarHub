import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, BadgePercent, Star } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Verified Agents",
    description: "Every agent on our platform is carefully vetted to ensure quality, reliability, and excellent service.",
  },
  {
    icon: <BadgePercent className="w-8 h-8 text-primary" />,
    title: "Transparent Pricing",
    description: "No hidden fees. Compare packages and services with clear, upfront pricing to find the best deal.",
  },
  {
    icon: <Star className="w-8 h-8 text-primary" />,
    title: "Authentic Reviews",
    description: "Read real reviews from travelers like you to book with confidence and make informed decisions.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl font-bold tracking-tight">Why Choose SafarHub?</h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Verified agents, transparent pricing, and authentic traveler reviews.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                    {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardDescription>{feature.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, UserCheck, Briefcase, Plane } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-10 h-10 text-primary" />,
    title: "Find Your Agent or Package",
    description: "Use our powerful search to discover vetted travel agents or browse through unique, ready-to-book travel packages for every style.",
  },
  {
    icon: <UserCheck className="w-10 h-10 text-primary" />,
    title: "Connect & Plan",
    description: "Connect directly with agents to plan a custom trip or inquire about a package. Get expert advice to tailor your perfect itinerary.",
  },
  {
    icon: <Briefcase className="w-10 h-10 text-primary" />,
    title: "Book with Confidence",
    description: "Finalize your travel plans and book securely through our platform. All our agents are verified for your peace of mind.",
  },
  {
    icon: <Plane className="w-10 h-10 text-primary" />,
    title: "Enjoy Your Adventure",
    description: "Travel stress-free knowing every detail has been handled by a professional. Your dream vacation is just a few clicks away!",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl font-bold tracking-tight">How It Works</h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Your journey to an unforgettable vacation in 4 simple steps.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full h-20 w-20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  {step.icon}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="font-headline text-xl mb-2">{step.title}</CardTitle>
                <p className="text-muted-foreground text-sm font-body">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, UserCheck, Briefcase } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-10 h-10 text-chart-1" />,
    title: "Search Your Dream Destination",
    description: "Use our powerful search to discover vetted travel agents or browse through unique, ready-to-book travel packages for every style.",
    color: "text-chart-1",
    bg: "bg-chart-1/10"
  },
  {
    icon: <UserCheck className="w-10 h-10 text-chart-2" />,
    title: "Compare Verified Travel Agents",
    description: "Connect directly with agents to plan a custom trip or inquire about a package. Get expert advice to tailor your perfect itinerary.",
    color: "text-chart-2",
    bg: "bg-chart-2/10"
  },
  {
    icon: <Briefcase className="w-10 h-10 text-chart-3" />,
    title: "Book With Confidence",
    description: "Finalize your travel plans and book securely through our platform. All our agents are verified for your peace of mind.",
    color: "text-chart-3",
    bg: "bg-chart-3/10"
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl font-bold tracking-tight">How It Works</h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Your journey to an unforgettable vacation in 3 simple steps.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
              <CardHeader>
                <div className={`mx-auto rounded-full h-20 w-20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${step.bg}`}>
                  {step.icon}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className={`font-headline text-xl mb-2 transition-colors group-hover:${step.color}`}>{step.title}</CardTitle>
                <p className="text-muted-foreground text-sm font-body">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

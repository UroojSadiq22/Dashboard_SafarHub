import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FirebaseLogo, GeminiLogo } from "./Logos";

const technologies = [
  {
    icon: <GeminiLogo className="w-12 h-12" />,
    title: "Gemini AI",
    description: "Analyzes traveler feedback for authenticity scores and helps agents generate compelling package descriptions.",
  },
  {
    icon: <FirebaseLogo className="w-12 h-12" />,
    title: "Firebase",
    description: "Powers our platform with real-time data synchronization, secure user authentication, and scalable cloud storage.",
  },
];

export default function Technology() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl font-bold tracking-tight">Technology Behind It</h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Powered by cutting-edge technology from Google.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {technologies.map((tech, index) => (
            <Card key={index} className="flex items-center p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/50">
              <div className="mr-6">{tech.icon}</div>
              <div>
                <CardTitle className="mb-1">{tech.title}</CardTitle>
                <CardDescription>{tech.description}</CardDescription>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

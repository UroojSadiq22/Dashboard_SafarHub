import { mockAgents } from "@/lib/mock-data";
import AgentCard from "@/components/shared/AgentCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedAgents() {
  const featured = mockAgents.filter(agent => agent.verified).slice(0, 3);

  return (
    <section className="py-12 md:py-20 bg-secondary/50">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Trusted Travel Agents</h2>
          <Button variant="ghost" asChild>
            <Link href="/agents">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </section>
  );
}

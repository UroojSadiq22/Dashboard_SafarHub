import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShieldCheck } from "lucide-react";
import type { Agent } from "@/lib/types";

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Image
          src={agent.logoUrl}
          alt={`${agent.name} logo`}
          width={64}
          height={64}
          className="rounded-full border"
          data-ai-hint="agent logo"
        />
        <div className="flex-1">
          <Link href={`/agents/${agent.id}`}>
            <CardTitle className="text-lg font-bold hover:text-primary transition-colors flex items-center gap-2">
              {agent.name}
              {agent.verified && <ShieldCheck className="h-5 w-5 text-primary" />}
            </CardTitle>
          </Link>
          <div className="flex items-center gap-1 text-sm text-amber-500 font-semibold mt-1">
            <Star className="w-4 h-4 fill-current" />
            <span>{agent.rating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <CardDescription className="line-clamp-2 h-10">{agent.description}</CardDescription>
        <div className="mt-4 flex flex-wrap gap-2">
          {agent.specialties.slice(0, 3).map((specialty) => (
            <Badge key={specialty} variant="secondary">
              {specialty}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

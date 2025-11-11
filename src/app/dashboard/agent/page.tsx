import { mockPackages } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, Star, MessageSquare } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function AgentDashboardPage() {
  const agentId = "agent-1"; // Assuming the logged-in agent is agent-1
  const agentPackages = mockPackages.filter(p => p.agentId === agentId);

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/agent/new-package">
          <Card className="hover:bg-primary/10 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Create New Package</CardTitle>
              <PlusCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">&nbsp;</div>
              <p className="text-xs text-muted-foreground">Add a new travel deal</p>
            </CardContent>
          </Card>
        </Link>
         <Link href="/dashboard/agent/packages">
          <Card className="hover:bg-primary/10 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Packages</CardTitle>
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agentPackages.length}</div>
              <p className="text-xs text-muted-foreground">Total packages</p>
            </CardContent>
          </Card>
        </Link>
         <Link href="/dashboard/agent/inquiries">
          <Card className="hover:bg-primary/10 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">New customer inquiries</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/agent/reviews">
          <Card className="hover:bg-primary/10 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reviews</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25</div>
              <p className="text-xs text-muted-foreground">Total reviews received</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Packages</CardTitle>
              <CardDescription>A quick look at your latest packages.</CardDescription>
            </div>
            <Button asChild>
                <Link href="/dashboard/agent/packages">View All</Link>
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Package Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Seats Left</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agentPackages.slice(0, 3).map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium">{pkg.title}</TableCell>
                  <TableCell>${pkg.price.toLocaleString()}</TableCell>
                  <TableCell>{pkg.durationDays} Days</TableCell>
                  <TableCell>{pkg.seatsAvailable}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

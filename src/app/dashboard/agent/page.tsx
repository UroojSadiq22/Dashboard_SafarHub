'use client';
import { mockPackages } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle, Star, MessageSquare, Briefcase } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AgentDashboardPage() {
  const agentId = "agent-1"; // Assuming the logged-in agent is agent-1
  const agentPackages = mockPackages.filter(p => p.agentId === agentId);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const stats = [
    { title: "My Packages", value: agentPackages.length, icon: <Briefcase />, href: "/dashboard/agent/packages" },
    { title: "New Inquiries", value: "12", icon: <MessageSquare />, href: "/dashboard/agent/inquiries" },
    { title: "Total Reviews", value: "25", icon: <Star />, href: "/dashboard/agent/reviews" },
  ];

  return (
    <div className="space-y-8">
       <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
      >
        {stats.map((stat, i) => (
          <motion.div key={i} variants={cardVariants}>
            <Link href={stat.href}>
                <Card className="bg-gradient-to-br from-primary/80 to-accent/80 text-primary-foreground hover:from-primary hover:to-accent transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <div className="text-accent-foreground">{stat.icon}</div>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold">{stat.value}</div>
                </CardContent>
                </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.4 }}}>
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
      </motion.div>
    </div>
  );
}

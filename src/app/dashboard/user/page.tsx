'use client';

import { mockPackages } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Plane, Star, LogOut, Package, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function UserDashboardPage() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const stats = [
    { title: "Total Bookings", value: "3", icon: <Briefcase /> },
    { title: "Upcoming Trips", value: "1", icon: <Plane /> },
    { title: "Completed Trips", value: "2", icon: <Star /> },
  ];

  return (
    <div className="space-y-8">
      <motion.div 
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
      >
        {stats.map((stat, i) => (
          <motion.div key={i} variants={cardVariants}>
            <Card className="bg-gradient-to-br from-primary/80 to-accent/80 text-primary-foreground">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className="text-accent-foreground">{stat.icon}</div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
         <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{delay: 0.3}}>
            <Card className="group flex flex-col justify-between h-full hover:bg-primary/10 transition-colors duration-300 ease-in-out transform hover:-translate-y-1">
                <CardHeader>
                <Package className="h-8 w-8 text-primary mb-2 group-hover:text-accent transition-colors" />
                <CardTitle>Explore Packages</CardTitle>
                <CardDescription>Find your next adventure from our curated list of travel packages.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href="/packages">
                    <Button variant="link" className="p-0">Browse Packages &rarr;</Button>
                    </Link>
                </CardContent>
            </Card>
        </motion.div>
        <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{delay: 0.4}}>
            <Card className="group flex flex-col justify-between h-full hover:bg-primary/10 transition-colors duration-300 ease-in-out transform hover:-translate-y-1">
                <CardHeader>
                <Plane className="h-8 w-8 text-primary mb-2 group-hover:text-accent transition-colors" />
                <CardTitle>My Bookings</CardTitle>
                <CardDescription>View your current and past trip bookings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href="/dashboard/user/bookings">
                    <Button variant="link" className="p-0">View Bookings &rarr;</Button>
                    </Link>
                </CardContent>
            </Card>
        </motion.div>
      </div>
    </div>
  );
}

import { mockPackages } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Plane, Star, LogOut, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserDashboardPage() {

  return (
    <div className="p-4 md:p-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/packages">
         <Card className="group flex flex-col justify-between h-full hover:bg-primary/10 transition-colors duration-300 ease-in-out transform hover:-translate-y-1">
            <CardHeader>
              <Package className="h-8 w-8 text-primary mb-2 group-hover:text-accent transition-colors" />
              <CardTitle>Explore Packages</CardTitle>
              <CardDescription>Find your next adventure from our curated list of travel packages.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="p-0">Browse Packages &rarr;</Button>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/user/bookings">
          <Card className="group flex flex-col justify-between h-full hover:bg-primary/10 transition-colors duration-300 ease-in-out transform hover:-translate-y-1">
            <CardHeader>
              <Plane className="h-8 w-8 text-primary mb-2 group-hover:text-accent transition-colors" />
              <CardTitle>My Bookings</CardTitle>
              <CardDescription>View your current and past trip bookings.</CardDescription>
            </CardHeader>
            <CardContent>
               <Button variant="link" className="p-0">View Bookings &rarr;</Button>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/user/reviews">
          <Card className="group flex flex-col justify-between h-full hover:bg-primary/10 transition-colors duration-300 ease-in-out transform hover:-translate-y-1">
            <CardHeader>
              <Star className="h-8 w-8 text-primary mb-2 group-hover:text-accent transition-colors" />
              <CardTitle>My Reviews</CardTitle>
              <CardDescription>See all the reviews you have submitted for agents.</CardDescription>
            </CardHeader>
             <CardContent>
               <Button variant="link" className="p-0">Manage Reviews &rarr;</Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}

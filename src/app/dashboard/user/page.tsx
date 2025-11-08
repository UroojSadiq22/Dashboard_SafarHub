import { mockPackages } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import Link from "next/link";

export default function UserDashboardPage() {
  // Mock bookings for the current user
  const userBookings = [
    { id: "book-1", packageId: "pkg-1", status: "confirmed", pax: 2 },
    { id: "book-2", packageId: "pkg-4", status: "pending", pax: 1 },
  ];

  const getPackageDetails = (packageId: string) => {
    return mockPackages.find(p => p.id === packageId);
  }

  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>My Bookings</CardTitle>
          <CardDescription>Here are all the trips you've booked or inquired about.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trip</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userBookings.map((booking) => {
                const pkg = getPackageDetails(booking.packageId);
                if (!pkg) return null;

                return (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{pkg.title}</TableCell>
                    <TableCell>{pkg.destination}</TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                        className={booking.status === 'confirmed' ? 'bg-green-600' : ''}
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                       <Button variant="outline" size="sm" asChild>
                         <Link href={`/packages/${pkg.id}`}>
                            <Eye className="mr-2 h-4 w-4" /> View Trip
                         </Link>
                       </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

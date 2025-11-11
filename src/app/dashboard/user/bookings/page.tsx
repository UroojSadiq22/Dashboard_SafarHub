'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockBookings } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";

export default function BookingsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 } // Corrected visible y to 0
  };

  const getStatusVariant = (status: string) => {
    switch(status) {
      case 'Confirmed': return 'default';
      case 'Pending': return 'secondary';
      case 'Completed': return 'outline';
      default: return 'destructive';
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Plane className="h-6 w-6 text-primary" />
        My Bookings
      </h1>
      {mockBookings.length > 0 ? (
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead>Destination</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody asChild>
                <motion.tbody variants={containerVariants} initial="hidden" animate="visible">
                  {mockBookings.map((booking) => (
                    <motion.tr 
                      key={booking.id} 
                      className="border-white/10"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, backgroundColor: 'hsl(var(--card))' }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <TableCell className="font-medium">{booking.destination}</TableCell>
                      <TableCell>{booking.agent}</TableCell>
                      <TableCell>{booking.date}</TableCell>
                      <TableCell>{booking.price}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={getStatusVariant(booking.status) as any}>{booking.status}</Badge>
                      </TableCell>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <motion.div 
          className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-white/20 rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Plane className="w-16 h-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold">You haven’t made any bookings yet.</h3>
          <p className="text-muted-foreground mt-2">Start exploring packages to plan your next adventure!</p>
        </motion.div>
      )}
    </div>
  );
}

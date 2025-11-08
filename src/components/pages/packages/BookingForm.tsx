"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { submitInquiry } from "@/actions/inquiry";
import type { Package } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface BookingFormProps {
  pkg: Package;
}

const initialState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Send Inquiry
        </>
      )}
    </Button>
  );
}

export function BookingForm({ pkg }: BookingFormProps) {
  const [state, formAction] = useActionState(submitInquiry, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Inquiry Sent!",
          description: state.message,
        });
      } else {
         toast({
          variant: "destructive",
          title: "Submission Failed",
          description: state.message,
        });
      }
    }
  }, [state, toast]);

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Book This Trip</CardTitle>
        <CardDescription>
          Send an inquiry and our agents will get back to you shortly.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <input type="hidden" name="packageId" value={pkg.id} />
        <input type="hidden" name="destination" value={pkg.destination} />
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pax">Number of Travelers</Label>
              <Input id="pax" name="pax" type="number" min="1" defaultValue="1" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="travelDates">Preferred Dates</Label>
              <Input id="travelDates" name="travelDates" placeholder="e.g., June 2024" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests</Label>
            <Textarea
              id="specialRequests"
              name="specialRequests"
              placeholder="e.g., dietary restrictions, accessibility needs"
            />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}

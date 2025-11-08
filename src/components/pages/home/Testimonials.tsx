import { mockReviews } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-12 md:py-20 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">What Our Travelers Say</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Stories from travelers who booked their dream vacation through SafarHub.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={`https://picsum.photos/seed/${review.userId}/48/48`} />
                    <AvatarFallback>{review.userId.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">User {review.userId.slice(-2)}</p>
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                      {[...Array(5 - review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-muted-foreground/50" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">&quot;{review.comment}&quot;</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

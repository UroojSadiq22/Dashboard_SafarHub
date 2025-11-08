import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>My Wishlist</CardTitle>
          <CardDescription>Packages you've saved for later.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
            <Heart className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">Your Wishlist is Empty</h3>
            <p className="text-muted-foreground mt-2">Start exploring packages and add your favorites here!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

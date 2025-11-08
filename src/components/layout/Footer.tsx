import Link from "next/link";
import { MountainSnow } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background/50">
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <MountainSnow className="h-6 w-6 text-primary" />
            <span className="font-bold">SafarHub</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            Your one-stop marketplace for unforgettable travel experiences.
          </p>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SafarHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

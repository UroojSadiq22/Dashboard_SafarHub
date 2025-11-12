"use client";

import Link from "next/link";
import { Plane, Menu, MountainSnow } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";


const navLinks = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#destinations", label: "Popular Destinations" },
  { href: "/#testimonials", label: "Testimonials" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state

  // In a real app, this would be replaced with a proper auth hook
  useEffect(() => {
    // This is a mock check. For now, we assume user is not logged in on public pages.
    // Dashboard pages handle their own state.
    setIsLoggedIn(false);
  }, [pathname]);

  const NavLink = ({
    href,
    label,
    className,
  }: {
    href: string;
    label: string;
    className?: string;
  }) => {
    const isHome = pathname === '/';
    const isAnchor = href.startsWith('/#');

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isAnchor && isHome) {
        e.preventDefault();
        const targetId = href.substring(2);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (isAnchor && !isHome) {
        // Navigate to home and then scroll
        router.push(href);
      }
    };
    
    return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        "text-muted-foreground",
        className
      )}
    >
      {label}
    </Link>
  )};

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-8 flex items-center gap-2">
          <MountainSnow className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block">SafarHub</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
           <ThemeToggle />
          {isLoggedIn ? (
              <Button variant="outline" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-6 pt-8">
                <Link href="/" className="mr-8 flex items-center gap-2">
                  <MountainSnow className="h-6 w-6 text-primary" />
                  <span className="font-bold">SafarHub</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <NavLink
                        {...link}
                        className="text-lg"
                      />
                    </SheetClose>
                  ))}
                  <div className="border-t pt-4">
                  {isLoggedIn ? (
                     <div className="flex flex-col gap-4">
                        <SheetClose asChild>
                           <Link href="/dashboard" className="text-lg text-muted-foreground font-medium transition-colors hover:text-primary">Dashboard</Link>
                        </SheetClose>
                     </div>
                  ) : (
                     <div className="flex flex-col gap-4">
                       <SheetClose asChild>
                         <Link href="/login" className="text-lg text-muted-foreground font-medium transition-colors hover:text-primary">Log in</Link>
                       </SheetClose>
                        <SheetClose asChild>
                         <Link href="/signup" className="text-lg text-muted-foreground font-medium transition-colors hover:text-primary">Sign up</Link>
                       </SheetClose>
                     </div>
                  )}
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

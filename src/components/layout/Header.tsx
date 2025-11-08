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
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/packages", label: "Packages" },
  { href: "/agents", label: "Agents" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#testimonials", label: "Testimonials" },
];

export default function Header() {
  const pathname = usePathname();

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
      }
    };
    
    return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        pathname === href
          ? "text-primary"
          : "text-muted-foreground",
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
           <Button variant="ghost" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
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
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

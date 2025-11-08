"use client";

import Link from "next/link";
import { Plane, Menu, MountainSnow, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  { href: "/packages", label: "Packages" },
  { href: "/agents", label: "Agents" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#testimonials", label: "Testimonials" },
];

export default function Header() {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      toast({ title: "Signed out successfully." });
      router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign out failed.",
        description: error.message,
      });
    }
  };

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
          {!isUserLoading && user ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
               <Button variant="ghost" asChild>
                <Link href="/dashboard/user/settings">Settings</Link>
              </Button>
               <Avatar className="h-9 w-9">
                <AvatarImage src={user.photoURL || undefined} />
                <AvatarFallback>{user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="icon" onClick={handleSignOut} aria-label="Sign out">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : !isUserLoading && (
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
                  {!isUserLoading && user ? (
                     <div className="flex flex-col gap-4">
                        <SheetClose asChild>
                           <Link href="/dashboard" className="text-lg text-muted-foreground font-medium transition-colors hover:text-primary">Dashboard</Link>
                        </SheetClose>
                        <SheetClose asChild>
                           <Link href="/dashboard/user/settings" className="text-lg text-muted-foreground font-medium transition-colors hover:text-primary">Settings</Link>
                        </SheetClose>
                        <Button variant="ghost" onClick={handleSignOut} className="text-lg justify-start text-muted-foreground font-medium">Sign Out</Button>
                     </div>
                  ) : !isUserLoading && (
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

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MountainSnow } from "lucide-react";
import Link from "next/link";
import { useAuth, useFirestore } from "@/firebase";
import { 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SignupPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "agent">("user");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || !firestore) {
       toast({
        variant: "destructive",
        title: "Signup Failed",
        description: "Firebase not initialized.",
      });
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await updateProfile(user, { displayName: name });

      await setDoc(doc(firestore, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: user.email,
        role: role,
        phone: ""
      });

      toast({ title: "Signup Successful" });
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message,
      });
    } finally {
        setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
     if (!auth || !firestore) return;
    setIsGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(firestore, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
         await setDoc(userDocRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          role: 'user', 
          phone: user.phoneNumber || ""
        }, { merge: true });
      }
      
      toast({ title: "Google Sign-In Successful" });
      router.push("/dashboard");
    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Google Sign-In Failed",
        description: error.message,
      });
    } finally {
        setIsGoogleLoading(false);
    }
  };


  return (
     <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
       <div className="flex items-center justify-center py-12">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto grid w-[350px] gap-6"
          >
            <Card className="w-full max-w-sm shadow-2xl bg-card/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                <MountainSnow className="mx-auto h-10 w-10 text-primary mb-4" />
                <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
                <CardDescription>Join SafarHub to start your next adventure</CardDescription>
                </CardHeader>
                <form onSubmit={handleSignUp}>
                <CardContent className="grid gap-4">
                    <Button 
                    variant="outline" 
                    className="w-full" 
                    type="button" 
                    onClick={handleGoogleSignIn}
                    disabled={isLoading || isGoogleLoading}
                    >
                    <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                        <path
                        fill="currentColor"
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.05 1.05-2.36 1.62-3.82 1.62-3.32 0-6.03-2.75-6.03-6.12s2.7-6.12 6.03-6.12c1.87 0 3.13.78 4.08 1.68l2.5-2.5C18.43 2.1 15.72 1 12.48 1 7.03 1 3 5.03 3 10.5s4.03 9.5 9.48 9.5c2.83 0 5.1-1 6.8-2.65 1.8-1.7 2.6-4.2 2.6-6.8V10.92h-7.84z"
                        />
                    </svg>
                    {isGoogleLoading ? "Signing up..." : "Sign up with Google"}
                    </Button>
                    <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card/80 px-2 text-muted-foreground">
                        Or continue with
                        </span>
                    </div>
                    </div>
                    <div className="grid gap-2">
                    <Label>I am a...</Label>
                    <RadioGroup 
                        defaultValue="user" g
                        className="grid grid-cols-2 gap-4"
                        value={role}
                        onValueChange={(value) => setRole(value as "user" | "agent")}
                        disabled={isLoading || isGoogleLoading}
                    >
                        <div>
                        <RadioGroupItem value="user" id="user" className="peer sr-only" />
                        <Label
                            htmlFor="user"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                            Traveler
                        </Label>
                        </div>
                        <div>
                        <RadioGroupItem value="agent" id="agent" className="peer sr-only" />
                        <Label
                            htmlFor="agent"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                            Agent
                        </Label>
                        </div>
                    </RadioGroup>
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                        id="name" 
                        placeholder="John Doe" 
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isLoading || isGoogleLoading}
                    />
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                        id="email" 
                        type="email" 
                        placeholder="m@example.com" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading || isGoogleLoading}
                    />
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                        id="password" 
                        type="password" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading || isGoogleLoading}
                    />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full" type="submit" disabled={isLoading || isGoogleLoading}>
                        {isLoading ? "Creating Account..." : "Create account"}
                    </Button>
                    <div className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline font-semibold">
                        Log in
                    </Link>
                    </div>
                </CardFooter>
                </form>
            </Card>
        </motion.div>
       </div>
        <div className="hidden bg-muted lg:block relative">
            <Image
                src="https://picsum.photos/seed/auth-bg/1200/1800"
                alt="Image"
                layout="fill"
                objectFit="cover"
                className="brightness-50"
                data-ai-hint="travel background"
            />
        </div>
     </div>
  );
}

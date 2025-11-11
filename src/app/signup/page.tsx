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
import { useAuth } from "@/firebase";
import { 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import Image from "next/image";

type Role = 'user' | 'agent' | 'admin';

const getMockRole = (email?: string | null): Role => {
  if (!email) return 'user';
  if (email.includes('admin')) return 'admin';
  if (email.includes('agent')) return 'agent';
  return 'user';
}

export default function SignupPage() {
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "agent">("user");
  const [isLoading, setIsLoading] = useState(false);
  <change>
    <file>/src/app/dashboard/user/reviews/page.tsx</file>
    <content><![CDATA['use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { mockUserReviews } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";


export default function ReviewsPage() {
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
    visible: { opacity: 1, y: 0 }
  };
  return (
    <div>
       <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Star className="h-6 w-6 text-primary" />
        My Reviews
      </h1>
      {mockUserReviews.length > 0 ? (
        <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" variants={containerVariants} initial="hidden" animate="visible">
          {mockUserReviews.map((review) => (
            <motion.div key={review.id} variants={itemVariants}>
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 h-full flex flex-col">
                <CardHeader>
                  <CardTitle>{review.destination}</CardTitle>
                  <CardDescription>Review for {review.agentName}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                    <p className="italic text-muted-foreground">&quot;{review.comment}&quot;</p>
                    <div className="flex items-center mt-4">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={cn(
                                    "w-5 h-5",
                                    i < review.rating ? "fill-accent text-accent" : "text-slate-500"
                                )}
                            />
                        ))}
                    </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-white/20 rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Star className="w-16 h-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold">No reviews yet.</h3>
          <p className="text-muted-foreground mt-2">Complete a trip to leave a review!</p>
        </motion.div>
      )}
    </div>
  );
}

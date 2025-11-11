'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUser, useAuth } from "@/firebase";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { motion } from 'framer-motion';
import { mockUserProfile } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings } from "lucide-react";


export default function SettingsPage() {
    const { user } = useUser();
    const auth = useAuth();
    const { toast } = useToast();

    const [name, setName] = useState(mockUserProfile.name);
    const [phone, setPhone] = useState(mockUserProfile.phone);
    
    useEffect(() => {
        if (user) {
            setName(user.displayName || mockUserProfile.name);
        }
    }, [user]);

    const handleSaveChanges = async () => {
        if (!user || !auth?.currentUser) return;

        try {
            await updateProfile(auth.currentUser, { displayName: name });
            // In a real app, you would also update Firestore here.
            toast({
                title: "Profile Updated",
                description: "Your changes have been saved successfully.",
            });

        } catch (error: any) {
             toast({
                variant: "destructive",
                title: "Update Failed",
                description: error.message,
            });
        }
    };

    const handleChangePassword = async () => {
        if (!user?.email) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "No email address found for your account.",
            });
            return;
        }

        try {
            await sendPasswordResetEmail(auth, user.email);
            toast({
                title: "Password Reset Email Sent",
                description: `An email has been sent to ${user.email} with instructions to reset your password.`,
            });
        } catch (error: any) {
             toast({
                variant: "destructive",
                title: "Failed to Send Email",
                description: error.message,
            });
        }
    }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
       <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Settings className="h-6 w-6 text-primary" />
        My Profile
      </h1>
      <Card className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-md p-6 border-white/10">
        <CardHeader className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-primary">
                <AvatarImage src={user?.photoURL || `https://picsum.photos/seed/${user?.uid}/100/100`} />
                <AvatarFallback>{(user?.displayName || mockUserProfile.name)?.[0]}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
                <CardTitle className="text-2xl">{user?.displayName || mockUserProfile.name}</CardTitle>
                <CardDescription className="text-accent">{mockUserProfile.role}</CardDescription>
                <CardDescription>Joined on {mockUserProfile.joined}</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="space-y-6 mt-6">
            <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={user?.email || mockUserProfile.email} disabled/>
            </div>
             <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleSaveChanges}>Save Changes</Button>
                <Button variant="secondary" onClick={handleChangePassword}>Change Password</Button>
            </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

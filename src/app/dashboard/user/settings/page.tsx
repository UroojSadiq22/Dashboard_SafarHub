'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUser, useFirestore, useMemoFirebase, useAuth } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useDoc } from "@/firebase/firestore/use-doc";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { updateProfile } from "firebase/auth";
import { motion } from 'framer-motion';


export default function SettingsPage() {
    const { user } = useUser();
    const firestore = useFirestore();
    const auth = useAuth();
    const { toast } = useToast();

    const userDocRef = useMemoFirebase(() => user ? doc(firestore, "users", user.uid) : null, [user, firestore]);
    const { data: userData } = useDoc(userDocRef);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    
    useEffect(() => {
        if (userData) {
            setName(userData.name || "");
            setPhone(userData.phone || "");
        }
    }, [userData]);

    const handleSaveChanges = async () => {
        if (!user || !firestore || !auth) return;

        try {
            // Update Firestore document
            await setDoc(userDocRef, { name, phone }, { merge: true });

            // Update Auth profile
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { displayName: name });
            }

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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-md p-6">
        <CardHeader>
          <CardTitle className="text-2xl">Profile Settings</CardTitle>
          <CardDescription>Manage your profile and account information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={user?.email || ""} disabled/>
            </div>
             <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" value={userData?.role} disabled />
            </div>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

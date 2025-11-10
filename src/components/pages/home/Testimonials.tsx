"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { mockReviews } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const testimonials = mockReviews.map(review => ({
    ...review,
    destination: "Maldives", // Example destination
    name: `User ${review.userId.slice(-2)}`
}));


export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setTimeout(handleNext, 5000);
    return () => clearTimeout(timer);
  }, [index]);

  const visibleTestimonials = [
    testimonials[index],
    testimonials[(index + 1) % testimonials.length],
    testimonials[(index + 2) % testimonials.length],
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight font-headline">
            What Our Travelers Say ✈️
          </h2>
          <p className="mt-3 text-lg text-slate-300 max-w-2xl mx-auto font-body">
            Hear from those who explored the world with us.
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          <button onClick={handlePrev} className="absolute left-0 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white disabled:opacity-50 -translate-x-1/2">
            <ArrowLeft size={24}/>
          </button>
          
          <div className="flex w-full max-w-6xl gap-6">
            <AnimatePresence mode="popLayout">
                {visibleTestimonials.map((review, i) => (
                    <motion.div
                        key={review.id}
                        className={cn(
                            "w-1/3 flex-shrink-0 transition-all duration-300",
                             i === 1 ? 'z-10' : 'z-0'
                        )}
                        initial={{ opacity: 0, x: 100, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: i === 1 ? 1.05 : 0.9, transition: { delay: i * 0.1 } }}
                        exit={{ opacity: 0, x: -100, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    >
                        <Card review={review} />
                    </motion.div>
                ))}
            </AnimatePresence>
          </div>
          
          <button onClick={handleNext} className="absolute right-0 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white disabled:opacity-50 translate-x-1/2">
            <ArrowRight size={24}/>
          </button>
        </div>
      </div>
    </section>
  );
}

const Card = ({ review }: { review: typeof testimonials[0] }) => {
    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 h-full flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 animate-glow">
            <div>
                <div className="flex items-center mb-4">
                    <Avatar className="h-14 w-14 mr-4 border-2 border-accent">
                        <AvatarImage src={`https://picsum.photos/seed/${review.userId}/56/56`} />
                        <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold text-lg text-amber-300">{review.name}</p>
                        <p className="text-sm text-slate-400">{review.destination}</p>
                    </div>
                </div>
                <p className="text-slate-200 font-body italic">&quot;{review.comment}&quot;</p>
            </div>
            <div className="flex items-center mt-4">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 + i * 0.1 } }}
                    >
                        <Star
                            className={cn(
                                "w-5 h-5",
                                i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-500"
                            )}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
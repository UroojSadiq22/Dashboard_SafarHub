"use client";

import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { mockReviews } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const testimonials = mockReviews.map(review => ({
    ...review,
    destination: "Maldives", // Example destination
    name: `User ${review.userId.slice(-2)}`
}));


export default function Testimonials() {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

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
        
        <div className="w-full overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{
                x: ['0%', '-100%'],
              }}
              transition={{
                ease: 'linear',
                duration: 20,
                repeat: Infinity,
              }}
            >
              {duplicatedTestimonials.map((review, i) => (
                <div key={`${review.id}-${i}`} className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
                  <Card review={review} />
                </div>
              ))}
            </motion.div>
        </div>

      </div>
    </section>
  );
}

const Card = ({ review }: { review: typeof testimonials[0] }) => {
    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 h-full flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
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
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
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

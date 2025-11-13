// "use client";

// import React, { useRef, useState } from "react";
// import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Star } from "lucide-react";
// import { mockReviews } from "@/lib/mock-data";
// import { cn } from "@/lib/utils";

// const testimonials = mockReviews.map(review => ({
//     ...review,
//     destination: "Maldives", // Example destination
//     name: `User ${review.userId.slice(-2)}`
// }));

// export default function Testimonials() {
//   const [isHovering, setIsHovering] = useState(false);
//   const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

//   return (
//     <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-br from-emerald-100 to-emerald-200 text-white overflow-hidden">
//       <div className="container">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold tracking-tight font-headline">
//             What Our Travelers Say ✈️
//           </h2>
//           <p className="mt-3 text-lg text-slate-300 max-w-2xl mx-auto font-body">
//             Hear from those who explored the world with us.
//           </p>
//         </div>

//         <div className="relative w-full flex flex-col items-center justify-center">
//         <div className="relative w-full max-w-7xl overflow-hidden">
//           {/* Left Blur Overlay */}
//           <div className="absolute left-0 top-0 h-full w-16 md:w-40 bg-gradient-to-r from-emerald-100 to-transparent z-50 pointer-events-none" />

//           {/* Right Blur Overlay */}
//           <div className="absolute right-0 top-0 h-full w-16 md:w-40 bg-gradient-to-l from-emerald-200 to-transparent z-50 pointer-events-none" />

//           <div
//           className="w-full overflow-hidden"
//           onMouseEnter={() => setIsHovering(true)}
//           onMouseLeave={() => setIsHovering(false)}
//         >
//             <motion.div
//               className="flex gap-6"
//               animate={{
//                 x: ['0%', '-100%'],
//               }}
//               transition={{
//                 ease: 'linear',
//                 duration: 40,
//                 repeat: Infinity,
//               }}
//               style={{
//                 animationPlayState: isHovering ? 'paused' : 'running'
//               }}
//             >
//               {duplicatedTestimonials.map((review, i) => (
//                 <div key={`${review.id}-${i}`} className="w-[90vw] md:w-[400px] flex-shrink-0">
//                   <Card review={review} />
//                 </div>
//               ))}
//             </motion.div>
//         </div>
//         </div>
//       </div>

//       </div>
//     </section>
//   );
// }

// const Card = ({ review }: { review: typeof testimonials[0] }) => {
//     const cardRef = useRef<HTMLDivElement>(null);

//     const x = useMotionValue(0);
//     const y = useMotionValue(0);

//     const mouseXSpring = useSpring(x);
//     const mouseYSpring = useSpring(y);

//     const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
//     const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

//     const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//         if (!cardRef.current) return;

//         const rect = cardRef.current.getBoundingClientRect();
//         const width = rect.width;
//         const height = rect.height;
//         const mouseX = e.clientX - rect.left;
//         const mouseY = e.clientY - rect.top;

//         const xPct = mouseX / width - 0.5;
//         const yPct = mouseY / height - 0.5;

//         x.set(xPct);
//         y.set(yPct);
//     }

//     const handleMouseLeave = () => {
//         x.set(0);
//         y.set(0);
//     }

//     return (
//         <motion.div
//             ref={cardRef}
//             onMouseMove={handleMouseMove}
//             onMouseLeave={handleMouseLeave}
//             style={{
//                 rotateY,
//                 rotateX,
//                 transformStyle: "preserve-3d",
//             }}
//             className="bg-white/10 backdrop-blur-lg rounded-xl p-6 h-full flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 border border-transparent hover:border-primary/50"
//         >
//             <div style={{
//                 transform: "translateZ(50px)",
//             }}>
//                 <div className="flex items-center mb-4">
//                     <Avatar className="h-14 w-14 mr-4 border-2 border-accent">
//                         <AvatarImage src={`https://picsum.photos/seed/${review.userId}/56/56`} />
//                         <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
//                     </Avatar>
//                     <div>
//                         <p className="font-bold text-lg text-amber-300">{review.name}</p>
//                         <p className="text-sm text-slate-400">{review.destination}</p>
//                     </div>
//                 </div>
//                 <p className="text-slate-200 font-body italic">&quot;{review.comment}&quot;</p>
//             </div>
//             <div className="flex items-center mt-4" style={{
//                 transform: "translateZ(25px)",
//             }}>
//                 {[...Array(5)].map((_, i) => (
//                     <Star
//                         key={i}
//                         className={cn(
//                             "w-5 h-5",
//                             i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-500"
//                         )}
//                     />
//                 ))}
//             </div>
//         </motion.div>
//     )
// }

"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { mockReviews } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const testimonials = mockReviews.map((review) => ({
  ...review,
  destination: "Maldives", // Example destination
  name: `User ${review.userId.slice(-2)}`,
}));

export default function Testimonials() {
  const [isHovering, setIsHovering] = useState(false);
  const duplicatedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section
      id="testimonials"
      className="relative py-16 md:py-24 bg-gradient-to-l from-teal-50 to-cyan-100 dark:from-slate-900 dark:to-slate-800 text-foreground dark:text-white overflow-hidden"
    >
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight font-headline">
            What Our Travelers Say ✈️
          </h2>
          <p className="mt-3 text-lg text-muted-foreground dark:text-slate-300 max-w-2xl mx-auto font-body">
            Hear from those who explored the world with us.
          </p>
        </div>

        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-teal-100 dark:from-slate-800 to-transparent z-10 pointer-events-none" />
          <motion.div
            className="flex gap-6"
            animate={{
              x: ["0%", "-100%"],
            }}
            transition={{
              ease: "linear",
              duration: 40,
              repeat: Infinity,
            }}
            style={{
              animationPlayState: isHovering ? "paused" : "running",
            }}
          >
            {duplicatedTestimonials.map((review, i) => (
              <div
                key={`${review.id}-${i}`}
                className="w-[90vw] md:w-[400px] flex-shrink-0"
              >
                <Card review={review} />
              </div>
            ))}
          </motion.div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-teal-50 dark:from-slate-900 to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

const Card = ({ review }: { review: (typeof testimonials)[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="bg-card/60 dark:bg-white/10 backdrop-blur-lg rounded-xl p-6 h-full flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 border border-white/20 hover:border-primary/50"
    >
      <div
        style={{
          transform: "translateZ(50px)",
        }}
      >
        <div className="flex items-center mb-4">
          <Avatar className="h-14 w-14 mr-4 border-2 border-accent">
            <AvatarImage
              src={`https://picsum.photos/seed/${review.userId}/56/56`}
            />
            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-lg text-primary dark:text-amber-300">
              {review.name}
            </p>
            <p className="text-sm text-muted-foreground dark:text-slate-400">
              {review.destination}
            </p>
          </div>
        </div>
        <p className="text-foreground/80 dark:text-slate-200 font-body italic">
          &quot;{review.comment}&quot;
        </p>
      </div>
      <div
        className="flex items-center mt-4"
        style={{
          transform: "translateZ(25px)",
        }}
      >
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "w-5 h-5",
              i < review.rating
                ? "fill-amber-400 text-amber-400"
                : "text-slate-400 dark:text-slate-500"
            )}
          />
        ))}
      </div>
    </motion.div>
  );
};

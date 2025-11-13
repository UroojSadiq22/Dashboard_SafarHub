// 'use client';

// import { motion, useScroll, useTransform } from 'framer-motion';
// import { useRef } from 'react';

// // const Plane3D = () => (
// //     <svg
// //       xmlns="http://www.w3.org/2000/svg"
// //       viewBox="0 0 200 200"
// //       className="w-full h-full transform -rotate-45"
// //       style={{ filter: "drop-shadow(0 10px 8px rgb(0 0 0 / 0.2))" }}
// //     >
// //       <defs>
// //         <linearGradient id="grad-body" x1="0%" y1="0%" x2="100%" y2="100%">
// //           <stop offset="0%" style={{ stopColor: 'hsl(var(--primary-foreground))', stopOpacity: 1 }} />
// //           <stop offset="100%" style={{ stopColor: 'hsl(var(--muted))', stopOpacity: 1 }} />
// //         </linearGradient>
// //         <linearGradient id="grad-wing" x1="0%" y1="0%" x2="100%" y2="100%">
// //           <stop offset="0%" style={{ stopColor: 'hsl(var(--muted-foreground))', stopOpacity: 0.8 }} />
// //           <stop offset="100%" style={{ stopColor: 'hsl(var(--secondary))', stopOpacity: 1 }} />
// //         </linearGradient>
// //         <linearGradient id="grad-tail" x1="0%" y1="0%" x2="100%" y2="100%">
// //           <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
// //           <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
// //         </linearGradient>
// //       </defs>
// //       {/* Main Body */}
// //       <path d="M20,100 L180,20 L160,100 L180,180 Z" fill="url(#grad-body)" />
// //       {/* Wing */}
// //       <path d="M100,60 Q140,80 100,100 Q60,80 100,60 Z" fill="url(#grad-wing)" transform="skewY(-20) translate(-10, 20)" />
// //       {/* Tail Fin */}
// //       <path d="M160,100 L180,80 L190,100 L180,120 Z" fill="url(#grad-tail)" />
// //        {/* Cockpit */}
// //       <circle cx="45" cy="100" r="8" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2"/>
// //     </svg>
// // );

// export default function FloatingPlane() {
//   const targetRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//     offset: ['start start', 'end end'],
//   });

//   const x = useTransform(
//     scrollYProgress,
//     [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
//     ['40vw', '80vw', '20vw', '75vw', '10vw', '90vw', '25vw', '50vw']
//   );

//   const y = useTransform(
//     scrollYProgress,
//     [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
//     ['30vh', '80vh', '130vh', '180vh', '230vh', '280vh', '330vh', '380vh', '430vh', '480vh', '485vh']
//   );

//   const scale = useTransform(
//     scrollYProgress,
//     [0, 0.1, 0.25, 0.5, 0.75, 0.95, 1],
//     [2.5, 0.8, 1, 0.5, 1.1, 0.8, 0.5]
//   );

//   const rotate = useTransform(
//     scrollYProgress,
//     [0, 0.25, 0.5, 0.75, 1],
//     [25, -15, 35, -20, 0]
//   );

//   return (
//     <div ref={targetRef} className="absolute inset-0 w-full h-[500vh] pointer-events-none">
//       <motion.div
//         style={{ x, y, scale, rotate }}
//         className="fixed top-0 left-0 w-32 h-32 text-primary z-[10]"
//       >
//         <img
//             src="/plane.png"
//             alt="Floating plane"
//             className="w-full h-full object-contain pointer-events-none select-none"
//             draggable={false}
//         />
//       </motion.div>
//     </div>
//   );
// }
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function FloatingPlane() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Listen to entire page scroll (not section-limited)
  const { scrollYProgress } = useScroll();

  // Control horizontal flight path
  const x = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.5, 0.6, 0.8, 1],
    ["70vw", "20vw", "10vw", "50vw", "70vw", "80vw", "8vw"]
  );

  // Control vertical floating effect (gentle bobbing)
  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["30vh", "35vh", "32vh", "37vh", "33vh", "84vh"]
  );

  // Slight scaling to create depth illusion
  const scale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.25, 0.5, 0.75, 0.95, 1],
    [2.5, 1.8, 1, 1.2, 1.1, 0.8, 0.5]
  );

  // Subtle rotation as it “turns”
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [-10, -15, -60, -10, 5]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.8, 0.9, 1, 0.75, 1]
  );

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[0]">
      <motion.div
        style={{ x, y, scale, rotate, opacity }}
        className="absolute w-32 h-32 text-primary"
      >
        <img
          src="/plane.png"
          alt="Floating plane"
          className="w-full h-full object-contain select-none"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}

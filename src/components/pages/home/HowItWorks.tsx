// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Search, UserCheck, Briefcase, Plane } from "lucide-react";

// const steps = [
//   {
//     icon: <Search className="w-10 h-10 text-chart-1" />,
//     title: "1. Search Your Dream Destination",
//     description: "Use our powerful search to discover vetted travel agents or browse through unique, ready-to-book travel packages for every style.",
//     color: "text-chart-1",
//     bg: "bg-chart-1/10"
//   },
//   {
//     icon: <UserCheck className="w-10 h-10 text-chart-2" />,
//     title: "2. Compare Verified Travel Agents",
//     description: "Connect directly with agents to plan a custom trip or inquire about a package. Get expert advice to tailor your perfect itinerary.",
//     color: "text-chart-2",
//     bg: "bg-chart-2/10"
//   },
//   {
//     icon: <Briefcase className="w-10 h-10 text-chart-3" />,
//     title: "3. Book With Confidence",
//     description: "Finalize your travel plans and book securely through our platform. All our agents are verified for your peace of mind.",
//     color: "text-chart-3",
//     bg: "bg-chart-3/10"
//   },
//   {
//     icon: <Plane className="w-10 h-10 text-chart-4" />,
//     title: "4. Travel & Enjoy",
//     description: "Embark on your adventure with peace of mind, knowing you have support and a well-planned itinerary.",
//     color: "text-chart-4",
//     bg: "bg-chart-4/10"
//   },
// ]

// export default function HowItWorks() {
//   return (
//     <section id="how-it-works" className="py-16 md:py-24 bg-card">
//       <div className="container relative z-1">
//         <div className="text-center mb-12">
//           <h2 className="font-headline text-4xl font-bold tracking-tight">How It Works</h2>
//           <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto font-body">
//             Your journey to an unforgettable vacation in 3 simple steps.
//           </p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {steps.map((step, index) => (
//             <Card key={index} className="text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
//               <CardHeader>
//                 <div className={`mx-auto rounded-full h-20 w-20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${step.bg}`}>
//                   {step.icon}
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <CardTitle className={`font-headline text-xl mb-2 transition-colors group-hover:${step.color}`}>{step.title}</CardTitle>
//                 <p className="text-muted-foreground text-sm font-body">{step.description}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



// 'use client';

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";
// import { Search, UserCheck, Briefcase, Plane, Lightbulb } from "lucide-react";

// const steps = [
//   {
//     icon: <Search className="w-8 h-8" />,
//     title: "1. Search & Discover",
//     description: "Explore vetted travel agents or browse unique, ready-to-book packages for every travel style.",
//     color: "#FBBF24", // amber-400
//   },
//   {
//     icon: <UserCheck className="w-8 h-8" />,
//     title: "2. Compare & Connect",
//     description: "Connect with verified agents to plan a custom trip or inquire about a package. Get expert advice.",
//     color: "#2DD4BF", // teal-400
//   },
//   {
//     icon: <Briefcase className="w-8 h-8" />,
//     title: "3. Book With Confidence",
//     description: "Finalize your travel plans and book securely through our platform with verified agents.",
//     color: "#F87171", // red-400
//   },
//   {
//     icon: <Plane className="w-8 h-8" />,
//     title: "4. Travel & Enjoy!",
//     description: "Embark on your adventure with peace of mind, knowing you have support and a well-planned itinerary.",
//     color: "#60A5FA", // blue-400
//   },
// ];

// const CIRCLE_POSITIONS = [
//   { cx: "20%", cy: "50%" }, // Top-left
//   { cx: "80%", cy: "28%" }, // Top-right
//   { cx: "80%", cy: "80%" }, // Bottom-right
//   { cx: "20%", cy: "80%" }, // Bottom-left
// ];

// const PATH_DEFINITIONS = [
//   "M 100 50 A 50 50 0 0 1 150 100", // Path 1 to 2
//   "M 150 100 A 50 50 0 0 1 100 150", // Path 2 to 3
//   "M 100 150 A 50 50 0 0 1 50 100",  // Path 3 to 4
//   "M 50 100 A 50 50 0 0 1 100 50",   // Path 4 to 1
// ];


// export default function HowItWorks() {
//   const targetRef = useRef<HTMLDivElement | null>(null);
//   const { scrollYProgress } = useScroll({
//     target: targetRef,
//     offset: ["start start", "end end"],
//   });

//   const path1Length = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
//   const path2Length = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
//   const path3Length = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
//   const path4Length = useTransform(scrollYProgress, [0.75, 1], [0, 1]);

//   return (
//     <section id="how-it-works" ref={targetRef} className="relative h-[400vh] bg-background ">
//       <div className="sticky top-0 h-screen flex md:flex-row flex-col items-center justify-center overflow-hidden">
//         <div className="text-center mt-5 mb-12 absolute top-10">
//           <h2 className="font-headline text-4xl font-bold tracking-tight">How It Works</h2>
//           <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto font-body">
//             Your journey to an unforgettable vacation in 4 simple steps.
//           </p>
//         </div>

//         <div className="relative w-[350px] h-[350px] md:w-[500px] md:h-[500px]">
//           {/* Central Idea */}
//            <motion.div 
//              className="absolute inset-0 flex flex-col items-center justify-center text-center"
//              style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])}}
//            >
//             <Lightbulb className="w-12 h-12 text-primary mb-2" />
//             <h3 className="font-bold text-lg">Your Idea</h3>
//             <p className="text-sm text-muted-foreground">Starts Here</p>
//           </motion.div>

//           {/* SVG Container */}
//           <svg className="w-full h-full" viewBox="0 0 200 200">
//              {/* Paths */}
//              <motion.path d={PATH_DEFINITIONS[0]} fill="none" stroke={steps[0].color} strokeWidth="2" style={{ pathLength: path1Length }} />
//              <motion.path d={PATH_DEFINITIONS[1]} fill="none" stroke={steps[1].color} strokeWidth="2" style={{ pathLength: path2Length }} />
//              <motion.path d={PATH_DEFINITIONS[2]} fill="none" stroke={steps[2].color} strokeWidth="2" style={{ pathLength: path3Length }} />
//              <motion.path d={PATH_DEFINITIONS[3]} fill="none" stroke={steps[3].color} strokeWidth="2" style={{ pathLength: path4Length }} />
//           </svg>

//           {/* Step Circles and Text */}
//           {steps.map((step, index) => {
//             const start = index * 0.25;
//             const end = start + 0.25;
//             const opacity = useTransform(scrollYProgress, [start, (start + end) / 2], [0, 1]);
//             const scale = useTransform(scrollYProgress, [start, (start + end) / 2], [0.8, 1]);

//             return (
//               <motion.div
//                 key={index}
//                 className="absolute w-1/3 text-center"
//                 style={{
//                   top: `calc(${CIRCLE_POSITIONS[index].cy} - 16.66%)`,
//                   left: `calc(${CIRCLE_POSITIONS[index].cx} - 16.66%)`,
//                   opacity,
//                   scale,
//                 }}
//               >
//                 <div 
//                     className="relative w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full border-4 flex items-center justify-center transition-all duration-300" 
//                     style={{ borderColor: step.color }}
//                 >
//                   <div className="absolute inset-0 bg-current opacity-10 rounded-full"></div>
//                   <div style={{color: step.color}}>{step.icon}</div>
//                 </div>
//                 <h3 className="mt-2 font-bold text-sm md:text-base">{step.title}</h3>
//                 <p className="text-xs text-muted-foreground hidden md:block">{step.description}</p>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }








'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Search, UserCheck, Briefcase, Plane } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    icon: <Search className="w-8 h-8" />,
    title: "1. Search & Discover",
    description: "Explore vetted travel agents or browse unique, ready-to-book packages for every travel style.",
  },
  {
    icon: <UserCheck className="w-8 h-8" />,
    title: "2. Compare & Connect",
    description: "Connect with verified agents to plan a custom trip or inquire about a package.",
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "3. Book With Confidence",
    description: "Finalize your plans and book securely through our platform with verified agents.",
  },
  {
    icon: <Plane className="w-8 h-8" />,
    title: "4. Travel & Enjoy!",
    description: "Embark on your adventure with peace of mind, knowing you have support.",
  },
];

export default function HowItWorks() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const path1Length = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const path2Length = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const path3Length = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  const step1Opacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const step2Opacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const step3Opacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const step4Opacity = useTransform(scrollYProgress, [0.75, 0.95], [0, 1]);


  return (
    <section id="how-it-works" ref={targetRef} className="relative h-[500vh] bg-gradient-to-l from-teal-50 to-cyan-100 dark:from-slate-900 dark:to-slate-800">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="text-center mb-12 absolute top-16 ">
          <motion.h2 
  className="font-headline text-4xl font-bold tracking-tight"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  viewport={{ once: true, amount: 0.2 }}
>
  How It Works
</motion.h2>
          <motion.p 
            className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto font-body"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]) }}
          >
            Your journey to an unforgettable vacation in 4 simple steps.
          </motion.p>
        </div>

        <div className="relative w-full max-w-6xl h-[60vh]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 400">
             {/* Paths */}
             <motion.path d="M 150 300 L 450 200" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="1" style={{ pathLength: path1Length }} />
             <motion.path d="M 450 200 L 750 300" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="1" style={{ pathLength: path2Length }} />
             <motion.path d="M 750 300 L 1050 200" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="1" style={{ pathLength: path3Length }} />
          </svg>

          {/* Step 1 */}
          <motion.div className="absolute w-48" style={{ top: '75%', left: '12.5%', transform: 'translate(-50%, -50%)', opacity: step1Opacity }}>

              <Card className="bg-card/60 dark:bg-white/10 backdrop-blur-lg border border-chart-1/20 hover:border-chart-1 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
              <CardHeader>
                <div className={`mx-auto rounded-full h-20 w-20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 bg-chart-1/10`}>
                  {steps[0].icon}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className={`font-headline text-xl mb-2 transition-colors group-hover:text-chart-1`}>{steps[0].title}</CardTitle>
                <p className="text-muted-foreground text-xs font-body">{steps[0].description}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Step 2 */}
           <motion.div className="absolute w-48" style={{ top: '50%', left: '37.5%', transform: 'translate(-50%, -50%)', opacity: step2Opacity }}>

             <Card className="bg-card/60 dark:bg-white/10 backdrop-blur-lg border border-chart-2/20 hover:border-chart-2 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
              <CardHeader>
                <div className={`mx-auto rounded-full h-20 w-20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 bg-chart-2/10`}>
                  {steps[1].icon}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className={`font-headline text-xl mb-2 transition-colors group-hover:text-chart-2`}>{steps[1].title}</CardTitle>
                <p className="text-muted-foreground text-xs font-body">{steps[1].description}</p>
              </CardContent>
            </Card>
          </motion.div>
          
           {/* Step 3 */}
           <motion.div className="absolute w-48" style={{ top: '75%', left: '62.5%', transform: 'translate(-50%, -50%)', opacity: step3Opacity }}>

             <Card className="bg-card/60 dark:bg-white/10 backdrop-blur-lg border border-chart-3/20 hover:border-chart-3 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
              <CardHeader>
                <div className={`mx-auto rounded-full h-20 w-20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 bg-chart-3/10`}>
                  {steps[2].icon}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className={`font-headline text-xl mb-2 transition-colors group-hover:text-chart-3`}>{steps[2].title}</CardTitle>
                <p className="text-muted-foreground text-xs font-body">{steps[2].description}</p>
              </CardContent>
            </Card>
          </motion.div>

           {/* Step 4 */}
           <motion.div className="absolute w-48" style={{ top: '50%', left: '87.5%', transform: 'translate(-50%, -50%)', opacity: step4Opacity }}>

             <Card className="bg-card/60 dark:bg-white/10 backdrop-blur-lg border border-chart-4/20 hover:border-chart-4 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
              <CardHeader>
                <div className={`mx-auto rounded-full h-20 w-20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 bg-chart-4/10`}>
                  {steps[3].icon}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className={`font-headline text-xl mb-2 transition-colors group-hover:text-chart-4`}>{steps[3].title}</CardTitle>
                <p className="text-muted-foreground text-xs font-body">{steps[3].description}</p>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

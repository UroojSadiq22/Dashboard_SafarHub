// import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { ShieldCheck, BadgePercent, Star } from "lucide-react";

// const features = [
//   {
//     icon: <ShieldCheck className="w-8 h-8 text-primary" />,
//     title: "Verified Agents",
//     description: "Every agent on our platform is carefully vetted to ensure quality, reliability, and excellent service.",
//   },
//   {
//     icon: <BadgePercent className="w-8 h-8 text-primary" />,
//     title: "Transparent Pricing",
//     description: "No hidden fees. Compare packages and services with clear, upfront pricing to find the best deal.",
//   },
//   {
//     icon: <Star className="w-8 h-8 text-primary" />,
//     title: "Authentic Reviews",
//     description: "Read real reviews from travelers like you to book with confidence and make informed decisions.",
//   },
// ];

// export default function WhyChooseUs() {
//   return (
//     <section className="py-16 md:py-24 bg-secondary/50">
//       <div className="container">
//         <div className="text-center mb-12">
//           <h2 className="font-headline text-4xl font-bold tracking-tight">Why Choose SafarHub?</h2>
//           <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto font-body">
//             Verified agents, transparent pricing, and authentic traveler reviews.
//           </p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <Card key={index} className="flex flex-col items-center text-center p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
//               <CardHeader>
//                 <div className="bg-primary/10 rounded-full p-4 mb-4">
//                     {feature.icon}
//                 </div>
//                 <CardTitle>{feature.title}</CardTitle>
//               </CardHeader>
//               <CardDescription>{feature.description}</CardDescription>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Layers, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-cyan-300" />,
    title: 'Verified Agents',
    description: 'Every agent is carefully vetted for quality, reliability, and excellent service.',
    bgClass: 'from-cyan-500/20 to-blue-500/20',
    glowClass: 'group-hover:shadow-[0_0_20px_5px] group-hover:shadow-cyan-500/40',
  },
  {
    icon: <Layers className="w-8 h-8 text-purple-300" />,
    title: 'Best Value',
    description: 'No hidden fees. Compare packages with clear, upfront pricing to find the best deal for you.',
    bgClass: 'from-purple-500/20 to-indigo-500/20',
    glowClass: 'group-hover:shadow-[0_0_20px_5px] group-hover:shadow-purple-500/40',
  },
  {
    icon: <Sparkles className="w-8 h-8 text-amber-300" />,
    title: 'Unmatched Quality',
    description: 'Read authentic reviews from travelers to book with confidence and make informed decisions.',
    bgClass: 'from-amber-500/20 to-orange-500/20',
    glowClass: 'group-hover:shadow-[0_0_20px_5px] group-hover:shadow-amber-500/40',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-headline text-4xl font-bold tracking-tight">Why Choose SafarHub?</h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Your passport to seamless, secure, and spectacular travel experiences.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <Card className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-lg h-full border-white/10 transition-all duration-300 hover:border-white/30 hover:scale-105">
                <CardHeader className="flex flex-col items-center text-center p-8">
                  <div className={`relative rounded-full p-5 mb-5 bg-gradient-to-br ${feature.bgClass} transition-all duration-300 ${feature.glowClass}`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="font-headline text-xl text-black dark:text-neutral-100">{feature.title}</CardTitle>
                  <CardDescription className="mt-2 text-muted-foreground">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

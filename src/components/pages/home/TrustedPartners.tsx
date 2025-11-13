"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const partners = [
  { src: "/partner1.png", alt: "Expedia" },
  { src: "/partner2.png", alt: "Tripadvisor" },
  { src: "/partner3.png", alt: "Airbnb" },
  { src: "/partner4.png", alt: "Booking.com" },
  { src: "/partner5.png", alt: "Traveloka" },
  { src: "/partner6.png", alt: "Skyscanner" },
];

export default function TrustedPartners() {
  return (
    <section className=" bg-gray-800 dark:bg-neutral-900 py-10 border-t border-neutral-200 dark:border-neutral-700">
      <h2 className="relative z-1 font-headline text-4xl font-bold tracking-tight text-center md:text-3xl mb-6 text-black dark:text-neutral-100">
        Trusted by Our Travel Partners
      </h2>
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{
            x: ["0%", "100%"],
          }}
          transition={{
            ease: "linear",
            duration: 50,
            repeat: Infinity,
          }}
        >
          {partners.map((partner, index) => (
            <div key={index} className="mx-12 flex items-center justify-center">
              <Image
                src={partner.src}
                alt={partner.alt}
                width={150}
                height={80}
                className="opacity-80 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

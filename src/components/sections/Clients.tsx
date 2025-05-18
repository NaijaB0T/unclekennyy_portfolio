'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const clients = [
  "Universal Music", "Sony Music", "Warner Bros", "Netflix", "Disney+", 
  "Coca-Cola", "Pepsi", "Adidas", "Nike", "Apple", "Google", "Amazon", 
  "MTN", "Airtel", "Globacom", "Microsoft", "Samsung", "Beats by Dre"
];

const Clients = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="py-20 bg-[#111] relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              We collaborate with <span className="text-[#ff6d00]">leading</span> companies
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col space-y-6"
          >
            <p className="text-white">
              Our <span className="text-[#ff6d00]">Clients</span>: Our Success. From <span className="text-[#ff6d00]">startups</span> to industry <span className="text-[#ff6d00]">leaders</span>, we help brands tell their stories and connect with their audience.
            </p>
            <a href="#contact" className="text-[#ff6d00] inline-flex items-center hover:underline">
              LET&apos;S CREATE →
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Client logos marquee */}
      <div className="overflow-hidden py-8 bg-black bg-opacity-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="marquee"
        >
          <div className="marquee-content inline-flex space-x-16 items-center">
            {clients.map((client, index) => (
              <span key={index} className="text-2xl font-bold text-white opacity-80 whitespace-nowrap">
                {client}
              </span>
            ))}
            {/* Duplicate for seamless loop */}
            {clients.map((client, index) => (
              <span key={`dup-${index}`} className="text-2xl font-bold text-white opacity-80 whitespace-nowrap">
                {client}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;
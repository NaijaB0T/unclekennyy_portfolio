'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const equipmentCategories = [
  {
    id: 1,
    name: 'CAMERAS',
    image: '/Portfolio Assets/kenny_4.jpg',
  },
  {
    id: 2,
    name: 'LIGHTING',
    image: '/Portfolio Assets/kenny_5.jpg',
  },
  {
    id: 3,
    name: 'AUDIO',
    image: '/Portfolio Assets/kenny_6.jpg',
  },
  {
    id: 4,
    name: 'LENSES',
    image: '/Portfolio Assets/kenny_7.jpg',
  },
  {
    id: 5,
    name: 'STABILIZERS',
    image: '/Portfolio Assets/kenny_8.jpg',
  },
  {
    id: 6,
    name: 'DRONES',
    image: '/Portfolio Assets/kenny_9.jpg',
  },
];

const Equipment = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section 
      id="equipment" 
      ref={sectionRef}
      className="py-24 bg-black relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left text block */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-white text-3xl lg:text-4xl font-bold mb-6">
              Equipment Rental
            </h2>
            <p className="text-white mb-6">
              Access our extensive inventory of professional-grade equipment for your next project. From cameras and lenses to lighting and audio gear, we provide premium equipment to bring your creative vision to life.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center text-[#ff6d00] hover:underline"
            >
              VIEW ALL RENTAL →
            </a>
          </motion.div>
          
          {/* Right horizontal scroll */}
          <motion.div 
            className="lg:col-span-3 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div 
              ref={horizontalScrollRef}
              className="flex space-x-6 overflow-x-auto pb-6 snap-x scrollbar-hide"
              style={{ scrollbarWidth: 'none' }}
            >
              {equipmentCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="min-w-[260px] bg-white rounded-xl overflow-hidden shadow-lg flex-shrink-0 snap-start cursor-pointer hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-52">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 260px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-black font-bold">{category.name}</h3>
                  </div>
                </motion.div>
              ))}
              
              {/* View all card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.5, delay: 0.2 + equipmentCategories.length * 0.1 }}
                className="min-w-[260px] bg-[#ff6d00] rounded-xl overflow-hidden shadow-lg flex-shrink-0 snap-start cursor-pointer flex items-center justify-center hover:bg-opacity-90 transition-colors"
              >
                <div className="p-4 text-center">
                  <h3 className="text-white font-bold text-lg">VIEW ALL EQUIPMENT</h3>
                  <span className="text-white text-2xl mt-2">→</span>
                </div>
              </motion.div>
            </div>
            
            {/* Scroll indicator */}
            <div className="mt-6 flex justify-center lg:justify-end">
              <p className="text-gray-500 text-sm">← Scroll to see more →</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Equipment;
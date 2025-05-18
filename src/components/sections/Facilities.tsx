'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '@/components/utils/ThemeContext';

const facilities = [
  {
    id: 1,
    title: 'Audio Studio',
    description: 'State-of-the-art recording facility with professional-grade equipment for music production, voice-overs, and audio post-production.',
    imageSrc: '/Portfolio Assets/3574974151405107441_1.mp4'
  },
  {
    id: 2,
    title: 'Video Studio',
    description: 'Spacious video studio with customizable sets, green screen, and advanced lighting systems for versatile video productions.',
    imageSrc: '/Portfolio Assets/3445257413150794646_2.mp4'
  },
  {
    id: 3,
    title: 'Photo Studio',
    description: 'Professional photography studio equipped with premium lighting setups and backdrops for high-quality photoshoots.',
    imageSrc: '/Portfolio Assets/3459857002977563149_2.mp4'
  }
];

const Facilities = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const { theme } = useTheme();

  return (
    <section 
      id="facilities" 
      ref={sectionRef}
      className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-[#f5f5f5] text-black' : 'bg-[#111] text-white'}`}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={`text-3xl lg:text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-black' : 'text-white'}`}>
              Our facilities are designed for your most <span className="text-[#ff6d00]">creative</span> and <span className="text-[#ff6d00]">innovative</span> ideas.
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className={`${theme === 'dark' ? 'text-black' : 'text-white'} text-lg mb-4`}>
              UncleKenny Studios offers world-class facilities designed to bring your creative vision to life. Our spaces combine cutting-edge technology with comfortable, inspiring environments.
            </p>
            <p className={`${theme === 'dark' ? 'text-black' : 'text-white'} text-lg`}>
              Whether you&apos;re recording music, shooting a video, or conducting a photoshoot, our facilities provide everything you need for a successful production.
            </p>
          </motion.div>
        </div>
        
        {/* Facility Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
              className="relative h-80 rounded-xl overflow-hidden cursor-pointer group perspective-1000"
              onMouseEnter={() => setActiveCard(facility.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className={`absolute inset-0 w-full h-full transition-all duration-500 transform ${activeCard === facility.id ? 'rotate-y-180 invisible' : 'rotate-y-0 visible'}`}>
                <div className="absolute inset-0 bg-[#ff6d00] rounded-xl flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{facility.title}</h3>
                  
                  {/* Abstract 3D object */}
                  <div className="absolute -right-10 -bottom-10 w-2/3 h-2/3 opacity-30">
                    {facility.id === 1 && (
                      <div className="w-full h-full rounded-full bg-white blur-md"></div>
                    )}
                    {facility.id === 2 && (
                      <div className="w-full h-full rounded-xl bg-white blur-md transform rotate-45"></div>
                    )}
                    {facility.id === 3 && (
                      <div className="w-full h-full clip-triangle bg-white blur-md"></div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className={`absolute inset-0 w-full h-full transition-all duration-500 transform ${activeCard === facility.id ? 'rotate-y-0 visible' : 'rotate-y-180 invisible'}`}>
                <div className="absolute inset-0 bg-black rounded-xl overflow-hidden">
                  {facility.imageSrc.endsWith('.mp4') ? (
                    <video 
                      className="w-full h-full object-cover"
                      autoPlay={activeCard === facility.id}
                      loop
                      muted
                      playsInline
                    >
                      <source src={facility.imageSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={facility.imageSrc}
                      alt={facility.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-70 p-6 flex flex-col justify-end">
                    <h3 className="text-white text-2xl font-bold mb-3">{facility.title}</h3>
                    <p className="text-white text-sm mb-4">{facility.description}</p>
                    <a href="#contact" className="text-[#ff6d00] text-sm hover:underline">
                      LEARN MORE →
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
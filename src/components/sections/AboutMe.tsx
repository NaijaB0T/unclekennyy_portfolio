'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/components/utils/ThemeContext';

// Kenny's photos for the slideshow
const kennyPhotos = [
  { id: 1, path: '/Portfolio Assets/kenny_1_cover.jpg' },
  { id: 2, path: '/Portfolio Assets/kenny_2.jpg' },
  { id: 3, path: '/Portfolio Assets/kenny_3.jpg' },
  { id: 4, path: '/Portfolio Assets/kenny_4.jpg' },
  { id: 5, path: '/Portfolio Assets/kenny_5.jpg' },
  { id: 6, path: '/Portfolio Assets/kenny_6.jpg' },
  { id: 7, path: '/Portfolio Assets/kenny_7.jpg' },
  { id: 8, path: '/Portfolio Assets/kenny_8.jpg' },
  { id: 9, path: '/Portfolio Assets/kenny_9.jpg' },
  { id: 10, path: '/Portfolio Assets/kenny_10.jpg' },
  { id: 11, path: '/Portfolio Assets/kenny_11.jpg' },
  { id: 12, path: '/Portfolio Assets/kenny_12.jpg' },
  { id: 13, path: '/Portfolio Assets/kenny_13.jpg' },
  { id: 14, path: '/Portfolio Assets/kenny_14.jpg' },
];

const AboutMe = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const slideshowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme } = useTheme();

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % kennyPhotos.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="about" 
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
              About Me
            </h2>
            <p className="text-white mb-6">
              I'm Kenny, a cinematographer and creative director with over 10 years of experience crafting visual stories. My passion lies in capturing authentic moments and translating creative visions into compelling visual narratives.
            </p>
            <p className="text-white mb-6">
              With expertise in commercial filmmaking, music videos, and documentary work, I bring technical precision and artistic vision to every project. My approach combines innovative cinematography techniques with a deep understanding of storytelling to create visuals that resonate with audiences.
            </p>
            <p className="text-white mb-6">
              Having worked with brands, artists, and production companies across Nigeria and internationally, I pride myself on my collaborative approach and ability to adapt to diverse creative challenges.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center text-[#ff6d00] hover:underline"
            >
              LET'S WORK TOGETHER →
            </a>
          </motion.div>
          
          {/* Right slideshow */}
          <motion.div 
            className="lg:col-span-3 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
              {kennyPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <Image
                    src={photo.path}
                    alt={`Kenny - Cinematographer`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
              
              {/* Slideshow navigation dots */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
                {kennyPhotos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-[#ff6d00]' : 'bg-white bg-opacity-50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Experience highlights */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <div className="bg-gray-900 rounded-lg p-4">
                <h3 className="text-[#ff6d00] text-2xl font-bold">10+</h3>
                <p className="text-white text-sm">Years Experience</p>
              </div>
              <div className="bg-gray-900 rounded-lg p-4">
                <h3 className="text-[#ff6d00] text-2xl font-bold">200+</h3>
                <p className="text-white text-sm">Projects Completed</p>
              </div>
              <div className="bg-gray-900 rounded-lg p-4">
                <h3 className="text-[#ff6d00] text-2xl font-bold">15+</h3>
                <p className="text-white text-sm">Awards Won</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
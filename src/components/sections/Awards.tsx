'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '@/components/utils/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Awards data
const awards = [
  {
    id: 1,
    title: 'Best Cinematography',
    event: 'Lagos Film Festival',
    year: '2024',
    project: 'Urban Chronicles'
  },
  {
    id: 2,
    title: 'Gold Award',
    event: 'International Visual Arts Awards',
    year: '2023',
    project: 'Beyond Horizons'
  },
  {
    id: 3,
    title: 'Best Music Video',
    event: 'African Music Video Awards',
    year: '2023',
    project: 'Rhythm & Soul'
  },
  {
    id: 4,
    title: 'Excellence in Commercial Work',
    event: 'Advertising Industry Awards',
    year: '2022',
    project: 'Premium Experience'
  },
  {
    id: 5,
    title: 'Best Visual Effects',
    event: 'Digital Arts Society Awards',
    year: '2022',
    project: 'Dreamscapes'
  }
];

const Awards = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Timeline animation for the line and awards
    const awards = sectionRef.current.querySelectorAll('.award-item');
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 70%',
        toggleActions: 'play none none none'
      }
    });
    
    if (lineRef.current) {
      tl.fromTo(lineRef.current, 
        { height: 0 }, 
        { height: '100%', duration: 1.5, ease: 'power2.out' }, 
        0
      );
    }
    
    awards.forEach((award, index) => {
      tl.fromTo(award, 
        { opacity: 0, x: -50 }, 
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, 
        0.3 + (index * 0.2)
      );
    });
    
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, [isInView]);

  return (
    <section 
      ref={sectionRef}
      className={`py-24 relative overflow-hidden ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
      }`}
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 
            ref={titleRef}
            className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}
          >
            Awards & <span className="text-[#ff6d00]">Recognition</span>
          </h2>
          
          <div className="w-24 h-1 bg-[#ff6d00] mx-auto mt-6"></div>
        </motion.div>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 md:transform md:-translate-x-1/2 w-1">
            <div 
              ref={lineRef}
              className="h-full w-full bg-gradient-to-b from-[#ff6d00] to-[#ff9d00] rounded-full"
            ></div>
          </div>
          
          {/* Award Items */}
          <div className="relative z-10 space-y-16">
            {awards.map((award, index) => (
              <div 
                key={award.id} 
                className={`award-item relative ${
                  index % 2 === 0 
                    ? 'md:ml-auto md:text-right' 
                    : 'ml-8 md:ml-0 md:mr-auto'
                } md:w-[calc(50%-40px)] pl-8 md:pl-0 ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-0 md:left-auto ${
                  index % 2 === 0 
                    ? 'md:right-0 md:translate-x-1/2' 
                    : 'md:left-0 md:-translate-x-1/2'
                } top-0 transform -translate-x-1/2 w-6 h-6 bg-[#ff6d00] rounded-full border-4 ${
                  theme === 'dark' ? 'border-gray-900' : 'border-gray-100'
                }`}></div>
                
                <div className={`p-6 rounded-xl shadow-lg ${
                  theme === 'dark' 
                    ? 'bg-black text-white' 
                    : 'bg-white text-black'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#ff6d00]">{award.title}</h3>
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      theme === 'dark' 
                        ? 'bg-gray-800 text-white' 
                        : 'bg-gray-200 text-black'
                    }`}>{award.year}</span>
                  </div>
                  
                  <p className="text-lg mb-2">{award.event}</p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>Project: {award.project}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
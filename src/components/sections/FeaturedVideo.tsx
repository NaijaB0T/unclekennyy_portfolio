'use client';

import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import VideoPlayer from '@/components/utils/VideoPlayer';
import { useTheme } from '@/components/utils/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeaturedVideo = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { theme } = useTheme();
  
  useEffect(() => {
    // Set up animations to synchronize with the hero section
    if (sectionRef.current && contentRef.current) {
      // This timeline will run as soon as the hero section's animation completes
      gsap.set(contentRef.current, { 
        opacity: 0,
        y: 30
      });
      
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", // Start animation when top of section reaches bottom of viewport
          end: "top center",  // End animation when top of section reaches center of viewport
          toggleActions: "play none none none", // Play animation once when triggered
        }
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`pt-16 pb-24 ${theme === 'dark' ? 'bg-black' : 'bg-white'} relative overflow-hidden -mt-1`}
      id="featured"
    >
      <div 
        ref={contentRef} 
        className="container mx-auto px-6 relative z-20"
      >
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Featured Project
          </h2>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-lg`}>
            Our latest commercial project showcases our expertise in storytelling, cinematography, and visual effects. Experience the cinematic quality that defines our work.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <VideoPlayer 
            src="/Portfolio Assets/3386748659635854057_1.mp4" 
            poster="/Portfolio Assets/kenny_1_cover.jpg"
            className="w-full aspect-video shadow-2xl"
          />
        </div>
        
        <div className="mt-10 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                "Essence" - Brand Campaign
              </h3>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Client: Luxury Fashion Brand
              </p>
            </div>
            <a href="#contact" className="btn-primary">
              Discuss Your Project →
            </a>
          </div>
          
          <div className={`mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            <div>
              <h4 className="text-[#ff6d00] font-bold mb-2">Direction</h4>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Creative direction focused on emotional storytelling and visual impact.
              </p>
            </div>
            <div>
              <h4 className="text-[#ff6d00] font-bold mb-2">Cinematography</h4>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Shot on RED Digital Cinema with anamorphic lenses for cinematic quality.
              </p>
            </div>
            <div>
              <h4 className="text-[#ff6d00] font-bold mb-2">Post-Production</h4>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Premium color grading and visual effects to enhance the narrative.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideo;
'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/components/utils/ThemeContext';

const services = [
  { title: "MUSIC VIDEOS", color: "gold" },
  { title: "FILMS", color: "green" },
  { title: "COMMERCIALS", color: "blue" },
  { title: "TV SERIES", color: "red" }
];

const Hero = () => {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const { theme } = useTheme();
  const textRef = useRef<HTMLDivElement>(null);
  const footerLeftRef = useRef<HTMLDivElement>(null);
  const footerRightRef = useRef<HTMLDivElement>(null);
  
  // Declare mouse position state for interactive effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // State for footer hints animation
  const [footerHintsVisible, setFooterHintsVisible] = useState(false);

  // Set up service cycling in a separate effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 3000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Update opacity/visibility on scroll
  useEffect(() => {
    // Handle fade-in on initial load
    const footerTimer = setTimeout(() => {
      setFooterHintsVisible(true);
    }, 800);

    return () => {
      clearTimeout(footerTimer);
    };
  }, []);
  
  // Separate effect for scroll handling to avoid re-running the initial animation
  useEffect(() => {
    // Track scroll for text animation
    const handleScroll = () => {
      // Hide footer hints when scrolling down
      if (window.scrollY > window.innerHeight * 0.3) {
        setFooterHintsVisible(false);
      } else {
        setFooterHintsVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Track mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20; // -10 to 10
      const y = (e.clientY / window.innerHeight - 0.5) * 20; // -10 to 10
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Dynamic color class based on current service
  const getFluidClass = () => {
    switch (services[currentServiceIndex].color) {
      case 'gold':
        return 'bg-gradient-to-r from-[#d6a83c] via-[#f2d377] to-[#d6a83c]';
      case 'green':
        return 'bg-gradient-to-r from-[#0c8461] via-[#0fb17d] to-[#0c8461]';
      case 'blue':
        return 'bg-gradient-to-r from-[#0a3573] via-[#1956b5] to-[#0a3573]';
      case 'red': // <-- Added red case
        return 'bg-gradient-to-r from-[#B91C1C] via-[#EF4444] to-[#B91C1C]';
      default:
        return 'bg-gradient-to-r from-[#d6a83c] via-[#f2d377] to-[#d6a83c]'; // Or choose a different default if preferred
    }
  };

  // No scroll effects needed - Hero should stay static
  const textOpacity = 1;
  const rectOpacity = 1;

  return (
    <section 
      id="hero"
      className="h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ 
        backgroundImage: theme === 'dark' 
          ? 'linear-gradient(180deg, #0a0a0a 0%, #121212 100%)' 
          : 'linear-gradient(180deg, #f5f5f5 0%, #e5e5e5 100%)'
      }}
    >
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center">
        <div
          ref={textRef}
          className={`text-7xl md:text-9xl font-bold mb-8 text-center ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}
          style={{
            opacity: textOpacity,
            transition: 'opacity 0.3s ease-out',
          }}
        >
          I SHOOT
        </div>
        
        <div 
          className={`relative w-80 md:w-96 h-40 rounded-xl flex items-center justify-center shadow-lg overflow-hidden ${getFluidClass()}`}
          style={{ 
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            transform: `translate(${mousePosition.x / 2}px, ${mousePosition.y / 2}px) rotate(${mousePosition.x / 50}deg)`,
            opacity: rectOpacity,
            transition: 'opacity 0.4s ease-out',
          }}
        >
          {/* Floating blobs effect */}
          <div 
            className="absolute w-32 h-32 rounded-full bg-white opacity-10 blur-md"
            style={{
              top: '20%',
              left: '10%',
              animation: 'floatBlob1 8s ease-in-out infinite alternate',
            }}
          ></div>
          
          <div 
            className="absolute w-24 h-24 rounded-full bg-white opacity-10 blur-md"
            style={{
              bottom: '30%',
              right: '15%',
              animation: 'floatBlob2 12s ease-in-out infinite alternate',
            }}
          ></div>
          
          <h2 className="text-white text-2xl md:text-3xl font-bold z-10 flex items-center justify-center h-full relative">
            {services[currentServiceIndex].title}
          </h2>
        </div>
      </div>
      
      {/* Footer Hints with animation */}
      <div 
        className="absolute bottom-0 left-0 w-full px-6 py-4 flex justify-between text-opacity-60 text-sm"
      >
        <div 
          ref={footerLeftRef}
          className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}
          style={{
            opacity: footerHintsVisible ? 1 : 0,
            transform: footerHintsVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
          }}
        >
          UNCLE KENNY
        </div>
        <div 
          ref={footerRightRef}
          className="flex space-x-4"
          style={{
            opacity: footerHintsVisible ? 1 : 0,
            transform: footerHintsVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s', // slight delay for staggered effect
          }}
        >
          <span className={`cursor-pointer ${theme === 'dark' ? 'text-white hover:text-white' : 'text-black hover:text-black'} transition-colors`}>INSTAGRAM</span>
          <span className={`cursor-pointer ${theme === 'dark' ? 'text-white hover:text-white' : 'text-black hover:text-black'} transition-colors`}>LINKEDIN</span>
        </div>
      </div>
      
      {/* Scroll indicator - make it more prominent */}
      <div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce"
        style={{
          opacity: footerHintsVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div className={`w-10 h-16 border-2 rounded-full flex justify-center items-start ${theme === 'dark' ? 'border-white' : 'border-black'}`}>
          <div 
            className={`w-2 h-4 rounded-full mt-2 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}
          />
        </div>
        <p className={`text-center mt-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Scroll down</p>
      </div>
      
      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes floatBlob1 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, 20px) scale(1.2); }
          100% { transform: translate(-10px, 10px) scale(0.8); }
        }
        
        @keyframes floatBlob2 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-15px, -25px) scale(1.3); }
          100% { transform: translate(15px, -10px) scale(0.9); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
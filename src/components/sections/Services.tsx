'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTheme } from '@/components/utils/ThemeContext';

// Define services data
const serviceData = [
  {
    id: 1,
    title: 'Video Production',
    description: 'From concept to final cut, we create stunning video content that tells your story with impact. Our team handles every aspect of production with meticulous attention to detail.',
    videoSrc: '/Portfolio Assets/3386748659635854057_1.mp4',
  },
  {
    id: 2,
    title: 'Music Videos',
    description: 'We specialize in crafting visually compelling music videos that elevate artists and captivate audiences, combining creative direction with technical excellence.',
    videoSrc: '/Portfolio Assets/3221507813161477626_1.mp4',
  },
  {
    id: 3,
    title: '3D & CGI',
    description: 'Our cutting-edge 3D and CGI capabilities allow us to create immersive visual experiences that blur the line between reality and imagination.',
    videoSrc: '/Portfolio Assets/3459857002977563149_1.mp4',
  },
  {
    id: 4,
    title: 'Commercial Production',
    description: 'We create compelling commercial content that resonates with your target audience and drives measurable results for your brand.',
    videoSrc: '/Portfolio Assets/3445257413150794646_1.mp4',
  },
  {
    id: 5,
    title: 'Photography',
    description: 'Our photography services capture the essence of your brand, product, or event with a distinct cinematic approach that sets your visuals apart.',
    videoSrc: '/Portfolio Assets/3574974151405107441_1.mp4',
  }
];

const Services = () => {
  const [activeService, setActiveService] = useState(serviceData[0]);
  const [currentDescription, setCurrentDescription] = useState(serviceData[0].description);
  const [isDescriptionChanging, setIsDescriptionChanging] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const serviceCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // IntersectionObserver for card reveal animations and description updates
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px', // Adjust to detect when card is centered in viewport
      threshold: [0.1, 0.5, 0.9],
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          const cardElement = entry.target as HTMLElement;
          
          // Animate card
          cardElement.style.opacity = '1';
          cardElement.style.transform = 'translateY(0)';
          
          // If it's a service card, update the active service
          const serviceId = cardElement.dataset.serviceId;
          if (serviceId) {
            const service = serviceData.find(s => s.id === parseInt(serviceId));
            if (service && service.id !== activeService.id) {
              console.log('Setting active service to:', service.title);
              setActiveService(service);
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all service cards
    serviceCardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Handle description text changes with cross-fade animation
  useEffect(() => {
    if (activeService.description !== currentDescription) {
      // Start the cross-fade animation
      setIsDescriptionChanging(true);
      
      // After the fade-out, update the text
      const timeout = setTimeout(() => {
        setCurrentDescription(activeService.description);
        
        // Fade in the new text
        const fadeInTimeout = setTimeout(() => {
          setIsDescriptionChanging(false);
        }, 150);
        
        return () => clearTimeout(fadeInTimeout);
      }, 150);
      
      return () => clearTimeout(timeout);
    }
  }, [activeService, currentDescription]);
  
  // Set references for service cards
  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    serviceCardsRef.current[index] = el;
  };

  return (
    <section 
      id="services" 
      className={`py-24 relative ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left column (sticky) */}
          <div className="lg:sticky lg:top-32 lg:h-[calc(100vh-15rem)]">
            <h2 className="text-[#ff6d00] text-4xl md:text-5xl font-bold mb-8">OUR SERVICES</h2>
            <div className="h-1 w-16 bg-[#ff6d00] mb-8"></div>
            <div className="max-w-lg space-y-4 relative h-32"> {/* Fixed height for text container */}
              <p 
                className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-lg absolute transition-opacity duration-300`}
                style={{ 
                  opacity: isDescriptionChanging ? 0 : 1,
                }}
              >
                {currentDescription}
              </p>
              <a href="#contact" className="inline-flex items-center text-[#ff6d00] hover:underline mt-4 absolute bottom-0">
                LEARN MORE →
              </a>
            </div>
            
            {/* Theme toggle button (for desktop) */}
            <div className="hidden lg:block mt-12">
              <button 
                onClick={toggleTheme}
                className={`inline-flex items-center rounded-full px-4 py-2 text-sm transition-colors ${
                  theme === 'dark' 
                    ? 'bg-black border border-white text-white hover:bg-gray-900' 
                    : 'bg-white border border-black text-black hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{theme === 'dark' ? '☀️' : '🌙'}</span>
                {theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}
              </button>
            </div>
          </div>
          
          {/* Right column (scrollable cards) */}
          <div className="space-y-8">
            {serviceData.map((service, index) => (
              <div
                key={service.id}
                ref={(el) => setCardRef(el, index)}
                data-service-id={service.id}
                className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  theme === 'dark' 
                    ? (activeService.id === service.id ? 'border-2 border-[#ff6d00] bg-[#111]' : 'border border-gray-800 bg-[#111]')
                    : (activeService.id === service.id ? 'border-2 border-[#ff6d00] bg-white' : 'border border-gray-300 bg-white')
                }`}
                onClick={() => setActiveService(service)}
                style={{
                  opacity: 0,
                  transform: 'translateY(20px)',
                  transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                  transitionDelay: `${index * 0.1}s`,
                }}
              >
                <div className="relative aspect-video overflow-hidden">
                  {service.videoSrc.endsWith('.mp4') ? (
                    <video 
                      className="w-full h-full object-cover"
                      autoPlay={activeService.id === service.id}
                      loop
                      muted
                      playsInline
                    >
                      <source src={service.videoSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="relative h-full w-full">
                      <Image
                        src={service.videoSrc}
                        alt={service.title}
                        fill
                        className="object-cover ken-burns-effect"
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    {service.title}
                  </h3>
                  <a className="text-[#ff6d00] text-sm inline-flex items-center">
                    LEARN MORE →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Ken Burns effect for static images */}
      <style jsx global>{`
        @keyframes kenburns {
          0% {
            transform: scale(1) translate(0, 0);
          }
          50% {
            transform: scale(1.1) translate(-5px, -5px);
          }
          100% {
            transform: scale(1) translate(0, 0);
          }
        }
        
        .ken-burns-effect {
          animation: kenburns 15s infinite alternate;
        }
      `}</style>
    </section>
  );
};

export default Services;
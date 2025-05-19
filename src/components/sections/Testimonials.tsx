'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/utils/ThemeContext';
import { FaQuoteLeft, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Creative Director, Agency X',
    quote: 'Working with UncleKenny was transformative for our brand campaign. The cinematography was breathtaking, and the storytelling was powerful. Their technical expertise combined with creative vision produced results beyond our expectations.',
    image: '/Portfolio Assets/kenny_2.jpg'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Music Artist',
    quote: 'My music video collaboration with UncleKenny Studios was incredible. They captured the essence of my music and translated it into striking visuals. Professional, innovative, and genuinely passionate about their craft.',
    image: '/Portfolio Assets/kenny_3.jpg'
  },
  {
    id: 3,
    name: 'Olivia Rodriguez',
    role: 'Product Marketing Manager',
    quote: 'The commercial UncleKenny created for our product launch exceeded all expectations. He has an exceptional ability to find the perfect visual language for any brand. The results were stunning and impactful.',
    image: '/Portfolio Assets/kenny_4.jpg'
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { theme } = useTheme();
  
  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section 
      ref={sectionRef}
      className={`py-24 relative overflow-hidden ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`}
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          className={`absolute w-80 h-80 rounded-full blur-3xl opacity-10 ${
            theme === 'dark' ? 'bg-[#ff6d00]' : 'bg-[#ff6d00]'
          }`}
          style={{ top: '10%', left: '5%' }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div 
          className={`absolute w-96 h-96 rounded-full blur-3xl opacity-10 ${
            theme === 'dark' ? 'bg-[#ff9d00]' : 'bg-[#ff9d00]'
          }`}
          style={{ bottom: '10%', right: '5%' }}
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Client <span className="text-[#ff6d00]">Testimonials</span>
          </h2>
          <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Hear what clients have to say about their experience working with UncleKenny
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto relative">
          {/* Testimonial Carousel */}
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 }
              }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center rounded-xl p-8 ${
                theme === 'dark' 
                  ? 'bg-gray-900 shadow-xl' 
                  : 'bg-gray-100 shadow-lg'
              }`}
            >
              {/* Image */}
              <div className="relative h-[300px] md:h-full rounded-xl overflow-hidden order-2 md:order-1">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
              </div>
              
              {/* Content */}
              <div className="order-1 md:order-2">
                <FaQuoteLeft className={`text-[#ff6d00] text-4xl mb-6 ${
                  theme === 'dark' ? 'opacity-30' : 'opacity-15'
                }`} />
                
                <p className={`text-lg italic mb-8 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  &quot;{testimonials[currentIndex].quote}&quot;
                </p>
                
                <div>
                  <h4 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Arrows */}
          <div className="flex justify-between mt-10">
            <button 
              onClick={prevTestimonial}
              className={`h-12 w-12 rounded-full flex items-center justify-center ${
                theme === 'dark'
                  ? 'bg-gray-800 text-white hover:bg-[#ff6d00]'
                  : 'bg-gray-200 text-black hover:bg-[#ff6d00] hover:text-white'
              } transition-colors`}
              aria-label="Previous testimonial"
            >
              <FaArrowLeft />
            </button>
            
            <button 
              onClick={nextTestimonial}
              className={`h-12 w-12 rounded-full flex items-center justify-center ${
                theme === 'dark'
                  ? 'bg-gray-800 text-white hover:bg-[#ff6d00]'
                  : 'bg-gray-200 text-black hover:bg-[#ff6d00] hover:text-white'
              } transition-colors`}
              aria-label="Next testimonial"
            >
              <FaArrowRight />
            </button>
          </div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-3 w-3 rounded-full ${
                  index === currentIndex
                    ? 'bg-[#ff6d00]'
                    : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                } transition-colors`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '@/components/utils/ThemeContext';
import { FaLightbulb, FaCameraRetro, FaEdit, FaMagic, FaCheckCircle } from 'react-icons/fa';

// Process steps data
const processSteps = [
  {
    id: 1,
    title: 'Conceptualization',
    description: 'We start by understanding your vision and developing creative concepts that align with your goals.',
    icon: <FaLightbulb className="text-4xl" />,
    color: '#ff6d00'
  },
  {
    id: 2,
    title: 'Production',
    description: 'Our expert team uses top-of-the-line equipment to capture stunning footage with precision and creativity.',
    icon: <FaCameraRetro className="text-4xl" />,
    color: '#ff8324'
  },
  {
    id: 3,
    title: 'Editing',
    description: 'We meticulously craft the narrative through professional editing, ensuring a cohesive and engaging story.',
    icon: <FaEdit className="text-4xl" />,
    color: '#ff9a48'
  },
  {
    id: 4,
    title: 'Post-Production',
    description: 'Advanced color grading, visual effects, and sound design add the cinematic polish to your project.',
    icon: <FaMagic className="text-4xl" />,
    color: '#ffb06c'
  },
  {
    id: 5,
    title: 'Delivery',
    description: 'We provide your final content in multiple formats optimized for your specific distribution needs.',
    icon: <FaCheckCircle className="text-4xl" />,
    color: '#ffc690'
  }
];

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { theme } = useTheme();
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  return (
    <section 
      ref={sectionRef}
      className={`py-24 relative overflow-hidden ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`}
    >
      {/* Background graphic elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <svg 
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1000 1000" 
          style={{ opacity: 0.05 }}
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ff6d00', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#ffb06c', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <circle cx="500" cy="-100" r="400" fill="url(#grad1)" />
          <circle cx="900" cy="600" r="250" fill="url(#grad1)" />
          <circle cx="100" cy="800" r="300" fill="url(#grad1)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Our <span className="text-[#ff6d00]">Creative</span> Process
          </h2>
          <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            From concept to final delivery, our streamlined process ensures exceptional results for every project
          </p>
        </motion.div>
        
        {/* Process Flow */}
        <div className="max-w-5xl mx-auto relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#ff6d00] to-[#ffc690] transform -translate-y-1/2 z-0"></div>
          
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className={`rounded-xl overflow-hidden shadow-lg ${
                  theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
                } p-6 flex flex-col items-center text-center relative`}
              >
                {/* Step Number */}
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-4 relative z-10"
                  style={{ backgroundColor: step.color }}
                >
                  {step.id}
                </div>
                
                {/* Icon */}
                <div 
                  className="mb-4 text-white p-5 rounded-full relative z-10"
                  style={{ backgroundColor: step.color }}
                >
                  {step.icon}
                </div>
                
                <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  {step.title}
                </h3>
                
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} flex-grow`}>
                  {step.description}
                </p>
                
                {/* Connection arrow for mobile */}
                {index < processSteps.length - 1 && (
                  <div className="flex justify-center my-4 lg:hidden">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path 
                        d="M12 16L6 10H18L12 16Z" 
                        fill={step.color}
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a 
            href="#contact" 
            className="btn-primary inline-flex items-center"
          >
            Start Your Project →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface CinematicImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  hoverEffect?: boolean;
}

const CinematicImage = ({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  hoverEffect = true 
}: CinematicImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`overflow-hidden relative ${className}`}
      onMouseEnter={() => hoverEffect && setIsHovered(true)}
      onMouseLeave={() => hoverEffect && setIsHovered(false)}
    >
      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-900 animate-pulse flex items-center justify-center">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      
      {/* Actual image with cinematic hover effects */}
      <motion.div
        animate={
          hoverEffect && isHovered 
            ? { scale: 1.05, filter: 'brightness(1.1)' } 
            : { scale: 1, filter: 'brightness(1)' }
        }
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
          onLoad={() => setIsLoaded(true)}
        />
      </motion.div>
      
      {/* Gradient overlay for depth and dimension */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40 pointer-events-none"></div>
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none"></div>
    </div>
  );
};

export default CinematicImage;
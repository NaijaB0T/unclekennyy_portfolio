'use client';

import { useEffect, useRef, useState } from 'react';

interface HeroTransitionProps {
  onTransitionComplete: () => void;
}

// This component creates a simple fade-to-black transition
const HeroTransition = ({ onTransitionComplete }: HeroTransitionProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [transitionComplete, setTransitionComplete] = useState(false);
  const transitionTriggered = useRef(false);
  
  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      // Get scroll position
      const scrollY = window.scrollY;
      // Calculate progress based on viewport height
      const viewportHeight = window.innerHeight;
      const progress = Math.min(scrollY / viewportHeight, 1);
      
      // For debugging
      if (scrollY % 50 === 0) {
        console.log('Scroll Y:', scrollY, 'Progress:', progress);
      }
      
      setScrollProgress(progress);
      
      // Complete transition at 50% progress
      if (progress >= 0.5 && !transitionTriggered.current) {
        console.log('TRANSITION TRIGGERED');
        transitionTriggered.current = true;
        setTransitionComplete(true);
        onTransitionComplete();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onTransitionComplete]);
  
  // Calculate opacity for overlay based on scroll progress
  const overlayOpacity = Math.min(1, scrollProgress * 2);
  
  return (
    <div
      className="fixed inset-0 z-40 pointer-events-none bg-black transition-opacity duration-300"
      style={{
        opacity: overlayOpacity,
        display: transitionComplete ? 'none' : 'block',
      }}
    />
  );
};

export default HeroTransition;
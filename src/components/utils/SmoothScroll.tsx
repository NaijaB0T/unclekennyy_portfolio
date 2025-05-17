'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const SmoothScroll = () => {
  useEffect(() => {
    // Enable smooth scrolling with native browser behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Set up GSAP's ScrollTrigger for scroll-based animations
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section) => {
      // Fade in elements with the 'fade-in' class when they come into view
      const fadeElements = section.querySelectorAll('.fade-in');
      
      fadeElements.forEach((element) => {
        ScrollTrigger.create({
          trigger: element,
          start: 'top 80%',
          onEnter: () => element.classList.add('appear'),
          once: true
        });
      });
    });
    
    // Prevents sections from having gaps between them during scroll animations
    ScrollTrigger.config({
      ignoreMobileResize: true
    });
    
    // Handle anchor links for smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: targetElement,
              offsetY: 0
            },
            ease: 'power3.inOut'
          });
        }
      });
    });
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
  
  return null; // This component doesn't render anything
};

export default SmoothScroll;
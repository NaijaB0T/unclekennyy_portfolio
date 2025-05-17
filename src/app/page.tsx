'use client';

import { useState, useEffect, useRef } from 'react';

// Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Section Components
import Preloader from '@/components/sections/Preloader';
import Hero from '@/components/sections/Hero';
import HeroTransition from '@/components/sections/HeroTransition';
import Services from '@/components/sections/Services';
import FeaturedVideo from '@/components/sections/FeaturedVideo';
import Process from '@/components/sections/Process';
import Portfolio from '@/components/sections/Portfolio';
import Testimonials from '@/components/sections/Testimonials';
import Awards from '@/components/sections/Awards';
import Clients from '@/components/sections/Clients';
import Facilities from '@/components/sections/Facilities';
import Equipment from '@/components/sections/AboutMe';
import Contact from '@/components/sections/Contact';

// Utils
import SmoothScroll from '@/components/utils/SmoothScroll';
import BackToTop from '@/components/utils/BackToTop';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);
  const [reverseTransitioning, setReverseTransitioning] = useState(false);
  const lastScrollY = useRef(0);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const allowReverseTransition = useRef(false);
  
  const handleLoadingComplete = () => {
    setLoading(false);
  };
  
  // Forward transition - Hero to Main Content
  const handleTransitionComplete = () => {
    console.log("FORWARD TRANSITION COMPLETE");
    
    // Show main content after a short delay for a smooth transition
    setTimeout(() => {
      console.log("SHOWING MAIN CONTENT");
      setShowMainContent(true);
      
      // Reset scroll position
      window.scrollTo(0, 0);
      
      // Reset last scroll position to prevent false reverse triggers
      lastScrollY.current = 0;
      
      // Disable reverse transition for 1 second after page load
      allowReverseTransition.current = false;
      setTimeout(() => {
        allowReverseTransition.current = true;
        console.log("REVERSE TRANSITION NOW ALLOWED");
      }, 1000);
    }, 300);
  };
  
  // Reverse transition - Main Content back to Hero
  const handleReverseTransition = () => {
    // Only proceed if we're allowed to transition
    if (!allowReverseTransition.current) {
      console.log("REVERSE TRANSITION BLOCKED - COOLDOWN PERIOD");
      return;
    }
    
    console.log("REVERSE TRANSITION STARTED");
    setReverseTransitioning(true);
    
    // Prevent additional reverse transitions
    allowReverseTransition.current = false;
    
    // Hide main content after fade completes
    setTimeout(() => {
      setShowMainContent(false);
      setReverseTransitioning(false);
      window.scrollTo(0, 0);
      
      // Reset last scroll position
      lastScrollY.current = 0;
    }, 500);
  };
  
  // Handle scroll to detect reverse transition trigger
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only check for reverse transition when on main content
      if (showMainContent && !reverseTransitioning) {
        // If we're at the top and still trying to scroll up
        if (currentScrollY === 0 && lastScrollY.current > 10) {
          console.log(`Attempting reverse: current=${currentScrollY}, last=${lastScrollY.current}`);
          handleReverseTransition();
        }
      }
      
      // Update last position, but only for significant changes (avoid micromovements)
      if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
        lastScrollY.current = currentScrollY;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showMainContent, reverseTransitioning]);
  
  // Control overflow based on state
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.overflowX = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [loading]);
  
  // Add preconnect and meta tags on mount
  useEffect(() => {
    const preconnectGoogle = document.createElement('link');
    preconnectGoogle.rel = 'preconnect';
    preconnectGoogle.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnectGoogle);
    
    const preconnectGstatic = document.createElement('link');
    preconnectGstatic.rel = 'preconnect';
    preconnectGstatic.href = 'https://fonts.gstatic.com';
    preconnectGstatic.crossOrigin = 'anonymous';
    document.head.appendChild(preconnectGstatic);
    
    const metaThemeColor = document.createElement('meta');
    metaThemeColor.name = 'theme-color';
    metaThemeColor.content = '#000000';
    document.head.appendChild(metaThemeColor);
    
    return () => {
      if (document.head.contains(preconnectGoogle)) {
        document.head.removeChild(preconnectGoogle);
      }
      if (document.head.contains(preconnectGstatic)) {
        document.head.removeChild(preconnectGstatic);
      }
      if (document.head.contains(metaThemeColor)) {
        document.head.removeChild(metaThemeColor);
      }
    };
  }, []);

  return (
    <main className="min-h-screen">
      {/* Preloader */}
      {loading && <Preloader onLoadingComplete={handleLoadingComplete} />}
      
      {/* HERO PAGE */}
      {!loading && !showMainContent && (
        <>
          <SmoothScroll />
          <Header />
          {/* Hero Section - Static */}
          <div className="hero-section" style={{ height: '100vh' }}>
            <Hero />
          </div>
          
          {/* Invisible scroll trigger */}
          <div 
            className="scroll-trigger"
            style={{ 
              height: '100vh', 
              position: 'relative',
              pointerEvents: 'none',
              opacity: 0,
            }}
          />
          
          {/* Transition Overlay */}
          <HeroTransition 
            onTransitionComplete={handleTransitionComplete} 
          />
          
          {/* Scroll indicator */}
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-75 px-4 py-2 rounded z-50 animate-pulse">
            Scroll down to continue
          </div>
        </>
      )}
      
      {/* MAIN CONTENT */}
      {showMainContent && (
        <>
          <SmoothScroll />
          <Header />
          <div className="main-content" ref={mainContentRef}>
            <Services />
            <FeaturedVideo />
            <Process />
            <Portfolio />
            <Awards />
            <Testimonials />
            <Clients />
            <Facilities />
            <Equipment />
            <Contact />
          </div>
          <Footer />
          <BackToTop />
          
          {/* Reverse transition overlay */}
          {reverseTransitioning && (
            <div 
              className="fixed inset-0 bg-black z-50 transition-opacity duration-500"
              style={{ opacity: reverseTransitioning ? 1 : 0 }}
            />
          )}
          
          {/* Back to hero hint */}
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded text-xs z-50">
            Scroll up at the top to return to hero
          </div>
        </>
      )}
    </main>
  );
}
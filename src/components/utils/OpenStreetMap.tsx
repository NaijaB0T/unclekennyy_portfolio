'use client';

import { useTheme } from '@/components/utils/ThemeContext';
import { useEffect, useRef, useState } from 'react';

interface OpenStreetMapProps {
  latitude: number;
  longitude: number;
  zoom: number;
  className?: string;
}

const OpenStreetMap = ({ latitude, longitude, zoom, className = "h-72" }: OpenStreetMapProps) => {
  const { theme } = useTheme();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [isMapActive, setIsMapActive] = useState(false);
  
  // OpenStreetMap iframe URL with enabled zoom controls
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01}%2C${latitude - 0.01}%2C${longitude + 0.01}%2C${latitude + 0.01}&layer=mapnik&marker=${latitude}%2C${longitude}&zoom=${zoom}`;
  
  // Handle key events for Ctrl key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Control') {
        setIsCtrlPressed(true);
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Control') {
        setIsCtrlPressed(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  
  // Implement overlay to block scrolling when Ctrl is not pressed
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isCtrlPressed && !isMapActive) {
        // Prevent default only if Ctrl is not pressed and map is not active
        e.preventDefault();
      }
    };
    
    const mapContainer = mapContainerRef.current;
    if (mapContainer) {
      mapContainer.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    return () => {
      if (mapContainer) {
        mapContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isCtrlPressed, isMapActive]);
  
  return (
    <div 
      ref={mapContainerRef}
      className={`${className} rounded-xl overflow-hidden relative`}
      onMouseEnter={() => setIsMapActive(true)}
      onMouseLeave={() => setIsMapActive(false)}
    >
      <iframe 
        ref={iframeRef}
        width="100%" 
        height="100%" 
        frameBorder="0" 
        scrolling="no" 
        marginHeight={0} 
        marginWidth={0} 
        src={osmUrl} 
        style={{ border: 0 }}
        title="OpenStreetMap"
        className="rounded-xl"
        allowFullScreen
      />
      
      {/* Transparent overlay that blocks scroll events when Ctrl is not pressed */}
      {!isCtrlPressed && (
        <div 
          className="absolute inset-0 bg-transparent z-10"
          onClick={() => setIsMapActive(true)}
        />
      )}
      
      {/* Inset shadow effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 20px 10px ${theme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.1)'}`,
        }}
      />
      
      {/* Control instructions */}
      <div className={`absolute bottom-2 left-2 z-20 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded transition-opacity duration-300 ${isCtrlPressed ? 'opacity-100' : 'opacity-70'}`}>
        {isCtrlPressed ? '✓ Ctrl pressed - Scroll to zoom map' : 'Use Ctrl + scroll to zoom the map'}
      </div>
      
      {/* View larger map link */}
      <div className="absolute bottom-2 right-2 z-20">
        <a 
          href={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=${zoom}/${latitude}/${longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-xs px-2 py-1 rounded ${
            theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
          } hover:opacity-80 transition-opacity`}
        >
          View Larger Map
        </a>
      </div>
    </div>
  );
};

export default OpenStreetMap;
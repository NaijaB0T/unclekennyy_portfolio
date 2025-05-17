'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Lagos, Nigeria coordinates
const DEFAULT_POSITION: [number, number] = [6.5244, 3.3792];

const ContactMap = () => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);
  
  useEffect(() => {
    // Skip initialization if already done or container not available
    if (isInitializedRef.current || !mapContainerRef.current) {
      return;
    }
    
    // Fix Leaflet's icon paths
    if (!L.Icon.Default.imagePath) {
      L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.7.1/dist/images/';
      
      // Fix the defaultIcon issue
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', 
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      });
    }
    
    // Initialize map only once
    try {
      console.log("Initializing map...");
      mapRef.current = L.map(mapContainerRef.current).setView(DEFAULT_POSITION, 13);
      
      // Add the tile layer (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapRef.current);
      
      // Add a marker for the studio location
      const marker = L.marker(DEFAULT_POSITION).addTo(mapRef.current);
      marker.bindPopup('Uncle Kenny Studios<br>Lagos, Nigeria').openPopup();
      
      // Mark as initialized
      isInitializedRef.current = true;
    } catch (error) {
      console.error("Error initializing map:", error);
    }
    
    // Clean up the map when component unmounts
    return () => {
      if (mapRef.current) {
        console.log("Removing map...");
        mapRef.current.remove();
        mapRef.current = null;
        isInitializedRef.current = false;
      }
    };
  }, []);
  
  return (
    <div className="h-72 rounded-xl overflow-hidden mb-8">
      <div 
        ref={mapContainerRef} 
        style={{ height: '100%', width: '100%' }}
        id="contact-map"
      />
    </div>
  );
};

// Prevent multiple instances with React.memo
export default React.memo(ContactMap);
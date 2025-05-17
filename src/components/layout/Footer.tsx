'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from '@/components/utils/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} py-16`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <p className="text-sm">hello@unclekenny.studios</p>
              <p className="text-sm">+234 901 234 5678</p>
              <p className="text-sm">Lagos, Nigeria</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm">EN</span>
              <span className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>|</span>
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} cursor-pointer hover:${theme === 'dark' ? 'text-white' : 'text-black'} transition-colors`}>FR</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              <div className="space-y-3">
                <Link href="#services" className={`block hover:text-[#ff6d00] transition-colors`}>
                  Video Production
                </Link>
                <Link href="#services" className={`block hover:text-[#ff6d00] transition-colors`}>
                  3D & CGI
                </Link>
                <Link href="#about" className={`block hover:text-[#ff6d00] transition-colors`}>
                  About Us
                </Link>
              </div>
              <div className="space-y-3">
                <Link href="#equipment" className={`block hover:text-[#ff6d00] transition-colors`}>
                  Rental
                </Link>
                <Link href="#services" className={`block hover:text-[#ff6d00] transition-colors`}>
                  Music Marketing
                </Link>
                <Link href="#services" className={`block hover:text-[#ff6d00] transition-colors`}>
                  Photoshoots
                </Link>
              </div>
              <div className="space-y-3">
                <Link href="/blog" className={`block hover:text-[#ff6d00] transition-colors`}>
                  Blog
                </Link>
                <Link href="/careers" className={`block hover:text-[#ff6d00] transition-colors`}>
                  Careers
                </Link>
                <Link href="#contact" className={`block hover:text-[#ff6d00] transition-colors`}>
                  Get in Touch
                </Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <Link href="https://www.instagram.com/" className={`block text-sm hover:text-[#ff6d00] transition-colors`} target="_blank">
                INSTAGRAM →
              </Link>
              <Link href="https://www.linkedin.com/" className={`block text-sm hover:text-[#ff6d00] transition-colors`} target="_blank">
                LINKEDIN →
              </Link>
            </div>
            
            <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
              <p>©2025 UncleKenny Studios</p>
            </div>
          </motion.div>
          
          {/* Right Column - Map */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-[300px] lg:h-full"
          >
            <div className="absolute top-0 right-0 z-10 mb-4">
              <button className={`${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} rounded-md px-4 py-2 text-sm font-medium`}>
                ACCESS & PARKING
              </button>
            </div>
            <div className="w-full h-full rounded-lg overflow-hidden relative mt-12">
              <p className="absolute bottom-4 left-4 text-xs text-white z-10 bg-black bg-opacity-50 px-2 py-1 rounded">
                Use ctrl + scroll to zoom the map
              </p>
              <div className={`w-full h-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} flex items-center justify-center`}>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Google Map would be embedded here</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
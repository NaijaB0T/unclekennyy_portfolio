'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/utils/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled 
          ? (theme === 'dark' ? 'bg-black bg-opacity-90' : 'bg-white bg-opacity-90') 
          : 'bg-transparent'
      } py-4`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Link href="/" className="text-2xl font-bold">
            <span className="text-xs tracking-widest mr-1">THE</span>
            <span className={theme === 'dark' ? 'text-white' : 'text-black'}>UNCLE</span>
            <span className="text-[#ff6d00]">KENNY</span>
            <span className="block text-xs tracking-widest text-right">STUDIOS</span>
          </Link>
        </motion.div>

        {/* Right side controls */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center space-x-6"
        >
          <span className={`text-sm cursor-pointer ${theme === 'dark' ? 'text-white' : 'text-black'}`}>EN</span>
          <button 
            onClick={toggleTheme}
            className={`text-sm flex items-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}
          >
            <span className="mr-1">{theme === 'dark' ? '☀️' : '🌙'}</span>
            <span className="hidden md:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
          
          {/* Menu Button */}
          <button
            onClick={toggleMenu}
            className={`px-4 py-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'bg-[#111] text-white hover:bg-[#222]'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            MENU
          </button>
        </motion.div>

        {/* Fullscreen Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className={`fixed inset-0 z-50 overflow-hidden ${
                theme === 'dark' ? 'bg-black' : 'bg-white'
              }`}
            >
              <div className="container mx-auto px-6 py-8 h-full flex flex-col">
                <div className="flex justify-between items-center mb-12">
                  <Link href="/" className="text-2xl font-bold">
                    <span className="text-xs tracking-widest mr-1">THE</span>
                    <span className={theme === 'dark' ? 'text-white' : 'text-black'}>UNCLE</span>
                    <span className="text-[#ff6d00]">KENNY</span>
                    <span className="block text-xs tracking-widest text-right">STUDIOS</span>
                  </Link>
                  <button
                    onClick={toggleMenu}
                    className={`${theme === 'dark' ? 'text-white text-2xl' : 'text-black text-2xl'} hover:text-[#ff6d00] transition-colors`}
                  >
                    ✕
                  </button>
                </div>
                
                {/* Menu content with animated entries */}
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-1/2 md:pr-8">
                    <motion.nav 
                      className="flex flex-col space-y-8"
                      variants={{
                        hidden: { opacity: 0 },
                        show: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.1
                          }
                        }
                      }}
                      initial="hidden"
                      animate="show"
                    >
                      {['Services', 'Works', 'Process', 'Facilities', 'Equipment', 'Contact'].map((item, index) => (
                        <motion.div
                          key={item}
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 }
                          }}
                        >
                          <Link 
                            href={`#${item.toLowerCase()}`}
                            className={`text-4xl md:text-6xl font-bold ${
                              theme === 'dark' ? 'text-white hover:text-[#ff6d00]' : 'text-black hover:text-[#ff6d00]'
                            } transition-colors block`}
                            onClick={toggleMenu}
                          >
                            {item}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.nav>
                  </div>
                  
                  <motion.div 
                    className="md:w-1/2 mt-12 md:mt-0 flex flex-col justify-between"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {/* Contact info */}
                    <div className="mb-8">
                      <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>GET IN TOUCH</h3>
                      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>hello@unclekenny.com</p>
                      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-6`}>+234 123 4567 890</p>
                      
                      <div className="flex space-x-4 mt-6">
                        <a href="#" className={`${theme === 'dark' ? 'text-white hover:text-[#ff6d00]' : 'text-black hover:text-[#ff6d00]'} transition-colors`}>INSTAGRAM</a>
                        <a href="#" className={`${theme === 'dark' ? 'text-white hover:text-[#ff6d00]' : 'text-black hover:text-[#ff6d00]'} transition-colors`}>LINKEDIN</a>
                      </div>
                    </div>
                    
                    {/* Theme toggle */}
                    <div className="mt-auto mb-8">
                      <button 
                        onClick={toggleTheme}
                        className={`inline-flex items-center rounded-full px-4 py-2 text-sm transition-colors ${
                          theme === 'dark' 
                            ? 'bg-white text-black hover:bg-gray-100' 
                            : 'bg-black text-white hover:bg-gray-900'
                        }`}
                      >
                        <span className="mr-2">{theme === 'dark' ? '☀️' : '🌙'}</span>
                        {theme === 'dark' ? 'SWITCH TO LIGHT MODE' : 'SWITCH TO DARK MODE'}
                      </button>
                    </div>
                  </motion.div>
                </div>
                
                {/* Footer */}
                <div className={`mt-auto text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <p>© 2025 UncleKenny Studios. All rights reserved.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
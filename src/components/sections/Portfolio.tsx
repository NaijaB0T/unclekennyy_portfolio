'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/components/utils/ThemeContext';
import VideoPlayer from '@/components/utils/VideoPlayer';
import CinematicImage from '@/components/utils/CinematicImage';

// Sample portfolio projects
const portfolioProjects = [
  {
    id: 1,
    title: 'Music Video - "Rhythm & Soul"',
    category: 'Music Video',
    client: 'Artist Name',
    videoSrc: '/Portfolio Assets/3248719579989418817_1.mp4',
    thumbnail: '/Portfolio Assets/kenny_10.jpg',
    description: 'A visually stunning music video that combines dynamic cinematography with emotional storytelling to complement the artist\'s unique sound.',
    date: 'April 2024'
  },
  {
    id: 2,
    title: 'Commercial - "Premium Experience"',
    category: 'Commercial',
    client: 'Brand Name',
    videoSrc: '/Portfolio Assets/3387492217913413308_1.mp4',
    thumbnail: '/Portfolio Assets/kenny_11.jpg',
    description: 'A high-end commercial production highlighting the luxury features and exceptional quality of our client\'s premium product line.',
    date: 'March 2024'
  },
  {
    id: 3,
    title: 'Short Film - "Echoes"',
    category: 'Short Film',
    client: 'Independent Production',
    videoSrc: '/Portfolio Assets/3477871000998156445_1.mp4',
    thumbnail: '/Portfolio Assets/kenny_12.jpg',
    description: 'An award-winning short film exploring themes of memory and identity through innovative visual techniques and powerful performances.',
    date: 'February 2024'
  },
  {
    id: 4,
    title: 'Documentary - "Urban Chronicles"',
    category: 'Documentary',
    client: 'Streaming Platform',
    videoSrc: '/Portfolio Assets/3488760505481504762_1.mp4',
    thumbnail: '/Portfolio Assets/kenny_13.jpg',
    description: 'A compelling documentary series capturing authentic stories from urban communities with a cinematic approach to real-life narratives.',
    date: 'January 2024'
  },
  {
    id: 5,
    title: 'Fashion Campaign - "Timeless"',
    category: 'Fashion',
    client: 'Designer Brand',
    videoSrc: '/Portfolio Assets/3577182225549447025_1.mp4',
    thumbnail: '/Portfolio Assets/kenny_14.jpg',
    description: 'A sophisticated fashion campaign that merges artistic vision with brand identity to showcase the designer\'s latest collection.',
    date: 'December 2023'
  },
  {
    id: 6,
    title: 'Adventure Series - "Beyond Horizons"',
    category: 'Series',
    client: 'Travel Channel',
    videoSrc: '/Portfolio Assets/3611898332520446914_1.mp4',
    thumbnail: '/Portfolio Assets/kenny_1_cover.jpg',
    description: 'An immersive travel series shot in remote locations worldwide, highlighting breathtaking landscapes and cultural experiences.',
    date: 'November 2023'
  },
];

// Categories for filter
const categories = ['All', 'Music Video', 'Commercial', 'Short Film', 'Documentary', 'Fashion', 'Series'];

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(portfolioProjects);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProjects(portfolioProjects);
    } else {
      setFilteredProjects(portfolioProjects.filter(project => project.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <section 
      id="works" 
      ref={sectionRef}
      className={`py-24 relative overflow-hidden ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>Our Work</h2>
          <p className={`${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          } max-w-2xl mx-auto`}>
            Explore our diverse portfolio of projects across various genres and formats. Each piece represents our commitment to storytelling and visual excellence.
          </p>
        </motion.div>
        
        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-[#ff6d00] text-white'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
        
        {/* Portfolio grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={`group relative overflow-hidden rounded-lg cursor-pointer shadow-lg ${
                theme === 'dark' ? 'shadow-gray-900' : 'shadow-gray-200'
              }`}
              style={{ height: '300px' }}
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
              onClick={() => setSelectedProject(project.id)}
            >
              {activeProject === project.id && project.videoSrc ? (
                <video 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source src={project.videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <CinematicImage
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full"
                />
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70"></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <div className="transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                  <span className="text-[#ff6d00] text-sm font-medium block mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-white text-xl font-bold mb-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Client: {project.client}
                  </p>
                  <button 
                    className="inline-flex items-center text-[#ff6d00] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:underline"
                    onClick={() => setSelectedProject(project.id)}
                  >
                    View Project →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* View more button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className={`bg-transparent border px-8 py-3 rounded-full transition-colors ${
            theme === 'dark'
              ? 'border-white text-white hover:bg-white hover:text-black'
              : 'border-black text-black hover:bg-black hover:text-white'
          }`}>
            VIEW ALL PROJECTS
          </button>
        </motion.div>
      </div>
      
      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`relative w-full max-w-4xl rounded-xl overflow-hidden ${
                theme === 'dark' ? 'bg-gray-900' : 'bg-white'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black bg-opacity-60 text-white flex items-center justify-center"
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </button>
              
              {selectedProject && (
                <div>
                  {/* Video */}
                  <div className="w-full aspect-video">
                    <VideoPlayer 
                      src={portfolioProjects.find(p => p.id === selectedProject)?.videoSrc || ''} 
                      poster={portfolioProjects.find(p => p.id === selectedProject)?.thumbnail}
                      className="w-full h-full"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                      <div>
                        <h3 className={`text-2xl font-bold ${
                          theme === 'dark' ? 'text-white' : 'text-black'
                        }`}>
                          {portfolioProjects.find(p => p.id === selectedProject)?.title}
                        </h3>
                        <p className={`${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {portfolioProjects.find(p => p.id === selectedProject)?.date}
                        </p>
                      </div>
                      <span className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-sm ${
                        theme === 'dark' 
                          ? 'bg-gray-800 text-white' 
                          : 'bg-gray-200 text-black'
                      }`}>
                        {portfolioProjects.find(p => p.id === selectedProject)?.category}
                      </span>
                    </div>
                    
                    <p className={`mb-6 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {portfolioProjects.find(p => p.id === selectedProject)?.description}
                    </p>
                    
                    <div className={`flex justify-between items-center pt-4 border-t ${
                      theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                    }`}>
                      <p className={`${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Client: {portfolioProjects.find(p => p.id === selectedProject)?.client}
                      </p>
                      <a 
                        href="#contact" 
                        className="btn-primary"
                        onClick={() => setSelectedProject(null)}
                      >
                        Start Your Project →
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
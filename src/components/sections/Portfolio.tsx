'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useTheme } from '@/components/utils/ThemeContext';
import VideoPlayer from '@/components/utils/VideoPlayer';

// Note: Removed the Image import from next/image

// Helper function to organize and classify media assets
const organizeMediaAssets = () => {
  // Define project information
  const projectInfo = {
    '3221507813161477626': {
      title: 'Sounds of Lagos FASHION WEEK',
      category: 'Fashion',
      client: 'Luxury Brand',
      description: 'A visually striking fashion campaign showcasing elegance and style through creative cinematography and artistic direction.',
      date: 'May 2024'
    },
    '3248719579989418817': {
      title: 'Music Video - "Rhythm & Soul"',
      category: 'Music Video',
      client: 'Rising Artist',
      description: 'A visually stunning music video that combines dynamic cinematography with emotional storytelling to complement the artist\'s unique sound.',
      date: 'April 2024'
    },
    '3249481118199826346': {
      title: 'Brand Campaign - "Innovation"',
      category: 'Commercial',
      client: 'Tech Company',
      description: 'A sleek and modern brand campaign highlighting innovation and forward-thinking design through sophisticated visual storytelling.',
      date: 'March 2024'
    },
    '3386748659635854057': {
      title: 'Short Film - "Reflections"',
      category: 'Short Film',
      client: 'Independent Production',
      description: 'An evocative short film exploring human connections and memories through poetic visual language and atmospheric cinematography.',
      date: 'February 2024'
    },
    '3387492217913413308': {
      title: 'Commercial - "Premium Experience"',
      category: 'Commercial',
      client: 'Lifestyle Brand',
      description: 'A high-end commercial production highlighting the luxury features and exceptional quality of our client\'s premium product line.',
      date: 'January 2024'
    },
    '3389741723890159116': {
      title: 'Documentary - "Urban Stories"',
      category: 'Documentary',
      client: 'Cultural Institute',
      description: 'A compelling documentary capturing authentic stories from urban communities with a cinematic approach to real-life narratives.',
      date: 'December 2023'
    },
    '3445257413150794646': {
      title: 'Series - "Moments"',
      category: 'Series',
      client: 'Streaming Platform',
      description: 'An intimate series exploring significant life moments through carefully crafted visual storytelling and authentic performances.',
      date: 'November 2023'
    },
    '3459857002977563149': {
      title: 'Lifestyle Campaign - "Everyday Luxury"',
      category: 'Commercial',
      client: 'Premium Brand',
      description: 'A sophisticated lifestyle campaign celebrating everyday luxury through elegant cinematography and authentic moments.',
      date: 'October 2023'
    },
    '3463368896166477478': {
      title: 'Music Video - "Beats & Visuals"',
      category: 'Music Video',
      client: 'Music Producer',
      description: 'An innovative music video merging cutting-edge visual effects with rhythmic editing to create a mesmerizing audiovisual experience.',
      date: 'September 2023'
    },
    '3477871000998156445': {
      title: 'Short Film - "Echoes"',
      category: 'Short Film',
      client: 'Film Festival',
      description: 'An award-winning short film exploring themes of memory and identity through innovative visual techniques and powerful performances.',
      date: 'August 2023'
    },
    '3488760505481504762': {
      title: 'Documentary - "Urban Chronicles"',
      category: 'Documentary',
      client: 'Media Network',
      description: 'A documentary series capturing the pulse of urban environments through cinematic storytelling and authentic perspectives.',
      date: 'July 2023'
    },
    '3574974151405107441': {
      title: 'Campaign - "Natural Beauty"',
      category: 'Commercial',
      client: 'Cosmetics Brand',
      description: 'A stunning beauty campaign celebrating natural elegance through soft cinematography and authentic emotional connection.',
      date: 'June 2023'
    },
    '3577182225549447025': {
      title: 'Fashion Campaign - "Timeless"',
      category: 'Fashion',
      client: 'Designer Brand',
      description: 'A sophisticated fashion campaign that merges artistic vision with brand identity to showcase the designer\'s latest collection.',
      date: 'May 2023'
    },
    '3577893803173237660': {
      title: 'Product Launch - "Innovation"',
      category: 'Commercial',
      client: 'Technology Company',
      description: 'A polished product launch video highlighting innovative features through sleek cinematography and dynamic visual storytelling.',
      date: 'April 2023'
    },
    '3611898332520446914': {
      title: 'Adventure Series - "Beyond Horizons"',
      category: 'Series',
      client: 'Travel Channel',
      description: 'An immersive travel series shot in remote locations worldwide, highlighting breathtaking landscapes and cultural experiences.',
      date: 'March 2023'
    },
    '3628041593085698121': {
      title: 'Music Video - "Visual Rhythms"',
      category: 'Music Video',
      client: 'Recording Artist',
      description: 'A creative music video that pushes visual boundaries while complementing the artist\'s musical expression through innovative cinematography.',
      date: 'February 2023'
    },
    '3632937126791138218': {
      title: 'Brand Story - "Heritage"',
      category: 'Commercial',
      client: 'Legacy Brand',
      description: 'A brand story celebrating rich heritage and craftsmanship through cinematic storytelling and emotionally resonant visuals.',
      date: 'January 2023'
    },
  };

  // Initialize projects array
  const projects: {
    id: number;
    uid: string;
    title: string;
    category: string;
    client: string;
    videoSrc: string;
    thumbnail: string;
    fallbackThumbnail: string; // Added fallback thumbnail
    description: string;
    date: string;
  }[] = [];
  
  // Loop through project IDs
  Object.keys(projectInfo).forEach((projectId, index) => {
    // First try to use the first image in project's sequence as thumbnail
    // If that fails, fall back to Kenny images
    const kennyImageIndex = (index % 14) + 1; // Cycle through Kenny images 1-14
    const kennyThumbnailPath = kennyImageIndex === 1 
      ? '/Portfolio Assets/kenny_1_cover.jpg' 
      : `/Portfolio Assets/kenny_${kennyImageIndex}.jpg`;
    
    // Try to use the first image in the project's own sequence
    const projectThumbnailPath = `/Portfolio Assets/${projectId}_1.jpg`;
    
    const defaultVideoPath = `/Portfolio Assets/${projectId}_1.mp4`;
    
    // Create project object with all the info
    projects.push({
      id: index + 1,
      uid: projectId,
      title: projectInfo[projectId].title,
      category: projectInfo[projectId].category,
      client: projectInfo[projectId].client,
      videoSrc: defaultVideoPath,
      thumbnail: projectThumbnailPath, // Try to use project's first image
      fallbackThumbnail: kennyThumbnailPath, // Fall back to Kenny images if needed
      description: projectInfo[projectId].description,
      date: projectInfo[projectId].date
    });
  });
  
  return projects;
};

// Generate portfolio projects using our helper function
const portfolioProjects = organizeMediaAssets();

// Categories for filter
const categories = ['All', 'Music Video', 'Commercial', 'Short Film', 'Documentary', 'Fashion', 'Series'];

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
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

  // Use filtered projects effect to check if images are loadable
  useEffect(() => {
    // Check if project thumbnails are loadable and update if needed
    filteredProjects.forEach(project => {
      const img = new Image();
      img.src = project.thumbnail;
      img.onload = () => {
        console.log(`Project ${project.id} thumbnail loaded successfully: ${project.thumbnail}`);
      };
      img.onerror = () => {
        console.log(`Project ${project.id} thumbnail failed to load, will use fallback: ${project.fallbackThumbnail}`);
      };
    });
  }, [filteredProjects]);

  // Add mobile detection for better touch handling
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Function to check if device is mobile
    const checkIfMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
      }
    };
    
    // Check initially
    checkIfMobile();
    
    // Add listener for window resize
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkIfMobile);
      
      // Clean up
      return () => window.removeEventListener('resize', checkIfMobile);
    }
  }, []);
  
  // Debug mobile detection
  useEffect(() => {
    console.log("isMobile state:", isMobile);
  }, [isMobile]);
  
  // Preload images to improve performance
  useEffect(() => {
    // Preload all project thumbnails when component mounts
    const preloadImages = () => {
      filteredProjects.forEach(project => {
        // Preload primary thumbnail
        const img = new Image();
        img.src = project.thumbnail;
        // Also preload fallback
        const fallbackImg = new Image();
        fallbackImg.src = project.fallbackThumbnail;
      });
    };
    
    preloadImages();
  }, [filteredProjects]);
  
  // Handle portfolio component mounting
  useEffect(() => {
    // Force a redraw on component mount to prevent initial render issues
    setTimeout(() => {
      if (sectionRef.current) {
        console.log("Portfolio section redraw triggered");
        const display = sectionRef.current.style.display;
        sectionRef.current.style.display = 'none';
        // Force a reflow
        void sectionRef.current.offsetHeight;
        sectionRef.current.style.display = display;
      }
    }, 500);

    // Check if we have projects loaded and visible in the DOM
    setTimeout(() => {
      if (sectionRef.current) {
        const projectItems = sectionRef.current.querySelectorAll('.project-item');
        console.log(`Found ${projectItems.length} project items in the DOM`);
      }
    }, 1000);
  }, []);

  return (
    <section 
      id="works" 
      ref={sectionRef}
      className={`py-24 relative overflow-hidden z-10 ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`}
      style={{ minHeight: isMobile ? '500px' : 'auto' }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={(isInView || isMobile) ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
          animate={(isInView || isMobile) ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={(isInView || isMobile) ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className={`project-item group relative overflow-hidden rounded-lg cursor-pointer shadow-lg h-[300px] ${
                theme === 'dark' ? 'shadow-gray-900' : 'shadow-gray-200'
              }`}
              onClick={() => setSelectedProject(project.id)}
              onTouchStart={() => setActiveProject(project.id)}
              onTouchEnd={() => setActiveProject(null)}
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {/* Always show images on mobile, videos only on desktop hover */}
              {activeProject === project.id && project.videoSrc && !isMobile ? (
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
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    // If project's own image fails to load, use the fallback Kenny image
                    const target = e.target as HTMLImageElement;
                    console.log(`Image failed to load: ${target.src}, using fallback: ${project.fallbackThumbnail}`);
                    target.src = project.fallbackThumbnail;
                    
                    // Add error handler for fallback too
                    target.onerror = () => {
                      console.log("Fallback image also failed, using default backup");
                      target.src = "/Portfolio Assets/kenny_1_cover.jpg";
                      // Remove error handler to prevent potential infinite loop
                      target.onerror = null;
                    };
                  }}
                />
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70"></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <div className={`transform transition-transform duration-300 ${isMobile ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}`}>
                  <span className="text-[#ff6d00] text-sm font-medium block mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-white text-xl font-bold mb-1">
                    {project.title}
                  </h3>
                  <p className={`text-gray-300 text-sm mb-2 ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-300'}`}>
                    Client: {project.client}
                  </p>
                  <button 
                    className={`inline-flex items-center text-[#ff6d00] text-sm ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-300'} hover:underline`}
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
          animate={(isInView || isMobile) ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`relative w-full max-w-5xl rounded-xl overflow-hidden ${
                theme === 'dark' ? 'bg-gray-900' : 'bg-white'
              } max-h-[90vh] overflow-y-auto`}
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
                  {/* Main Video */}
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
                    
                    {/* Project Media Gallery */}
                    <div className="mt-8 mb-6">
                      <h4 className={`text-xl font-bold mb-4 ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`}>
                        Project Media
                      </h4>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {/* Dynamically generate media thumbnails based on the project UID */}
                        {(() => {
                          const project = portfolioProjects.find(p => p.id === selectedProject);
                          if (!project) return null;
                          
                          // Create an array of possible media indices (from 1 to max)
                          const maxMediaIndex = 15; // Arbitrary upper limit
                          const mediaIndices = Array.from({ length: maxMediaIndex }, (_, i) => i + 1);
                          
                          // Return the mapped gallery items
                          return mediaIndices.map((i) => {
                            // Determine if this is likely a video or image based on typical patterns
                            const isLikelyVideo = i <= 7;
                            const mediaPath = `/Portfolio Assets/${project.uid}_${i}${isLikelyVideo ? '.mp4' : '.jpg'}`;
                            const thumbnailPath = isLikelyVideo 
                              ? `/Portfolio Assets/${project.uid}_${i}.jpg` // Video thumbnail
                              : mediaPath; // For images, use the image itself
                            
                            return (
                              <div 
                                key={i} 
                                className="relative aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                                onClick={() => {
                                  // If it's a video, we could implement a modal video player here
                                  if (isLikelyVideo) {
                                    window.open(mediaPath, '_blank');
                                  } else {
                                    // For images, we could implement a lightbox here
                                    window.open(mediaPath, '_blank');
                                  }
                                }}
                              >
                                {isLikelyVideo && (
                                  <>
                                    <div className="absolute inset-0 bg-black opacity-30 hover:opacity-0 transition-opacity"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="w-12 h-12 rounded-full bg-white bg-opacity-70 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                        </svg>
                                      </span>
                                    </div>
                                  </>
                                )}
                                <img 
                                  src={thumbnailPath}
                                  alt={`Project media ${i}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    // Safety check
                                    if (!e.currentTarget || !e.currentTarget.parentElement) return;
                                    
                                    // If image doesn't exist, hide this element
                                    e.currentTarget.parentElement.style.display = 'none';
                                  }}
                                />
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>
                    
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
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

const Preloader = ({ onLoadingComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => {
              onLoadingComplete();
            }, 1000);
          }, 500);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 15);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 bg-[#111] flex flex-col items-center justify-center z-50"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 text-center"
          >
            <div className="relative">
              <span className="text-xs tracking-widest mb-1 block text-gray-400">THE</span>
              <span className="text-white text-4xl font-bold">UNCLE<span className="text-[#ff6d00]">KENNY</span></span>
              <span className="text-xs tracking-widest block mt-1 text-gray-400 text-right">Cinematographer</span>
            </div>
          </motion.div>
          
          <div className="w-[300px] h-[2px] bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#ff6d00]"
              style={{ width: `${progress}%` }}
              initial={{ width: 0 }}
            />
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-4 text-sm text-gray-400"
          >
            {progress === 100 ? 'Ready' : 'Loading...'}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
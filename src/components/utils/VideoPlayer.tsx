'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaExpand, FaCompress, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

const VideoPlayer = ({ src, poster, className = '' }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [volume, setVolume] = useState(0.5);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Set up video event listeners
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    const handleTimeUpdate = () => {
      if (videoElement.duration) {
        setProgress((videoElement.currentTime / videoElement.duration) * 100);
        setCurrentTime(videoElement.currentTime);
      }
    };
    
    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      if (videoElement) {
        videoElement.currentTime = 0;
      }
    };
    
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement.addEventListener('ended', handleEnded);
    
    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, []);
  
  // Handle auto-hide controls
  useEffect(() => {
    if (!isControlsVisible) return;
    
    const hideControls = () => {
      if (isPlaying) {
        setIsControlsVisible(false);
      }
    };
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(hideControls, 3000);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isPlaying, isControlsVisible]);
  
  // Play/Pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    
    setIsFullscreen(!isFullscreen);
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };
  
  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (!videoRef.current) return;
    
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    
    if (newVolume === 0) {
      setIsMuted(true);
      videoRef.current.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      videoRef.current.muted = false;
    }
  };
  
  // Format time (seconds) to mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Handle timeline scrubbing
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const newTime = position * duration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(position * 100);
  };
  
  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg ${className}`}
      onMouseEnter={() => setIsControlsVisible(true)}
      onMouseMove={() => setIsControlsVisible(true)}
      onMouseLeave={() => isPlaying && setIsControlsVisible(false)}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        muted={isMuted}
        onClick={togglePlay}
        playsInline
      />
      
      {/* Play button overlay (when paused) */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
          onClick={togglePlay}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#ff6d00] bg-opacity-80 rounded-full p-5"
          >
            <FaPlay className="text-white text-xl" />
          </motion.div>
        </div>
      )}
      
      {/* Controls */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 z-20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isControlsVisible ? 1 : 0, y: isControlsVisible ? 0 : 10 }}
        transition={{ duration: 0.3 }}
      >
        {/* Timeline */}
        <div 
          className="w-full h-1 bg-gray-600 rounded-full mb-3 cursor-pointer"
          onClick={handleTimelineClick}
        >
          <div 
            className="h-full bg-[#ff6d00] rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Controls row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Play/Pause */}
            <button onClick={togglePlay} className="text-white">
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            
            {/* Volume */}
            <div className="flex items-center space-x-2">
              <button onClick={toggleMute} className="text-white">
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 md:w-24 h-1 bg-gray-600 rounded-full accent-[#ff6d00]"
              />
            </div>
            
            {/* Time */}
            <div className="text-white text-xs md:text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          {/* Fullscreen */}
          <button onClick={toggleFullscreen} className="text-white">
            {isFullscreen ? <FaCompress /> : <FaExpand />}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default VideoPlayer;
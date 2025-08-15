"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Play, Pause, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

const images = [
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=90",
    alt: "Professional headshot in studio lighting"
  },
  {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=90",
    alt: "Creative director at work"
  },
  {
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=90",
    alt: "Behind the scenes on set"
  },
  {
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=90",
    alt: "Creative workspace and tools"
  },
]

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [direction, setDirection] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  // Ensure client-side only rendering
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Auto-advance carousel with play/pause control
  useEffect(() => {
    if (!isPlaying || !isMounted) return  

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying, isMounted])

  const goToNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [])

  const goToPrevious = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }, [currentIndex])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // Keyboard navigation
  useEffect(() => {
    if (!isMounted) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      } else if (e.key === ' ') {
        e.preventDefault()
        togglePlayPause()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrevious, isMounted])

  // Don't render anything until mounted to prevent hydration issues
  if (!isMounted) {
    return (
      <div className="relative w-full max-w-md lg:w-[420px] mx-auto lg:mx-0">
        <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-white/10 bg-black">
          <div className="relative h-full w-full">
            <img
              src={images[0].src}
              alt={images[0].alt}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      className="relative w-full max-w-md lg:w-[420px] mx-auto lg:mx-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div 
        className="group relative aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-white/10 bg-black"
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Image container with parallax effect */}
        <div className="relative h-full w-full">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ 
                opacity: 0,
                scale: 1.1,
                x: direction * 50,
                rotateY: direction * 15
              }}
              animate={{ 
                opacity: 1,
                scale: 1,
                x: 0,
                rotateY: 0
              }}
              exit={{ 
                opacity: 0,
                scale: 0.9,
                x: -direction * 50,
                rotateY: -direction * 15
              }}
              transition={{
                duration: 0.8,
                ease: [0.4, 0.0, 0.2, 1]
              }}
              className="absolute inset-0"
            >
              <motion.img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="h-full w-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "linear" }}
                whileHover={{ scale: 1.05 }}
              />
              
              {/* Enhanced gradient overlay with animation */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
              
              {/* Animated vignette effect */}
              <motion.div 
                className="absolute inset-0 bg-radial-gradient"
                style={{
                  background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.3) 100%)"
                }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced progress bar with glow effect */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 shadow-lg"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 5, 
              ease: "linear",
              repeat: isPlaying ? Infinity : 0
            }}
            style={{
              boxShadow: "0 0 10px rgba(251, 191, 36, 0.5)"
            }}
          />
        </div>

        {/* Navigation buttons with enhanced animations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute inset-0 flex items-center justify-between p-4"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPrevious}
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/60 hover:bg-black/80 text-white border-0 backdrop-blur-sm hover:scale-110"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNext}
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/60 hover:bg-black/80 text-white border-0 backdrop-blur-sm hover:scale-110"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced control panel */}
        <motion.div 
          className="absolute top-4 right-4 flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlayPause}
              className="bg-black/60 hover:bg-black/80 text-white border-0 backdrop-blur-sm"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced dots indicator with pulse effect */}
        <motion.div 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative group/dot"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div 
                className={`h-3 w-3 rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                animate={index === currentIndex ? {
                  scale: [1, 1.2, 1],
                  boxShadow: ["0 0 0 rgba(255,255,255,0.4)", "0 0 20px rgba(255,255,255,0.8)", "0 0 0 rgba(255,255,255,0.4)"]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-white/20"
                initial={{ scale: 0 }}
                animate={{ 
                  scale: index === currentIndex ? 1.5 : 0 
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced slide counter */}
        <motion.div 
          className="absolute bottom-4 right-4 text-xs text-white/60 font-mono"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1 }}
        >
          {currentIndex + 1} / {images.length}
        </motion.div>

        {/* Enhanced creative floating elements */}
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 8, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-6 left-6 opacity-30"
          whileHover={{ scale: 1.2, opacity: 0.6 }}
        >
          <Camera className="w-8 h-8 text-amber-400 drop-shadow-lg" />
        </motion.div>
        
        {/* Additional floating element */}
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            rotate: [0, -5, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-6 left-6"
        >
          <div className="w-4 h-4 border-2 border-amber-400/50 rounded-full" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

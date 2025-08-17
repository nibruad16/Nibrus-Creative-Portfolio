"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Play, Pause, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

const images = [
  { src: "/ME/1.JPG", alt: "Nibru Kefyalew portrait 1" },
  { src: "/ME/3.JPG", alt: "Nibru Kefyalew portrait 3" },
  { src: "/ME/5.JPG", alt: "Nibru Kefyalew portrait 5" },
  { src: "/ME/6.JPG", alt: "Nibru Kefyalew portrait 6" },
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
      <div className="relative w-full max-w-md mx-auto">
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
    <div className="relative w-full max-w-md mx-auto">
      <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-white/10 bg-black">
        {/* Image container with parallax effect */}
        <div className="relative h-full w-full">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ 
                opacity: 0,
                scale: 1.1,
                x: direction * 50
              }}
              animate={{ 
                opacity: 1,
                scale: 1,
                x: 0
              }}
              exit={{ 
                opacity: 0,
                scale: 0.9,
                x: -direction * 50
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
              />
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 5, 
              ease: "linear",
              repeat: isPlaying ? Infinity : 0
            }}
          />
        </div>

        {/* Navigation buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute inset-0 flex items-center justify-between p-4"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPrevious}
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/60 hover:bg-black/80 text-white border-0 backdrop-blur-sm hover:scale-110"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={goToNext}
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/60 hover:bg-black/80 text-white border-0 backdrop-blur-sm hover:scale-110"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Control panel */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlayPause}
            className="bg-black/60 hover:bg-black/80 text-white border-0 backdrop-blur-sm"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>

        {/* Enhanced dots indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative group/dot"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className={`h-3 w-3 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`} />
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
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-4 right-4 text-xs text-white/60 font-mono">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Creative floating elements */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-6 left-6 opacity-20"
        >
          <Camera className="w-8 h-8 text-amber-400" />
        </motion.div>
      </div>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { Play, Sparkles, Volume2, VolumeX } from "lucide-react" // + audio icons
import { useEffect, useRef, useState } from "react"               // + hooks

type CTA = { href: string; label: string; icon?: string }

export function AnimatedHero({
  title = "AI Video & Image Specialist Cinematic Post-Production",
  subtitle = "I create stunning, impossible visuals that tell a story.",
  ctaPrimary = { href: "#projects", label: "View Work" },
  ctaSecondary = { href: "#contact", label: "Start a Project" },
  videoSrc = "/hero-reel.mp4",
  poster = "/placeholder-edlc5.png",
}: {
  title?: string
  subtitle?: string
  ctaPrimary?: CTA
  ctaSecondary?: CTA
  videoSrc?: string
  poster?: string
}) {
  // Map icon string to Lucide icon component
  const iconMap: Record<string, LucideIcon> = { Play, Sparkles }
  const PrimaryIcon = ctaPrimary.icon ? iconMap[ctaPrimary.icon] : undefined
  const SecondaryIcon = ctaSecondary.icon ? iconMap[ctaSecondary.icon] : undefined

  // --- Audio control (NEW) ---
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted
  }, [muted])
  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    const next = !muted
    setMuted(next)
    v.muted = next
    if (!next) v.play().catch(() => {})
  }
  // --- end audio control ---

  return (
    <div className="relative isolate">
      <VideoBackground src={videoSrc} poster={poster} videoRef={videoRef} muted={muted} />
      <div className="relative mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-white/85 backdrop-blur"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
          Story‑First. Future‑Ready.
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="mt-6 bg-gradient-to-b from-white to-white/70 bg-clip-text text-4xl font-semibold leading-tight text-transparent md:text-6xl"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mx-auto mt-4 max-w-2xl text-base text-white/80 md:text-lg"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild size="lg" className="gap-2">
            <Link href={ctaPrimary.href}>
              {PrimaryIcon ? <PrimaryIcon className="h-4 w-4" /> : null}
              {ctaPrimary.label}
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="gap-2">
            <Link href={ctaSecondary.href}>
              {SecondaryIcon ? <SecondaryIcon className="h-4 w-4" /> : null}
              {ctaSecondary.label}
            </Link>
          </Button>
        </motion.div>

        {/* Mute/Unmute button directly BELOW the CTAs with same motion as others */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }} // after the CTAs (0.3)
          className="mt-4 flex justify-center"
        >
          <Button
            type="button"
            onClick={toggleMute}
            size="lg"
            className="gap-2 bg-amber-400 text-black hover:bg-amber-300 focus-visible:ring-amber-400"
            aria-pressed={!muted}
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {muted ? "Unmute Video" : "Mute Video"}
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

function VideoBackground({
  src,
  poster,
  videoRef,
  muted,
}: {
  src: string
  poster?: string
  videoRef: React.RefObject<HTMLVideoElement | null>
  muted: boolean
}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        loop
        muted={muted}
        playsInline
        preload="metadata"
        poster={poster}
        src={src} // ensure src on <video> for better compatibility
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* overlays */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute inset-0 [background:radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.10),rgba(0,0,0,0)_45%)]" />
    </div>
  )
}

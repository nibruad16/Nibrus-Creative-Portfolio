"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { Play, Sparkles } from "lucide-react"

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
  const iconMap: Record<string, LucideIcon> = {
    Play,
    Sparkles,
  }
  const PrimaryIcon = ctaPrimary.icon ? iconMap[ctaPrimary.icon] : undefined
  const SecondaryIcon = ctaSecondary.icon ? iconMap[ctaSecondary.icon] : undefined

  return (
    <div className="relative isolate">
      <VideoBackground src={videoSrc} poster={poster} />
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
      </div>
    </div>
  )
}

function VideoBackground({ src, poster }: { src: string; poster?: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <video className="h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={poster}>
        <source src={src} type="video/mp4" />
      </video>
      {/* Readability overlays */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute inset-0 [background:radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.10),rgba(0,0,0,0)_45%)]" />
    </div>
  )
}

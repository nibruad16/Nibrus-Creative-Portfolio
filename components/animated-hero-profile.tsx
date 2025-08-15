import { motion } from "framer-motion"
import { Button } from "./ui/button"
import Link from "next/link"

export function AnimatedHeroProfile() {
  return (
    <section className="relative isolate min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 text-center overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-400/30 via-purple-600/30 to-black/80 animate-gradient-x"
      />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-white bg-clip-text text-transparent"
      >
        AI Video & Image Specialist | Cinematic Post-Production
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mt-4 text-lg md:text-2xl text-white/90"
      >
        I create stunning, impossible visuals that tell a story.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-white/80"
      >
        In today's fast-moving digital landscape, I provide a unique solution: the imaginative power of artificial intelligence, elevated by the timeless craft of cinematic filmmaking. I direct state-of-the-art AI models to generate bespoke videos and images that captivate audiences, and then I apply the rigorous skill of a post-production professional to ensure the final result isn't just novel, but truly cinematic.
      </motion.p>
      <div className="mt-8 grid gap-4 md:grid-cols-3 text-left max-w-4xl mx-auto">
        <div>
          <span className="text-2xl">✨</span>
          <h3 className="font-semibold mt-2">AI-First Creative Services</h3>
          <ul className="list-disc pl-5 text-sm text-white/80 mt-2 space-y-1">
            <li>AI Video Generation: Social ads, brand stories, music clips, animation</li>
            <li>AI Image Generation: Brand characters, product mockups, concept art</li>
            <li>Hybrid Filmmaking: Blend AI with real footage for unique results</li>
          </ul>
        </div>
        <div>
          <span className="text-2xl">🎬</span>
          <h3 className="font-semibold mt-2">Cinematic Finish</h3>
          <ul className="list-disc pl-5 text-sm text-white/80 mt-2 space-y-1">
            <li>Cinematic Editing & Pacing</li>
            <li>Professional Color Grading (DaVinci Resolve Studio)</li>
            <li>Immersive Sound Design</li>
          </ul>
        </div>
        <div>
          <span className="text-2xl">🧰</span>
          <h3 className="font-semibold mt-2">My Toolbox</h3>
          <ul className="list-disc pl-5 text-sm text-white/80 mt-2 space-y-1">
            <li>AI: Google Veo, Runway, Pika Labs, HeyGen, Midjourney, DALL-E 4</li>
            <li>Post: DaVinci Resolve, Premiere Pro, After Effects</li>
          </ul>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-10"
      >
        <Button asChild size="lg" className="gap-2">
          <Link href="#contact">
            Let&apos;s Collaborate
          </Link>
        </Button>
      </motion.div>
    </section>
  )
}

// Add this to your hero section in place of the video hero.
// You can further customize the animation or content as you like.

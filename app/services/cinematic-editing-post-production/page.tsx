import type { Metadata } from "next"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import { ArrowRight, Film, Palette, Music, Scissors, Star, Award, Zap, Eye } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Cinematic Editing & Post‑Production",
  description: "Professional editing, color grading, SFX, VFX, and CGI to build visually stunning and emotionally resonant content.",
}

export default function PostPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full">
              <Film className="h-4 w-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium tracking-wide uppercase">Cinematic Excellence</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-b from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Cinematic Editing &
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Post‑Production
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Find the human soul in your footage and elevate it with world-class color, sound, and visual effects. 
              Every frame tells a story.
            </p>
            
            <div className="flex items-center justify-center gap-8 pt-8">
              <div className="flex items-center gap-2">
                <Scissors className="h-5 w-5 text-amber-400" />
                <span className="text-white/80">Expert Editing</span>
              </div>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-amber-400" />
                <span className="text-white/80">Color Grading</span>
              </div>
              <div className="flex items-center gap-2">
                <Music className="h-5 w-5 text-amber-400" />
                <span className="text-white/80">Sound Design</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Section
        id="post"
        eyebrow="Service Overview"
        title="Where Art Meets Technology"
        description="From assembly through final polish, we craft rhythm and emotion in the edit. We grade for mood and texture, design soundscapes for immersion, and integrate SFX/VFX/CGI where they heighten the story."
      >
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white/90">
                Professional Post-Production Pipeline
              </h3>
              <p className="text-lg text-white/70 leading-relaxed">
                From assembly through final polish, I craft rhythm and emotion in the edit. I grade for mood and texture,
                design soundscapes for immersion, and integrate SFX/VFX/CGI where they heighten the story.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl">
                <h4 className="text-lg font-semibold text-white/90 mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-400" />
                  Includes
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-white/70">Editorial: story, pacing, rhythm</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-white/70">Color: look creation, shot matching, delivery</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-white/70">Sound: design, mixing, licensed music</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-white/70">VFX/CGI: cleanup, comps, titles</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl">
                <h4 className="text-lg font-semibold text-white/90 mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-400" />
                  Best For
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-white/70">Travel films with evocative atmosphere</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-white/70">Luxury brand films requiring refined aesthetics</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-white/70">Real estate showcases needing premium polish</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 text-lg">
                <Link href="/#contact">
                  Book Post‑Production <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Professional video editing timeline and interface"
                className="w-full rounded-2xl border border-white/10 shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl"></div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl">
              <p className="text-sm text-white/70 flex items-start gap-2">
                <Eye className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                Professional DaVinci Resolve Studio workflow with industry-standard color grading and finishing.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Process Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24">
          <div className="text-center space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Workflow</span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                A comprehensive post-production pipeline designed to deliver cinematic excellence at every stage.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-4">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center border border-amber-500/30">
                  <span className="text-2xl">🎬</span>
                </div>
                <h3 className="text-xl font-semibold text-white">Assembly</h3>
                <p className="text-white/70">Initial edit structure and story development</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center border border-amber-500/30">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-semibold text-white">Color Grading</h3>
                <p className="text-white/70">Mood creation and visual consistency</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center border border-amber-500/30">
                  <span className="text-2xl">🎵</span>
                </div>
                <h3 className="text-xl font-semibold text-white">Sound Design</h3>
                <p className="text-white/70">Audio enhancement and music integration</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center border border-amber-500/30">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold text-white">Final Polish</h3>
                <p className="text-white/70">VFX integration and delivery preparation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

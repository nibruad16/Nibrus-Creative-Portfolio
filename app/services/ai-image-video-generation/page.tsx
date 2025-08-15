import type { Metadata } from "next"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap, Eye, Palette, Music, Star, Award, TrendingUp } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "AI Image/Video Generation",
  description:
    "Direct state-of-the-art models to generate bespoke video and imagery, curated and assembled with cinematic sensibility.",
}

export default function AIPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium tracking-wide uppercase">AI-Powered Creation</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-b from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              AI Image & Video
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Generation
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Create impossible visuals beyond what cameras can capture. 
              From concept to final delivery, we bring your wildest ideas to life.
            </p>
            
            <div className="flex items-center justify-center gap-8 pt-8">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-400" />
                <span className="text-white/80">State-of-the-Art AI</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-amber-400" />
                <span className="text-white/80">Cinematic Curation</span>
              </div>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-amber-400" />
                <span className="text-white/80">Professional Polish</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Section
        id="ai-gen"
        eyebrow="Service Overview"
        title="Beyond the Camera's Reach"
        description="We develop unique visual languages and translate them into sophisticated AI prompts, curating hundreds of generations to find the moments that truly speak."
      >
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white/90">
                From Concept to Cinematic Reality
              </h3>
              <p className="text-lg text-white/70 leading-relaxed">
                I develop a unique visual language for your project and translate it into sophisticated prompts. I then
                curate hundreds of generations to find the moments that truly speak — assembling them into a coherent,
                emotionally powerful sequence.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl">
                <h4 className="text-lg font-semibold text-white/90 mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-400" />
                  Deliverables
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-white/70">Concept deck + prompt bible</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-white/70">Curated AI shot list and selects</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-white/70">Edited sequence with color + sound polish</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-white/70">Social and vertical masters on request</span>
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
                    <span className="text-white/70">Futuristic campaigns and product launches</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-white/70">Impossible locations, creatures, or time periods</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-white/70">Pitch films, style explorations, and previsualization</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 text-lg">
                <Link href="/#contact">
                  Start Your AI Project <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="AI generated cinematic frames"
                className="w-full rounded-2xl border border-white/10 shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl"></div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl">
              <p className="text-sm text-white/70 flex items-start gap-2">
                <Music className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                All AI imagery is curated and polished with professional post workflows for a cohesive cinematic finish.
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
                Our <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Process</span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                From initial concept to final delivery, we ensure every step is executed with precision and creativity.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center border border-amber-500/30">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-semibold text-white">Concept & Prompting</h3>
                <p className="text-white/70">Develop unique visual language and sophisticated AI prompts</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center border border-amber-500/30">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold text-white">Curation & Selection</h3>
                <p className="text-white/70">Curate hundreds of generations to find the perfect moments</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center border border-amber-500/30">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold text-white">Assembly & Polish</h3>
                <p className="text-white/70">Assemble into coherent sequences with professional post-production</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

import type { Metadata } from "next"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Long-Form & Short-Form Editing",
  description: "Editorial for long-form narratives and short-form social cuts with platform-native pacing and impact.",
}

export default function EditingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Section
        id="editing"
        eyebrow="Service"
        title="Long‑Form & Short‑Form Editing"
        description="Films, docs, brand stories — and high‑impact short content aligned to platform behaviors."
      >
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full">
              <div className="h-2 w-2 rounded-full bg-amber-400 mr-3"></div>
              <span className="text-amber-400 text-sm font-medium tracking-wide uppercase">In Development</span>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white/90">
                Narrative long‑form and high‑impact short‑form tailored to each platform without sacrificing craft.
              </h3>
              <p className="text-lg text-white/70 leading-relaxed">
                This service is currently being developed to deliver exceptional editorial work that bridges cinematic storytelling with platform-specific optimization.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white/90 mb-4">Service Overview</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-white/70">Master edit plus platform‑ready versions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-white/70">Captions, titles, and brand asset integration</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-white/70">Aspect ratios: 16:9, 1:1, 9:16</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white/90 mb-4">Target Platforms</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-white/70">YouTube, TikTok, Instagram, X, LinkedIn</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-white/70">Broadcast‑safe deliveries on request</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                variant="outline" 
                className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/50 transition-all duration-300"
                disabled
              >
                <span className="mr-2">⏳</span>
                Coming Soon
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-video rounded-xl border border-white/10 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Professional video editing timeline and interface"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center border border-amber-500/30 backdrop-blur-sm">
                    <span className="text-2xl">🎬</span>
                  </div>
                  <div className="backdrop-blur-sm bg-black/40 rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-white/90 mb-2">Service in Development</h3>
                    <p className="text-white/60 text-sm max-w-xs mx-auto">
                      We're crafting the perfect editing workflow to deliver exceptional results for your content.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  )
}

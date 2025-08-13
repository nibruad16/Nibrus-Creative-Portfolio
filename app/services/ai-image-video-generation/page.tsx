import type { Metadata } from "next"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "AI Image/Video Generation",
  description:
    "Direct state-of-the-art models to generate bespoke video and imagery, curated and assembled with cinematic sensibility.",
}

export default function AIPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Section
        id="ai-gen"
        eyebrow="Service"
        title="AI Image/Video Generation"
        description="Direct state‑of‑the‑art models to create visuals beyond what a camera can capture."
      >
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <p className="text-muted-foreground">
              I develop a unique visual language for your project and translate it into sophisticated prompts. I then
              curate hundreds of generations to find the moments that truly speak — assembling them into a coherent,
              emotionally powerful sequence.
            </p>
            <div>
              <h4 className="font-semibold">Deliverables</h4>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Concept deck + prompt bible</li>
                <li>Curated AI shot list and selects</li>
                <li>Edited sequence with color + sound polish</li>
                <li>Social and vertical masters on request</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Best for</h4>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Futuristic campaigns and product launches</li>
                <li>Impossible locations, creatures, or time periods</li>
                <li>Pitch films, style explorations, and previsualization</li>
              </ul>
            </div>
            <Button asChild>
              <Link href="/#contact">Start a project</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ai-cinematic-montage.png"
              alt="AI generated cinematic frames"
              className="w-full rounded-xl border border-white/10"
            />
            <p className="text-xs text-muted-foreground">
              All AI imagery is curated and polished with professional post workflows for a cohesive cinematic finish.
            </p>
          </div>
        </div>
      </Section>
    </main>
  )
}

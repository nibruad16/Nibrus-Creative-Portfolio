import type { Metadata } from "next"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Cinematic Editing & Post-Production",
  description:
    "Editing, color grading, SFX, VFX, and CGI that serve the narrative with emotional pacing and world‑building.",
}

export default function PostPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Section
        id="post"
        eyebrow="Service"
        title="Cinematic Editing & Post‑Production"
        description="Find the human soul in the footage — then elevate it with color, sound, and visual effects."
      >
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <p className="text-muted-foreground">
              From assembly through final polish, I craft rhythm and emotion in the edit. I grade for mood and texture,
              design soundscapes for immersion, and integrate SFX/VFX/CGI where they heighten the story.
            </p>
            <div>
              <h4 className="font-semibold">Includes</h4>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Editorial: story, pacing, rhythm</li>
                <li>Color: look creation, shot matching, delivery</li>
                <li>Sound: design, mixing, licensed music</li>
                <li>VFX/CGI: cleanup, comps, titles</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Best for</h4>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Travel films with evocative atmosphere</li>
                <li>Luxury brand films requiring refined aesthetics</li>
                <li>Real estate showcases needing premium polish</li>
              </ul>
            </div>
            <Button asChild>
              <Link href="/#contact">Book post‑production</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/davinci-resolve-color-grading-ui.png"
              alt="Color grading and editing suite"
              className="w-full rounded-xl border border-white/10"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/vfx-compositing-timeline.png"
              alt="VFX compositing timeline"
              className="w-full rounded-xl border border-white/10"
            />
          </div>
        </div>
      </Section>
    </main>
  )
}

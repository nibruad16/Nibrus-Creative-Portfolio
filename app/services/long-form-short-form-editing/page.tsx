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
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <p className="text-muted-foreground">
              I tailor narrative structure and rhythm to your goals and audience. Long‑form builds arcs and immersion;
              short‑form maximizes hook, retention, and shareability without sacrificing craft.
            </p>
            <div>
              <h4 className="font-semibold">Deliverables</h4>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Master edit plus platform‑ready versions</li>
                <li>Captions, titles, and brand asset integration</li>
                <li>Aspect ratios: 16:9, 1:1, 9:16</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Platforms</h4>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>YouTube, TikTok, Instagram, X, LinkedIn</li>
                <li>Broadcast‑safe deliveries on request</li>
              </ul>
            </div>
            <Button asChild>
              <Link href="/#contact">Cut my footage</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/placeholder-cei3j.png"
              alt="Short form editing timeline"
              className="w-full rounded-xl border border-white/10"
            />
          </div>
        </div>
      </Section>
    </main>
  )
}

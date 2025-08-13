import type { Metadata } from "next"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Promotion & Advert Creation",
  description: "Concept-to-delivery campaigns that merge cinematic craft with AI-driven ideation and visuals.",
}

export default function PromoPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Section
        id="promo"
        eyebrow="Service"
        title="Promotion & Advert Creation"
        description="Concept, creative direction, and production for campaigns designed to convert."
      >
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <p className="text-muted-foreground">
              I bridge creative ideation with technical execution. From mood films and hero spots to social launch kits,
              I deliver cohesive campaigns grounded in strategy and story.
            </p>
            <div>
              <h4 className="font-semibold">Process</h4>
              <ol className="mt-2 list-decimal pl-5 text-sm text-muted-foreground space-y-1">
                <li>Discovery: goals, audience, KPIs</li>
                <li>Concept & script, references & look</li>
                <li>Production: live‑action, AI, or hybrid</li>
                <li>Post: edit, grade, sound, versions</li>
                <li>Delivery: masters, cutdowns, captions</li>
              </ol>
            </div>
            <Button asChild>
              <Link href="/#contact">Plan my campaign</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/luxury-product-macro.png"
              alt="Luxury product advertising"
              className="w-full rounded-xl border border-white/10"
            />
          </div>
        </div>
      </Section>
    </main>
  )
}

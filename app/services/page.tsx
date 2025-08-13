import type { Metadata } from "next"
import { services } from "@/lib/data"
import { Section } from "@/components/section"
import { ServiceCard } from "@/components/service-card"

export const metadata: Metadata = {
  title: "Services • Cinematic & AI",
  description: "AI Image/Video Generation, Cinematic Editing & Post, Short/Long Form, Promotion & Ad Creation.",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Section
        id="services-page"
        eyebrow="Services"
        title="Capabilities to build your vision"
        description="Explore the detail behind each offering. Click to learn about process, deliverables, and FAQs."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>
    </main>
  )
}

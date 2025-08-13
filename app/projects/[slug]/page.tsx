import { notFound } from "next/navigation"
import { projects } from "@/lib/data"
import { Section } from "@/components/section"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = projects.find((x) => x.slug === params.slug)
  return {
    title: p ? `${p.title} • Project` : "Project",
    description: p?.summary ?? "Project detail",
  }
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const p = projects.find((x) => x.slug === params.slug)
  if (!p) return notFound()

  return (
    <main className="min-h-screen bg-black text-white">
      <Section id="project" eyebrow={p.category} title={p.title} description={p.summary}>
        <div className="space-y-6">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.thumbnail || "/placeholder.svg"} alt={p.title} className="h-full w-full object-cover" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold">Approach</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Editorial focused on emotional pacing; color graded for mood; immersive sound bed with carefully
                designed transitions. Where applicable, AI‑generated inserts extended the visual language.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Deliverables</h4>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Master 4K (and 1080p)</li>
                <li>Social cutdowns in 9:16, 1:1</li>
                <li>Captions, titles, clean version</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </main>
  )
}

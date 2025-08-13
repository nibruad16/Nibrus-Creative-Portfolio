import type { Metadata } from "next"
import { Section } from "@/components/section"
import { projects } from "@/lib/data"
import { ProjectCard } from "@/components/project-card"

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected work across travel, luxury branding, real estate, and ads.",
}

export default function ProjectsIndex() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Section
        id="projects-index"
        eyebrow="Portfolio"
        title="All Projects"
        description="Browse a selection of cinematic edits, AI‑driven films, and hybrid pieces."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>
    </main>
  )
}

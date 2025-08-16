"use client"

import { useMemo, useState } from "react"
import { Section } from "@/components/section"
import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { categories, projects } from "@/lib/data"

export default function ProjectsPage() {
  const [active, setActive] = useState<string>("All")
  const [q, setQ] = useState("")

  const filtered = useMemo(() => {
    const lower = q.trim().toLowerCase()
    return projects.filter((p: any) => {
      const inSearch =
        !lower ||
        String(p.title || "").toLowerCase().includes(lower) ||
        String(p.description || "").toLowerCase().includes(lower)
      const inCategory =
        active === "All" ||
        String((p as any).category || "").toLowerCase() === active.toLowerCase()
      return inSearch && inCategory
    })
  }, [active, q])

  return (
    <main className="min-h-screen bg-black text-white">
      <Section
        id="projects"
        eyebrow="Selected Work"
        title="Projects"
        description="Browse all projects. Filter by category or search."
      >
        {/* Filters */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {["All", ...categories].map((c) => (
              <Button
                key={c}
                variant={active === c ? "default" : "secondary"}
                size="sm"
                className={active === c ? "bg-amber-400 text-black hover:bg-amber-300" : ""}
                onClick={() => setActive(c)}
              >
                {c}
              </Button>
            ))}
          </div>
          <div className="w-full md:w-80">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search projects…"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p: any) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-8 text-center text-sm text-white/60">
            No projects match your search.
          </div>
        )}
      </Section>
    </main>
  )
}

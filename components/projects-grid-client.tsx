"use client"

import { useEffect, useState } from "react"
import { ProjectCard } from "./project-card"
import { Button } from "./ui/button"
import Link from "next/link"
import { categories, projects as staticProjects, type Project } from "@/lib/data"
import { getAllProjectsClient } from "@/lib/projects"

export function ProjectsGridClient() {
  const [allProjects, setAllProjects] = useState<Project[]>(staticProjects)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllProjectsClient()
      .then((fetched) => {
        setAllProjects(fetched)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div suppressHydrationWarning>
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <span
            key={c}
            className="select-none rounded-full border border-white/15 px-3 py-1 text-xs text-muted-foreground"
          >
            {c}
          </span>
        ))}
      </div>
      {loading ? (
        <div className="text-center py-8 text-white/60">Loading projects...</div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
          <div className="mt-8 flex">
            <Button asChild variant="secondary">
              <Link href="/projects">Browse all projects</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}


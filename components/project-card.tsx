import Link from "next/link"

export type Project = {
  title: string
  slug: string
  category: string
  summary: string
  thumbnail: string
}

export function ProjectCard({
  project = {
    title: "Desert Odyssey",
    slug: "desert-odyssey",
    category: "Travel",
    summary: "A meditative travel film through sculpted light and sand.",
    thumbnail: "/desert-dunes-golden-hour.png",
  },
}: {
  project?: Project
}) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block overflow-hidden rounded-xl border border-white/10">
      <div className="relative aspect-video overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.thumbnail || "/placeholder.svg"}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/40 px-2 py-0.5 text-xs text-white/80 backdrop-blur">
          {project.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{project.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{project.summary}</p>
      </div>
    </Link>
  )
}

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
    <Link href={`/projects/${project.slug}`} className="group block overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 via-white/[0.02] to-transparent backdrop-blur-sm transition-all duration-500 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1">
      <div className="relative aspect-video overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.thumbnail || "/placeholder.svg"}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute left-3 top-3 rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-3 py-1 text-xs text-amber-400 backdrop-blur-sm font-medium">
          {project.category}
        </div>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-white text-sm font-medium">View Project</span>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg text-white/90 group-hover:text-amber-400 transition-colors duration-300">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-white/70 leading-relaxed">{project.summary}</p>
      </div>
    </Link>
  )
}

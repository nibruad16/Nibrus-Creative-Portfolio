import Link from "next/link"
import { Play } from "lucide-react"
import type { Project } from "@/lib/data"
import { extractYouTubeId } from "@/lib/youtube"

export function ProjectCard({ project }: { project: Project }) {
  const href = `/projects/${project.slug}`

  // Build thumbnail
  let thumb: string | undefined
  if (project.type === "video") {
    const yid = extractYouTubeId(project.youtubeId || project.youtubeUrl || "")
    thumb = project.cover ?? (yid ? `https://img.youtube.com/vi/${yid}/hqdefault.jpg` : undefined)
  } else {
    thumb = project.cover
  }

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-amber-400/10 hover:-translate-y-0.5"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {thumb ? (
          <img
            src={thumb}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-white/60">
            No preview
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_60%_at_50%_0%,rgba(251,191,36,0.12),transparent)]" />
        <div className="absolute left-2 top-2">
          <span className="rounded-full bg-amber-400/95 px-2 py-0.5 text-[10px] font-semibold text-black shadow">
            {project.type === "video" ? "Video" : "Images"}
          </span>
        </div>
        {project.type === "video" && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-black/45 p-3 backdrop-blur transition-opacity group-hover:bg-black/60">
              <Play className="h-5 w-5 text-white" />
            </div>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="line-clamp-1 text-base font-semibold">{project.title}</h3>
        {"category" in project && project.category && (
          <p className="mt-1 text-xs text-white/60">{project.category}</p>
        )}
      </div>
    </Link>
  )
}

import { notFound } from "next/navigation"
import { Section } from "@/components/section"
import { getProjectBySlug, type ImageProject } from "@/lib/data"
import { extractYouTubeId } from "@/lib/youtube"
import { Button } from "@/components/ui/button"

type Params = { slug: string }

export default async function ProjectDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params // Next.js 15 requires awaiting params
  const project = getProjectBySlug(slug)
  if (!project) return notFound()

  return (
    <main className="min-h-screen bg-black text-white">
      <Section
        id="project"
        eyebrow="Project"
        title={project.title}
        description={project.type === "image" ? project.description || "" : ""}
      >
        {project.type === "video" ? (
          <VideoView
            youtubeId={extractYouTubeId(project.youtubeId || project.youtubeUrl || "")}
            description={project.description}
          />
        ) : (
          <ImageView project={project as ImageProject} />
        )}
      </Section>
    </main>
  )
}

function VideoView({ youtubeId, description }: { youtubeId: string | null; description?: string }) {
  if (!youtubeId) return <div className="text-white/70">Invalid YouTube link.</div>
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      {description && <p className="prose prose-invert mt-6 max-w-none text-white/80">{description}</p>}
    </div>
  )
}

function ImageView({ project }: { project: ImageProject }) {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <div className="overflow-hidden rounded-xl border border-white/10">
        <img src={project.cover} alt={`${project.title} cover`} className="w-full object-cover" />
      </div>
      <div>
        <h3 className="mb-3 text-lg font-semibold">Gallery</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.images.map((img, i) => (
            <figure key={i} className="overflow-hidden rounded-lg border border-white/10 bg-white/5">
              <img src={img.src} alt={img.caption || `Image ${i + 1}`} className="h-full w-full object-cover" />
              {(img.caption || img.prompt) && (
                <figcaption className="space-y-1 p-3 text-xs text-white/80">
                  {img.caption && <div className="font-medium">{img.caption}</div>}
                  {img.prompt && (
                    <div className="rounded bg-black/40 p-2 text-[11px] text-white/70">
                      <span className="text-white/60">Prompt:</span> {img.prompt}
                    </div>
                  )}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <Button asChild variant="secondary">
          <a href="/projects">Back to projects</a>
        </Button>
      </div>
    </div>
  )
}

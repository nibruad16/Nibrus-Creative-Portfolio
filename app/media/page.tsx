import { getAllProjects } from "@/lib/projects"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function MediaPage() {
  const projects = await getAllProjects()
  const imageProjects = projects.filter((p) => p.type === "image")
  const videoProjects = projects.filter((p) => p.type === "video")

  return (
    <main className="min-h-screen bg-black text-white px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-amber-300/80">Media</p>
          <h1 className="text-3xl font-bold">Uploaded Images & Videos</h1>
          <p className="text-sm text-white/70">
            All media added via the admin. Images are served from <code className="text-amber-300">/uploads</code>;
            videos link to their sources (YouTube or uploaded files).
          </p>
        </header>

        {/* Images */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Images ({imageProjects.length})</h2>
          </div>
          {imageProjects.length === 0 ? (
            <p className="text-sm text-white/60">No image projects yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {imageProjects.flatMap((proj) =>
                proj.images.map((img, i) => (
                  <div
                    key={`${proj.slug}-${i}`}
                    className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-sm"
                  >
                    <div className="relative aspect-[4/3]">
                      <img
                        src={img.src}
                        alt={img.caption || proj.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-3 space-y-1">
                      <p className="text-sm font-semibold line-clamp-1">{proj.title}</p>
                      <p className="text-xs text-white/60 line-clamp-1">{img.caption || proj.description}</p>
                      <div className="flex items-center justify-between text-xs text-white/50">
                        <Link href={`/projects/${proj.slug}`} className="text-amber-300 hover:text-amber-200">
                          View project
                        </Link>
                        <a href={img.src} target="_blank" rel="noreferrer" className="hover:text-white/80">
                          Open image
                        </a>
                      </div>
                    </div>
                  </div>
                )),
              )}
            </div>
          )}
        </section>

        {/* Videos */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Videos ({videoProjects.length})</h2>
          </div>
          {videoProjects.length === 0 ? (
            <p className="text-sm text-white/60">No video projects yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {videoProjects.map((proj) => (
                <div
                  key={proj.slug}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2 shadow-sm"
                >
                  <p className="text-sm font-semibold line-clamp-1">{proj.title}</p>
                  {"category" in proj && proj.category && (
                    <p className="text-xs text-white/60">Category: {proj.category}</p>
                  )}
                  {proj.description && <p className="text-xs text-white/70 line-clamp-2">{proj.description}</p>}
                  {"youtubeUrl" in proj && proj.youtubeUrl && (
                    <a
                      href={proj.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-300 text-xs hover:text-amber-200"
                    >
                      Open video
                    </a>
                  )}
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <Link href={`/projects/${proj.slug}`} className="text-amber-300 hover:text-amber-200">
                      View project
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}


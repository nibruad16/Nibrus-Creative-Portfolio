import { ExternalLink } from "lucide-react"

export type Tool = {
  name: string
  role: string
  description: string
  url: string
  image?: string
  highlights?: string[]
}

export function ToolCard({
  tool = {
    name: "DaVinci Resolve Studio",
    role: "Editing • Color • Fairlight",
    description: "End‑to‑end finishing with world‑class color science and precision editorial.",
    url: "https://www.blackmagicdesign.com/products/davinciresolve",
    image: "/davinci-resolve-ui.png",
    highlights: ["Color", "Conform", "Fairlight"],
  },
}: {
  tool?: Tool
}) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent"
    >
      <div className="relative h-36 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tool.image || "/placeholder.svg?height=160&width=320&query=creative%20tool%20logo%20or%20ui"}
          alt={tool.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="text-base font-semibold">{tool.name}</h4>
            <p className="text-xs text-amber-300/90">{tool.role}</p>
          </div>
          <ExternalLink className="h-4 w-4 text-white/60 transition-colors group-hover:text-white" />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{tool.description}</p>
        {tool.highlights && tool.highlights.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {tool.highlights.map((h) => (
              <span key={h} className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] text-white/70">
                {h}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </a>
  )
}

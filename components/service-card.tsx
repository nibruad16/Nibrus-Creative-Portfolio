import Link from "next/link"
import { ArrowRight, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Service = {
  title: string
  slug: string
  summary: string
  includes?: string[]
  icon?: LucideIcon
  image?: string
}

export function ServiceCard({
  service = {
    title: "AI Image/Video Generation",
    slug: "ai-image-video-generation",
    summary: "Direct state-of-the-art models to create bespoke visuals beyond the camera.",
  },
}: {
  service?: Service
}) {
  const Icon = service.icon
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent">
      <div className="relative h-40 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            service.image ??
            "/placeholder.svg?height=240&width=480&query=ai%20video%20generation%20cinematic%20abstract%20light"
          }
          alt={service.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          {Icon ? <Icon className="h-4 w-4 text-amber-400" /> : null}
          <h3 className="text-lg font-semibold">{service.title}</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{service.summary}</p>
        <div className="mt-auto pt-4">
          <Button asChild variant="secondary" size="sm" className="group/btn">
            <Link href={`/services/${service.slug}`}>
              Explore <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

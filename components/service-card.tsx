import Link from "next/link"
import { ArrowRight, type LucideIcon, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Service = {
  title: string
  slug: string
  summary: string
  includes?: string[]
  icon?: LucideIcon
  image?: string
  comingSoon?: boolean
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
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 via-white/[0.02] to-transparent backdrop-blur-sm transition-all duration-500 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1">
      {/* Premium Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full">
          <Star className="h-3 w-3 text-amber-400" />
          <span className="text-xs text-amber-400 font-medium">Premium</span>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            service.image ??
            "/placeholder.svg?height=240&width=480&query=ai%20video%20generation%20cinematic%20abstract%20light"
          }
          alt={service.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Overlay Icons */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full border border-white/20">
            <Zap className="h-4 w-4 text-amber-400" />
            <span className="text-white text-sm font-medium">Explore Service</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 mb-4">
          {Icon ? (
            <div className="p-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg border border-amber-500/30">
              <Icon className="h-5 w-5 text-amber-400" />
            </div>
          ) : null}
          <h3 className="text-xl font-semibold text-white group-hover:text-amber-400 transition-colors duration-300">
            {service.title}
          </h3>
        </div>
        
        <p className="text-sm text-white/70 leading-relaxed mb-6 flex-1">
          {service.summary}
        </p>

        {/* Features List */}
        {service.includes && service.includes.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wide mb-3">
              Includes
            </h4>
            <ul className="space-y-2">
              {service.includes.slice(0, 3).map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-xs text-white/60">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Section */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <Button 
            asChild 
            variant="secondary" 
            size="sm" 
            className="group/btn bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-400 hover:from-amber-500/20 hover:to-orange-500/20 hover:border-amber-500/40 transition-all duration-300"
          >
            <Link href={`/services/${service.slug}`}>
              Explore <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
          
          {service.comingSoon && (
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></div>
              <span className="text-xs text-amber-400 font-medium">Coming Soon</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

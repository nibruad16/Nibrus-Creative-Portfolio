import { Heart, Star } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-gradient-to-r from-amber-500/5 to-orange-500/5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-12 text-sm text-white/70 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-white/90 font-semibold">Cinematic</span>
            <span className="text-amber-400 font-semibold">Director</span>
          </div>
          <span className="text-white/50">—</span>
          <span>All rights reserved.</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="h-3 w-3" />
            <span className="text-xs">Premium Creative Services</span>
          </div>
          <span className="text-white/30">|</span>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="h-3 w-3 text-red-400" />
            <span>Next.js & shadcn/ui</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

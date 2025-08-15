import type React from "react"
import { cn } from "@/lib/utils"

export function Section({
  id = "",
  eyebrow = "",
  title = "Section",
  description = "",
  children,
  className = "",
  headerGap = "mb-12",
}: {
  id?: string
  eyebrow?: string
  title?: string
  description?: string
  children?: React.ReactNode
  className?: string
  headerGap?: string
}) {
  return (
    <section id={id} className={cn("relative mx-auto max-w-7xl px-4 py-16 md:py-24", className)}>
      <div className={cn(headerGap)}>
        {eyebrow ? (
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-4 py-2 text-sm text-amber-400 font-medium tracking-wide uppercase mb-4">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-400" />
            {eyebrow}
          </div>
        ) : null}
        <h2 className="text-4xl font-bold md:text-5xl bg-gradient-to-b from-white via-white/90 to-white/70 bg-clip-text text-transparent mb-6">
          {title}
        </h2>
        {description ? (
          <p className="max-w-3xl text-lg text-white/70 leading-relaxed">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

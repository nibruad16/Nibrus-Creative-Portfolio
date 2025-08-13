import type React from "react"
import { cn } from "@/lib/utils"

export function Section({
  id = "",
  eyebrow = "",
  title = "Section",
  description = "",
  children,
  className = "",
}: {
  id?: string
  eyebrow?: string
  title?: string
  description?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn("relative mx-auto max-w-7xl px-4 py-16 md:py-24", className)}>
      <div className="mb-8">
        {eyebrow ? (
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
            {eyebrow}
          </div>
        ) : null}
        <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{title}</h2>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

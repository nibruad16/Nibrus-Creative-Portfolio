import type { Metadata } from "next"
import { Section } from "@/components/section"
import { ToolCard } from "@/components/tool-card"
import { toolCategories } from "@/lib/tools"

export const metadata: Metadata = {
  title: "Tools • Professional Editing, VFX, and AI",
  description:
    "My professional toolkit across editing, color, sound, VFX/CGI, and AI generation — selected to deliver cinematic results.",
}

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Section
        id="tools"
        eyebrow="Tools"
        title="My Professional Toolkit"
        description="I choose the right tool for the story. From editorial and finishing to AI generation, this is the stack I use to deliver cinematic results."
      >
        <div className="space-y-12">
          {toolCategories.map((cat) => (
            <div key={cat.title}>
              <div className="mb-4">
                <h3 className="text-xl font-semibold">{cat.title}</h3>
                {cat.description ? <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p> : null}
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cat.tools.map((tool) => (
                  <ToolCard key={tool.name} tool={tool} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  )
}

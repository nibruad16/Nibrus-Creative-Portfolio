import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Phone, Play, Sparkles } from "lucide-react"
import Link from "next/link"
import { AnimatedHero } from "@/components/animated-hero"
import { Section } from "@/components/section"
import { ServiceCard } from "@/components/service-card"
import { ProjectCard } from "@/components/project-card"
import { ContactForm } from "@/components/contact-form"
import { services, projects, categories } from "@/lib/data"
import { Suspense } from "react"
import { ImageCarousel } from "@/components/image-carousel"

export const metadata: Metadata = {
  title: "Nibru Kefyalew",
  description: "I create stunning, impossible visuals that tell a story.",
}

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Removed <Navbar /> because it's now in layout.tsx */}
      <header id="home" className="relative overflow-hidden">
          <AnimatedHero
            ctaPrimary={{ href: "#projects", label: "View Work", icon: "Play" }}
            ctaSecondary={{ href: "#contact", label: "Start a Project", icon: "Sparkles" }}
            videoSrc="https://res.cloudinary.com/dbdwavjez/video/upload/q_auto,f_auto,w_960/v1755177584/FIna_480_hero_bbn0ck.mp4"
          />
      </header>

      <Section
        id="about"
        eyebrow="About"
        title="A Results-Driven Video Producer"
        description="I combine cinematic editing techniques with AI-driven tools to create ad creatives and storytelling videos that capture attention and convert. Technology accelerates the process  strategy and storytelling drive the results."
      >
        <div className="grid gap-8 md:grid-cols-2 items-start">
          <div className="space-y-6 text-muted-foreground md:order-1">
            <p className="text-base leading-relaxed">
              I partner with e-commerce brands, startups, and content creators to deliver UGC ads, direct-response videos, and AI-generated content optimized for paid social. Every video is built with one goal in mind: helping your brand grow.
            </p>
            <ul className="listj-disc pl-6 space-y-3 text-sm">
              <li>Premiere Pro, After Effects, CapCut, DaVinci Resolve</li>
              <li>Generative AI Tools (Google Veo & others)</li>
              <li>UGC Ads, Short-Form Content, Paid Social Campaigns</li>
            </ul>
            <div className="flex gap-4 pt-4">
              <Button asChild variant="secondary" className="px-6 py-2">
                <a href="#services">Explore Services</a>
              </Button>
              <Button asChild className="px-6 py-2">
                <a href="#contact">
                  Let&apos;s talk <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          <div className="flex justify-center md:justify-end md:order-2">
            <ImageCarousel />
          </div>
      
        </div>
      </Section>

      <Section
        id="services"
        eyebrow="Services"
        title="Two paths, one vision"
        description="Choose your path: camera-shot cinematic post, AI-generated creation, or a hybrid approach. Every service is designed to deliver results for your brand."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />  
          ))}
        </div>  

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 p-6">
            <h4 className="text-lg font-semibold">Travel Videos</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Capture the soul of a place with evocative pacing, immersive sound, and color that breathes.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 p-6">
            <h4 className="text-lg font-semibold">Luxury Branding</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Craft elevated visuals that speak in the visual language of scarcity, texture, and desire.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 p-6">
            <h4 className="text-lg font-semibold">Real Estate Fi  lms</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Showcase properties with cinematic movement and graded light that feels timeless.
            </p>
          </div>
        </div>
      </Section>

      <ProjectsSection />

      <Section
        id="contact"
        eyebrow="Contact"
        title="Tell me your vision"
        description="Whether you have footage or just an idea, I’m ready to create content that elevates your brand and drives results."
      >
        <div className="grid gap-8 md:grid-cols-2">
          <ContactForm />
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 p-6">
              <h4 className="font-semibold">What to include</h4>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-2">
                <li>Goal, audience, and references</li>
                <li>Footage status (shot vs. to be generated)</li>
                <li>Timeline and budget range</li>
                
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:nibruad16@gmail.com"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white"
              >
                <Mail className="h-4 w-4" /> nibruad16@gmail.com
              </a>
              <a
                href="tel:+251993231617"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white"
              > 
                <Phone className="h-4 w-4" /> +251 993231617
              </a>
              <a
                href="tel:+251946942006"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white"
              >
                <Phone className="h-4 w-4" /> +251 946942006
              </a>
            </div>
          </div>
        </div>
      </Section>
    </main>
  )
}

function ProjectsSection() {
  // Note: Next.js runs fully in-browser; keep interactions simple
  return (
    <Section
      id="projects"
      eyebrow="Selected Work"
      title="Projects"
      description="A curated mix across travel, luxury branding, real estate, and commercial content."
    >
      <Suspense fallback={<div className="text-muted-foreground">Loading projects…</div>}>
        <ProjectsGrid />
      </Suspense>
    </Section>
  )
}

function ProjectsGrid() {
  // Simple category filter (client-side)
  // Next.js can't infer props, but here we keep local state simple via a client island pattern
  return <ClientProjectsGrid />
}

// Small client component island
function ClientProjectsGrid() {
  return (
    <div suppressHydrationWarning>
      {/* We render all projects statically for now to avoid complex state in Next.js */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <span
            key={c}
            className="select-none rounded-full border border-white/15 px-3 py-1 text-xs text-muted-foreground"
          >
            {c}
          </span>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
      <div className="mt-8 flex">
        <Button asChild variant="secondary">
          <Link href="/projects">Browse all projects</Link>
        </Button>
      </div>
    </div>
  )
}

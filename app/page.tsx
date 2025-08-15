import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Phone, Play, Sparkles, Star, Award, Zap } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { AnimatedHero } from "@/components/animated-hero"
import { Section } from "@/components/section"
import { ServiceCard } from "@/components/service-card"
import { ProjectCard } from "@/components/project-card"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { services, projects, categories } from "@/lib/data"
import { Suspense } from "react"
import { ImageCarousel } from "@/components/image-carousel"

export const metadata: Metadata = {
  title: "Creative Director | Cinematic Editing & AI Video Generation",
  description:
    "Portfolio of a Creative Director specializing in cinematic editing, color grading, SFX/VFX/CGI, and AI image/video generation. Travel, luxury branding, real estate, commercials.",
}

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
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
        title="A Story‑First Creative Director"
        description="I blend classic editorial sensibilities with the latest generative tools. Technology is my brush, story is my canvas — and your brand is the gallery."
      >
        <div className="grid gap-8 md:grid-cols-2 items-start">
          <div className="space-y-6 text-white/70 md:order-1">
            <p className="text-lg leading-relaxed">
              I partner with filmmakers, brands, and innovators to navigate the entire landscape of modern video
              production — from cinematic post to AI‑generated visuals. Every frame serves the narrative.
            </p>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white/90 flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-400" />
                Professional Tools & Expertise
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-white/70">DaVinci Resolve Studio, Adobe Premiere Pro, After Effects</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-white/70">State‑of‑the‑art Generative AI Models</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-white/70">Color grading, SFX, VFX, CGI, sound design</span>
                </li>
            </ul>
            </div>
            <div className="flex gap-4 pt-4">
              <Button asChild variant="secondary" className="px-6 py-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-400 hover:from-amber-500/20 hover:to-orange-500/20 hover:border-amber-500/40">
                <a href="#services">Explore Services</a>
              </Button>
              <Button asChild className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
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
        description="Choose your path: camera‑shot cinematic post or AI‑generated creation — or blend both with hybrid filmmaking."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>  

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 p-6 bg-gradient-to-br from-amber-500/5 to-orange-500/5 hover:from-amber-500/10 hover:to-orange-500/10 transition-all duration-300">
            <h4 className="text-lg font-semibold text-white/90 flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-400" />
              Travel Videos
            </h4>
            <p className="mt-3 text-sm text-white/70">
              Capture the soul of a place with evocative pacing, immersive sound, and color that breathes.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 p-6 bg-gradient-to-br from-amber-500/5 to-orange-500/5 hover:from-amber-500/10 hover:to-orange-500/10 transition-all duration-300">
            <h4 className="text-lg font-semibold text-white/90 flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-400" />
              Luxury Branding
            </h4>
            <p className="mt-3 text-sm text-white/70">
              Craft elevated visuals that speak in the visual language of scarcity, texture, and desire.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 p-6 bg-gradient-to-br from-amber-500/5 to-orange-500/5 hover:from-amber-500/10 hover:to-orange-500/10 transition-all duration-300">
            <h4 className="text-lg font-semibold text-white/90 flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-400" />
              Real Estate Films
            </h4>
            <p className="mt-3 text-sm text-white/70">
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
        description="Whether you have a hard drive full of footage or just the spark of an idea — I'm ready to create with you."
      >
        <div className="grid gap-8 md:grid-cols-2">
          <ContactForm />
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 p-6 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
              <h4 className="font-semibold text-white/90 flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-400" />
                What to include
              </h4>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-white/70">Goal, audience, and references</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-white/70">Footage status (shot vs. to be generated)</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-white/70">Timeline and budget range</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:hello@example.com"
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-amber-400 transition-colors duration-300"
              >
                <Mail className="h-4 w-4" /> hello@example.com
              </a>
              <a
                href="tel:+10000000000"
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-amber-400 transition-colors duration-300"
              >
                <Phone className="h-4 w-4" /> +1 (000) 000‑0000
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  )
}

function ProjectsSection() {
  return (
    <Section
      id="projects"
      eyebrow="Selected Work"
      title="Projects"
      description="A curated mix across travel, luxury branding, real estate, and commercial content."
    >
      <Suspense fallback={<div className="text-white/70">Loading projects…</div>}>
        <ProjectsGrid />
      </Suspense>
    </Section>
  )
}

function ProjectsGrid() {
  return <ClientProjectsGrid />
}

function ClientProjectsGrid() {
  return (
    <div suppressHydrationWarning>
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <span
            key={c}
            className="select-none rounded-full border border-amber-500/30 px-3 py-1 text-xs text-amber-400 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all duration-300 cursor-pointer"
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
        <Button asChild variant="secondary" className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-400 hover:from-amber-500/20 hover:to-orange-500/20 hover:border-amber-500/40">
          <Link href="/projects">Browse all projects</Link>
        </Button>
      </div>
    </div>
  )
}

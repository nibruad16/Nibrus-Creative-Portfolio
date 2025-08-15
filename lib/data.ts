import type { Service } from "@/components/service-card"
import type { Project } from "@/components/project-card"
import { Film, Stars, Scissors, Megaphone } from "lucide-react"

export const services: Service[] = [
  {
    title: "AI Image/Video Generation",
    slug: "ai-image-video-generation",
    summary:
      "Direct state‑of‑the‑art models to create bespoke visuals from a blank canvas — curated and edited cinematically.",
    icon: Stars,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    includes: ["Concept & prompt crafting", "Curation & assembly", "Color & sound polish"],
  },
  {
    title: "Cinematic Editing & Post‑Production",
    slug: "cinematic-editing-post-production",
    summary:
      "Editing, color grading, SFX, VFX, and CGI to build a world that is visually stunning and emotionally resonant.",
    icon: Film,
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    includes: ["Editing", "Color grading", "Sound design", "SFX/VFX/CGI"],
  },
  {
    title: "Long‑Form & Short‑Form Editing",
    slug: "long-form-short-form-editing",
    summary: "Narrative long‑form and high‑impact short‑form tailored to each platform without sacrificing craft.",
    icon: Scissors,
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    includes: ["Master edit + cutdowns", "Captions & titles", "Aspect ratios"],
    comingSoon: true,
  },
  {
    title: "Promotion & Advert Creation",
    slug: "promotion-advert-creation",
    summary: "Concept‑to‑delivery campaigns merging cinematic craft with AI‑driven ideation for brand impact.",
    icon: Megaphone,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    includes: ["Concept & script", "Production (live, AI, hybrid)", "Final deliveries"],
    comingSoon: true,
  },
]

export const categories = ["Travel", "Luxury Branding", "Real Estate", "Commercial", "Music Video"]

export const projects: Project[] = [
  {
    title: "Desert Odyssey",
    slug: "desert-odyssey",
    category: "Travel",
    summary: "A meditative travel film through sculpted light and sand.",
    thumbnail: "/desert-dunes-golden-hour.png",
  },
  {
    title: "Maison Aurelia",
    slug: "maison-aurelia",
    category: "Luxury Branding",
    summary: "A tactile brand film of silk, stone, and shadow — an ode to materiality.",
    thumbnail: "/placeholder.svg?height=640&width=1024",
  },
  {
    title: "Skyline Vista",
    slug: "skyline-vista",
    category: "Real Estate",
    summary: "Architectural motion study highlighting light, scale, and flow.",
    thumbnail: "/placeholder.svg?height=640&width=1024",
  },
  {
    title: "Neon Bloom",
    slug: "neon-bloom",
    category: "Commercial",
    summary: "AI‑assisted product launch film with generative botanicals and light trails.",
    thumbnail: "/placeholder.svg?height=640&width=1024",
  },
  {
    title: "Harbor Chronicle",
    slug: "harbor-chronicle",
    category: "Travel",
    summary: "A coastal city seen through fog, reflections, and passing time.",
    thumbnail: "/placeholder.svg?height=640&width=1024",
  },
  {
    title: "Echo Chamber",
    slug: "echo-chamber",
    category: "Music Video",
    summary: "Monochrome performance with graphic cuts and glitch VFX.",
    thumbnail: "/placeholder.svg?height=640&width=1024",
  },
]

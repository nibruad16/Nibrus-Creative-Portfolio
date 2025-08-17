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

// Add/confirm this type shape
export type VideoProject = {
  type: "video"
  slug: string
  title: string
  description?: string
  category?: string
  youtubeId?: string      // accept ID…
  youtubeUrl?: string     // …or full URL
  cover?: string
}

export type ImageProject = {
  type: "image"
  slug: string
  title: string
  description?: string
  category?: string
  cover: string
  images: { src: string; caption?: string; prompt?: string }[]
}

export type Project = VideoProject | ImageProject

// Example categories (keep yours if already present)
export const categories: string[] = [
  "Travel",
  "Luxury Branding",
  "Real Estate",
  "Commercial",
  "Music Video",
  "Narrative",
  "AI",
]

// Replace your projects array items with this shape (keep your real items)
export const projects: Project[] = [
  {
    type: "video",
    slug: "brand-launch-spot",
    title: "Brand Launch Spot",
    category: "Commercial",
    youtubeUrl: "https://youtu.be/1y_fqxdxlXU",
    description: "High‑impact 30s brand launch spot crafted for social reach.",
  },
  {
    type: "image",
    slug: "ai-character-study",
    title: "AI Character Study",
    category: "AI",
    cover: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop",
    description: "A series exploring consistent character design across angles and moods.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1200&auto=format&fit=crop",
        caption: "Front portrait — neon rim light",
        prompt: "portrait, neon rim light, cinematic, 85mm, f/1.8, kodak 2383 grade",
      },
      {
        src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
        caption: "Three‑quarter angle",
        prompt: "3/4 angle, volumetric fog, teal/orange balance, studio fill",
      },
      {
        src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
        caption: "Profile — hard key",
        prompt: "profile, hard key light, moody contrast, film still",
      },
    ],
  },
  {
    type: "video",
    slug: "my-youtube-demo",
    title: "YouTube Demo",
    youtubeUrl: "https://youtu.be/9hmvcypEsHw",
    description: "Demo video with description under the player.",
    category: "Commercial",
  },
  {
    type: "video",
    slug: "veo3-ad-1",
    title: "Kids Probiotic Ad Campaign – Veo3",
    youtubeUrl: "https://youtu.be/uM7EY5hHNKc",
    description:
      "Produced and edited promotional video ads for Veo3’s Kids Probiotic product. Crafted engaging, parent-friendly visuals with clear messaging, sound design, and motion graphics tailored for social media platforms. Ensured brand alignment and storytelling to enhance product appeal and audience trust..",
    category: "Commercial",
  },
  {
    type: "video",
    slug: "veo3-ad-2",
    title: "Gorilla Delivery Man Ad – Veo3",
    youtubeUrl: "https://youtu.be/aW6RJeC54WA",
    description:
      "Creative Ethiopian ad for Veo3 featuring a gorilla as a delivery man to humorously highlight fast and reliable service. Responsible for concept development, video editing, sound design, and social media optimization. The ad gained attention for its unique and memorable storytelling, blending local humor with product promotion to engage a wide audience.",
    category: "Commercial",
  },
  // ...keep/add your real projects here...
]

// Helper to resolve a project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

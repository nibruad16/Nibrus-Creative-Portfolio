import type { Tool } from "@/components/tool-card"

export const toolCategories: { title: string; description?: string; tools: Tool[] }[] = [
  {
    title: "Editing",
    description: "Assembly to fine cut with platform‑ready deliveries.",
    tools: [
      {
        name: "DaVinci Resolve Studio",
        role: "Editing • Color • Fairlight",
        description:
          "End‑to‑end finishing with world‑class color science, robust editorial, and integrated Fairlight audio.",
        url: "https://www.blackmagicdesign.com/products/davinciresolve",
        image: "/davinci-resolve-color-page.png",
        highlights: ["Edit", "Color", "Fairlight"],
      },
      {
        name: "Adobe Premiere Pro",
        role: "Editing",
        description:
          "Industry‑standard editorial with deep Adobe ecosystem integration for graphics and review workflows.",
        url: "https://www.adobe.com/products/premiere.html",
        image: "/adobe-premiere-timeline.png",
        highlights: ["Team Projects", "Dynamic Link"],
      },
      {
        name: "CapCut",
        role: "Rapid Cuts • Social Formats",
        description:
          "Fast iteration for short‑form and social; great for quick versioning and platform‑native exports.",
        url: "https://www.capcut.com",
        image: "/capcut-editing-ui.png",
        highlights: ["Short‑form", "Templates"],
      },
    ],
  },
  {
    title: "Color & Finishing",
    description: "Look creation, shot matching, and delivery that feels cinematic.",
    tools: [
      {
        name: "DaVinci Resolve Color",
        role: "Color Grading",
        description:
          "Professional node‑based grading, color management, and delivery pipelines for consistent, rich images.",
        url: "https://www.blackmagicdesign.com/products/davinciresolve/color",
        image: "/davinci-resolve-scopes.png",
        highlights: ["HDR", "ACES", "Power Grades"],
      },
      {
        name: "Film Emulation & LUTs",
        role: "Looks",
        description: "Curated film‑inspired looks and custom LUTs to build cohesive, taste‑forward palettes.",
        url: "https://www.google.com/search?q=film+emulation+luts",
        image: "/film-emulation-luts-palette.png",
        highlights: ["Texture", "Consistency"],
      },
    ],
  },
  {
    title: "Sound & SFX",
    description: "Immersive sound design and precise repair for clean, emotive audio.",
    tools: [
      {
        name: "Avid Pro Tools",
        role: "Mixing • Post Audio",
        description: "Industry‑standard DAW for mixing and post workflows with reliable session interchange.",
        url: "https://www.avid.com/pro-tools",
        image: "/placeholder-cbi36.png",
        highlights: ["Mix", "Delivery"],
      },
      {
        name: "Adobe Audition",
        role: "Dialogue Edit • Mastering",
        description: "Dialogue cleanup, mastering, and round‑trip with Premiere for streamlined post audio.",
        url: "https://www.adobe.com/products/audition.html",
        image: "/adobe-audition-waveform.png",
        highlights: ["Dialogue", "Mastering"],
      },
      {
        name: "iZotope RX",
        role: "Restoration",
        description: "Gold‑standard audio repair: de‑noise, de‑reverb, and spectral surgery for pristine results.",
        url: "https://www.izotope.com/en/products/rx.html",
        image: "/izotope-rx-spectral-repair.png",
        highlights: ["De‑noise", "Spectral Repair"],
      },
    ],
  },
  {
    title: "VFX & CGI",
    description: "Graphic titles, compositing, and 3D elements when the story calls for it.",
    tools: [
      {
        name: "Adobe After Effects",
        role: "Compositing • Titles • VFX",
        description:
          "Motion graphics and compositing for titles, screen comps, and SFX/VFX that enhance the narrative.",
        url: "https://www.adobe.com/products/aftereffects.html",
        image: "/after-effects-compositing-ui.png",
        highlights: ["Comps", "Motion Graphics"],
      },
      {
        name: "Blender",
        role: "CGI • 3D",
        description: "Open‑source 3D for previs and selective CGI elements; integrates well with graded footage.",
        url: "https://www.blender.org",
        image: "/placeholder.svg?height=160&width=320",
        highlights: ["3D", "Previs"],
      },
      {
        name: "Red Giant Suite",
        role: "VFX Plugins",
        description: "Professional plugin suite for glows, particles, and stylization to tastefully elevate footage.",
        url: "https://www.maxon.net/en/red-giant-complete",
        image: "/placeholder.svg?height=160&width=320",
        highlights: ["Stylize", "Particles"],
      },
    ],
  },
  {
    title: "AI Generation",
    description: "State‑of‑the‑art models directed with cinematic sensibility.",
    tools: [
      {
        name: "Runway Gen‑3",
        role: "AI Video",
        description:
          "High‑fidelity text‑to‑video and image‑to‑video with strong control for cinematic motion and light.",
        url: "https://runwayml.com",
        image: "/placeholder.svg?height=160&width=320",
        highlights: ["Text‑to‑Video", "I2V"],
      },
      {
        name: "Pika",
        role: "AI Video",
        description: "Fast iteration for concept films and motion studies with promptable camera and style controls.",
        url: "https://pika.art",
        image: "/placeholder.svg?height=160&width=320",
        highlights: ["Concepts", "Motion"],
      },
      {
        name: "Stable Diffusion XL + ComfyUI",
        role: "AI Image • Pipelines",
        description:
          "Local and cloud pipelines for bespoke image generation and control‑net workflows for consistency.",
        url: "https://www.comfy.org/",
        image: "/placeholder.svg?height=160&width=320",
        highlights: ["SDXL", "ControlNet"],
      },
      {
        name: "Midjourney",
        role: "AI Image",
        description: "Rapid ideation and style exploration with strong aesthetics for boards and look development.",
        url: "https://www.midjourney.com",
        image: "/placeholder.svg?height=160&width=320",
        highlights: ["Look Dev", "Boards"],
      },
      {
        name: "Adobe Firefly",
        role: "AI Image",
        description: "Brand‑safe generative imaging integrated with Adobe apps for practical, rights‑aware workflows.",
        url: "https://www.adobe.com/sensei/generative-ai/firefly.html",
        image: "/placeholder.svg?height=160&width=320",
        highlights: ["Brand‑safe", "Integration"],
      },
    ],
  },
]

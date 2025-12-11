"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { projects as seedProjects, type Project, type VideoProject, type ImageProject } from "@/lib/data"
import { getAllProjectsClient } from "@/lib/projects"
import { Trash2, Loader2, Upload, X, Image as ImageIcon } from "lucide-react"

type NewVideoForm = {
  title: string
  slug: string
  category: string
  youtubeUrl: string
  description: string
}

type NewImageForm = {
  title: string
  slug: string
  category: string
  description: string
  images: Array<{ src: string; caption?: string }>
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [apiProjects, setApiProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [projectType, setProjectType] = useState<"video" | "image">("video")
  const [videoForm, setVideoForm] = useState<NewVideoForm>({
    title: "",
    slug: "",
    category: "AI Video",
    youtubeUrl: "",
    description: "",
  })
  const [imageForm, setImageForm] = useState<NewImageForm>({
    title: "",
    slug: "",
    category: "AI",
    description: "",
    images: [],
  })
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Load projects from API
  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    setLoading(true)
    try {
      const allProjects = await getAllProjectsClient()
      setProjects(allProjects)
      
      // Fetch API projects separately to show which are admin-added
      const response = await fetch("/api/projects")
      if (response.ok) {
        const api = await response.json()
        setApiProjects(api) 
      }
    } catch (error) {
      console.error("Error loading projects:", error)
      setProjects(seedProjects)
    } finally {
      setLoading(false)
    }
  }

  const currentSlug = projectType === "video" ? videoForm.slug : imageForm.slug
  const slugExists = useMemo(
    () => projects.some((p) => p.slug === slugify(currentSlug || "")),
    [projects, currentSlug],
  )

  const handleImageUpload = async (file: File) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to upload image")
      }

      const data = await response.json()
      setImageForm((f) => ({
        ...f,
        images: [...f.images, { src: data.url, caption: "" }],
      }))
      setMessage({ type: "success", text: "Image uploaded successfully!" })
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to upload image" })
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    setImageForm((f) => ({
      ...f,
      images: f.images.filter((_, i) => i !== index),
    }))
  }

  const handleAddVideo = async () => {
    if (!videoForm.title.trim() || !videoForm.youtubeUrl.trim()) return

    setSaving(true)
    setMessage(null)

    try {
      const slug = slugify(videoForm.slug.trim() || videoForm.title)
      const newProject: VideoProject = {
        type: "video",
        title: videoForm.title.trim(),
        slug,
        category: videoForm.category.trim() || undefined,
        youtubeUrl: videoForm.youtubeUrl.trim(),
        description: videoForm.description.trim() || undefined,
      }

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to save project")
      }

      setMessage({ type: "success", text: "Project added successfully! It's now live on your site." })
      setVideoForm({ title: "", slug: "", category: "AI Video", youtubeUrl: "", description: "" })
      
      // Reload projects to show the new one
      await loadProjects()
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to save project" })
    } finally {
      setSaving(false)
    }
  }

  const handleAddImage = async () => {
    if (!imageForm.title.trim() || imageForm.images.length === 0) {
      setMessage({ type: "error", text: "Title and at least one image are required" })
      return
    }

    setSaving(true)
    setMessage(null)

    try {
      const slug = slugify(imageForm.slug.trim() || imageForm.title)
      const newProject: ImageProject = {
        type: "image",
        title: imageForm.title.trim(),
        slug,
        category: imageForm.category.trim() || undefined,
        description: imageForm.description.trim() || undefined,
        cover: imageForm.images[0].src, // Use first image as cover
        images: imageForm.images.map((img) => ({
          src: img.src,
          caption: img.caption?.trim() || undefined,
        })),
      }

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to save project")
      }

      setMessage({ type: "success", text: "Image project added successfully! It's now live on your site." })
      setImageForm({ title: "", slug: "", category: "AI", description: "", images: [] })
      
      // Reload projects to show the new one
      await loadProjects()
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to save project" })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete project "${slug}"?`)) return

    setSaving(true)
    setMessage(null)

    try {
      const response = await fetch(`/api/projects?slug=${slug}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete project")
      }

      setMessage({ type: "success", text: "Project deleted successfully!" })
      await loadProjects()
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to delete project" })
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-amber-300/80">Admin</p>
          <h1 className="text-3xl font-bold">Projects Admin</h1>
          <p className="text-sm text-white/70">
            Add projects and they'll automatically appear on your site! Projects are saved online and visible to all users.
          </p>
        </header>

        {message && (
          <div
            className={`rounded-lg border p-4 ${
              message.type === "success"
                ? "border-green-500/50 bg-green-500/10 text-green-300"
                : "border-red-500/50 bg-red-500/10 text-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Project Type Tabs */}
        <div className="flex gap-2 border-b border-white/10">
          <button
            onClick={() => setProjectType("video")}
            className={`px-4 py-2 font-medium transition-colors ${
              projectType === "video"
                ? "border-b-2 border-amber-400 text-amber-400"
                : "text-white/60 hover:text-white"
            }`}
          >
            Video Project
          </button>
          <button
            onClick={() => setProjectType("image")}
            className={`px-4 py-2 font-medium transition-colors ${
              projectType === "image"
                ? "border-b-2 border-amber-400 text-amber-400"
                : "text-white/60 hover:text-white"
            }`}
          >
            <ImageIcon className="mr-2 inline h-4 w-4" />
            Image Project
          </button>
        </div>

        {/* Video Project Form */}
        {projectType === "video" && (
          <section className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">Add Video Project</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1 text-sm">
                <span className="text-white/70">Title *</span>
                <input
                  className="rounded border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-amber-400/70"
                  value={videoForm.title}
                  onChange={(e) => setVideoForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Veo 3 — AI Generated Video"
                />
              </label>
              <label className="grid gap-1 text-sm">
                <span className="text-white/70">Slug (auto if empty)</span>
                <input
                  className={`rounded border px-3 py-2 text-sm outline-none ${
                    slugExists ? "border-rose-400/70 bg-rose-500/10" : "border-white/10 bg-black/40"
                  } focus:border-amber-400/70`}
                  value={videoForm.slug}
                  onChange={(e) => setVideoForm((f) => ({ ...f, slug: e.target.value }))}
                  placeholder="veo3-generated"
                />
                {slugExists && <span className="text-xs text-rose-300/90">Slug already exists</span>}
              </label>
              <label className="grid gap-1 text-sm">
                <span className="text-white/70">Category</span>
                <input
                  className="rounded border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-amber-400/70"
                  value={videoForm.category}
                  onChange={(e) => setVideoForm((f) => ({ ...f, category: e.target.value }))}
                  placeholder="AI Video"
                />
              </label>
              <label className="grid gap-1 text-sm">
                <span className="text-white/70">YouTube URL *</span>
                <input
                  className="rounded border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-amber-400/70"
                  value={videoForm.youtubeUrl}
                  onChange={(e) => setVideoForm((f) => ({ ...f, youtubeUrl: e.target.value }))}
                  placeholder="https://youtube.com/shorts/..."
                />
              </label>
            </div>
            <label className="grid gap-1 text-sm">
              <span className="text-white/70">Description</span>
              <textarea
                className="min-h-[96px] rounded border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-amber-400/70"
                value={videoForm.description}
                onChange={(e) => setVideoForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Short description"
              />
            </label>
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                onClick={handleAddVideo}
                disabled={!videoForm.title.trim() || !videoForm.youtubeUrl.trim() || slugExists || saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Add Video Project"
                )}
              </Button>
            </div>
          </section>
        )}

        {/* Image Project Form */}
        {projectType === "image" && (
          <section className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">Add Image Project</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1 text-sm">
                <span className="text-white/70">Title *</span>
                <input
                  className="rounded border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-amber-400/70"
                  value={imageForm.title}
                  onChange={(e) => setImageForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="AI Generated Images"
                />
              </label>
              <label className="grid gap-1 text-sm">
                <span className="text-white/70">Slug (auto if empty)</span>
                <input
                  className={`rounded border px-3 py-2 text-sm outline-none ${
                    slugExists ? "border-rose-400/70 bg-rose-500/10" : "border-white/10 bg-black/40"
                  } focus:border-amber-400/70`}
                  value={imageForm.slug}
                  onChange={(e) => setImageForm((f) => ({ ...f, slug: e.target.value }))}
                  placeholder="ai-images"
                />
                {slugExists && <span className="text-xs text-rose-300/90">Slug already exists</span>}
              </label>
              <label className="grid gap-1 text-sm">
                <span className="text-white/70">Category</span>
                <input
                  className="rounded border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-amber-400/70"
                  value={imageForm.category}
                  onChange={(e) => setImageForm((f) => ({ ...f, category: e.target.value }))}
                  placeholder="AI"
                />
              </label>  
            </div>
            <label className="grid gap-1 text-sm">
              <span className="text-white/70">Description</span>
              <textarea
                className="min-h-[96px] rounded border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-amber-400/70"
                value={imageForm.description}
                onChange={(e) => setImageForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Short description"
              />
            </label>

            {/* Image Upload */}
            <div className="space-y-3">
              <label className="grid gap-1 text-sm">
                <span className="text-white/70">Upload Images *</span>
                <div className="flex items-center gap-3">
                  <label className="flex cursor-pointer items-center gap-2 rounded border border-white/10 bg-black/40 px-4 py-2 text-sm transition-colors hover:bg-black/60">
                    <Upload className="h-4 w-4" />
                    {uploading ? "Uploading..." : "Choose Images"}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || [])
                        files.forEach((file) => handleImageUpload(file))
                      }}
                      disabled={uploading}
                    />
                  </label>
                  <span className="text-xs text-white/60">
                    {imageForm.images.length} image{imageForm.images.length !== 1 ? "s" : ""} uploaded
                  </span>
                </div>
              </label>

              {/* Image Preview Grid */}
              {imageForm.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {imageForm.images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img.src}
                        alt={`Upload ${index + 1}`}
                        className="h-32 w-full rounded-lg object-cover border border-white/10"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 rounded-full bg-red-500/80 p-1 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X className="h-3 w-3 text-white" />
                      </button>
                      <input
                        type="text"
                        placeholder="Caption (optional)"
                        value={img.caption || ""}
                        onChange={(e) => {
                          const newImages = [...imageForm.images]
                          newImages[index].caption = e.target.value
                          setImageForm((f) => ({ ...f, images: newImages }))
                        }}
                        className="mt-1 w-full rounded border border-white/10 bg-black/40 px-2 py-1 text-xs outline-none focus:border-amber-400/70"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                onClick={handleAddImage}
                disabled={!imageForm.title.trim() || imageForm.images.length === 0 || slugExists || saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Add Image Project"
                )}
              </Button>
            </div>
            <p className="text-xs text-white/60">
              Upload images locally - they'll be stored in your public/uploads folder and visible on your site!
            </p>
          </section>
        )}

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">All Projects ({projects.length})</h2>
            <Button variant="outline" size="sm" onClick={loadProjects} disabled={loading}>
              {loading ? "Loading..." : "Refresh"}
            </Button>
          </div>
          
          {loading ? (
            <div className="text-center py-8 text-white/60">Loading projects...</div>
          ) : (
            <div className="grid gap-3">
              {projects.map((p) => {
                const isApiProject = apiProjects.some((ap) => ap.slug === p.slug)
                return (
                  <div
                    key={p.slug}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[11px] font-semibold text-amber-200">
                        {p.type.toUpperCase()}
                      </span>
                      {isApiProject && (
                        <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-[11px] font-semibold text-green-300">
                          ADMIN ADDED
                        </span>
                      )}
                      <span className="font-semibold">{p.title}</span>
                      <span className="text-white/50">/ {p.slug}</span>
                      {isApiProject && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto text-red-400 hover:text-red-300"
                          onClick={() => handleDelete(p.slug)}
                          disabled={saving}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {"category" in p && p.category && (
                      <p className="text-xs text-white/60">Category: {p.category}</p>
                    )}
                    {"youtubeUrl" in p && p.youtubeUrl && (
                      <p className="text-xs text-white/70">
                        YouTube: <span className="text-white">{p.youtubeUrl}</span>
                      </p>
                    )}
                    {"images" in p && p.images && (
                      <p className="text-xs text-white/70">
                        Images: <span className="text-white">{p.images.length} image{p.images.length !== 1 ? "s" : ""}</span>
                      </p>
                    )}
                    {p.description && <p className="text-xs text-white/60">{p.description}</p>}
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  )

}
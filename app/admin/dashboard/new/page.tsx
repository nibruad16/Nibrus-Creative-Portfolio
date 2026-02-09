'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Loader2, Upload, X, Plus } from 'lucide-react'
import Link from 'next/link'
import { categories } from '@/lib/data'

interface VideoItem {
    src: string
    title?: string
}

interface ImageItem {
    src: string
    caption?: string
    prompt?: string
}

export default function NewProjectPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [authLoading, setAuthLoading] = useState(true)

    // Form state
    const [type, setType] = useState<'video' | 'image'>('video')
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [published, setPublished] = useState(true)
    const [youtubeUrl, setYoutubeUrl] = useState('')
    const [cover, setCover] = useState('')
    const [videos, setVideos] = useState<VideoItem[]>([])
    const [images, setImages] = useState<ImageItem[]>([])

    // Check authentication on mount
    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                console.warn('No active session - you may need to log in')
                // Temporarily allow access for debugging
                // router.push('/admin')
                // return
            }
        } catch (error) {
            console.error('Auth check error:', error)
        } finally {
            setAuthLoading(false)
        }
    }

    // Auto-generate slug from title
    const handleTitleChange = (value: string) => {
        setTitle(value)
        if (!slug) {
            const generatedSlug = value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            setSlug(generatedSlug)
        }
    }

    const handleFileUpload = async (file: File) => {
        setUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', file)

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json()
            return data.url
        } catch (error) {
            console.error('Upload error:', error)
            alert('Failed to upload file')
            return null
        } finally {
            setUploading(false)
        }
    }

    const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const url = await handleFileUpload(file)
            if (url) setCover(url)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const projectData = {
                type,
                slug,
                title,
                description: description || null,
                category: category || null,
                published,
                youtube_url: youtubeUrl || null,
                cover: cover || null,
                videos: type === 'video' && videos.length > 0 ? videos : null,
                images: type === 'image' && images.length > 0 ? images : null,
            }

            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projectData),
            })

            if (response.ok) {
                router.push('/admin/dashboard')
            } else {
                const error = await response.json()
                alert(`Error: ${error.error}`)
            }
        } catch (error) {
            console.error('Error creating project:', error)
            alert('Failed to create project')
        } finally {
            setLoading(false)
        }
    }

    const addVideo = () => {
        setVideos([...videos, { src: '', title: '' }])
    }

    const updateVideo = (index: number, field: keyof VideoItem, value: string) => {
        const updated = [...videos]
        updated[index] = { ...updated[index], [field]: value }
        setVideos(updated)
    }

    const removeVideo = (index: number) => {
        setVideos(videos.filter((_, i) => i !== index))
    }

    const addImage = () => {
        setImages([...images, { src: '', caption: '', prompt: '' }])
    }

    const updateImage = (index: number, field: keyof ImageItem, value: string) => {
        const updated = [...images]
        updated[index] = { ...updated[index], [field]: value }
        setImages(updated)
    }

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index))
    }

    // Show loading while checking authentication
    if (authLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_50%)]" />

            <div className="relative">
                {/* Header */}
                <header className="border-b border-white/10 bg-black/80 backdrop-blur-xl sticky top-16 z-40">
                    <div className="container mx-auto px-4 py-4">
                        <Link href="/admin/dashboard">
                            <Button variant="ghost" className="text-white hover:bg-white/5">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Dashboard
                            </Button>
                        </Link>
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-4 py-8 max-w-4xl">
                    <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Create New Project</CardTitle>
                            <CardDescription className="text-white/60">
                                Add a new project to your portfolio
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Project Type */}
                                <div className="space-y-2">
                                    <Label className="text-white">Project Type</Label>
                                    <Select value={type} onValueChange={(value: 'video' | 'image') => setType(value)}>
                                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-zinc-900 border-white/10">
                                            <SelectItem value="video">Video Project</SelectItem>
                                            <SelectItem value="image">Image Project</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Title */}
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-white">Title *</Label>
                                    <Input
                                        id="title"
                                        value={title}
                                        onChange={(e) => handleTitleChange(e.target.value)}
                                        required
                                        className="bg-white/5 border-white/10 text-white"
                                        placeholder="My Awesome Project"
                                    />
                                </div>

                                {/* Slug */}
                                <div className="space-y-2">
                                    <Label htmlFor="slug" className="text-white">Slug *</Label>
                                    <Input
                                        id="slug"
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                        required
                                        className="bg-white/5 border-white/10 text-white"
                                        placeholder="my-awesome-project"
                                    />
                                    <p className="text-xs text-white/40">URL-friendly identifier (auto-generated from title)</p>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-white">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="bg-white/5 border-white/10 text-white min-h-[100px]"
                                        placeholder="Describe your project..."
                                    />
                                </div>

                                {/* Category */}
                                <div className="space-y-2">
                                    <Label className="text-white">Category</Label>
                                    <Select value={category} onValueChange={setCategory}>
                                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-zinc-900 border-white/10">
                                            {categories.map((cat) => (
                                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* YouTube URL (for video projects) */}
                                {type === 'video' && (
                                    <div className="space-y-2">
                                        <Label htmlFor="youtubeUrl" className="text-white">YouTube URL</Label>
                                        <Input
                                            id="youtubeUrl"
                                            value={youtubeUrl}
                                            onChange={(e) => setYoutubeUrl(e.target.value)}
                                            className="bg-white/5 border-white/10 text-white"
                                            placeholder="https://youtube.com/watch?v=..."
                                        />
                                    </div>
                                )}

                                {/* Cover Image */}
                                <div className="space-y-2">
                                    <Label className="text-white">Cover Image</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            value={cover}
                                            onChange={(e) => setCover(e.target.value)}
                                            className="bg-white/5 border-white/10 text-white flex-1"
                                            placeholder="https://... or upload"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="border-white/10 text-white hover:bg-white/5"
                                            onClick={() => document.getElementById('cover-upload')?.click()}
                                            disabled={uploading}
                                        >
                                            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                        </Button>
                                        <input
                                            id="cover-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleCoverUpload}
                                        />
                                    </div>
                                    {cover && (
                                        <img src={cover} alt="Cover preview" className="w-full h-48 object-cover rounded-lg mt-2" />
                                    )}
                                </div>

                                {/* Additional Videos */}
                                {type === 'video' && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label className="text-white">Additional Videos</Label>
                                            <Button type="button" size="sm" onClick={addVideo} variant="outline" className="border-white/10 text-white">
                                                <Plus className="w-4 h-4 mr-1" /> Add Video
                                            </Button>
                                        </div>
                                        {videos.map((video, index) => (
                                            <div key={index} className="flex gap-2 items-start p-3 border border-white/10 rounded-lg">
                                                <div className="flex-1 space-y-2">
                                                    <Input
                                                        value={video.src}
                                                        onChange={(e) => updateVideo(index, 'src', e.target.value)}
                                                        placeholder="Video URL"
                                                        className="bg-white/5 border-white/10 text-white"
                                                    />
                                                    <Input
                                                        value={video.title}
                                                        onChange={(e) => updateVideo(index, 'title', e.target.value)}
                                                        placeholder="Video title (optional)"
                                                        className="bg-white/5 border-white/10 text-white"
                                                    />
                                                </div>
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => removeVideo(index)}
                                                    className="text-red-400 hover:bg-red-500/10"
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Images Gallery */}
                                {type === 'image' && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label className="text-white">Images *</Label>
                                            <Button type="button" size="sm" onClick={addImage} variant="outline" className="border-white/10 text-white">
                                                <Plus className="w-4 h-4 mr-1" /> Add Image
                                            </Button>
                                        </div>
                                        {images.map((image, index) => (
                                            <div key={index} className="flex gap-2 items-start p-3 border border-white/10 rounded-lg">
                                                <div className="flex-1 space-y-2">
                                                    <Input
                                                        value={image.src}
                                                        onChange={(e) => updateImage(index, 'src', e.target.value)}
                                                        placeholder="Image URL"
                                                        className="bg-white/5 border-white/10 text-white"
                                                    />
                                                    <Input
                                                        value={image.caption}
                                                        onChange={(e) => updateImage(index, 'caption', e.target.value)}
                                                        placeholder="Caption (optional)"
                                                        className="bg-white/5 border-white/10 text-white"
                                                    />
                                                    <Input
                                                        value={image.prompt}
                                                        onChange={(e) => updateImage(index, 'prompt', e.target.value)}
                                                        placeholder="AI Prompt (optional)"
                                                        className="bg-white/5 border-white/10 text-white"
                                                    />
                                                </div>
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => removeImage(index)}
                                                    className="text-red-400 hover:bg-red-500/10"
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Published Toggle */}
                                <div className="flex items-center justify-between p-4 border border-white/10 rounded-lg">
                                    <div>
                                        <Label className="text-white">Publish Immediately</Label>
                                        <p className="text-sm text-white/60">Make this project visible on your portfolio</p>
                                    </div>
                                    <Switch checked={published} onCheckedChange={setPublished} />
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-3 pt-4">
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Creating...
                                            </>
                                        ) : (
                                            'Create Project'
                                        )}
                                    </Button>
                                    <Link href="/admin/dashboard">
                                        <Button type="button" variant="outline" className="border-white/10 text-white hover:bg-white/5">
                                            Cancel
                                        </Button>
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    )
}

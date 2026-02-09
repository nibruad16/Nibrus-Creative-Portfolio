'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Loader2, Save, Upload, X } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function EditProjectPage() {
    const router = useRouter()
    const params = useParams()
    const projectId = params.id as string

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [project, setProject] = useState<any>(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        checkAuth()
        loadProject()
    }, [projectId])

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
            router.push('/admin')
        }
    }

    const loadProject = async () => {
        try {
            const response = await fetch(`/api/projects?id=${projectId}`)
            const data = await response.json()
            if (Array.isArray(data) && data.length > 0) {
                setProject(data[0])
            }
        } catch (error) {
            console.error('Error loading project:', error)
            toast.error('Failed to load project')
        } finally {
            setLoading(false)
        }
    }

    const handleFileUpload = async (file: File, type: 'cover' | 'video' | 'image') => {
        setUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', file)

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })

            const data = await response.json()

            if (response.ok) {
                if (type === 'cover') {
                    setProject({ ...project, cover: data.url })
                } else if (type === 'video') {
                    const videos = project.videos || []
                    setProject({
                        ...project,
                        videos: [...videos, { url: data.url, title: file.name }]
                    })
                } else if (type === 'image') {
                    const images = project.images || []
                    setProject({
                        ...project,
                        images: [...images, { url: data.url, alt: file.name }]
                    })
                }
                toast.success('File uploaded successfully!')
            } else {
                toast.error('Failed to upload file')
            }
        } catch (error) {
            console.error('Error uploading file:', error)
            toast.error('Failed to upload file')
        } finally {
            setUploading(false)
        }
    }

    const removeMedia = (index: number, type: 'videos' | 'images') => {
        const updated = [...(project[type] || [])]
        updated.splice(index, 1)
        setProject({ ...project, [type]: updated })
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const response = await fetch('/api/projects', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(project)
            })

            if (response.ok) {
                toast.success('Project updated successfully!')
                router.push('/admin/dashboard')
            } else {
                toast.error('Failed to update project')
            }
        } catch (error) {
            console.error('Error saving project:', error)
            toast.error('Failed to update project')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
            </div>
        )
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Project not found</h2>
                    <Link href="/admin/dashboard">
                        <Button variant="outline">Back to Dashboard</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_50%)]" />

            <div className="relative">
                {/* Header */}
                <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/admin/dashboard">
                                <Button variant="ghost" className="text-white hover:bg-white/5">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back
                                </Button>
                            </Link>
                            <h1 className="text-2xl font-bold text-white">Edit Project</h1>
                        </div>
                        <Button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="space-y-6">
                        {/* Basic Info */}
                        <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
                            <CardHeader>
                                <CardTitle className="text-white">Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-white">Project Type</Label>
                                        <Select
                                            value={project.type}
                                            onValueChange={(value) => setProject({ ...project, type: value })}
                                        >
                                            <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="video">Video Project</SelectItem>
                                                <SelectItem value="image">Image Project</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-white">Category</Label>
                                        <Input
                                            value={project.category || ''}
                                            onChange={(e) => setProject({ ...project, category: e.target.value })}
                                            className="bg-white/5 border-white/10 text-white"
                                            placeholder="e.g., Commercial, Music Video"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-white">Title</Label>
                                    <Input
                                        value={project.title}
                                        onChange={(e) => setProject({ ...project, title: e.target.value })}
                                        className="bg-white/5 border-white/10 text-white"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-white">Slug</Label>
                                    <Input
                                        value={project.slug}
                                        onChange={(e) => setProject({ ...project, slug: e.target.value })}
                                        className="bg-white/5 border-white/10 text-white"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-white">Description</Label>
                                    <Textarea
                                        value={project.description || ''}
                                        onChange={(e) => setProject({ ...project, description: e.target.value })}
                                        className="bg-white/5 border-white/10 text-white min-h-[100px]"
                                    />
                                </div>

                                {project.type === 'video' && (
                                    <div className="space-y-2">
                                        <Label className="text-white">YouTube URL</Label>
                                        <Input
                                            value={project.youtube_url || ''}
                                            onChange={(e) => setProject({ ...project, youtube_url: e.target.value })}
                                            className="bg-white/5 border-white/10 text-white"
                                            placeholder="https://www.youtube.com/watch?v=..."
                                        />
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Cover Image */}
                        <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
                            <CardHeader>
                                <CardTitle className="text-white">Cover Image</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {project.cover && (
                                    <div className="relative">
                                        <img
                                            src={project.cover}
                                            alt="Cover"
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="absolute top-2 right-2"
                                            onClick={() => setProject({ ...project, cover: '' })}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )}
                                <div>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            if (file) handleFileUpload(file, 'cover')
                                        }}
                                        className="bg-white/5 border-white/10 text-white"
                                        disabled={uploading}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Additional Media */}
                        {project.type === 'video' && (
                            <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
                                <CardHeader>
                                    <CardTitle className="text-white">Additional Videos</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {project.videos?.map((video: any, index: number) => (
                                        <div key={index} className="flex items-center gap-2 p-2 bg-white/5 rounded">
                                            <span className="text-white flex-1">{video.title || video.url}</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeMedia(index, 'videos')}
                                            >
                                                <X className="w-4 h-4 text-red-400" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Input
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            if (file) handleFileUpload(file, 'video')
                                        }}
                                        className="bg-white/5 border-white/10 text-white"
                                        disabled={uploading}
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {project.type === 'image' && (
                            <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
                                <CardHeader>
                                    <CardTitle className="text-white">Additional Images</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-3 gap-4">
                                        {project.images?.map((image: any, index: number) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={image.url}
                                                    alt={image.alt}
                                                    className="w-full h-32 object-cover rounded"
                                                />
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    className="absolute top-1 right-1"
                                                    onClick={() => removeMedia(index, 'images')}
                                                >
                                                    <X className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            if (file) handleFileUpload(file, 'image')
                                        }}
                                        className="bg-white/5 border-white/10 text-white"
                                        disabled={uploading}
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {/* Publish Status */}
                        <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
                            <CardContent className="pt-6">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={project.published}
                                        onChange={(e) => setProject({ ...project, published: e.target.checked })}
                                        className="w-5 h-5"
                                    />
                                    <span className="text-white font-medium">Published</span>
                                </label>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}

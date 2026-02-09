'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Plus,
    LogOut,
    Loader2,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Video,
    Image as ImageIcon
} from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Project {
    id: string
    type: 'video' | 'image'
    slug: string
    title: string
    description: string | null
    category: string | null
    published: boolean
    created_at: string
    cover: string | null
}

export default function AdminDashboard() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [projects, setProjects] = useState<Project[]>([])
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        checkAuth()
        loadProjects()
    }, [])

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
            router.push('/admin')
        }
    }

    const loadProjects = async () => {
        try {
            const response = await fetch('/api/projects?includeUnpublished=true')
            const data = await response.json()
            setProjects(data)
        } catch (error) {
            console.error('Error loading projects:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/admin')
    }

    const handleDelete = async () => {
        if (!deleteId) return

        setDeleting(true)
        try {
            const response = await fetch(`/api/projects?id=${deleteId}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                setProjects(projects.filter(p => p.id !== deleteId))
                setDeleteId(null)
            }
        } catch (error) {
            console.error('Error deleting project:', error)
        } finally {
            setDeleting(false)
        }
    }

    const togglePublished = async (project: Project) => {
        try {
            const response = await fetch('/api/projects', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: project.id,
                    published: !project.published
                })
            })

            if (response.ok) {
                setProjects(projects.map(p =>
                    p.id === project.id ? { ...p, published: !p.published } : p
                ))
            }
        } catch (error) {
            console.error('Error updating project:', error)
        }
    }

    if (loading) {
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
                <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                            <p className="text-sm text-white/60">Manage your portfolio projects</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/admin/dashboard/new">
                                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                                    <Plus className="w-4 h-4 mr-2" />
                                    New Project
                                </Button>
                            </Link>
                            <Button variant="outline" onClick={handleLogout} className="border-white/10 text-white hover:bg-white/5">
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-4 py-8">
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
                            <CardHeader>
                                <CardDescription className="text-white/60">Total Projects</CardDescription>
                                <CardTitle className="text-3xl text-white">{projects.length}</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
                            <CardHeader>
                                <CardDescription className="text-white/60">Published</CardDescription>
                                <CardTitle className="text-3xl text-white">
                                    {projects.filter(p => p.published).length}
                                </CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
                            <CardHeader>
                                <CardDescription className="text-white/60">Drafts</CardDescription>
                                <CardTitle className="text-3xl text-white">
                                    {projects.filter(p => !p.published).length}
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </div>

                    {/* Projects List */}
                    <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
                        <CardHeader>
                            <CardTitle className="text-white">All Projects</CardTitle>
                            <CardDescription className="text-white/60">
                                Manage and edit your portfolio projects
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {projects.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-white/60 mb-4">No projects yet</p>
                                    <Link href="/admin/dashboard/new">
                                        <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
                                            <Plus className="w-4 h-4 mr-2" />
                                            Create Your First Project
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {projects.map((project) => (
                                        <div
                                            key={project.id}
                                            className="flex items-center gap-4 p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                                        >
                                            {/* Project Icon */}
                                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${project.type === 'video'
                                                    ? 'bg-blue-500/20 text-blue-400'
                                                    : 'bg-purple-500/20 text-purple-400'
                                                }`}>
                                                {project.type === 'video' ? (
                                                    <Video className="w-6 h-6" />
                                                ) : (
                                                    <ImageIcon className="w-6 h-6" />
                                                )}
                                            </div>

                                            {/* Project Info */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-white font-semibold truncate">{project.title}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge variant="outline" className="text-xs border-white/20 text-white/60">
                                                        {project.category || 'Uncategorized'}
                                                    </Badge>
                                                    <span className="text-xs text-white/40">•</span>
                                                    <span className="text-xs text-white/40">{project.slug}</span>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => togglePublished(project)}
                                                    className="text-white/60 hover:text-white hover:bg-white/10"
                                                >
                                                    {project.published ? (
                                                        <Eye className="w-4 h-4" />
                                                    ) : (
                                                        <EyeOff className="w-4 h-4" />
                                                    )}
                                                </Button>
                                                <Link href={`/admin/dashboard/edit/${project.id}`}>
                                                    <Button size="sm" variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => setDeleteId(project.id)}
                                                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </main>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent className="bg-zinc-900 border-white/10">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription className="text-white/60">
                            This action cannot be undone. This will permanently delete the project.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="border-white/10 text-white hover:bg-white/5">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={deleting}
                            className="bg-red-500 hover:bg-red-600 text-white"
                        >
                            {deleting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                'Delete'
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Loader2, Save, Settings as SettingsIcon } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function SettingsPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [settings, setSettings] = useState<any>(null)

    useEffect(() => {
        checkAuth()
        loadSettings()
    }, [])

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
            router.push('/admin')
        }
    }

    const loadSettings = async () => {
        try {
            const response = await fetch('/api/settings')
            const data = await response.json()
            setSettings(data)
        } catch (error) {
            console.error('Error loading settings:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const response = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            })

            if (response.ok) {
                toast.success('Settings saved successfully!')
            } else {
                toast.error('Failed to save settings')
            }
        } catch (error) {
            console.error('Error saving settings:', error)
            toast.error('Failed to save settings')
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
                            <div>
                                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <SettingsIcon className="w-6 h-6" />
                                    Site Settings
                                </h1>
                                <p className="text-sm text-white/60">Customize your portfolio</p>
                            </div>
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
                <main className="container mx-auto px-4 py-8 max-w-5xl">
                    <Tabs defaultValue="general" className="space-y-6">
                        <TabsList className="bg-white/5 border border-white/10">
                            <TabsTrigger value="general">General</TabsTrigger>
                            <TabsTrigger value="hero">Hero Section</TabsTrigger>
                            <TabsTrigger value="about">About</TabsTrigger>
                            <TabsTrigger value="contact">Contact</TabsTrigger>
                        </TabsList>

                        {/* General Settings */}
                        <TabsContent value="general">
                            <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
                                <CardHeader>
                                    <CardTitle className="text-white">General Settings</CardTitle>
                                    <CardDescription className="text-white/60">
                                        Basic site information and branding
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-white">Site Title</Label>
                                        <Input
                                            value={settings?.site_title || ''}
                                            onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                                            className="bg-white/5 border-white/10 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-white">Site Description</Label>
                                        <Textarea
                                            value={settings?.site_description || ''}
                                            onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                                            className="bg-white/5 border-white/10 text-white min-h-[100px]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-white">Site Logo URL</Label>
                                        <Input
                                            value={settings?.site_logo || ''}
                                            onChange={(e) => setSettings({ ...settings, site_logo: e.target.value })}
                                            className="bg-white/5 border-white/10 text-white"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Hero Section */}
                        <TabsContent value="hero">
                            <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
                                <CardHeader>
                                    <CardTitle className="text-white">Hero Section</CardTitle>
                                    <CardDescription className="text-white/60">
                                        Main landing section content
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-white">Hero Title</Label>
                                        <Input
                                            value={settings?.hero_title || ''}
                                            onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                                            className="bg-white/5 border-white/10 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-white">Hero Subtitle</Label>
                                        <Textarea
                                            value={settings?.hero_subtitle || ''}
                                            onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                                            className="bg-white/5 border-white/10 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-white">Hero Video URL</Label>
                                        <Input
                                            value={settings?.hero_video_url || ''}
                                            onChange={(e) => setSettings({ ...settings, hero_video_url: e.target.value })}
                                            className="bg-white/5 border-white/10 text-white"
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-white">Primary CTA Text</Label>
                                            <Input
                                                value={settings?.hero_cta_primary_text || ''}
                                                onChange={(e) => setSettings({ ...settings, hero_cta_primary_text: e.target.value })}
                                                className="bg-white/5 border-white/10 text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-white">Primary CTA Link</Label>
                                            <Input
                                                value={settings?.hero_cta_primary_link || ''}
                                                onChange={(e) => setSettings({ ...settings, hero_cta_primary_link: e.target.value })}
                                                className="bg-white/5 border-white/10 text-white"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-white">Secondary CTA Text</Label>
                                            <Input
                                                value={settings?.hero_cta_secondary_text || ''}
                                                onChange={(e) => setSettings({ ...settings, hero_cta_secondary_text: e.target.value })}
                                                className="bg-white/5 border-white/10 text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-white">Secondary CTA Link</Label>
                                            <Input
                                                value={settings?.hero_cta_secondary_link || ''}
                                                onChange={(e) => setSettings({ ...settings, hero_cta_secondary_link: e.target.value })}
                                                className="bg-white/5 border-white/10 text-white"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* About Section */}
                        <TabsContent value="about">
                            <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
                                <CardHeader>
                                    <CardTitle className="text-white">About Section</CardTitle>
                                    <CardDescription className="text-white/60">
                                        About section content
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-white">About Title</Label>
                                        <Input
                                            value={settings?.about_title || ''}
                                            onChange={(e) => setSettings({ ...settings, about_title: e.target.value })}
                                            className="bg-white/5 border-white/10 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-white">About Description</Label>
                                        <Textarea
                                            value={settings?.about_description || ''}
                                            onChange={(e) => setSettings({ ...settings, about_description: e.target.value })}
                                            className="bg-white/5 border-white/10 text-white min-h-[150px]"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Contact Info */}
                        <TabsContent value="contact">
                            <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
                                <CardHeader>
                                    <CardTitle className="text-white">Contact Information</CardTitle>
                                    <CardDescription className="text-white/60">
                                        Your contact details
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-white">Email</Label>
                                        <Input
                                            type="email"
                                            value={settings?.contact_email || ''}
                                            onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                                            className="bg-white/5 border-white/10 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-white">Primary Phone</Label>
                                        <Input
                                            value={settings?.contact_phone_primary || ''}
                                            onChange={(e) => setSettings({ ...settings, contact_phone_primary: e.target.value })}
                                            className="bg-white/5 border-white/10 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-white">Secondary Phone</Label>
                                        <Input
                                            value={settings?.contact_phone_secondary || ''}
                                            onChange={(e) => setSettings({ ...settings, contact_phone_secondary: e.target.value })}
                                            className="bg-white/5 border-white/10 text-white"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    )
}

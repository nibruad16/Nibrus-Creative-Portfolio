'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Lock, Loader2 } from 'lucide-react'

export default function AdminLoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        // Check if Supabase is configured
        if (!isSupabaseConfigured) {
            router.push('/admin/setup')
            return
        }

        // Check if already logged in
        const checkAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession()
                if (session) {
                    router.push('/admin/dashboard')
                }
            } catch (err) {
                console.error('Auth check error:', err)
            }
        }
        checkAuth()
    }, [router])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                setError(error.message)
            } else if (data.session) {
                router.push('/admin/dashboard')
            }
        } catch (err) {
            setError('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)]" />

            <Card className="w-full max-w-md relative border-white/10 bg-black/50 backdrop-blur-xl">
                <CardHeader className="space-y-1 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                        <Lock className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">Admin Login</CardTitle>
                    <CardDescription className="text-white/60">
                        Enter your credentials to access the dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white/80">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-white/80">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                            />
                        </div>
                        {error && (
                            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                {error}
                            </div>
                        )}
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

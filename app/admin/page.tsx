'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    // Always redirect to login page
    // The login page will handle Supabase validation
    router.push('/admin/login')
  }, [router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white">Redirecting...</div>
    </div>
  )
}
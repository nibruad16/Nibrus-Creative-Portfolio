import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

// Comma-separated list of emails allowed to use the admin API, e.g. "me@example.com"
const adminEmails = (process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)

// Verifies the Supabase access token sent as "Authorization: Bearer <token>".
// Returns an error response when the caller is not an admin, or null when they are.
export async function requireAdmin(request: NextRequest): Promise<NextResponse | null> {
    const header = request.headers.get('authorization') || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : ''

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabaseAdmin.auth.getUser(token)
    if (error || !data.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fail closed: without an allowlist, any Supabase user (e.g. from public sign-up) would pass
    if (adminEmails.length === 0) {
        console.error('ADMIN_EMAILS is not set; refusing admin request')
        return NextResponse.json({ error: 'Admin access is not configured' }, { status: 403 })
    }

    const email = data.user.email?.toLowerCase()
    if (!email || !adminEmails.includes(email)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return null
}

// True when the request carries a valid admin token (for routes that are public but show more to admins)
export async function isAdmin(request: NextRequest): Promise<boolean> {
    return (await requireAdmin(request)) === null
}

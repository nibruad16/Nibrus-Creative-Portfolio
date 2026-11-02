import { supabase } from '@/lib/supabase/client'

// fetch() for admin API routes: attaches the signed-in user's Supabase access token
export async function adminFetch(input: string, init: RequestInit = {}): Promise<Response> {
    const { data: { session } } = await supabase.auth.getSession()
    const headers = new Headers(init.headers)
    if (session?.access_token) {
        headers.set('Authorization', `Bearer ${session.access_token}`)
    }
    return fetch(input, { ...init, headers })
}

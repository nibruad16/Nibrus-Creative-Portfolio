import { createClient } from '@supabase/supabase-js'

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Check if Supabase is properly configured
const isConfigured =
    supabaseUrl &&
    supabaseUrl !== 'your_supabase_project_url' &&
    supabaseUrl.startsWith('http') &&
    supabaseAnonKey &&
    supabaseAnonKey !== 'your_supabase_anon_key'

if (!isConfigured) {
    console.warn('⚠️ Supabase is not configured. Please update .env.local with your credentials.')
    console.warn('See QUICK_START.md for setup instructions.')
}

// Create client (will work even if not configured, but operations will fail gracefully)
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
)

// Export configuration status for components to check
export const isSupabaseConfigured = isConfigured

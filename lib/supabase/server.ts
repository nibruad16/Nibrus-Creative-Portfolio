import { createClient } from '@supabase/supabase-js'

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || supabaseUrl === 'your_supabase_project_url') {
    throw new Error(
        '❌ SUPABASE NOT CONFIGURED!\n\n' +
        'Please follow QUICK_START.md to set up Supabase.\n' +
        'Update .env.local with your Supabase credentials.'
    )
}

if (!supabaseServiceKey || supabaseServiceKey === 'your_supabase_service_role_key') {
    throw new Error(
        '❌ SUPABASE SERVICE ROLE KEY NOT CONFIGURED!\n\n' +
        'Please add your Supabase service role key to .env.local\n' +
        'See QUICK_START.md for detailed instructions.'
    )
}

// Server-side client with elevated permissions
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

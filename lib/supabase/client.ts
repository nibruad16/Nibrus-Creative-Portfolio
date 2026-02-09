import { createClient } from '@supabase/supabase-js'

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || supabaseUrl === 'your_supabase_project_url') {
    throw new Error(
        '❌ SUPABASE NOT CONFIGURED!\n\n' +
        'Please follow these steps:\n' +
        '1. Create a Supabase project at https://supabase.com\n' +
        '2. Get your Project URL and API keys from Settings → API\n' +
        '3. Update .env.local with your credentials\n' +
        '4. Restart your dev server\n\n' +
        'See QUICK_START.md for detailed instructions.'
    )
}

if (!supabaseAnonKey || supabaseAnonKey === 'your_supabase_anon_key') {
    throw new Error(
        '❌ SUPABASE ANON KEY NOT CONFIGURED!\n\n' +
        'Please add your Supabase anon key to .env.local\n' +
        'See QUICK_START.md for detailed instructions.'
    )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

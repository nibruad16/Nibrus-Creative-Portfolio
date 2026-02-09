import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

// GET site settings
export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from('site_settings')
            .select('*')
            .single()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// PUT - Update site settings
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json()

        const { data, error } = await supabaseAdmin
            .from('site_settings')
            .update(body)
            .eq('id', '00000000-0000-0000-0000-000000000001')
            .select()
            .single()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

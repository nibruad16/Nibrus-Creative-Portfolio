import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

// GET site settings
export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from('site_settings')
            .select('*')
            .single()

        // If no settings exist, create default settings
        if (error && error.code === 'PGRST116') {
            const { data: newData, error: insertError } = await supabaseAdmin
                .from('site_settings')
                .insert({ id: '00000000-0000-0000-0000-000000000001' })
                .select()
                .single()

            if (insertError) {
                console.error('Error creating default settings:', insertError)
                return NextResponse.json({ error: insertError.message }, { status: 500 })
            }

            return NextResponse.json(newData)
        }

        if (error) {
            console.error('Error fetching settings:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error('Internal server error:', error)
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
        console.log('Updating settings with:', body)

        const { data, error } = await supabaseAdmin
            .from('site_settings')
            .update(body)
            .eq('id', '00000000-0000-0000-0000-000000000001')
            .select()
            .single()

        if (error) {
            console.error('Error updating settings:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        console.log('Settings updated successfully:', data)
        return NextResponse.json(data)
    } catch (error) {
        console.error('Internal server error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

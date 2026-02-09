export interface Database {
    public: {
        Tables: {
            projects: {
                Row: {
                    id: string
                    created_at: string
                    updated_at: string
                    type: 'video' | 'image'
                    slug: string
                    title: string
                    description: string | null
                    category: string | null
                    youtube_url: string | null
                    youtube_id: string | null
                    cover: string | null
                    videos: VideoProjectVideo[] | null
                    images: ImageProjectImage[] | null
                    published: boolean
                }
                Insert: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    type: 'video' | 'image'
                    slug: string
                    title: string
                    description?: string | null
                    category?: string | null
                    youtube_url?: string | null
                    youtube_id?: string | null
                    cover?: string | null
                    videos?: VideoProjectVideo[] | null
                    images?: ImageProjectImage[] | null
                    published?: boolean
                }
                Update: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    type?: 'video' | 'image'
                    slug?: string
                    title?: string
                    description?: string | null
                    category?: string | null
                    youtube_url?: string | null
                    youtube_id?: string | null
                    cover?: string | null
                    videos?: VideoProjectVideo[] | null
                    images?: ImageProjectImage[] | null
                    published?: boolean
                }
            }
        }
    }
}

export interface VideoProjectVideo {
    src: string
    title?: string
}

export interface ImageProjectImage {
    src: string
    caption?: string
    prompt?: string
}

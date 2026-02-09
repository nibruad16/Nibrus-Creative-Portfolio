// Utility function to fetch projects from Supabase
export async function getProjects() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/projects`, {
            cache: 'no-store', // Always get fresh data
        })

        if (!response.ok) {
            console.error('Failed to fetch projects from Supabase')
            return []
        }

        const data = await response.json()

        // Transform Supabase data to match the existing Project type
        return data.map((project: any) => ({
            type: project.type,
            slug: project.slug,
            title: project.title,
            description: project.description,
            category: project.category,
            youtubeUrl: project.youtube_url,
            youtubeId: project.youtube_id,
            cover: project.cover,
            videos: project.videos,
            images: project.images,
        }))
    } catch (error) {
        console.error('Error fetching projects:', error)
        return []
    }
}

// Utility function to get a single project by slug
export async function getProjectBySlug(slug: string) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/projects?slug=${slug}`,
            {
                cache: 'no-store',
            }
        )

        if (!response.ok) {
            return null
        }

        const project = await response.json()

        // Transform to match existing type
        return {
            type: project.type,
            slug: project.slug,
            title: project.title,
            description: project.description,
            category: project.category,
            youtubeUrl: project.youtube_url,
            youtubeId: project.youtube_id,
            cover: project.cover,
            videos: project.videos,
            images: project.images,
        }
    } catch (error) {
        console.error('Error fetching project:', error)
        return null
    }
}

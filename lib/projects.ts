import { projects as staticProjects } from "./data"
import type { Project as DataProject } from "./data"

// Re-export Project type for consumers
export type Project = DataProject

// Fetch projects from API (admin-added projects)
async function fetchApiProjects(): Promise<Project[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000")
    const response = await fetch(`${baseUrl}/api/projects`, {
      cache: "no-store", // Always fetch fresh data
    })
    if (!response.ok) return []
    return await response.json()
  } catch (error) {
    console.error("Error fetching API projects:", error)
    return []
  }
}

// Get all projects (static + API)
export async function getAllProjects(): Promise<Project[]> {
  const apiProjects = await fetchApiProjects()
  // Merge: API projects first (newer), then static projects
  // Remove duplicates by slug (API projects take precedence)
  const projectMap = new Map<string, Project>()
  
  // Add static projects first
  staticProjects.forEach((p) => projectMap.set(p.slug, p))
  
  // Override with API projects (newer ones)
  apiProjects.forEach((p) => projectMap.set(p.slug, p))
  
  return Array.from(projectMap.values())
}

// Client-side version (for use in client components)
export async function getAllProjectsClient(): Promise<Project[]> {
  try {
    const response = await fetch("/api/projects", {
      cache: "no-store",
    })
    if (!response.ok) return staticProjects
    const apiProjects: Project[] = await response.json()
    
    // Merge projects
    const projectMap = new Map<string, Project>()
    staticProjects.forEach((p) => projectMap.set(p.slug, p))
    apiProjects.forEach((p) => projectMap.set(p.slug, p))
    
    return Array.from(projectMap.values())
  } catch (error) {
    console.error("Error fetching projects:", error)
    return staticProjects
  }
}


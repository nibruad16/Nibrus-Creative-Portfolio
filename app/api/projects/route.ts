import { NextResponse } from "next/server"
import { readFile, writeFile, mkdir } from "fs/promises"
import { join } from "path"
import type { Project } from "@/lib/data"

const PROJECTS_FILE = join(process.cwd(), "data", "projects.json")

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = join(process.cwd(), "data")
  try {
    await mkdir(dataDir, { recursive: true })
  } catch (error: any) {
    if (error.code !== "EEXIST") throw error
  }
}

// GET - Fetch all projects
export async function GET() {
  try {
    await ensureDataDir()
    const data = await readFile(PROJECTS_FILE, "utf-8").catch(() => "[]")
    const projects = JSON.parse(data)
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error reading projects:", error)
    return NextResponse.json([], { status: 200 })
  }
}

// POST - Add a new project
export async function POST(request: Request) {
  try {
    await ensureDataDir()
    
    // Read existing projects
    const existingData = await readFile(PROJECTS_FILE, "utf-8").catch(() => "[]")
    const existingProjects: Project[] = JSON.parse(existingData)
    
    // Get new project from request
    const newProject: Project = await request.json()
    
    // Validate required fields
    if (!newProject.slug || !newProject.title) {
      return NextResponse.json(
        { error: "Slug and title are required" },
        { status: 400 }
      )
    }
    
    // Check for duplicate slug
    if (existingProjects.some((p) => p.slug === newProject.slug)) {
      return NextResponse.json(
        { error: "Project with this slug already exists" },
        { status: 400 }
      )
    }
    
    // Add new project
    existingProjects.push(newProject)
    
    // Write back to file
    await writeFile(PROJECTS_FILE, JSON.stringify(existingProjects, null, 2), "utf-8")
    
    return NextResponse.json({ success: true, project: newProject }, { status: 201 })
  } catch (error) {
    console.error("Error saving project:", error)
    return NextResponse.json(
      { error: "Failed to save project" },
      { status: 500 }
    )
  }
}

// DELETE - Remove a project
export async function DELETE(request: Request) {
  try {
    await ensureDataDir()
    
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")
    
    if (!slug) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      )
    }
    
    // Read existing projects
    const existingData = await readFile(PROJECTS_FILE, "utf-8").catch(() => "[]")
    const existingProjects: Project[] = JSON.parse(existingData)
    
    // Remove project
    const filtered = existingProjects.filter((p) => p.slug !== slug)
    
    // Write back to file
    await writeFile(PROJECTS_FILE, JSON.stringify(filtered, null, 2), "utf-8")
    
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    )
  }
}


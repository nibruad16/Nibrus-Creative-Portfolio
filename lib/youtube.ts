export function extractYouTubeId(input: string): string | null {
  if (!input) return null
  // Already an ID?
  if (/^[A-Za-z0-9_-]{11}$/.test(input)) return input
  try {
    const u = new URL(input)
    const host = u.hostname.replace(/^www\./, "")
    if (host === "youtu.be") {
      const id = u.pathname.split("/").filter(Boolean)[0]
      return id || null
    }
    if (host.endsWith("youtube.com")) {
      const v = u.searchParams.get("v")
      if (v) return v
      const parts = u.pathname.split("/").filter(Boolean)
      const i = parts.indexOf("embed")
      if (i >= 0 && parts[i + 1]) return parts[i + 1]
    }
  } catch {}
  return null
}
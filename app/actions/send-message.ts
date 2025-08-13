"use server"

export async function sendMessage(formData: FormData): Promise<{ ok: boolean }> {
  // Basic validation
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const subject = String(formData.get("subject") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()

  if (!name || !email || !subject || !message) {
    return { ok: false }
  }

  // In a real deployment, connect to email/provider here. For now, we log.
  console.log("New inquiry:", { name, email, subject, message })

  // Simulate a short delay
  await new Promise((r) => setTimeout(r, 600))

  return { ok: true }
}

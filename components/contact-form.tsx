"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { sendMessage } from "@/app/actions/send-message"

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  return (
    <form
      action={async (formData) => {
        setStatus("submitting")
        const res = await sendMessage(formData)
        setStatus(res.ok ? "success" : "error")
      }}
      className="space-y-4 rounded-xl border border-white/10 p-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm text-muted-foreground">
            Your name
          </label>
          <Input id="name" name="name" placeholder="Alex Filmmaker" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm text-muted-foreground">
            Email
          </label>
          <Input id="email" name="email" type="email" placeholder="you@studio.com" required />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm text-muted-foreground">
          Project type
        </label>
        <Input id="subject" name="subject" placeholder="Travel film, Luxury brand ad, Real estate tour…" required />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm text-muted-foreground">
          Brief
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Goals, references, timelines, footage status (shot vs. AI), budget range…"
          className="min-h-[140px]"
          required
        />
      </div>
      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send inquiry"}
        </Button>
        {status === "success" ? (
          <span className="text-sm text-emerald-400">Thanks — I&apos;ll get back to you shortly.</span>
        ) : null}
        {status === "error" ? (
          <span className="text-sm text-red-400">Something went wrong. Please try again.</span>
        ) : null}
      </div>
    </form>
  )
}

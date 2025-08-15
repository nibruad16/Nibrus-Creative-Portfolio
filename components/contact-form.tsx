"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { sendMessage } from "@/app/actions/send-message"
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react"

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  return (
    <form
      action={async (formData) => {
        setStatus("submitting")
        const res = await sendMessage(formData)
        setStatus(res.ok ? "success" : "error")
      }}
      className="space-y-6 rounded-2xl border border-white/10 p-8 bg-gradient-to-br from-amber-500/5 to-orange-500/5 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg border border-amber-500/30">
          <Mail className="h-5 w-5 text-amber-400" />
        </div>
        <h3 className="text-xl font-semibold text-white/90">Get In Touch</h3>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <label htmlFor="name" className="text-sm font-medium text-white/80">
            Your name
          </label>
          <Input 
            id="name" 
            name="name" 
            placeholder="Alex Filmmaker" 
            required 
            className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-amber-500/50 focus:ring-amber-500/20"
          />
        </div>
        <div className="space-y-3">
          <label htmlFor="email" className="text-sm font-medium text-white/80">
            Email
          </label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="you@studio.com" 
            required 
            className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-amber-500/50 focus:ring-amber-500/20"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <label htmlFor="subject" className="text-sm font-medium text-white/80">
          Project type
        </label>
        <Input 
          id="subject" 
          name="subject" 
          placeholder="Travel film, Luxury brand ad, Real estate tour…" 
          required 
          className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-amber-500/50 focus:ring-amber-500/20"
        />
      </div>
      
      <div className="space-y-3">
        <label htmlFor="message" className="text-sm font-medium text-white/80">
          Brief
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Goals, references, timelines, footage status (shot vs. AI), budget range…"
          className="min-h-[140px] bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-amber-500/50 focus:ring-amber-500/20 resize-none"
          required
        />
      </div>
      
      <div className="flex items-center gap-4 pt-4">
        <Button 
          type="submit" 
          disabled={status === "submitting"}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3"
        >
          {status === "submitting" ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Send inquiry
            </>
          )}
        </Button>
        
        {status === "success" && (
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm">Thanks — I'll get back to you shortly.</span>
          </div>
        )}
        
        {status === "error" && (
          <div className="flex items-center gap-2 text-red-400">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">Something went wrong. Please try again.</span>
          </div>
        )}
      </div>
    </form>
  )
}

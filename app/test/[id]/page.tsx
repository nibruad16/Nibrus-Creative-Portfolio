"use client"

import { use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

type Params = { id: string }

export default function TestDynamicRoute({ params }: { params: Promise<Params> }) {
  const { id } = use(params)

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-amber-900 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/test">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Test Home
            </Link>
          </Button>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-8 space-y-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
            Dynamic Route Test
          </h1>

          {/* Display the Dynamic Parameter */}
          <div className="bg-black/40 rounded-lg p-6 border border-white/10">
            <h2 className="text-lg font-semibold mb-4 text-amber-400">The Dynamic Parameter:</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <code className="bg-black/60 px-3 py-1 rounded text-amber-300">params.id</code>
                <span className="text-2xl font-mono text-white">=</span>
                <code className="bg-purple-500/20 px-4 py-2 rounded text-xl font-bold text-purple-300">
                  "{id}"
                </code>
              </div>
              <p className="text-white/70 text-sm mt-4">
                This value comes from the URL! Change the URL and watch it update.
              </p>
            </div>
          </div>

          {/* URL Explanation */}
          <div className="bg-black/40 rounded-lg p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-3 text-purple-400">How it works:</h3>
            <div className="space-y-2 text-sm text-white/80 font-mono">
              <div>📁 File: <code className="text-amber-300">app/test/[id]/page.tsx</code></div>
              <div>🔗 URL: <code className="text-purple-300">/test/{id}</code></div>
              <div>📦 Parameter: <code className="text-green-300">params.id = "{id}"</code></div>
            </div>
          </div>

          {/* Try Different Values */}
          <div className="bg-black/40 rounded-lg p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-green-400">Try these URLs:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["hello", "world", "test-123", "my-project", "dynamic-route", "nextjs"].map((testId) => (
                <Button
                  key={testId}
                  asChild
                  variant={testId === id ? "default" : "outline"}
                  className={testId === id ? "bg-amber-500 hover:bg-amber-600" : ""}
                >
                  <Link href={`/test/${testId}`}>
                    /test/{testId}
                  </Link>
                </Button>
              ))}
            </div>
            <p className="text-white/60 text-xs mt-4">
              Click any button above to see the URL change and the dynamic parameter update!
            </p>
          </div>

          {/* Current URL Display */}
          <div className="bg-gradient-to-r from-purple-500/20 to-amber-500/20 rounded-lg p-4 border border-white/20">
            <p className="text-sm text-white/90">
              <span className="font-semibold">Current URL:</span>{" "}
              <code className="text-amber-300">/test/{id}</code>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}


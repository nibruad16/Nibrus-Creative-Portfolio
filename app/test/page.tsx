"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Link2, Zap } from "lucide-react"

export default function TestHome() {
  const examples = [
    { id: "hello-world", label: "Hello World" },
    { id: "test-123", label: "Test 123" },
    { id: "my-project", label: "My Project" },
    { id: "dynamic-route", label: "Dynamic Route" },
    { id: "nextjs-is-awesome", label: "Next.js is Awesome" },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-amber-900 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
            Dynamic Routing Test
          </h1>
          <p className="text-xl text-white/70">
            Learn how dynamic routing works in Next.js
          </p>
        </div>

        {/* Explanation Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
            <Code className="h-8 w-8 text-amber-400 mb-3" />
            <h3 className="font-semibold mb-2">File Structure</h3>
            <p className="text-sm text-white/70">
              <code className="text-xs">app/test/[id]/page.tsx</code>
            </p>
            <p className="text-xs text-white/60 mt-2">
              The <code className="text-amber-300">[id]</code> folder makes it dynamic
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
            <Link2 className="h-8 w-8 text-purple-400 mb-3" />
            <h3 className="font-semibold mb-2">URL Pattern</h3>
            <p className="text-sm text-white/70">
              <code className="text-xs">/test/anything</code>
            </p>
            <p className="text-xs text-white/60 mt-2">
              Any value after <code className="text-purple-300">/test/</code> works
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
            <Zap className="h-8 w-8 text-green-400 mb-3" />
            <h3 className="font-semibold mb-2">Access Parameter</h3>
            <p className="text-sm text-white/70">
              <code className="text-xs">params.id</code>
            </p>
            <p className="text-xs text-white/60 mt-2">
              Get the value from the URL in your code
            </p>
          </div>
        </div>

        {/* Try Examples */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
          <h2 className="text-2xl font-semibold mb-4 text-amber-400">
            Try These Examples:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {examples.map((example) => (
              <Button
                key={example.id}
                asChild
                variant="outline"
                className="justify-start hover:bg-white/10"
              >
                <Link href={`/test/${example.id}`}>
                  <ArrowRight className="mr-2 h-4 w-4" />
                  {example.label}
                  <span className="ml-auto text-xs text-white/60">
                    /test/{example.id}
                  </span>
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-purple-500/20 to-amber-500/20 rounded-xl border border-white/20 p-6">
          <h3 className="font-semibold mb-3 text-lg">How to Use:</h3>
          <ol className="space-y-2 text-sm text-white/80 list-decimal list-inside">
            <li>Click any example button above to navigate to a dynamic route</li>
            <li>Notice how the URL changes: <code className="text-amber-300">/test/[value]</code></li>
            <li>See how <code className="text-purple-300">params.id</code> displays the value from the URL</li>
            <li>Try typing your own value in the URL: <code className="text-green-300">/test/your-custom-value</code></li>
            <li>Experiment with different values to understand how it works!</li>
          </ol>
        </div>

        {/* Code Example */}
        <div className="bg-black/40 rounded-xl border border-white/20 p-6">
          <h3 className="font-semibold mb-3 text-lg text-green-400">Code Example:</h3>
          <pre className="bg-black/60 rounded-lg p-4 overflow-x-auto text-xs">
            <code className="text-white">
{`// File: app/test/[id]/page.tsx

export default function TestPage({ params }) {
  const { id } = params
  
  return (
    <div>
      <p>Dynamic ID: {id}</p>
    </div>
  )
}`}
            </code>
          </pre>
        </div>
      </div>
    </main>
  )
}


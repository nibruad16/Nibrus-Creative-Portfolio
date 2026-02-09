export default function SetupPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)]" />

            <div className="relative max-w-2xl w-full bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
                        <span className="text-3xl">⚙️</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Setup Required</h1>
                    <p className="text-white/60">Your admin dashboard is almost ready!</p>
                </div>

                <div className="space-y-6">
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                        <h2 className="text-yellow-400 font-semibold mb-2">⚠️ Supabase Not Configured</h2>
                        <p className="text-white/80 text-sm">
                            The admin dashboard requires Supabase to be set up. This will only take about 10 minutes.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                        <h3 className="text-white font-semibold mb-4">Quick Setup Steps:</h3>
                        <ol className="space-y-3 text-white/80 text-sm">
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">1</span>
                                <span>Create a free account at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">supabase.com</a></span>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">2</span>
                                <span>Create a new project (takes ~2 minutes)</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">3</span>
                                <span>Copy your API credentials from Settings → API</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">4</span>
                                <span>Update <code className="bg-white/10 px-2 py-0.5 rounded">.env.local</code> with your credentials</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">5</span>
                                <span>Run the database schema in Supabase SQL Editor</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">6</span>
                                <span>Create your admin user in Supabase</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">7</span>
                                <span>Restart your dev server</span>
                            </li>
                        </ol>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                        <h3 className="text-blue-400 font-semibold mb-2">📚 Documentation</h3>
                        <p className="text-white/80 text-sm mb-3">
                            Detailed setup instructions are available in your project:
                        </p>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2 text-white/70">
                                <span className="text-blue-400">→</span>
                                <code className="bg-white/10 px-2 py-0.5 rounded">QUICK_START.md</code>
                                <span className="text-white/50">- Step-by-step checklist</span>
                            </li>
                            <li className="flex items-center gap-2 text-white/70">
                                <span className="text-blue-400">→</span>
                                <code className="bg-white/10 px-2 py-0.5 rounded">ADMIN_SETUP.md</code>
                                <span className="text-white/50">- Detailed guide</span>
                            </li>
                            <li className="flex items-center gap-2 text-white/70">
                                <span className="text-blue-400">→</span>
                                <code className="bg-white/10 px-2 py-0.5 rounded">supabase/schema.sql</code>
                                <span className="text-white/50">- Database schema</span>
                            </li>
                        </ul>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <a
                            href="https://supabase.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition-all"
                        >
                            Go to Supabase →
                        </a>
                        <a
                            href="/"
                            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 px-6 rounded-lg text-center transition-all"
                        >
                            Back to Portfolio
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

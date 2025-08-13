export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-xs text-muted-foreground md:flex-row">
        <p>
          {"© "}
          {new Date().getFullYear()} CinematicDirector — All rights reserved.
        </p>
        <p className="text-center md:text-right">Built with Next.js and shadcn/ui. Deployed on Vercel.</p>
      </div>
    </footer>
  )
}

"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function Navbar({ className = "" }: { className?: string }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#projects", label: "Projects" },
    { href: "/tools", label: "Tools" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <div
      className={cn(
        "sticky top-0 z-50 w-full transition-colors",
        scrolled ? "backdrop-blur supports-[backdrop-filter]:bg-black/40" : "bg-transparent",
        className,
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="#home" className="font-semibold tracking-wide">
          <span className="text-white">Cinematic</span>
          <span className="text-amber-400">Director</span>
        </Link>
        <div className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <a href="#contact">Hire Me</a>
          </Button>
          <Button asChild size="sm" variant="secondary">
            <a href="/projects">Portfolio</a>
          </Button>
        </div>
      </nav>
      <div className="mx-auto block border-t border-white/10 md:hidden" />
      <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-x-auto px-4 py-2 md:hidden">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="whitespace-nowrap rounded-full border border-white/15 px-3 py-1 text-xs text-muted-foreground hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )
}

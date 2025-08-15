"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Star } from "lucide-react"

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
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "backdrop-blur supports-[backdrop-filter]:bg-black/60 border-b border-white/10" : "bg-transparent",
        className,
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="#home" className="font-semibold tracking-wide flex items-center gap-2">
          <div className="p-1 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded border border-amber-500/30">
            <Star className="h-4 w-4 text-amber-400" />
          </div>
          <div>
            <span className="text-white">Cinematic</span>
            <span className="text-amber-400">Director</span>
          </div>
        </Link>
        
        <div className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-white/70 hover:text-amber-400 transition-colors duration-300 font-medium relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
        
        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="hidden md:inline-flex bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
            <a href="#contact">Hire Me</a>
          </Button>
          <Button asChild size="sm" variant="secondary" className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-400 hover:from-amber-500/20 hover:to-orange-500/20 hover:border-amber-500/40">
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
            className="whitespace-nowrap rounded-full border border-amber-500/30 px-3 py-1 text-xs text-amber-400 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all duration-300"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )
}

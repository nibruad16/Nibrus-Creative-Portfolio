"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#projects", label: "Projects" },
  { href: "/tools", label: "Tools" }, // route to the Tools page
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Brand */}
        <Link href="/#home" className="group inline-flex items-center gap-2">
          <Image
            src="/profile-nibru.jpg"
            alt="Nibru Kefyalew"
            width={28}
            height={28}
            className="rounded-full ring-2 ring-amber-400/60"
            priority
          />
          <span
            className="font-semibold tracking-tight bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200
                        bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]
                        transition-colors group-hover:from-amber-300 group-hover:to-yellow-100"
          >
            Nibru Kefyalew
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-white/70 hover:text-amber-400 transition-colors duration-300 font-medium relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            size="sm"
            className="hidden md:inline-flex bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
          >
            <Link href="/#contact">Hire Me</Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="secondary"
            className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-400 hover:from-amber-500/20 hover:to-orange-500/20 hover:border-amber-500/40"
          >
            <Link href="/projects">Portfolio</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}

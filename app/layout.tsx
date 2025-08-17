import "./globals.css"
import type { Metadata } from "next"

// If your components are default exports:

// If they are named exports, change to:
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Nibru Kefyalew",
  description: "I create stunning, impossible visuals that tell a story.",
  icons: {
    icon: "/profile-nibru.jpg?v=2",
    shortcut: "/profile-nibru.jpg?v=2",
    apple: "/profile-nibru.jpg?v=2",
  },
  openGraph: {
    title: "Nibru Kefyalew",
    description: "I create stunning, impossible visuals that tell a story.",
    images: [{ url: "/profile-nibru.jpg?v=2", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nibru Kefyalew",
    description: "I create stunning, impossible visuals that tell a story.",
    images: ["/profile-nibru.jpg?v=2"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <div className="relative z-50">
          <Navbar />
        </div>
        <main className="relative z-0">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

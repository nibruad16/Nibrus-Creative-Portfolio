import "./globals.css"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ConditionalLayout } from "@/components/conditional-layout"

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
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white antialiased" suppressHydrationWarning>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  )
}

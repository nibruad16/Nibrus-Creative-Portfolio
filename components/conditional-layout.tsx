'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAdminPage = pathname?.startsWith('/admin')

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-[100]">
                <Navbar />
            </div>
            {isAdminPage ? (
                // Admin pages: no footer, add top padding for navbar
                <div className="pt-16">
                    {children}
                </div>
            ) : (
                // Regular pages: include footer
                <>
                    <main className="relative">{children}</main>
                    <Footer />
                </>
            )}
        </>
    )
}

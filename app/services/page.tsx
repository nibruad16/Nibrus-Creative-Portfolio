import type { Metadata } from "next"
import { services } from "@/lib/data"
import { Section } from "@/components/section"
import { ServiceCard } from "@/components/service-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Zap, Award, TrendingUp } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Services • Cinematic & AI",
  description: "AI Image/Video Generation, Cinematic Editing & Post, Short/Long Form, Promotion & Ad Creation.",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full">
              <Star className="h-4 w-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium tracking-wide uppercase">Premium Services</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-b from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              World-Class
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Creative Services
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              From AI-powered visual generation to cinematic post-production, 
              we deliver exceptional results that elevate your brand to the highest level.
            </p>
            
            <div className="flex items-center justify-center gap-8 pt-8">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-400" />
                <span className="text-white/80">Award-Winning Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-400" />
                <span className="text-white/80">Lightning Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-amber-400" />
                <span className="text-white/80">Results-Driven</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <Section
        id="services-page"
        eyebrow="Our Services"
        title="Capabilities that build your vision"
        description="Explore our comprehensive suite of creative services designed to deliver exceptional results for discerning clients."
      >
        <div className="space-y-12">
          {/* Available Services */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20"></div>
              <h2 className="text-2xl font-semibold text-white/90">Available Now</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              {services.filter(s => !s.comingSoon).map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>

          {/* Coming Soon Services */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/30"></div>
              <h2 className="text-2xl font-semibold text-amber-400">Coming Soon</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-amber-500/30 to-transparent"></div>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              {services.filter(s => s.comingSoon).map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24">
          <div className="text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Create Something
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Extraordinary?
              </span>
            </h2>
            
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Let's discuss your project and explore how we can bring your vision to life with world-class creative services.
            </p>
            
            <div className="flex items-center justify-center gap-4 pt-8">
              <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 text-lg">
                <Link href="/#contact">
                  Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg">
                <Link href="/#projects">
                  View Our Work
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

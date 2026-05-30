import { Cursor } from '@/components/site/Cursor';
import { Navbar } from '@/components/site/Navbar';
import { Hero } from '@/components/site/Hero';
import { LogoCloud } from '@/components/site/LogoCloud';
import { Features } from '@/components/site/Features';
import { HowItWorks } from '@/components/site/HowItWorks';
import { Stats } from '@/components/site/Stats';
import { Testimonials } from '@/components/site/Testimonials';
import { Pricing } from '@/components/site/Pricing';
import { FAQ } from '@/components/site/FAQ';
import { CTA } from '@/components/site/CTA';
import { Footer } from '@/components/site/Footer';

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <LogoCloud />
        <Features />
        <HowItWorks />
        <Stats />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

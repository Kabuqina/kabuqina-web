import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Philosophy from './sections/Philosophy';
import Features from './sections/Features';
import Matrix from './sections/Matrix';
import Scenarios from './sections/Scenarios';
import GetStarted from './sections/GetStarted';
import Trust from './sections/Trust';
import FooterCTA from './sections/FooterCTA';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as unknown as gsap.TickerCallback);
    };
  }, []);

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#FAF8FB' }}>
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <GetStarted />
        <Matrix />
        <Scenarios />
        <Features />
        <Trust />
        <FooterCTA />
      </main>
      <Footer />
    </div>
  );
}

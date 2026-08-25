import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import FourLayerFramework from './sections/FourLayerFramework';
import Capabilities from './sections/Capabilities';
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

  // Art headings: reveal characters one by one when scrolled into view.
  // Every character gets the same solid purple color (no gradient), a
  // mid-tone violet that reads clearly on the light background and blends
  // with the page; dark sections get a lighter violet for contrast.
  useEffect(() => {
    const root = document.querySelector('.home-shell') as HTMLElement | null;
    if (!root) return;

    const HEADLINE_COLORS: Record<'light' | 'dark', string> = {
      light: '#6b3fa0',
      dark: '#c9a0e0',
    };

    const splitHeadline = (el: HTMLElement) => {
      if (el.dataset.kqSplit === '1') return;
      el.dataset.kqSplit = '1';
      const mode = el.dataset.reveal === 'dark' ? 'dark' : 'light';
      const color = HEADLINE_COLORS[mode];
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const textNodes: Text[] = [];
      while (walker.nextNode()) {
        const node = walker.currentNode as Text;
        if (node.nodeValue && node.nodeValue.trim().length > 0) textNodes.push(node);
      }
      let globalIndex = 0;
      textNodes.forEach((node) => {
        const frag = document.createDocumentFragment();
        Array.from(node.nodeValue ?? '').forEach((ch) => {
          const span = document.createElement('span');
          span.className = 'kq-rv';
          span.textContent = ch;
          span.style.setProperty('--rv-i', String(globalIndex));
          span.style.color = color;
          frag.appendChild(span);
          globalIndex++;
        });
        node.parentNode?.replaceChild(frag, node);
      });
    };

    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Characters fade out when the heading scrolls out of view and
          // replay the float-up reveal every time it comes back in.
          entry.target.classList.toggle('is-revealed', entry.isIntersecting);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -36px 0px' },
    );
    els.forEach((el) => {
      splitHeadline(el);
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div className="home-shell relative min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <FourLayerFramework />
        <Scenarios />
        <GetStarted />
        <Capabilities />
        <Trust />
        <FooterCTA />
      </main>
      <Footer />
    </div>
  );
}

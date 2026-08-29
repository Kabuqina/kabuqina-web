import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import AboutNavbar from './components/AboutNavbar';
import Hero from './sections/Hero';
import GetStarted from './sections/GetStarted';
import Trust from './sections/Trust';
import FooterCTA from './sections/FooterCTA';
import Footer from './sections/Footer';
import SelfStudy from './sections/SelfStudy';
import { getInitialLocale } from './lib/locale';
import type { SiteLocale } from './lib/locale';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [locale, setLocale] = useState<SiteLocale>(getInitialLocale);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    document.documentElement.lang = locale === 'en' ? 'en' : 'zh-CN';
    document.title = locale === 'en'
      ? 'Kabuqina | A multimodal AI learning tool for personal self-study'
      : '卡布奇娜 Kabuqina｜面向个人自学场景的多模态AI学习工具';
    document.querySelector('meta[name="description"]')?.setAttribute('content', locale === 'en'
      ? 'Kabuqina helps personal learners understand textbooks, exercises, images and handwriting through multimodal understanding and interactive support.'
      : '卡布奇娜从教材、练习、图片和手写内容出发，通过多模态理解与交互式辅助，帮助个人用户理解材料、分析问题并继续推进自己的学习。');
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', locale === 'en'
      ? 'Kabuqina | A multimodal AI learning tool for personal self-study'
      : '卡布奇娜 Kabuqina｜面向个人自学场景的多模态AI学习工具');
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', locale === 'en'
      ? 'Understand materials, analyze problems and keep learning through multimodal interactive support.'
      : '从教材、练习、图片和手写内容出发，帮助个人用户理解材料、分析问题并继续推进自己的学习。');
  }, [locale]);

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
        // 只有包含空格的文本（英文）才按词分组并禁止词内换行；
        // 中文等无空格文本保持逐字直接排列，否则整句不可换行会溢出
        const groupWords = (node.nodeValue ?? '').includes(' ');
        let word: HTMLSpanElement | null = null;
        Array.from(node.nodeValue ?? '').forEach((ch) => {
          if (groupWords && ch === ' ') {
            word = null;
            frag.appendChild(document.createTextNode(' '));
            globalIndex++;
            return;
          }
          const span = document.createElement('span');
          span.className = 'kq-rv';
          span.textContent = ch;
          span.style.setProperty('--rv-i', String(globalIndex));
          span.style.color = color;
          if (groupWords) {
            if (!word) {
              word = document.createElement('span');
              word.className = 'kq-rv-word';
              frag.appendChild(word);
            }
            word.appendChild(span);
          } else {
            frag.appendChild(span);
          }
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
      <AboutNavbar page="home" locale={locale} onLocaleChange={setLocale} />
      <main>
        <Hero locale={locale} />
        <SelfStudy locale={locale} />
        <GetStarted locale={locale} />
        <Trust locale={locale} />
        <FooterCTA locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}

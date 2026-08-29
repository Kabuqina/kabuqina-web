import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ArrowDown, Download, Heart } from 'lucide-react';
import type { SiteLocale } from '../lib/locale';

export default function Hero({ locale = 'zh' }: { locale?: SiteLocale }) {
  const isEnglish = locale === 'en';
  const heroRef = useRef<HTMLElement>(null);
  const [activeProduct, setActiveProduct] = useState(1);
  const [isResettingProduct, setIsResettingProduct] = useState(false);

  const showNextProduct = () => setActiveProduct((current) => Math.min(3, current + 1));
  const showPreviousProduct = () => setActiveProduct((current) => Math.max(0, current - 1));

  useEffect(() => {
    if (activeProduct === 0 || activeProduct === 3) return;
    const timer = window.setTimeout(showNextProduct, 5000);
    return () => window.clearTimeout(timer);
  }, [activeProduct]);

  useEffect(() => {
    if (!isResettingProduct) return;
    const frame = window.requestAnimationFrame(() => setIsResettingProduct(false));
    return () => window.cancelAnimationFrame(frame);
  }, [isResettingProduct]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
      gsap.fromTo('.hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.4 });
      gsap.fromTo('.hero-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 });
      gsap.fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 });
      gsap.fromTo('.hero-meta', { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power3.out', delay: 0.8 });
      gsap.fromTo('.hero-badges', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.7 });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[calc(100svh-68px)] sm:min-h-[calc(100svh-96px)] flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #e5d8ef 0%, #f8eee8 52%, #f6dfbd 100%)' }}
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="kq-orb absolute -top-40 -right-40 w-[600px] h-[600px] opacity-[0.12]"
          style={{ background: 'radial-gradient(circle, #b8a9c9 0%, transparent 70%)' }} />
        <div className="kq-orb absolute -bottom-60 -left-40 w-[500px] h-[500px] opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #d4a574 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12 pt-24 pb-16 lg:py-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="text-left">
            {/* Brand tag */}
            <div
              className="hero-title inline-flex max-w-full flex-wrap items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 border"
              style={{ backgroundColor: 'rgba(184,169,201,0.12)', borderColor: 'rgba(184,169,201,0.25)', color: '#6B5580' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#6B5580] animate-pulse" />
              {isEnglish ? 'For personal self-study · Multimodal · Tablet-oriented design' : '面向个人自学 · 多模态 · 平板端设计'}
            </div>

            {/* Main title */}
            <div className="hero-title flex flex-wrap items-center gap-x-4 gap-y-3 mb-6">
              <img
                src="/kabuqina-app-icon.png"
                alt=""
                width={64}
                height={64}
                className="h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 select-none"
                draggable={false}
              />
              <h1 className="hero-art-title text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight" data-reveal>
                {isEnglish ? 'Kabuqina' : '卡布奇娜'}
              </h1>
            </div>
            <p className="hero-subtitle text-xl md:text-2xl lg:text-3xl font-semibold text-[#5A4A6A] mb-4">
              {isEnglish ? 'Help you learn, not learn for you' : '帮你学，而不是替你学'}
            </p>
            <p className="hero-subtitle text-lg md:text-xl text-[#6B5580] font-medium mb-8 tracking-wide">
              {isEnglish ? 'Understand materials · Find the sticking point · Take the next step · Review later' : '理解材料 · 找到卡点 · 推进下一步 · 留下过程'}
            </p>

            {/* Description */}
            <p className="hero-desc text-base md:text-lg text-[#8B7D9A] max-w-lg mb-10 leading-relaxed">
              {isEnglish ? 'Kabuqina is a multimodal AI learning tool for personal self-study. Bring in the textbook, exercise, image, handwritten note or other material in front of you, then get help understanding it, locating the sticking point and deciding what to do next.' : '卡布奇娜是一款面向个人自学场景的多模态 AI 学习工具。你可以提供正在阅读的教材、练习题、图片、手写内容或其他个人学习材料，它帮助你理解眼前的内容、找到卡点，并决定下一步怎么继续。'}
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta flex w-full flex-col sm:w-auto sm:flex-row items-start gap-4 mb-6">
              <a
                href="https://kabuqina-installer-1428509047.cos.ap-guangzhou.myqcloud.com/Kabuqina_0.4.0_x64-setup.nsis.zip"
                target="_blank"
                rel="noopener noreferrer"
                className="kq-btn-primary sm:w-auto"
              >
                <Download className="w-5 h-5" />
                {isEnglish ? 'Try Kabuqina' : '立即体验'}
              </a>
              <a
                href="#self-study"
                className="kq-btn-secondary sm:w-auto"
              >
                <ArrowDown className="w-5 h-5" />
                {isEnglish ? 'See how it helps self-study' : '看看它如何帮助自学'}
              </a>
            </div>

            {/* Meta info */}
            <p className="hero-meta text-sm text-[#8B7D9A]">
              {isEnglish ? 'Latest v0.4.0 · Apache 2.0 open source · Designed for tablet-oriented multimodal study' : '最新版本 v0.4.0 · Apache 2.0 开源 · 面向平板端与多模态自学场景设计'}
            </p>
          </div>

          {/* Right: product screenshot + mascot sticker */}
          <div className="hero-badges flex justify-center lg:justify-end">
            <div className="hero-product-visual relative w-full max-w-[540px] sm:max-w-[680px] lg:max-w-[760px]">
              <div
                className="absolute inset-x-8 bottom-6 h-20 rounded-full blur-3xl"
                style={{ backgroundColor: 'rgba(184,169,201,0.28)' }}
              />
              <div
                className="kq-float relative rounded-xl lg:rounded-2xl overflow-hidden border-2 border-[#8E76A5] bg-white shadow-[0_30px_80px_rgba(73,56,94,0.24)]"
              >
                <div
                  className="hero-product-track"
                  onTransitionEnd={(event) => {
                    if (event.propertyName !== 'transform') return;
                    if (activeProduct === 3) {
                      setIsResettingProduct(true);
                      setActiveProduct(1);
                    }
                    if (activeProduct === 0) {
                      setIsResettingProduct(true);
                      setActiveProduct(2);
                    }
                  }}
                  style={{
                    transform: `translateX(-${activeProduct * 25}%)`,
                    transition: isResettingProduct ? 'none' : undefined,
                  }}
                >
                  <img
                    src="/about-product.png"
                    alt=""
                    aria-hidden="true"
                    className="hero-product-image w-1/4 h-auto shrink-0 select-none"
                    draggable={false}
                  />
                  <img
                    src="/app-screenshot.png"
                    alt={isEnglish ? 'Kabuqina product interface screenshot' : '卡布奇娜主界面截图'}
                    className="hero-product-image w-1/4 h-auto shrink-0 select-none"
                    draggable={false}
                  />
                  <img
                    src="/about-product.png"
                    alt={isEnglish ? 'Kabuqina product interface alternate screenshot' : '卡布奇娜产品界面截图'}
                    className="hero-product-image w-1/4 h-auto shrink-0 select-none"
                    draggable={false}
                  />
                  <img
                    src="/app-screenshot.png"
                    alt=""
                    aria-hidden="true"
                    className="hero-product-image w-1/4 h-auto shrink-0 select-none"
                    draggable={false}
                  />
                </div>
                <button
                  type="button"
                  className="hero-product-next hero-product-previous"
                  onClick={showPreviousProduct}
                  aria-label={isEnglish ? 'Show previous product image' : '查看上一张产品图片'}
                >
                  <span aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="hero-product-next"
                  onClick={showNextProduct}
                  aria-label={isEnglish ? 'Show next product image' : '查看下一张产品图片'}
                >
                  <span aria-hidden="true" />
                </button>
              </div>
              <div className="hero-heart hero-heart--one" aria-hidden="true"><Heart /></div>
              <div className="hero-heart hero-heart--two" aria-hidden="true"><Heart /></div>
              <img
                src="/kq-cup-steam-128.png"
                alt={isEnglish ? 'Kabuqina mascot' : '卡布奇娜吉祥物'}
                className="absolute -bottom-7 -right-7 w-24 h-24 sm:w-28 sm:h-28 object-contain select-none [image-rendering:pixelated] drop-shadow-[0_12px_24px_rgba(73,56,94,0.28)] kq-float"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

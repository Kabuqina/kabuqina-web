import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Download, Github } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

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
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #f3edf6 0%, #fbf8fb 50%, #fffafa 100%)' }}
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="kq-orb absolute -top-40 -right-40 w-[600px] h-[600px] opacity-[0.12]"
          style={{ background: 'radial-gradient(circle, #D4C5E2 0%, transparent 70%)' }} />
        <div className="kq-orb absolute -bottom-60 -left-40 w-[500px] h-[500px] opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #D4A574 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12 py-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="text-left">
            {/* Brand tag */}
            <div
              className="hero-title inline-flex max-w-full flex-wrap items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 border"
              style={{ backgroundColor: 'rgba(184,169,201,0.12)', borderColor: 'rgba(184,169,201,0.25)', color: '#6B5580' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#6B5580] animate-pulse" />
              面向学生 · Windows 桌面端 · 开源
            </div>

            {/* Main title */}
            <div className="hero-title flex items-center mb-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#49385E] leading-tight tracking-tight">
                卡布奇娜
              </h1>
            </div>
            <p className="hero-subtitle text-xl md:text-2xl lg:text-3xl font-semibold text-[#5A4A6A] mb-4">
              把论文、课件和代码整理成报告与 PPT
            </p>
            <p className="hero-subtitle text-lg md:text-xl text-[#6B5580] font-medium mb-8 tracking-wide">
              论文精读 · 课程报告 · 答辩 PPT · 公式整理 · 代码说明
            </p>

            {/* Description */}
            <p className="hero-desc text-base md:text-lg text-[#8B7D9A] max-w-lg mb-10 leading-relaxed">
              卡布奇娜是面向学生的 Windows 桌面学术助手。它帮你读材料、理结构、审提纲，
              最后生成可继续修改的 PPT、Markdown、LaTeX 或报告草稿。
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta flex w-full flex-col sm:w-auto sm:flex-row items-start gap-4 mb-6">
              <a
                href="https://kabuqina-installer-1428509047.cos.ap-guangzhou.myqcloud.com/Kabuqina_0.3.0_x64-setup.nsis.zip"
                target="_blank"
                rel="noopener noreferrer"
                className="kq-btn-primary sm:w-auto"
              >
                <Download className="w-5 h-5" />
                下载 Windows 版
              </a>
              <a
                href="https://github.com/Kabuqina/Kabuqina"
                target="_blank"
                rel="noopener noreferrer"
                className="kq-btn-secondary sm:w-auto"
              >
                <Github className="w-5 h-5" />
                在 GitHub 查看源码
              </a>
            </div>

            {/* Meta info */}
            <p className="hero-meta text-sm text-[#8B7D9A]">
              最新版本 v0.3.0 · Apache 2.0 开源 · 64位 Windows
            </p>
          </div>

          {/* Right: product screenshot + mascot sticker */}
          <div className="hero-badges flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px] sm:max-w-[560px] lg:max-w-[660px]">
              <div
                className="absolute inset-x-8 bottom-6 h-20 rounded-full blur-3xl"
                style={{ backgroundColor: 'rgba(184,169,201,0.28)' }}
              />
              <div className="kq-float relative rounded-xl lg:rounded-2xl overflow-hidden border border-[#E8E0ED] bg-white shadow-[0_24px_60px_rgba(73,56,94,0.14)]">
                <img
                  src="/app-screenshot.png"
                  alt="卡布奇娜主界面截图"
                  className="w-full h-auto select-none"
                  draggable={false}
                />
              </div>
              <img
                src="/mascot.png"
                alt="卡布奇娜 mascot"
                className="absolute -bottom-5 -right-5 w-20 h-20 sm:w-24 sm:h-24 object-contain select-none rounded-full bg-white p-1.5 shadow-[0_10px_28px_rgba(73,56,94,0.18)] border border-[#E8E0ED] kq-float"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

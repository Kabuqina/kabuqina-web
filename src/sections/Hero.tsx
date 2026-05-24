import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Download, Github, UserCheck, Cpu, MessageCircle, Shield } from 'lucide-react';

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
        {/* Purple orb top-right */}
        <div className="kq-orb absolute -top-40 -right-40 w-[600px] h-[600px] opacity-[0.12]"
          style={{ background: 'radial-gradient(circle, #D4C5E2 0%, transparent 70%)' }}
        />
        {/* Warm orb bottom-left */}
        <div className="kq-orb absolute -bottom-60 -left-40 w-[500px] h-[500px] opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #D4A574 0%, transparent 70%)' }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#B8A9C9 1px, transparent 1px), linear-gradient(90deg, #B8A9C9 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12 py-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="text-left">
            {/* Brand tag */}
            <div
              className="hero-title inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 border"
              style={{ backgroundColor: 'rgba(184,169,201,0.12)', borderColor: 'rgba(184,169,201,0.25)', color: '#6B5580' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#6B5580] animate-pulse" />
              开源 Windows 桌面 AI 助手
            </div>

            {/* Main title */}
            <div className="hero-title flex items-center gap-4 mb-4">
              <img
                src="/kabuqina_logo_128.png"
                alt="卡布奇娜"
                className="w-12 h-12 md:w-16 md:h-16 rounded-xl"
              />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#49385E] leading-tight tracking-tight">
                卡布奇娜
              </h1>
            </div>
            <p className="hero-subtitle text-xl md:text-2xl lg:text-3xl font-semibold text-[#5A4A6A] mb-8">
              你的 AI 小娜，住在你的设备里
            </p>

            {/* Description */}
            <p className="hero-desc text-base md:text-lg text-[#8B7D9A] max-w-lg mb-10 leading-relaxed">
              装在你的 Windows 电脑上，连接微信、飞书、钉钉。不是网页上的聊天机器人，是你桌面右下角随时在线的小助手。
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta flex flex-col sm:flex-row items-start gap-4 mb-6">
              <a
                href="https://kabuqina-installer-1428509047.cos.ap-guangzhou.myqcloud.com/Kabuqina_0.1.0_x64_en-US.msi"
                target="_blank"
                rel="noopener noreferrer"
                className="kq-btn-primary"
              >
                <Download className="w-5 h-5" />
                下载 Windows 版
              </a>
              <a
                href="https://github.com/Kabuqina/Kabuqina"
                target="_blank"
                rel="noopener noreferrer"
                className="kq-btn-secondary"
              >
                <Github className="w-5 h-5" />
                在 GitHub 查看源码
              </a>
            </div>

            {/* Meta info */}
            <p className="hero-meta text-sm text-[#8B7D9A]">
              最新版本 v0.1.0 · MIT 开源 · 64位 Windows
            </p>
          </div>

          {/* Right: Feature highlights (glass card) */}
          <div className="hero-badges hidden lg:block">
            <div className="kq-glass p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#B8A9C9]/15 flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-[#6B5580]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#49385E]">无需注册</h3>
                  <p className="text-sm text-[#8B7D9A]">安装后直接使用</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#B8A9C9]/15 flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-[#6B5580]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#49385E]">本地运行</h3>
                  <p className="text-sm text-[#8B7D9A]">数据不出设备</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#B8A9C9]/15 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-[#60415F]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#49385E]">多平台接入</h3>
                  <p className="text-sm text-[#8B7D9A]">微信 / 飞书 / 钉钉</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#B8A9C9]/15 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#6B5580]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#49385E]">零数据上报</h3>
                  <p className="text-sm text-[#8B7D9A]">开源可审计</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

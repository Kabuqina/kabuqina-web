import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Download, Github, BookOpen, FileSearch, ClipboardList, PenTool } from 'lucide-react';

const layers = [
  { icon: BookOpen, label: '读懂材料', desc: '解析论文、课件、代码和笔记', color: '#4F9DE8' },
  { icon: FileSearch, label: '理清结构', desc: '提取重点、公式、表格和引用位置', color: '#F5B642' },
  { icon: ClipboardList, label: '确认提纲', desc: '先看逻辑，再让它继续写', color: '#F05D93' },
  { icon: PenTool, label: '生成文件', desc: '得到可编辑的 PPT、报告或说明文档', color: '#6B5580' },
];

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
      gsap.fromTo('.layer-card', { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out', stagger: 0.12, delay: 0.9 });
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
              面向学生 · Windows 桌面端 · 开源
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

          {/* Right: Four-layer framework preview */}
          <div className="hero-badges hidden lg:block">
            <div className="kq-glass p-8">
              <p className="text-sm font-medium text-[#8B7D9A] mb-5 uppercase tracking-wider">
                从材料到文件
              </p>
              <div className="space-y-4">
                {layers.map((layer, i) => (
                  <div key={layer.label} className="layer-card flex items-center gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${layer.color}15` }}
                    >
                      <layer.icon className="w-5 h-5" style={{ color: layer.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-[#49385E]">{layer.label}</span>
                        {i < layers.length - 1 && (
                          <span className="text-[#D4C5E2] text-xs">→</span>
                        )}
                      </div>
                      <p className="text-sm text-[#8B7D9A]">{layer.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

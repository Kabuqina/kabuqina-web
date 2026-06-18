import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, FileSearch, ClipboardList, PenTool } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const layers = [
  {
    icon: BookOpen,
    label: '读材料',
    title: '先理解',
    desc: '读取论文、课件、表格、图片和代码片段',
    io: '论文 PDF / 课件 / 代码 → 段落、公式、表格、重点',
    color: '#4F9DE8',
  },
  {
    icon: FileSearch,
    label: '理结构',
    title: '再整理',
    desc: '把零散内容整理成可引用、可检查的材料清单',
    io: '原始材料 → 重点清单、术语解释、引用位置',
    color: '#F5B642',
  },
  {
    icon: ClipboardList,
    label: '审提纲',
    title: '你确认',
    desc: '先给出结构和待确认点，避免直接写偏',
    io: '材料 + 作业要求 → 报告大纲、PPT 结构、待补充点',
    color: '#F05D93',
  },
  {
    icon: PenTool,
    label: '出文件',
    title: '再交付',
    desc: '生成能继续修改的文件，而不是一段临时答案',
    io: '确认后的提纲 → .pptx / Markdown / LaTeX / 报告草稿',
    color: '#6B5580',
  },
];

export default function FourLayerFramework() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.fl-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 80%' } },
      );
      gsap.fromTo(
        '.fl-card',
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: '.fl-cards', start: 'top 80%' },
        },
      );
      gsap.fromTo(
        '.fl-arrow',
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          stagger: 0.15,
          scrollTrigger: { trigger: '.fl-cards', start: 'top 80%' },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative w-full py-28 lg:py-36 overflow-hidden"
      style={{ backgroundColor: '#FAF8FB' }}
    >
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.06]"
          style={{ background: 'radial-gradient(ellipse, #B8A9C9 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="fl-header text-center mb-16">
          <div className="kq-section-header inline-flex mx-auto mb-6">
            <span className="text-sm font-medium text-[#6B5580]">为什么不只是聊天</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#49385E] mb-6 leading-tight">
            不是问一句答一句，而是一步步做出文件
          </h2>
          <p className="text-base md:text-lg text-[#8B7D9A] max-w-2xl mx-auto leading-relaxed">
            普通聊天机器人容易直接给一段答案，但作业、汇报和答辩需要可检查的过程。
            <br className="hidden md:block" />
            卡布奇娜先读清楚材料，再整理依据，让你确认提纲，最后写出可编辑的文件。
          </p>
        </div>

        {/* Cards + Arrows */}
        <div className="fl-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {layers.map((layer, i) => (
            <div key={layer.label} className="relative">
              {/* Card */}
              <div className="kq-glass p-6 h-full flex flex-col kq-feature-card">
                {/* Step number */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${layer.color}12` }}
                  >
                    <layer.icon className="w-6 h-6" style={{ color: layer.color }} />
                  </div>
                  <span className="text-xs font-bold text-[#D4C5E2] tracking-widest">
                    0{i + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#49385E] mb-1">
                  {layer.label}
                  <span className="text-[#8B7D9A] font-normal text-sm ml-2">{layer.title}</span>
                </h3>

                {/* Description */}
                <p className="text-sm text-[#5A4A6A] leading-relaxed mb-4 flex-1">
                  {layer.desc}
                </p>

                {/* IO example */}
                <div className="bg-[#F3EDF6]/60 rounded-lg p-3 mt-auto">
                  <p className="text-xs text-[#8B7D9A] leading-relaxed">
                    {layer.io}
                  </p>
                </div>
              </div>

              {/* Arrow (between cards on desktop) */}
              {i < layers.length - 1 && (
                <div className="fl-arrow hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7 4l6 6-6 6" stroke="#D4C5E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

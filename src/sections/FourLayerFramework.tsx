import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, FileSearch, ClipboardList, PenTool } from 'lucide-react';
import type { SiteLocale } from '../lib/locale';

gsap.registerPlugin(ScrollTrigger);

const layers = [
  {
    icon: BookOpen,
    label: '读材料',
    title: '先理解',
    desc: '读取教材、练习题、图片、手写内容和其他学习材料',
    io: '教材 / 练习 / 图片 / 手写内容 → 文字、公式、图像、重点',
    color: '#4F9DE8',
  },
  {
    icon: FileSearch,
    label: '理结构',
    title: '再整理',
    desc: '把零散内容整理成容易理解、可以继续追问的材料结构',
    io: '眼前材料 → 重点、术语解释、公式和图像关系',
    color: '#F5B642',
  },
  {
    icon: ClipboardList,
    label: '审提纲',
    title: '你确认',
    desc: '确认你理解到哪里、卡在哪里，再决定下一步怎么做',
    io: '材料 + 你的问题 → 卡点、提示、追问和下一步',
    color: '#F05D93',
  },
  {
    icon: PenTool,
    label: '出文件',
    title: '再交付',
    desc: '用解释、提示和可修改的结果推进学习，而不是替你完成',
    io: '确认后的思路 → 可修改记录、笔记和复习过程',
    color: '#6B5580',
  },
];

export default function FourLayerFramework({ locale = 'zh' }: { locale?: SiteLocale }) {
  const isEnglish = locale === 'en';
  const translatedLayers = isEnglish ? [
    ['Read materials', 'Understand first', 'Read papers, courseware, tables, images and code snippets', 'Papers / courseware / code -> paragraphs, formulas, tables, key points'],
    ['Structure ideas', 'Organize next', 'Turn scattered content into a citable, checkable material list', 'Raw materials -> key points, terminology, citation locations'],
    ['Review outline', 'You confirm', 'Show structure and open questions before writing', 'Materials + assignment -> report outline, slide structure, missing points'],
    ['Create files', 'Deliver last', 'Generate editable files instead of a temporary answer', 'Confirmed outline -> .pptx / Markdown / LaTeX / report draft'],
  ] : layers.map((layer) => [layer.label, layer.title, layer.desc, layer.io]);
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
      style={{ backgroundColor: 'rgba(248, 244, 236, 0.78)' }}
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
            <span className="text-sm font-medium text-[#6B5580]">{isEnglish ? 'Why this starts from material' : '为什么不只是聊天'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#49385E] mb-6 leading-tight" data-reveal>
            {isEnglish ? 'Not just one question and one answer, but a learning process you can continue' : '不是问一句答一句，而是一个可以继续的学习过程'}
          </h2>
          <p className="text-base md:text-lg text-[#8B7D9A] max-w-2xl mx-auto leading-relaxed">
            {isEnglish ? 'A blank chat starts with a question. Kabuqina starts with the material, your understanding and the point where you are stuck.' : '空白聊天框从一个问题开始，卡布奇娜从你眼前的材料、理解位置和卡点开始。'}
            <br className="hidden md:block" />
            {isEnglish ? 'It helps you understand, think and take the next step, leaving a process you can revise and review.' : '它帮助你理解、思考并推进下一步，留下可以修改和复习的过程。'}
          </p>
        </div>

        {/* Cards + Arrows */}
        <div className="fl-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {layers.map((layer, i) => (
            <div key={layer.label} className="relative min-w-0">
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
                <h3 className="text-lg font-bold text-[#49385E] mb-1 break-words">
                  {translatedLayers[i][0]}
                  <span className="text-[#8B7D9A] font-normal text-sm ml-2">{translatedLayers[i][1]}</span>
                </h3>

                {/* Description */}
                <p className="text-sm text-[#5A4A6A] leading-relaxed mb-4 flex-1">
                  {translatedLayers[i][2]}
                </p>

                {/* IO example */}
                <div className="bg-[#F3EDF6]/60 rounded-lg p-3 mt-auto">
                  <p className="text-xs text-[#8B7D9A] leading-relaxed break-words">
                    {translatedLayers[i][3]}
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

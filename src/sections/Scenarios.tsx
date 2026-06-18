import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Microscope, Presentation, Calculator } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const scenarios = [
  {
    icon: FileText,
    emoji: '📄',
    title: '课程报告与作业',
    desc: '把课件、论文、代码和作业要求放进去，先得到清晰提纲，再生成可继续修改的报告草稿。',
    color: '#4F9DE8',
  },
  {
    icon: Microscope,
    emoji: '🔬',
    title: '论文精读与汇报',
    desc: '快速梳理研究问题、方法、公式图表和关键结论，帮你准备课堂汇报或文献分享。',
    color: '#F5B642',
  },
  {
    icon: Presentation,
    emoji: '🎤',
    title: '课程与答辩 PPT',
    desc: '先确认讲述逻辑和页面结构，再生成 .pptx，适合课程展示、论文精读和代码答辩。',
    color: '#F05D93',
  },
  {
    icon: Calculator,
    emoji: '🧮',
    title: '公式与代码处理',
    desc: '把公式、推导和代码讲清楚：整理 LaTeX 表达，生成代码说明，辅助理解实现思路。',
    color: '#6B5580',
  },
];

export default function Scenarios() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.scenarios-title', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
      });
      gsap.utils.toArray<HTMLElement>('.kq-scenario-card').forEach((card) => {
        gsap.fromTo(card, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scenarios"
      ref={sectionRef}
      className="relative w-full py-32 lg:py-40"
      style={{ backgroundColor: '#FAF8FB' }}
    >
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="scenarios-title text-center mb-16 lg:mb-20">
          <div className="kq-section-header inline-flex mx-auto mb-6">
            <span className="text-sm font-medium text-[#6B5580]">学生场景</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#49385E] mb-4">
            这些任务，不必从空白文档开始
          </h2>
          <p className="text-lg md:text-xl text-[#8B7D9A]">
            面向学生最常见的报告、汇报、答辩和材料整理场景
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarios.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="kq-scenario-card group kq-glass p-8 flex items-start gap-5"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${s.color}12` }}
                >
                  <Icon className="w-7 h-7" style={{ color: s.color }} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#49385E] mb-2">
                    <span className="mr-2">{s.emoji}</span>
                    {s.title}
                  </h3>
                  <p className="text-base text-[#5A4A6A] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

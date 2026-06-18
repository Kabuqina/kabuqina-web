import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FolderOpen, Search, CheckCircle, FileOutput } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: '放入资料',
    desc: '把论文、课件、代码、表格或作业要求放进来',
    icon: FolderOpen,
    iconColor: '#4F9DE8',
  },
  {
    num: '02',
    title: '整理重点',
    desc: '自动提取关键论点、公式、表格、代码片段和引用位置',
    icon: Search,
    iconColor: '#F5B642',
  },
  {
    num: '03',
    title: '确认方向',
    desc: '先看提纲、逻辑和待补充点，确认没跑题再继续',
    icon: CheckCircle,
    iconColor: '#F05D93',
  },
  {
    num: '04',
    title: '拿到成稿',
    desc: '生成 PPT、Markdown、LaTeX 或报告草稿，打开后还能继续修改',
    icon: FileOutput,
    iconColor: '#6B5580',
  },
];

export default function GetStarted() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.getstarted-title', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
      });
      gsap.utils.toArray<HTMLElement>('.step-item').forEach((step, i) => {
        gsap.fromTo(step, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: i * 0.12,
          scrollTrigger: { trigger: step, start: 'top 85%', toggleActions: 'play none none none' },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 lg:py-40"
      style={{ backgroundColor: '#FAF8FB' }}
    >
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="getstarted-title text-center mb-16 lg:mb-20">
          <div className="kq-section-header inline-flex mx-auto mb-6">
            <span className="text-sm font-medium text-[#6B5580]">工作流</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#49385E] mb-4">
            从资料到成稿，只需 4 步
          </h2>
          <p className="text-lg md:text-xl text-[#8B7D9A]">
            每一步都能检查，不用把结果全交给黑箱
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className={`step-item relative ${i < steps.length - 1 ? 'kq-step-connector' : ''}`}
              >
                <div className="kq-glass p-8 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${step.iconColor}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: step.iconColor }} />
                    </div>
                    <span className="text-sm font-bold text-[#D4C5E2] tracking-widest">
                      STEP {step.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#49385E] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-base text-[#5A4A6A] leading-relaxed flex-1">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex items-start gap-3 p-4 rounded-[12px] border border-[#E8E0ED] kq-glass-subtle">
          <CheckCircle className="w-5 h-5 text-[#6B5580] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[#5A4A6A] leading-relaxed">
            你可以在关键节点审阅和修改，确认后才进入下一步，减少「写出来才发现方向错了」的返工。
          </p>
        </div>
      </div>
    </section>
  );
}

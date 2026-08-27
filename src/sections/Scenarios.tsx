import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Microscope, Presentation, Calculator } from 'lucide-react';
import type { SiteLocale } from '../lib/locale';

gsap.registerPlugin(ScrollTrigger);

const scenarios = [
  {
    icon: FileText,
    emoji: '📄',
    title: '课后阅读与材料理解',
    desc: '把教材、图片或笔记放进来，先弄清关键概念、图表和推导，再继续往下读。',
    color: '#4F9DE8',
  },
  {
    icon: Microscope,
    emoji: '🔬',
    title: '练习与卡点分析',
    desc: '提供练习题或手写过程，定位卡住的那一步，用提示和追问继续自己的思路。',
    color: '#F5B642',
  },
  {
    icon: Presentation,
    emoji: '🎤',
    title: '整理笔记与复习',
    desc: '把草稿、笔记和阶段性理解整理成之后可以继续修改和复习的过程。',
    color: '#F05D93',
  },
  {
    icon: Calculator,
    emoji: '🧮',
    title: '公式、图像与手写内容',
    desc: '识别公式、图像、文字和手写内容，把分散的信息放进同一个理解过程。',
    color: '#6B5580',
  },
];

export default function Scenarios({ locale = 'zh' }: { locale?: SiteLocale }) {
  const isEnglish = locale === 'en';
  const translatedScenarios = isEnglish ? [
    ['Reading and material understanding', 'Bring in a textbook, image or note, clarify key concepts, figures and derivations, then keep reading.'],
    ['Exercises and sticking points', 'Share an exercise or handwritten work, locate the blocked step and continue your own thinking with hints.'],
    ['Notes and review', 'Turn drafts, notes and partial understanding into a process you can revise and revisit later.'],
    ['Formulas, images and handwriting', 'Recognize formulas, images, text and handwriting, bringing scattered information into one understanding process.'],
  ] : scenarios.map((scenario) => [scenario.title, scenario.desc]);
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
      style={{ backgroundColor: 'rgba(244, 238, 245, 0.78)' }}
    >
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="scenarios-title text-center mb-16 lg:mb-20">
          <div className="kq-section-header inline-flex mx-auto mb-6">
            <span className="text-sm font-medium text-[#6B5580]">{isEnglish ? 'Student scenarios' : '学生场景'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#49385E] mb-4" data-reveal>
            {isEnglish ? 'These tasks do not have to start from a blank document' : '这些任务，不必从空白文档开始'}
          </h2>
          <p className="text-lg md:text-xl text-[#8B7D9A]">
            {isEnglish ? 'For the reading, exercises, notes and review that make up frequent personal self-study' : '面向个人自学中持续发生的阅读、练习、笔记和复习'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarios.map((s, index) => {
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
                    {translatedScenarios[index][0]}
                  </h3>
                  <p className="text-base text-[#5A4A6A] leading-relaxed">
                    {translatedScenarios[index][1]}
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

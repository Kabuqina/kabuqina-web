import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { BookOpen, PenLine, ScanText, MessageCircle } from 'lucide-react';
import type { SiteLocale } from '../lib/locale';

type SelfStudyProps = { locale?: SiteLocale };

type PainPoint = {
  icon: typeof BookOpen;
  zh: { title: string; desc: string };
  en: { title: string; desc: string };
  color: string;
};

const painPoints: PainPoint[] = [
  {
    icon: BookOpen,
    zh: { title: '眼前材料看不懂', desc: '教材或练习就在眼前，却不知道关键概念和下一步。' },
    en: { title: 'The material is hard to follow', desc: 'The page is right in front of you, but the key idea is still unclear.' },
    color: '#4F9DE8',
  },
  {
    icon: PenLine,
    zh: { title: '练习做不下去', desc: '卡在某一步，但完整答案又容易打断思考。' },
    en: { title: 'An exercise gets stuck', desc: 'You are blocked at one step, while a full answer can interrupt your thinking.' },
    color: '#F5B642',
  },
  {
    icon: ScanText,
    zh: { title: '手写过程难整理', desc: '草稿、笔记和推导分散，之后很难继续利用和复习。' },
    en: { title: 'Handwritten work is scattered', desc: 'Drafts, notes and derivations are hard to organize and reuse.' },
    color: '#F05D93',
  },
  {
    icon: MessageCircle,
    zh: { title: '问完就结束', desc: '只拿到一个答案，却没有留下理解、修改和复习的过程。' },
    en: { title: 'The conversation ends too soon', desc: 'A quick answer solves the moment, but leaves no process to revisit.' },
    color: '#6B5580',
  },
];

export default function SelfStudy({ locale = 'zh' }: SelfStudyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isEnglish = locale === 'en';

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.self-study-title, .self-study-card', { opacity: 0, y: 30 }, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 78%', toggleActions: 'play none none none' },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section id="self-study" ref={sectionRef} className="relative w-full py-20 lg:py-36" style={{ backgroundColor: 'rgba(250, 248, 251, 0.82)' }}>
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="self-study-title text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="kq-section-header inline-flex mx-auto mb-6">
            <span className="text-sm font-medium text-[#6B5580]">{isEnglish ? 'Self-study, in real life' : '真实的自学现场'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#49385E] mb-5 leading-tight" data-reveal>
            {isEnglish ? 'Self-study happens every day. So do the hard parts.' : '自学每天发生，困难也每天发生'}
          </h2>
          <p className="text-base md:text-lg text-[#5A4A6A] leading-relaxed">
            {isEnglish ? 'Evening study, reading after class, solving exercises, organizing notes and reviewing later all add up to real learning time. Kabuqina starts from the material in front of you and helps you keep going.' : '晚自习、课后阅读、做练习、整理笔记和阶段复习，构成了大量真实而持续的学习时间。卡布奇娜从你眼前的材料出发，帮助你把学习继续推进。'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {painPoints.map((point) => {
            const Icon = point.icon;
            const copy = isEnglish ? point.en : point.zh;
            return (
              <article key={copy.title} className="self-study-card kq-glass p-6 min-h-[190px]">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: `${point.color}14` }}>
                  <Icon className="w-5 h-5" style={{ color: point.color }} />
                </div>
                <h3 className="text-lg font-bold text-[#49385E] mb-2">{copy.title}</h3>
                <p className="text-sm text-[#5A4A6A] leading-relaxed">{copy.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

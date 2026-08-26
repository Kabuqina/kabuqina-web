import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, MapPin, ArrowRight } from 'lucide-react';
import type { SiteLocale } from '../lib/locale';

gsap.registerPlugin(ScrollTrigger);

const trustItems = [
  {
    icon: Eye,
    title: '看见材料',
    desc: '识别你正在阅读、练习或书写的内容，把图像、文字、公式和手写内容放进同一个理解过程。',
    iconColor: '#4F9DE8',
  },
  {
    icon: MapPin,
    title: '找到卡点',
    desc: '结合眼前材料和你正在问的问题，帮助定位真正的理解障碍，而不是只给一段脱离上下文的答案。',
    iconColor: '#6B5580',
  },
  {
    icon: ArrowRight,
    title: '推进下一步',
    desc: '通过解释、提示和追问帮助你继续思考，让学习留下可以修改和复习的过程。',
    iconColor: '#D4A574',
  },
];

export default function Trust({ locale = 'zh' }: { locale?: SiteLocale }) {
  const isEnglish = locale === 'en';
  const translatedItems = isEnglish ? [
    ['See the material', 'Recognize what you are reading, solving or writing, bringing images, text, formulas and handwriting into one understanding process.'],
    ['Find the sticking point', 'Combine the material in front of you with your question to locate the real barrier to understanding.'],
    ['Take the next step', 'Use explanations, hints and questions to keep thinking, leaving a process you can revise and review.'],
  ] : trustItems.map((item) => [item.title, item.desc]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.trust-title', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
      });
      gsap.utils.toArray<HTMLElement>('.trust-card').forEach((card) => {
        gsap.fromTo(card, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.12,
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 lg:py-40"
      style={{ backgroundColor: 'rgba(244, 238, 245, 0.78)' }}
    >
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="trust-title text-center mb-16 lg:mb-20">
          <div className="kq-section-header inline-flex mx-auto mb-6">
            <span className="text-sm font-medium text-[#6B5580]">{isEnglish ? 'Core value' : '核心价值'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#49385E] mb-4" data-reveal>
            {isEnglish ? 'It understands more than the question' : '它理解的不只是问题，还有你眼前的材料'}
          </h2>
          <p className="text-lg md:text-xl text-[#8B7D9A]">
            {isEnglish ? 'Kabuqina starts from your real study material and helps you keep learning.' : '卡布奇娜从你正在使用的学习材料出发，把理解、分析和行动放进同一个过程。'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="trust-card p-8 rounded-[12px] kq-glass kq-feature-card"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${item.iconColor}12` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: item.iconColor }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#49385E] mb-2">
                        {translatedItems[index][0]}
                    </h3>
                    <p className="text-base text-[#5A4A6A] leading-relaxed">
                      {translatedItems[index][1]}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

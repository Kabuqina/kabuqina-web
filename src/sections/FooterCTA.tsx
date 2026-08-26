import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Github, MessageCircle } from 'lucide-react';
import type { SiteLocale } from '../lib/locale';

gsap.registerPlugin(ScrollTrigger);
export default function FooterCTA({ locale = 'zh' }: { locale?: SiteLocale }) {
  const isEnglish = locale === 'en';
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-cta-content', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 lg:py-40 overflow-hidden"
      style={{ backgroundColor: '#49385E' }}
    >
      <div className="absolute top-12 right-12 lg:top-16 lg:right-24 opacity-20">
        <svg className="kq-rotate-badge w-32 h-32 lg:w-40 lg:h-40" viewBox="0 0 200 200">
          <defs>
            <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
          </defs>
          <text fill="#D4C5E2" fontSize="13" fontWeight="500" letterSpacing="4">
            <textPath href="#circlePath">
              {isEnglish ? 'ACADEMIC · OPEN SOURCE · LOCAL · ACADEMIC · OPEN SOURCE · LOCAL ·' : '学术 · 开源 · 本地 · 学术 · 开源 · 本地 ·'}
            </textPath>
          </text>
        </svg>
      </div>

      <div className="footer-cta-content w-full px-6 lg:px-12 max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#E8DFF0] mb-8 leading-snug" data-reveal="dark">
          {isEnglish ? 'Help you learn, not learn for you' : '帮你学，而不是替你学'}
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-base md:text-lg leading-relaxed text-[#D4C5E2]">
          {isEnglish ? 'Kabuqina is continuing product iteration and validation in real self-study settings, with ongoing work on material understanding, multimodal interaction and tablet experiences.' : '卡布奇娜目前正在持续进行产品迭代和真实自学场景验证，重点完善材料理解、多模态交互和平板端使用体验。'}
        </p>
        <ul className="mx-auto mb-10 grid max-w-3xl gap-3 text-left text-sm text-[#E8DFF0] md:grid-cols-3">
          {(isEnglish ? [
            'Understand your material and thinking position before concluding.',
            'Offer a hint before giving a complete answer when possible.',
            'Keep your own expression available for revision and review.',
          ] : [
            '在给出结论前，先理解你的材料和思考位置。',
            '可以提示时，不急于直接给出完整答案。',
            '保留你的表达，让学习结果能够继续修改和复习。',
          ]).map((principle) => <li key={principle} className="border-l border-[#B8A9C9]/50 pl-4 leading-relaxed">{principle}</li>)}
        </ul>

        <div className="flex w-full flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          {/* Download - White button on dark bg → most prominent */}
          <a
            href="https://kabuqina-installer-1428509047.cos.ap-guangzhou.myqcloud.com/Kabuqina_0.4.0_x64-setup.nsis.zip"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-10 py-5 bg-white text-[#49385E] text-lg font-semibold text-center rounded-[12px] shadow-lg transition-all duration-300 hover:brightness-95 active:scale-[0.97]"
          >
            <Download className="w-5 h-5" />
            {isEnglish ? 'Try Kabuqina' : '立即体验'}
          </a>

          {/* GitHub - Lighter purple bg + border */}
          <a
            href="https://github.com/Kabuqina/Kabuqina"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-10 py-5 bg-[#D4C5E2] text-[#49385E] text-lg font-semibold text-center rounded-[12px] border border-[#D4C5E2] transition-all duration-300 hover:bg-[#E0D4EC] active:scale-[0.97]"
          >
            <Github className="w-5 h-5" />
            {isEnglish ? 'View source on GitHub' : '查看 GitHub 源码'}
          </a>

          {/* Discuss - Ghost style on dark */}
          <a
            href="#"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-10 py-5 bg-transparent text-[#E8DFF0] text-lg font-semibold text-center rounded-[12px] border border-[#B8A9C9]/40 transition-all duration-300 hover:bg-[#D4C5E2]/15 hover:border-[#D4C5E2]/70 active:scale-[0.97]"
          >
            <MessageCircle className="w-5 h-5" />
            {isEnglish ? 'Join the student community' : '加入学生讨论群'}
          </a>
        </div>
      </div>
    </section>
  );
}

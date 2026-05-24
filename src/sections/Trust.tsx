import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lock, Shield, Users, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const trustItems = [
  {
    icon: Lock,
    title: '代码完全开源',
    desc: 'MIT 协议，GitHub 公开仓库。每一行代码可审计，欢迎社区监督。',
    iconColor: '#4F9DE8',
  },
  {
    icon: Shield,
    title: '零数据上报',
    desc: '你的聊天记录、文件、记忆，全部存在本机 ~/.capuchina/。我们不会看到，也拿不到。',
    iconColor: '#6B5580',
  },
  {
    icon: Users,
    title: '社区驱动',
    desc: '欢迎提交 Issue、贡献插件、分享你的"小娜技能配方"。我们一起把她养得更聪明。',
    iconColor: '#D4A574',
  },
];

export default function Trust() {
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
      style={{ backgroundColor: '#FAF8FB' }}
    >
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="trust-title text-center mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#49385E] mb-4">
            你的数据，你说了算
          </h2>
          <p className="text-lg md:text-xl text-[#8B7D9A]">
            开源不只是口号，是每一行代码的透明
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="trust-card p-8 rounded-[12px] text-center"
                style={{ backgroundColor: '#E8DFF0' }}
              >
                <div className="w-14 h-14 mx-auto mb-6 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${item.iconColor}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color: item.iconColor }} />
                </div>
                <h3 className="text-xl font-bold text-[#49385E] mb-3">
                  {item.title}
                </h3>
                <p className="text-base text-[#5A4A6A] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://github.com/Kabuqina/Kabuqina"
            target="_blank"
            rel="noopener noreferrer"
            className="kq-btn-primary"
          >
            <ExternalLink className="w-5 h-5" />
            查看 GitHub 仓库
          </a>
          <a
            href="#"
            className="kq-btn-secondary"
          >
            加入讨论群
          </a>
        </div>
      </div>
    </section>
  );
}

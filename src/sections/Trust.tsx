import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lock, Shield, Users, Key } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const trustItems = [
  {
    icon: Lock,
    title: '代码完全开源',
    desc: 'MIT 协议，GitHub 公开仓库。关心安全和实现细节的人，可以直接查看代码。',
    iconColor: '#4F9DE8',
  },
  {
    icon: Shield,
    title: '零数据上报',
    desc: '你的资料、对话和生成过程优先留在本机。不会主动收集，也不会做行为追踪。',
    iconColor: '#6B5580',
  },
  {
    icon: Users,
    title: '社区驱动',
    desc: '欢迎提交 Issue、贡献插件、分享使用方法。一起把学生真正需要的工作流做扎实。',
    iconColor: '#D4A574',
  },
  {
    icon: Key,
    title: '凭据安全',
    desc: 'API Key 存入 Windows Credential Manager，不写入普通配置文件或日志，减少误传和泄露风险。',
    iconColor: '#F05D93',
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
          <div className="kq-section-header inline-flex mx-auto mb-6">
            <span className="text-sm font-medium text-[#6B5580]">信任</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#49385E] mb-4">
            你的资料，留在你的电脑里
          </h2>
          <p className="text-lg md:text-xl text-[#8B7D9A]">
            首页先讲好用，底层也尽量做到透明、可查、可控
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trustItems.map((item) => {
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
                      {item.title}
                    </h3>
                    <p className="text-base text-[#5A4A6A] leading-relaxed">
                      {item.desc}
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

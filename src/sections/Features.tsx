import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, MessageCircle, Clock, Wrench, Shield, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Brain,
    title: '越用越懂你',
    desc: '记住你的工作习惯、常用指令、项目背景。不用每次都从头交代，小娜记得你"加几块糖"。',
    iconColor: '#4F9DE8', // learn/文档
  },
  {
    icon: MessageCircle,
    title: '就在微信/飞书/钉钉里',
    desc: '直接在这些平台 @小娜 对话，就像喊一位同事。她随时在群里或私聊中响应你。',
    iconColor: '#60415F', // writing
  },
  {
    icon: Clock,
    title: '到点自动找你',
    desc: '定时日报、周报提醒、数据备份。到时间主动发消息给你，从不迟到。',
    iconColor: '#F05D93', // alarm
  },
  {
    icon: Wrench,
    title: '学会新技能',
    desc: '你教过她一次的操作，她会写成"技能配方"记下来。下次遇到同样的问题，她自己搞定。',
    iconColor: '#4F9DE8', // learn
  },
  {
    icon: Shield,
    title: '数据只在你电脑上',
    desc: '所有记忆和记录存在本地 ~/.capuchina/。零云端上传，零数据上报，开源可审计。',
    iconColor: '#6B5580', // primary-dark
  },
  {
    icon: Zap,
    title: '轻到无感',
    desc: '后台静默运行，低内存占用，开机自启。她就像托盘区的一个小图标，随时唤醒，从不打扰。',
    iconColor: '#F5B642', // folder
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.features-title', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
      });
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative w-full py-32 lg:py-40"
      style={{ backgroundColor: '#FAF8FB' }}
    >
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="features-title text-center mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#49385E] mb-4">
            小娜能为你做什么
          </h2>
          <p className="text-lg md:text-xl text-[#8B7D9A]">
            不只是聊天，她是懂你的工作搭子
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                ref={(el) => { if (el) cardsRef.current[i] = el; }}
                className="kq-feature-card reveal group p-8 rounded-[12px] cursor-default"
                style={{ backgroundColor: '#E8DFF0' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${feature.iconColor}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: feature.iconColor }} />
                </div>
                <h3 className="text-xl font-bold text-[#49385E] mb-3">
                  {feature.title}
                </h3>
                <p className="text-base text-[#5A4A6A] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

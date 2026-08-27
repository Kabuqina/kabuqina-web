import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, MessageCircle, Clock, Wrench, Shield, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Brain,
    title: '从材料开始理解',
    desc: '从你正在阅读、练习或书写的内容开始，理解问题所在，而不是只打开一个空白聊天框。',
    iconColor: '#4F9DE8', // learn/文档
  },
  {
    icon: MessageCircle,
    title: '解释、提示、追问',
    desc: '根据你的理解位置提供解释、提示和追问，尽量帮你继续思考，而不是直接替你完成。',
    iconColor: '#60415F', // writing
  },
  {
    icon: Clock,
    title: '适合高频自学',
    desc: '晚自习、课后阅读、做练习、整理笔记和复习，都可以从眼前这一页继续推进。',
    iconColor: '#F05D93', // alarm
  },
  {
    icon: Wrench,
    title: '留下可复习的过程',
    desc: '保留重要理解、问题和思考结果，之后还能继续修改，不让一次问答在得到答案后结束。',
    iconColor: '#4F9DE8', // learn
  },
  {
    icon: Shield,
    title: '从真实学习材料出发',
    desc: '支持教材、练习题、图片和手写内容进入同一个理解过程，聚焦个人学习而不是机构管理。',
    iconColor: '#6B5580', // primary-dark
  },
  {
    icon: Zap,
    title: '面向多模态场景设计',
    desc: '持续推进图像采集、内容解析和交互式辅助能力，并面向平板端使用场景进行设计探索。',
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
            不只是问答，而是陪你把学习继续下去
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

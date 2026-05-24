import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const scenarios = [
  {
    time: '09:00',
    title: '早安简报',
    desc: '早上 9:00，小娜自动在微信给你发消息："早安！今天有 3 个会议，项目 A 的 PR 昨晚已合并，需要我帮你写日报草稿吗？"',
    image: '/scene-morning.jpg',
  },
  {
    time: '14:30',
    title: '群里救场',
    desc: '同事在飞书群里问："谁有上个月的销售数据？" 你 @小娜，她立即从本地 Excel 提取数据并生成图表发到群里。',
    image: '/scene-team.jpg',
  },
  {
    time: '18:30',
    title: '下班备份',
    desc: '晚上 6:30，小娜准时在钉钉提醒你："今日代码已自动备份到 NAS，本地日志清理完成。需要我生成今日工作摘要吗？"',
    image: '/scene-evening.jpg',
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#49385E] mb-4">
            小娜的一天
          </h2>
          <p className="text-lg md:text-xl text-[#8B7D9A]">
            看看她怎么融入你的工作流
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {scenarios.map((s) => (
            <div
              key={s.title}
              className="kq-scenario-card group rounded-[12px] overflow-hidden border border-[#E8E0ED] kq-glass-subtle"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-[#6B5580]">
                  {s.time}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#49385E] mb-3">
                  {s.title}
                </h3>
                <p className="text-base text-[#5A4A6A] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

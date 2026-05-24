import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, QrCode, Cpu, MessageSquare, AlertTriangle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: '下载安装包',
    desc: '点击下载 .exe，双击安装，30 秒完成',
    icon: Download,
    action: '下载 Windows 64位',
    iconColor: '#5A4A6A', // download
  },
  {
    num: '02',
    title: '选择 AI 模型',
    desc: '支持 OpenAI / Claude / 国产大模型 / 本地部署。一键切换，随时更换',
    icon: Cpu,
    action: null,
    iconColor: '#4F9DE8', // learn
  },
  {
    num: '03',
    title: '开始工作',
    desc: '在微信里 @小娜，或点击电脑右下角的托盘图标。直接对话，她会自己学习你的习惯',
    icon: MessageSquare,
    action: null,
    iconColor: '#60415F', // writing
  },
  {
    num: '04',
    title: '连接移动 Bot',
    desc: '打开小娜，选择微信/飞书/钉钉，扫码授权。她就能在这些平台找到你了',
    icon: QrCode,
    action: null,
    iconColor: '#F5B642', // folder
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
      id="download"
      ref={sectionRef}
      className="relative w-full py-32 lg:py-40"
      style={{ backgroundColor: '#FAF8FB' }}
    >
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="getstarted-title text-center mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#49385E] mb-4">
            4 步让小娜住进你的电脑
          </h2>
          <p className="text-lg md:text-xl text-[#8B7D9A]">
            比泡一杯咖啡还简单
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
                <div className="relative p-8 rounded-[12px] h-full" style={{ backgroundColor: '#E8DFF0' }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${step.iconColor}18` }}
                    >
                      <span className="text-lg font-bold" style={{ color: step.iconColor }}>
                        {step.num}
                      </span>
                    </div>
                    <Icon className="w-5 h-5" style={{ color: step.iconColor }} />
                  </div>

                  <h3 className="text-xl font-bold text-[#49385E] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-base text-[#5A4A6A] leading-relaxed mb-4">
                    {step.desc}
                  </p>

                  {step.action && (
                    <a
                      href="https://kabuqina-installer-1428509047.cos.ap-guangzhou.myqcloud.com/Kabuqina_0.1.0_x64_en-US.msi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="kq-btn-primary !px-5 !py-3 text-sm"
                    >
                      <Download className="w-4 h-4" />
                      {step.action}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex items-start gap-3 p-6 rounded-[12px] border border-[#E8E0ED] kq-glass-subtle">
          <AlertTriangle className="w-5 h-5 text-[#D4A574] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[#5A4A6A] leading-relaxed">
            目前仅支持 Windows 10/11 64位系统。macOS 和 Linux 版本正在开发中，欢迎在 GitHub 关注进度。
          </p>
        </div>
      </div>
    </section>
  );
}

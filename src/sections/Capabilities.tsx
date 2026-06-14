import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileSearch, Presentation, Search, FileOutput, Shield, CheckCircle, Mic, Calculator, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const readyFeatures = [
  {
    icon: FileSearch,
    title: '精确文档读取',
    desc: '读取 PDF、DOCX、PPTX、XLSX、HTML、Markdown、CSV、图片',
    color: '#4F9DE8',
  },
  {
    icon: Presentation,
    title: '学生 PPT 工作流',
    desc: '读材料→建索引→审提纲→写出 .pptx',
    color: '#F5B642',
  },
  {
    icon: Search,
    title: '材料索引',
    desc: '把原始材料拆成可引用的事实、公式、表格、代码',
    color: '#F05D93',
  },
  {
    icon: FileOutput,
    title: '提纲审阅',
    desc: '写文件前先出结构、假设和待确认点',
    color: '#6B5580',
  },
  {
    icon: FileOutput,
    title: '文件写出',
    desc: '输出 PPTX、Markdown、LaTeX、报告草稿等可编辑文件',
    color: '#4F9DE8',
  },
  {
    icon: Shield,
    title: '桌面凭据安全',
    desc: 'API Key 存入 Windows Credential Manager，不入配置文件和日志',
    color: '#6B5580',
  },
];

const extensionFeatures = [
  {
    icon: Calculator,
    title: '公式抽取与 LaTeX',
    desc: '从公式密集材料中抽取数学表达',
    status: '需加载能力包',
    color: '#4F9DE8',
  },
  {
    icon: Mic,
    title: '本地语音识别',
    desc: '把课堂录音、口述笔记转成文本',
    status: '需加载能力包',
    color: '#F5B642',
  },
  {
    icon: BookOpen,
    title: '数学表达工程',
    desc: '公式清洗、公式转代码、代码转公式说明',
    status: '方向性能力',
    color: '#F05D93',
  },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.cap-title', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
      });
      gsap.fromTo('.cap-left', { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2,
        scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' },
      });
      gsap.fromTo('.cap-right', { opacity: 0, x: 40 }, {
        opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.3,
        scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="capabilities-detail"
      ref={sectionRef}
      className="relative w-full py-32 lg:py-40"
      style={{ backgroundColor: '#FAF8FB' }}
    >
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="cap-title text-center mb-16 lg:mb-20">
          <div className="kq-section-header inline-flex mx-auto mb-6">
            <span className="text-sm font-medium text-[#6B5580]">能力详情</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#49385E] mb-4">
            能力一览
          </h2>
          <p className="text-lg md:text-xl text-[#8B7D9A]">
            已就绪的核心能力 + 按需加载的能力包扩展
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Ready features */}
          <div className="cap-left">
            <h3 className="text-lg font-bold text-[#49385E] mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#6B5580]" />
              已就绪能力
            </h3>
            <div className="space-y-4">
              {readyFeatures.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="kq-glass p-5 flex items-start gap-4 kq-feature-card"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${f.color}12` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: f.color }} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#49385E] mb-1">{f.title}</h4>
                      <p className="text-sm text-[#5A4A6A] leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Extension features */}
          <div className="cap-right">
            <h3 className="text-lg font-bold text-[#49385E] mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#8B7D9A]" />
              能力包扩展（按需加载）
            </h3>
            <div className="space-y-4">
              {extensionFeatures.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="kq-glass p-5 flex items-start gap-4 kq-feature-card"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${f.color}12` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: f.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-base font-bold text-[#49385E]">{f.title}</h4>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{
                            backgroundColor: f.status === '方向性能力' ? 'rgba(184,169,201,0.15)' : 'rgba(79,157,232,0.1)',
                            color: f.status === '方向性能力' ? '#6B5580' : '#4F9DE8',
                          }}
                        >
                          {f.status}
                        </span>
                      </div>
                      <p className="text-sm text-[#5A4A6A] leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

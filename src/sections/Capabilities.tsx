import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileSearch, Presentation, Search, FileOutput, CheckCircle, Mic, Calculator, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const readyFeatures = [
  {
    icon: FileSearch,
    title: '精确文档读取',
    desc: '读取 PDF、DOCX、PPTX、XLSX、HTML、Markdown、CSV 和图片',
    color: '#4F9DE8',
  },
  {
    icon: Presentation,
    title: 'PPT 生成流程',
    desc: '先读材料、确认提纲，再写出可编辑的 .pptx',
    color: '#F5B642',
  },
  {
    icon: Search,
    title: '材料索引',
    desc: '把原始材料拆成可引用的事实、公式、表格和代码片段',
    color: '#F05D93',
  },
  {
    icon: FileOutput,
    title: '提纲确认',
    desc: '写文件前先给结构、论点和待确认点',
    color: '#6B5580',
  },
  {
    icon: FileOutput,
    title: '可编辑文件写出',
    desc: '输出 PPTX、Markdown、LaTeX 和报告草稿',
    color: '#4F9DE8',
  },
  {
    icon: Calculator,
    title: '公式抽取与 LaTeX',
    desc: '从公式密集材料中抽取数学表达',
    color: '#4F9DE8',
  },
  {
    icon: BookOpen,
    title: '数学表达处理',
    desc: '整理公式、解释推导，并辅助生成代码说明',
    color: '#F05D93',
  },
];

const extensionFeatures = [
  {
    icon: Mic,
    title: '本地语音识别',
    desc: '把课堂录音和口述笔记转成文本',
    status: '可扩展',
    color: '#F5B642',
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
      className="relative w-full py-32 lg:py-40 overflow-hidden"
      style={{ backgroundColor: '#FAF8FB' }}
    >
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="cap-title text-center mb-16 lg:mb-20">
          <div className="kq-section-header inline-flex mx-auto mb-6">
            <span className="text-sm font-medium text-[#6B5580]">处理能力</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#49385E] mb-4">
            它现在能处理什么
          </h2>
          <p className="text-lg md:text-xl text-[#8B7D9A]">
            常用学术材料可以直接处理，进阶能力也能继续扩展
          </p>
        </div>

        <div className="space-y-10 lg:space-y-12">
          {/* Ready features */}
          <div className="cap-left">
            <h3 className="text-lg font-bold text-[#49385E] mb-6 flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#6B5580]" />
              已支持
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
                    <div className="min-w-0">
                      <h4 className="text-base font-bold text-[#49385E] mb-1">{f.title}</h4>
                      <p className="text-sm text-[#5A4A6A] leading-relaxed break-words">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Extension features */}
          <div className="cap-right">
            <h3 className="text-lg font-bold text-[#49385E] mb-6 flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#8B7D9A]" />
              可扩展能力
            </h3>
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4">
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
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="text-base font-bold text-[#49385E]">{f.title}</h4>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{
                            backgroundColor: f.status === '规划中' ? 'rgba(184,169,201,0.15)' : 'rgba(79,157,232,0.1)',
                            color: f.status === '规划中' ? '#6B5580' : '#4F9DE8',
                          }}
                        >
                          {f.status}
                        </span>
                      </div>
                      <p className="text-sm text-[#5A4A6A] leading-relaxed break-words">{f.desc}</p>
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

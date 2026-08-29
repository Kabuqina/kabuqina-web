import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FolderOpen, Search, CheckCircle, FileOutput } from 'lucide-react';
import type { SiteLocale } from '../lib/locale';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: '带上眼前材料',
    desc: '提供正在阅读的教材、练习题、图片、手写内容或其他个人学习材料',
    icon: FolderOpen,
    iconColor: '#4F9DE8',
  },
  {
    num: '02',
    title: '看懂材料结构',
    desc: '识别文字、公式、图像和手写过程，整理关键概念与它们之间的关系',
    icon: Search,
    iconColor: '#F5B642',
  },
  {
    num: '03',
    title: '找到真正卡点',
    desc: '结合材料和你的问题，确认已经理解的部分与真正需要继续想的地方',
    icon: CheckCircle,
    iconColor: '#F05D93',
  },
  {
    num: '04',
    title: '继续自己的思路',
    desc: '通过解释、提示和追问推进理解，把下一步交还给你的判断，而不是替你完成',
    icon: FileOutput,
    iconColor: '#6B5580',
  },
  {
    num: '05',
    title: '留下可复习过程',
    desc: '保留重要理解、问题和思考结果，之后可以修改、回看并继续学习',
    icon: FileOutput,
    iconColor: '#D4A574',
  },
];

export default function GetStarted({ locale = 'zh' }: { locale?: SiteLocale }) {
  const isEnglish = locale === 'en';
  const translatedSteps = isEnglish ? [
    ['Bring the material', 'Bring the textbook, exercise, image, handwritten page or other personal study material in front of you'],
    ['Read its structure', 'Recognize text, formulas, images and handwriting, then connect the key ideas'],
    ['Find the real sticking point', 'Combine the material with your question to separate what you understand from what needs more thought'],
    ['Keep your thinking moving', 'Use explanations, hints and questions to continue, without handing over the work'],
    ['Keep a reviewable process', 'Save important insights, questions and thinking so you can revise, revisit and keep learning'],
  ] : steps.map((step) => [step.title, step.desc]);
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
      ref={sectionRef}
      className="relative w-full py-24 lg:py-40"
      style={{ backgroundColor: 'rgba(244, 238, 245, 0.78)' }}
    >
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="getstarted-title text-center mb-16 lg:mb-20">
          <div className="kq-section-header inline-flex mx-auto mb-6">
            <span className="text-sm font-medium text-[#6B5580]">{isEnglish ? 'Workflow' : '工作流'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#49385E] mb-4" data-reveal>
            {isEnglish ? 'From one page to continued learning in 5 steps' : '从眼前的一页开始，把学习继续下去'}
          </h2>
          <p className="text-lg md:text-xl text-[#8B7D9A]">
            {isEnglish ? 'Review every step instead of handing everything to a black box' : '每一步都能检查，不用把结果全交给黑箱'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className={`step-item relative ${i < steps.length - 1 ? 'kq-step-connector' : ''}`}
              >
                <div className="kq-glass p-8 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${step.iconColor}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: step.iconColor }} />
                    </div>
                    <span className="text-sm font-bold text-[#D4C5E2] tracking-widest">
                      STEP {step.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#49385E] mb-3">
                    {translatedSteps[i][0]}
                  </h3>
                  <p className="text-base text-[#5A4A6A] leading-relaxed flex-1">
                    {translatedSteps[i][1]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex items-start gap-3 p-4 rounded-[12px] border border-[#E8E0ED] kq-glass-subtle">
          <CheckCircle className="w-5 h-5 text-[#6B5580] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[#5A4A6A] leading-relaxed">
            {isEnglish ? 'Review and revise at key checkpoints before moving on, reducing rework caused by discovering the wrong direction too late.' : '你可以在关键节点审阅和修改，确认后才进入下一步，减少「写出来才发现方向错了」的返工。'}
          </p>
        </div>
      </div>
    </section>
  );
}

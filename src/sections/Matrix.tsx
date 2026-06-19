import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const platformMatrix = [
  { ability: '命令执行', local: true, docker: true, wechat: true, feishu: true, dingtalk: true },
  { ability: '文件操作', local: true, docker: false, wechat: true, feishu: true, dingtalk: true },
  { ability: '定时任务', local: true, docker: true, wechat: true, feishu: true, dingtalk: true },
  { ability: '浏览器操控', local: true, docker: false, wechat: false, feishu: false, dingtalk: false },
];

const modelMatrix = [
  { model: 'OpenAI', api: true },
  { model: 'Claude', api: true },
  { model: '国产模型', api: true },
  { model: '本地模型', api: true },
];

const privacyItems = [
  { label: '零数据上报', desc: '不收集任何使用数据、不发送 telemetry' },
  { label: '本地存储', desc: '所有记忆文件仅在本地 ~/.capuchina/' },
  { label: '开源可审计', desc: 'Apache 2.0 协议，GitHub 公开全部源码' },
  { label: '容器隔离', desc: 'Docker 执行环境可选安全加固' },
];

function CheckDot({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold matrix-dot transition-colors duration-300 ${
        active ? 'bg-[#6B5580] text-white' : 'bg-[#E8E0ED] text-[#8B7D9A]'
      }`}
    >
      {active ? '✓' : '—'}
    </span>
  );
}

export default function Matrix() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.matrix-title', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
      });
      gsap.fromTo('.matrix-table', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2,
        scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' },
      });
      gsap.fromTo('.matrix-model', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3,
        scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none none' },
      });
      gsap.fromTo('.matrix-privacy', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.4,
        scrollTrigger: { trigger: section, start: 'top 50%', toggleActions: 'play none none none' },
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
        <div className="matrix-title text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#49385E] mb-4">
            开箱即用的能力
          </h2>
          <p className="text-lg md:text-xl text-[#8B7D9A]">
            从代码执行到多平台接入，小娜都准备好了
          </p>
        </div>

        <div className="matrix-table overflow-x-auto mb-16">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white bg-[#49385E] rounded-tl-[12px] min-w-[120px]">
                  能力
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-white bg-[#49385E]">
                  本地终端
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-white bg-[#49385E]">
                  Docker
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-white bg-[#49385E]">
                  微信
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-white bg-[#49385E]">
                  飞书
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-white bg-[#49385E] rounded-tr-[12px]">
                  钉钉
                </th>
              </tr>
            </thead>
            <tbody>
              {platformMatrix.map((row) => (
                <tr
                  key={row.ability}
                  className="kq-matrix-row border-b border-[#E8E0ED] transition-colors duration-300"
                >
                  <td className="px-6 py-4 text-sm font-medium text-[#5A4A6A]">
                    {row.ability}
                  </td>
                  <td className="px-6 py-4 text-center"><CheckDot active={row.local} /></td>
                  <td className="px-6 py-4 text-center"><CheckDot active={row.docker} /></td>
                  <td className="px-6 py-4 text-center"><CheckDot active={row.wechat} /></td>
                  <td className="px-6 py-4 text-center"><CheckDot active={row.feishu} /></td>
                  <td className="px-6 py-4 text-center"><CheckDot active={row.dingtalk} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="matrix-model">
            <h3 className="text-lg font-bold text-[#49385E] mb-4">模型支持</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white bg-[#49385E] rounded-tl-[12px]">
                    模型
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-white bg-[#49385E] rounded-tr-[12px]">
                    API 接入
                  </th>
                </tr>
              </thead>
              <tbody>
                {modelMatrix.map((row) => (
                  <tr key={row.model} className="kq-matrix-row border-b border-[#E8E0ED]">
                    <td className="px-4 py-3 text-sm font-medium text-[#5A4A6A]">{row.model}</td>
                    <td className="px-4 py-3 text-center"><CheckDot active={row.api} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="matrix-privacy">
            <h3 className="text-lg font-bold text-[#49385E] mb-4">隐私与安全</h3>
            <div className="space-y-3">
              {privacyItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3 p-4 rounded-[12px]" style={{ backgroundColor: '#E8DFF0' }}>
                  <span className="mt-0.5 w-2 h-2 rounded-full bg-[#6B5580] flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-[#49385E]">{item.label}</p>
                    <p className="text-sm text-[#5A4A6A] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

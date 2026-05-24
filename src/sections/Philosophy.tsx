import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!section || !left || !right) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 80%', end: 'bottom 20%', toggleActions: 'play none none none' },
    });

    tl.fromTo(left, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' })
      .fromTo(right, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' }, '-=0.8');

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 lg:py-40 overflow-hidden"
      style={{ backgroundColor: '#FAF8FB' }}
    >
      <div className="relative z-10 w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Decorative text */}
          <div ref={leftRef} className="reveal">
            <p
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase"
              style={{
                color: 'transparent',
                WebkitTextStroke: '1.5px #D4C5E2',
                lineHeight: 1.05,
              }}
            >
              LOCAL
              <br />
              INTELLIGENCE
            </p>
          </div>

          {/* Right - Manifesto */}
          <div ref={rightRef} className="reveal">
            <h2 className="text-2xl md:text-3xl font-bold text-[#49385E] mb-6 leading-tight">
              你的数据，永远属于你
            </h2>
            <p className="text-base md:text-lg text-[#5A4A6A] leading-relaxed mb-6">
              卡布奇娜作为本地代理运行，所有记忆和对话数据都存储在你的电脑上。她不需要云端服务器，不会上传你的任何信息。
            </p>
            <p className="text-base md:text-lg text-[#5A4A6A] leading-relaxed mb-6">
              如同一个智能神经网络在本地默默运作，小娜在你的设备中悄然运行——轻量、安全、且能自主协调系统的各个模块。
            </p>
            <p className="text-base md:text-lg text-[#5A4A6A] leading-relaxed">
              没有隐私泄露的担忧，没有网络延迟的等待。她就是你电脑的一部分。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { ArrowLeft, Github, Heart, Lightbulb, Mail } from 'lucide-react'
import Footer from '../sections/Footer'

const principles = [
  {
    icon: Lightbulb,
    title: '从真实需求出发',
    description: '围绕学习、研究和内容整理中的实际问题，持续打磨清晰、可靠的产品体验。',
  },
  {
    icon: Heart,
    title: '让技术更有温度',
    description: '我们希望软件不只完成任务，也能尊重人的思考过程，让复杂工作变得更从容。',
  },
]

export default function About() {
  return (
    <div className="min-h-screen bg-[#FAF8FB] text-[#5A4A6A]">
      <header className="border-b border-[#E8E0ED] bg-[rgba(250,248,251,0.92)]">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:h-20 lg:px-12">
          <a href="./index.html" className="flex flex-col leading-tight" aria-label="返回卡布奇娜首页">
            <span className="text-lg font-bold text-[#49385E] md:text-xl">卡布奇娜</span>
            <span className="text-xs font-medium text-[#8B7D9A] md:text-sm">Kabuqina</span>
          </a>
          <a
            href="./index.html"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6B5580] transition-colors hover:text-[#49385E]"
          >
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </a>
        </div>
      </header>

      <main>
        <section className="border-b border-[#E8E0ED] bg-gradient-to-br from-[#F3EDF6] via-[#FAF8FB] to-[#FFFAFA]">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-28">
            <div>
              <p className="mb-5 text-sm font-semibold text-[#6B5580]">关于我们</p>
              <h1 className="mb-6 text-4xl font-bold leading-tight text-[#49385E] md:text-5xl">
                用爱与逻辑，做好真正有用的软件
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[#6B5B78] md:text-lg">
                深圳市爱与逻辑软件有限责任公司是卡布奇娜的开发和维护团队。我们关注人与技术如何更自然地协作，并把这种思考落实到每一次产品设计与迭代中。
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src="./mascot.png"
                alt="卡布奇娜形象"
                className="h-auto w-56 max-w-full select-none md:w-72"
                draggable={false}
              />
            </div>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-12 lg:py-24">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-12 max-w-3xl">
              <p className="mb-3 text-sm font-semibold text-[#6B5580]">我们在做什么</p>
              <h2 className="mb-5 text-3xl font-bold text-[#49385E] md:text-4xl">让复杂的信息工作更清晰</h2>
              <p className="text-base leading-8 text-[#8B7D9A] md:text-lg">
                卡布奇娜是一款面向学生的 Windows 桌面学术助手，帮助用户阅读材料、梳理结构、确认提纲，并生成可继续编辑的报告、PPT、Markdown 与 LaTeX 内容。
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {principles.map(({ icon: Icon, title, description }) => (
                <article key={title} className="rounded-lg border border-[#E8E0ED] bg-white p-7 shadow-[0_4px_16px_rgba(90,74,106,0.06)] md:p-8">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#F3EDF6] text-[#6B5580]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-[#49385E]">{title}</h3>
                  <p className="leading-7 text-[#8B7D9A]">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#E8E0ED] bg-white px-6 py-16 lg:px-12">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-[#49385E]">联系我们</h2>
              <p className="text-[#8B7D9A]">欢迎通过邮件交流产品建议、合作与其他事项。</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a href="mailto:contact@kabuqina.com" className="kq-btn-primary sm:w-auto">
                <Mail className="h-5 w-5" />
                contact@kabuqina.com
              </a>
              <a
                href="https://github.com/Kabuqina/Kabuqina"
                target="_blank"
                rel="noopener noreferrer"
                className="kq-btn-secondary sm:w-auto"
              >
                <Github className="h-5 w-5" />
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

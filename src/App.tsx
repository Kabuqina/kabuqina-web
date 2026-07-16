import {
  ArrowRight,
  BookOpenText,
  Code2,
  Download,
  FileOutput,
  FileSearch,
  Github,
  GraduationCap,
  LockKeyhole,
  Mic2,
  Presentation,
  ShieldCheck,
  Sparkles,
  TableProperties,
} from 'lucide-react'

import Navbar from './components/Navbar'
import Footer from './sections/Footer'
import { links } from './lib/site'

const workflow = [
  {
    number: '01',
    title: '读取材料',
    text: '论文、课件、表格、图片和代码都可以成为工作资料。',
  },
  {
    number: '02',
    title: '理清结构',
    text: '提取重点、公式、表格和引用位置，把零散信息组织起来。',
  },
  {
    number: '03',
    title: '确认方向',
    text: '先审阅提纲、论点和待补充内容，确认没跑题再继续。',
  },
  {
    number: '04',
    title: '交付文件',
    text: '生成可继续修改的 PPT、Markdown、LaTeX 或报告草稿。',
  },
]

const capabilities = [
  { icon: FileSearch, title: '精确文档读取', text: 'PDF、DOCX、PPTX、XLSX、图片与网页内容' },
  { icon: Presentation, title: 'PPT 生成流程', text: '从材料和提纲出发，生成可编辑 .pptx' },
  { icon: TableProperties, title: '公式与表格', text: '识别关键公式、表格与数据，保留上下文' },
  { icon: Code2, title: '代码说明', text: '理解代码结构，辅助生成实现思路与文档' },
  { icon: FileOutput, title: '多种可编辑输出', text: 'PPTX、Markdown、LaTeX 与报告草稿' },
  { icon: Mic2, title: '本地语音扩展', text: '可扩展本地语音识别，整理课堂录音与口述笔记' },
]

const scenarios = [
  { icon: GraduationCap, title: '课程报告', text: '将课件、论文和作业要求组织成清晰的报告草稿。' },
  { icon: BookOpenText, title: '论文精读', text: '理清研究问题、方法、公式图表与关键结论。' },
  { icon: Presentation, title: '课程与答辩 PPT', text: '先确认讲述逻辑与页面结构，再交付可编辑文件。' },
  { icon: Code2, title: '公式与代码整理', text: '辅助处理 LaTeX 表达、公式推导和代码实现说明。' },
]

export default function App() {
  return (
    <div className="company-site product-home">
      <Navbar />

      <main>
        <section className="kabuqina-hero">
          <div className="kabuqina-grid" aria-hidden="true" />
          <div className="company-container kabuqina-hero__inner">
            <div className="kabuqina-hero__copy">
              <div className="product-eyebrow">
                <img src="/kabuqina_logo_48.png" alt="" />
                KABUQINA · WINDOWS DESKTOP ACADEMIC ASSISTANT
              </div>
              <h1>卡布奇娜</h1>
              <h2>把论文、课件和代码，<br />整理成可以继续工作的成果。</h2>
              <p>面向学生和研究场景的 Windows 桌面学术助手。它先理解材料、理清结构、让你确认方向，再交付可编辑的文件。</p>

              <div className="hero-actions">
                <a className="button button--kabuqina" href={links.download} target="_blank" rel="noreferrer">
                  <Download aria-hidden="true" />下载 Windows 版
                </a>
                <a className="button button--outline" href={links.github} target="_blank" rel="noreferrer">
                  <Github aria-hidden="true" />查看 GitHub 源码
                </a>
              </div>
              <p className="kabuqina-hero__meta">v0.3.0 · 64 位 Windows · Apache License 2.0</p>
            </div>

            <div className="cup-hero" aria-label="卡布奇娜咖啡杯形象">
              <div className="cup-hero__halo" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="cup-steam" aria-hidden="true"><i /><i /><i /></div>
              <img className="cup-hero__mascot" src="/mascot.png" alt="卡布奇娜咖啡杯形象" />
              <div className="cup-note cup-note--top"><Sparkles aria-hidden="true" /><span>先理解，再生成</span></div>
              <div className="cup-note cup-note--bottom"><FileOutput aria-hidden="true" /><span>PPTX · Markdown · LaTeX</span></div>
            </div>
          </div>
          <div className="kabuqina-hero__scroll"><span>SCROLL TO EXPLORE</span><i /></div>
        </section>

        <section className="product-thesis">
          <div className="company-container product-thesis__inner">
            <p>NOT JUST A CHATBOT</p>
            <h2>不是问一句、答一句，<br />而是一步步做出真正的文件。</h2>
            <a href="#workflow" className="text-link">看看它怎么工作 <ArrowRight aria-hidden="true" /></a>
          </div>
        </section>

        <section id="workflow" className="company-section product-workflow">
          <div className="company-container">
            <div className="section-heading section-heading--split">
              <div>
                <p className="section-kicker">WORKFLOW · 从材料到成稿</p>
                <h2>每一步都能看见，<br />每一步都能确认。</h2>
              </div>
              <p>卡布奇娜把复杂任务拆成可检查的流程，减少“全部写完才发现方向错了”的返工。</p>
            </div>

            <ol className="product-workflow__rail">
              {workflow.map((item) => (
                <li key={item.number}>
                  <span>{item.number}</span>
                  <div className="workflow-dot" aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="product" className="company-section product-showcase">
          <div className="company-container">
            <div className="product-showcase__heading">
              <div>
                <p className="section-kicker section-kicker--light">DESKTOP WORKSPACE · 专注的桌面工作区</p>
                <h2>材料、对话、能力与交付，<br />在同一个工作区完成。</h2>
              </div>
              <img src="/mascot.png" alt="" />
            </div>
            <div className="showcase-window">
              <div className="showcase-window__bar">
                <div><span /><span /><span /></div>
                <p>KABUQINA / ACADEMY</p>
                <span>WINDOWS</span>
              </div>
              <img src="/app-screenshot.png" alt="卡布奇娜桌面学术助手完整界面" />
            </div>
            <div className="showcase-notes">
              <p><strong>01</strong>工作区和对话过程并行，不丢失上下文。</p>
              <p><strong>02</strong>学术、数学与文件能力直接进入当前任务。</p>
              <p><strong>03</strong>结果最终回到真实文件，便于继续修改。</p>
            </div>
          </div>
        </section>

        <section id="capabilities" className="company-section capabilities-section">
          <div className="company-container">
            <div className="section-heading section-heading--split">
              <div>
                <p className="section-kicker">CAPABILITIES · 能做什么</p>
                <h2>读得懂材料，<br />也交付得了文件。</h2>
              </div>
              <p>从常见学术格式到公式、表格与代码，把信息理解与成果交付连接起来。</p>
            </div>
            <div className="capability-grid">
              {capabilities.map(({ icon: Icon, title, text }, index) => (
                <article key={title}>
                  <div className="capability-grid__top"><Icon aria-hidden="true" /><span>0{index + 1}</span></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="scenarios" className="company-section scenario-section">
          <div className="company-container">
            <div className="scenario-section__intro">
              <p className="section-kicker section-kicker--light">MADE FOR REAL STUDY</p>
              <h2>从读懂一篇论文，<br />到完成一次答辩。</h2>
              <p>卡布奇娜并不追求一句话包办一切，而是在每一个真实场景里，给出清晰、可检查的帮助。</p>
            </div>
            <div className="scenario-grid">
              {scenarios.map(({ icon: Icon, title, text }, index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <Icon aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="trust" className="company-section product-trust">
          <div className="company-container product-trust__layout">
            <div>
              <p className="section-kicker">OPEN &amp; LOCAL · 开源与本地优先</p>
              <h2>你的资料，<br />应该由你掌握。</h2>
              <p>卡布奇娜代码公开，资料和工作过程优先留在你的设备里。实现方式可查，生成成果可编辑，关键决定权始终留给你。</p>
              <a href={links.github} target="_blank" rel="noreferrer" className="text-link">查看开源仓库 <ArrowRight aria-hidden="true" /></a>
            </div>
            <div className="trust-cards">
              <article><Github aria-hidden="true" /><div><h3>Apache 2.0 开源</h3><p>源码公开，便于了解实现与参与共建。</p></div></article>
              <article><LockKeyhole aria-hidden="true" /><div><h3>零主动数据上报</h3><p>不主动收集资料、对话与行为数据。</p></div></article>
              <article><ShieldCheck aria-hidden="true" /><div><h3>凭据安全存储</h3><p>API Key 存入 Windows Credential Manager。</p></div></article>
            </div>
          </div>
        </section>

        <section className="download-cta">
          <div className="company-container download-cta__inner">
            <img src="/mascot.png" alt="卡布奇娜咖啡杯形象" />
            <div>
              <p>KABUQINA FOR WINDOWS</p>
              <h2>下一份报告或 PPT，<br />不必再从空白页开始。</h2>
              <div>
                <a className="button button--light" href={links.download} target="_blank" rel="noreferrer"><Download aria-hidden="true" />下载 Windows 版</a>
                <a className="text-link text-link--light" href="./about.html">了解开发与维护公司 <ArrowRight aria-hidden="true" /></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

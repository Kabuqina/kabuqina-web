import {
  ArrowRight,
  Braces,
  CheckCircle2,
  Github,
  Heart,
  Mail,
  MessageSquareText,
  Scale,
  ShieldCheck,
} from 'lucide-react'

import Navbar from '../components/Navbar'
import Footer from '../sections/Footer'
import { company, links } from '../lib/site'

const values = [
  {
    index: '01',
    icon: Heart,
    english: 'CARE',
    title: '对人的处境保持关心',
    text: '我们先问这个产品是否真正减少了负担、尊重了使用者的思考过程，再谈技术的复杂程度。',
  },
  {
    index: '02',
    icon: Scale,
    english: 'CLARITY',
    title: '对复杂问题保持清醒',
    text: '功能应该有清晰的边界，流程应该可解释，输出应该可检查。这些是我们对可靠软件的基本要求。',
  },
  {
    index: '03',
    icon: Braces,
    english: 'CRAFT',
    title: '对产品细节保持耐心',
    text: '从交互、性能到后续维护，好产品是在无数小处持续被做对的结果，不是一次性的演示。',
  },
]

const companyFacts = [
  { label: '公司名称', value: company.nameZh },
  { label: 'English name', value: company.nameEn },
  { label: '产品方向', value: '智能生产力软件的设计、开发与长期维护' },
  { label: '旗舰产品', value: '卡布奇娜 Kabuqina' },
  { label: '联系邮箱', value: company.email, email: true },
]

export default function About() {
  return (
    <div className="company-site about-page">
      <Navbar page="about" />

      <main>
        <section className="about-hero">
          <div className="company-grid company-grid--dark" aria-hidden="true" />
          <div className="company-container about-hero__inner">
            <div className="about-hero__copy">
              <p className="section-kicker section-kicker--light">ABOUT AI &amp; LOGIC</p>
              <h1>爱与逻辑，<br />不是取舍，<br />而是我们<br />的工作方式。</h1>
              <p>{company.nameZh}是一家专注智能生产力软件的公司，也是卡布奇娜的开发与长期维护团队。</p>
            </div>

            <div className="about-hero__mark" aria-hidden="true">
              <span className="about-hero__ring about-hero__ring--one" />
              <span className="about-hero__ring about-hero__ring--two" />
              <div><strong>A<span>&amp;</span>L</strong><small>SHENZHEN</small></div>
            </div>
          </div>
          <div className="about-hero__footer">
            <div className="company-container">
              <span>SOFTWARE FOR THOUGHTFUL WORK</span>
              <span>01 / COMPANY</span>
            </div>
          </div>
        </section>

        <section className="company-section about-mission">
          <div className="company-container about-mission__layout">
            <div>
              <p className="section-kicker">WHY WE BUILD · 我们为什么做软件</p>
              <h2>技术应该让人更从容地思考，而不是更忙乱地追赶。</h2>
            </div>
            <div className="about-mission__copy">
              <p>当资料、任务与工具越来越多，真正稀缺的往往不是又一个答案，而是一套帮助人理解信息、确认方向、完成交付的可靠流程。</p>
              <p>我们希望做出这样的软件：它能够承担复杂工作，却不取代人的判断；它使用新技术，也尊重既有的专业方法与个人节奏。</p>
              <div className="mission-note">
                <MessageSquareText aria-hidden="true" />
                <p>我们关心的不是“AI 能代替什么”，而是“人如何借助软件把事情做得更好”。</p>
              </div>
            </div>
          </div>
        </section>

        <section className="company-section values-section">
          <div className="company-container">
            <div className="section-heading section-heading--split">
              <div>
                <p className="section-kicker">OUR VALUES · 我们的产品观</p>
                <h2>每一个产品决定，都回到三个原点。</h2>
              </div>
              <p>关心真实需求，保持清晰逻辑，并为长期品质投入耐心。</p>
            </div>

            <div className="values-list">
              {values.map(({ index, icon: Icon, english, title, text }) => (
                <article key={index}>
                  <div className="values-list__index"><span>{index}</span><Icon aria-hidden="true" /></div>
                  <p className="values-list__english">{english}</p>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="company-section stewardship-section">
          <div className="company-container stewardship-section__layout">
            <div className="stewardship-section__copy">
              <p className="section-kicker section-kicker--light">PRODUCT STEWARDSHIP</p>
              <h2>卡布奇娜是我们对这些想法的第一个长期回答。</h2>
              <p>从学术材料读取，到提纲确认与可编辑文件交付，卡布奇娜围绕学生和研究场景中的真实工作流持续迭代。公司将负责它的设计、开发、发布与长期维护。</p>
              <ul>
                <li><CheckCircle2 aria-hidden="true" />一致的产品规划与持续迭代</li>
                <li><ShieldCheck aria-hidden="true" />明确的维护主体与安全责任</li>
                <li><Github aria-hidden="true" />保留开源协作与公开透明</li>
              </ul>
              <a href={links.github} target="_blank" rel="noreferrer" className="text-link text-link--light">
                访问卡布奇娜 GitHub <ArrowRight aria-hidden="true" />
              </a>
            </div>

            <div className="stewardship-screen">
              <div className="stewardship-screen__brand">
                <img src="/kabuqina_logo_128.png" alt="" />
                <span>卡布奇娜<small>KABUQINA</small></span>
              </div>
              <img src="/app-screenshot.png" alt="卡布奇娜桌面应用主界面" />
            </div>
          </div>
        </section>

        <section className="company-section company-info-section">
          <div className="company-container company-info-section__layout">
            <div>
              <p className="section-kicker">COMPANY INFORMATION</p>
              <h2>公司信息</h2>
              <p>如果你对产品有建议、希望参与开源协作，或者想与我们讨论其他事项，欢迎来信。</p>
              <a className="button button--primary" href={`mailto:${company.email}`}><Mail aria-hidden="true" />联系我们</a>
            </div>
            <dl className="company-facts">
              {companyFacts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.email ? <a href={`mailto:${fact.value}`}>{fact.value}</a> : fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

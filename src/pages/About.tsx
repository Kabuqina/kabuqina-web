import { useEffect, useState } from 'react'
import { ArrowRight, Check, Github, Mail } from 'lucide-react'

import AboutNavbar from '../components/AboutNavbar'
import AboutFooter from '../sections/AboutFooter'
import { company, links } from '../lib/site'
import type { SiteLocale } from '../lib/locale'

const pageCopy = {
  zh: {
    metaTitle: '关于爱与逻辑 —— 深圳市爱与逻辑软件有限责任公司',
    metaDescription: '了解深圳市爱与逻辑软件有限责任公司的使命、产品观，以及我们如何开发并长期维护卡布奇娜。',
    heroTitleStart: '用爱理解人，',
    heroTitleMiddle: '用逻辑做好',
    heroTitleEmphasis: '软件。',
    heroLead: `${company.nameZh}是卡布奇娜的开发与长期维护团队。我们面向真实而复杂的信息工作，设计清晰、可靠、能够长期使用的智能软件。`,
    primaryAction: '认识卡布奇娜',
    secondaryAction: '与我们联系',
    ledger: [
      { label: 'HEADQUARTERS', value: '深圳 · 中国' },
      { label: 'FOCUS', value: '智能生产力软件' },
      { label: 'FIRST PRODUCT', value: '卡布奇娜 Kabuqina' },
    ],
    thesisIndex: '为什么做软件',
    thesisTitle: ['技术可以走得很快，', '产品必须想得更长远。'],
    thesisBody: [
      '新的技术不断降低“做出一个功能”的门槛，但真正有用的软件，仍然需要理解工作本身：信息从哪里来，人如何判断，结果最终要交付给谁。',
      '我们相信，软件不该让人陷入更多选择和操作。它应该承担重复与复杂，把重要的判断权留给人，并让每一步都足够清楚。',
    ],
    quote: ['我们不从“AI 可以替代什么”开始，', '而从“人怎样把事情做得更好”开始。'],
    principlesIndex: '我们的产品原则',
    principlesTitle: ['每一次产品决定，', '都回到三个原点。'],
    principles: [
      {
        index: '01',
        english: 'CARE BEFORE FEATURES',
        title: '先理解人的真实处境',
        text: '需求不是一张功能清单。我们先理解使用者在什么情境里工作、哪里感到吃力，再决定软件应该做什么，以及不该做什么。',
      },
      {
        index: '02',
        english: 'CLARITY IN COMPLEXITY',
        title: '把复杂组织得清楚',
        text: '智能不等于不可解释。清晰的边界、可检查的过程与可继续编辑的结果，是我们判断一个产品是否可靠的基本标准。',
      },
      {
        index: '03',
        english: 'CRAFT FOR THE LONG TERM',
        title: '为产品的长期生命负责',
        text: '发布不是终点。性能、安全、维护与细节会在长期使用里累积成信任，我们愿意为这些不显眼的工作持续投入。',
      },
    ],
    productIndex: '产品与长期责任',
    productEyebrow: 'OUR FIRST PRODUCT · KABUQINA',
    productTitle: '理念，要经得起一个真实产品的检验。',
    productLead: '卡布奇娜是我们的旗舰产品，也是爱与逻辑对智能生产力软件的第一个长期回答。公司负责它的设计、开发、发布与持续维护。',
    stewardship: [
      '持续、可预期的产品迭代',
      '明确的维护主体与安全责任',
      '尊重人的判断与工作方法',
      '保留开放、透明的协作方式',
    ],
    productLink: '了解产品',
    screenshotAlt: '卡布奇娜桌面应用界面',
    productName: '卡布奇娜',
    productCaption: '把复杂的信息工作，变成清晰、可确认的过程。',
    companyIndex: '公司信息',
    companyTitle: '在深圳，做面向长期的软件。',
    companyLead: '如果你对卡布奇娜有建议、希望参与开源协作，或想与我们讨论产品与合作，欢迎来信。',
    facts: [
      { label: '公司名称', value: company.nameZh },
      { label: 'English name', value: company.nameEn },
      { label: '所在地', value: '中国 · 深圳' },
      { label: '业务方向', value: '智能生产力软件的设计、开发与长期维护' },
      { label: '旗舰产品', value: '卡布奇娜 Kabuqina' },
    ],
    conversation: '有件事想和我们聊聊？',
    emailUs: '联系我们',
  },
  en: {
    metaTitle: `About ${company.shortNameEn}`,
    metaDescription: `Learn about ${company.nameEn}, our product principles, and our long-term stewardship of Kabuqina.`,
    heroTitleStart: 'Care guides why.',
    heroTitleMiddle: 'Logic shapes ',
    heroTitleEmphasis: 'how.',
    heroLead: `${company.nameEn} is the team that designs, develops and maintains Kabuqina. We build clear, dependable intelligent software for real and complex information work.`,
    primaryAction: 'Meet Kabuqina',
    secondaryAction: 'Contact us',
    ledger: [
      { label: 'HEADQUARTERS', value: 'Shenzhen, China' },
      { label: 'FOCUS', value: 'Intelligent productivity software' },
      { label: 'FIRST PRODUCT', value: 'Kabuqina' },
    ],
    thesisIndex: 'Why we build software',
    thesisTitle: ['Technology can move fast.', 'Products need a longer horizon.'],
    thesisBody: [
      'New technology keeps lowering the barrier to shipping a feature. Useful software still begins with understanding the work itself: where information comes from, how people make judgments, and who needs the final deliverable.',
      'We believe software should not create more choices and more steps. It should carry the repetitive and complex parts, keep consequential decisions in human hands, and make every step clear.',
    ],
    quote: ['We do not begin with what AI can replace.', 'We begin with how people can do better work.'],
    principlesIndex: 'Our product principles',
    principlesTitle: ['Every product decision', 'returns to three foundations.'],
    principles: [
      {
        index: '01',
        english: 'CARE BEFORE FEATURES',
        title: 'Start with the human situation',
        text: 'A need is not a feature list. We first understand the setting, the pressure and the point of friction—then decide what the software should do, and what it should leave alone.',
      },
      {
        index: '02',
        english: 'CLARITY IN COMPLEXITY',
        title: 'Make complexity legible',
        text: 'Intelligence should not mean opacity. Clear boundaries, inspectable steps and editable outcomes are basic requirements for software people can trust.',
      },
      {
        index: '03',
        english: 'CRAFT FOR THE LONG TERM',
        title: 'Take responsibility for the long term',
        text: 'A release is not the finish line. Performance, security, maintenance and detail accumulate into trust through years of use—and deserve sustained attention.',
      },
    ],
    productIndex: 'Product stewardship',
    productEyebrow: 'OUR FIRST PRODUCT · KABUQINA',
    productTitle: 'Principles need to survive contact with a real product.',
    productLead: `Kabuqina is our flagship product and ${company.shortNameEn}’s first long-term answer to intelligent productivity software. We are responsible for its design, development, release and continued maintenance.`,
    stewardship: [
      'Continuous, predictable product development',
      'Clear ownership of maintenance and security',
      'Respect for human judgment and working methods',
      'Open and transparent ways to collaborate',
    ],
    productLink: 'Explore Kabuqina',
    screenshotAlt: 'Kabuqina desktop application interface',
    productName: 'Kabuqina',
    productCaption: 'Turning complex information work into a clear, confirmable process.',
    companyIndex: 'Company information',
    companyTitle: 'Building in Shenzhen, for the long term.',
    companyLead: 'If you have feedback about Kabuqina, want to contribute to the open-source project, or would like to discuss our work, we would be glad to hear from you.',
    facts: [
      { label: 'Registered name', value: company.nameEn },
      { label: 'Chinese name', value: company.nameZh },
      { label: 'Location', value: 'Shenzhen, China' },
      { label: 'Focus', value: 'Design, development and long-term maintenance of intelligent productivity software' },
      { label: 'Flagship product', value: 'Kabuqina' },
    ],
    conversation: 'Have something in mind?',
    emailUs: 'Email us',
  },
} as const

function getInitialLocale(): SiteLocale {
  return new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'zh'
}

export default function About() {
  const [locale, setLocale] = useState<SiteLocale>(getInitialLocale)
  const copy = pageCopy[locale]

  useEffect(() => {
    const isEnglish = locale === 'en'
    const url = new URL(window.location.href)
    if (isEnglish) url.searchParams.set('lang', 'en')
    else url.searchParams.delete('lang')
    window.history.replaceState(null, '', url)

    document.documentElement.lang = isEnglish ? 'en' : 'zh-CN'
    document.title = copy.metaTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', copy.metaDescription)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', copy.metaTitle)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', copy.metaDescription)
  }, [copy.metaDescription, copy.metaTitle, locale])

  return (
    <div className="company-site about-page-v2" data-locale={locale}>
      <AboutNavbar page="about" locale={locale} onLocaleChange={setLocale} />

      <main>
        <section className="about2-hero" aria-labelledby="about-heading">
          <div className="about2-hero__inner company-container">
            <div className="about2-hero__copy">
              <p className="about2-label"><span>ABOUT</span><strong>{company.shortNameEn}</strong></p>
              <h1 id="about-heading">{copy.heroTitleStart}<br />{copy.heroTitleMiddle}<em>{copy.heroTitleEmphasis}</em></h1>
              <p className="about2-hero__lead">{copy.heroLead}</p>
              <div className="about2-hero__actions">
                <a className="about2-button about2-button--solid" href="./index.html">
                  {copy.primaryAction} <ArrowRight aria-hidden="true" />
                </a>
                <a className="about2-button about2-button--text" href={`mailto:${company.email}`}>{copy.secondaryAction}</a>
              </div>
            </div>

            <div className="about2-poster-wrap" aria-hidden="true">
              <div className="about2-poster-shadow" />
              <div className="about2-poster">
                <img
                  className="about2-poster__art"
                  src="/about-care-logic-convergence.png"
                  alt=""
                  width={1136}
                  height={1392}
                  decoding="async"
                />
              </div>
            </div>
          </div>

          <div className="about2-hero__ledger">
            <div className="company-container">
              {copy.ledger.map((item) => <div key={item.label}><small>{item.label}</small><span>{item.value}</span></div>)}
            </div>
          </div>
        </section>

        <section className="about2-thesis" aria-labelledby="thesis-heading">
          <div className="company-container about2-thesis__layout">
            <div className="about2-section-index"><span>01</span><p>WHY WE EXIST<br />{copy.thesisIndex}</p></div>
            <div className="about2-thesis__content">
              <h2 id="thesis-heading">{copy.thesisTitle[0]}<br />{copy.thesisTitle[1]}</h2>
              <div className="about2-thesis__body">{copy.thesisBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
              <blockquote><span>“</span><p>{copy.quote[0]}<br />{copy.quote[1]}</p></blockquote>
            </div>
          </div>
        </section>

        <section className="about2-principles" aria-labelledby="principles-heading">
          <div className="company-container">
            <div className="about2-section-head">
              <div className="about2-section-index"><span>02</span><p>HOW WE BUILD<br />{copy.principlesIndex}</p></div>
              <h2 id="principles-heading">{copy.principlesTitle[0]}<br />{copy.principlesTitle[1]}</h2>
            </div>
            <div className="about2-principles__list">
              {copy.principles.map((principle) => (
                <article key={principle.index}>
                  <span className="about2-principle__number">{principle.index}</span>
                  <p className="about2-principle__english">{principle.english}</p>
                  <h3>{principle.title}</h3>
                  <p className="about2-principle__text">{principle.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about2-product" aria-labelledby="product-heading">
          <div className="company-container about2-product__layout">
            <div className="about2-product__copy">
              <div className="about2-section-index about2-section-index--light"><span>03</span><p>PRODUCT STEWARDSHIP<br />{copy.productIndex}</p></div>
              <p className="about2-product__eyebrow">{copy.productEyebrow}</p>
              <h2 id="product-heading">{copy.productTitle}</h2>
              <p className="about2-product__lead">{copy.productLead}</p>
              <ul>{copy.stewardship.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
              <div className="about2-product__links">
                <a href="./index.html">{copy.productLink} <ArrowRight aria-hidden="true" /></a>
                <a href={links.github} target="_blank" rel="noreferrer"><Github aria-hidden="true" />GitHub</a>
              </div>
            </div>

            <figure className="about2-product__screen">
              <div className="about2-product__chrome"><div><i /><i /><i /></div><span>KABUQINA / DESKTOP</span><span>01</span></div>
              <div className="about2-product__image">
                <img src="/app-screenshot.png" alt={copy.screenshotAlt} width={1375} height={956} loading="lazy" decoding="async" />
              </div>
              <figcaption>
                <img src="/kabuqina_logo_48.png" alt="" />
                <div><strong>{copy.productName}</strong><span>{copy.productCaption}</span></div>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="about2-company" aria-labelledby="company-heading">
          <div className="company-container">
            <div className="about2-company__intro">
              <div className="about2-section-index"><span>04</span><p>COMPANY<br />{copy.companyIndex}</p></div>
              <div><h2 id="company-heading">{copy.companyTitle}</h2><p>{copy.companyLead}</p></div>
            </div>
            <div className="about2-company__details">
              <dl>
                {copy.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
              </dl>
              <aside>
                <p>START A CONVERSATION</p>
                <h3>{copy.conversation}</h3>
                <a href={`mailto:${company.email}`}>
                  <Mail aria-hidden="true" />
                  <span><small>{copy.emailUs}</small>{company.email}</span>
                  <ArrowRight aria-hidden="true" />
                </a>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <AboutFooter locale={locale} />
    </div>
  )
}

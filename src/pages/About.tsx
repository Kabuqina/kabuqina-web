import { useEffect, useState } from 'react'
import { ArrowRight, Check, Github, Mail } from 'lucide-react'

import AboutNavbar from '../components/AboutNavbar'
import HeroGlassObjects from '../components/HeroGlassObjects'
import AboutFooter from '../sections/AboutFooter'
import { company, links } from '../lib/site'
import { getInitialLocale } from '../lib/locale'
import type { SiteLocale } from '../lib/locale'

/* ----- Whole-heading gradients: each character gets the interpolated color
   at its position along the full sentence, so the gradient runs across the
   whole line instead of repeating inside every single character. ----- */
type GradientStop = readonly [percent: number, color: string]
type GradientMap = Record<string, readonly GradientStop[]>

const HEADING_GRADIENTS: GradientMap = {
  'about-heading': [
    [0, '#2d1040'],
    [34, '#5c1e78'],
    [58, '#97399b'],
    [78, '#cd8a2d'],
    [100, '#e2a63a'],
  ],
  'thesis-heading': [
    [0, '#3c2a4c'],
    [62, '#5f3d5c'],
    [100, '#b5812e'],
  ],
  'principles-heading': [
    [0, '#3c2a4c'],
    [62, '#5f3d5c'],
    [100, '#b5812e'],
  ],
  'company-heading': [
    [0, '#3c2a4c'],
    [62, '#5f3d5c'],
    [100, '#b5812e'],
  ],
  'product-heading': [
    [0, '#f7edfc'],
    [64, '#d9aee3'],
    [100, '#f2c76a'],
  ],
}

function hexToRgb(hex: string): [number, number, number] {
  const value = parseInt(hex.replace('#', ''), 16)
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

function lerpGradient(stops: readonly GradientStop[], t: number): string {
  const clamped = Math.min(1, Math.max(0, t)) * 100
  let i = 0
  while (i < stops.length - 2 && clamped > stops[i + 1][0]) i++
  const [p0, c0] = stops[i]
  const [p1, c1] = stops[i + 1]
  const local = p1 === p0 ? 0 : (clamped - p0) / (p1 - p0)
  const a = hexToRgb(c0)
  const b = hexToRgb(c1)
  const r = Math.round(a[0] + (b[0] - a[0]) * local)
  const g = Math.round(a[1] + (b[1] - a[1]) * local)
  const bl = Math.round(a[2] + (b[2] - a[2]) * local)
  return `rgb(${r}, ${g}, ${bl})`
}


const pageCopy = {
  zh: {
    metaTitle: '关于爱与逻辑 —— 深圳市爱与逻辑软件有限责任公司',
    metaDescription: '了解深圳市爱与逻辑软件有限责任公司的使命、产品观，以及我们如何开发并长期维护卡布奇娜。',
    heroTitleStart: '用爱理解人，',
    heroTitleMiddle: '用逻辑做好',
    heroTitleEmphasis: '软件。',
    heroLead: `${company.nameZh}是卡布奇娜的开发与长期维护团队。我们面向真实而复杂的信息工作，设计清晰、可靠、能够长期使用的智能软件。`,
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

  // Big headings: reveal characters one by one when scrolled into view.
  useEffect(() => {
    const root = document.querySelector('.about-page-v2') as HTMLElement | null
    if (!root) return

    const splitText = (el: HTMLElement) => {
      if (el.dataset.revealDone === '1') return
      el.dataset.revealDone = '1'
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
      const textNodes: Text[] = []
      while (walker.nextNode()) {
        const node = walker.currentNode as Text
        if (node.nodeValue && node.nodeValue.trim().length > 0) textNodes.push(node)
      }
      const total = textNodes.reduce((n, node) => n + (node.nodeValue ?? '').length, 0)
      let globalIndex = 0
      textNodes.forEach((node) => {
        const inHeroEm = el.id === 'about-heading' && Boolean(node.parentElement?.closest('em'))
        const inPunctuation = Boolean(node.parentElement?.closest('.about2-hero__punctuation'))
        const gradient = inHeroEm || el.id !== 'about-heading' ? HEADING_GRADIENTS[el.id] : undefined
        const frag = document.createDocumentFragment()
        Array.from(node.nodeValue ?? '').forEach((ch, localIndex) => {
          const span = document.createElement('span')
          span.className = 'rv-char'
          span.textContent = ch
          span.style.setProperty('--rv-i', String(globalIndex))
          if (inPunctuation) {
            span.style.color = 'var(--about-ink)'
          } else if (gradient) {
            const gradientLength = inHeroEm ? (node.nodeValue?.length ?? 1) : total
            const gradientIndex = inHeroEm ? localIndex : globalIndex
            const t = gradientLength <= 1 ? 0 : gradientIndex / (gradientLength - 1)
            span.style.color = lerpGradient(gradient, t)
          }
          frag.appendChild(span)
          globalIndex++
        })
        node.parentNode?.replaceChild(frag, node)
      })
    }

    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement
          // Characters fade out when the heading scrolls out of view and
          // replay the float-up reveal every time it comes back in.
          el.classList.toggle('is-revealed', entry.isIntersecting)
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -36px 0px' },
    )
    els.forEach((el) => {
      splitText(el)
      io.observe(el)
    })
    return () => io.disconnect()
  }, [locale])

  return (
    <div key={locale} className="company-site about-page-v2" data-locale={locale}>
      <AboutNavbar page="about" locale={locale} onLocaleChange={setLocale} />

      <main>
        <section className="about2-hero" aria-labelledby="about-heading">
          <div className="about2-hero__ribbons" aria-hidden="true">
            <span className="about2-ribbon about2-ribbon--one" />
            <span className="about2-ribbon about2-ribbon--two" />
            <span className="about2-ribbon about2-ribbon--three" />
            <span className="about2-ribbon about2-ribbon--four" />
          </div>

          <div className="about2-hero__inner company-container">
            <div className="about2-hero__copy">
              <p className="about2-label"><span>ABOUT</span><strong>{company.shortNameEn}</strong></p>
              <h1 id="about-heading">
                {copy.heroTitleStart}<br />{copy.heroTitleMiddle}<span className="about2-hero__gradient-text">{copy.heroTitleEmphasis.slice(0, -1)}</span><span className="about2-hero__punctuation">{copy.heroTitleEmphasis.slice(-1)}</span>
              </h1>
              <p className="about2-hero__lead">{copy.heroLead}</p>
            </div>

            <HeroGlassObjects />
          </div>

          <span className="about2-float-heart about2-float-heart--gold" style={{ top: '22%', right: '6%', fontSize: 23, animationDelay: '-0.8s' }} aria-hidden="true">♥</span>
          <span className="about2-float-heart about2-float-heart--plum" style={{ top: '68%', left: '3%', fontSize: 15, animationDelay: '-3.2s' }} aria-hidden="true">♥</span>
          <span className="about2-orb about2-orb--plum" style={{ top: '38%', left: '12%', ['--orb-size' as string]: '26px', animationDelay: '-1.1s' }} aria-hidden="true" />
          <span className="about2-orb about2-orb--gold" style={{ top: '58%', right: '14%', ['--orb-size' as string]: '18px', animationDelay: '-2.6s' }} aria-hidden="true" />
          <span className="about2-orb about2-orb--plum" style={{ top: '14%', left: '5%', ['--orb-size' as string]: '16px', animationDelay: '-0.4s' }} aria-hidden="true" />
          <span className="about2-orb about2-orb--gold" style={{ top: '76%', left: '4%', ['--orb-size' as string]: '21px', animationDelay: '-5.9s' }} aria-hidden="true" />
          <span className="about2-orb about2-orb--plum" style={{ top: '62%', left: '2%', ['--orb-size' as string]: '14px', animationDelay: '-2.9s' }} aria-hidden="true" />

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
              <h2 id="thesis-heading" data-reveal>{copy.thesisTitle[0]}<br />{copy.thesisTitle[1]}</h2>
              <div className="about2-thesis__body">{copy.thesisBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
              <blockquote><span>“</span><p>{copy.quote[0]}<br />{copy.quote[1]}</p></blockquote>
            </div>
          </div>
          <span className="about2-float-heart about2-float-heart--plum" style={{ top: '13%', right: '7%', fontSize: 17, animationDelay: '-1.6s' }} aria-hidden="true">♥</span>
          <span className="about2-orb about2-orb--gold" style={{ top: '30%', right: '16%', ['--orb-size' as string]: '14px', animationDelay: '-4.4s' }} aria-hidden="true" />
          <span className="about2-orb about2-orb--plum" style={{ top: '62%', right: '30%', ['--orb-size' as string]: '18px', animationDelay: '-0.9s' }} aria-hidden="true" />
          <span className="about2-orb about2-orb--gold" style={{ top: '80%', left: '5%', ['--orb-size' as string]: '15px', animationDelay: '-6.3s' }} aria-hidden="true" />
        </section>

        <section className="about2-principles" aria-labelledby="principles-heading">
          <div className="company-container">
            <div className="about2-section-head">
              <div className="about2-section-index"><span>02</span><p>HOW WE BUILD<br />{copy.principlesIndex}</p></div>
              <h2 id="principles-heading" data-reveal>{copy.principlesTitle[0]}<br />{copy.principlesTitle[1]}</h2>
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
          <span className="about2-float-heart about2-float-heart--gold" style={{ top: '38%', left: '2%', fontSize: 14, animationDelay: '-4.1s' }} aria-hidden="true">♥</span>
          <span className="about2-orb about2-orb--plum" style={{ top: '18%', left: '22%', ['--orb-size' as string]: '22px', animationDelay: '-3.3s' }} aria-hidden="true" />
          <span className="about2-orb about2-orb--gold" style={{ top: '64%', right: '4%', ['--orb-size' as string]: '19px', animationDelay: '-2.2s' }} aria-hidden="true" />
          <span className="about2-orb about2-orb--plum" style={{ top: '82%', left: '6%', ['--orb-size' as string]: '15px', animationDelay: '-5.1s' }} aria-hidden="true" />
        </section>

        <section className="about2-product" aria-labelledby="product-heading">
          <div className="company-container about2-product__layout">
            <div className="about2-product__copy">
              <div className="about2-section-index about2-section-index--light"><span>03</span><p>PRODUCT STEWARDSHIP<br />{copy.productIndex}</p></div>
              <p className="about2-product__eyebrow">{copy.productEyebrow}</p>
              <h2 id="product-heading" data-reveal>
                {locale === 'zh' ? <>理念<br />要经得起一个真实产品的检验</> : copy.productTitle}
              </h2>
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
                <img src="/about-product.png" alt={copy.screenshotAlt} width={1169} height={850} loading="lazy" decoding="async" />
              </div>
              <figcaption>
                <img src="/kabuqina_logo_48.png" alt="" />
                <div><strong>{copy.productName}</strong><span>{copy.productCaption}</span></div>
              </figcaption>
            </figure>
          </div>
          <span className="about2-orb about2-orb--plum about2-orb--bright" style={{ top: '22%', right: '6%', ['--orb-size' as string]: '28px', animationDelay: '-2.1s' }} aria-hidden="true" />
          <span className="about2-orb about2-orb--gold about2-orb--bright" style={{ top: '60%', left: '48%', ['--orb-size' as string]: '16px', animationDelay: '-5.4s' }} aria-hidden="true" />
          <span className="about2-orb about2-orb--gold about2-orb--bright" style={{ top: '12%', left: '8%', ['--orb-size' as string]: '22px', animationDelay: '-3.7s' }} aria-hidden="true" />
          <span className="about2-orb about2-orb--plum about2-orb--bright" style={{ top: '76%', right: '14%', ['--orb-size' as string]: '17px', animationDelay: '-0.6s' }} aria-hidden="true" />
        </section>

        <section className="about2-company" aria-labelledby="company-heading">
          <div className="company-container">
            <div className="about2-company__intro">
              <div className="about2-section-index"><span>04</span><p>COMPANY<br />{copy.companyIndex}</p></div>
              <div><h2 id="company-heading" data-reveal>{copy.companyTitle}</h2><p>{copy.companyLead}</p></div>
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
          <span className="about2-float-heart about2-float-heart--gold" style={{ top: '20%', right: '4%', fontSize: 20, animationDelay: '-5.2s' }} aria-hidden="true">♥</span>
          <span className="about2-orb about2-orb--gold" style={{ top: '64%', left: '6%', ['--orb-size' as string]: '16px', animationDelay: '-1.9s' }} aria-hidden="true" />
          <span className="about2-orb about2-orb--plum" style={{ top: '16%', right: '24%', ['--orb-size' as string]: '15px', animationDelay: '-4.7s' }} aria-hidden="true" />
          <span className="about2-orb about2-orb--gold" style={{ top: '84%', left: '3%', ['--orb-size' as string]: '24px', animationDelay: '-1.5s' }} aria-hidden="true" />
        </section>
      </main>

      <AboutFooter locale={locale} />
    </div>
  )
}

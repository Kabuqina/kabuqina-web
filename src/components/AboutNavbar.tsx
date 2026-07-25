import { useEffect, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { company, links } from '../lib/site'
import type { SiteLocale } from '../lib/locale'

type NavbarProps = {
  page?: 'home' | 'about'
  locale?: SiteLocale
  onLocaleChange?: (locale: SiteLocale) => void
}

export default function AboutNavbar({ page = 'home', locale = 'zh', onLocaleChange }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const isEnglish = locale === 'en'
  const homePrefix = page === 'about' ? './index.html' : ''
  const aboutHref = isEnglish ? './about.html?lang=en' : './about.html'

  const navLinks = page === 'home'
    ? [
        { label: '产品', href: '#product' },
        { label: '工作流', href: '#workflow' },
        { label: '能力', href: '#capabilities' },
        { label: '开源与安全', href: '#trust' },
        { label: '关于公司', href: aboutHref, current: false },
      ]
    : isEnglish
      ? [
          { label: 'Kabuqina', href: homePrefix },
          { label: 'Capabilities', href: `${homePrefix}#capabilities` },
          { label: 'Scenarios', href: `${homePrefix}#scenarios` },
          { label: 'Download', href: `${homePrefix}#download` },
          { label: 'About', href: aboutHref, current: true },
        ]
      : [
          { label: '卡布奇娜', href: homePrefix },
          { label: '能力', href: `${homePrefix}#capabilities` },
          { label: '场景', href: `${homePrefix}#scenarios` },
          { label: '下载', href: `${homePrefix}#download` },
          { label: '关于我们', href: aboutHref, current: true },
        ]

  useEffect(() => {
    if (!mobileOpen) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [mobileOpen])

  const languageSwitch = onLocaleChange && (
    <div className="language-switch" aria-label={isEnglish ? 'Language' : '语言'}>
      <button type="button" aria-pressed={!isEnglish} onClick={() => onLocaleChange('zh')}>中文</button>
      <span aria-hidden="true">/</span>
      <button type="button" aria-pressed={isEnglish} onClick={() => onLocaleChange('en')}>EN</button>
    </div>
  )

  return (
    <header className="site-header">
      <div className="company-container site-header__inner">
        {page === 'home' ? (
          <a className="product-wordmark" href="./index.html" aria-label="卡布奇娜首页">
            <img src="/kabuqina_logo_48.png" alt="" />
            <span><strong>卡布奇娜</strong><small>KABUQINA</small></span>
          </a>
        ) : (
          <a className="company-wordmark" href="./index.html" aria-label={isEnglish ? 'Ai & Logic home' : '爱与逻辑首页'}>
            <span className="company-wordmark__mark" aria-hidden="true">A<span>&amp;</span>L</span>
            <span className="company-wordmark__text">
              <strong>爱与逻辑</strong>
              <small>{company.shortNameEn}</small>
            </span>
          </a>
        )}

        <nav className="desktop-nav" aria-label={isEnglish ? 'Main navigation' : '主导航'}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} aria-current={link.current ? 'page' : undefined}>{link.label}</a>
          ))}
        </nav>

        {onLocaleChange && <div className="header-language-switch">{languageSwitch}</div>}

        <a className="header-download" href={links.download} target="_blank" rel="noreferrer">
          <Download aria-hidden="true" />
          {isEnglish ? 'Download' : '下载产品'}
        </a>

        <button
          className="mobile-menu-button"
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? (isEnglish ? 'Close navigation' : '关闭导航') : (isEnglish ? 'Open navigation' : '打开导航')}
        >
          {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="mobile-menu">
          <nav aria-label={isEnglish ? 'Mobile navigation' : '移动端导航'}>
            {onLocaleChange && <div className="mobile-language-switch">{languageSwitch}</div>}
            {navLinks.map((link, index) => (
              <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} aria-current={link.current ? 'page' : undefined}>
                <span>0{index + 1}</span>{link.label}
              </a>
            ))}
            <a className="mobile-menu__download" href={links.download} target="_blank" rel="noreferrer">
              <Download aria-hidden="true" /> {isEnglish ? 'Download Kabuqina' : '下载卡布奇娜'}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

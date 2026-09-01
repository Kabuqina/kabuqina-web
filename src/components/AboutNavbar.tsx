import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { withLocale } from '../lib/locale'
import type { SiteLocale } from '../lib/locale'

type NavbarProps = {
  page?: 'home' | 'product'
  locale?: SiteLocale
  onLocaleChange?: (locale: SiteLocale) => void
}

export default function AboutNavbar({ page = 'home', locale = 'zh', onLocaleChange }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isEnglish = locale === 'en'
  const homeHref = './index.html'
  const productHref = './product.html'

  const navLinks = isEnglish
      ? [
          { label: 'Home', href: withLocale(homeHref, 'en'), current: page === 'home' },
          { label: 'Kabuqina', href: withLocale(productHref, 'en'), current: page === 'product' },
        ]
      : [
          { label: '首页', href: homeHref, current: page === 'home' },
          { label: '卡布奇娜', href: productHref, current: page === 'product' },
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const changeLocale = (nextLocale: SiteLocale) => {
    const url = new URL(window.location.href)
    if (nextLocale === 'en') url.searchParams.set('lang', 'en')
    else url.searchParams.delete('lang')
    window.history.replaceState(null, '', url)
    if (onLocaleChange) onLocaleChange(nextLocale)
    else window.location.href = withLocale(window.location.pathname.split('/').pop() || './index.html', nextLocale)
  }

  const languageSwitch = (
    <div className="language-switch" aria-label={isEnglish ? 'Language' : '语言'}>
      <button type="button" aria-pressed={!isEnglish} onClick={() => changeLocale('zh')}>中文</button>
      <button type="button" aria-pressed={isEnglish} onClick={() => changeLocale('en')}>EN</button>
    </div>
  )

  // Same-page anchor links scroll smoothly instead of jumping.
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return
    event.preventDefault()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="company-container site-header__inner">
        <a className="company-wordmark" href="./index.html" aria-label={isEnglish ? 'Ai & Logic home' : '爱与逻辑首页'}>
          <img src="/ai-logic-logo.png" alt="Ai logic" className="company-wordmark__logo" />
        </a>
        <nav className="desktop-nav" aria-label={isEnglish ? 'Main navigation' : '主导航'}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={link.current ? 'page' : undefined}
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-language-switch">{languageSwitch}</div>

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
            <div className="mobile-language-switch">{languageSwitch}</div>
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                aria-current={link.current ? 'page' : undefined}
              >
                <span>0{index + 1}</span>{link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

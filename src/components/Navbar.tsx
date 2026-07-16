import { useEffect, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { links } from '../lib/site'

type NavbarProps = {
  page?: 'home' | 'about'
}

export default function Navbar({ page = 'home' }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const homePrefix = page === 'about' ? './index.html' : ''

  const navLinks = page === 'home'
    ? [
        { label: '产品', href: '#product' },
        { label: '工作流', href: '#workflow' },
        { label: '能力', href: '#capabilities' },
        { label: '开源与安全', href: '#trust' },
        { label: '关于公司', href: './about.html', current: false },
      ]
    : [
        { label: '旗舰产品', href: `${homePrefix}#product` },
        { label: '工作流', href: `${homePrefix}#workflow` },
        { label: '开源与安全', href: `${homePrefix}#trust` },
        { label: '关于我们', href: './about.html', current: true },
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

  return (
    <header className="site-header">
      <div className="company-container site-header__inner">
        {page === 'home' ? (
          <a className="product-wordmark" href="./index.html" aria-label="卡布奇娜首页">
            <img src="/kabuqina_logo_48.png" alt="" />
            <span><strong>卡布奇娜</strong><small>KABUQINA</small></span>
          </a>
        ) : (
          <a className="company-wordmark" href="./index.html" aria-label="爱与逻辑首页">
            <span className="company-wordmark__mark" aria-hidden="true">A<span>&amp;</span>L</span>
            <span className="company-wordmark__text">
              <strong>爱与逻辑</strong>
              <small>AI &amp; LOGIC SOFTWARE</small>
            </span>
          </a>
        )}

        <nav className="desktop-nav" aria-label="主导航">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} aria-current={link.current ? 'page' : undefined}>{link.label}</a>
          ))}
        </nav>

        <a className="header-download" href={links.download} target="_blank" rel="noreferrer">
          <Download aria-hidden="true" />
          下载产品
        </a>

        <button
          className="mobile-menu-button"
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? '关闭导航' : '打开导航'}
        >
          {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="mobile-menu">
          <nav aria-label="移动端导航">
            {navLinks.map((link, index) => (
              <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)}>
                <span>0{index + 1}</span>{link.label}
              </a>
            ))}
            <a className="mobile-menu__download" href={links.download} target="_blank" rel="noreferrer">
              <Download aria-hidden="true" /> 下载卡布奇娜
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

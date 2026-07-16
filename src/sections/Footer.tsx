import { ArrowUpRight, Mail } from 'lucide-react'
import { company, links } from '../lib/site'

type FooterGroup = {
  title: string
  links: Array<{ label: string; href: string; external?: boolean }>
}

const groups: FooterGroup[] = [
  {
    title: '网站',
    links: [
      { label: '首页', href: './index.html' },
      { label: '关于我们', href: './about.html' },
      { label: '联系我们', href: `mailto:${company.email}` },
    ],
  },
  {
    title: '卡布奇娜',
    links: [
      { label: '下载 Windows 版', href: links.download, external: true },
      { label: 'GitHub', href: links.github, external: true },
      { label: '更新日志', href: links.releases, external: true },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="company-footer">
      <div className="company-container">
        <div className="company-footer__main">
          <div className="company-footer__brand">
            <div className="company-wordmark company-wordmark--footer">
              <span className="company-wordmark__mark" aria-hidden="true">A<span>&amp;</span>L</span>
              <span className="company-wordmark__text">
                <strong>爱与逻辑</strong>
                <small>AI &amp; LOGIC SOFTWARE</small>
              </span>
            </div>
            <p>{company.nameZh}</p>
            <p className="company-footer__tagline">设计、开发并长期维护<br />真正有用的智能软件。</p>
            <a href={`mailto:${company.email}`} className="footer-email"><Mail aria-hidden="true" />{company.email}</a>
          </div>

          <div className="company-footer__nav">
            {groups.map((group) => (
              <div key={group.title}>
                <h2>{group.title}</h2>
                {group.links.map((link) => (
                  <a key={link.label} href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined}>
                    {link.label}{link.external && <ArrowUpRight aria-hidden="true" />}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="company-footer__legal">
          <div>
            <p>© 2026 {company.nameEn} All rights reserved.</p>
            <p>Kabuqina 源代码按 Apache License 2.0 开放。</p>
          </div>
          <div className="company-footer__filings">
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">粤 ICP 备 2026062638 号</a>
            <a href="https://beian.mps.gov.cn/#/query/webSearch?code=44030002013225" target="_blank" rel="noreferrer">
              <img src="/备案图标.png" alt="" />粤公网安备 44030002013225 号
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { ArrowUpRight, Mail } from 'lucide-react'
import { company, links } from '../lib/site'
import type { SiteLocale } from '../lib/locale'

type FooterGroup = {
  title: string
  links: Array<{ label: string; href: string; external?: boolean }>
}

type FooterProps = {
  locale?: SiteLocale
}

export default function AboutFooter({ locale = 'zh' }: FooterProps) {
  const isEnglish = locale === 'en'
  const aboutHref = isEnglish ? './about.html?lang=en' : './about.html'
  const groups: FooterGroup[] = isEnglish
    ? [
        {
          title: 'WEBSITE',
          links: [
            { label: 'Home', href: './index.html' },
            { label: 'About us', href: aboutHref },
            { label: 'Contact', href: `mailto:${company.email}` },
          ],
        },
        {
          title: 'KABUQINA',
          links: [
            { label: 'Download for Windows', href: links.download, external: true },
            { label: 'GitHub', href: links.github, external: true },
            { label: 'Release notes', href: links.releases, external: true },
          ],
        },
      ]
    : [
        {
          title: '网站',
          links: [
            { label: '首页', href: './index.html' },
            { label: '关于我们', href: aboutHref },
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

  return (
    <footer className="company-footer">
      <div className="company-container">
        <div className="company-footer__main">
          <div className="company-footer__brand">
            <div className="company-wordmark company-wordmark--footer">
              <img src="/company-logo.png" alt="" className="company-wordmark__logo" />
            </div>
            <p>{isEnglish ? company.nameEn : company.nameZh}</p>
            <p className="company-footer__tagline">
              {isEnglish ? <>Intelligent software, designed<br />and maintained for the long term.</> : <>设计、开发并长期维护<br />真正有用的智能软件。</>}
            </p>
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
            <p>{isEnglish ? 'Kabuqina source code is available under the Apache License 2.0.' : 'Kabuqina 源代码按 Apache License 2.0 开放。'}</p>
            <p>
              <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">粤ICP备2026121865号-1</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

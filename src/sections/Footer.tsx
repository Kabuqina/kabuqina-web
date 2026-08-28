import { ExternalLink } from 'lucide-react';
import type { SiteLocale } from '../lib/locale';
import { company, links } from '../lib/site';

export default function Footer({ locale = 'zh' }: { locale?: SiteLocale }) {
  const isEnglish = locale === 'en';
  const footerLinks = [
    { label: isEnglish ? 'About us' : '关于我们', href: isEnglish ? './about.html?lang=en' : './about.html' },
    { label: isEnglish ? 'Download' : '下载', href: links.download },
    { label: 'GitHub', href: links.github },
  ];

  return (
    <footer className="kq-site-footer w-full" style={{ backgroundColor: '#3D2E4E', borderTop: '1px solid rgba(212, 197, 226, 0.16)' }}>
      <div className="kq-site-footer__inner w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1.65fr_auto] items-center gap-4 md:gap-8">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1">
            <span className="text-base font-semibold text-[#E8DFF0]">
              {isEnglish ? 'Kabuqina' : '卡布奇娜'}
            </span>
            <span className="text-sm text-[#8B7D9A]">
              {isEnglish ? company.nameEn : company.nameZh}
            </span>
          </div>

          <nav aria-label={isEnglish ? 'Footer links' : '页脚链接'} className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-1 text-sm text-[#8B7D9A] hover:text-[#D4C5E2] transition-colors duration-300"
              >
                {link.label}
                {link.href.startsWith('http') && <ExternalLink aria-hidden="true" className="w-3 h-3" />}
              </a>
            ))}
          </nav>

          <p className="text-center md:text-right text-sm text-[#8B7D9A] break-words">
            {isEnglish ? 'Contact: ' : '联系方式：'}<a href="mailto:contact@kabuqina.com" className="text-[#D4C5E2] hover:underline">contact@kabuqina.com</a>
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 mt-3 pt-3 border-t border-[#6B5580]">
          <p className="text-center text-sm text-[#8B7D9A] break-words">
            {isEnglish ? `© 2026 ${company.nameEn}. All rights reserved.` : `© 2026 ${company.nameZh} 版权所有`}
          </p>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#8B7D9A] hover:text-[#D4C5E2] transition-colors duration-300"
          >
            粤ICP备2026121865号-1
          </a>
        </div>
      </div>
    </footer>
  );
}

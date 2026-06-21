import { ExternalLink } from 'lucide-react';

const footerLinks = [
  { label: '文档', href: 'https://github.com/Kabuqina/Kabuqina' },
  { label: 'GitHub', href: 'https://github.com/Kabuqina/Kabuqina' },
  { label: '更新日志', href: 'https://github.com/Kabuqina/Kabuqina/releases' },
  { label: '隐私政策', href: '#' },
];

export default function Footer() {
  return (
    <footer className="w-full py-10 lg:py-12" style={{ backgroundColor: '#3D2E4E' }}>
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="text-base font-semibold text-[#E8DFF0]">
              卡布奇娜
            </span>
            <span className="text-sm text-[#8B7D9A]">
              Kabuqina
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-1 text-sm text-[#8B7D9A] hover:text-[#D4C5E2] transition-colors duration-300"
              >
                {link.label}
                {link.href.startsWith('http') && <ExternalLink className="w-3 h-3" />}
              </a>
            ))}
          </div>

          <p className="text-center text-sm text-[#8B7D9A] break-words">
            © 2026 卡布奇娜开源社区 · Apache License 2.0
          </p>
        </div>
        <div className="flex justify-center mt-6 pt-6 border-t border-[#6B5580]">
          <p className="text-center text-sm text-[#8B7D9A] break-words">
            联系方式：<a href="mailto:lilyreso@163.com" className="text-[#D4C5E2] hover:underline">lilyreso@163.com</a>
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 mt-4 px-2 text-center">
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#8B7D9A] hover:text-[#D4C5E2] transition-colors duration-300 break-all"
          >
            粤ICP备2026062638号
          </a>
          <span className="hidden sm:inline text-sm text-[#8B7D9A]">|</span>
          <img src="/备案图标.png" alt="备案图标" className="h-4 w-auto sm:h-5" />
          <a
            href="https://beian.mps.gov.cn/#/query/webSearch?code=44030002013225"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-[#8B7D9A] hover:text-[#D4C5E2] transition-colors duration-300 break-all"
          >
            粤公网安备44030002013225号
          </a>
        </div>
      </div>
    </footer>
  );
}

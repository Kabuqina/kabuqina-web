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
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold text-[#E8DFF0]">
              卡布奇娜
            </span>
            <span className="text-sm text-[#8B7D9A]">
              Kabuqina
            </span>
          </div>

          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-sm text-[#8B7D9A] hover:text-[#D4C5E2] transition-colors duration-300 flex items-center gap-1"
              >
                {link.label}
                {link.href.startsWith('http') && <ExternalLink className="w-3 h-3" />}
              </a>
            ))}
          </div>

          <p className="text-sm text-[#8B7D9A]">
            © 2026 卡布奇娜开源社区 · MIT License
          </p>
        </div>
        <div className="flex justify-center mt-6 pt-6 border-t border-[#6B5580]">
          <p className="text-sm text-[#8B7D9A]">
            联系方式：<a href="mailto:lilyreso@163.com" className="text-[#D4C5E2] hover:underline">lilyreso@163.com</a>
          </p>
        </div>
        <div className="flex justify-center items-center gap-4 mt-4">
          <img src="/备案图标.png" alt="备案图标" className="h-6 w-auto" />
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#8B7D9A] hover:text-[#D4C5E2] transition-colors duration-300"
          >
            粤ICP备2026062638号
          </a>
          <span className="text-sm text-[#8B7D9A]">|</span>
          <a
            href="https://beian.mps.gov.cn/#/query/webSearch?code=44030002013225"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-[#8B7D9A] hover:text-[#D4C5E2] transition-colors duration-300"
          >
            粤公网安备44030002013225号
          </a>
        </div>
      </div>
    </footer>
  );
}

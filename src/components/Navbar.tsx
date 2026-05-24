import { useState, useEffect } from 'react';
import { Menu, X, Github } from 'lucide-react';

const navLinks = [
  { label: '功能', href: '#features' },
  { label: '场景', href: '#scenarios' },
  { label: '下载', href: '#download' },
  { label: '文档', href: 'https://github.com/Kabuqina/Kabuqina' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'kq-glass-subtle !bg-[rgba(250,248,251,0.85)] shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <img
                src="/kabuqina_logo_48.png"
                alt="卡布奇娜"
                className="w-8 h-8 md:w-9 md:h-9 rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-lg md:text-xl font-bold tracking-tight text-[#49385E]">
                  卡布奇娜
                </span>
                <span className="text-xs md:text-sm font-medium text-[#8B7D9A]">
                  Kabuqina
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-medium text-[#5A4A6A] transition-colors duration-300 hover:text-[#6B5580]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* GitHub CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://github.com/Kabuqina/Kabuqina"
                target="_blank"
                rel="noopener noreferrer"
                className="kq-btn-secondary !px-5 !py-2.5 text-sm"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-[#5A4A6A]"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#49385E]/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-2xl font-medium text-[#E8DFF0] hover:text-[#D4C5E2] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://github.com/Kabuqina/Kabuqina"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 text-lg font-medium bg-[#6B5580] text-white rounded-lg mt-4 hover:bg-[#7B6590] transition-colors"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </div>
      )}
    </>
  );
}

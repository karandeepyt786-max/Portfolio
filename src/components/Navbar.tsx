import { useState, useEffect } from 'react';
import { Menu, X, Globe, User, Mail, Code2 } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-strong shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-glow to-cyan-glow flex items-center justify-center group-hover:shadow-lg group-hover:shadow-violet-glow/30 transition-all duration-300">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="gradient-text">Dev</span>
              <span className="text-foreground">Portfolio</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                {activeSection === link.href.replace('#', '') && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-gradient-to-r from-violet-glow to-cyan-glow rounded-full" />
                )}
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="hidden md:flex items-center gap-3">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-300">
              <Code2 className="w-[18px] h-[18px]" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-300">
              <User className="w-[18px] h-[18px]" />
            </a>
            <a href="mailto:hello@example.com"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-300">
              <Mail className="w-[18px] h-[18px]" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-foreground hover:bg-white/5 transition-all">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="glass-strong border-t border-border/30 px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeSection === link.href.replace('#', '') ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              }`}>
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-3 border-t border-border/30">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"><Code2 className="w-[18px] h-[18px]" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"><User className="w-[18px] h-[18px]" /></a>
            <a href="mailto:hello@example.com" className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"><Mail className="w-[18px] h-[18px]" /></a>
          </div>
        </div>
      </div>
    </nav>
  );
}

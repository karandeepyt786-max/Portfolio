import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Phone, Send, User, Globe } from 'lucide-react';
import { LiquidButton } from './ui/liquid-glass-button';

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@developer.com', href: 'mailto:hello@developer.com' },
  { icon: MapPin, label: 'Location', value: 'India', href: '#' },
  { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
];

const socials = [
  { icon: Globe, label: 'GitHub', href: 'https://github.com' },
  { icon: User, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Globe, label: 'Twitter', href: 'https://twitter.com' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-glow/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-sm font-mono text-primary tracking-widest uppercase">Get In Touch</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-glow to-cyan-glow rounded-full mx-auto" />
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className={`lg:col-span-2 space-y-6 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <p className="text-muted-foreground leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities 
              to be part of your vision. Let's build something amazing together.
            </p>

            <div className="space-y-4">
              {contactInfo.map((item) => (
                <a key={item.label} href={item.href}
                  className="flex items-center gap-4 p-4 glass rounded-xl hover:border-primary/20 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                    <div className="text-sm font-medium">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="pt-4">
              <div className="text-sm text-muted-foreground mb-3">Follow me</div>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 transition-all duration-300">
                    <s.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <form onSubmit={(e) => e.preventDefault()} className="glass rounded-2xl p-6 md:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input id="name" type="text" placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input id="email" type="email" placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                <input id="subject" type="text" placeholder="Project Collaboration"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea id="message" rows={5} placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm resize-none" />
              </div>
              <LiquidButton size="lg" className="w-full sm:w-auto">
                <Send className="w-4 h-4 mr-1" />
                Send Message
              </LiquidButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

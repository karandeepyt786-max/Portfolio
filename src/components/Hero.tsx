import { CursorDrivenParticleTypography } from './ui/cursor-driven-particles-typography';
import { LiquidButton } from './ui/liquid-glass-button';
import { ArrowDown, Download, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-glow/8 rounded-full blur-[120px] pulse-glow" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-glow/8 rounded-full blur-[120px] pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-glow/5 rounded-full blur-[150px]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Status badge */}
        <div className="animate-slide-up opacity-0 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-violet-glow/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-glow opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-glow"></span>
            </span>
            <span className="text-sm text-muted-foreground font-medium">Available for freelance work</span>
          </div>
        </div>

        {/* Particle text hero */}
        <div className="animate-fade-in opacity-0 delay-200 w-full h-[200px] md:h-[280px] mb-2">
          <CursorDrivenParticleTypography
            text="DEVELOPER"
            fontSize={160}
            particleDensity={5}
            dispersionStrength={20}
            color="#a78bfa"
            fontFamily="Inter, sans-serif"
          />
        </div>

        {/* Subtitle */}
        <div className="animate-slide-up opacity-0 delay-300 mb-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Full-Stack <span className="gradient-text">MERN</span> Developer
          </h1>
        </div>

        <p className="animate-slide-up opacity-0 delay-400 text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          I build modern, scalable web applications with{' '}
          <span className="text-foreground font-medium">Mongoose</span>,{' '}
          <span className="text-foreground font-medium">Express</span>,{' '}
          <span className="text-foreground font-medium">React</span> &{' '}
          <span className="text-foreground font-medium">Node.js</span>.
          Turning complex ideas into elegant digital experiences.
        </p>

        {/* CTA Buttons */}
        <div className="animate-slide-up opacity-0 delay-500 flex flex-col sm:flex-row items-center gap-4">
          <a href="#projects">
            <LiquidButton size="xl" className="group">
              <Sparkles className="w-4 h-4 mr-1" />
              View My Work
            </LiquidButton>
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-muted-foreground border border-border hover:border-primary/40 hover:text-foreground hover:bg-white/5 transition-all duration-300">
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-in opacity-0 delay-800 absolute bottom-10 left-1/2 -translate-x-1/2">
          <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300">
            <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}

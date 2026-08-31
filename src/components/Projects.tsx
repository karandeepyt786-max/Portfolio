import { useEffect, useRef, useState } from 'react';
import { ExternalLink, ArrowRight, Code2 } from 'lucide-react';
import { projects } from '../data/projects';

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

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-glow/4 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-sm font-mono text-primary tracking-widest uppercase">Portfolio</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            6+ Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-glow to-cyan-glow rounded-full mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`group glass rounded-2xl overflow-hidden hover:border-primary/20 transition-all duration-500 hover:-translate-y-1 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Live Preview or Screenshot */}
              <div className="relative h-56 overflow-hidden bg-card/50">
                {project.useIframe ? (
                  <div 
                    className="absolute top-0 left-0 w-[400%] h-[400%] origin-top-left pointer-events-none transition-transform duration-700"
                    style={{ transform: 'scale(0.25)' }}
                  >
                    <iframe 
                      src={project.live} 
                      title={project.title} 
                      className="w-full h-full border-0 pointer-events-none" 
                      tabIndex={-1} 
                      loading="lazy" 
                    />
                  </div>
                ) : (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className={`w-full h-full ${project.title === 'Sewing Parts' ? 'object-contain' : 'object-cover'} transition-transform duration-700 group-hover:scale-110`} 
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent z-10" />
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg glass flex items-center justify-center text-foreground hover:text-primary transition-colors">
                      <Code2 className="w-4 h-4" />
                    </a>
                  )}
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg glass flex items-center justify-center text-foreground hover:text-primary transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                {/* Color accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 z-20" style={{ background: project.color }} />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 text-xs font-mono rounded-md bg-white/5 text-muted-foreground border border-border/50">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href={project.live} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all duration-300">
                  View Project <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

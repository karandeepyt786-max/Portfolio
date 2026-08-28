import { useEffect, useRef, useState } from 'react';
import { User, Briefcase, GraduationCap, MapPin } from 'lucide-react';

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.2) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

const stats = [
  { label: 'Years Experience', value: '3+', icon: Briefcase },
  { label: 'Projects Completed', value: '25+', icon: User },
  { label: 'Technologies', value: '15+', icon: GraduationCap },
  { label: 'Based In', value: 'India', icon: MapPin },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-violet-glow/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-sm font-mono text-primary tracking-widest uppercase">About Me</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Passionate <span className="gradient-text">Full-Stack</span> Developer
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-glow to-cyan-glow rounded-full mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image / Visual */}
          <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative">
              <div className="animated-border p-1">
                <div className="relative rounded-xl overflow-hidden aspect-square bg-card">
                  <img
                    src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=600&auto=format&fit=crop&q=80"
                    alt="Developer workspace with code on screen"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="glass rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <code className="text-xs font-mono text-emerald-glow">
                        const passion = () =&gt; buildAmazingApps();
                      </code>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-violet-glow to-cyan-glow rounded-2xl blur-[2px] opacity-20 animate-float" />
            </div>
          </div>

          {/* Right: Text content */}
          <div className={`transition-all duration-700 delay-400 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              I'm a Full-Stack MERN developer who thrives on crafting beautiful, 
              performant web applications. With a deep passion for clean code and 
              intuitive design, I bridge the gap between stunning frontends and 
              robust backend architectures.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              From RESTful APIs to real-time applications, I specialize in building 
              end-to-end solutions using <span className="text-foreground font-medium">MongoDB</span>, <span className="text-foreground font-medium">Express.js</span>, <span className="text-foreground font-medium">React</span>, and <span className="text-foreground font-medium">Node.js</span>. 
              I'm constantly exploring new technologies and pushing the boundaries of 
              what's possible on the web.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={stat.label} className="glass rounded-xl p-4 hover:border-primary/20 transition-all duration-300 group"
                  style={{ transitionDelay: `${i * 100}ms` }}>
                  <stat.icon className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

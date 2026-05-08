import { useEffect, useRef, useState } from 'react';

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

interface Skill {
  name: string;
  level: number;
  color: string;
}

const skillCategories = [
  {
    title: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'HTML5', level: 95, color: '#E34F26' },
      { name: 'CSS', level: 92, color: '#1572B6' },
      { name: 'JavaScript', level: 93, color: '#F7DF1E' },
      { name: 'React.js', level: 90, color: '#61DAFB' },
      { name: 'Bootstrap', level: 85, color: '#7952B3' },
      { name: 'Tailwind CSS', level: 95, color: '#06B6D4' },
    ] as Skill[],
  },
  {
    title: 'Backend & Database',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 90, color: '#339933' },
      { name: 'Express.js', level: 88, color: '#ffffff' },
      { name: 'Mongoose Database', level: 85, color: '#880000' },
      { name: 'Responsive Web Design', level: 95, color: '#a78bfa' },
    ] as Skill[],
  },
  {
    title: 'Soft Skills',
    icon: '🧠',
    skills: [
      { name: 'Problem-solving mindset', level: 95, color: '#34d399' },
      { name: 'Self-motivated & Eager to learn', level: 98, color: '#fbbf24' },
      { name: 'Effective communication', level: 90, color: '#ec4899' },
      { name: 'Attention to detail', level: 92, color: '#22d3ee' },
    ] as Skill[],
  },
];

function SkillBar({ skill, inView, delay }: { skill: Skill; inView: boolean; delay: number }) {
  return (
    <div className="group" style={{ transitionDelay: `${delay}ms` }}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{skill.name}</span>
        <span className="text-xs font-mono text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: inView ? `${skill.level}%` : '0%',
            background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
            boxShadow: inView ? `0 0 12px ${skill.color}44` : 'none',
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, 0.1);

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="absolute top-1/2 -right-48 w-[400px] h-[400px] bg-cyan-glow/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 -left-48 w-[400px] h-[400px] bg-emerald-glow/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-sm font-mono text-primary tracking-widest uppercase">Tech Stack</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-glow to-cyan-glow rounded-full mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((cat, catIdx) => (
            <div
              key={cat.title}
              className={`glass rounded-2xl p-6 hover:border-primary/20 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${catIdx * 200}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="text-lg font-bold">{cat.title}</h3>
              </div>
              <div className="space-y-4">
                {cat.skills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} inView={inView} delay={catIdx * 200 + i * 100} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

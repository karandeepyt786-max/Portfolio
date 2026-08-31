import CardStack from './ui/card-stack';
import type { Card } from './ui/card-stack';
import { projects } from '../data/projects';

export default function Gallery() {
  // Convert projects to gallery card format
  const galleryProjects: Card[] = projects.map((project, index) => ({
    id: index + 1,
    src: project.image,
    alt: `${project.title} preview`,
    title: project.title,
    description: project.description,
    useIframe: project.useIframe,
    live: project.live,
  }));

  return (
    <section id="gallery" className="relative bg-background text-foreground">
      {/* Ambient background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-glow/5 rounded-full blur-[150px]" />

      <div className="w-full flex flex-col items-center justify-center py-24">
        <div className="text-center mb-8 z-10">
          <span className="text-sm font-mono text-primary tracking-widest uppercase">Visuals</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Project <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">Interact with the card stack to explore all {projects.length}+ projects.</p>
        </div>
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8">
          <CardStack items={galleryProjects} />
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/30 bg-black/50 py-8 lg:py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight">
              <span className="gradient-text">Dev</span>
              <span className="text-foreground">Portfolio</span>
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {currentYear} Developer Portfolio. All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-sm font-medium">
            <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">Home</a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
            <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

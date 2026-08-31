export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  live: string;
  color: string;
  useIframe: boolean;
}

export const projects: Project[] = [
  {
    title: 'Learn Hub',
    description: 'A responsive educational platform landing page designed to showcase courses, tutorials, and learning resources.',
    image: '/screenshots/learn-hub.jpg',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    github: 'https://github.com/karandeepyt786-max/Learn-Hub-Responsive',
    live: 'https://karandeepyt786-max.github.io/Learn-Hub-Responsive/',
    color: '#a78bfa',
    useIframe: false,
  },
  {
    title: 'Geeks Platform',
    description: 'A responsive interface for tech enthusiasts, featuring modern UI components and fluid layouts for optimal viewing on all devices.',
    image: '',
    tags: ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
    github: 'https://github.com/karandeepyt786-max/Geeks_Responsive',
    live: 'https://karandeepyt786-max.github.io/Geeks_Responsive/',
    color: '#22d3ee',
    useIframe: true,
  },
  {
    title: 'Furniture Storefront',
    description: 'A stylish and elegant web storefront for a furniture brand, emphasizing product presentation and seamless user experience.',
    image: '',
    tags: ['HTML', 'CSS', 'Design System'],
    github: 'https://github.com/karandeepyt786-max/Furniture',
    live: 'https://karandeepyt786-max.github.io/Furniture/',
    color: '#fbbf24',
    useIframe: true,
  },
  {
    title: 'Numitech Solutions',
    description: 'A professional corporate website for IT solutions and services, completely responsive and optimized for performance.',
    image: '',
    tags: ['HTML', 'CSS', 'JavaScript', 'Corporate'],
    github: 'https://github.com/karandeepyt786-max/Numitech-Solution-2-Responsive',
    live: 'https://karandeepyt786-max.github.io/Numitech-Solution-2-Responsive/',
    color: '#34d399',
    useIframe: true,
  },
  {
    title: 'Full-Stack E-Commerce',
    description: 'A comprehensive full-stack e-commerce platform featuring advanced product management, secure authentication, and seamless user experience.',
    image: '/screenshots/e-commerce.jpg',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind'],
    github: 'https://github.com/karandeepyt786-max',
    live: 'https://e-commerce-ten-pi-22.vercel.app/',
    color: '#ec4899',
    useIframe: false,
  },
  {
    title: 'Sewing Parts',
    description: 'A focused e-commerce experience for sewing machines and sewing parts.',
    image: '/screenshots/sewing-machines.png',
    tags: ['Web Development', 'E-Commerce'],
    github: '',
    live: 'https://sewing-machine-and-sewing-parts-gfzpqy58s.vercel.app/',
    color: '#f97316',
    useIframe: false,
  }
];

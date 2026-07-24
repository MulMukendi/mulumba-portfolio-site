import { useEffect, useRef } from 'react';
import { ExternalLink, GitFork, Cpu, Users, CreditCard, Zap } from 'lucide-react';

const projects = [
  {
    id: 1,
    icon: CreditCard,
    title: 'Advanced ATM System',
    description:
      'A full-featured ATM simulation built with React. Supports multi-user authentication, balance enquiry, withdrawals with a $2 transaction fee, deposits, and a complete session flow from login to exit.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'JavaScript', 'JSON'],
    color: 'from-blue-500 to-cyan-400',
    features: ['Multi-user auth', 'Transaction fees', 'Balance tracking', 'Session management'],
    path: 'Advanced ATM',
    demo: null,
    github: 'https://github.com/mulmukendi',
  },
  {
    id: 2,
    icon: Users,
    title: 'User Management System',
    description:
      'A full-stack CRUD application for managing users, built with Java and Spring Boot on the backend. MySQL handles persistent data storage while Redis caching reduces database load and speeds up repeated reads — demonstrating real-world backend architecture patterns.',
    tags: ['Java', 'Spring Boot', 'React', 'MySQL', 'Redis', 'REST API'],
    color: 'from-emerald-500 to-teal-400',
    features: ['Redis caching', 'MySQL storage', 'CRUD operations', 'REST API'],
    path: 'User Management System',
    demo: null,
    github: 'https://github.com/mulmukendi',
  },
  {
    id: 3,
    icon: Cpu,
    title: 'Circuit Controller',
    description:
      'A low-level embedded systems project developed in MPLAB and simulated in Proteus. Written entirely in Assembly language, the program directly manipulates the PIC microcontroller\'s memory registers to control the behaviour of LED lights in a virtual circuit — demonstrating a solid understanding of hardware-software interaction at the chip level.',
    tags: ['Assembly', 'MPLAB', 'Proteus', 'PIC Microcontroller', 'Embedded Systems'],
    color: 'from-violet-500 to-pink-400',
    features: ['Assembly code', 'Memory control', 'LED circuit logic', 'Proteus simulation'],
    path: 'Circuit Controller',
    demo: null,
    github: 'https://github.com/mulmukendi',
  },
  {
    id: 4,
    icon: Zap,
    title: 'ATM — Beginner Versions',
    description:
      'Two earlier iterations of the ATM project (simple and intermediate) showcasing the progression from vanilla HTML/CSS/JS to more structured approaches. A snapshot of rapid skill growth.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'JSON'],
    color: 'from-orange-500 to-yellow-400',
    features: ['Vanilla JS', 'Clean UI', 'PIN auth', 'Iterative design'],
    path: 'Beginner Stage Projects',
    demo: null,
    github: 'https://github.com/mulmukendi',
  },
];

function ProjectCard({ project, index }) {
  const { icon: Icon, title, description, tags, color, features, github, demo } = project;

  return (
    <div
      className="reveal opacity-0 glass-card group hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col overflow-hidden"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${color}`} />

      <div className="p-6 flex flex-col flex-1">
        {/* Icon + title */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} p-0.5 flex-shrink-0`}>
            <div className="w-full h-full rounded-[14px] bg-dark-800 flex items-center justify-center">
              <Icon size={22} className="text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white text-lg leading-tight group-hover:text-primary-300 transition-colors">
              {title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{description}</p>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {features.map((f) => (
            <span
              key={f}
              className={`text-xs px-2.5 py-1 rounded-full bg-gradient-to-r ${color} bg-opacity-10 text-white/80 font-medium`}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {f}
            </span>
          ))}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2 py-0.5 rounded bg-primary-500/10 text-primary-400 border border-primary-500/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors font-medium"
            aria-label={`View ${title} on GitHub`}
          >
            <GitFork size={16} />
            Source Code
          </a>
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 transition-colors font-medium ml-auto"
              aria-label={`Live demo of ${title}`}
            >
              Live Demo
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('animate-fade-in-up');
            e.target.style.opacity = '1';
          }
        });
      },
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={ref} className="relative py-24 lg:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-primary-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 reveal opacity-0">
          <p className="text-primary-400 font-mono text-sm tracking-widest uppercase mb-3">03. Projects</p>
          <h2 className="section-title">Things I've Built</h2>
          <p className="section-subtitle mx-auto">
            A selection of personal and academic projects that reflect my growth as a developer.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="text-center mt-12 reveal opacity-0">
          <a
            href="https://github.com/mulmukendi"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm"
          >
            <GitFork size={18} />
            See more on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import { GitFork, Rss, Mail, ArrowDown, Download } from 'lucide-react';

const TYPED_STRINGS = [
  'Full-Stack Developer',
  'Java & Spring Boot Engineer',
  'React UI Builder',
  'Problem Solver',
];

export default function Hero() {
  const typedRef = useRef(null);
  const indexRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const type = () => {
      const current = TYPED_STRINGS[indexRef.current];
      const el = typedRef.current;
      if (!el) return;

      if (!deletingRef.current) {
        el.textContent = current.slice(0, charRef.current + 1);
        charRef.current++;
        if (charRef.current === current.length) {
          deletingRef.current = true;
          timeoutRef.current = setTimeout(type, 1800);
          return;
        }
      } else {
        el.textContent = current.slice(0, charRef.current - 1);
        charRef.current--;
        if (charRef.current === 0) {
          deletingRef.current = false;
          indexRef.current = (indexRef.current + 1) % TYPED_STRINGS.length;
        }
      }
      timeoutRef.current = setTimeout(type, deletingRef.current ? 55 : 85);
    };

    timeoutRef.current = setTimeout(type, 600);
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background blobs */}
      <div className="blob w-96 h-96 bg-primary-600 top-20 -left-32" style={{ animationDelay: '0s' }} />
      <div className="blob w-80 h-80 bg-violet-600 bottom-32 -right-20" style={{ animationDelay: '3s' }} />
      <div className="blob w-64 h-64 bg-cyan-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '1.5s' }} />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for internship &amp; graduate roles
        </div>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-4 animate-fade-in-up">
          Mulumba
          <br />
          <span className="gradient-text">Mukendi</span>
        </h1>

        {/* Typed role */}
        <div className="text-xl sm:text-2xl md:text-3xl font-mono text-slate-300 mb-6 h-10 flex items-center justify-center gap-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <span ref={typedRef} />
          <span className="w-0.5 h-7 bg-primary-400 animate-pulse rounded-full" />
        </div>

        {/* Summary */}
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Final-year Computer Science student at{' '}
          <span className="text-white font-medium">Tshwane University of Technology</span>.
          Building full-stack applications with Java, Spring Boot &amp; React —
          from database design to polished frontend.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <a href="#projects" className="btn-primary text-base px-8 py-3.5">
            View My Work
          </a>
          <a href="#contact" className="btn-outline text-base px-8 py-3.5">
            <Download size={18} />
            Get In Touch
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          {[
            { icon: GitFork, label: 'GitHub', href: 'https://github.com/mulmukendi' },
            { icon: Rss, label: 'LinkedIn', href: 'https://linkedin.com/in/mulumba-mukendi' },
            { icon: Mail, label: 'Email', href: 'mailto:mulmukendi@gmail.com' },
          ].map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-11 h-11 rounded-xl glass-card flex items-center justify-center text-slate-400 hover:text-primary-400 hover:border-primary-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <Icon size={20} />
            </a>
          ))}

          <span className="w-px h-8 bg-white/10 mx-1" />

          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span className="font-mono">068 238 7102</span>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="mt-20 flex justify-center animate-bounce">
          <a href="#about" aria-label="Scroll down">
            <ArrowDown size={22} className="text-slate-600 hover:text-primary-400 transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
}

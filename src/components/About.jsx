import { useEffect, useRef } from 'react';
import { GraduationCap, Zap, Target, Users } from 'lucide-react';

const stats = [
  { value: '5+', label: 'Projects Built' },
  { value: '5+', label: 'Technologies' },
  { value: 'Final', label: 'Year CS Student' },
  { value: '2026', label: 'Graduating' },
];

const highlights = [
  {
    icon: Zap,
    title: 'Fast Learner',
    desc: 'Rapidly picks up new technologies and applies them to real-world problems.',
  },
  {
    icon: Target,
    title: 'Full-Stack Focus',
    desc: 'Comfortable from database schema design all the way through to pixel-perfect UI.',
  },
  {
    icon: Users,
    title: 'Collaborative',
    desc: 'Experienced with Git workflows and building software as part of a team.',
  },
];

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('animate-fade-in-up');
        });
      },
      { threshold: 0.1 }
    );
    const children = ref.current?.querySelectorAll('.reveal');
    children?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="relative py-24 lg:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-primary-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 reveal opacity-0">
          <p className="text-primary-400 font-mono text-sm tracking-widest uppercase mb-3">01. About</p>
          <h2 className="section-title">Who I Am</h2>
          <p className="section-subtitle mx-auto">
            A passionate developer who loves turning complex problems into clean, elegant software.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — avatar */}
          <div className="reveal opacity-0 flex flex-col items-center lg:items-start gap-6">
            <div className="relative w-56 h-56 mx-auto lg:mx-0">
              <div className="w-full h-full rounded-3xl bg-gradient-to-br from-primary-600 via-violet-600 to-cyan-500 p-1 animate-glow">
                <div className="w-full h-full rounded-3xl bg-dark-800 flex items-center justify-center">
                  <span className="text-8xl font-black gradient-text select-none">M</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 glass-card glow-border px-4 py-2 text-sm font-semibold text-white">
                <span className="text-emerald-400 mr-1">●</span> Open to work
              </div>
            </div>

            {/* Education card — no personal contact info */}
            <div className="glass-card w-full p-5 mt-4">
              <div className="flex items-center gap-3 text-slate-300 text-sm">
                <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={15} className="text-primary-400" />
                </div>
                <div>
                  <div className="text-white font-medium">Tshwane University of Technology</div>
                  <div className="text-slate-500 text-xs mt-0.5">BSc Computer Science · Final Year</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — bio + stats + highlights */}
          <div className="reveal opacity-0 space-y-8">
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                I'm a <span className="text-white font-medium">final-year Computer Science student</span> at
                Tshwane University of Technology with a genuine passion for backend engineering and modern web development.
              </p>
              <p>
                My stack revolves around <span className="text-primary-400 font-medium">Java & Spring Boot</span> on
                the backend, with <span className="text-primary-400 font-medium">React & Tailwind CSS</span> on the
                frontend. I enjoy the full journey — from designing a clean database schema, through building RESTful
                APIs, to crafting a polished UI that users actually enjoy.
              </p>
              <p>
                Beyond code, I'm driven by continuous learning and am actively seeking a
                <span className="text-white font-medium"> Graduate Software Developer or Full-Stack Developer
                internship</span> where I can contribute to production systems and grow into a professional engineer.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3">
              {stats.map(({ value, label }) => (
                <div key={label} className="glass-card p-4 text-center">
                  <div className="text-2xl font-black gradient-text">{value}</div>
                  <div className="text-slate-500 text-xs mt-1 leading-tight">{label}</div>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="space-y-3">
              {highlights.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 glass-card p-4 hover:border-primary-500/30 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={18} className="text-primary-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{title}</div>
                    <div className="text-slate-400 text-sm mt-0.5">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

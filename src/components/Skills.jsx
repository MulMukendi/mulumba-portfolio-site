import { useEffect, useRef } from 'react';
import { Code2, Layout, Server, Database, Wrench, Cpu } from 'lucide-react';

const skillGroups = [
  {
    icon: Code2,
    label: 'Languages',
    color: 'from-blue-500 to-cyan-400',
    skills: ['Java', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Assembly'],
  },
  {
    icon: Layout,
    label: 'Frontend',
    color: 'from-violet-500 to-pink-400',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Axios', 'Responsive Design', 'Vite'],
  },
  {
    icon: Server,
    label: 'Backend',
    color: 'from-emerald-500 to-teal-400',
    skills: ['Spring Boot', 'Spring Data JPA', 'REST APIs', 'CRUD Development', 'JSON'],
  },
  {
    icon: Database,
    label: 'Databases & Caching',
    color: 'from-orange-500 to-yellow-400',
    skills: ['MySQL', 'Redis', 'SQL'],
  },
  {
    icon: Wrench,
    label: 'Tools & DevOps',
    color: 'from-rose-500 to-red-400',
    skills: ['Git', 'GitHub', 'Docker', 'Maven', 'Postman', 'IntelliJ IDEA', 'VS Code'],
  },
  {
    icon: Cpu,
    label: 'Embedded Systems',
    color: 'from-amber-500 to-orange-400',
    skills: ['MPLAB IDE', 'Proteus', 'PIC Microcontroller', 'Memory Register Control'],
  },
];

export default function Skills() {
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
    <section id="skills" ref={ref} className="relative py-24 lg:py-32 bg-dark-800/40">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-primary-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 reveal opacity-0">
          <p className="text-primary-400 font-mono text-sm tracking-widest uppercase mb-3">02. Skills</p>
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-subtitle mx-auto">
            A broad toolkit spanning frontend, backend, databases, embedded systems, and dev tooling.
          </p>
        </div>

        {/* Skill group cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {skillGroups.map(({ icon: Icon, label, color, skills }, i) => (
            <div
              key={label}
              className="reveal opacity-0 glass-card p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Card header */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} p-0.5`}>
                  <div className="w-full h-full rounded-[10px] bg-dark-800 flex items-center justify-center">
                    <Icon size={18} className="text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-white">{label}</h3>
              </div>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-default"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

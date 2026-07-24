import { useEffect, useRef } from 'react';
import {
  Code2, Layout, Server, Database, Wrench,
} from 'lucide-react';

const skillGroups = [
  {
    icon: Code2,
    label: 'Languages',
    color: 'from-blue-500 to-cyan-400',
    skills: [
      { name: 'Java', level: 88 },
      { name: 'JavaScript (ES6+)', level: 82 },
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 85 },
    ],
  },
  {
    icon: Layout,
    label: 'Frontend',
    color: 'from-violet-500 to-pink-400',
    skills: [
      { name: 'React', level: 80 },
      { name: 'Next.js', level: 65 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Axios', level: 78 },
      { name: 'Responsive Design', level: 88 },
    ],
  },
  {
    icon: Server,
    label: 'Backend',
    color: 'from-emerald-500 to-teal-400',
    skills: [
      { name: 'Spring Boot', level: 82 },
      { name: 'Spring Data JPA', level: 78 },
      { name: 'REST APIs', level: 85 },
      { name: 'CRUD Development', level: 88 },
      { name: 'JSON', level: 90 },
    ],
  },
  {
    icon: Database,
    label: 'Databases & Caching',
    color: 'from-orange-500 to-yellow-400',
    skills: [
      { name: 'MySQL', level: 80 },
      { name: 'Redis', level: 65 },
      { name: 'SQL', level: 82 },
    ],
  },
  {
    icon: Wrench,
    label: 'Tools & DevOps',
    color: 'from-rose-500 to-red-400',
    skills: [
      { name: 'Git & GitHub', level: 85 },
      { name: 'Docker', level: 60 },
      { name: 'Maven', level: 75 },
      { name: 'Postman', level: 85 },
      { name: 'IntelliJ IDEA', level: 88 },
      { name: 'VS Code', level: 90 },
    ],
  },
];

// Pill badges for a visual tech cloud
const techBadges = [
  'Java', 'Spring Boot', 'React', 'Next.js', 'JavaScript',
  'HTML5', 'CSS3', 'Tailwind CSS', 'MySQL', 'Redis',
  'REST APIs', 'Git', 'Docker', 'Maven', 'Postman',
  'Spring Data JPA', 'Axios', 'JSON',
];

function SkillBar({ name, level, color }) {
  const barRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && barRef.current) {
          barRef.current.style.width = `${level}%`;
        }
      },
      { threshold: 0.3 }
    );
    if (barRef.current) observer.observe(barRef.current.parentElement);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-300 font-medium">{name}</span>
        <span className="text-slate-500 font-mono text-xs">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
          style={{ width: '0%' }}
          role="progressbar"
          aria-valuenow={level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={name}
        />
      </div>
    </div>
  );
}

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
            A broad toolkit spanning frontend, backend, databases, and dev tooling.
          </p>
        </div>

        {/* Tech badge cloud */}
        <div className="reveal opacity-0 flex flex-wrap justify-center gap-2 mb-16">
          {techBadges.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-full text-sm font-medium glass-card text-slate-300 hover:text-primary-400 hover:border-primary-500/40 transition-all duration-200 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Skill groups grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {skillGroups.map(({ icon: Icon, label, color, skills }, i) => (
            <div
              key={label}
              className="reveal opacity-0 glass-card p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Group header */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} p-0.5`}>
                  <div className="w-full h-full rounded-[10px] bg-dark-800 flex items-center justify-center">
                    <Icon size={18} className="text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-white">{label}</h3>
              </div>

              {/* Skill bars */}
              <div className="space-y-4">
                {skills.map((s) => (
                  <SkillBar key={s.name} {...s} color={color} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

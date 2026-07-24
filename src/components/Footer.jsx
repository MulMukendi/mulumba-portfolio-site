import { GitFork, Rss, Heart, ArrowUp } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { icon: GitFork, href: 'https://github.com/mulmukendi', label: 'GitHub' },
  { icon: Rss, href: 'https://www.linkedin.com/in/mulumba-mukendi-61a34b25b', label: 'LinkedIn' },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-white/5 bg-dark-900">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary-500/60 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center font-bold text-white text-lg">
                M
              </div>
              <span className="font-bold text-white text-lg">
                Mulumba<span className="text-primary-400">.</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Full-stack developer &amp; CS final-year student at TUT. Building clean,
              performant applications with Java, Spring Boot &amp; React.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="text-slate-500 hover:text-primary-400 text-sm transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Connect</h4>
            <div className="flex flex-col gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-500 hover:text-primary-400 text-sm transition-colors group"
                >
                  <div className="w-8 h-8 glass-card rounded-lg flex items-center justify-center group-hover:border-primary-500/30 transition-colors">
                    <Icon size={15} />
                  </div>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm flex items-center gap-1.5">
            Built with
            <Heart size={13} className="text-red-500 fill-red-500" />
            by Mulumba Mukendi · {new Date().getFullYear()}
          </p>

          <p className="text-slate-600 text-xs font-mono">
            React · Vite · Tailwind CSS
          </p>

          <button
            onClick={scrollTop}
            aria-label="Back to top"
            className="w-9 h-9 glass-card rounded-xl flex items-center justify-center text-slate-500 hover:text-primary-400 hover:border-primary-500/30 hover:-translate-y-1 transition-all duration-200"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useRef, useState } from 'react';
import { GitFork, Rss, Send, CheckCircle, AlertCircle } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// To receive form submissions by email:
// 1. Go to https://formspree.io and sign up (free)
// 2. Create a new form pointed at your email address
// 3. Paste the form ID (e.g. "xabcdefg") into FORMSPREE_ID below
// 4. Set USE_FORMSPREE = true
// Until then, submissions open the user's email client via mailto.
// ─────────────────────────────────────────────────────────────
const FORMSPREE_ID = 'xkodkewq';
const USE_FORMSPREE = true;
const YOUR_EMAIL   = 'mulmukendi@gmail.com';

export default function Contact() {
  const ref = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errors, setErrors] = useState({});

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

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('sending');

    try {
      if (USE_FORMSPREE && FORMSPREE_ID) {
        // ── Formspree path ──────────────────────────────────────
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            subject: form.subject || `Portfolio contact from ${form.name}`,
            message: form.message,
          }),
        });
        if (res.ok) {
          setStatus('success');
          setForm({ name: '', email: '', subject: '', message: '' });
        } else {
          setStatus('error');
        }
      } else {
        // ── Mailto fallback (works without any backend) ─────────
        const subject = encodeURIComponent(form.subject || `Portfolio contact from ${form.name}`);
        const body = encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
        );
        window.location.href = `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`;
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClass = (id) =>
    `w-full px-4 py-3 rounded-xl bg-white/5 border ${
      errors[id] ? 'border-red-500/60' : 'border-white/10'
    } text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary-500/60 transition-all duration-200 text-sm`;

  return (
    <section id="contact" ref={ref} className="relative py-24 lg:py-32 bg-dark-800/40">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-primary-500/40 to-transparent" />
      <div className="blob w-96 h-96 bg-primary-700 bottom-0 right-0 opacity-[0.07]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 reveal opacity-0">
          <p className="text-primary-400 font-mono text-sm tracking-widest uppercase mb-3">04. Contact</p>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle mx-auto">
            I'm actively looking for internship and graduate developer opportunities.
            Drop me a message — I'd love to chat.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left — social links only */}
          <div className="lg:col-span-2 reveal opacity-0 flex flex-col justify-center gap-6">
            <div>
              <h3 className="text-white font-bold text-xl mb-2">Get In Touch</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Fill in the form and I'll get back to you as soon as possible. You can also
                connect with me on LinkedIn or check out my work on GitHub.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  icon: GitFork,
                  label: 'GitHub',
                  handle: 'github.com/mulmukendi',
                  href: 'https://github.com/mulmukendi',
                  color: 'from-slate-500 to-slate-400',
                },
                {
                  icon: Rss,
                  label: 'LinkedIn',
                  handle: 'mulumba-mukendi',
                  href: 'https://www.linkedin.com/in/mulumba-mukendi-61a34b25b',
                  color: 'from-blue-500 to-cyan-400',
                },
              ].map(({ icon: Icon, label, handle, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 glass-card p-4 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} p-0.5 flex-shrink-0`}>
                    <div className="w-full h-full rounded-[10px] bg-dark-800 flex items-center justify-center">
                      <Icon size={17} className="text-white" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-slate-500 text-xs mb-0.5">{label}</div>
                    <div className="text-slate-200 text-sm font-medium truncate group-hover:text-primary-400 transition-colors">
                      {handle}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Formspree form */}
          <div className="lg:col-span-3 reveal opacity-0">
            <div className="glass-card p-6 sm:p-8">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="text-white font-bold text-xl">Message Received!</h3>
                  <p className="text-slate-400 text-sm max-w-xs">
                    Thanks for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button onClick={() => setStatus('idle')} className="btn-outline text-sm mt-2">
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {status === 'error' && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                      <AlertCircle size={18} className="flex-shrink-0" />
                      Something went wrong. Please try again or connect via LinkedIn.
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
                        Full Name <span className="text-primary-400">*</span>
                      </label>
                      <input
                        id="name" type="text" value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                        className={inputClass('name')}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
                        Email Address <span className="text-primary-400">*</span>
                      </label>
                      <input
                        id="email" type="email" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className={inputClass('email')}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-1.5">
                      Subject
                    </label>
                    <input
                      id="subject" type="text" value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="What is this about?"
                      className={inputClass('subject')}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">
                      Message <span className="text-primary-400">*</span>
                    </label>
                    <textarea
                      id="message" rows={5} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about the opportunity or just say hello..."
                      className={`${inputClass('message')} resize-none`}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary w-full justify-center text-base py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

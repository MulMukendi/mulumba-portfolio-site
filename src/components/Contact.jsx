import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, GitFork, Rss, CheckCircle } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'mulmukendi@gmail.com',
    href: 'mailto:mulmukendi@gmail.com',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Phone,
    label: 'Phone / WhatsApp',
    value: '068 238 7102 · 069 312 1857',
    href: 'tel:+27682387102',
    color: 'from-emerald-500 to-teal-400',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Pretoria Gardens, Pretoria, ZA',
    href: 'https://maps.google.com/?q=Pretoria+Gardens+Pretoria',
    color: 'from-violet-500 to-pink-400',
  },
  {
    icon: MessageSquare,
    label: 'WhatsApp',
    value: 'Chat on WhatsApp',
    href: 'https://wa.me/27693121857',
    color: 'from-orange-500 to-yellow-400',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});

    // Build mailto link — works without a backend
    const subject = encodeURIComponent(form.subject || `Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:mulmukendi@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const field = (id, label, type = 'text', required = true) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1.5">
        {label} {required && <span className="text-primary-400">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={form[id]}
        onChange={(e) => setForm({ ...form, [id]: e.target.value })}
        className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
          errors[id] ? 'border-red-500/60' : 'border-white/10'
        } text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary-500/60 focus:bg-white/8 transition-all duration-200 text-sm`}
        placeholder={
          id === 'name' ? 'Your full name' :
          id === 'email' ? 'your@email.com' :
          id === 'subject' ? 'What is this about?' : ''
        }
      />
      {errors[id] && <p className="text-red-400 text-xs mt-1">{errors[id]}</p>}
    </div>
  );

  return (
    <section id="contact" ref={ref} className="relative py-24 lg:py-32 bg-dark-800/40">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-primary-500/40 to-transparent" />

      {/* Background blob */}
      <div className="blob w-96 h-96 bg-primary-700 bottom-0 right-0 opacity-[0.07]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 reveal opacity-0">
          <p className="text-primary-400 font-mono text-sm tracking-widest uppercase mb-3">04. Contact</p>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle mx-auto">
            I'm actively looking for internship and graduate developer opportunities.
            Reach out — I'd love to chat.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left — contact info */}
          <div className="lg:col-span-2 space-y-4 reveal opacity-0">
            <h3 className="text-white font-bold text-xl mb-6">Get In Touch</h3>

            {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
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
                    {value}
                  </div>
                </div>
              </a>
            ))}

            {/* Social */}
            <div className="pt-4">
              <p className="text-slate-500 text-sm mb-3">Find me online</p>
              <div className="flex gap-3">
                {[
                  { icon: GitFork, href: 'https://github.com/mulmukendi', label: 'GitHub' },
                  { icon: Rss, href: 'https://linkedin.com/in/mulumba-mukendi', label: 'LinkedIn' },
                  { icon: Mail, href: 'mailto:mulmukendi@gmail.com', label: 'Email' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-11 h-11 glass-card flex items-center justify-center text-slate-400 hover:text-primary-400 hover:border-primary-500/40 transition-all duration-300 hover:-translate-y-1 rounded-xl"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3 reveal opacity-0">
            <div className="glass-card p-6 sm:p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="text-white font-bold text-xl">Message Sent!</h3>
                  <p className="text-slate-400 text-sm max-w-xs">
                    Your email client should have opened. I'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="btn-outline text-sm mt-2"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {field('name', 'Full Name')}
                    {field('email', 'Email Address', 'email')}
                  </div>
                  {field('subject', 'Subject', 'text', false)}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">
                      Message <span className="text-primary-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about the opportunity or just say hello..."
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                        errors.message ? 'border-red-500/60' : 'border-white/10'
                      } text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary-500/60 transition-all duration-200 text-sm resize-none`}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center text-base py-3.5">
                    <Send size={18} />
                    Send Message
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

import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Scroll-progress bar at the very top of the page
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-[60] h-0.5 bg-gradient-to-r from-primary-500 via-violet-500 to-cyan-400 transition-all duration-75"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
}

export default function App() {
  // Kick the IntersectionObserver-based reveal animations on mount
  useEffect(() => {
    // Polyfill: make sure all .reveal elements that are already visible on load
    // get their animation triggered immediately (above-the-fold content).
    const els = document.querySelectorAll('.reveal');
    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('animate-fade-in-up');
        el.style.opacity = '1';
      }
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-dark-900 overflow-x-hidden">
      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

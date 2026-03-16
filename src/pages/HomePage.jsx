import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight, FiCode, FiZap, FiStar } from 'react-icons/fi';
import { useTypingEffect } from '../hooks/useAnimations';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data/portfolioData';

const roles = [
  'Software Engineer',
  'Full-Stack Developer',
  'AI/ML Enthusiast',
  'Open Source Contributor',
  'Problem Solver',
];

const stats = [
  { label: 'Projects Built', value: '50+', icon: FiCode },
  { label: 'GitHub Stars', value: '2.5k', icon: FiStar },
  { label: 'Years Experience', value: '4+', icon: FiZap },
];

function ParticleCanvas({ isDark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.color = Math.random() > 0.5 ? '#8b5cf6' : '#00d4ff';
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
      }
    }

    for (let i = 0; i < 100; i++) particles.push(new Particle());

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = '#8b5cf6';
            ctx.globalAlpha = (1 - dist / 120) * 0.08;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        particles[i].update();
        particles[i].draw();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: isDark ? 1 : 0.4 }}
    />
  );
}

export default function HomePage() {
  const { isDark } = useTheme();
  const typedText = useTypingEffect(roles, 90, 50, 2000);

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${isDark ? 'bg-dark-900' : 'bg-gray-50'} grid-overlay`}
    >
      {/* Particles */}
      <ParticleCanvas isDark={isDark} />

      {/* Orbs */}
      <div className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full opacity-10 blur-[100px] pointer-events-none orb"
        style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }}
      />
      <div className="absolute bottom-20 left-[5%] w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] pointer-events-none orb"
        style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)', animationDelay: '2s' }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-5 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #f472b6 0%, transparent 70%)' }}
      />

      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Status badge */}
          <div
            className="inline-flex items-center gap-2 text-xs px-4 py-1.5 rounded-full mb-8 animate-fade-in"
            style={{
              background: 'rgba(74,222,128,0.08)',
              border: '1px solid rgba(74,222,128,0.2)',
              color: '#4ade80',
              animationDelay: '0.1s',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Available for new opportunities
          </div>

          {/* Name */}
          <h1
            className={`font-display font-bold leading-tight mb-4 animate-slide-up`}
            style={{
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              animationDelay: '0.2s',
              color: isDark ? 'white' : '#0f0f1a',
            }}
          >
            Hi, I'm{' '}
            <span className="gradient-text">{personalInfo.name}</span>
          </h1>

          {/* Typing role */}
          <div
            className="text-xl sm:text-2xl lg:text-3xl font-mono mb-6 h-10 animate-fade-in"
            style={{ animationDelay: '0.4s', color: isDark ? '#94a3b8' : '#475569' }}
          >
            <span className="text-violet-400">&gt; </span>
            <span>{typedText}</span>
            <span className="typing-cursor" />
          </div>

          {/* Tagline */}
          <p
            className={`text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            style={{ animationDelay: '0.6s' }}
          >
            {personalInfo.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white relative overflow-hidden group neon-glow"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                View Projects <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <a
              href={personalInfo.resumeUrl}
              download
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold border transition-all duration-300 ${
                isDark
                  ? 'border-violet-500/40 text-violet-300 hover:bg-violet-500/10 hover:border-violet-400'
                  : 'border-violet-300 text-violet-600 hover:bg-violet-50'
              }`}
            >
              <FiDownload size={18} />
              Download Resume
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-5 mb-20 animate-fade-in" style={{ animationDelay: '1s' }}>
            {[
              { icon: FiGithub, href: personalInfo.github, label: 'GitHub' },
              { icon: FiLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
              { icon: FiMail, href: `mailto:${personalInfo.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`group w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                  isDark
                    ? 'border-white/10 text-gray-400 hover:text-violet-400 hover:border-violet-500/50 hover:bg-violet-500/10'
                    : 'border-gray-200 text-gray-500 hover:text-violet-600 hover:border-violet-300 hover:bg-violet-50'
                }`}
              >
                <Icon size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '1.2s' }}>
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="font-display font-bold text-2xl sm:text-3xl gradient-text mb-1">{value}</div>
                <div className={`text-xs sm:text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>Scroll</span>
          <div className={`w-5 h-9 rounded-full border-2 flex items-start justify-center pt-1.5 ${isDark ? 'border-white/10' : 'border-gray-300'}`}>
            <div className="w-1 h-2 rounded-full bg-violet-500 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}

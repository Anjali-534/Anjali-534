import { useTheme } from '../../context/ThemeContext';

// Section Header with gradient label
export const SectionHeader = ({ label, title, subtitle }) => {
  const { isDark } = useTheme();
  return (
    <div className="text-center mb-16">
      <span
        className="inline-block text-xs font-mono font-semibold tracking-[0.3em] uppercase px-4 py-1.5 rounded-full mb-4"
        style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(0,212,255,0.15))',
          border: '1px solid rgba(139,92,246,0.25)',
          color: '#a78bfa',
        }}
      >
        {label}
      </span>
      <h2
        className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4"
        style={{ color: isDark ? 'white' : '#0f0f1a' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-base sm:text-lg max-w-2xl mx-auto"
          style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

// Gradient button
export const GradientButton = ({ children, href, onClick, variant = 'primary', className = '', ...props }) => {
  const base = `inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${className}`;
  if (href) {
    return (
      <a href={href} className={`${base} text-white relative overflow-hidden group`}
        style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }} {...props}>
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative">{children}</span>
      </a>
    );
  }
  if (variant === 'primary') {
    return (
      <button onClick={onClick}
        className={`${base} text-white relative overflow-hidden group`}
        style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }} {...props}>
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative">{children}</span>
      </button>
    );
  }
  return (
    <button onClick={onClick}
      className={`${base} border border-violet-500/40 text-violet-400 hover:bg-violet-500/10`} {...props}>
      {children}
    </button>
  );
};

// Tech badge
export const TechBadge = ({ label }) => (
  <span
    className="inline-flex items-center text-xs px-2.5 py-1 rounded-md font-medium"
    style={{
      background: 'rgba(139,92,246,0.12)',
      border: '1px solid rgba(139,92,246,0.22)',
      color: '#a78bfa',
    }}
  >
    {label}
  </span>
);

// Glass card
export const GlassCard = ({ children, className = '', hover = true }) => {
  const { isDark } = useTheme();
  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-300 ${hover ? 'card-hover' : ''} ${
        isDark ? 'glass' : 'glass-light shadow-lg'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Scroll reveal — uses a ref callback with IntersectionObserver
export const RevealOnScroll = ({ children, delay = 0, className = '' }) => {
  return (
    <div
      className={className}
      style={{ opacity: 0, transform: 'translateY(28px)', transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms` }}
      ref={(el) => {
        if (!el) return;
        // Already visible
        if (el.style.opacity === '1') return;
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
              obs.unobserve(el);
            }
          },
          { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
        );
        obs.observe(el);
      }}
    >
      {children}
    </div>
  );
};

// Star rating display
export const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(i => (
      <span key={i} style={{ color: i <= rating ? '#facc15' : '#374151' }}>★</span>
    ))}
  </div>
);

// Animated progress bar — triggered on scroll
export const ProgressBar = ({ value, label, delay = 0 }) => {
  const { isDark } = useTheme();
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1.5">
        {label && <span className="text-sm font-medium" style={{ color: isDark ? '#d1d5db' : '#374151' }}>{label}</span>}
        <span className="text-sm font-mono" style={{ color: '#a78bfa' }}>{value}%</span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: isDark ? 'rgba(255,255,255,0.06)' : '#e5e7eb' }}
      >
        <div
          className="h-full rounded-full skill-bar-fill"
          style={{
            width: '0%',
            background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
            transition: `width 1.3s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
          }}
          ref={(el) => {
            if (!el) return;
            const obs = new IntersectionObserver(
              ([entry]) => {
                if (entry.isIntersecting) {
                  el.style.width = `${value}%`;
                  obs.unobserve(el);
                }
              },
              { threshold: 0.1 }
            );
            obs.observe(el);
          }}
        />
      </div>
    </div>
  );
};

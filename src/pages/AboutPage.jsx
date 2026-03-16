import { useTheme } from '../context/ThemeContext';
import { personalInfo, experiences } from '../data/portfolioData';
import { SectionHeader, GlassCard, RevealOnScroll } from '../components/UI';

const highlights = [
  { icon: '🚀', label: '50+ Projects', desc: 'shipped to production' },
  { icon: '🌍', label: '28 Countries', desc: 'traveled & inspired by' },
  { icon: '🎸', label: 'Musician', desc: 'guitar & songwriting' },
  { icon: '🏆', label: '10+ Awards', desc: 'hackathons & competitions' },
  { icon: '📚', label: '40+ Books', desc: 'read and still counting' },
  { icon: '☕', label: '∞ Coffees', desc: 'fueling great code' },
];

export default function AboutPage() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen pt-24 pb-20 ${isDark ? 'bg-dark-900' : 'bg-gray-50'} grid-overlay`}>
      {/* Ambient */}
      <div className="fixed top-1/4 right-0 w-96 h-96 rounded-full opacity-5 blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeader
            label="// about.me"
            title="Who I Am"
            subtitle="A passionate engineer with a love for elegant solutions and meaningful impact."
          />
        </RevealOnScroll>

        {/* Profile + intro */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
          {/* Profile Image */}
          <RevealOnScroll>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                {/* Decorative rings */}
                <div className="absolute inset-[-16px] rounded-full border-animated opacity-40" style={{ borderRadius: '50%' }} />
                <div className="absolute inset-[-8px] rounded-full border border-violet-500/20" />

                {/* Glow */}
                <div className="absolute inset-0 rounded-full blur-2xl opacity-30"
                  style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }} />

                {/* Image */}
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="relative z-10 w-full h-full object-cover rounded-full"
                  style={{
                    border: '3px solid rgba(139,92,246,0.4)',
                    boxShadow: '0 0 40px rgba(139,92,246,0.3)',
                  }}
                />

                {/* Badge */}
                <div
                  className="absolute bottom-4 right-0 z-20 px-3 py-1.5 rounded-full text-xs font-medium text-white"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}
                >
                  Open to Work ✨
                </div>

                {/* Code snippet floating */}
                <div
                  className="absolute -right-4 top-8 z-20 px-3 py-2 rounded-xl text-xs font-mono"
                  style={{
                    background: isDark ? 'rgba(20,27,61,0.9)' : 'rgba(255,255,255,0.95)',
                    border: '1px solid rgba(139,92,246,0.3)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <span className="text-violet-400">const</span>{' '}
                  <span className="text-cyan-400">me</span>{' = '}
                  <span className="text-green-400">"awesome"</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Bio */}
          <RevealOnScroll delay={150}>
            <div>
              <h3 className={`font-display font-bold text-2xl sm:text-3xl mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {personalInfo.name}
              </h3>
              <div
                className="text-sm font-mono mb-6 px-3 py-1.5 rounded-lg w-fit"
                style={{ background: 'rgba(139,92,246,0.12)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.2)' }}
              >
                {personalInfo.title}
              </div>
              <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {personalInfo.about}
              </p>
              <div
                className={`p-5 rounded-2xl mb-6`}
                style={{
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(0,212,255,0.08))',
                  border: '1px solid rgba(139,92,246,0.15)',
                }}
              >
                <h4 className={`font-semibold mb-2 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  🎯 Career Objective
                </h4>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {personalInfo.objective}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Location', value: personalInfo.location },
                  { label: 'Email', value: personalInfo.email },
                  { label: 'Availability', value: 'Immediately' },
                  { label: 'Work Type', value: 'Remote / Hybrid' },
                ].map(({ label, value }) => (
                  <div key={label} className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className="font-medium text-violet-400">{label}:</span> {value}
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Fun highlights */}
        <RevealOnScroll>
          <h3 className={`font-display font-bold text-2xl text-center mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Fun Highlights ✨
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
            {highlights.map(({ icon, label, desc }, i) => (
              <RevealOnScroll key={label} delay={i * 80}>
                <GlassCard className="text-center !p-4">
                  <div className="text-3xl mb-2">{icon}</div>
                  <div className={`font-display font-bold text-sm mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>{label}</div>
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{desc}</div>
                </GlassCard>
              </RevealOnScroll>
            ))}
          </div>
        </RevealOnScroll>

        {/* Timeline */}
        <RevealOnScroll>
          <h3 className={`font-display font-bold text-2xl text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            My Journey 🛤️
          </h3>
        </RevealOnScroll>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div
            className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-0.5 timeline-line"
            style={{ background: 'linear-gradient(to bottom, #8b5cf6, #06b6d4, #8b5cf6)' }}
          />

          {experiences.map((exp, i) => (
            <RevealOnScroll key={exp.id} delay={i * 100}>
              <div className={`relative flex flex-col sm:flex-row gap-6 mb-10 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                {/* Dot */}
                <div
                  className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-4 w-4 h-4 rounded-full z-10"
                  style={{
                    background: exp.type === 'education' ? '#f472b6' : 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                    boxShadow: `0 0 20px ${exp.type === 'education' ? 'rgba(244,114,182,0.5)' : 'rgba(139,92,246,0.5)'}`,
                  }}
                />

                {/* Date */}
                <div className={`sm:w-1/2 flex ${i % 2 === 0 ? 'sm:justify-end sm:pr-10' : 'sm:justify-start sm:pl-10'} pl-12 sm:pl-0`}>
                  <span
                    className="text-xs font-mono font-semibold px-3 py-1.5 rounded-full h-fit mt-4"
                    style={{ background: 'rgba(139,92,246,0.12)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.2)' }}
                  >
                    {exp.period}
                  </span>
                </div>

                {/* Card */}
                <div className={`sm:w-1/2 pl-12 sm:pl-0 ${i % 2 === 0 ? 'sm:pl-10' : 'sm:pr-10'}`}>
                  <GlassCard className="!p-5">
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-xl">{exp.type === 'education' ? '🎓' : '💼'}</span>
                      <div>
                        <h4 className={`font-display font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{exp.role}</h4>
                        <p className="text-violet-400 text-sm">{exp.company}</p>
                      </div>
                    </div>
                    <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map(tag => (
                        <span key={tag}
                          className="text-xs px-2 py-0.5 rounded-md"
                          style={{ background: 'rgba(139,92,246,0.1)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.15)' }}
                        >{tag}</span>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}

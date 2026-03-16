import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { skills } from '../data/portfolioData';
import { SectionHeader, GlassCard, ProgressBar, RevealOnScroll } from '../components/UI';

const categories = Object.keys(skills);

export default function SkillsPage() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState(categories[0]);

  return (
    <div className={`min-h-screen pt-24 pb-20 ${isDark ? 'bg-dark-900' : 'bg-gray-50'} grid-overlay`}>
      <div className="fixed bottom-1/4 right-0 w-96 h-96 rounded-full opacity-5 blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f472b6, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeader
            label="// skills.json"
            title="Tech Arsenal"
            subtitle="Technologies I've mastered and tools I use to turn ideas into reality."
          />
        </RevealOnScroll>

        {/* Category tabs */}
        <RevealOnScroll delay={100}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                  activeTab === cat
                    ? 'text-white shadow-lg'
                    : isDark
                      ? 'text-gray-400 hover:text-white border border-white/5 hover:border-violet-500/30'
                      : 'text-gray-600 hover:text-violet-600 border border-gray-200'
                }`}
                style={activeTab === cat ? { background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Skills grid */}
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll key={activeTab}>
            <GlassCard className="!p-8">
              <h3 className={`font-display font-bold text-xl mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {activeTab} Skills
              </h3>
              <div className="grid sm:grid-cols-2 gap-x-12">
                {skills[activeTab].map((skill, i) => (
                  <div key={skill.name} className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{skill.icon}</span>
                      <div className="flex-1">
                        <ProgressBar value={skill.level} label={skill.name} delay={i * 100} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </RevealOnScroll>
        </div>

        {/* All skills visual grid */}
        <RevealOnScroll delay={200}>
          <h3 className={`font-display font-bold text-2xl text-center mt-20 mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            All Technologies 🛠️
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.values(skills).flat().map((skill, i) => (
              <div
                key={`${skill.name}-${i}`}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 cursor-default"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)',
                  border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(139,92,246,0.1)',
                  backdropFilter: 'blur(12px)',
                  color: isDark ? '#e2e8f0' : '#374151',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)';
                  e.currentTarget.style.background = 'rgba(139,92,246,0.08)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(139,92,246,0.1)';
                  e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>{skill.icon}</span>
                <span>{skill.name}</span>
                <span
                  className="text-xs px-1.5 py-0.5 rounded-md font-mono"
                  style={{ background: 'rgba(139,92,246,0.12)', color: '#a78bfa' }}
                >
                  {skill.level}%
                </span>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Stats bar */}
        <RevealOnScroll delay={300}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16">
            {[
              { label: 'Languages', value: '8+', icon: '💻' },
              { label: 'Frameworks', value: '12+', icon: '⚙️' },
              { label: 'Databases', value: '6+', icon: '🗄️' },
              { label: 'Cloud & DevOps', value: '10+', icon: '☁️' },
            ].map(({ label, value, icon }) => (
              <GlassCard key={label} className="text-center !p-5">
                <div className="text-3xl mb-2">{icon}</div>
                <div className="font-display font-bold text-2xl gradient-text mb-1">{value}</div>
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{label}</div>
              </GlassCard>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}

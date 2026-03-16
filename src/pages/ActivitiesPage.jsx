import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { activities } from '../data/portfolioData';
import { SectionHeader, GlassCard, RevealOnScroll } from '../components/UI';

const typeFilters = ['All', 'volunteering', 'competition', 'sport', 'workshop', 'internship'];
const typeLabels = {
  volunteering: 'Volunteering',
  competition: 'Competition',
  sport: 'Sports',
  workshop: 'Workshop',
  internship: 'Open Source',
};

const typeColors = {
  volunteering: { bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.25)', text: '#4ade80' },
  competition: { bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.25)', text: '#fbbf24' },
  sport: { bg: 'rgba(0,212,255,0.12)', border: 'rgba(0,212,255,0.25)', text: '#00d4ff' },
  workshop: { bg: 'rgba(244,114,182,0.12)', border: 'rgba(244,114,182,0.25)', text: '#f472b6' },
  internship: { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.25)', text: '#a78bfa' },
};

export default function ActivitiesPage() {
  const { isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All' ? activities : activities.filter(a => a.type === activeFilter);

  return (
    <div className={`min-h-screen pt-24 pb-20 ${isDark ? 'bg-dark-900' : 'bg-gray-50'} grid-overlay`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeader
            label="// achievements"
            title="Beyond the Code"
            subtitle="Volunteering, competitions, speaking engagements, and more that define me beyond my IDE."
          />
        </RevealOnScroll>

        {/* Filters */}
        <RevealOnScroll delay={100}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {typeFilters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all duration-300 ${
                  activeFilter === f
                    ? 'text-white'
                    : isDark ? 'text-gray-400 border border-white/5' : 'text-gray-600 border border-gray-200'
                }`}
                style={activeFilter === f ? { background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' } : {}}
              >
                {f === 'All' ? 'All' : typeLabels[f] || f}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Timeline layout */}
        <div className="relative max-w-5xl mx-auto">
          <div
            className="absolute left-6 sm:left-1/2 sm:-translate-x-0.5 top-0 bottom-0 w-0.5"
            style={{ background: 'linear-gradient(to bottom, #8b5cf6, #06b6d4, #f472b6)' }}
          />

          {filtered.map((activity, i) => (
            <RevealOnScroll key={activity.id} delay={i * 100}>
              <div className={`relative flex gap-8 mb-8 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div
                  className="absolute left-3 sm:left-1/2 sm:-translate-x-1/2 top-5 w-6 h-6 rounded-full flex items-center justify-center text-sm z-10"
                  style={{
                    background: isDark ? '#0d1230' : 'white',
                    border: `2px solid ${typeColors[activity.type]?.text || '#8b5cf6'}`,
                    boxShadow: `0 0 15px ${typeColors[activity.type]?.text || '#8b5cf6'}40`,
                  }}
                >
                  <span style={{ fontSize: '12px' }}>{activity.icon}</span>
                </div>

                {/* Spacer for alignment */}
                <div className="hidden sm:block sm:w-1/2" />

                {/* Card */}
                <div className="ml-14 sm:ml-0 sm:w-1/2 sm:px-8">
                  <GlassCard className="!p-5 group">
                    {/* Type badge */}
                    <div
                      className="inline-block text-xs px-2.5 py-1 rounded-full font-medium mb-3 capitalize"
                      style={{
                        background: typeColors[activity.type]?.bg,
                        border: `1px solid ${typeColors[activity.type]?.border}`,
                        color: typeColors[activity.type]?.text,
                      }}
                    >
                      {typeLabels[activity.type] || activity.type}
                    </div>

                    <h4 className={`font-display font-bold text-base mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {activity.title}
                    </h4>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-violet-400 text-sm">{activity.org}</p>
                      <span className={`text-xs font-mono ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{activity.period}</span>
                    </div>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {activity.description}
                    </p>
                  </GlassCard>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Achievement stats */}
        <RevealOnScroll delay={200}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
            {[
              { label: 'Hackathons Won', value: '3', icon: '🏆' },
              { label: 'People Mentored', value: '15+', icon: '🌍' },
              { label: 'Talks Given', value: '8', icon: '🎤' },
              { label: 'Countries Competed', value: '5', icon: '🌎' },
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

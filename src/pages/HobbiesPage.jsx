import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { hobbies } from '../data/portfolioData';
import { SectionHeader, RevealOnScroll } from '../components/UI';

function HobbyCard({ hobby, isDark }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative group cursor-default overflow-hidden rounded-2xl transition-all duration-500"
      style={{
        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.6)',
        border: `1px solid ${hovered ? 'rgba(139,92,246,0.4)' : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(139,92,246,0.12)'}`,
        transform: hovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? '0 25px 60px rgba(0,0,0,0.25), 0 0 40px rgba(139,92,246,0.15)' : 'none',
        backdropFilter: 'blur(20px)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient background on hover */}
      <div
        className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${hovered ? 'opacity-10' : ''}`}
        style={{ background: `linear-gradient(135deg, ${hobby.color.replace('from-', '').replace(' to-', ', ')})` }}
      />

      {/* Animated gradient border top */}
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 transition-all duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: `linear-gradient(90deg, ${hobby.color.includes('orange') ? '#f97316, #dc2626' : hobby.color.includes('blue') ? '#3b82f6, #06b6d4' : hobby.color.includes('green') ? '#22c55e, #10b981' : hobby.color.includes('violet') ? '#8b5cf6, #a855f7' : hobby.color.includes('yellow') ? '#eab308, #f97316' : '#ec4899, #f43f5e'})` }}
      />

      <div className="relative z-10 p-8 text-center">
        <div
          className="text-5xl mb-4 inline-block transition-transform duration-300"
          style={{ transform: hovered ? 'scale(1.2) rotate(-5deg)' : 'scale(1) rotate(0deg)' }}
        >
          {hobby.icon}
        </div>
        <h3 className={`font-display font-bold text-lg mb-2 transition-colors ${hovered ? 'text-violet-400' : isDark ? 'text-white' : 'text-gray-900'}`}>
          {hobby.name}
        </h3>
        <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {hobby.desc}
        </p>
      </div>
    </div>
  );
}

export default function HobbiesPage() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen pt-24 pb-20 ${isDark ? 'bg-dark-900' : 'bg-gray-50'} grid-overlay`}>
      <div className="fixed top-1/4 right-1/4 w-96 h-96 rounded-full opacity-5 blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #f472b6, transparent)' }} />
      <div className="fixed bottom-1/4 left-1/4 w-80 h-80 rounded-full opacity-5 blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4ade80, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeader
            label="// life.beyond()"
            title="Hobbies & Passions"
            subtitle="The things that fuel my creativity and keep me balanced outside the world of code."
          />
        </RevealOnScroll>

        {/* Hobby grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {hobbies.map((hobby, i) => (
            <RevealOnScroll key={hobby.name} delay={i * 100}>
              <HobbyCard hobby={hobby} isDark={isDark} />
            </RevealOnScroll>
          ))}
        </div>

        {/* Fun quote */}
        <RevealOnScroll delay={300}>
          <div
            className="max-w-2xl mx-auto mt-20 p-8 rounded-2xl text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(0,212,255,0.06))',
              border: '1px solid rgba(139,92,246,0.15)',
            }}
          >
            <div className="text-4xl mb-4">💡</div>
            <blockquote className={`text-lg font-display font-medium italic mb-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              "The best code comes from a developer who lives fully."
            </blockquote>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              My hobbies aren't distractions — they're what make me a better engineer.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}

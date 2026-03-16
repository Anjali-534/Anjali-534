import { FiDownload, FiExternalLink, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { personalInfo, experiences, skills } from '../data/portfolioData';
import { SectionHeader, GlassCard, TechBadge, RevealOnScroll } from '../components/UI';

export default function ResumePage() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen pt-24 pb-20 ${isDark ? 'bg-dark-900' : 'bg-gray-50'} grid-overlay`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeader
            label="// resume.pdf"
            title="My Resume"
            subtitle="A snapshot of my professional journey, skills, and accomplishments."
          />
        </RevealOnScroll>

        {/* Action buttons */}
        <RevealOnScroll delay={100}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href={personalInfo.resumeUrl}
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white text-sm"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}
            >
              <FiDownload size={16} />
              Download PDF
            </a>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm border transition-colors ${
                isDark
                  ? 'border-white/10 text-gray-300 hover:bg-white/5'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FiExternalLink size={16} />
              View in Browser
            </a>
          </div>
        </RevealOnScroll>

        {/* Resume Preview */}
        <RevealOnScroll delay={150}>
          <div
            className="rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: isDark ? 'rgba(13,18,48,0.8)' : 'white',
              border: '1px solid rgba(139,92,246,0.15)',
            }}
          >
            {/* Resume header */}
            <div className="p-8 sm:p-10 border-b" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(139,92,246,0.1)' }}>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-20 h-20 rounded-2xl object-cover"
                  style={{ border: '2px solid rgba(139,92,246,0.3)' }}
                />
                <div className="text-center sm:text-left">
                  <h2 className={`font-display font-bold text-3xl mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {personalInfo.name}
                  </h2>
                  <p className="text-violet-400 font-medium text-lg mb-3">{personalInfo.title}</p>
                  <div className={`flex flex-wrap justify-center sm:justify-start gap-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className="flex items-center gap-1"><FiMail size={12} /> {personalInfo.email}</span>
                    <span className="flex items-center gap-1"><FiPhone size={12} /> {personalInfo.phone}</span>
                    <span className="flex items-center gap-1"><FiMapPin size={12} /> {personalInfo.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 divide-x" style={{ divideColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(139,92,246,0.08)' }}>
              {/* Left column */}
              <div className="sm:col-span-2 p-8 sm:p-10">
                {/* Summary */}
                <section className="mb-8">
                  <h3 className={`font-display font-bold text-sm uppercase tracking-widest mb-3 text-violet-400`}>Summary</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{personalInfo.about}</p>
                </section>

                {/* Experience */}
                <section className="mb-8">
                  <h3 className={`font-display font-bold text-sm uppercase tracking-widest mb-4 text-violet-400`}>Experience</h3>
                  {experiences.filter(e => e.type === 'work').map((exp, i) => (
                    <div key={exp.id} className={`mb-6 ${i < experiences.filter(e => e.type === 'work').length - 1 ? 'pb-6 border-b' : ''}`}
                      style={{ borderColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(139,92,246,0.06)' }}>
                      <div className="flex justify-between flex-wrap gap-1 mb-1">
                        <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{exp.role}</h4>
                        <span className={`text-xs font-mono ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{exp.period}</span>
                      </div>
                      <p className="text-violet-400 text-sm mb-2">{exp.company}</p>
                      <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{exp.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {exp.tags.map(t => <TechBadge key={t} label={t} />)}
                      </div>
                    </div>
                  ))}
                </section>

                {/* Education */}
                <section>
                  <h3 className={`font-display font-bold text-sm uppercase tracking-widest mb-4 text-violet-400`}>Education</h3>
                  {experiences.filter(e => e.type === 'education').map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between flex-wrap gap-1 mb-1">
                        <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{exp.role}</h4>
                        <span className={`text-xs font-mono ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{exp.period}</span>
                      </div>
                      <p className="text-violet-400 text-sm mb-2">{exp.company}</p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{exp.description}</p>
                    </div>
                  ))}
                </section>
              </div>

              {/* Right column */}
              <div className="p-6 sm:p-8 border-t sm:border-t-0" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(139,92,246,0.08)' }}>
                <section className="mb-8">
                  <h3 className="font-display font-bold text-sm uppercase tracking-widest mb-4 text-violet-400">Top Skills</h3>
                  {Object.entries(skills).slice(0, 2).map(([cat, items]) => (
                    <div key={cat} className="mb-4">
                      <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{cat}</p>
                      <div className="flex flex-wrap gap-1">
                        {items.slice(0, 4).map(s => <TechBadge key={s.name} label={s.name} />)}
                      </div>
                    </div>
                  ))}
                </section>

                <section className="mb-8">
                  <h3 className="font-display font-bold text-sm uppercase tracking-widest mb-4 text-violet-400">Languages</h3>
                  {['English (Native)', 'Spanish (B2)', 'Mandarin (A2)'].map(lang => (
                    <div key={lang} className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{lang}</div>
                  ))}
                </section>

                <section>
                  <h3 className="font-display font-bold text-sm uppercase tracking-widest mb-4 text-violet-400">Interests</h3>
                  <div className="flex flex-wrap gap-1">
                    {['Open Source', 'AI Research', 'Rock Climbing', 'Photography'].map(i => (
                      <TechBadge key={i} label={i} />
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}

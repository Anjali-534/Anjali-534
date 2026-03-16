import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { books, courses, currentlyLearning } from '../data/portfolioData';
import { SectionHeader, GlassCard, StarRating, ProgressBar, RevealOnScroll } from '../components/UI';

const bookFilters = ['All', 'Technical', 'Self-Help', 'Business'];

export default function LibraryPage() {
  const { isDark } = useTheme();
  const [bookFilter, setBookFilter] = useState('All');

  const filteredBooks = bookFilter === 'All' ? books : books.filter(b => b.category === bookFilter);

  return (
    <div className={`min-h-screen pt-24 pb-20 ${isDark ? 'bg-dark-900' : 'bg-gray-50'} grid-overlay`}>
      <div className="fixed top-1/2 left-1/4 w-80 h-80 rounded-full opacity-5 blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4ade80, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeader
            label="// library.js"
            title="Learning & Growth"
            subtitle="Books that shaped my thinking, courses that built my skills, and what I'm exploring now."
          />
        </RevealOnScroll>

        {/* Currently Learning */}
        <RevealOnScroll delay={100}>
          <div
            className="rounded-2xl p-6 sm:p-8 mb-16"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(0,212,255,0.05))',
              border: '1px solid rgba(139,92,246,0.15)',
            }}
          >
            <h3 className={`font-display font-bold text-xl mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              🔭 Currently Learning
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {currentlyLearning.map((item, i) => (
                <div key={item.topic}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{item.icon}</span>
                    <span className={`font-medium text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{item.topic}</span>
                  </div>
                  <ProgressBar value={item.progress} label="" delay={i * 150} />
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Books section */}
        <RevealOnScroll>
          <h3 className={`font-display font-bold text-2xl mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            📚 Books I've Read
          </h3>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {bookFilters.map(f => (
              <button
                key={f}
                onClick={() => setBookFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  bookFilter === f
                    ? 'text-white'
                    : isDark ? 'text-gray-400 border border-white/5' : 'text-gray-600 border border-gray-200'
                }`}
                style={bookFilter === f ? { background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' } : {}}
              >
                {f}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {filteredBooks.map((book, i) => (
            <RevealOnScroll key={book.id} delay={i * 80}>
              <GlassCard className="!p-0 overflow-hidden group">
                <div className="flex gap-0">
                  {/* Book cover */}
                  <div className="relative w-28 flex-shrink-0">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      style={{ minHeight: '140px' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                    <div
                      className="absolute top-2 left-2 text-xs px-1.5 py-0.5 rounded font-medium"
                      style={{
                        background: book.status === 'Read' ? 'rgba(74,222,128,0.2)' : 'rgba(251,191,36,0.2)',
                        color: book.status === 'Read' ? '#4ade80' : '#fbbf24',
                        border: `1px solid ${book.status === 'Read' ? 'rgba(74,222,128,0.3)' : 'rgba(251,191,36,0.3)'}`,
                      }}
                    >
                      {book.status}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-4">
                    <span className={`text-xs px-2 py-0.5 rounded-md mb-2 inline-block ${isDark ? 'bg-white/5 text-gray-500' : 'bg-gray-100 text-gray-500'}`}>
                      {book.category}
                    </span>
                    <h4 className={`font-display font-bold text-sm mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {book.title}
                    </h4>
                    <p className={`text-xs mb-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{book.author}</p>
                    <StarRating rating={book.rating} />
                    <p className={`text-xs mt-2 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      "{book.takeaway}"
                    </p>
                  </div>
                </div>
              </GlassCard>
            </RevealOnScroll>
          ))}
        </div>

        {/* Courses & Certifications */}
        <RevealOnScroll>
          <h3 className={`font-display font-bold text-2xl mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            🎓 Courses & Certifications
          </h3>
        </RevealOnScroll>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course, i) => (
            <RevealOnScroll key={course.id} delay={i * 80}>
              <GlassCard className="!p-5">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{course.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-semibold text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {course.name}
                      </h4>
                      {course.verified && (
                        <span className="text-xs text-green-400" title="Verified Certificate">✓</span>
                      )}
                    </div>
                    <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{course.provider}</p>
                    <span className="text-xs font-mono text-violet-400">{course.year}</span>
                  </div>
                </div>
              </GlassCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}

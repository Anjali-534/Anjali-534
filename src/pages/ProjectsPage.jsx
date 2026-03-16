import { useState } from 'react';
import { FiGithub, FiExternalLink, FiX, FiStar, FiGitBranch, FiFilter } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { projects } from '../data/portfolioData';
import { SectionHeader, TechBadge, RevealOnScroll } from '../components/UI';

const filters = ['All', 'React', 'Node', 'AI', 'Python', 'Tools'];

function ProjectModal({ project, onClose, isDark }) {
  if (!project) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      <div
        className={`relative z-10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-slide-up`}
        style={{
          background: isDark ? 'rgba(13,18,48,0.98)' : 'rgba(255,255,255,0.98)',
          border: '1px solid rgba(139,92,246,0.2)',
          boxShadow: '0 30px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.1)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header image */}
        <div className="relative h-52 overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          >
            <FiX size={16} />
          </button>
          {project.featured && (
            <span className="absolute top-4 left-4 text-xs px-2.5 py-1 rounded-full font-medium text-yellow-300"
              style={{ background: 'rgba(234,179,8,0.2)', border: '1px solid rgba(234,179,8,0.3)' }}>
              ⭐ Featured
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className={`font-display font-bold text-xl mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {project.title}
          </h3>
          <p className={`text-sm mb-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {project.longDescription}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map(t => <TechBadge key={t} label={t} />)}
          </div>

          <div className={`flex items-center gap-4 text-xs mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <span className="flex items-center gap-1"><FiStar size={12} /> {project.stats.stars} stars</span>
            <span className="flex items-center gap-1"><FiGitBranch size={12} /> {project.stats.forks} forks</span>
          </div>

          <div className="flex gap-3">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}
            >
              <FiExternalLink size={14} /> Live Demo
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                isDark
                  ? 'border-white/10 text-gray-300 hover:bg-white/5'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FiGithub size={14} /> GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onClick, isDark }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300"
      style={{
        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)',
        border: `1px solid ${hovered ? 'rgba(139,92,246,0.4)' : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(139,92,246,0.12)'}`,
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 60px rgba(139,92,246,0.2)' : '0 2px 20px rgba(0,0,0,0.05)',
        backdropFilter: 'blur(20px)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(project)}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/70 to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(139,92,246,0.2)' }}>
          <span className="text-white font-medium text-sm bg-black/50 px-4 py-2 rounded-full">View Details</span>
        </div>

        {project.featured && (
          <span className="absolute top-3 left-3 text-xs px-2 py-0.5 rounded-full font-medium text-yellow-300"
            style={{ background: 'rgba(234,179,8,0.2)', border: '1px solid rgba(234,179,8,0.3)' }}>
            ⭐ Featured
          </span>
        )}
        <div className={`absolute top-3 right-3 flex gap-1.5`}>
          {project.category.map(c => (
            <span key={c} className="text-xs px-1.5 py-0.5 rounded-md font-medium text-violet-300"
              style={{ background: 'rgba(139,92,246,0.25)' }}>
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className={`font-display font-bold text-base mb-2 line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {project.title}
        </h3>
        <p className={`text-sm mb-4 line-clamp-2 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 4).map(t => <TechBadge key={t} label={t} />)}
          {project.tech.length > 4 && (
            <span className="text-xs text-gray-500">+{project.tech.length - 4}</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <a href={project.live} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors"
            onClick={e => e.stopPropagation()}>
            <FiExternalLink size={12} /> Demo
          </a>
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className={`flex items-center gap-1 text-xs hover:text-violet-400 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
            onClick={e => e.stopPropagation()}>
            <FiGithub size={12} /> Code
          </a>
          <span className={`ml-auto flex items-center gap-1 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            <FiStar size={11} /> {project.stats.stars}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const { isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category.includes(activeFilter));

  return (
    <div className={`min-h-screen pt-24 pb-20 ${isDark ? 'bg-dark-900' : 'bg-gray-50'} grid-overlay`}>
      <div className="fixed top-1/3 left-0 w-96 h-96 rounded-full opacity-5 blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <SectionHeader
            label="// projects"
            title="Things I've Built"
            subtitle="A curated showcase of projects ranging from AI systems to production web applications."
          />
        </RevealOnScroll>

        {/* Filters */}
        <RevealOnScroll delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <FiFilter size={14} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeFilter === f
                    ? 'text-white'
                    : isDark
                      ? 'text-gray-400 hover:text-white border border-white/5 hover:border-violet-500/20'
                      : 'text-gray-600 hover:text-violet-600 border border-gray-200 hover:border-violet-200'
                }`}
                style={activeFilter === f ? { background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' } : {}}
              >
                {f}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <RevealOnScroll key={project.id} delay={i * 80}>
              <ProjectCard project={project} onClick={setSelectedProject} isDark={isDark} />
            </RevealOnScroll>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>No projects for this filter yet.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          isDark={isDark}
        />
      )}
    </div>
  );
}

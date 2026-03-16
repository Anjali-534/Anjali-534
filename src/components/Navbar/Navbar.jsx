import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import {
  FiSun, FiMoon, FiMenu, FiX, FiCode
} from 'react-icons/fi';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/skills', label: 'Skills' },
  { path: '/resume', label: 'Resume' },
  { path: '/library', label: 'Library' },
  { path: '/activities', label: 'Activities' },
  { path: '/hobbies', label: 'Hobbies' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggle } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? isDark
              ? 'bg-dark-900/80 nav-blur border-b border-white/5 shadow-2xl'
              : 'bg-white/80 nav-blur border-b border-violet-100 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-cyan-400 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />
                <FiCode className="absolute inset-0 m-auto text-white w-5 h-5" />
              </div>
              <span
                className="font-display font-bold text-xl"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                AA
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                    isActive(link.path)
                      ? 'text-violet-400'
                      : isDark
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-600 hover:text-violet-600'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                  )}
                  <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-white/5" />
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggle}
                className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 text-yellow-300'
                    : 'bg-violet-50 hover:bg-violet-100 text-violet-600'
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>

              {/* Hire Me btn */}
              <Link
                to="/contact"
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white relative overflow-hidden group"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span>Hire Me</span>
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen(prev => !prev)}
                className={`lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isDark ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 transition-transform duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'} ${isDark ? 'bg-dark-800' : 'bg-white'}`}
          style={{ borderLeft: '1px solid rgba(139,92,246,0.15)' }}
        >
          <div className="p-6 pt-20">
            <p className={`text-xs font-mono mb-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              // navigation
            </p>
            <nav className="flex flex-col gap-2">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? 'bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-violet-400 border border-violet-500/20'
                      : isDark
                        ? 'text-gray-400 hover:bg-white/5 hover:text-white'
                        : 'text-gray-700 hover:bg-violet-50 hover:text-violet-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8 pt-6 border-t border-white/5">
              <Link
                to="/contact"
                className="flex items-center justify-center w-full py-3 rounded-xl text-white font-medium"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}
              >
                Hire Me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { personalInfo } from '../../data/portfolioData';

const quickLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/skills', label: 'Skills' },
  { path: '/contact', label: 'Contact' },
];

const resources = [
  { path: '/resume', label: 'Resume' },
  { path: '/library', label: 'Library' },
  { path: '/activities', label: 'Activities' },
  { path: '/hobbies', label: 'Hobbies' },
];

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer
      className={`relative overflow-hidden border-t ${isDark ? 'border-white/5' : 'border-violet-100'}`}
      style={{ background: isDark ? '#060810' : '#f8f7ff' }}
    >
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-20 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(ellipse, #8b5cf6 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' }}
              >
                AA
              </div>
              <span className={`font-display font-bold text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Anjali Aggarwal
              </span>
            </div>
            <p className={`text-sm leading-relaxed max-w-xs mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Software Engineer crafting digital experiences at the intersection of code & creativity.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
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
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group ${
                    isDark
                      ? 'bg-white/5 hover:bg-violet-500/20 text-gray-400 hover:text-violet-400'
                      : 'bg-gray-100 hover:bg-violet-100 text-gray-600 hover:text-violet-600'
                  }`}
                >
                  <Icon size={16} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-display font-semibold text-sm mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`text-sm transition-colors duration-300 hover:text-violet-400 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className={`font-display font-semibold text-sm mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              More
            </h4>
            <ul className="space-y-2">
              {resources.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`text-sm transition-colors duration-300 hover:text-violet-400 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Status indicator */}
            <div className={`mt-6 flex items-center gap-2 text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Open to opportunities
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
          <p className={`text-xs flex items-center gap-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            Made with <FiHeart size={12} className="text-rose-500" /> by Anjali Aggarwal © {new Date().getFullYear()}
          </p>
         
        </div>
      </div>
    </footer>
  );
}

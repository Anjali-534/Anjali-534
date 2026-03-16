import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// Apply theme class immediately to avoid flash
function applyTheme(dark) {
  if (dark) {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    const dark = stored ? stored === 'dark' : true;
    // Apply immediately so there's no flash
    applyTheme(dark);
    return dark;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    applyTheme(isDark);
  }, [isDark]);

  const toggle = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

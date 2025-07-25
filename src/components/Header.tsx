import React from 'react';
import { GraduationCap, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Udaan
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Scholarship Matching Platform
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="relative inline-flex h-8 w-16 items-center rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 shadow-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-label="Toggle dark mode"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                  isDark ? 'translate-x-8' : 'translate-x-1'
                }`}
                style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.12)' }}
              />
              <Sun className={`absolute left-2 h-4 w-4 text-yellow-500 transition-opacity duration-200 ${isDark ? 'opacity-0' : 'opacity-100'}`} />
              <Moon className={`absolute right-2 h-4 w-4 text-blue-500 transition-opacity duration-200 ${isDark ? 'opacity-100' : 'opacity-0'}`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
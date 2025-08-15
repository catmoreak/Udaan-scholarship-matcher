import React from 'react';
import { GraduationCap, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="relative bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 transition-colors overflow-hidden">
      {/* Animated stars background for dark mode */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <svg width="100%" height="100%" className="w-full h-full" style={{ position: 'absolute', top: 0, left: 0 }}>
          <circle cx="10%" cy="20%" r="3.2" fill="#fff" opacity="1">
            <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="30%" cy="40%" r="2.2" fill="#fff" opacity="0.95">
            <animate attributeName="opacity" values="0.95;0.2;0.95" dur="1.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="70%" cy="30%" r="2.5" fill="#fff" opacity="1">
            <animate attributeName="opacity" values="1;0.4;1" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="80%" cy="60%" r="3.5" fill="#fff" opacity="0.95">
            <animate attributeName="opacity" values="0.95;0.3;0.95" dur="2.2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="50%" cy="80%" r="2.7" fill="#fff" opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.8s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-600 to-lime-500 p-2 rounded-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Udaan
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
              Your ultimate scholarship matching platform
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="relative inline-flex h-8 w-16 items-center rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 shadow-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-label="Toggle dark mode"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                  isDark ? 'translate-x-8' : 'translate-x-1'
                }`}
                style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.12)' }}
              />
              <Sun className={`absolute left-2 h-4 w-4 text-yellow-500 transition-opacity duration-200 ${isDark ? 'opacity-0' : 'opacity-100'}`} />
              <Moon className={`absolute right-2 h-4 w-4 text-green-500 transition-opacity duration-200 ${isDark ? 'opacity-100' : 'opacity-0'}`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
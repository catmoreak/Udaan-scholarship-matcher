import React, { useState, useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import FilterForm from './components/FilterForm';
import ScholarshipCard from './components/ScholarshipCard';
import ChatBot from './components/ChatBot';

import { useScholarships } from './hooks/useScholarships';

const AppContent: React.FC = () => {
  // Track if user has submitted the filter form
  const [hasSearched, setHasSearched] = useState(false);

  // Only show scholarships after user submits the form
  const handleFilter = (criteria: any) => {
    setHasSearched(true);
    filterScholarships(criteria);
  };
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  const { 
    filteredScholarships, 
    loading, 
    error, 
    filterScholarships,
    refetch 
  } = useScholarships();

  // Detect dark mode for loader
  const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');

  if (showLoader) {
    return (
      <div className={`fixed inset-0 flex items-center justify-center z-50 min-h-screen w-full ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-12 w-12 text-blue-600 dark:text-blue-400 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Loading...</span>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Your Path to Success
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Find scholarships tailored to your profile. We match you with opportunities based on your academic background, category, and personal circumstances.
          </p>
        </div>

        

        <FilterForm onFilter={handleFilter} loading={loading} />

        {error && !error.includes('Missing Supabase') && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <span className="text-red-700 dark:text-red-300">{error}</span>
            </div>
            <button
              onClick={refetch}
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        )}

        {hasSearched ? (
          loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({length: 6}).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="flex space-x-2">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredScholarships.length > 0 ? (
            <>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {filteredScholarships.length} Scholarships Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Scholarships matching your criteria
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredScholarships.map((scholarship) => (
                  <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No Matching Scholarships
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your filter criteria to find more opportunities.
                </p>
              </div>
            </div>
          )
        ) : null}
      </main>
      <ChatBot />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
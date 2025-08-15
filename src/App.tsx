import React, { useState, useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import FilterForm from './components/FilterForm';
import ScholarshipCard from './components/ScholarshipCard';
import ChatBot from './components/ChatBot';

import { useScholarships } from './hooks/useScholarships';

// Dismissible disclaimer notification component
function DisclaimerNotification() {
  const [visible, setVisible] = React.useState(true);
  if (!visible) return null;
  return (
    <div
      className="fixed top-0 left-0 w-full z-50 flex justify-center items-start px-2 sm:px-4 pt-4 pointer-events-none"
      role="region"
      aria-label="Disclaimer notification"
    >
      <div
        className="pointer-events-auto w-full max-w-md sm:max-w-xl bg-green-50 dark:bg-green-900/90 border border-green-300 dark:border-green-700 text-green-900 dark:text-green-100 rounded-xl shadow-2xl flex items-start gap-3 px-4 py-3"
        style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)' }}
      >
        <div className="pt-1">
          <svg className="h-7 w-7 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <div className="flex-1 min-w-0">
          <span className="block text-base font-semibold mb-1">Disclaimer</span>
          <span className="block text-sm leading-relaxed">
            The scholarship data shown here is compiled from various public sources. While we strive for accuracy, some details (such as eligibility, deadlines, or rewards) may change or be outdated. <b>User discretion is required.</b> Please verify with the official scholarship websites before applying.
          </span>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="ml-2 mt-1 text-green-700 dark:text-green-200 hover:text-green-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-green-400 rounded-full transition-colors duration-150"
          aria-label="Dismiss disclaimer notification"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
}

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
          <svg className="animate-spin h-12 w-12 text-green-600 dark:text-green-400 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
      {/* Disclaimer Notification */}
      <DisclaimerNotification />
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
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
  // Back to Top button
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (showLoader) {
    return (
      <div className={`fixed inset-0 flex flex-col items-center justify-center z-50 min-h-screen w-full ${isDark ? 'bg-gradient-to-br from-green-900 via-green-700 to-green-500' : 'bg-gradient-to-br from-green-200 via-green-400 to-white'} transition-colors`}>
        {/* 3D Tree Loader from Uiverse.io */}
        <div className="flex flex-col items-center z-10 animate-fadeInSlow">
          <div className="container" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="tree">
              {[0,1,2,3].map(x => (
                <div className="branch" style={{ '--x': x } as React.CSSProperties} key={x}>
                  {[0,1,2,3].map(i => <span key={i} style={{ '--i': i } as React.CSSProperties}></span>)}
                </div>
              ))}
              <div className="stem">
                {[0,1,2,3].map(i => <span key={i} style={{ '--i': i } as React.CSSProperties}></span>)}
              </div>
              <span className="shadow"></span>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes fadeInSlow { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }
          .animate-fadeInSlow { animation: fadeInSlow 1.2s cubic-bezier(0.4,0,0.2,1) both; }
          .container {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .tree {
            position: relative;
            width: 50px;
            height: 50px;
            transform-style: preserve-3d;
            transform: rotateX(-20deg) rotateY(30deg);
            animation: treeAnimate 5s linear infinite;
          }
          @keyframes treeAnimate {
            0% { transform: rotateX(-20deg) rotateY(360deg); }
            100% { transform: rotateX(-20deg) rotateY(0deg); }
          }
          .tree div {
            position: absolute;
            top: -50px;
            left: 0;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            transform: translateY(calc(25px * var(--x))) translateZ(0px);
          }
          .tree div.branch span {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #69c069, #77dd77);
            clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
            border-bottom: 5px solid #00000019;
            transform-origin: bottom;
            transform: rotateY(calc(90deg * var(--i))) rotateX(30deg) translateZ(28.5px);
          }
          .tree div.stem span {
            position: absolute;
            top: 110px;
            left: calc(50% - 7.5px);
            width: 15px;
            height: 50%;
            background: linear-gradient(90deg, #bb4622, #df7214);
            border-bottom: 5px solid #00000019;
            transform-origin: bottom;
            transform: rotateY(calc(90deg * var(--i))) translateZ(7.5px);
          }
          .shadow {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            filter: blur(20px);
            transform-style: preserve-3d;
            transform: rotateX(90deg) translateZ(-65px);
          }
        `}</style>
      </div>
    );
  }
  return (
    <div className="min-h-screen font-['Poppins','Comic Neue','Comic Sans MS','cursive'] relative">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10 animate-gradient bg-gradient-to-br from-green-200 via-blue-100 to-pink-200 dark:from-gray-900 dark:via-gray-950 dark:to-green-950" />
      <StarsBackground />
      {/* Disclaimer Notification */}
      <DisclaimerNotification />
      {/* Glassmorphism sticky header */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-lg border-b border-gray-200 dark:border-gray-800">
        <Header />
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 drop-shadow-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 font-['Luckiest_Guy','Poppins','Comic Neue','Comic Sans MS','cursive'] tracking-wide">
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
      {/* Floating Back to Top button */}
      {showTop && (
        <button
          className="fixed bottom-8 right-8 z-50 bg-blue-700 text-white rounded-full p-3 shadow-lg hover:bg-pink-600 transition-all animate-bounce"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-7 w-7"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
        </button>
      )}
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
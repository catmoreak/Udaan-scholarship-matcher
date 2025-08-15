import React, { useState } from 'react';
import {  Users, MapPin } from 'lucide-react';
import { Scholarship } from '../types/scholarship';

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship }) => {
  const [geminiOpen, setGeminiOpen] = useState(false);
  const [geminiInput, setGeminiInput] = useState('');
  const [geminiLoading, setGeminiLoading] = useState(false);
  const [geminiAnswer, setGeminiAnswer] = useState('');
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // Fetch default info when modal opens
  React.useEffect(() => {
    if (geminiOpen) {
      const fetchDefaultInfo = async () => {
        setGeminiLoading(true);
        setGeminiAnswer('');
  const systemPrompt = `You are an expert on scholarships. In less than 200 words, give a concise, well-structured summary using bullet points or short sections, and only the most important information specifically about the following scholarship. Do not include general advice or unrelated content.\nScholarship: ${scholarship.name}\nDescription: ${scholarship.description}`;
        try {
          const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-goog-api-key': apiKey,
            },
            body: JSON.stringify({
              contents: [
                { role: 'user', parts: [{ text: systemPrompt }] }
              ]
            })
          });
          const data = await res.json();
          setGeminiAnswer(data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, no info found.');
        } catch {
          setGeminiAnswer('Error contacting Gemini AI.');
        }
        setGeminiLoading(false);
      };
      fetchDefaultInfo();
    }
  }, [geminiOpen, scholarship.name, scholarship.description, apiKey]);

  const handleGeminiAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeminiLoading(true);
    setGeminiAnswer('');
  const systemPrompt = `You are an expert on scholarships. Answer the user's question in less than 200 words, and only provide information specifically about the following scholarship. Use bullet points or short sections for clarity. Do not include general advice or unrelated content.\nScholarship: ${scholarship.name}\nDescription: ${scholarship.description}`;
    try {
      const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: systemPrompt }] },
            { role: 'user', parts: [{ text: geminiInput }] }
          ]
        })
      });
      const data = await res.json();
      setGeminiAnswer(data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, no answer found.');
    } catch {
      setGeminiAnswer('Error contacting Gemini AI.');
    }
    setGeminiLoading(false);
  };

  return (
    <>
      <div
        className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 group overflow-hidden transition-all duration-300 animate-fadeIn"
        style={{ animationDelay: `${Math.random() * 0.2 + 0.05}s` }}
      >
        {/* Animated gradient border on hover (green) */}
        <div className="absolute inset-0 pointer-events-none rounded-xl border-2 border-transparent group-hover:border-green-400 group-hover:animate-borderGradientGreen transition-all duration-500 z-10" />
        <div className="relative p-6 z-20">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                {scholarship.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                by {scholarship.provider}
              </p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
            {scholarship.description}
          </p>
          <div className="space-y-3 mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Users className="h-4 w-4" />
              <span>
                Class {scholarship.eligibility.minClass}-{scholarship.eligibility.maxClass}, 
                Age {scholarship.eligibility.minAge}-{scholarship.eligibility.maxAge}, 
                Min {scholarship.eligibility.minPercentage}%
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4" />
              <span>{scholarship.eligibility.location.join(', ')}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              {/* ...other info if needed... */}
            </div>
          </div>
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {scholarship.eligibility.categories.map((category, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center gap-2">
            <a
              href={scholarship.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="apply-btn inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white dark:bg-gray-900 border border-green-600 dark:border-green-500 text-green-700 dark:text-green-200 font-semibold rounded-full shadow-sm hover:bg-green-50 dark:hover:bg-green-800 hover:text-green-800 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-150 text-base overflow-hidden relative"
              style={{ minWidth: 120 }}
              aria-label="Apply for scholarship"
              onClick={e => {
                const btn = e.currentTarget;
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.left = `${e.nativeEvent.offsetX}px`;
                ripple.style.top = `${e.nativeEvent.offsetY}px`;
                btn.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
              }}
            >
              <span className="pr-1">Apply now</span>
            </a>
            <button
              className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 font-semibold rounded-full border border-green-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 transition-all text-base"
              onClick={() => setGeminiOpen(true)}
              aria-label="Ask AI about this scholarship"
            >
              Ask AI
            </button>
          </div>
        </div>
      </div>
      {/* Gemini Modal rendered at root level to avoid overlap/clipping */}
      {geminiOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl p-0 w-full max-w-xl relative border border-green-200 dark:border-green-700 animate-modalPop backdrop-blur-lg" style={{boxShadow: '0 8px 40px 0 rgba(34,197,94,0.15), 0 1.5px 8px 0 rgba(0,0,0,0.08)'}}>
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-green-100 dark:border-green-800 bg-gradient-to-r from-green-100/60 via-white/80 to-green-200/60 dark:from-green-900/60 dark:via-gray-900/80 dark:to-green-950/60 rounded-t-3xl">
              <div className="flex items-center gap-3">
             
                <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Chat bot</span>
              </div>
              <button
                className="text-gray-400 hover:text-green-600 dark:hover:text-green-300 focus:outline-none rounded-full p-2 transition border border-transparent hover:border-green-200 dark:hover:border-green-700 bg-white/60 dark:bg-gray-800/60"
                onClick={() => { setGeminiOpen(false); setGeminiInput(''); setGeminiAnswer(''); }}
                aria-label="Close Gemini dialog"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-green-200 dark:via-green-800 to-transparent" />
            {/* Content */}
            <div className="px-8 py-7">
              <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">About this scholarship</h4>
              <div className="bg-green-50/80 dark:bg-green-900/40 border border-green-200 dark:border-green-700 rounded-xl p-5 text-green-900 dark:text-green-200 whitespace-pre-line min-h-[72px] mb-6 shadow-inner backdrop-blur-sm">
                {geminiLoading && !geminiAnswer && <span>Loading info...</span>}
                {geminiAnswer}
              </div>
              <form onSubmit={handleGeminiAsk} className="flex gap-3 mt-2">
                <input
                  className="flex-1 border border-green-300 dark:border-green-700 rounded-xl px-5 py-3 text-gray-900 dark:text-white bg-white/80 dark:bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm transition text-base placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  value={geminiInput}
                  onChange={e => setGeminiInput(e.target.value)}
                  placeholder="Ask a follow-up question... (optional)"
                  disabled={geminiLoading}
                />
                <button type="submit" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-7 py-3 rounded-xl font-bold shadow-md transition disabled:opacity-60 text-base flex items-center justify-center min-w-[80px]" disabled={geminiLoading}>
                  {geminiLoading ? (
                    <svg className="animate-spin h-5 w-5 mx-auto text-white" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>
                  ) : 'Ask'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScholarshipCard;

// Tailwind CSS custom animations (add to your global CSS if not present)
// .animate-fadeIn { animation: fadeIn 0.7s cubic-bezier(0.4,0,0.2,1) both; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none; } }
// .group-hover\:animate-borderGradientGreen:hover { animation: borderGradientGreen 1.2s linear infinite; }
// @keyframes borderGradientGreen {
//   0% { border-color: #4ade80; }
//   50% { border-color: #22c55e; }
//   100% { border-color: #4ade80; }
// }
// .apply-btn .ripple {
//   position: absolute;
//   border-radius: 9999px;
//   transform: scale(0);
//   animation: ripple 0.6s linear;
//   background: rgba(34,197,94,0.25);
//   pointer-events: none;
//   width: 120px; height: 120px;
//   z-index: 30;
//   opacity: 0.7;
// }
// @keyframes ripple {
//   to { transform: scale(2.5); opacity: 0; }
// }
// .apply-btn .ripple {
//   position: absolute;
//   border-radius: 9999px;
//   transform: scale(0);
//   animation: ripple 0.6s linear;
//   background: rgba(59,130,246,0.25);
//   pointer-events: none;
//   width: 120px; height: 120px;
//   z-index: 30;
//   opacity: 0.7;
// }
// @keyframes ripple {
//   to { transform: scale(2.5); opacity: 0; }
// }
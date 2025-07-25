import React, { useState, useEffect } from 'react';

const QUESTIONS = [
  {
    q: 'How do I apply for a scholarship?',
    a: 'You can apply by clicking the "Apply now" button on any scholarship card. This will take you to the official website for that scholarship.'
  },
  {
    q: 'What documents are required?',
    a: 'Common documents include mark sheets, ID proof, income certificate, and category certificate. Each scholarship may have specific requirements.'
  },
  {
    q: 'Can I apply for more than one scholarship?',
    a: 'Yes, you can apply for multiple scholarships if you meet the eligibility criteria for each.'
  },
  {
    q: 'How do I know if I am eligible?',
    a: 'Use the filter form to enter your details. The platform will show scholarships matching your profile.'
  },
  {
    q: 'Who can I contact for help?',
    a: 'You can reach out to the support team via the contact information provided on the scholarship website.'
  }
];

const ChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  // Tooltip animation state
  const [showTooltip, setShowTooltip] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    let shakeTimeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;
    const trigger = () => {
      setShowTooltip(true);
      setShake(true);
      shakeTimeout = setTimeout(() => setShake(false), 700);
      setTimeout(() => setShowTooltip(false), 2000);
    };
    trigger();
    interval = setInterval(trigger, 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(shakeTimeout);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative group">
        <button
          onClick={() => setOpen((v) => !v)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-0 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center border-4 border-white dark:border-gray-800"
          aria-label="Open chat bot"
          style={{ width: 56, height: 56 }}
        >
          {/* Chatbot robot icon with antenna and chat bubble mouth */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-8 h-8">
            {/* Head */}
            <ellipse cx="32" cy="36" rx="20" ry="16" fill="#2563eb" />
            {/* Face */}
            <ellipse cx="32" cy="36" rx="17" ry="13.5" fill="#fff" />
            {/* Eyes */}
            <circle cx="25" cy="36" r="2" fill="#2563eb" />
            <circle cx="39" cy="36" r="2" fill="#2563eb" />
            {/* Chat bubble mouth */}
            <rect x="27" y="42" width="10" height="4" rx="2" fill="#3b82f6" />
            <rect x="29" y="44" width="6" height="2" rx="1" fill="#2563eb" />
            {/* Antenna */}
            <rect x="30.5" y="16" width="3" height="8" rx="1.5" fill="#3b82f6" />
            <circle cx="32" cy="15" r="2" fill="#fff" stroke="#2563eb" strokeWidth="1" />
            {/* Ears */}
            <rect x="12" y="34" width="4" height="8" rx="2" fill="#3b82f6" />
            <rect x="48" y="34" width="4" height="8" rx="2" fill="#3b82f6" />
          </svg>
        </button>
        {/* Tooltip: shakes and appears every 5s, also on hover */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 -top-12 z-50 pointer-events-none transition-opacity duration-200 ${
            (showTooltip ? 'opacity-100' : 'opacity-0')
          } group-hover:opacity-100`}
        >
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm font-medium shadow-2xl border-l-4 border-blue-500 dark:border-blue-400 ${
              shake ? 'animate-shake' : ''
            }`}
            style={{ minWidth: 120 }}
          >
            {/* Info icon */}
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="flex-shrink-0" aria-hidden="true">
              <circle cx="10" cy="10" r="9" fill="#3b82f6" />
              <text x="10" y="15" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff" fontFamily="Arial" dominantBaseline="middle">i</text>
            </svg>
            <span>Need help?</span>
          </div>
        </div>
      </div>


      {open && (
        <div className="w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl mt-4 p-4">
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Udaan ChatBot</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Ask a question:</p>
          <ul className="space-y-2 mb-4">
            {QUESTIONS.map((item, idx) => (
              <li key={idx}>
                <button
                  className="w-full text-left px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-800 text-gray-900 dark:text-white transition-colors"
                  onClick={() => setSelected(idx)}
                >
                  {item.q}
                </button>
              </li>
            ))}
          </ul>
          {selected !== null && (
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-3 text-blue-900 dark:text-blue-200">
              <strong>Answer:</strong>
              <p className="mt-1 text-sm">{QUESTIONS[selected].a}</p>
            </div>
          )}
          <button
            className="mt-4 text-xs text-gray-500 hover:underline"
            onClick={() => setSelected(null)}
          >
            {selected !== null ? 'Back to questions' : 'Close'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBot;

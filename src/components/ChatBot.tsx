import React, { useState } from 'react';

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

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setOpen((v) => !v)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Open chat bot"
      >
        💬
      </button>
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

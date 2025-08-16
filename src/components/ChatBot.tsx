import React, { useState, useEffect } from 'react';



const ChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;


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
    interval = setInterval(trigger, 12000);
    return () => {
      clearInterval(interval);
      clearTimeout(shakeTimeout);
    };
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { sender: 'user', text: input }]);
    setLoading(true);
   
    const systemPrompt = "You are a helpful assistant for an education scholarship platform. Only answer questions related to education scholarships. If a question is not about education scholarships, politely reply that you can only answer questions about education and scholarships.";
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
            { role: 'user', parts: [{ text: input }] }
          ]
        })
      });
      const data = await res.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not find an answer.';
      setMessages(msgs => [...msgs, { sender: 'bot', text: aiText }]);
    } catch {
      setMessages(msgs => [...msgs, { sender: 'bot', text: 'Error contacting Gemini AI.' }]);
    }
    setInput('');
    setLoading(false);
  };

  useEffect(() => {
    if (maximized && open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [maximized, open]);

  return (
    <div className={maximized ? "fixed inset-0 z-50 flex items-center justify-center bg-black/30" : "fixed bottom-8 right-8 z-50"}>
      {/* Floating button only when not maximized and not open */}
      {!open && !maximized && (
        <div className="relative group">
          <button
            onClick={() => setOpen((v) => !v)}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg p-0 focus:outline-none focus:ring-2 focus:ring-green-400 flex items-center justify-center border-4 border-white dark:border-gray-800"
            aria-label="Open chat bot"
            style={{ width: 56, height: 56 }}
          >
            {/* Chatbot robot icon with antenna and chat bubble mouth (green theme) */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-8 h-8">
              {/* Head */}
              <ellipse cx="32" cy="36" rx="20" ry="16" fill="#22c55e" />
              {/* Face */}
              <ellipse cx="32" cy="36" rx="17" ry="13.5" fill="#fff" />
              {/* Eyes */}
              <circle cx="25" cy="36" r="2" fill="#22c55e" />
              <circle cx="39" cy="36" r="2" fill="#22c55e" />
              {/* Chat bubble mouth */}
              <rect x="27" y="42" width="10" height="4" rx="2" fill="#4ade80" />
              <rect x="29" y="44" width="6" height="2" rx="1" fill="#22c55e" />
              {/* Antenna */}
              <rect x="30.5" y="16" width="3" height="8" rx="1.5" fill="#4ade80" />
              <circle cx="32" cy="15" r="2" fill="#fff" stroke="#22c55e" strokeWidth="1" />
              {/* Ears */}
              <rect x="12" y="34" width="4" height="8" rx="2" fill="#4ade80" />
              <rect x="48" y="34" width="4" height="8" rx="2" fill="#4ade80" />
            </svg>
          </button>
        
          <div
            className={`absolute left-1/2 -translate-x-1/2 -top-12 z-50 pointer-events-none transition-opacity duration-200 ${
              (showTooltip ? 'opacity-100' : 'opacity-0')
            } group-hover:opacity-100`}
          >
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm font-medium shadow-2xl border-l-4 border-green-500 dark:border-green-400 ${
                shake ? 'animate-shake' : ''
              }`}
              style={{ minWidth: 120 }}
            >
           
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="flex-shrink-0" aria-hidden="true">
                <circle cx="10" cy="10" r="9" fill="#4ade80" />
                <text x="10" y="15" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff" fontFamily="Arial" dominantBaseline="middle">i</text>
              </svg>
              <span>Need help ?</span>
            </div>
          </div>
        </div>
      )}

      {open && (
        <div
          className={
            (maximized
              ? "w-full h-full max-w-none max-h-none rounded-none m-0 bg-gradient-to-br from-white via-green-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-0 shadow-none"
              : "w-96 max-w-full bg-gradient-to-br from-white via-green-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl mt-4 p-0"
            ) + " relative flex flex-col z-50 animate-fadeIn"}
          style={maximized ? { height: '100vh' } : { height: 480 }}
        >
          {/* Header */}
          <div className={(maximized ? "rounded-none" : "rounded-t-2xl") + " flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"}>
            <div className="flex items-center gap-3">
              <svg className="h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                <ellipse cx="32" cy="36" rx="20" ry="16" fill="#22c55e" />
                <ellipse cx="32" cy="36" rx="17" ry="13.5" fill="#fff" />
                <circle cx="25" cy="36" r="2" fill="#22c55e" />
                <circle cx="39" cy="36" r="2" fill="#22c55e" />
                <rect x="27" y="42" width="10" height="4" rx="2" fill="#4ade80" />
                <rect x="29" y="44" width="6" height="2" rx="1" fill="#22c55e" />
                <rect x="30.5" y="16" width="3" height="8" rx="1.5" fill="#4ade80" />
                <circle cx="32" cy="15" r="2" fill="#fff" stroke="#22c55e" strokeWidth="1" />
                <rect x="12" y="34" width="4" height="8" rx="2" fill="#4ade80" />
                <rect x="48" y="34" width="4" height="8" rx="2" fill="#4ade80" />
              </svg>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">Udaan Chat bot</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">Your AI Assistant</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-green-400 rounded-full"
                aria-label={maximized ? "Restore chatbot window" : "Maximize chatbot window"}
                onClick={() => setMaximized((v) => !v)}
                title={maximized ? "Restore" : "Maximize"}
              >
                {maximized ? (
                  // Restore icon (arrow in)
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <polyline points="16 12 12 16 8 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="12 8 12 16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  // Maximize icon (arrow out)
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <polyline points="8 12 12 8 16 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="12 16 12 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
              <button
                className="text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-green-400 rounded-full"
                aria-label="Close chatbot"
                onClick={() => { setOpen(false); setMaximized(false); }}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
          {/* Chat area */}
          <div className={maximized ? "flex-1 overflow-y-auto px-12 py-8 space-y-4 bg-transparent" : "flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-transparent"}>
            {messages.length === 0 && (
              <div className="text-center text-gray-400 dark:text-gray-500 text-base mt-12 select-none">
                Ask me anything about education and scholarships!
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={
                  msg.sender === 'user'
                    ? 'bg-green-600 text-white rounded-br-2xl rounded-tl-2xl rounded-tr-md px-4 py-2 max-w-xs shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-2xl rounded-tr-2xl rounded-tl-md px-4 py-2 max-w-xs shadow-sm'
                }>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          {/* Input area */}
          <form onSubmit={handleSend} className={(maximized ? "flex gap-3 px-12 py-6 border-t border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 rounded-none" : "flex gap-2 px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 rounded-b-2xl") + " backdrop-blur-md"}>
            <input
              className="flex-1 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about education scholarships..."
              disabled={loading}
              required
            />
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition disabled:opacity-60" disabled={loading || !input.trim()}>
              {loading ? '...' : 'Send'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;

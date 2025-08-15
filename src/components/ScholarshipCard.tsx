import React from 'react';
import {  Users, MapPin } from 'lucide-react';
import { Scholarship } from '../types/scholarship';

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship }) => {
  return (
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
          {/* Amount removed as requested */}
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

        <div className="flex justify-between items-center">
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
        </div>
      </div>
    </div>
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
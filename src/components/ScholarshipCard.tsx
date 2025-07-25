import React from 'react';
import {  Users, MapPin } from 'lucide-react';
import { Scholarship } from '../types/scholarship';

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {scholarship.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              by {scholarship.provider}
            </p>
          </div>
          <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
            
            <span className="font-semibold">{scholarship.amount}</span>
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
            
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {scholarship.eligibility.categories.map((category, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
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
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white dark:bg-gray-900 border border-blue-600 dark:border-blue-500 text-blue-700 dark:text-blue-200 font-semibold rounded-full shadow-sm hover:bg-blue-50 dark:hover:bg-blue-800 hover:text-blue-800 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-150 text-base"
            style={{ minWidth: 120 }}
            aria-label="Apply for scholarship"
          >
            <span className="pr-1">Apply now</span>
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg> */}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
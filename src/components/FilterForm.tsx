import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { FilterCriteria } from '../types/scholarship';

interface FilterFormProps {
  onFilter: (criteria: FilterCriteria) => void;
  loading: boolean;
}

const FilterForm: React.FC<FilterFormProps> = ({ onFilter, loading }) => {
  const [criteria, setCriteria] = useState<FilterCriteria>({
    class: 10,
    age: 16,
    percentage: 75,
    category: 'General',
    religion: 'Any',
    location: 'Urban',
    disability: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(criteria);
  };

  const categories = ['General', 'OBC', 'SC', 'ST', 'EWS'];
  const religions = ['Any', 'Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Other'];
  const locations = ['Urban', 'Rural', 'Both'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
      <div className="flex items-center space-x-2 mb-6">
  <Filter className="h-5 w-5 text-green-600 dark:text-green-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Find Your Perfect Scholarship
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Class/Grade
            </label>
            <select
              value={criteria.class}
              onChange={(e) => setCriteria({...criteria, class: Number(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {Array.from({length: 13}, (_, i) => i + 1).map(grade => (
                <option key={grade} value={grade}>Class {grade}</option>
              ))}
              <option value={13}>Undergraduate</option>
              <option value={14}>Postgraduate</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Age
            </label>
            <input
              type="number"
              min="5"
              max="35"
              value={criteria.age}
              onChange={(e) => setCriteria({...criteria, age: Number(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Academic Percentage
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={criteria.percentage}
              onChange={(e) => setCriteria({...criteria, percentage: Number(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={criteria.category}
              onChange={(e) => setCriteria({...criteria, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Religion
            </label>
            <select
              value={criteria.religion}
              onChange={(e) => setCriteria({...criteria, religion: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {religions.map(religion => (
                <option key={religion} value={religion}>{religion}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <select
              value={criteria.location}
              onChange={(e) => setCriteria({...criteria, location: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="disability"
            checked={criteria.disability}
            onChange={(e) => setCriteria({...criteria, disability: e.target.checked})}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label htmlFor="disability" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Person with Disability (PWD)
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-600 to-lime-500 hover:from-green-700 hover:to-lime-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Search className="h-5 w-5" />
          <span>{loading ? 'Searching...' : 'Find Scholarships'}</span>
        </button>
      </form>
    </div>
  );
};

export default FilterForm;
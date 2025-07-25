import React from 'react';
import { Award, Users, DollarSign, BookOpen } from 'lucide-react';

interface StatsProps {
  totalScholarships: number;
  matchingScholarships: number;
}

const Stats: React.FC<StatsProps> = ({ totalScholarships, matchingScholarships }) => {
  const stats = [
    {
      label: 'Total Scholarships',
      value: totalScholarships,
      icon: BookOpen,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900'
    },
    {
      label: 'Matching Your Criteria',
      value: matchingScholarships,
      icon: Award,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-100 dark:bg-green-900'
    },
    {
      label: 'Average Amount',
      value: '₹2.5L',
      icon: DollarSign,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-100 dark:bg-purple-900'
    },
    {
      label: 'Students Helped',
      value: '10K+',
      icon: Users,
      color: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-100 dark:bg-orange-900'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
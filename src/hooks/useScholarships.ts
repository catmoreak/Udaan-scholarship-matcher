import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Scholarship, FilterCriteria } from '../types/scholarship';

export const useScholarships = () => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('scholarships')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code === '42P01') {
          throw new Error('Database table not found. Please run the migration to create the scholarships table.');
        }
        throw error;
      }

      setScholarships(data || []);
      setFilteredScholarships(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch scholarships';
      setError(errorMessage);
      console.error('Error fetching scholarships:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterScholarships = (criteria: FilterCriteria) => {
    const filtered = scholarships.filter(scholarship => {
      const { eligibility } = scholarship;
      
      // Check class range
      if (criteria.class < eligibility.minClass || criteria.class > eligibility.maxClass) {
        return false;
      }
      
      // Check age range
      if (criteria.age < eligibility.minAge || criteria.age > eligibility.maxAge) {
        return false;
      }
      
      // Check percentage
      if (criteria.percentage < eligibility.minPercentage) {
        return false;
      }
      
      // Check category
      if (!eligibility.categories.includes(criteria.category) && !eligibility.categories.includes('All')) {
        return false;
      }
      
      // Check religion
      if (criteria.religion !== 'Any' && !eligibility.religions.includes(criteria.religion) && !eligibility.religions.includes('All')) {
        return false;
      }
      
      // Check location
      if (!eligibility.location.includes(criteria.location) && !eligibility.location.includes('Both')) {
        return false;
      }
      
      // Check disability requirement
      if (eligibility.disability && !criteria.disability) {
        return false;
      }
      
      return true;
    });
    
    setFilteredScholarships(filtered);
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  return {
    scholarships,
    filteredScholarships,
    loading,
    error,
    filterScholarships,
    refetch: fetchScholarships
  };
};
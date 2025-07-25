export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: string;
  description: string;
  eligibility: {
    minClass: number;
    maxClass: number;
    minAge: number;
    maxAge: number;
    minPercentage: number;
    categories: string[];
    religions: string[];
    location: string[];
    disability: boolean;
    income_limit?: string;
  };
  application_deadline: string;
  benefits: string[];
  website_url: string;
  created_at: string;
}

export interface FilterCriteria {
  class: number;
  age: number;
  percentage: number;
  category: string;
  religion: string;
  location: string;
  disability: boolean;
}
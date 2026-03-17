
export interface UserProfile {
  age: number;
  location: string;
  income: string;
  caste: string;
  occupation: string;
}

export interface Scheme {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  eligibilitySummary: string;
  category: 'Central' | 'State';
  sourceUrl: string;
  relevanceScore: number;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

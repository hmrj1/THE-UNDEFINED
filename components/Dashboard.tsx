import React, { useEffect, useState } from 'react';
import { UserProfile, Scheme } from '../types';
import { findSchemes } from '../services/geminiService';
import SchemeCard from './SchemeCard';

interface Props {
  profile: UserProfile;
  schemes: Scheme[];
  setSchemes: (s: Scheme[]) => void;
}

const Dashboard: React.FC<Props> = ({ profile, schemes, setSchemes }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sources, setSources] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await findSchemes(profile);
        setSchemes(result.schemes);
        setSources(result.sources);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch schemes');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Analyzing your profile...</h2>
        <p className="text-slate-500">Checking 500+ Central and {profile.location} State schemes.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-red-600 mb-2">Something went wrong</h2>
        <p className="text-slate-500 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Your Eligibility Dashboard</h1>
          <div className="flex flex-wrap gap-2">
            <Badge label={`${profile.age} Years`} />
            <Badge label={profile.location} />
            <Badge label={profile.occupation} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl font-bold">
            {schemes.length}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Matches Found</p>
            <p className="text-slate-700 font-semibold">Ready for application</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {schemes.map((scheme, idx) => (
          <SchemeCard key={idx} scheme={scheme} />
        ))}
      </div>

      {schemes.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 text-lg">No exact matches found for current criteria.</p>
          <p className="text-slate-500 mt-2">Try adjusting your income or occupation details.</p>
        </div>
      )}

      {sources.length > 0 && (
        <div className="mt-16 p-8 bg-slate-100 rounded-[2rem]">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Verification Sources</h2>
          <div className="flex flex-wrap gap-4">
            {sources.map((source, idx) => (
              source.web && (
                <a 
                  key={idx} 
                  href={source.web.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white px-4 py-2 rounded-full text-xs font-semibold text-blue-600 hover:text-blue-800 border border-slate-200 shadow-sm transition"
                >
                  🔗 {source.web.title || 'Official Source'}
                </a>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Badge = ({ label }: { label: string }) => (
  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full border border-slate-200 uppercase tracking-wide">
    {label}
  </span>
);

export default Dashboard;
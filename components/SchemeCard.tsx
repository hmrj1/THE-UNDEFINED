
import React from 'react';
import { Scheme } from '../types';

interface Props {
  scheme: Scheme;
}

const SchemeCard: React.FC<Props> = ({ scheme }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 overflow-hidden flex flex-col h-full">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            scheme.category === 'Central' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
          }`}>
            {scheme.category} Govt
          </span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Match: {scheme.relevanceScore}%</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2">{scheme.title}</h3>
        <p className="text-sm text-slate-500 mb-6 line-clamp-3 leading-relaxed">{scheme.description}</p>

        <div className="space-y-4 mb-6">
          <div className="bg-slate-50 p-4 rounded-xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Key Benefits</p>
            <ul className="space-y-2">
              {scheme.benefits.slice(0, 3).map((b, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="text-green-500 mt-0.5 font-bold">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Why you fit</p>
            <p className="text-xs text-blue-700 italic">{scheme.eligibilitySummary}</p>
          </div>
        </div>
      </div>

      <div className="mt-auto p-6 pt-0">
        <a 
          href={scheme.sourceUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full text-center py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default SchemeCard;

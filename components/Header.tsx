import React from 'react';

interface Props {
  onHome: () => void;
}

const Header: React.FC<Props> = ({ onHome }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={onHome}
        >
          <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
            S
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900">
            Scheme<span className="text-blue-600">Snap</span>
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-10">
          <a href="#what-we-do" className="text-sm font-black text-slate-500 hover:text-blue-600 transition uppercase tracking-widest">About</a>
          <a href="#categories" className="text-sm font-black text-slate-500 hover:text-blue-600 transition uppercase tracking-widest">Categories</a>
          <button 
            onClick={onHome}
            className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-sm font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
          >
            Start Scan
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
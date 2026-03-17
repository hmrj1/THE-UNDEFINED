import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 text-slate-500 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-16 mb-16">
          <div className="text-center md:text-left">
            <div className="text-slate-900 font-black text-3xl mb-6 flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl">S</div>
              SchemeSnap
            </div>
            <p className="text-base leading-relaxed max-w-sm">
              We leverage AI and real-time data to connect Indian citizens with life-changing government welfare.
            </p>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="text-slate-900 font-black mb-8 uppercase tracking-[0.2em] text-xs">Help & Support</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li className="flex items-center gap-3 justify-center md:justify-start group">
                <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">📧</span>
                <a href="mailto:helpdeskschemesnap@gmail.com" className="hover:text-blue-600 transition">helpdeskschemesnap@gmail.com</a>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start group">
                <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">📞</span>
                <a href="tel:+919661134824" className="hover:text-blue-600 transition">+91 96611 34824</a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-slate-900 font-black mb-8 uppercase tracking-[0.2em] text-xs">Led By</h4>
            <div className="flex flex-col gap-3 font-black text-slate-800 uppercase tracking-widest text-sm">
              <span className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-blue-500">•</span> DIVYAM KUMAR
              </span>
              <span className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-blue-500">•</span> HEMRAJ
              </span>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-400">
          <p>© {new Date().getFullYear()} SchemeSnap. Digital Welfare Initiative.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-blue-600 transition">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition">Security</a>
            <a href="#" className="hover:text-blue-600 transition">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
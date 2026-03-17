import React, { useState } from 'react';
import { UserProfile, Scheme } from './types';
import LandingPage from './components/LandingPage';
import ProfileForm from './components/ProfileForm';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import AIChatAssistant from './components/AIChatAssistant';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'form' | 'dashboard'>('landing');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [schemes, setSchemes] = useState<Scheme[]>([]);

  const startJourney = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView('form');
  };
  
  const handleProfileSubmit = (data: UserProfile) => {
    setProfile(data);
    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Header onHome={goHome} />
      
      <main className="flex-grow">
        {view === 'landing' && <LandingPage onStart={startJourney} />}
        {view === 'form' && (
          <div className="max-w-3xl mx-auto py-24 px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Create Your Profile</h1>
              <p className="text-slate-500 font-medium">This information helps our AI pinpoint schemes specifically for you.</p>
            </div>
            <ProfileForm onSubmit={handleProfileSubmit} />
          </div>
        )}
        {view === 'dashboard' && profile && (
          <div className="bg-sky-50/40 min-h-full py-12">
            <Dashboard 
              profile={profile} 
              schemes={schemes} 
              setSchemes={setSchemes}
            />
          </div>
        )}
      </main>

      {view === 'dashboard' && profile && (
        <AIChatAssistant profile={profile} />
      )}
      
      <Footer />
    </div>
  );
};

export default App;
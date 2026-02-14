
import React, { useState, useEffect } from 'react';
import { View, Language, UserProfile } from './types';
import { TRANSLATIONS } from './constants';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CheckCrowd from './components/CheckCrowd';
import ReportCrowd from './components/ReportCrowd';
import Leaderboard from './components/Leaderboard';
import Insights from './components/Insights';
import Profile from './components/Profile';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [lang, setLang] = useState<Language>('en');
  const [user, setUser] = useState<UserProfile>({
    id: 'user-1',
    username: 'TransitmMaster99',
    trustScore: 88,
    totalPoints: 1250,
    contributions: 42,
    rank: 12
  });

  const t = TRANSLATIONS[lang];

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard lang={lang} setView={setCurrentView} />;
      case 'check':
        return <CheckCrowd lang={lang} />;
      case 'report':
        return <ReportCrowd lang={lang} user={user} setUser={setUser} />;
      case 'leaderboard':
        return <Leaderboard lang={lang} />;
      case 'insights':
        return <Insights lang={lang} />;
      case 'profile':
        return <Profile lang={lang} user={user} />;
      default:
        return <Dashboard lang={lang} setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-teal-500/30">
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        lang={lang} 
        setLang={setLang} 
        t={t}
      />
      <main className="flex-1 overflow-y-auto px-6 py-8 md:px-12">
        <div className="max-w-7xl mx-auto w-full">
          {renderView()}
        </div>
      </main>
      
      {/* Footer / Disclaimer */}
      <footer className="bg-slate-900/50 border-t border-slate-800 py-4 px-6 text-center text-xs text-slate-500">
        <p>{t.disclaimer}</p>
      </footer>
    </div>
  );
};

export default App;


import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import MobileHeader from '../components/dashboard/MobileHeader';
import Sidebar from '../components/dashboard/Sidebar';
import BootcampTab from '../components/dashboard/BootcampTab';
import TrackerTab from '../components/dashboard/TrackerTab';
import ProblemTab from '../components/dashboard/ProblemTab';
import HelpTab from '../components/dashboard/HelpTab';

interface Props {
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<Props> = ({ onNavigate }) => {
  const { currentUser, logout } = useApp();
  const [activeTab, setActiveTab] = useState<'bootcamp' | 'problem' | 'tracker' | 'help'>('bootcamp');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (currentUser?.banned) {
      return (
          <div className="min-h-screen bg-red-950/20 flex items-center justify-center p-6 font-sans">
              <div className="bg-slate-900 p-10 rounded-3xl border border-red-500/50 text-center max-w-md shadow-2xl shadow-red-900/30">
                  <div className="w-24 h-24 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/30">
                     <i className="fa-solid fa-ban text-5xl text-red-500"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Account Suspended</h2>
                  <p className="text-slate-400 mb-8">Your account has been flagged for violating our academic integrity policy (Copy/Paste or Malfeasance detected).</p>
                  <button className="text-sm text-red-400 underline hover:text-white transition-colors">Submit an Appeal</button>
              </div>
          </div>
      )
  }

  return (
    <div className="h-screen flex bg-marlion-bg text-slate-200 font-sans overflow-hidden">
      
      <MobileHeader 
        isOpen={isMobileMenuOpen} 
        onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
      />

      {/* MOBILE SIDEBAR OVERLAY */}
      {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      <Sidebar 
        currentUser={currentUser}
        isOpen={isMobileMenuOpen}
        activeTab={activeTab}
        onTabChange={(tab) => {
            setActiveTab(tab);
            if(window.innerWidth < 768) setIsMobileMenuOpen(false);
        }}
        onLogout={() => { logout(); onNavigate('login'); }}
      />

      {/* MAIN CONTENT AREA - Scrolls Independently */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full mt-16 md:mt-0">
        {activeTab === 'bootcamp' && <BootcampTab />}
        {activeTab === 'tracker' && <TrackerTab />}
        {activeTab === 'problem' && <ProblemTab />}
        {activeTab === 'help' && <HelpTab />}
      </main>
    </div>
  );
};

export default Dashboard;

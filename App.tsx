
import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { UserRole, ApplicationStatus } from './types';
import Home from './pages/Home';
import Register from './pages/Register';
import AIInterview from './pages/AIInterview';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import StatusPage from './pages/StatusPage';

const AppContent: React.FC = () => {
  console.log('updated');
  const { role, currentUser, login } = useApp();
  const [currentPage, setCurrentPage] = useState('home');
  const [email, setEmail] = useState('');

  // Basic hash routing simulation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      if (hash === 'admin') {
        if(role !== UserRole.ADMIN) login('admin@marlion.com', UserRole.ADMIN); 
        setCurrentPage('admin');
      } else if (hash === 'dashboard') {
         setCurrentPage('dashboard');
      } else if (hash === 'status') {
         setCurrentPage('status');
      } else if (hash === '') {
          setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [login, role]);

  // Check status for routing
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.location.hash = `/${page}`;
  };

  // Login view
  if (currentPage === 'login') {
      return (
          <div className="min-h-screen bg-marlion-dark flex items-center justify-center">
              <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 w-full max-w-sm shadow-2xl">
                  <div className="text-center mb-8">
                      <div className="w-12 h-12 bg-gradient-to-br from-marlion-primary to-marlion-accent rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                         <span className="font-mono font-bold text-white text-xl">M</span>
                      </div>
                      <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                  </div>
                  <form onSubmit={(e) => {
                      e.preventDefault();
                      if(email.trim() === 'admin@marlion.com') {
                          if(login(email, UserRole.ADMIN)) {
                              handleNavigate('admin');
                          }
                      } else {
                          if(login(email, UserRole.STUDENT)) {
                              handleNavigate('dashboard');
                          }
                      }
                  }}>
                      <div className="mb-6">
                          <label className="block text-sm text-slate-400 mb-2 font-bold uppercase tracking-wide">Email Address</label>
                          <input 
                              type="email" 
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:border-marlion-primary outline-none transition-all"
                              placeholder="Enter your registered email"
                              required
                          />
                      </div>
                      <button type="submit" className="w-full bg-marlion-primary text-white p-4 rounded-xl font-bold hover:bg-blue-600 mb-6 transition-all shadow-lg shadow-blue-500/20 transform hover:-translate-y-0.5">Login to Portal</button>
                  </form>
                  
                  <div className="text-xs text-slate-500 border-t border-slate-800 pt-6">
                       <p className="font-bold mb-2 text-slate-400">Click to Auto-fill Demo Credentials:</p>
                       <div className="space-y-1">
                           <button onClick={() => setEmail('admin@marlion.com')} className="block w-full text-left hover:text-white hover:bg-slate-800 p-1 rounded transition-colors">
                               Admin: <span className="text-marlion-primary">admin@marlion.com</span>
                           </button>
                           <button onClick={() => setEmail('alice@example.com')} className="block w-full text-left hover:text-white hover:bg-slate-800 p-1 rounded transition-colors">
                               Student (Dashboard): <span className="text-marlion-primary">alice@example.com</span>
                           </button>
                            <button onClick={() => setEmail('bob@example.com')} className="block w-full text-left hover:text-white hover:bg-slate-800 p-1 rounded transition-colors">
                               Student (Status): <span className="text-marlion-primary">bob@example.com</span>
                           </button>
                           <button onClick={() => setEmail('charlie@example.com')} className="block w-full text-left hover:text-white hover:bg-slate-800 p-1 rounded transition-colors">
                               Student (Interview): <span className="text-marlion-primary">charlie@example.com</span>
                           </button>
                       </div>
                  </div>
                  <button onClick={() => handleNavigate('home')} className="w-full text-slate-400 text-sm mt-6 hover:text-white transition-colors">Back to Home</button>
              </div>
          </div>
      )
  }

  if (role === UserRole.ADMIN || currentPage === 'admin') {
      return <Admin />;
  }

  if (currentPage === 'register') return <Register onNavigate={handleNavigate} />;
  
  if (role === UserRole.STUDENT) {
     if (currentUser?.banned) return <Dashboard onNavigate={handleNavigate} />;

     if (currentUser?.status === ApplicationStatus.INTERVIEW_PENDING) {
         return <AIInterview onNavigate={handleNavigate} />;
     }

     if (currentPage === 'status' || 
         currentUser?.status === ApplicationStatus.INTERVIEW_COMPLETED || 
         currentUser?.status === ApplicationStatus.REJECTED || 
         currentUser?.status === ApplicationStatus.OFFER_RELEASED) {
         return <StatusPage onNavigate={handleNavigate} />;
     }

     if (currentUser?.status === ApplicationStatus.IN_PROGRESS || 
         currentUser?.status === ApplicationStatus.OFFER_ACCEPTED ||
         currentUser?.status === ApplicationStatus.COMPLETED) {
         return <Dashboard onNavigate={handleNavigate} />;
     }
  }

  return <Home onNavigate={handleNavigate} />;
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;

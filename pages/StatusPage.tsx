
import React from 'react';
import { useApp } from '../context/AppContext';
import { ApplicationStatus } from '../types';

interface Props {
    onNavigate: (page: string) => void;
}

const StatusPage: React.FC<Props> = ({ onNavigate }) => {
  const { currentUser, updateStudentStatus, logout } = useApp();

  const handleAcceptOffer = () => {
      if (currentUser) {
          updateStudentStatus(currentUser.id, ApplicationStatus.OFFER_ACCEPTED);
          const link = document.createElement('a');
          link.href = 'data:text/plain;charset=utf-8,Marlion%20Offer%20Letter%20Content:%20Congratulations,%20you%20are%20hired!';
          link.download = 'Marlion_Offer_Letter.txt';
          link.click();
          
          setTimeout(() => {
             updateStudentStatus(currentUser.id, ApplicationStatus.IN_PROGRESS);
             onNavigate('dashboard');
          }, 1500);
      }
  };

  const handleBackToHome = () => {
      logout();
      onNavigate('home');
  };

  return (
      <div className="min-h-screen bg-marlion-dark flex items-center justify-center p-6">
          <div className="bg-slate-900 p-8 rounded-xl text-center border border-slate-800 max-w-md w-full shadow-2xl">
              <h2 className="text-2xl font-bold mb-4 text-white">Application Status</h2>
              <div className="text-xl mb-6 text-marlion-primary font-bold uppercase tracking-wide">
                  {currentUser?.status.replace('_', ' ')}
              </div>
              
              {currentUser?.status === ApplicationStatus.OFFER_RELEASED && (
                  <div className="animate-fade-in">
                      <p className="mb-6 text-slate-300">Congratulations! You have been selected for the Marlion Winter Internship 2025.</p>
                      <div className="bg-slate-800 p-5 rounded-xl mb-6 text-left text-sm border border-slate-700 max-h-48 overflow-y-auto">
                          <h4 className="font-bold mb-2 text-white">Rules & Best Practices:</h4>
                          <ul className="list-disc list-inside text-slate-400 space-y-2">
                             <li>Dedicate at least 30 hours per week.</li>
                             <li>Maintain professional conduct in community chats.</li>
                             <li>Adhere to the NDA regarding client projects.</li>
                             <li>Attend all scheduled sync-ups.</li>
                             <li>Submit daily progress logs via the dashboard.</li>
                          </ul>
                      </div>
                      <button onClick={handleAcceptOffer} className="w-full bg-marlion-primary text-white py-4 rounded-xl font-bold hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-transform hover:-translate-y-1">
                          <i className="fa-solid fa-file-signature mr-2"></i> I Agree & Download Offer
                      </button>
                  </div>
              )}

               {currentUser?.status === ApplicationStatus.REJECTED && (
                  <div className="animate-fade-in">
                      <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                          <i className="fa-regular fa-face-frown text-4xl text-slate-500"></i>
                      </div>
                      <p className="mb-6 text-slate-300 leading-relaxed">We appreciate your interest and passion. Unfortunately, we cannot move forward with your application at this time. We verify our selection criteria rigorously.</p>
                      <button onClick={handleBackToHome} className="text-slate-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">Back to Home</button>
                  </div>
              )}

              {(currentUser?.status === ApplicationStatus.INTERVIEW_PENDING || currentUser?.status === ApplicationStatus.INTERVIEW_COMPLETED) && (
                  <div className="animate-fade-in">
                       <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-500/20">
                           <i className="fa-solid fa-hourglass-half text-4xl text-yellow-500 animate-pulse"></i>
                       </div>
                       <p className="mb-2 text-slate-300 font-bold">Application Under Review</p>
                       <p className="mb-6 text-slate-400 text-sm leading-relaxed">Your AI interview responses have been submitted. Our team is reviewing your profile. Please check back in 24 hours.</p>
                       <button onClick={() => window.location.reload()} className="text-sm text-marlion-primary border border-slate-700 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">Refresh Status</button>
                  </div>
              )}
          </div>
      </div>
  );
};

export default StatusPage;

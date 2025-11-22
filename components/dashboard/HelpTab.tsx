
import React from 'react';

const HelpTab: React.FC = () => {
  return (
    <div className="glass-card p-8 md:p-16 rounded-3xl text-center max-w-3xl mx-auto mt-8">
        <div className="w-20 h-20 bg-marlion-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-marlion-primary/20">
        <i className="fa-solid fa-headset text-4xl text-marlion-primary"></i>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-white">AI Help Desk</h2>
        <p className="text-slate-400 mb-10 text-lg leading-relaxed">Describe your technical blocker, bug, or general feedback. Our AI agents will try to assist immediately, or escalate to a human mentor.</p>
        <textarea className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 mb-8 text-white focus:border-marlion-primary focus:outline-none shadow-inner" rows={6} placeholder="I am stuck with..."></textarea>
        <button className="w-full md:w-auto bg-marlion-primary px-10 py-4 rounded-xl text-white font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30 transform hover:-translate-y-1">Submit Ticket</button>
    </div>
  );
};

export default HelpTab;

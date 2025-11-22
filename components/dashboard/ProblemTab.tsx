
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProposalStatus } from '../../types';
import { DEFAULT_PROJECTS } from '../../data/constants';

const ProblemTab: React.FC = () => {
  const { currentUser, updateStudentStatus } = useApp();
  const [proposalText, setProposalText] = useState('');

  const handleSubmitProposal = () => {
      if (currentUser && proposalText.trim()) {
          updateStudentStatus(currentUser.id, currentUser.status, {
              proposalStatus: ProposalStatus.PENDING,
              proposalText: proposalText
          });
          alert("Proposal submitted. Please check back in 24 hours for approval.");
      }
  };

  return (
    <div className="glass-card p-6 md:p-10 rounded-3xl max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">Problem Statement</h2>
        {currentUser?.proposalStatus === ProposalStatus.NOT_SUBMITTED && (
            <>
                <p className="text-slate-400 mb-10 text-base md:text-lg">You can choose the default project curated for your stream or submit your own innovative proposal.</p>
                
                {DEFAULT_PROJECTS.map((project, idx) => (
                    <div key={idx} className="border border-slate-700 bg-slate-900/50 p-6 md:p-8 rounded-2xl mb-10 hover:border-marlion-primary transition-all cursor-pointer group shadow-lg">
                        <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-2">
                            <h3 className="font-bold text-lg md:text-xl text-white group-hover:text-marlion-primary transition-colors">Default Project: {project.title}</h3>
                            {project.recommended && (
                                <span className="text-xs bg-marlion-primary/10 text-marlion-primary px-3 py-1 rounded-full border border-marlion-primary/20 font-bold uppercase tracking-wide">Recommended</span>
                            )}
                        </div>
                        <p className="text-slate-400 mb-6 text-sm leading-loose">{project.description}</p>
                        <button className="w-full md:w-auto bg-slate-800 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-marlion-primary hover:text-white transition-all">Select This Project</button>
                    </div>
                ))}
                
                <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
                    <div className="relative flex justify-center"><span className="px-6 bg-marlion-surface text-slate-500 text-sm font-bold uppercase tracking-widest">OR</span></div>
                </div>

                <div className="mt-10">
                    <h3 className="font-bold text-xl mb-6 text-white">Submit Your Own Proposal</h3>
                    <textarea 
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 mb-6 text-white focus:border-marlion-primary focus:outline-none transition-all shadow-inner" 
                        rows={5}
                        placeholder="Describe your idea in a nutshell..."
                        value={proposalText}
                        onChange={e => setProposalText(e.target.value)}
                    ></textarea>
                    <div className="flex flex-col md:flex-row gap-5">
                        <button className="border border-dashed border-slate-700 flex-1 h-14 rounded-xl flex items-center justify-center hover:bg-slate-900 hover:border-slate-500 text-slate-500 hover:text-white transition-all font-bold">
                            <i className="fa-solid fa-upload mr-2"></i> Upload PDF
                        </button>
                        <button onClick={handleSubmitProposal} className="bg-marlion-primary px-10 py-4 md:py-0 rounded-xl text-white font-bold hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all">Submit Proposal</button>
                    </div>
                </div>
            </>
        )}
        {currentUser?.proposalStatus === ProposalStatus.PENDING && (
            <div className="text-center py-24">
                <div className="w-24 h-24 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-yellow-500/20 shadow-[0_0_40px_rgba(234,179,8,0.1)]">
                    <i className="fa-solid fa-clock text-5xl text-yellow-500 animate-pulse-slow"></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Proposal Under Review</h3>
                <p className="text-slate-400 text-lg">Our mentors are reviewing your submission. Please check back in 24 hours.</p>
            </div>
        )}
            {currentUser?.proposalStatus === ProposalStatus.APPROVED && (
            <div className="text-center py-24">
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20 shadow-[0_0_40px_rgba(34,197,94,0.1)]">
                    <i className="fa-solid fa-check-circle text-5xl text-green-500"></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Proposal Approved!</h3>
                <p className="text-slate-400 text-lg">You may now proceed to the Project Tracker and start building.</p>
            </div>
        )}
    </div>
  );
};

export default ProblemTab;

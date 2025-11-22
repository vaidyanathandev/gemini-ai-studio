
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getCourseContextHelp } from '../../services/gemini';

const BootcampTab: React.FC = () => {
  const { currentUser, banStudent } = useApp();
  const [aiContextChat, setAiContextChat] = useState<{role:string, text:string}[]>([]);
  const [aiChatInput, setAiChatInput] = useState('');
  const [bootcampAnswer, setBootcampAnswer] = useState('');

  const handleAskContextAI = async () => {
      if(!aiChatInput) return;
      const newMsgs = [...aiContextChat, {role:'user', text: aiChatInput}];
      setAiContextChat(newMsgs);
      setAiChatInput('');
      const response = await getCourseContextHelp("React Hooks and State Management", aiChatInput);
      setAiContextChat([...newMsgs, {role: 'model', text: response}]);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      if (currentUser) {
          banStudent(currentUser.id);
          alert("We would rather work with the AI directly than collaborating with a human who would mindlessly copy paste AI generated responses. You have been banned.");
      }
  };

  return (
    <div className="space-y-8 pb-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-white">Module 1: React Fundamentals</h2>
            <span className="w-fit text-xs bg-marlion-primary/10 text-marlion-primary border border-marlion-primary/30 px-3 py-1 rounded-full font-bold uppercase tracking-wide">Required</span>
        </div>
        
        {/* Video Player */}
        <div className="aspect-video bg-black rounded-2xl border border-slate-800 flex items-center justify-center shadow-2xl relative overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
            <div className="w-16 h-16 md:w-24 md:h-24 bg-red-600 rounded-full flex items-center justify-center z-10 shadow-xl group-hover:scale-110 transition-transform">
                <i className="fa-solid fa-play text-2xl md:text-4xl text-white ml-1"></i>
            </div>
            <span className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white font-bold text-sm md:text-lg z-10">Introduction to Hooks</span>
        </div>

        {/* Ask AI Section */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-marlion-primary/20 rounded-lg flex items-center justify-center text-marlion-primary border border-marlion-primary/30">
                    <i className="fa-solid fa-robot"></i>
                </div>
                <div>
                    <h3 className="font-bold text-white text-sm">AI Course Tutor</h3>
                    <p className="text-xs text-slate-400">Ask specific questions about the current video lecture.</p>
                </div>
            </div>
            
            <div className="bg-slate-950/50 rounded-xl p-4 mb-4 max-h-40 overflow-y-auto custom-scrollbar border border-slate-800/50">
                {aiContextChat.length === 0 && (
                    <div className="text-slate-600 text-sm italic text-center py-4">
                        No questions yet. Ask something like "Why use useEffect?"
                    </div>
                )}
                {aiContextChat.map((m, i) => (
                    <div key={i} className={`text-sm mb-2 p-3 rounded-xl leading-relaxed ${m.role==='user' ? 'bg-marlion-primary/20 text-white ml-8 border border-marlion-primary/20' : 'bg-slate-800/50 text-slate-300 mr-8 border border-slate-700/50'}`}>
                        <span className="font-bold text-xs opacity-50 block mb-1 uppercase">{m.role === 'user' ? 'You' : 'AI'}</span>
                        {m.text}
                    </div>
                ))}
            </div>
            
            <div className="flex gap-3 flex-col md:flex-row">
                <input 
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-marlion-primary transition-all" 
                    value={aiChatInput} 
                    onChange={e=>setAiChatInput(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && handleAskContextAI()}
                    placeholder="Ask a context-aware question..." 
                />
                <button onClick={handleAskContextAI} className="bg-marlion-primary hover:bg-blue-600 text-white px-5 py-3 rounded-xl transition-colors font-bold text-sm shadow-lg shadow-blue-500/20">
                    <i className="fa-solid fa-paper-plane mr-2"></i> Ask
                </button>
            </div>
        </div>

        {/* Knowledge Check */}
        <div className="glass-card p-6 md:p-8 rounded-2xl">
            <h3 className="font-bold text-white mb-4 flex items-center gap-3 text-lg"><i className="fa-solid fa-clipboard-question text-marlion-accent"></i> Knowledge Check</h3>
            <p className="text-slate-400 mb-4 leading-relaxed text-sm">Explain 'useEffect' in your own words. <span className="text-red-400 text-[10px] font-bold ml-2 border border-red-400/30 px-2 py-0.5 rounded inline-block mt-1 md:mt-0">NO COPY PASTE</span></p>
            <textarea 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-5 mb-4 text-white focus:border-marlion-primary focus:ring-1 focus:ring-marlion-primary outline-none transition-all shadow-inner" 
                placeholder="Type your answer here..."
                rows={3}
                value={bootcampAnswer}
                onChange={e => setBootcampAnswer(e.target.value)}
                onPaste={handlePaste}
            ></textarea>
            <button className="w-full md:w-auto bg-slate-800 text-white border border-slate-700 px-8 py-3 rounded-xl text-sm font-bold hover:bg-marlion-primary hover:border-marlion-primary transition-all">Submit Answer</button>
        </div>
    </div>
  );
};

export default BootcampTab;

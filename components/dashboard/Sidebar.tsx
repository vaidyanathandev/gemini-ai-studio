
import React, { useState } from 'react';
import { Student } from '../../types';
import { COURSE_CONTENT } from '../../data/constants';

interface Props {
    currentUser: Student | null;
    isOpen: boolean;
    activeTab: string;
    onTabChange: (tab: any) => void;
    onLogout: () => void;
}

const Sidebar: React.FC<Props> = ({ currentUser, isOpen, activeTab, onTabChange, onLogout }) => {
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);

  const toggleSection = (idx: number) => {
    setExpandedSections(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  return (
    <aside className={`
            fixed md:relative inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            md:flex h-full pt-16 md:pt-0 shadow-2xl md:shadow-none
      `}>
        <div className="p-8 border-b border-slate-800 hidden md:block">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-marlion-primary rounded flex items-center justify-center"><span className="font-mono font-bold text-white text-xs">M</span></div>
                <h2 className="font-bold text-xl text-white tracking-tight">Marlion LMS</h2>
            </div>
            <p className="text-xs text-slate-500 truncate pl-8">{currentUser?.name}</p>
        </div>
        
        {/* Mobile User Info in Sidebar */}
        <div className="p-6 border-b border-slate-800 md:hidden bg-slate-950/30">
             <p className="text-sm font-bold text-white">{currentUser?.name}</p>
             <p className="text-xs text-slate-500">{currentUser?.email}</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
            {[
                { id: 'bootcamp', icon: 'fa-graduation-cap', label: 'Bootcamp Kit' },
                { id: 'problem', icon: 'fa-file-code', label: 'Problem Statement' },
                { id: 'tracker', icon: 'fa-list-check', label: 'Project Tracker' },
                { id: 'help', icon: 'fa-headset', label: 'AI Help Desk' },
            ].map(item => (
                <div key={item.id}>
                    <button 
                        onClick={() => onTabChange(item.id)}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${activeTab === item.id ? 'bg-marlion-primary text-white shadow-lg shadow-marlion-primary/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <i className={`fa-solid ${item.icon} w-5 text-center`}></i>
                        <span className="font-medium">{item.label}</span>
                    </button>

                    {/* Sub-menu for Bootcamp Kit */}
                    {item.id === 'bootcamp' && activeTab === 'bootcamp' && (
                        <div className="mt-2 ml-4 pl-4 border-l border-slate-800 space-y-1 animate-fade-in">
                            {COURSE_CONTENT.map((section, idx) => (
                                <div key={idx} className="mb-2">
                                    <button 
                                        onClick={() => toggleSection(idx)}
                                        className="w-full flex justify-between items-center text-xs font-bold text-slate-500 hover:text-white py-2 pr-2 group transition-colors"
                                    >
                                        <span className="truncate">{section.title.split(':')[1] || section.title}</span>
                                        <i className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-300 ${expandedSections.includes(idx) ? 'rotate-180 text-marlion-primary' : ''}`}></i>
                                    </button>
                                    {expandedSections.includes(idx) && (
                                        <div className="space-y-1 ml-1">
                                            {section.lessons.map(lesson => (
                                                <div key={lesson.id} className={`text-[11px] py-1.5 px-2 rounded cursor-pointer flex items-center gap-2 hover:bg-slate-800/50 transition-colors ${lesson.completed ? 'text-slate-400' : 'text-slate-300'}`}>
                                                    {lesson.completed ? <i className="fa-solid fa-check text-green-500 text-[10px]"></i> : 
                                                     lesson.locked ? <i className="fa-solid fa-lock text-slate-600 text-[10px]"></i> :
                                                     <i className="fa-regular fa-circle-play text-marlion-primary text-[10px]"></i>}
                                                    <span className="truncate">{lesson.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </nav>
        <div className="p-6 border-t border-slate-800 bg-slate-950/30">
            <div className="flex justify-between text-xs text-slate-500 mb-2 font-bold uppercase tracking-wider">
                <span>Certificate Progress</span>
                <span className="text-marlion-primary">{currentUser?.progress}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 mb-4 overflow-hidden">
                <div className="bg-gradient-to-r from-marlion-primary to-marlion-success h-full rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{width: `${currentUser?.progress}%`}}></div>
            </div>
            {currentUser?.progress === 100 && (
                 <button className="w-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 py-2.5 rounded-xl text-sm font-bold animate-pulse hover:bg-yellow-500/20 transition-colors shadow-lg shadow-yellow-500/10">Download Certificate</button>
            )}
             <button onClick={onLogout} className="w-full text-left text-red-400 text-sm hover:text-red-300 mt-4 transition-colors flex items-center gap-2 pl-1">
                <i className="fa-solid fa-sign-out-alt"></i> Logout
            </button>
        </div>
    </aside>
  );
};

export default Sidebar;

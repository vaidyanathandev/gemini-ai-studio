
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { KanbanTask, DailyLog } from '../../types';

const TrackerTab: React.FC = () => {
  const { currentUser, addLog } = useApp();
  const [tasks, setTasks] = useState<KanbanTask[]>([
      { id: '1', title: 'Setup Environment', status: 'DONE', description: 'Install Node.js, VS Code' },
      { id: '2', title: 'Complete Module 1', status: 'IN_PROGRESS', description: 'Watch React Basics' },
      { id: '3', title: 'Submit Proposal', status: 'TODO', description: 'Draft problem statement' },
  ]);
  const [newLog, setNewLog] = useState('');

  const handleDrop = (e: React.DragEvent, status: KanbanTask['status']) => {
    const taskId = e.dataTransfer.getData('taskId');
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status } : t));
  };

  const handleAddLog = () => {
      if (currentUser && newLog.trim()) {
          const log: DailyLog = {
              id: Date.now().toString(),
              date: new Date().toLocaleDateString(),
              content: newLog
          };
          addLog(currentUser.id, log);
          setNewLog('');
      }
  };

  return (
    <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Project Tracker</h2>
        <div className="flex flex-col md:grid md:grid-cols-4 gap-6 h-auto md:h-[650px]">
            {['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'].map(status => (
                <div 
                    key={status} 
                    className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800 flex flex-col gap-4"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, status as any)}
                >
                    <h3 className="font-bold text-xs text-slate-500 uppercase tracking-wider flex justify-between px-2">
                        {status.replace('_', ' ')}
                        <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">{tasks.filter(t => t.status === status).length}</span>
                    </h3>
                    {tasks.filter(t => t.status === status).map(task => (
                        <div 
                            key={task.id} 
                            draggable 
                            onDragStart={(e) => e.dataTransfer.setData('taskId', task.id)}
                            className="bg-slate-900 p-5 rounded-xl border border-slate-800 cursor-grab active:cursor-grabbing hover:border-marlion-primary/50 hover:shadow-lg hover:shadow-marlion-primary/10 transition-all group"
                        >
                            <div className="font-bold text-sm text-white group-hover:text-marlion-primary transition-colors">{task.title}</div>
                            <div className="text-xs text-slate-500 mt-2 leading-relaxed">{task.description}</div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
        
        <div className="mt-12">
            <h3 className="font-bold text-xl mb-6 text-white flex items-center gap-2"><i className="fa-solid fa-book-journal-whills text-marlion-accent"></i> Daily Journal</h3>
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 mb-6 shadow-xl">
                 <textarea 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 mb-4 text-white focus:border-marlion-primary focus:outline-none"
                    placeholder="What did you achieve today? Include GitHub links."
                    value={newLog}
                    onChange={e => setNewLog(e.target.value)}
                 />
                 <button 
                    onClick={handleAddLog}
                    className="bg-marlion-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 w-full md:w-auto">Log Entry</button>
            </div>
            <div className="space-y-3">
                {currentUser?.logs?.map(log => (
                    <div key={log.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-sm flex flex-col md:flex-row gap-2 md:gap-4 items-start hover:border-slate-700 transition-colors">
                        <span className="text-marlion-primary font-mono text-xs font-bold py-1.5 px-2.5 bg-marlion-primary/10 rounded-lg border border-marlion-primary/20 h-fit whitespace-nowrap">{log.date}</span>
                        <span className="text-slate-300 leading-relaxed pt-1">{log.content}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default TrackerTab;

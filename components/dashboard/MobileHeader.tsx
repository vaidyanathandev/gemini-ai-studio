
import React from 'react';

interface Props {
    isOpen: boolean;
    onToggle: () => void;
}

const MobileHeader: React.FC<Props> = ({ isOpen, onToggle }) => {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 flex items-center gap-4 px-4 z-50">
         <button onClick={onToggle} className="text-white p-2">
             <i className={`fa-solid ${isOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
         </button>
         <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-marlion-primary rounded flex items-center justify-center"><span className="font-mono font-bold text-white text-xs">M</span></div>
             <span className="font-bold text-lg text-white">Marlion LMS</span>
         </div>
    </div>
  );
};

export default MobileHeader;

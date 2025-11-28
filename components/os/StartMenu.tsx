import React from 'react';
import { useOS } from '../../hooks/useOS';
import { APPS } from '../../constants';
import { Search, Power, User, Settings } from 'lucide-react';

export const StartMenu: React.FC = () => {
  const { isStartMenuOpen, openApp, toggleStartMenu } = useOS();

  if (!isStartMenuOpen) return null;

  return (
    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-[640px] h-[700px] bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl flex flex-col p-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search for apps, settings, and documents" 
          className="w-full bg-slate-950/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
          autoFocus
        />
      </div>

      {/* Pinned Section */}
      <div className="flex-1 overflow-y-auto mb-4">
        <div className="flex justify-between items-center mb-4 px-2">
          <span className="text-sm font-semibold text-white">Pinned</span>
          <button className="text-xs bg-white/5 px-2 py-1 rounded text-slate-300 hover:bg-white/10">All apps &gt;</button>
        </div>
        
        <div className="grid grid-cols-6 gap-2">
          {Object.values(APPS).map((app) => (
            <button 
              key={app.id}
              onClick={() => openApp(app.id)}
              className="flex flex-col items-center gap-2 p-3 hover:bg-white/5 rounded-lg transition-colors group"
            >
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform border border-white/5">
                <app.icon className={`w-7 h-7 ${app.color}`} />
              </div>
              <span className="text-xs text-slate-200 text-center">{app.title}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 mb-4 px-2">
           <span className="text-sm font-semibold text-white">Recommended</span>
        </div>
        <div className="flex flex-col gap-1">
           <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
              <div className="w-8 h-8 bg-blue-900/50 rounded flex items-center justify-center text-blue-300 text-xs font-bold">W</div>
              <div className="flex flex-col">
                 <span className="text-xs text-white">Project_Proposal.docx</span>
                 <span className="text-[10px] text-slate-400">Recently opened</span>
              </div>
           </div>
           <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
              <div className="w-8 h-8 bg-green-900/50 rounded flex items-center justify-center text-green-300 text-xs font-bold">X</div>
              <div className="flex flex-col">
                 <span className="text-xs text-white">Budget_2025.xlsx</span>
                 <span className="text-[10px] text-slate-400">10m ago</span>
              </div>
           </div>
        </div>
      </div>

      {/* Footer */}
      <div className="h-16 border-t border-white/10 -mx-6 -mb-6 mt-2 px-8 flex items-center justify-between bg-slate-950/30 rounded-b-xl">
         <div className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg cursor-pointer transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              <User size={16} />
            </div>
            <span className="text-sm font-medium text-slate-200">Winnux User</span>
         </div>
         <button className="p-2 hover:bg-white/10 rounded-lg text-slate-300 transition-colors">
            <Power size={20} />
         </button>
      </div>
    </div>
  );
};

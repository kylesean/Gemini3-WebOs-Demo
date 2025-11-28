import React from 'react';
import { useOS } from '../../hooks/useOS';
import { Recycle, HardDrive, FileText } from 'lucide-react';

const DesktopIcon = ({ icon: Icon, label, onClick, color = "text-blue-200" }: any) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center gap-1 p-2 w-24 hover:bg-white/10 rounded-lg transition-colors group focus:bg-white/20 focus:outline-none"
  >
    <Icon className={`w-10 h-10 ${color} drop-shadow-xl`} strokeWidth={1.5} />
    <span className="text-xs text-white text-center drop-shadow-md line-clamp-2 leading-tight group-hover:text-white/90">{label}</span>
  </button>
);

export const Desktop: React.FC = () => {
  const { openApp } = useOS();

  return (
    <div 
      className="absolute inset-0 z-0 p-2 grid grid-flow-col grid-rows-[repeat(auto-fill,100px)] gap-2 content-start justify-start"
      onClick={() => { /* Handle background click to deselect */ }}
    >
      <DesktopIcon 
        icon={HardDrive} 
        label="This PC" 
        onClick={() => openApp('explorer')} 
      />
      <DesktopIcon 
        icon={Recycle} 
        label="Recycle Bin" 
        color="text-slate-300"
        onClick={() => {}} 
      />
      <DesktopIcon 
        icon={FileText} 
        label="Welcome.txt" 
        color="text-slate-100"
        onClick={() => openApp('terminal')} 
      />
      <DesktopIcon 
        icon={FileText} 
        label="AI_Guide.md" 
        color="text-slate-100"
        onClick={() => openApp('ai-assistant')} 
      />
    </div>
  );
};

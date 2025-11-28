import React from 'react';
import { Folder, FileText, Image, Music, Film, HardDrive } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active = false }: any) => (
  <div className={`flex items-center gap-3 px-3 py-1.5 rounded-md text-sm cursor-pointer ${active ? 'bg-white/10 text-blue-400' : 'hover:bg-white/5 text-slate-400 hover:text-slate-200'}`}>
    <Icon size={16} />
    <span>{label}</span>
  </div>
);

const FileItem = ({ name, type, size }: { name: string, type: 'folder' | 'file', size?: string }) => (
  <div className="flex flex-col items-center justify-center p-2 hover:bg-white/5 rounded-lg cursor-pointer group w-24">
    {type === 'folder' ? (
       <Folder size={40} className="text-yellow-400 drop-shadow-lg mb-1 group-hover:scale-105 transition-transform" />
    ) : (
       <FileText size={36} className="text-slate-300 drop-shadow-lg mb-1 group-hover:scale-105 transition-transform" />
    )}
    <span className="text-xs text-center text-slate-300 truncate w-full px-1 group-hover:text-white">{name}</span>
    {size && <span className="text-[10px] text-slate-500">{size}</span>}
  </div>
);

export const Explorer: React.FC = () => {
  return (
    <div className="flex h-full bg-slate-900 text-slate-200">
      {/* Sidebar */}
      <div className="w-48 bg-slate-950/30 border-r border-white/5 p-2 flex flex-col gap-1">
         <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Favorites</div>
         <SidebarItem icon={HardDrive} label="Home" active />
         <SidebarItem icon={Folder} label="Documents" />
         <SidebarItem icon={Image} label="Pictures" />
         <SidebarItem icon={Music} label="Music" />
         <SidebarItem icon={Film} label="Videos" />
         <div className="mt-4 px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Drives</div>
         <SidebarItem icon={HardDrive} label="Local Disk (C:)" />
         <SidebarItem icon={HardDrive} label="Root (/)" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Address Bar */}
        <div className="h-12 border-b border-white/5 flex items-center px-4 gap-4 bg-slate-900">
           <div className="flex gap-2">
             <button className="text-slate-400 hover:bg-white/10 p-1 rounded">←</button>
             <button className="text-slate-400 hover:bg-white/10 p-1 rounded">→</button>
             <button className="text-slate-400 hover:bg-white/10 p-1 rounded">↑</button>
           </div>
           <div className="flex-1 bg-slate-950/50 border border-white/10 rounded px-3 py-1 text-sm text-slate-300">
             /home/winnux_user
           </div>
        </div>

        {/* Files Grid */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-2">
             <FileItem name="Documents" type="folder" />
             <FileItem name="Downloads" type="folder" />
             <FileItem name="Pictures" type="folder" />
             <FileItem name="Music" type="folder" />
             <FileItem name="Public" type="folder" />
             <FileItem name=".config" type="folder" />
             <FileItem name="todo.txt" type="file" size="1.2 KB" />
             <FileItem name="install_log.log" type="file" size="45 KB" />
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="h-6 bg-slate-950/50 border-t border-white/5 flex items-center px-3 text-xs text-slate-500 gap-4">
           <span>8 items</span>
           <span>1 item selected</span>
           <span>46 KB</span>
        </div>
      </div>
    </div>
  );
};

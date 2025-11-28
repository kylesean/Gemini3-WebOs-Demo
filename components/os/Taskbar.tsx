import React, { useState, useEffect } from 'react';
import { useOS } from '../../hooks/useOS';
import { APPS } from '../../constants';
import { Search, Wifi, Volume2, Battery } from 'lucide-react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-end justify-center px-2 h-full hover:bg-white/5 rounded-md transition-colors cursor-default">
      <div className="text-xs font-medium leading-tight">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div className="text-[10px] leading-tight text-slate-400">
        {time.toLocaleDateString()}
      </div>
    </div>
  );
};

export const Taskbar: React.FC = () => {
  const { toggleStartMenu, openApp, windows, activeWindowId, minimizeWindow, focusWindow } = useOS();

  // Define pinned apps
  const pinnedApps = ['terminal', 'explorer', 'browser', 'ai-assistant'];

  return (
    <div className="h-12 w-full bg-slate-900/80 backdrop-blur-2xl border-t border-white/10 flex items-center justify-between px-2 absolute bottom-0 z-50">
      
      {/* Weather / Widget Area Placeholder (Left) */}
      <div className="w-32 hidden md:flex items-center px-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
          <div className="text-xs text-slate-300 font-medium">72°F Sunny</div>
      </div>

      {/* Center Icons */}
      <div className="flex-1 flex items-center justify-center gap-1 h-full">
        {/* Start Button */}
        <button 
          onClick={toggleStartMenu}
          className="h-10 w-10 flex items-center justify-center rounded-md hover:bg-white/10 transition-all active:scale-95 group relative"
        >
          <div className="grid grid-cols-2 gap-[1px] p-[2px]">
             <div className="w-2 h-2 bg-blue-400 rounded-[1px]"></div>
             <div className="w-2 h-2 bg-blue-400 rounded-[1px]"></div>
             <div className="w-2 h-2 bg-blue-400 rounded-[1px]"></div>
             <div className="w-2 h-2 bg-blue-400 rounded-[1px]"></div>
          </div>
        </button>

        {/* Search */}
        <button className="h-10 w-10 flex items-center justify-center rounded-md hover:bg-white/10 transition-all text-slate-300">
          <Search size={20} />
        </button>

        {/* Pinned Apps / Running Apps */}
        {pinnedApps.map(appId => {
          const app = APPS[appId as keyof typeof APPS];
          const isOpen = windows.some(w => w.appId === appId);
          const isActive = windows.find(w => w.appId === appId)?.id === activeWindowId;
          const windowInstance = windows.find(w => w.appId === appId);

          return (
            <button
              key={appId}
              onClick={() => {
                if (isOpen && windowInstance) {
                  if (isActive) minimizeWindow(windowInstance.id);
                  else focusWindow(windowInstance.id);
                } else {
                  openApp(appId as any);
                }
              }}
              className={`h-10 w-10 flex items-center justify-center rounded-md transition-all relative group ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}
            >
              <app.icon className={`w-6 h-6 ${app.color} transition-transform group-hover:-translate-y-1 group-active:scale-90`} />
              {isOpen && (
                <div className={`absolute bottom-0.5 w-1.5 h-1 rounded-full transition-all ${isActive ? 'bg-blue-400 w-3' : 'bg-slate-500'}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* System Tray (Right) */}
      <div className="w-auto flex items-center justify-end gap-1 h-full">
        <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/5 transition-colors cursor-pointer">
           <Wifi size={16} className="text-white" />
           <Volume2 size={16} className="text-white" />
           <Battery size={16} className="text-white" />
        </div>
        <Clock />
        <div className="w-1 h-8 border-l border-slate-700 mx-1"></div>
        <div className="w-1 h-full cursor-pointer hover:bg-white/10"></div> {/* Show Desktop Trigger */}
      </div>
    </div>
  );
};

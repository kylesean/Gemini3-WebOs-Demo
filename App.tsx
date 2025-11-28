import React from 'react';
import { OSProvider, useOS } from './hooks/useOS';
import { Taskbar } from './components/os/Taskbar';
import { Desktop } from './components/os/Desktop';
import { StartMenu } from './components/os/StartMenu';
import { WindowFrame } from './components/os/WindowFrame';
import { Terminal } from './components/apps/Terminal';
import { Explorer } from './components/apps/Explorer';
import { WinnuxAI } from './components/apps/WinnuxAI';
import { AppID } from './types';

// App Registry for Dynamic Rendering
const APP_COMPONENTS: Record<AppID, React.FC<any>> = {
  terminal: Terminal,
  explorer: Explorer,
  'ai-assistant': WinnuxAI,
  browser: () => (
    <div className="h-full w-full bg-white flex flex-col">
       <div className="h-8 bg-slate-100 border-b flex items-center px-2 text-xs text-slate-500">
          https://www.google.com
       </div>
       <iframe src="https://www.google.com/webhp?igu=1" title="Browser" className="flex-1 w-full h-full" />
    </div>
  ),
  settings: () => (
    <div className="p-8 text-slate-200">
       <h1 className="text-2xl font-bold mb-4">Settings</h1>
       <p>Winnux OS Version 1.0.0 (Build 22000)</p>
       <p className="text-slate-400 mt-2">Hybrid Kernel Architecture</p>
    </div>
  ),
  calculator: () => <div className="p-4 text-white">Calculator App Placeholder</div>
};

const OSInterface = () => {
  const { windows } = useOS();

  return (
    <>
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ 
          backgroundImage: 'url(https://picsum.photos/1920/1080?grayscale&blur=2)',
        }} 
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <Desktop />
      
      {/* Window Manager Layer */}
      {windows.map(windowState => {
        const AppContent = APP_COMPONENTS[windowState.appId];
        return (
          <WindowFrame key={windowState.id} windowState={windowState}>
             <AppContent windowId={windowState.id} />
          </WindowFrame>
        );
      })}

      <Taskbar />
      <StartMenu />
    </>
  );
};

function App() {
  return (
    <OSProvider>
      <div className="relative w-screen h-screen overflow-hidden bg-black font-sans selection:bg-blue-500/30">
        <OSInterface />
      </div>
    </OSProvider>
  );
}

export default App;

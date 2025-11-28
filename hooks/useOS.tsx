import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AppID, WindowState } from '../types';
import { APPS } from '../constants';

interface OSContextType {
  windows: WindowState[];
  activeWindowId: string | null;
  isStartMenuOpen: boolean;
  toggleStartMenu: () => void;
  openApp: (appId: AppID) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export const OSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [zIndexCounter, setZIndexCounter] = useState(10);

  const toggleStartMenu = useCallback(() => {
    setIsStartMenuOpen(prev => !prev);
  }, []);

  const focusWindow = useCallback((id: string) => {
    setActiveWindowId(id);
    setZIndexCounter(prev => prev + 1);
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: zIndexCounter + 1, isMinimized: false } : w
    ));
    setIsStartMenuOpen(false); // Close start menu when focusing a window
  }, [zIndexCounter]);

  const openApp = useCallback((appId: AppID) => {
    const appConfig = APPS[appId];
    const id = `${appId}-${Date.now()}`;
    const newWindow: WindowState = {
      id,
      appId,
      title: appConfig.title,
      isMinimized: false,
      isMaximized: false,
      zIndex: zIndexCounter + 1,
      // Random slightly offset position to stack
      position: { x: 100 + (windows.length * 30), y: 50 + (windows.length * 30) }, 
      size: { width: appConfig.defaultWidth, height: appConfig.defaultHeight }
    };
    
    setZIndexCounter(prev => prev + 1);
    setWindows(prev => [...prev, newWindow]);
    setActiveWindowId(id);
    setIsStartMenuOpen(false);
  }, [windows.length, zIndexCounter]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  }, [activeWindowId]);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    if (activeWindowId === id) setActiveWindowId(null);
  }, [activeWindowId]);

  const maximizeWindow = useCallback((id: string) => {
     setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  }, []);

  const updateWindowPosition = useCallback((id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, position: { x, y } } : w));
  }, []);

  return (
    <OSContext.Provider value={{
      windows,
      activeWindowId,
      isStartMenuOpen,
      toggleStartMenu,
      openApp,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      focusWindow,
      updateWindowPosition
    }}>
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (!context) throw new Error('useOS must be used within an OSProvider');
  return context;
};

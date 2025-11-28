import React, { useRef, useState, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';
import { useOS } from '../../hooks/useOS';
import { WindowState } from '../../types';
import { APPS } from '../../constants';

interface WindowFrameProps {
  windowState: WindowState;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({ windowState, children }) => {
  const { focusWindow, closeWindow, minimizeWindow, maximizeWindow, updateWindowPosition, activeWindowId } = useOS();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const appConfig = APPS[windowState.appId];
  const isActive = activeWindowId === windowState.id;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowState.isMaximized) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - windowState.position.x,
      y: e.clientY - windowState.position.y
    });
    focusWindow(windowState.id);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateWindowPosition(windowState.id, e.clientX - dragOffset.x, e.clientY - dragOffset.y);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, updateWindowPosition, windowState.id]);

  if (windowState.isMinimized) return null;

  const frameClasses = windowState.isMaximized
    ? 'fixed inset-0 w-full h-full rounded-none'
    : 'absolute rounded-xl';

  return (
    <div
      className={`${frameClasses} flex flex-col bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-75 ease-out overflow-hidden`}
      style={{
        left: windowState.isMaximized ? 0 : windowState.position.x,
        top: windowState.isMaximized ? 0 : windowState.position.y,
        width: windowState.isMaximized ? '100%' : windowState.size.width,
        height: windowState.isMaximized ? '100%' : windowState.size.height,
        zIndex: windowState.zIndex,
      }}
      onMouseDown={() => focusWindow(windowState.id)}
    >
      {/* Title Bar */}
      <div
        className={`h-10 flex items-center justify-between px-3 select-none ${windowState.isMaximized ? '' : 'cursor-default'}`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
          <appConfig.icon className={`w-4 h-4 ${appConfig.color}`} />
          <span>{windowState.title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={(e) => { e.stopPropagation(); minimizeWindow(windowState.id); }}
            className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-slate-400 hover:text-white"
          >
            <Minus size={14} />
          </button>
          <button 
             onClick={(e) => { e.stopPropagation(); maximizeWindow(windowState.id); }}
            className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-slate-400 hover:text-white"
          >
            <Square size={12} />
          </button>
          <button 
             onClick={(e) => { e.stopPropagation(); closeWindow(windowState.id); }}
            className="p-1.5 hover:bg-red-500 hover:text-white rounded-md transition-colors text-slate-400"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-slate-950/50 relative text-sm">
        {/* Overlay to prevent iframe capturing mouse events while dragging */}
        {isDragging && <div className="absolute inset-0 z-50 bg-transparent" />}
        {children}
      </div>
    </div>
  );
};

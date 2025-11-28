import { LucideIcon } from 'lucide-react';

export type AppID = 'terminal' | 'explorer' | 'browser' | 'settings' | 'ai-assistant' | 'calculator';

export interface AppConfig {
  id: AppID;
  title: string;
  icon: LucideIcon;
  color: string;
  defaultWidth: number;
  defaultHeight: number;
}

export interface WindowState {
  id: string; // Unique instance ID
  appId: AppID;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface FileSystemNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileSystemNode[];
  content?: string;
  size?: string;
  modified?: string;
}

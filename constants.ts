import { 
  Terminal, 
  FolderOpen, 
  Globe, 
  Settings, 
  Bot, 
  Calculator 
} from 'lucide-react';
import { AppConfig, AppID, FileSystemNode } from './types';

export const APPS: Record<AppID, AppConfig> = {
  terminal: {
    id: 'terminal',
    title: 'Terminal',
    icon: Terminal,
    color: 'text-green-400',
    defaultWidth: 700,
    defaultHeight: 450,
  },
  explorer: {
    id: 'explorer',
    title: 'File Explorer',
    icon: FolderOpen,
    color: 'text-yellow-400',
    defaultWidth: 800,
    defaultHeight: 500,
  },
  browser: {
    id: 'browser',
    title: 'Edge (Linux Ed.)',
    icon: Globe,
    color: 'text-blue-400',
    defaultWidth: 900,
    defaultHeight: 600,
  },
  'ai-assistant': {
    id: 'ai-assistant',
    title: 'Winnux AI',
    icon: Bot,
    color: 'text-purple-400',
    defaultWidth: 400,
    defaultHeight: 600,
  },
  settings: {
    id: 'settings',
    title: 'Settings',
    icon: Settings,
    color: 'text-gray-400',
    defaultWidth: 600,
    defaultHeight: 400,
  },
  calculator: {
    id: 'calculator',
    title: 'Calculator',
    icon: Calculator,
    color: 'text-orange-400',
    defaultWidth: 320,
    defaultHeight: 450,
  }
};

export const INITIAL_FILE_SYSTEM: FileSystemNode[] = [
  {
    name: 'home',
    type: 'folder',
    children: [
      {
        name: 'user',
        type: 'folder',
        children: [
          { name: 'Documents', type: 'folder', children: [
             { name: 'project_notes.txt', type: 'file', size: '2KB', modified: 'Oct 24' },
             { name: 'budget.csv', type: 'file', size: '14KB', modified: 'Oct 20' }
          ]},
          { name: 'Downloads', type: 'folder', children: [] },
          { name: 'Pictures', type: 'folder', children: [
             { name: 'wallpaper.jpg', type: 'file', size: '2.4MB', modified: 'Sep 12' }
          ]},
          { name: 'todo.txt', type: 'file', size: '1KB', modified: 'Today' },
        ]
      }
    ]
  },
  {
    name: 'etc',
    type: 'folder',
    children: [
      { name: 'os-release', type: 'file', size: '400B', modified: 'Jan 1' }
    ]
  }
];

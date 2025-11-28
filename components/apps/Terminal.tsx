import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_FILE_SYSTEM } from '../../constants';

interface TerminalProps {
  windowId: string;
}

export const Terminal: React.FC<TerminalProps> = () => {
  const [history, setHistory] = useState<string[]>(['Welcome to Winnux v1.0.0 (tty1)', 'Type "help" for a list of commands.']);
  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState(['home', 'user']);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const args = cmd.trim().split(' ');
    const command = args[0].toLowerCase();
    
    let output = '';

    switch (command) {
      case 'help':
        output = `Available commands:
  ls        List directory contents
  cd        Change directory
  pwd       Print working directory
  clear     Clear terminal screen
  echo      Display a line of text
  whoami    Print effective userid
  uname     Print system information`;
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'pwd':
        output = '/' + currentPath.join('/');
        break;
      case 'whoami':
        output = 'winnux_user';
        break;
      case 'uname':
        output = 'Linux winnux-kernel 5.15.0-generic #42 SMP x86_64 GNU/Linux';
        break;
      case 'ls':
        // Simplified LS implementation - just shows mock data for current folder scope
        // In a real implementation this would traverse INITIAL_FILE_SYSTEM
        output = 'Documents  Downloads  Pictures  todo.txt';
        break;
      case 'echo':
        output = args.slice(1).join(' ');
        break;
      case 'cd':
        const target = args[1];
        if (!target || target === '~') {
          setCurrentPath(['home', 'user']);
        } else if (target === '..') {
          if (currentPath.length > 1) {
             setCurrentPath(prev => prev.slice(0, -1));
          }
        } else {
           // Fake navigation
           output = `bash: cd: ${target}: No such file or directory`;
        }
        break;
      default:
        if (command) output = `bash: ${command}: command not found`;
    }

    setHistory(prev => [...prev, `winnux_user@Winnux:~${currentPath.length > 2 ? '/'+currentPath[currentPath.length-1] : ''}$ ${cmd}`, output].filter(Boolean));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="h-full w-full bg-black/90 p-4 font-mono text-sm text-green-400 selection:bg-green-900 selection:text-white" onClick={() => document.getElementById('terminal-input')?.focus()}>
      {history.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap mb-1">{line}</div>
      ))}
      <div className="flex">
        <span className="mr-2 text-blue-400 font-bold">winnux_user@Winnux:~{currentPath.length > 2 ? '/'+currentPath[currentPath.length-1] : ''}$</span>
        <input
          id="terminal-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none flex-1 text-white"
          autoFocus
          autoComplete="off"
        />
      </div>
      <div ref={endRef} />
    </div>
  );
};

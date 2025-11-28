import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Bot, Loader2 } from 'lucide-react';

export const WinnuxAI: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: 'Hello! I am your Winnux system assistant. How can I help you navigate or write code today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      if (!process.env.API_KEY) {
         setMessages(prev => [...prev, { role: 'model', text: "Error: No API_KEY found in environment variables. Please check your system configuration." }]);
         setIsLoading(false);
         return;
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = 'gemini-2.5-flash';
      
      const response = await ai.models.generateContent({
        model: model,
        contents: userMsg, // Simple chat for now, typically would pass history
        config: {
            systemInstruction: "You are a helpful AI assistant integrated into a Linux/Windows hybrid OS called Winnux. Keep responses concise and tech-focused."
        }
      });
      
      const text = response.text || "I couldn't generate a response.";

      setMessages(prev => [...prev, { role: 'model', text }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error connecting to the neural core." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-200">
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-none'
            }`}>
              {msg.role === 'model' && <Bot size={14} className="mb-1 text-purple-400" />}
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-slate-800 rounded-2xl px-4 py-2 flex items-center gap-2">
                <Loader2 className="animate-spin text-blue-400" size={16} />
                <span className="text-xs text-slate-400">Thinking...</span>
             </div>
          </div>
        )}
      </div>
      <div className="p-3 bg-slate-950/50 border-t border-white/5">
        <div className="relative">
          <input
            type="text"
            className="w-full bg-slate-800/50 border border-white/10 rounded-full pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-1 top-1 p-1.5 bg-blue-600 hover:bg-blue-500 rounded-full text-white transition-colors disabled:opacity-50"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

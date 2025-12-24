
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { mathService } from '../services/mathService';

interface DisplayProps {
  expression: string;
  result: string;
}

export const Display: React.FC<DisplayProps> = ({ expression, result }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (!result || result === '0') return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group w-full p-7 rounded-[32px] bg-slate-900/5 dark:bg-black/20 border border-black/5 dark:border-white/5 flex flex-col justify-end items-end min-h-[170px] transition-all shadow-inner overflow-hidden">
      
      {/* Visual background hint for depth */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none opacity-50"></div>

      {/* Copy Button */}
      <button 
        onClick={copyToClipboard}
        className="absolute top-4 left-4 p-2.5 rounded-xl bg-slate-200/50 dark:bg-slate-800/40 opacity-0 group-hover:opacity-100 transition-all hover:scale-105 active:scale-95 z-20"
        title="Copy result"
      >
        {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} className="dark:text-slate-400" />}
      </button>

      {/* Expression Line */}
      <div className="w-full text-right mb-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <span className="text-lg font-medium text-slate-400 dark:text-slate-500 font-mono tracking-widest opacity-80">
          {expression || ' '}
        </span>
      </div>

      {/* Result Line */}
      <div className="w-full text-right overflow-x-auto whitespace-nowrap scrollbar-hide">
        <span className="text-5xl md:text-6xl font-bold tracking-tighter font-mono bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
          {mathService.formatDisplay(result)}
        </span>
      </div>
    </div>
  );
};

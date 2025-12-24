
import React, { useEffect, useCallback } from 'react';
import { 
  History, 
  Moon, 
  Sun,
} from 'lucide-react';
import { CalculatorState, CalculatorMode, HistoryItem } from '../types';
import { Display } from './Display';
import { ButtonGrid } from './ButtonGrid';
import { HistorySidebar } from './HistorySidebar';
import { mathService } from '../services/mathService';

interface CalculatorProps {
  state: CalculatorState;
  setState: React.Dispatch<React.SetStateAction<CalculatorState>>;
  toggleTheme: () => void;
  setMode: (mode: CalculatorMode) => void;
  toggleHistory: () => void;
  addToHistory: (expr: string, res: string) => void;
  clearHistory: () => void;
}

export const Calculator: React.FC<CalculatorProps> = ({
  state,
  setState,
  toggleTheme,
  setMode,
  toggleHistory,
  addToHistory,
  clearHistory
}) => {
  const { expression, result, mode, isHistoryOpen, theme, history } = state;

  const handleInput = useCallback((val: string) => {
    setState(prev => {
      let nextExpr = prev.expression;
      
      if (val === 'AC') return { ...prev, expression: '', result: '0' };
      if (val === 'DEL') return { ...prev, expression: nextExpr.slice(0, -1) };
      if (val === '=') {
        const finalResult = mathService.evaluate(nextExpr);
        if (finalResult && finalResult !== 'Error') {
          addToHistory(nextExpr, finalResult);
          return { ...prev, expression: finalResult, result: finalResult };
        }
        return prev;
      }

      // Handle functions
      const specialFuncs = ['sin(', 'cos(', 'tan(', 'log(', 'ln(', 'sqrt('];
      if (specialFuncs.includes(val)) {
        nextExpr += val;
      } else {
        nextExpr += val;
      }

      const realTimeRes = mathService.evaluate(nextExpr);

      return {
        ...prev,
        expression: nextExpr,
        result: (realTimeRes && realTimeRes !== 'Error') ? realTimeRes : prev.result
      };
    });
  }, [setState, addToHistory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (/[0-9]/.test(key)) handleInput(key);
      else if (key === '+') handleInput('+');
      else if (key === '-') handleInput('-');
      else if (key === '*') handleInput('×');
      else if (key === '/') handleInput('÷');
      else if (key === '.') handleInput('.');
      else if (key === '(') handleInput('(');
      else if (key === ')') handleInput(')');
      else if (key === 'Enter' || key === '=') handleInput('=');
      else if (key === 'Backspace') handleInput('DEL');
      else if (key === 'Escape') handleInput('AC');
      else if (key === '^') handleInput('^');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInput]);

  const insertHistoryItem = (item: HistoryItem) => {
    setState(prev => ({
      ...prev,
      expression: item.expression,
      result: item.result,
      isHistoryOpen: false
    }));
  };

  return (
    <div className={`relative flex flex-col w-full max-w-[400px] md:max-w-[430px] min-h-[680px] rounded-[48px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-700 overflow-hidden z-10 ${
      theme === 'dark' ? 'glass text-white' : 'glass-light text-slate-900'
    }`}>
      
      {/* Header / Toolbar */}
      <div className="flex items-center justify-between p-7 pb-4 z-10">
        <div className="flex gap-1 p-1 bg-slate-900/10 dark:bg-white/5 rounded-2xl">
          <button 
            onClick={() => setMode('standard')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
              mode === 'standard' 
                ? 'bg-white dark:bg-slate-700 shadow-md scale-105' 
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            STANDARD
          </button>
          <button 
            onClick={() => setMode('scientific')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
              mode === 'scientific' 
                ? 'bg-white dark:bg-slate-700 shadow-md scale-105' 
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            SCIENTIFIC
          </button>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={toggleTheme}
            className="p-3 rounded-2xl bg-slate-200/40 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all active:scale-90"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
          </button>
          <button 
            onClick={toggleHistory}
            className="p-3 rounded-2xl bg-slate-200/40 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all active:scale-90"
            title="History"
          >
            <History size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Display and Controls Area */}
      <div className="flex-1 flex flex-col p-7 pt-2 gap-6">
        <Display expression={expression} result={result} />
        <div className="flex-1 flex flex-col justify-end">
          <ButtonGrid mode={mode} onInput={handleInput} />
        </div>
      </div>

      {/* History Sidebar */}
      <HistorySidebar 
        isOpen={isHistoryOpen} 
        onClose={toggleHistory} 
        history={history} 
        onSelect={insertHistoryItem}
        onClear={clearHistory}
        theme={theme}
      />
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { Calculator } from './components/Calculator';
import { CalculatorState, CalculatorMode, HistoryItem } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<CalculatorState>(() => {
    const saved = localStorage.getItem('lumina_calc_state');
    const initialHistory = saved ? JSON.parse(saved).history : [];
    const initialTheme = saved ? JSON.parse(saved).theme : 'dark';

    return {
      expression: '',
      result: '0',
      mode: 'standard',
      history: initialHistory,
      isHistoryOpen: false,
      theme: initialTheme,
    };
  });

  useEffect(() => {
    localStorage.setItem('lumina_calc_state', JSON.stringify({
      history: state.history,
      theme: state.theme
    }));
    
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.history, state.theme]);

  const toggleTheme = () => {
    setState(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
  };

  const setMode = (mode: CalculatorMode) => {
    setState(prev => ({ ...prev, mode }));
  };

  const toggleHistory = () => {
    setState(prev => ({ ...prev, isHistoryOpen: !prev.isHistoryOpen }));
  };

  const addToHistory = (expression: string, result: string) => {
    if (!expression || result === 'Error' || expression === result) return;
    
    const newItem: HistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      expression,
      result,
      timestamp: Date.now(),
    };

    setState(prev => ({
      ...prev,
      history: [newItem, ...prev.history].slice(0, 50)
    }));
  };

  const clearHistory = () => {
    setState(prev => ({ ...prev, history: [] }));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden transition-all duration-1000">
      {/* High-end ambient background */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 dark:bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/10 dark:bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-transparent dark:bg-[radial-gradient(circle_at_center,rgba(51,65,85,0.05)_0%,transparent_70%)] pointer-events-none"></div>

      <Calculator 
        state={state}
        setState={setState}
        toggleTheme={toggleTheme}
        setMode={setMode}
        toggleHistory={toggleHistory}
        addToHistory={addToHistory}
        clearHistory={clearHistory}
      />
    </div>
  );
};

export default App;

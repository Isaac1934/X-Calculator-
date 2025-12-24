
import React from 'react';

interface ButtonProps {
  label: string | React.ReactNode;
  value: string;
  onClick: (val: string) => void;
  variant?: 'number' | 'operator' | 'action' | 'scientific';
  className?: string;
}

const CalcButton: React.FC<ButtonProps> = ({ label, value, onClick, variant = 'number', className = '' }) => {
  const baseStyles = "flex items-center justify-center rounded-3xl text-lg font-bold transition-all duration-300 btn-press h-14 md:h-16 shadow-sm";
  
  const variants = {
    number: "bg-white/40 dark:bg-white/10 hover:bg-white/60 dark:hover:bg-white/15 text-slate-800 dark:text-white border border-white/10 dark:border-white/5",
    operator: "bg-gradient-to-br from-indigo-500 to-blue-700 text-white hover:from-indigo-600 hover:to-blue-800 shadow-lg shadow-indigo-500/20",
    action: "bg-rose-500/10 dark:bg-rose-500/15 text-rose-500 hover:bg-rose-500/20 dark:hover:bg-rose-500/25 border border-rose-500/20",
    scientific: "bg-slate-500/10 dark:bg-slate-400/5 text-slate-600 dark:text-slate-400 hover:bg-slate-500/20 dark:hover:bg-white/10 text-[13px] tracking-wide uppercase font-black"
  };

  return (
    <button 
      onClick={() => onClick(value)}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {label}
    </button>
  );
};

interface ButtonGridProps {
  mode: 'standard' | 'scientific';
  onInput: (val: string) => void;
}

export const ButtonGrid: React.FC<ButtonGridProps> = ({ mode, onInput }) => {
  return (
    <div className="grid grid-cols-4 gap-4 w-full">
      
      {/* Top Utility Row */}
      <CalcButton label="AC" value="AC" onClick={onInput} variant="action" className="text-sm" />
      <CalcButton label="DEL" value="DEL" onClick={onInput} variant="action" className="text-sm" />
      <CalcButton label="(" value="(" onClick={onInput} variant="scientific" />
      <CalcButton label=")" value=")" onClick={onInput} variant="scientific" />

      {/* Scientific Row - Expansion */}
      {mode === 'scientific' && (
        <div className="col-span-4 grid grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <CalcButton label="SIN" value="sin(" onClick={onInput} variant="scientific" />
          <CalcButton label="COS" value="cos(" onClick={onInput} variant="scientific" />
          <CalcButton label="TAN" value="tan(" onClick={onInput} variant="scientific" />
          <CalcButton label="Xʸ" value="^" onClick={onInput} variant="scientific" />
          
          <CalcButton label="LOG" value="log10(" onClick={onInput} variant="scientific" />
          <CalcButton label="LN" value="log(" onClick={onInput} variant="scientific" />
          <CalcButton label="√" value="sqrt(" onClick={onInput} variant="scientific" />
          <CalcButton label="PI" value="π" onClick={onInput} variant="scientific" />
        </div>
      )}

      {/* Main Grid */}
      <CalcButton label="7" value="7" onClick={onInput} />
      <CalcButton label="8" value="8" onClick={onInput} />
      <CalcButton label="9" value="9" onClick={onInput} />
      <CalcButton label="÷" value="÷" onClick={onInput} variant="operator" className="text-2xl" />

      <CalcButton label="4" value="4" onClick={onInput} />
      <CalcButton label="5" value="5" onClick={onInput} />
      <CalcButton label="6" value="6" onClick={onInput} />
      <CalcButton label="×" value="×" onClick={onInput} variant="operator" className="text-2xl" />

      <CalcButton label="1" value="1" onClick={onInput} />
      <CalcButton label="2" value="2" onClick={onInput} />
      <CalcButton label="3" value="3" onClick={onInput} />
      <CalcButton label="−" value="-" onClick={onInput} variant="operator" className="text-2xl" />

      <CalcButton label="0" value="0" onClick={onInput} />
      <CalcButton label="." value="." onClick={onInput} />
      <CalcButton label="=" value="=" onClick={onInput} variant="operator" className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900" />
      <CalcButton label="+" value="+" onClick={onInput} variant="operator" className="text-2xl" />
    </div>
  );
};

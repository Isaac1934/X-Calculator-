
import React from 'react';
import { X, Trash2, Clock, RotateCcw } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
  theme: 'light' | 'dark';
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({ 
  isOpen, 
  onClose, 
  history, 
  onSelect, 
  onClear,
  theme 
}) => {
  return (
    <>
      {/* Overlay Backdrop */}
      {isOpen && (
        <div 
          className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-20 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <div className={`absolute top-0 right-0 w-full md:w-80 h-full bg-white dark:bg-slate-900 shadow-2xl z-30 transform transition-transform duration-300 ease-out flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-blue-500" />
            <h2 className="text-lg font-bold">History</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3">
              <RotateCcw size={32} strokeWidth={1.5} />
              <p className="text-sm">No calculations yet</p>
            </div>
          ) : (
            history.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelect(item)}
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-right transition-all group border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
              >
                <div className="text-xs text-slate-500 mb-1 group-hover:text-blue-500 truncate">
                  {item.expression}
                </div>
                <div className="text-lg font-bold font-mono">
                  {item.result}
                </div>
                <div className="text-[10px] text-slate-400 mt-2">
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <button 
              onClick={onClear}
              className="w-full flex items-center justify-center gap-2 p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-medium text-sm"
            >
              <Trash2 size={16} />
              Clear All History
            </button>
          </div>
        )}
      </div>
    </>
  );
};

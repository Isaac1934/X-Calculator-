
export type CalculatorMode = 'standard' | 'scientific';

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export interface CalculatorState {
  expression: string;
  result: string;
  mode: CalculatorMode;
  history: HistoryItem[];
  isHistoryOpen: boolean;
  theme: 'light' | 'dark';
}
